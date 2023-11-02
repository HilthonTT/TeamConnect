import { db } from "@/lib/db";

import { ExploreBanner } from "@/components/explore/explore-banner";
import { ExploreCommunities } from "@/components/explore/explore-communities";

const Activity = async () => {
  const communities = await db.community.findMany({
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  return (
    <div>
      <ExploreBanner />
      <ExploreCommunities communities={communities} />
    </div>
  );
};

export default Activity;
