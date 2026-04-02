import type { PostApiResponse, Post } from "../types/post.types";

export const mapPost = (apiPost: PostApiResponse): Post => ({
  id: apiPost.id,
  title: apiPost.title,
  body: apiPost.body,
});
