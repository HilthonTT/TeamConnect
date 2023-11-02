import { ChannelHeader } from "@/components/channel/channel-header";
import { ChannelSidebar } from "@/components/channel/channel-sidebar";
import { MediaRoom } from "@/components/media-room";
import { MessageBox } from "@/components/message/message-box";
import { MessageInput } from "@/components/message/message-input";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

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

  if (!channel || !member) {
    return redirect("/community");
  }

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader params={params} />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          {channel?.type === ChannelType.TEXT && (
            <>
              <MessageBox
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl="/api/posts"
                socketUrl="/api/socket/posts"
                socketQuery={{
                  channelId: channel.id,
                  communityId: channel.communityId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
              />
              <MessageInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/posts"
                query={{
                  channelId: channel.id,
                  communityId: channel.communityId,
                }}
              />
            </>
          )}

          {channel.type === ChannelType.AUDIO && (
            <MediaRoom chatId={channel.id} video={false} audio={true} />
          )}
          {channel.type === ChannelType.VIDEO && (
            <MediaRoom chatId={channel.id} video={true} audio={false} />
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
