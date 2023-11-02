"use client";

import qs from "query-string";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { Video, VideoOff } from "lucide-react";

import { Profile } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ChatMemberHeaderProps {
  otherProfile: Profile;
}

export const ChatMemberHeader = ({ otherProfile }: ChatMemberHeaderProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col h-14 w-full dark:bg-[#1f1e1e] bg-slate-100/90 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex items-center w-full p-2">
        <UserAvatar src={otherProfile.imageUrl} />
        <span className="text-black dark:text-white font-semibold ml-2 text-[20px]">
          {otherProfile.username}
        </span>
        <div className="ml-auto flex items-center flex-row space-x-4 mr-2">
          <SocketIndicator />
          <ActionTooltip side="left" label={tooltipLabel}>
            <button
              onClick={onClick}
              className="hover:opacity-75 transition mr-4">
              <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};
