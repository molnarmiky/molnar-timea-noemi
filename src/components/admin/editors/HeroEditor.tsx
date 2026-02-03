import { useState, useEffect } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function HeroEditor() {
  const { loadContent, updateContent, heroContent } = useNewCMS();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadHeroContent = async () => {
      const content = await loadContent('hero');
      if (content) {
        setFormData(content);
      }
    };
    loadHeroContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateContent('hero', formData);
      if (result.success) {
        toast.success('Hero section actualizată cu succes!');
      } else {
        toast.error(result.error || 'Eroare la actualizare');
      }
    } catch (error) {
      toast.error('Eroare la salvarea conținutului');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
          Hero Section
        </h1>
        <p className="text-[#b8b4d1]">
          Editează conținutul secțiunii principale (banner)
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Titlu Principal
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="ex: Bun venit la cabinetul meu de psihologie"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Subtitlu
          </label>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="ex: Aici găsești suport pentru sănătatea ta mentală..."
          />
        </div>

        {/* CTA Text */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Text Buton CTA
          </label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="ex: Programează o ședință"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            URL Imagine Hero
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="figma:asset/... sau https://images.unsplash.com/..."
          />
          {formData.image && (
            <div className="mt-3 rounded-lg overflow-hidden bg-[#1a1a2e]">
              <img 
                src={formData.image} 
                alt="Hero preview" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800';
                }}
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex gap-3 pt-4 border-t border-[#a594f9]/20">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] text-white rounded-lg hover:from-[#9b86f5] hover:to-[#8f78f0] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {isLoading ? 'Se salvează...' : 'Salvează Modificările'}
          </button>
        </div>
      </div>
    </div>
  );
}
