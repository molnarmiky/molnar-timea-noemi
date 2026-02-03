import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export function NewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'ACASĂ', id: 'home' },
    { label: 'DESPRE MINE', id: 'about' },
    { label: 'SERVICII', id: 'services' },
    { label: 'PREȚURI', id: 'prices' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'services') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'prices') {
      document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'blog') {
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div>
              <div className="font-medium text-gray-900">Molnar Timea Noemi</div>
              <div className="text-xs text-gray-500">Cabinet consiliere și dezvoltare personală</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Phone and Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2" />
              <div>
                <div className="text-xs text-gray-500">SUNǍ ACUM!</div>
                <div className="font-medium">(+4) 0740-08.19.18</div>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-purple-600 py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Phone size={16} className="mr-2" />
                  <span>(+4) 0740-08.19.18</span>
                </div>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                >
                  Contact
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}