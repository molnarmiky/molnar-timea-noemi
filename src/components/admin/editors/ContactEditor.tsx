import { useState, useEffect } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { Save, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactEditor() {
  const { loadContent, updateContent } = useNewCMS();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContactContent = async () => {
      const content = await loadContent('contact');
      if (content) {
        setFormData(content);
      }
    };
    loadContactContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateContent('contact', formData);
      if (result.success) {
        toast.success('Informații de contact actualizate cu succes!');
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
          Informații Contact
        </h1>
        <p className="text-[#b8b4d1]">
          Actualizează informațiile de contact și rețelele sociale
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6 space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="+40 XXX XXX XXX"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Adresă
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="Strada, Nr., Oraș, Județ"
          />
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#e8e6f7]">
            Rețele Sociale
          </h3>
          
          <div>
            <label className="block text-sm text-[#b8b4d1] mb-2">
              Facebook
            </label>
            <input
              type="url"
              value={formData.socialMedia.facebook}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, facebook: e.target.value }
              })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-sm text-[#b8b4d1] mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={formData.socialMedia.instagram}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, instagram: e.target.value }
              })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="block text-sm text-[#b8b4d1] mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.socialMedia.linkedin}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
              })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
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
