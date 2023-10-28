"use client";

import { Profile } from "@prisma/client";
import { CommunityWithMembersWithProfiles } from "@/types";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { CommunitySidebarClient } from "@/components/community/community-sidebar-client";

interface MobileSidebarToggleProps {
  communities: CommunityWithMembersWithProfiles[];
  profile: Profile;
}

export const MobileSidebarToggle = ({
  communities,
  profile,
}: MobileSidebarToggleProps) => {
  const pathName = usePathname();

  const isCommunity = pathName.toLowerCase().includes("/community");
  const isChat = pathName.toLowerCase().includes("/chat");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSideBar />
        </div>
        {isCommunity && (
          <CommunitySidebarClient communities={communities} profile={profile} />
        )}
      </SheetContent>
    </Sheet>
  );
};
