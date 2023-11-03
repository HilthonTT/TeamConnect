import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ItemQueryProps {
  queryKey: string;
  apiUrl: string;
}

export const useItemQuery = ({ queryKey, apiUrl }: ItemQueryProps) => {
  const fetchItems = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      initialPageParam: undefined,
      queryKey: [queryKey],
      queryFn: fetchItems,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: false,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
