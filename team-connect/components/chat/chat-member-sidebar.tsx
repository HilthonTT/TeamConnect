import { ConversationWithProfiles } from "@/types";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "@/components/chat/chat-item";

interface ChatMemberSidebarProps {
  profileId: string;
  conversation: ConversationWithProfiles;
}

export const ChatMemberSidebar = async ({
  profileId,
  conversation,
}: ChatMemberSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const profileOne = conversation.profileOne;
  const profileTwo = conversation.profileTwo;

  return (
    <div
      className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] 
    bg-slate-100/90 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="border-0">
        <div className="flex items-center p-2">
          <span className="text-zinc-500 dark:text-zinc-100 font-semibold">
            Members - 2
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ChatItem
            conversation={conversation}
            profile={profileOne}
            currentProfile={profile}
          />
          <ChatItem
            conversation={conversation}
            profile={profileTwo}
            currentProfile={profile}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
