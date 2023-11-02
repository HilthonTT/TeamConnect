import { db } from "@/lib/db";

import { ExploreBanner } from "@/components/explore/explore-banner";

const Activity = async () => {
  const communities = await db.community.findMany();

  return (
    <div>
      <ExploreBanner />
    </div>
  );
};

export default Activity;
