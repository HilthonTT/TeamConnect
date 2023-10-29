import { CommunityMain } from "@/components/community/community-main";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const Community = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return <CommunityMain />;
};

export default Community;
