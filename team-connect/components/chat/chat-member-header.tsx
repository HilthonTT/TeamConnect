import { UserAvatar } from "../user-avatar";
import { Profile } from "@prisma/client";

interface ChatMemberHeaderProps {
  otherProfile: Profile;
}

export const ChatMemberHeader = async ({
  otherProfile,
}: ChatMemberHeaderProps) => {
  return (
    <div className="flex flex-col h-14 w-full dark:bg-[#1f1e1e] bg-slate-100/90 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex items-center p-2">
        <UserAvatar src={otherProfile.imageUrl} />
        <span className="text-black dark:text-white font-semibold ml-2 text-[20px]">
          {otherProfile.username}
        </span>
      </div>
    </div>
  );
};
