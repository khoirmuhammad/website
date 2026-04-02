// Special hook for infinite scrolling / pagination
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// Calls service layer
import { getPosts, getPostById } from "../../api/post.api";
// Decouples/maps API response → UI model
import { mapPost } from "../../utils/mapper";
// UI-friendly model
import type { Post } from "../../types/post.types";

const LIMIT = 10; // Total items per page

// accept search keyword parameter
export const usePostQueries = (query: string) => {
  return useInfiniteQuery({
    // React Query stores API result in memory, keyed by queryKey
    // By this, react query auto check data in memory/cache first
    // If query value changed, then it go to new data/call API
    queryKey: ["posts", query],
    //REQUIRED in v5, Defines starting page, if we put 2, then data 6 to 10 will be retrieved
    initialPageParam: 1,
    // pageParam : Used for pagination
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam, LIMIT, query),
    // Do something if there another/next page
    getNextPageParam: (lastPage, pages) => {
      // Cunt total items loaded
      const totalLoaded = pages.flatMap((p) => p.data).length;

      // If all data loaded, stop fetching
      if (totalLoaded >= lastPage.total) return undefined;

      //Load next page
      return pages.length + 1;
    },
    // transforms data BEFORE it reaches UI
    select: (data): { pages: Post[][]; pageParams: unknown[] } => ({
      pages: data.pages.map((page) => page.data.map(mapPost)), // Transform pages
      pageParams: data.pageParams, // Required for React Query internals
    }),
  });
};

export const usePostDetail = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    select: (data): Post => mapPost(data),
    enabled: !!id, // prevent call api if id undefined
  });
};
