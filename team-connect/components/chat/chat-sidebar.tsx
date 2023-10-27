import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirectToSignIn } from "@clerk/nextjs";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatItem } from "@/components/chat/chat-item";

import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatSibebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const conversations = await db.conversation.findMany({
    where: {
      OR: [{ profileOneId: profile?.id }, { profileTwoId: profile.id }],
    },
    include: {
      profileOne: {},
      profileTwo: {},
    },
  });

  return (
    <div className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-slate-100/90">
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
