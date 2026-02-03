import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Dashboard } from './Dashboard';
import { BlogManager } from './BlogManager';
import { ServiceManager } from './ServiceManager';
import { PricingManager } from './PricingManager';
import { EmailSettings } from './EmailSettings';

export function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');

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
    >
      {renderContent()}
    </AdminLayout>
  );
}