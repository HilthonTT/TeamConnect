"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";

interface CommunityItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const CommunityItem = ({ id, name, imageUrl }: CommunityItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/community/${id}`);
  };

  const onMoreOptionsClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
  };

  return (
    <div onClick={onClick} className="mt-3 hover:cursor-pointer">
      <div className="dark:bg-[#404040] bg-slate-300 p-2 rounded-xl flex items-center">
        <div className="flex items-center">
          <Image width={30} height={30} src={imageUrl} alt="Community" />
          <ActionTooltip label={name}>
            <span className="ml-2 dark:text-white text-black overflow-hidden">
              {name.length > 14 ? `${name.slice(0, 14)}...` : name}
            </span>
          </ActionTooltip>
        </div>
        <div className="flex items-center ml-auto">
          <ActionTooltip label="More options" side="right">
            <MoreHorizontal
              onClick={onMoreOptionsClick}
              className="h-4 w-4 text-black dark:text-zinc-300 
                  hover:text-indigo-400 dark:hover:text-indigo-500"
            />
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};
