import { ReactNode, useState } from 'react';
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  DollarSign, 
  LogOut, 
  Menu, 
  X,
  User,
  Mail,
  Users,
  MessageSquare,
  Megaphone,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
}

export function AdminLayout({ children, currentSection, onSectionChange, onLogout }: AdminLayoutProps) {
  const { user } = useSupabaseCMS();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { 
      name: 'Dashboard', 
      section: 'dashboard', 
      icon: LayoutDashboard,
      description: 'Overview and statistics'
    },
    { 
      name: 'Blog Posts', 
      section: 'blog', 
      icon: FileText,
      description: 'Manage articles and content'
    },
    { 
      name: 'Services', 
      section: 'services', 
      icon: Briefcase,
      description: 'Edit service offerings'
    },
    { 
      name: 'Pricing', 
      section: 'pricing', 
      icon: DollarSign,
      description: 'Update pricing packages'
    },
    { 
      name: 'Campaigns', 
      section: 'campaigns', 
      icon: Megaphone,
      description: 'Manage marketing campaigns'
    },
    { 
      name: 'Conținut Site', 
      section: 'siteContent', 
      icon: Globe,
      description: 'Edit hero, despre, contact, footer'
    },
    { 
      name: 'Messages', 
      section: 'messages', 
      icon: MessageSquare,
      description: 'View contact messages'
    },
    { 
      name: 'Subscribers', 
      section: 'subscribers', 
      icon: Users,
      description: 'Manage newsletter subscribers'
    },
    { 
      name: 'Email Settings', 
      section: 'email', 
      icon: Mail,
      description: 'Configure email notifications'
    }
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#242444] border-r border-[#a594f9]/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#a594f9]/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#a594f9] rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-[#1a1a2e]" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-[#e8e6f7]">CMS Admin</h1>
                <p className="text-xs text-[#b8b4d1]">Content Management</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#b8b4d1] hover:text-[#e8e6f7]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.section;
                
                return (
                  <button
                    key={item.section}
                    onClick={() => {
                      onSectionChange(item.section);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors group
                      ${isActive 
                        ? 'bg-[#a594f9] text-[#1a1a2e]' 
                        : 'text-[#b8b4d1] hover:text-[#e8e6f7] hover:bg-[#2d2d50]'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1a1a2e]' : 'text-[#a594f9]'}`} />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${isActive ? 'text-[#1a1a2e]' : ''}`}>
                        {item.name}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-[#1a1a2e]/70' : 'text-[#b8b4d1]'}`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-[#a594f9]/20">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#2d2d50]">
              <div className="w-8 h-8 bg-[#9db098] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#1a1a2e]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#e8e6f7] truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-[#b8b4d1] truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full mt-3 text-[#b8b4d1] hover:text-[#e8e6f7] hover:bg-[#2d2d50] justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="bg-[#242444] border-b border-[#a594f9]/20 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#b8b4d1] hover:text-[#e8e6f7]"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h2 className="text-lg font-medium text-[#e8e6f7] capitalize">
                  {currentSection}
                </h2>
                <p className="text-xs text-[#b8b4d1]">
                  Manage your website content
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-[#e8e6f7]">{user?.name}</p>
                <p className="text-xs text-[#9db098] capitalize">{user?.role}</p>
              </div>
              <div className="w-8 h-8 bg-[#a594f9] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#1a1a2e]" />
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-[#1a1a2e]">
          {children}
        </main>
      </div>
    </div>
  );
}