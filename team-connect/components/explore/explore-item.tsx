"use client";

import axios from "axios";
import Image from "next/image";

import { CommunityWithMembersWithProfiles } from "@/types";
import { useRouter } from "next/navigation";

import { Copy, Dot, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExploreItemProps {
  community: CommunityWithMembersWithProfiles;
}

export const ExploreItem = ({ community }: ExploreItemProps) => {
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(community.id);
  };

  const onJoin = async () => {
    try {
      const response = await axios.patch(
        `/api/community/invite-code/${community.inviteCode}`
      );

      router.push(`/community/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const memberCount =
    community.members.length === 1
      ? `${community.members.length} member`
      : `${community.members.length} members`;

  return (
    <div className="mt-3 ml-2 relative w-[270px] h-[150px]">
      <div className="dark:bg-zinc-700/50 bg-zinc-700/10 rounded-xl flex items-center group w-full h-full">
        <div className="absolute top-0 right-0 m-2  text-white p-1 rounded-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline">
              <MoreHorizontal
                onClick={(e) => e.stopPropagation()}
                className="h-5 w-5 text-black dark:text-zinc-300 
                  hover:text-indigo-400 dark:hover:text-indigo-500 cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
              <DropdownMenuItem
                className="cursor-pointer px-3 py-2 group"
                onClick={onCopy}>
                Copy Community ID
                <Copy
                  className="h-4 w-4 ml-auto group-hover:text-indigo-400 
                    dark:group-hover:text-indigo-500"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-shrink-0 w-32 h-full">
          <Image
            src={community.imageUrl}
            width={100}
            height={100}
            alt={community.name}
            className="object-cover rounded-l-xl"
          />
          <div className="w-full text-center mt-2">
            <div className="flex items-center justify-center">
              <Dot className="h-5 w-5 text-emerald-500 mr-1" />
              <span className="text-sm">{memberCount}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex items-center justify-center h-full">
            <p
              className="text-zinc-800 dark:text-zinc-200 hover:underline cursor-pointer"
              onClick={onJoin}>
              {community.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
