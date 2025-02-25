import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogPage from "../pages/BlogPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import PostDetail from "../components/PostDetail";
import PostList from "../components/PostList";
import Admins from "../pages/Admin/AdminManagePage";
import NotFoundPage from "../pages/NotFoundPage";
import GDPR from "../pages/GDPR";
import Cookies from "../pages/Cookies";
import BlogManagePage from "../pages/Admin/BlogManagePage";
import FAQManagePage from "../pages/Admin/FAQManagePage";
import PatchManagePage from "../pages/Admin/PatchManagePage";
import PatchNotesPage from "../pages/PatchNotesPage";
import FAQPage from "../pages/FAQPage";
import PostDetailEdit from "../components/PostDetailEdit";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/patch" element={<PatchNotesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/cookie-policy" element={<Cookies />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="manageAdmins" element={<Admins />} />
          <Route path="blog" element={<BlogManagePage />} />
          <Route path="blog/edit/:slug" element={<PostDetailEdit />} />
          <Route path="faq" element={<FAQManagePage />} />
          <Route path="patch" element={<PatchManagePage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
