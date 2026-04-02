// useMutation → used for POST, PUT, DELETE
// useQueryClient → gives access to React Query cache / control cache globally
// useQuery → get data
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
// These are your service layer functions
import { createPost, deletePost, updatePost } from "../../api/post.api";
// Import types for safety
import type {
  CreatePostPayload,
  PostApiResponse,
} from "../../types/post.types";

export const useCreatePost = () => {
  // Access global cache, i.e. read/update/invalidate cache
  const queryClient = useQueryClient();

  // Create mutation object, it handles loading, error, success state
  return useMutation({
    // The actual API call
    mutationFn: createPost,

    // runs BEFORE your API request is sent : UI updates instantly no wait result from API
    onMutate: async (newPost: CreatePostPayload) => {
      // Pause fetching temporarily, if don't use, it might overwrite your UI update
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Backup current cache, used for rollback if error happens
      const previous = queryClient.getQueryData<any>(["posts"]);

      // If there is NO existing cache, skip optimistic update”
      // Why return previous
      // onMutate() → returns context, context is passed into: onError and onSettle
      if (!previous) return { previous };

      // Update cache optimistically
      queryClient.setQueryData(["posts"], (old: any) => {
        // If data is not in expected format, do nothing safely
        // return old : it means don't modify the cache, return as it is
        if (!old || !old.pages) return old;

        // Create fake post, since backend has not response yet
        const optimistic = {
          id: Date.now(),
          title: newPost.title,
          body: newPost.body,
        };

        // Get single data, because infinite query is multiple pages
        const firstPage = old.pages[0];

        if (!firstPage) return old;

        // Add new post to top of list, eep other pages unchanged
        return {
          ...old, // copy everything from cache
          pages: [
            {
              ...firstPage, // copy first page
              data: [optimistic, ...(firstPage.data || [])],
            },
            ...old.pages.slice(1), // Keep the rest of pages unchanged
          ],
          pageParams: old.pageParams,
        };
      });

      return { previous };
    },

    // Runs if API fails
    onError: (_err, _newPost, context) => {
      if (context?.previous) {
        // Undo optimistic update, prevent UI inconsistency
        queryClient.setQueryData(["posts"], context.previous);
      }
    },

    // Runs after success OR error
    onSettled: () => {
      // Force refetch from server, keep UI update with backend, Replaces fake post with real one
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreatePostPayload }) =>
      updatePost(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData<any>(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old?.pages) return old;

        // Create update object for optimistic version of updated post
        const updatedPost: PostApiResponse = {
          id,
          ...data,
        };

        // infinite query = multiple pages
        // ... (spread operator), Copy everything from this object before updating
        // old = ALL cached data for "posts"
        // page = ALL data list of post
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            // Loop posts inside each page:
            ...page,
            data: page.data.map((p: any) => (p.id === id ? updatedPost : p)), // Replace only the matching post:
          })),
        };
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData<any>(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((p: any) => p.id !== id), // this only removes (hides) the item from the UI (cache)
          })),
        };
      });

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
