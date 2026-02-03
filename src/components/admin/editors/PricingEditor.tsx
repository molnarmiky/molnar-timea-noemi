import { useEffect } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { DollarSign } from 'lucide-react';

export function PricingEditor() {
  const { pricingPackages, loadPricingPackages } = useNewCMS();

  useEffect(() => {
    loadPricingPackages();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
          Prețuri & Pachete
        </h1>
        <p className="text-[#b8b4d1]">
          Gestionează pachetele de prețuri și ofertele
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-12 text-center">
        <DollarSign className="mx-auto text-[#b8b4d1] mb-4" size={48} />
        <h3 className="text-xl font-semibold text-[#e8e6f7] mb-2">
          Editor Prețuri
        </h3>
        <p className="text-[#b8b4d1]">
          Funcționalitate în dezvoltare. Vei putea edita aici pachetele de prețuri.
        </p>
        <p className="text-sm text-[#b8b4d1]/70 mt-2">
          Pachete încărcate: {pricingPackages.length}
        </p>
      </div>
    </div>
  );
}
