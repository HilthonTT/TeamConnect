import { ChatMemberHeader } from "@/components/chat/chat-member-header";
import { ChatMemberSidebar } from "@/components/chat/chat-member-sidebar";

import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChatProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ChatProfileIdPage = async ({ params }: ChatProfileIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const conversation = await getOrCreateConversation(
    profile?.id,
    params.profileId
  );

  if (!conversation) {
    return redirect("/chat");
  }

  const { profileOne, profileTwo } = conversation;

  const otherProfile = profileOne.id === profile?.id ? profileTwo : profileOne;

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full">
        <ChatMemberHeader otherProfile={otherProfile} />
      </div>
      <div className="hidden md:flex h-full w-60 z-20 flex-col ml-auto">
        <ChatMemberSidebar
          profileId={params.profileId}
          conversation={conversation}
        />
      </div>
    </div>
  );
};

export default ChatProfileIdPage;
