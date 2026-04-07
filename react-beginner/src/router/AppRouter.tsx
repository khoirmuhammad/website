import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/auth/LoginPage";
import PostsPage from "../components/post/PostPage";
import CreatePostPage from "../components/post/CreatePostPage";
import EditPostPage from "../components/post/EditPostPage";
import DetailPostPage from "../components/post/DetailPostPage";
import Layout from "../components/common/Layout";
import PublicRoute from "./PublicRoute";
import { PERMISSIONS } from "../config/permission";

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
            <ProtectedRoute permission={PERMISSIONS.POST_READ}>
              <PostsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute permission={PERMISSIONS.POST_CREATE}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute permission={PERMISSIONS.POST_UPDATE}>
              <EditPostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute permission={PERMISSIONS.POST_DETAIL}>
              <DetailPostPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}
