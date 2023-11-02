"use client";

import { useSearchParams } from "next/navigation";
import { ExploreItem } from "./explore-item";
import { CommunityWithMembersWithProfiles } from "@/types";

interface ExploreCommunitiesProps {
  communities: CommunityWithMembersWithProfiles[];
}

export const ExploreCommunities = ({
  communities,
}: ExploreCommunitiesProps) => {
  const searchParams = useSearchParams();

  const keywords = searchParams?.get("keywords");

  if (keywords) {
    communities = communities.filter((community) =>
      community.name.toLowerCase().includes(keywords.toLowerCase())
    );
  }

  return (
    <div className="flex flex-1">
      <div className="flex space-x-4">
        {communities.map((community) => (
          <ExploreItem key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};
