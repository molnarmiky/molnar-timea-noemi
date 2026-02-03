import { useState, useEffect, useMemo } from 'react';
import { SupabaseCMSProvider, useSupabaseCMS } from './contexts/SupabaseCMSContext';
import { PublicWebsite } from './components/PublicWebsite';
import { AdminLogin } from './components/admin/AdminLogin';
import { ChangePasswordModal } from './components/admin/ChangePasswordModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { CampaignRouter } from './components/campaigns/CampaignRouter';
import { Toaster } from 'sonner@2.0.3';
import faviconImg from 'figma:asset/8d1e7c4f8d23332e47b7e2bf7ba66cbfff12e4f6.png';

function AppContent() {
  const { user, isAuthenticated, isFirstLogin, isLoading } = useSupabaseCMS();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Set favicon and page title
  useEffect(() => {
    // Update favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconImg;

    // Also add apple-touch-icon for iOS devices
    let appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = faviconImg;

    // Update page title
    document.title = 'Molnar Timea Noemi - Cabinet consiliere și dezvoltare personală';
  }, []);

  // Show password change modal on first login
  useEffect(() => {
    if (isAuthenticated && isFirstLogin) {
      setShowPasswordChange(true);
    }
  }, [isAuthenticated, isFirstLogin]);

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
    if (currentPath.startsWith('/campanii/')) {
      return 'campaign';
    }
    return 'public';
  }, [currentPath, isAuthenticated]);

  // Extract campaign ID from path
  const campaignId = useMemo(() => {
    if (currentPath.startsWith('/campanii/')) {
      return currentPath.replace('/campanii/', '');
    }
    return '';
  }, [currentPath]);

  // Handle route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // Login success handler
  const handleLoginSuccess = (firstLogin: boolean) => {
    if (firstLogin) {
      setShowPasswordChange(true);
    }
    navigate('/admin');
  };

  // Password change success handler
  const handlePasswordChangeSuccess = () => {
    setShowPasswordChange(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#a594f9] border-t-transparent"></div>
          <p className="mt-4 text-white/60">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // Render appropriate view
  return (
    <>
      {currentView === 'login' && (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}

      {currentView === 'admin' && (
        <AdminDashboard onNavigate={navigate} />
      )}

      {currentView === 'public' && (
        <PublicWebsite onNavigate={navigate} />
      )}

      {currentView === 'privacy' && (
        <PrivacyPolicy onNavigate={navigate} />
      )}

      {currentView === 'terms' && (
        <TermsConditions onNavigate={navigate} />
      )}

      {currentView === 'campaign' && (
        <CampaignRouter campaignId={campaignId} onNavigate={navigate} />
      )}

      {/* Password Change Modal */}
      {showPasswordChange && user && (
        <ChangePasswordModal
          userId={user.id}
          isFirstLogin={isFirstLogin}
          onClose={() => !isFirstLogin && setShowPasswordChange(false)}
          onSuccess={handlePasswordChangeSuccess}
        />
      )}

      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e8e6f7'
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <SupabaseCMSProvider>
      <AppContent />
    </SupabaseCMSProvider>
  );
}
