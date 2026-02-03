import { useEffect } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { Package } from 'lucide-react';

export function ServicesEditor() {
  const { services, loadServices } = useNewCMS();

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
          Gestionare Servicii
        </h1>
        <p className="text-[#b8b4d1]">
          Editează serviciile oferite și prețurile
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-12 text-center">
        <Package className="mx-auto text-[#b8b4d1] mb-4" size={48} />
        <h3 className="text-xl font-semibold text-[#e8e6f7] mb-2">
          Editor Servicii
        </h3>
        <p className="text-[#b8b4d1]">
          Funcționalitate în dezvoltare. Vei putea edita aici toate detaliile serviciilor.
        </p>
        <p className="text-sm text-[#b8b4d1]/70 mt-2">
          Servicii încărcate: {services.length}
        </p>
      </div>
    </div>
  );
}
