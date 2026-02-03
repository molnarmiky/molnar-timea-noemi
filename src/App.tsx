import { useState, useEffect, useMemo } from 'react';
import { CMSProvider, useCMS } from './contexts/CMSContext';
import { PublicWebsite } from './components/PublicWebsite';
import { LoginPage } from './components/admin/LoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

function AppContent() {
  const { isAuthenticated, isLoading } = useCMS();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Determine current view based on path and authentication
  const currentView = useMemo(() => {
    if (currentPath.startsWith('/admin')) {
      return isAuthenticated ? 'admin' : 'login';
    }
    if (currentPath === '/privacy-policy') {
      return 'privacy';
    }
    if (currentPath === '/terms-conditions') {
      return 'terms';
    }
    return 'public';
  }, [currentPath, isAuthenticated]);

  // Handle route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle authentication redirect
  useEffect(() => {
    if (isAuthenticated && currentPath.startsWith('/admin') && currentView === 'login') {
      // User just logged in, stay on admin route
      setCurrentPath('/admin');
    }
  }, [isAuthenticated, currentPath, currentView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#a594f9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#e8e6f7]">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return <LoginPage />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicy />;
  }

  if (currentView === 'terms') {
    return <TermsConditions />;
  }

  return <PublicWebsite />;
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}