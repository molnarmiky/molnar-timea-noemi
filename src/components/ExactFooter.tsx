import { Phone } from 'lucide-react';

export function ExactFooter() {
  return (
    <footer className="bg-[#2d2d50] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-[#e8e6f7] space-y-4 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#a594f9]">
              BUNĂ, EU SUNT MOLNAR TIMEA NOEMI
            </h2>
            <p className="text-[#b8b4d1] leading-relaxed text-sm sm:text-base">
              Cabinet consiliere și dezvoltare personală
            </p>
          </div>
          
          {/* Right Content - Phone */}
          <div className="text-[#e8e6f7] text-center lg:text-right">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end mb-4">
              <Phone size={28} className="mr-0 sm:mr-4 mb-2 sm:mb-0 text-[#9db098]" />
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#a594f9]">(+4) 0724-781.466</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-[#a594f9]/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#b8b4d1] text-sm">
            <div className="text-center md:text-left">
              © 2025 Molnar Timea Noemi. Toate drepturile rezervate.
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <button 
                onClick={() => {
                  window.history.pushState({}, '', '/privacy-policy');
                  window.location.reload();
                }}
                className="hover:text-[#a594f9] transition-colors cursor-pointer"
              >
                Politica de Confidențialitate
              </button>
              <button 
                onClick={() => {
                  window.history.pushState({}, '', '/terms-conditions');
                  window.location.reload();
                }}
                className="hover:text-[#a594f9] transition-colors cursor-pointer"
              >
                Termeni și Condiții
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}