"use client";

import { Separator } from "@/components/ui/separator";

export const ChatHeader = () => {
  return (
    <div className="border-0">
      <div className="flex items-center p-2">
        <span className="text-zinc-500 dark:text-zinc-100 font-semibold">
          Chats
        </span>
      </div>
      <Separator className="bg-zinc-800 dark:bg-zinc-600 mt-2" />
    </div>
  );
};
