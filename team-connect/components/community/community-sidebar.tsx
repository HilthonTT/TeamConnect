import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

import { redirect } from "next/navigation";
import { CommunityNoneHeader } from "./community-none-header";

interface CommunitySidebarProps {
  communityId: string;
}

export const CommunitySidebar = async ({
  communityId,
}: CommunitySidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!communityId) {
    return (
      <div className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-white">
        <CommunityNoneHeader />
      </div>
    );
  }

  const community = await db.community.findUnique({
    where: {
      id: communityId,
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
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!community) {
    return redirect("/");
  }

  const textChannels = community?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels = community?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels = community?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = community?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = community.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#4d4b4b] bg-white"></div>
  );
};
