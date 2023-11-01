import { NextApiRequest } from "next";

import { currentProfilesPages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilesPages(req);
    const { directMessageId, conversationId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }

    if (content?.length === 0) {
      return res
        .status(400)
        .json({ error: "Content must be atleast a character." });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            profileOne: {
              id: profile.id,
            },
            profileTwo: {
              id: profile.id,
            },
          },
        ],
      },
      include: {
        profileOne: {},
        profileTwo: {},
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const member =
      conversation.profileOne.id === profile.id
        ? conversation.profileOne
        : conversation.profileTwo;

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        profile: true,
      },
    });

    if (!directMessage || directMessage.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = directMessage.profileId === member.id;

    if (!isMessageOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          profile: true,
        },
      });
    }

    if (req.method === "PATCH") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          content,
        },
        include: {
          profile: true,
        },
      });
    }

    const updateKey = `chat:${directMessage}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);
  } catch (error) {
    console.log("[DIRECT_MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
