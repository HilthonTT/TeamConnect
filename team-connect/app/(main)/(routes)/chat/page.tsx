import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChatPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const conversations = await db.conversation.findMany({
    where: {
      OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
    },
    include: {
      profileOne: {},
      profileTwo: {},
    },
  });

  if (conversations?.length !== 0) {
    const firstConversation = conversations[0];

    const otherProfile =
      firstConversation.profileOneId === profile.id
        ? firstConversation.profileTwo
        : firstConversation.profileOne;

    return redirect(`/chat/${otherProfile.id}`);
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      No chats.
    </div>
  );
};

export default ChatPage;
