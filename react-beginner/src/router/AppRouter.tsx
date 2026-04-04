import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/auth/LoginPage";
import PostsPage from "../components/post/PostPage";
import CreatePostPage from "../components/post/CreatePostPage";
import EditPostPage from "../components/post/EditPostPage";
import DetailPostPage from "../components/post/DetailPostPage";
import Layout from "../components/common/Layout";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <DetailPostPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}
