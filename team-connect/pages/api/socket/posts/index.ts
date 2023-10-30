import { currentProfilesPages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilesPages(req);
    const { content, fileUrl } = req.body;
    const { communityId, channelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!communityId) {
      return res.status(400).json({ error: "Server ID missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    const community = await db.community.findFirst({
      where: {
        id: communityId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        communityId: communityId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = community.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const post = await db.post.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:posts`;

    res?.socket?.server?.io?.emit(channelKey, post);

    return res.status(200).json(post);
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
}
