"use client";

import { CommunityWithMembersWithProfiles } from "@/types";
import { Profile } from "@prisma/client";

import { CommunityItem } from "@/components/community/community-item";
import { CommunityHeader } from "@/components/community/community-header";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommunitySidebarClientProps {
  communities: CommunityWithMembersWithProfiles[];
  profile: Profile;
}

export const CommunitySidebarClient = ({
  communities,
  profile,
}: CommunitySidebarClientProps) => {
  return (
    <div
      className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-slate-100/90 
        shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <CommunityHeader />
      <ScrollArea className="flex-1 px-3">
        {communities?.map((community) => (
          <CommunityItem
            key={community.id}
            community={community}
            profile={profile}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
