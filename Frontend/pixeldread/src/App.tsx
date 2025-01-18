import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Admin from './admin/Admin.tsx';
import Statistics from './admin/Statistics.tsx';
import Categories from './admin/Categories.tsx';
import Content from './admin/Content.tsx';
import Settings from './admin/Settings.tsx';
import CreateCategory from './admin/CreateCategory.tsx';
import CreateContent from './admin/CreateContent.tsx';
import Login from './pages/Login.tsx';
import FAQ from './pages/FAQ.tsx';
import PatchNotes from './pages/PatchNotes.tsx';
import Blog from './pages/Blog.tsx';
import Admins from './admin/Admins.tsx';
import GDPR from './pages/Gdpr.tsx';
import Cookies from './pages/Cookies.tsx';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path="/patchnotes" element={<PatchNotes />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/cookies" element={<Cookies />} />

          <Route path="/admin" element={<Admin />}>
              <Route path="statistics" element={<Statistics />} />
              <Route path="admins" element={<Admins />} />
              <Route path="categories" element={<Categories />} />
              <Route path="content" element={<Content />} />
              <Route path="settings" element={<Settings />} />
              <Route path="createCategory" element={<CreateCategory />} />
              <Route path="createContent" element={<CreateContent />} />
          </Route>

          <Route path="blog" element={<h1>Blog</h1>} />
        </Routes>
    </div>
  )
}

export default App
