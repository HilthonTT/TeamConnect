import { currentProfilesPages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilesPages(req);
    const { postId, communityId, channelId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!communityId) {
      return res.status(400).json({ error: "Community ID missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }

    if (!postId) {
      return res.status(400).json({ error: "Post ID missing" });
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
      return res.status(404).json({ error: "Community not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        communityId: communityId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = community.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let post = await db.post.findFirst({
      where: {
        id: postId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!post || post.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isPostOwner = post.memberId === member?.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = isAdmin || member.role === MemberRole.MODERATOR;
    const canModify = isPostOwner || isModerator || isAdmin;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "DELETE") {
      post = await db.post.update({
        where: {
          id: postId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (req.method === "PATCH") {
      if (!isPostOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      post = await db.post.update({
        where: {
          id: postId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, post);

    return res.status(200).json(post);
  } catch (error) {
    console.log("[PAGES_POST_ID]", error);
    return res.status(500).json({ error: "Intenal Error" });
  }
}
