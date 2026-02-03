import { useState } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-700 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm leading-relaxed">
            Acest site utilizează cookie-uri pentru a îmbunătăți experiența dumneavoastră de navigare și pentru a oferi funcționalități personalizate. 
            Prin continuarea utilizării site-ului, sunteți de acord cu folosirea cookie-urilor conform 
            <a href="#" className="underline hover:text-purple-300"> Politicii de Confidențialitate</a>.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => setIsVisible(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="border border-gray-400 hover:border-white text-white px-6 py-2 rounded-full text-sm transition-colors"
            >
              Detalii
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}