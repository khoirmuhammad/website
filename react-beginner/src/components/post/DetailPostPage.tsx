import { Link, useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/post/usePostQueries";

export default function DetailPostPage() {
  const { id } = useParams();
  const postId = Number(id);

  const { data, isLoading, isError } = usePostDetail(postId);

  if (isLoading) return <p className="p-4">Loading...</p>;

  if (isError || !data)
    return <p className="p-4 text-red-500">Failed to load post.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to Posts
      </Link>
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        {/* ID */}
        <p className="text-sm text-gray-400">
          Post ID: <span className="font-medium">{data.id}</span>
        </p>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {data.title}
        </h1>

        {/* Body */}
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {data.body}
        </p>
      </div>
    </div>
  );
}
