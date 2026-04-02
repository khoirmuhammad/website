// Configured axios instance
import apiClient from "./client";
import type {
  PostApiResponse, // raw backend response for create/update
  CreatePostPayload, // request body
  PaginatedPostApiResponse, // resonse for data retrieval
} from "../types/post.types";

export const getPosts = async (
  page: number = 1, //current page
  limit: number = 10, // total items per page
  query: string = "", // search keyword
): Promise<PaginatedPostApiResponse> => {
  // Converted to GET /posts?_page=1&_limit=10&_query=react
  const res = await apiClient.get(
    `/posts?_page=${page}&_limit=${limit}&_query=${query}`,
  );

  const responseData = res.data;
  return {
    data: responseData.data ?? responseData,
    total: responseData.total ?? 0, // fallback to 0
  };
};

export const getPostById = async (id: number): Promise<PostApiResponse> => {
  const res = await apiClient.get<PostApiResponse>(`/posts/${id}`);
  return res.data;
};

export const createPost = async (
  data: CreatePostPayload,
): Promise<PostApiResponse> => {
  const res = await apiClient.post<PostApiResponse>("/posts", data);
  return res.data;
};

export const updatePost = async (
  id: number,
  data: CreatePostPayload,
): Promise<PostApiResponse> => {
  const res = await apiClient.put<PostApiResponse>(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
