"use client";

import { Profile } from "@prisma/client";
import {
  CommunityWithMembersWithProfilesWithChannels,
  ConversationWithProfiles,
} from "@/types";
import { useParams, usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChannelSidebarClient } from "@/components/channel/channel-sidebar-client";
import { ChatSidebarClient } from "@/components/chat/chat-sidebar-client";

import { Menu } from "lucide-react";

interface MobileSidebarRightToggleProps {
  communities: CommunityWithMembersWithProfilesWithChannels[];
  conversations: ConversationWithProfiles[];
  profile: Profile;
}

export const MobileSidebarRightToggle = ({
  communities,
  conversations,
  profile,
}: MobileSidebarRightToggleProps) => {
  const pathName = usePathname();
  const params = useParams();

  const isCommunity = pathName.toLowerCase().includes("/community");
  const isChat = pathName.toLowerCase().includes("/chat") && !isCommunity;

  const isVisible = params.communityId || params.profileId;

  const community = communities.find(
    (community) => community.id === params?.communityId
  ) as CommunityWithMembersWithProfilesWithChannels;

  return (
    <Sheet>
      {isVisible && (
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent side="right" className="p-0 flex gap-0">
        {isCommunity && (
          <ChannelSidebarClient community={community} profile={profile} />
        )}
        {isChat && (
          <ChatSidebarClient conversations={conversations} profile={profile} />
        )}
      </SheetContent>
    </Sheet>
  );
};
