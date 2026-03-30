import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Mail, Globe, MapPin, Youtube, TrendingUp, Megaphone } from 'lucide-react';

import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import EnquiryManagement from './pages/EnquiryManagement';
import BookingManagement from './pages/BookingManagement';
import ContentStudio from './pages/ContentStudio';
import MarketingUpdate from './pages/MarketingUpdate';
import PromotionKanban from './pages/PromotionKanban';
import ImpactStudy from './pages/ImpactStudy';
import Invoices from './pages/Invoices';
import { Placeholder } from './pages/Placeholder';
import { SECTIONS } from './lib/constants';

export default function App() {
  const builtPages = [
    'briefing', 'enquiry', 'booking', 'content', 
    'newsletter', 'website', 'google', 
    'youtube', 'promotion', 'publicity', 
    'impact', 'invoices'
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* Main Hero Page */}
          <Route path="/" element={<Home />} />
          
          {/* Pre-built pages - Phase 2 */}
          <Route path="/enquiry" element={<EnquiryManagement />} />
          <Route path="/booking" element={<BookingManagement />} />
          <Route path="/content" element={<ContentStudio />} />
          
          {/* Pre-built pages - Phase 3 */}
          <Route path="/newsletter" element={<MarketingUpdate title="Newsletter Updates" icon={Mail} />} />
          <Route path="/website" element={<MarketingUpdate title="Website Updates" icon={Globe} />} />
          <Route path="/google" element={<MarketingUpdate title="Google Profile" icon={MapPin} />} />
          
          <Route path="/youtube" element={<PromotionKanban title="YouTube Editing" icon={Youtube} />} />
          <Route path="/promotion" element={<PromotionKanban title="Book Promotion" icon={TrendingUp} />} />
          <Route path="/publicity" element={<PromotionKanban title="Publicity & PR" icon={Megaphone} />} />
          
          <Route path="/impact" element={<ImpactStudy />} />
          <Route path="/invoices" element={<Invoices />} />

          {/* Dynamically Generate Placeholders for everything else */}
          {SECTIONS.filter(s => !builtPages.includes(s.id)).map((section) => {
            return React.createElement(Route as any, { 
              key: section.id, 
              path: section.path, 
              element: <Placeholder sectionId={section.id} /> 
            });
          })}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
