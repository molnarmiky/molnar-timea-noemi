import { useState, useEffect } from 'react';
import { useNewCMS } from '../../contexts/NewCMSContext';
import { PasswordChangeDialog } from './PasswordChangeDialog';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  DollarSign, 
  Image, 
  Info, 
  Phone, 
  LogOut, 
  Lock,
  Menu,
  X
} from 'lucide-react';
import { HeroEditor } from './editors/HeroEditor';
import { AboutEditor } from './editors/AboutEditor';
import { ServicesEditor } from './editors/ServicesEditor';
import { PricingEditor } from './editors/PricingEditor';
import { BlogEditor } from './editors/BlogEditor';
import { ContactEditor } from './editors/ContactEditor';
import { DashboardOverview } from './editors/DashboardOverview';

type TabType = 'dashboard' | 'hero' | 'about' | 'services' | 'pricing' | 'blog' | 'contact';

export function NewAdminDashboard() {
  const { user, logout, needsPasswordChange } = useNewCMS();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show password change dialog on first login
  useEffect(() => {
    if (needsPasswordChange) {
      setShowPasswordDialog(true);
    }
  }, [needsPasswordChange]);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero' as TabType, label: 'Hero Section', icon: Image },
    { id: 'about' as TabType, label: 'Despre Mine', icon: Info },
    { id: 'services' as TabType, label: 'Servicii', icon: Package },
    { id: 'pricing' as TabType, label: 'Prețuri & Pachete', icon: DollarSign },
    { id: 'blog' as TabType, label: 'Blog', icon: FileText },
    { id: 'contact' as TabType, label: 'Contact', icon: Phone },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'pricing':
        return <PricingEditor />;
      case 'blog':
        return <BlogEditor />;
      case 'contact':
        return <ContactEditor />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#242444] border-r border-[#a594f9]/20">
        {/* Logo & User */}
        <div className="p-6 border-b border-[#a594f9]/20">
          <h1 className="text-xl font-bold text-[#e8e6f7] mb-1">
            CMS Admin
          </h1>
          <p className="text-sm text-[#b8b4d1]">
            {user?.name || 'Administrator'}
          </p>
          <p className="text-xs text-[#a594f9] mt-1">
            {user?.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#a594f9]/20 text-[#a594f9] shadow-lg'
                    : 'text-[#b8b4d1] hover:bg-[#1a1a2e]/50 hover:text-[#e8e6f7]'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#a594f9]/20 space-y-2">
          <button
            onClick={() => setShowPasswordDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#b8b4d1] hover:bg-[#1a1a2e]/50 hover:text-[#e8e6f7] transition-all"
          >
            <Lock size={20} />
            <span className="font-medium">Schimbă Parola</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Deconectare</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header - Mobile */}
        <header className="lg:hidden bg-[#242444] border-b border-[#a594f9]/20 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#e8e6f7]">CMS Admin</h1>
            <p className="text-xs text-[#b8b4d1]">{user?.name}</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#e8e6f7] hover:bg-[#1a1a2e]/50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#242444] border-b border-[#a594f9]/20">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#a594f9]/20 text-[#a594f9]'
                        : 'text-[#b8b4d1] hover:bg-[#1a1a2e]/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-[#a594f9]/20 space-y-1">
                <button
                  onClick={() => {
                    setShowPasswordDialog(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#b8b4d1] hover:bg-[#1a1a2e]/50"
                >
                  <Lock size={20} />
                  <span className="font-medium">Schimbă Parola</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Deconectare</span>
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Password Change Dialog */}
      <PasswordChangeDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        isRequired={needsPasswordChange}
      />
    </div>
  );
}
