"use client";

import { useParams, useRouter } from "next/navigation";

import { MemberRole, Profile } from "@prisma/client";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { CommunityWithMembersWithProfiles } from "@/types";

import {
  MoreHorizontal,
  Pencil,
  Trash,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

interface CommunityItemProps {
  community: CommunityWithMembersWithProfiles;
  profile: Profile;
}

export const CommunityItem = ({ community, profile }: CommunityItemProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/community/${community.id}`);
  };

  const onModalOpen = (event: React.MouseEvent, type: ModalType, data: any) => {
    event.stopPropagation();

    onOpen(type, data);
  };

  const role = community.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div onClick={onClick} className="mt-3 hover:cursor-pointer">
      <div
        className={cn(
          " hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 p-2 rounded-xl flex items-center group",
          params?.communityId === community.id &&
            "dark:bg-[#404040] bg-zinc-700/20"
        )}>
        <div className="flex items-center">
          <UserAvatar src={community.imageUrl} />
          <ActionTooltip label={community.name}>
            <span className="ml-2 dark:text-white text-black overflow-hidden">
              {community.name.length > 13
                ? `${community.name.slice(0, 13)}...`
                : community.name}
            </span>
          </ActionTooltip>
        </div>
        <div className="flex items-center ml-auto">
          <ActionTooltip label="More options" side="right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="focus:outline-none">
                <MoreHorizontal
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5 text-black dark:text-zinc-300 
                  hover:text-indigo-400 dark:hover:text-indigo-500"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                  <DropdownMenuItem
                    className="cursor-pointer px-3 py-2 group"
                    onClick={(e) => onModalOpen(e, "invite", { community })}>
                    Invite People
                    <UserPlus
                      className="h-4 w-4 ml-auto group-hover:text-indigo-400 
                    dark:group-hover:text-indigo-500"
                    />
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={(e) =>
                      onModalOpen(e, "editCommunity", { community })
                    }
                    className="cursor-pointer px-3 py-2 group">
                    Edit Community
                    <Pencil
                      className="h-4 w-4 ml-auto group-hover:text-indigo-400 
                    dark:group-hover:text-indigo-500"
                    />
                  </DropdownMenuItem>
                )}
                {!isAdmin && (
                  <DropdownMenuItem
                    onClick={(e) =>
                      onModalOpen(e, "leaveCommunity", { community })
                    }
                    className="cursor-pointer px-3 py-2 group">
                    Leave Community
                    <UserMinus
                      className="h-4 w-4 ml-auto group-hover:text-indigo-400 
                  dark:group-hover:text-indigo-500"
                    />
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={(e) =>
                      onModalOpen(e, "deleteCommunity", { community })
                    }
                    className="cursor-pointer px-3 py-2 group">
                    Delete Community
                    <Trash
                      className="h-4 w-4 ml-auto group-hover:text-indigo-400 
                    dark:group-hover:text-indigo-500"
                    />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};
