import { ChannelSidebar } from "@/components/channel/channel-sidebar";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdProps {
  params: {
    communityId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="flex h-full">
      <div>Channel Id Page</div>
      <div className="hidden md:flex h-full w-60 z-20 flex-col ml-auto">
        <ChannelSidebar params={params} />
      </div>
    </div>
  );
};

export default ChannelIdPage;
