import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

import { ExploreBanner } from "@/components/explore/explore-banner";
import { ExploreCommunities } from "@/components/explore/explore-communities";

const Activity = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div>
      <ExploreBanner />
      <ExploreCommunities apiUrl="api/community" />
    </div>
  );
};

export default Activity;
