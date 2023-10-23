import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { CommunityHeader } from "@/components/community/community-header";

export const CommunitySidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const communities = await db.community.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col h-full w-full text-zinc-400 dark:bg-[#1f1e1e] bg-white">
      <CommunityHeader />
    </div>
  );
};
