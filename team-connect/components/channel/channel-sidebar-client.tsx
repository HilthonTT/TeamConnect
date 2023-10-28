"use client";

import { ChannelType, Profile } from "@prisma/client";
import { CommunityWithMembersWithProfilesWithChannels } from "@/types";

import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChannelSection } from "@/components/channel/channel-section";
import { CommunityMember } from "@/components/community/community-member";
import { CommunityChannel } from "@/components/community/community-channel";

interface ChannelSidebarProps {
  profile: Profile;
  community: CommunityWithMembersWithProfilesWithChannels;
}

export const ChannelSidebarClient = ({
  profile,
  community,
}: ChannelSidebarProps) => {
  if (!community) {
    return redirect("/community");
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

  const role = community?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div
      className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-slate-100/90 
    shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          {!!textChannels?.length && (
            <div className="mb-2">
              <ChannelSection
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label="Text Channels"
              />
              <div className="space-y-[2px]">
                {textChannels?.map((channel) => (
                  <CommunityChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    community={community}
                  />
                ))}
              </div>
            </div>
          )}
          {!!audioChannels?.length && (
            <div className="mb-2">
              <ChannelSection
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label="Voice Channels"
              />
              <div className="space-y-[2px]">
                {audioChannels?.map((channel) => (
                  <CommunityChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    community={community}
                  />
                ))}
              </div>
            </div>
          )}
          {!!videoChannels?.length && (
            <div className="mb-2">
              <ChannelSection
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label="Video Channels"
              />
              <div className="space-y-[2px]">
                {videoChannels?.map((channel) => (
                  <CommunityChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    community={community}
                  />
                ))}
              </div>
            </div>
          )}
          {!!members?.length && (
            <div className="mb-2">
              <ChannelSection
                sectionType="members"
                role={role}
                label="Members"
                community={community}
              />
              <div className="space-y-[2px]">
                {members?.map((member) => (
                  <CommunityMember
                    key={member.id}
                    member={member}
                    community={community}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
