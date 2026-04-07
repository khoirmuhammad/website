/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
// fetching hook (useInfiniteQuery inside)
import { usePostQueries } from "../../hooks/post/usePostQueries";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
// delete mutation (with optimistic update)
import { useDeletePost } from "../../hooks/post/usePostMutations";
// Prevent too many API calls when typing
import { useDebounce } from "../../utils/debounce";
import { PermissionComponent } from "../auth/PermissionComponent";
import { PERMISSIONS } from "../../config/permission";

export default function PostsPage() {
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePost();

  // 🔍 Search state
  const [search, setSearch] = useState(""); // Stores what user types
  const debouncedSearch = useDebounce(search, 500); // debouncedSearch changes AFTER 500ms

  // 📡 Query
  const {
    data, // all pages of posts
    isLoading, // load state
    isError, // error state
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = usePostQueries(debouncedSearch); // API only triggered after user stops typing

  // 🔝 Scroll to top on new search
  // User scrolls down, then search. New results loaded but scroll stays at a bottom (by using this it will be prevented)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [debouncedSearch]);

  // shortens length text
  const truncate = (text?: string, max = 80) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts</h1>

        <PermissionComponent permission={PERMISSIONS.POST_CREATE}>
          <Link
            to="/create"
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Create Post
          </Link>
        </PermissionComponent>
      </div>

      {/* Search (ALWAYS mounted) */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Smooth loading indicator (does NOT unmount UI) */}
      {isFetching && !isLoading && (
        <p className="text-sm text-gray-500">Searching...</p>
      )}

      {/* Error */}
      {isError && <ErrorState error={error as any} />}

      {/* Initial loading */}
      {isLoading ? (
        <Spinner />
      ) : !data || !Array.isArray(data.pages) ? (
        <EmptyState />
      ) : (
        <>
          {/* Posts */}
          {data.pages.map((page, i) => (
            <div key={i} className="space-y-4">
              {page.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.id} - {post.title}
                    </h3>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {/* View */}
                      <PermissionComponent permission={PERMISSIONS.POST_DETAIL}>
                        <button
                          onClick={() => navigate(`/detail/${post.id}`)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          <Eye className="w-4 h-4 text-green-500" />
                        </button>
                      </PermissionComponent>

                      {/* Edit */}
                      <PermissionComponent permission={PERMISSIONS.POST_UPDATE}>
                        <button
                          onClick={() =>
                            navigate(`/edit/${post.id}`, { state: post })
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          <Pencil className="w-4 h-4 text-blue-500" />
                        </button>
                      </PermissionComponent>

                      {/* Delete */}
                      <PermissionComponent permission={PERMISSIONS.POST_DELETE}>
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this post?",
                            );
                            if (!confirmDelete) return;

                            deletePost(post.id);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </PermissionComponent>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-gray-600 mt-2">{truncate(post.body)}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Load More */}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="w-full py-2 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
