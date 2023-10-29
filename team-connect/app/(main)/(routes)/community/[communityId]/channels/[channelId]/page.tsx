import { ChannelHeader } from "@/components/channel/channel-header";
import { ChannelSidebar } from "@/components/channel/channel-sidebar";
import { MessageInput } from "@/components/message/message-input";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";

interface ChannelIdProps {
  params: {
    communityId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      communityId: params.communityId,
      profileId: profile.id,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader params={params} />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="flex-1">A message!</div>
          {channel?.type === ChannelType.TEXT && (
            <MessageInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{
                channelId: channel.id,
                communityId: channel.communityId,
              }}
            />
          )}
        </div>
        <div className="hidden md:flex w-60 z-20">
          <ChannelSidebar params={params} />
        </div>
      </div>
    </div>
  );
};

export default ChannelIdPage;
