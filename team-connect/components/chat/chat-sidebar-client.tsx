"use client";

import { Profile } from "@prisma/client";
import { ConversationWithProfiles } from "@/types";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "@/components/chat/chat-item";
import { ChatHeader } from "./chat-header";

interface ChatSidebarClientProps {
  conversations: ConversationWithProfiles[];
  profile: Profile;
}

export const ChatSidebarClient = ({
  conversations,
  profile,
}: ChatSidebarClientProps) => {
  console.log(conversations);

  return (
    <div
      className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-slate-100/90 
    shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <ChatHeader />
      <ScrollArea className="flex-1 px-3">
        {conversations?.map((conversation) => (
          <ChatItem
            key={conversation.id}
            conversation={conversation}
            profile={profile}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
