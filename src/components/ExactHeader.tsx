import { useState } from 'react';
import { Menu, X, Phone, Shield } from 'lucide-react';
import logo from 'figma:asset/cf4267bdb822a155ad9fde12895a0375974e88f7.png';

export function ExactHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    { label: 'ACASĂ', id: 'home' },
    { label: 'DESPRE MINE', id: 'about' },
    { label: 'SERVICII', id: 'services', hasDropdown: true },
    { label: 'PREȚURI', id: 'prices' },
    { label: 'BLOG', id: 'blog' }
  ];

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#242444] border-b border-[#a594f9]/20 z-50 shadow-lg shadow-[#a594f9]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Molnar Timea Noemi Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-base sm:text-lg font-medium text-[#e8e6f7]">Molnar Timea Noemi</div>
              <div className="text-xs sm:text-sm text-[#b8b4d1]">Cabinet consiliere și dezvoltare personală</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => item.hasDropdown ? setActiveDropdown(activeDropdown === item.id ? null : item.id) : scrollToSection(item.id)}
                  className="text-sm font-medium text-[#e8e6f7] hover:text-[#a594f9] transition-colors flex items-center"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#2d2d50] shadow-lg border border-[#a594f9]/20 rounded-lg py-2 z-50">
                    <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-sm text-[#e8e6f7] hover:bg-[#242444] rounded">
                      Consiliere individuală
                    </button>
                    <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-sm text-[#e8e6f7] hover:bg-[#242444] rounded">
                      Consiliere adolescenți
                    </button>
                    <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-sm text-[#e8e6f7] hover:bg-[#242444] rounded">
                      Consiliere de cuplu
                    </button>
                    <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-sm text-[#e8e6f7] hover:bg-[#242444] rounded">
                      Parenting
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Phone and Admin */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('contact')}
              className="flex items-center text-sm text-[#b8b4d1] hover:text-[#9db098] transition-colors cursor-pointer"
              title="Contact us"
            >
              <Phone size={16} className="mr-2 text-[#9db098]" />
              <div>
                <div className="text-xs text-[#b8b4d1] uppercase tracking-wide">SUNĂ ACUM!</div>
                <div className="font-medium text-[#e8e6f7]">(+4) 0724-781.466</div>
              </div>
            </button>
            <button 
              onClick={() => {
                window.location.href = '/admin';
              }}
              className="text-[#b8b4d1] hover:text-[#a594f9] p-2 transition-colors"
              title="Admin Panel"
            >
              <Shield size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#e8e6f7] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-[#a594f9]/20 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[#e8e6f7] hover:text-[#a594f9] py-2 px-2 rounded transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[#a594f9]/20">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-center px-2 py-3 bg-[#2d2d50] hover:bg-[#a594f9]/10 text-[#e8e6f7] hover:text-[#9db098] rounded-lg font-medium transition-colors"
                  title="Contact us"
                >
                  <Phone size={16} className="mr-2 text-[#9db098]" />
                  <span>(+4) 0724-781.466</span>
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}