/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreatePost } from "../../hooks/post/usePostMutations";
import type { CreatePostPayload } from "../../types/post.types";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // mutate : function to trigger API
  const { mutate, isPending, isError, error } = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: CreatePostPayload = {
      title,
      body,
      userId: 1,
    };

    mutate(payload, {
      onSuccess: () => {
        setTitle(""); // reset form
        setBody(""); // reset form
        navigate("/"); // redirect after success
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Back button */}
        <Link to="/" className="inline-block text-blue-500 hover:underline">
          ← Back to Posts
        </Link>

        {/* Form card */}
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create Post</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </form>

          {/* Error UI */}
          {isError && (
            <p className="text-red-500 text-sm">
              {(error as any)?.message || "Failed to create post"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
