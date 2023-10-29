import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirectToSignIn } from "@clerk/nextjs";
import { Shirt, Skull } from "lucide-react";
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
      <div className="flex flex-col justify-center items-center">
        <div className="flex-col items-center flex">
          <Skull className="h-24 w-24 text-zinc-400" />
          <Shirt className="h-24 w-24 text-zinc-400" />
        </div>
        <span className="text-center text-zinc-400 mt-8">
          You don't have any chats, here's the skull of Jimbo for now.
        </span>
      </div>
    </div>
  );
};

export default ChatPage;
