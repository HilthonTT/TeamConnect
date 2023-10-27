"use client";

import { cn } from "@/lib/utils";
import { ConversationWithProfiles } from "@/types";
import { Profile } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";

interface ChatItemProps {
  conversation: ConversationWithProfiles;
  profile: Profile;
  currentProfile?: Profile;
}

export const ChatItem = ({
  conversation,
  profile,
  currentProfile,
}: ChatItemProps) => {
  const router = useRouter();
  const params = useParams();

  const otherProfile =
    conversation.profileOneId === profile.id
      ? conversation.profileTwo
      : conversation.profileOne;

  const onClick = () => {
    if (otherProfile.id === currentProfile?.id) {
      return;
    }

    router.push(`/chat/${otherProfile.id}`);
  };

  return (
    <div onClick={onClick} className="mt-3 hover:cursor-pointer">
      <div
        className={cn(
          "hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 p-2 rounded-xl flex items-center group",
          params?.profileId === otherProfile.id &&
            "dark:bg-[#404040] bg-zinc-700/20"
        )}>
        <div className="flex items-center">
          <UserAvatar src={otherProfile.imageUrl} />
          <ActionTooltip label={otherProfile.username}>
            <span className="ml-2 dark:text-white text-black overflow-hidden">
              {otherProfile.username.length > 13
                ? `${otherProfile.username.slice(0, 13)}...`
                : otherProfile.username}
            </span>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};
