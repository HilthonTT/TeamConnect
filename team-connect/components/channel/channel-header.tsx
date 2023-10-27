import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

import { redirect } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { Hash, Mic, Video } from "lucide-react";

interface ChannelHeaderProps {
  params: {
    communityId: string;
    channelId: string;
  };
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ChannelHeader = async ({ params }: ChannelHeaderProps) => {
  const community = await db.community.findUnique({
    where: {
      id: params.communityId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  const channel = community?.channels.find(
    (channel) => channel.id === params.channelId
  );

  if (!community) {
    return redirect("/community");
  }

  if (!channel) {
    return redirect(`/community/${params.communityId}`);
  }

  const Icon = iconMap[channel.type];

  return (
    <div className="flex flex-col h-14 w-full dark:bg-[#1f1e1e] bg-slate-100/90 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex items-center p-2">
        <UserAvatar src={community.imageUrl} />
        <span className="text-black dark:text-white font-semibold ml-2 text-[20px]">
          {community.name}
        </span>
        <span className="text-black dark:text-white font-semibold text-[20px] ml-auto mr-2 flex items-center">
          <Icon />
          {channel?.name}
        </span>
      </div>
    </div>
  );
};
