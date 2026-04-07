// permissions.ts
export const PERMISSIONS = {
  POST_READ: "post.read",
  POST_CREATE: "post.create",
  POST_UPDATE: "post.update",
  POST_DELETE: "post.delete",
  POST_DETAIL: "post.detail",

  USER_READ: "user.read",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  USER_DETAIL: "user.detail",

  ARTICLE_READ: "article.read",
  ARTICLE_CREATE: "article.create",
  ARTICLE_UPDATE: "article.update",
  ARTICLE_DELETE: "article.delete",
  ARTICLE_DETAIL: "article.detail",

  NEWS_READ: "news.read",
  NEWS_CREATE: "news.create",
  NEWS_UPDATE: "news.update",
  NEWS_DELETE: "news.delete",
  NEWS_DETAIL: "news.detail",
} as const;
