import { useState, useEffect } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AboutEditor() {
  const { loadContent, updateContent } = useNewCMS();
  const [formData, setFormData] = useState({
    title: '',
    description: [''],
    credentials: [''],
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAboutContent = async () => {
      const content = await loadContent('about');
      if (content) {
        setFormData(content);
      }
    };
    loadAboutContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateContent('about', formData);
      if (result.success) {
        toast.success('Secțiunea Despre Mine actualizată cu succes!');
      } else {
        toast.error(result.error || 'Eroare la actualizare');
      }
    } catch (error) {
      toast.error('Eroare la salvarea conținutului');
    } finally {
      setIsLoading(false);
    }
  };

  const addDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  const removeDescription = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index)
    });
  };

  const updateDescription = (index: number, value: string) => {
    const updated = [...formData.description];
    updated[index] = value;
    setFormData({ ...formData, description: updated });
  };

  const addCredential = () => {
    setFormData({ ...formData, credentials: [...formData.credentials, ''] });
  };

  const removeCredential = (index: number) => {
    setFormData({
      ...formData,
      credentials: formData.credentials.filter((_, i) => i !== index)
    });
  };

  const updateCredential = (index: number, value: string) => {
    const updated = [...formData.credentials];
    updated[index] = value;
    setFormData({ ...formData, credentials: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
          Despre Mine
        </h1>
        <p className="text-[#b8b4d1]">
          Editează conținutul secțiunii Despre Mine
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            Titlu Secțiune
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="ex: Despre Mine"
          />
        </div>

        {/* Description Paragraphs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#e8e6f7]">
              Paragrafe Descriere
            </label>
            <button
              onClick={addDescription}
              className="px-3 py-1.5 bg-[#a594f9]/20 border border-[#a594f9]/30 text-[#a594f9] rounded-lg hover:bg-[#a594f9]/30 transition-all text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Adaugă Paragraf
            </button>
          </div>
          <div className="space-y-3">
            {formData.description.map((para, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={para}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  rows={3}
                  className="flex-1 px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
                  placeholder={`Paragraf ${index + 1}...`}
                />
                {formData.description.length > 1 && (
                  <button
                    onClick={() => removeDescription(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all h-fit"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#e8e6f7]">
              Credențiale Profesionale
            </label>
            <button
              onClick={addCredential}
              className="px-3 py-1.5 bg-[#a594f9]/20 border border-[#a594f9]/30 text-[#a594f9] rounded-lg hover:bg-[#a594f9]/30 transition-all text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Adaugă Credențială
            </button>
          </div>
          <div className="space-y-2">
            {formData.credentials.map((cred, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={cred}
                  onChange={(e) => updateCredential(index, e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
                  placeholder={`Credențială ${index + 1}...`}
                />
                {formData.credentials.length > 1 && (
                  <button
                    onClick={() => removeCredential(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
            URL Imagine Profil
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
            placeholder="figma:asset/... sau https://images.unsplash.com/..."
          />
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
