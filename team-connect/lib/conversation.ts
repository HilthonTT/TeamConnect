import { db } from "@/lib/db";

export const getOrCreateConversation = async (
  profileOneId: string,
  profileTwoId: string
) => {
  if (profileOneId === profileTwoId) {
    return null;
  }

  let conversation =
    (await findConversation(profileOneId, profileTwoId)) ||
    (await findConversation(profileTwoId, profileOneId));

  if (!conversation) {
    conversation = await createNewConversation(profileOneId, profileTwoId);
  }

  return conversation;
};

const findConversation = async (profileOneId: string, profileTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ profileOneId: profileOneId }, { profileTwoId: profileTwoId }],
      },
      include: {
        profileOne: {},
        profileTwo: {},
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
  profileOneId: string,
  profileTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        profileOneId,
        profileTwoId,
      },
      include: {
        profileOne: {},
        profileTwo: {},
      },
    });
  } catch (error) {
    return null;
  }
};
