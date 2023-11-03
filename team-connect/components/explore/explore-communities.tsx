"use client";

import { useItemQuery } from "@/hooks/use-item-query";
import { useSearchParams } from "next/navigation";

import { CommunityWithMembersWithProfiles } from "@/types";

import { ExploreItem } from "@/components/explore/explore-item";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";

interface ExploreCommunitiesProps {
  apiUrl: string;
}

export const ExploreCommunities = ({ apiUrl }: ExploreCommunitiesProps) => {
  const queryKey = `communities`;
  const searchParams = useSearchParams();

  const keywords = searchParams?.get("keywords");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useItemQuery({
      queryKey,
      apiUrl,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading communities...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="flex space-x-4">
        <div className="flex flex-row mt-auto">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {keywords
                ? group.items
                    .filter((community: CommunityWithMembersWithProfiles) =>
                      community.name
                        .toLowerCase()
                        .includes(keywords.toLowerCase())
                    )
                    .map(
                      (filteredCommunity: CommunityWithMembersWithProfiles) => (
                        <ExploreItem
                          key={filteredCommunity.id}
                          community={filteredCommunity}
                        />
                      )
                    )
                : group.items.map(
                    (community: CommunityWithMembersWithProfiles) => (
                      <ExploreItem key={community.id} community={community} />
                    )
                  )}
            </Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            {isFetchingNextPage ? (
              <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
            ) : (
              <button
                onClick={() => fetchNextPage()}
                className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4
              dark:hover:text-zinc-300 transition">
                Load communities
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
