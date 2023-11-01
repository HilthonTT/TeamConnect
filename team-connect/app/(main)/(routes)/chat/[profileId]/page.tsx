import { ChatMemberHeader } from "@/components/chat/chat-member-header";
import { ChatMemberSidebar } from "@/components/chat/chat-member-sidebar";
import { MessageBoxDirect } from "@/components/message/message-box-direct";
import { MessageInput } from "@/components/message/message-input";

import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChatProfileIdPageProps {
  params: {
    profileId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const ChatProfileIdPage = async ({
  params,
  searchParams,
}: ChatProfileIdPageProps) => {
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
    <div className="flex flex-col h-full">
      <ChatMemberHeader otherProfile={otherProfile} />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          {!searchParams?.video && (
            <>
              <MessageBoxDirect
                profile={profile}
                name={otherProfile.username}
                chatId={conversation.id}
                type="conversation"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={conversation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                  conversationId: conversation.id,
                }}
              />
              <MessageInput
                name={otherProfile.username}
                type="conversation"
                apiUrl="/api/socket/direct-messages"
                query={{ conversationId: conversation.id }}
              />
            </>
          )}
        </div>
        <div className="hidden md:flex h-full w-60 z-20 flex-col ml-auto">
          <ChatMemberSidebar
            profileId={params.profileId}
            conversation={conversation}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatProfileIdPage;
