import { useState } from 'react';

export function ExactCookieConsent() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#242444] border-t border-[#a594f9]/20 text-[#e8e6f7] p-4 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm leading-relaxed flex-1 text-[#b8b4d1]">
            Folosim cookie-uri pentru a ne asigura că îți oferim cea mai bună experiență pe site. Dacă vei continua să folosești acest site, vom presupune că ești de acord cu acest lucru.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => setIsVisible(false)}
              className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-6 py-2 rounded-full text-sm transition-colors font-medium"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="border border-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] text-[#9db098] px-6 py-2 rounded-full text-sm transition-colors"
            >
              Detalii
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}