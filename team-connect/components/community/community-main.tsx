import { ScreenShare, PartyPopper } from "lucide-react";
import { CommunityButton } from "./community-button";

export const CommunityMain = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-5">
      <h1 className="text-[20px] font-semibold pb-5">
        Join a community and socialize!
      </h1>
      <div className="flex gap-5">
        <div className="flex flex-col border-zinc-400 border-2 rounded-md p-5 w-[320px] h-[400px]">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <ScreenShare className="h-20 w-20 hover:text-indigo-500 transition" />
              <p className="mt-8 dark:text-zinc-200 text-zinc-500 font-bold">
                Create communities now
              </p>
            </div>
            <CommunityButton type="create" />
          </div>
        </div>

        <div className="flex flex-col border-zinc-400 border-2 rounded-md p-5 w-[320px] h-[400px]">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <PartyPopper className="h-20 w-20 hover:text-indigo-500 transition" />
              <p className="mt-8 dark:text-zinc-200 text-zinc-500 font-bold">
                Invite people!
              </p>
            </div>
            <CommunityButton type="invite" />
          </div>
        </div>
      </div>
    </div>
  );
};
