import { CommunitySidebar } from "@/components/community/community-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

const CommunityLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const community = await db.community.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0">
        <CommunitySidebar communityId={community?.id as string} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default CommunityLayout;
