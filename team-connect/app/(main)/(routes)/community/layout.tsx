import { CommunitySidebar } from "@/components/community/community-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

const CommunityLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-60 z-20 flex-col">
        <CommunitySidebar />
      </div>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default CommunityLayout;
