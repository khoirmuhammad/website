/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import type { FormEvent } from "react";
import { useUpdatePost } from "../../hooks/post/usePostMutations";

export default function EditPostPage() {
  // get route param id = /edit/123 → id = "123"
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const existingPost = location.state;

  const [title, setTitle] = useState(existingPost?.title ?? "");
  const [body, setBody] = useState(existingPost?.body ?? "");

  const { mutate, isPending, isError, error } = useUpdatePost();

  if (!existingPost) {
    return <p>Post not found. Please go back.</p>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        id: Number(id),
        data: {
          title,
          body,
          userId: 1, // include if required
        },
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Posts
        </Link>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Edit Post</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </form>

          {isError && (
            <p className="text-red-500 text-sm">
              {(error as any)?.message || "Update failed"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
