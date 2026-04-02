import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "../components/post/PostPage";
import CreatePostPage from "../components/post/CreatePostPage";
import EditPostPage from "../components/post/EditPostPage";
import DetailPostPage from "../components/post/DetailPostPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        <Route path="/detail/:id" element={<DetailPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
