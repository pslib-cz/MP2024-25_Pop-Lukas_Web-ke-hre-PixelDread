import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogPage from "../pages/BlogPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import PostDetail from "../components/PostDetail";
import PostList from "../components/PostList";
import Admins from "../pages/Admins";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="manageAdmins" element={<Admins />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
