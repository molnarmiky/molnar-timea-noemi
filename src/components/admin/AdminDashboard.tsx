import { useState } from 'react';
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { AdminLayout } from './AdminLayout';
import { Dashboard } from './Dashboard';
import { BlogManager } from './BlogManager';
import { ServiceManager } from './ServiceManager';
import { PricingManager } from './PricingManager';
import { CampaignManager } from './CampaignManager';
import { EmailSettings } from './EmailSettings';
import { SiteContentManager } from './SiteContentManager';
import { ContactMessages } from './ContactMessages';
import { SubscribersManager } from './SubscribersManager';

export function AdminDashboard({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const { user, logout } = useSupabaseCMS();

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/');
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'blog':
        return <BlogManager />;
      case 'services':
        return <ServiceManager />;
      case 'pricing':
        return <PricingManager />;
      case 'campaigns':
        return <CampaignManager />;
      case 'siteContent':
        return <SiteContentManager />;
      case 'messages':
        return <ContactMessages />;
      case 'subscribers':
        return <SubscribersManager />;
      case 'email':
        return <EmailSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout 
      currentSection={currentSection} 
      onSectionChange={setCurrentSection}
      onLogout={handleLogout}
    >
      {renderContent()}
    </AdminLayout>
  );
}