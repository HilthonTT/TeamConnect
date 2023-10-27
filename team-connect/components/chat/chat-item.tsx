"use client";

import { ConversationWithProfiles } from "@/types";
import { Conversation, Profile } from "@prisma/client";

interface ChatItemProps {
  conversation: ConversationWithProfiles;
  profile: Profile;
}

export const ChatItem = ({ conversation, profile }: ChatItemProps) => {
  return <div>Chat Item</div>;
};
