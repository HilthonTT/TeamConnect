"use client";

import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { Bell, Users, MessageCircle } from "lucide-react";

interface NavigationItemProps {
  name: string;
}

const iconMap: Record<string, any> = {
  ACTIVITY: <Bell className="text-zinc-600 dark:text-zinc-200" />,
  COMMUNITY: <Users className="text-zinc-600 dark:text-zinc-200" />,
  CHAT: <MessageCircle className="text-zinc-600 dark:text-zinc-200" />,
};

export const NavigationItem = ({ name }: NavigationItemProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const icon = iconMap[name.toUpperCase()];
  const currentPath = pathName.toLowerCase();
  const desiredRoute = `/${name}`.toLowerCase();

  const isCurrentRoute = currentPath.includes(desiredRoute);

  const onClick = () => {
    console.log(desiredRoute);
    router.push(desiredRoute);
  };

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-indigo-500 rounded-r-full transition-all w-[4px]",
            !isCurrentRoute && "group-hover:h-[20px]",
            isCurrentRoute ? "h-[36px]" : "h-[8px]"
          )}></div>
        <div
          className="w-[72px] h-[72px] flex flex-col justify-center items-center bg-transparent 
              dark:hover:bg-[#111111] hover:bg-[#c0c0c0] hover:text-indigo-500 transition">
          {icon}
          <p className="text-[10px] text-zinc-600 dark:text-zinc-200">{name}</p>
        </div>
      </button>
    </ActionTooltip>
  );
};
