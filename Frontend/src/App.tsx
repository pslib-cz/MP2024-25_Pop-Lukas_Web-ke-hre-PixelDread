import AppRouter from "./router/AppRouter";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

import { useEffect } from 'react';
function App() {
  useEffect(() => {
    let positionMobile: CookieConsent.ConsentModalPosition = 'bottom center';
    let positionDesktop: CookieConsent.ConsentModalPosition = 'bottom right';
    const windowSize = window.innerWidth;
    
    let pos;
    
    if (windowSize > 480)
    {
        pos = positionDesktop
    }
    else pos = positionMobile

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
        guiOptions: {
            consentModal: {
                position: pos,
                layout: 'box'
            }
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
  return <AppRouter />;
}

export default App;
