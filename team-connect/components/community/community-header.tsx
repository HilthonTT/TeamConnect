"use client";

import { Mail, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { Separator } from "@/components/ui/separator";

import { useModal } from "@/hooks/use-modal-store";

export const CommunityHeader = () => {
  const { onOpen } = useModal();

  return (
    <div className="h-full border-2">
      <div className="flex items-center p-2">
        <span className="text-zinc-500 dark:text-zinc-100 font-semibold">
          Communities
        </span>
        <div className="flex gap-y-4 ml-auto">
          <button className="mx-2">
            <ActionTooltip label="Create Community" side="bottom">
              <Plus
                onClick={() => onOpen("createCommunity")}
                className="h-6 w-6 text-black dark:text-white 
              hover:text-indigo-400 dark:hover:text-indigo-500 transition"
              />
            </ActionTooltip>
          </button>
          <button className="mx-2">
            <ActionTooltip label="Join a community" side="bottom">
              <Mail
                className="h-6 w-6 text-black dark:text-white 
              hover:text-indigo-400 dark:hover:text-indigo-500 transition"
              />
            </ActionTooltip>
          </button>
        </div>
      </div>
      <Separator className="bg-zinc-800 dark:bg-zinc-600 mt-2" />
    </div>
  );
};
