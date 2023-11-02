"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";

import { UserButton } from "@clerk/nextjs";

export const NavigationSideBar = () => {
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-zinc-400 w-full dark:bg-[#0d0d0d] bg-[#E3E5E8] py-3">
      <ScrollArea className="flex-1 w-full">
        <NavigationItem name="Explore" />
        <NavigationItem name="Community" />
        <NavigationItem name="Chat" />
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
