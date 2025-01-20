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
import BlogList from './pages/BlogList.tsx';
import Admins from './admin/Admins.tsx';
import GDPR from './pages/Gdpr.tsx';
import Cookies from './pages/Cookies.tsx';
import CreateAdmin from './admin/CreateAdmin.tsx';
import BlogDetails from './pages/BlogDetails.tsx';

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

import { useEffect } from 'react';
function App() {
  useEffect(() => {
      CookieConsent.run({
        onChange: function({changedCategories, changedServices}) {
          if (changedCategories.includes('analytics')) {
  
              if (CookieConsent.acceptedCategory('analytics')) {
                  console.log('Analytics category was just enabled');
              } else {
                  console.log('Analytics category was just disabled');
              }
  
              if (changedServices['analytics'].includes('Google Analytics')) {
                  if (CookieConsent.acceptedService('Google Analytics', 'analytics')) {
                      console.log('Google Analytics was just enabled');

                  } else {
                      console.log('Google Analytics was just disabled');
                  }
              }
          }
        },
        categories: {
            necessary: {
                enabled: true,
                readOnly: true 
            },
            analytics: {}
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'Cookie modal description',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        showPreferencesBtn: 'Manage Individual preferences'
                    },
                    preferencesModal: {
                        title: 'Manage cookie preferences',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        savePreferencesBtn: 'Accept current selection',
                        closeIconLabel: 'Close modal',
                        sections: [
                            {
                                title: 'Somebody said ... cookies?',
                                description: 'I want one!'
                            },
                            {
                                title: 'Strictly Necessary cookies',
                                description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Performance and Analytics',
                                description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                linkedCategory: 'analytics'
                            },
                            {
                                title: 'More information',
                                description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                            }
                        ]
                    }

                }
            }
        }
    });
  }
  , []);
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path="/patchnotes" element={<PatchNotes />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/cookies" element={<Cookies />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="createAdmin" element={<CreateAdmin />} />              
              <Route path="statistics" element={<Statistics />} />
              <Route path="admins" element={<Admins />}/>
              <Route path="categories" element={<Categories />} />
              <Route path="content" element={<Content />} />
              <Route path="settings" element={<Settings />} />
              <Route path="createCategory" element={<CreateCategory />} />
              <Route path="createContent" element={<CreateContent />} />
          </Route>

        </Routes>
    </div>
  )
}

export default App
