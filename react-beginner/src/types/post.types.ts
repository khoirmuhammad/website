// RAW/ORIGINAL API RESPONSE for Create/Update (see on post.api.ts)
export interface PostApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// RAW/ORIGINAL API RESPONSE for data retrieval (see on post.api.ts)
export interface PaginatedPostApiResponse {
  data: PostApiResponse[];
  total: number;
}

// UI MODEL (decoupled), UI depends on this
export interface Post {
  id: number;
  title: string;
  body: string;
}

// Frontend sends to backend
export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}
