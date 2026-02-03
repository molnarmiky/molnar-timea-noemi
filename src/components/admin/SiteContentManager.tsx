import { useState } from 'react';
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Save, Home, User, Phone, FileText } from 'lucide-react';

export function SiteContentManager() {
  const { siteContent, updateSiteContent } = useSupabaseCMS();
  const [editedContent, setEditedContent] = useState(siteContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update each section separately
      await updateSiteContent('hero', editedContent.hero);
      await updateSiteContent('about', editedContent.about);
      await updateSiteContent('contact', editedContent.contact);
      await updateSiteContent('footer', editedContent.footer);
      toast.success('Conținutul site-ului a fost actualizat cu succes!');
    } catch (error) {
      toast.error('A apărut o eroare la salvarea conținutului');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#e8e6f7]">Conținut Site Principal</h2>
          <p className="text-[#b8b4d1] mt-2">
            Editează conținutul paginii principale (Hero, Despre, Contact, Footer)
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#a594f9] hover:bg-[#8b7fe6] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Se salvează...' : 'Salvează Modificările'}
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="bg-[#16213e] border-[#a594f9]/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Home className="w-6 h-6 text-[#a594f9]" />
          <h3 className="text-2xl font-semibold text-[#e8e6f7]">Secțiunea Hero (Homepage)</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Titlu Principal
            </label>
            <Textarea
              value={editedContent.hero.title}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, title: e.target.value }
              })}
              rows={2}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Cabinet consiliere și dezvoltare personală"
            />
            <p className="text-xs text-[#b8b4d1] mt-1">Folosește \n pentru a adăuga o linie nouă</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Nume Evidențiat (Highlight)
            </label>
            <Input
              value={editedContent.hero.highlight}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, highlight: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Molnar Timea Noemi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Subtitlu
            </label>
            <Input
              value={editedContent.hero.subtitle}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, subtitle: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Sprijin profesional pentru dezvoltarea personală..."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Text Buton Principal
              </label>
              <Input
                value={editedContent.hero.primaryButtonText}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  hero: { ...editedContent.hero, primaryButtonText: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Vezi serviciile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Text Buton Secundar
              </label>
              <Input
                value={editedContent.hero.secondaryButtonText}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  hero: { ...editedContent.hero, secondaryButtonText: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Programează-te"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card className="bg-[#16213e] border-[#a594f9]/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-[#a594f9]" />
          <h3 className="text-2xl font-semibold text-[#e8e6f7]">Secțiunea Despre Mine</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Titlu
            </label>
            <Input
              value={editedContent.about.title}
              onChange={(e) => setEditedContent({
                ...editedContent,
                about: { ...editedContent.about, title: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="BUNĂ ȘI BINE AI VENIT!"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Primul Paragraf
            </label>
            <Textarea
              value={editedContent.about.paragraph1}
              onChange={(e) => setEditedContent({
                ...editedContent,
                about: { ...editedContent.about, paragraph1: e.target.value }
              })}
              rows={4}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Primul paragraf despre tine..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Al Doilea Paragraf
            </label>
            <Textarea
              value={editedContent.about.paragraph2}
              onChange={(e) => setEditedContent({
                ...editedContent,
                about: { ...editedContent.about, paragraph2: e.target.value }
              })}
              rows={4}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Al doilea paragraf despre tine..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Text Buton
            </label>
            <Input
              value={editedContent.about.buttonText}
              onChange={(e) => setEditedContent({
                ...editedContent,
                about: { ...editedContent.about, buttonText: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Vezi toate serviciile"
            />
          </div>
        </div>
      </Card>

      {/* Contact Section */}
      <Card className="bg-[#16213e] border-[#a594f9]/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="w-6 h-6 text-[#a594f9]" />
          <h3 className="text-2xl font-semibold text-[#e8e6f7]">Informații de Contact</h3>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Telefon
              </label>
              <Input
                value={editedContent.contact.phone}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, phone: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="(+4) 0724-781.466"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Email
              </label>
              <Input
                value={editedContent.contact.email}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, email: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="timeanoemi@gmail.com"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Adresă Cabinet
              </label>
              <Input
                value={editedContent.contact.address}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, address: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Strada Livezii, nr. 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Oraș
              </label>
              <Input
                value={editedContent.contact.city}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, city: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Sibiu, 550042"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Program de Lucru
              </label>
              <Input
                value={editedContent.contact.workingHours}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, workingHours: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Luni - Vineri: 9:00 - 18:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Notă Program
              </label>
              <Input
                value={editedContent.contact.workingNote}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  contact: { ...editedContent.contact, workingNote: e.target.value }
                })}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Programări doar cu agendare prealabilă"
              />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-[#a594f9]/20">
            <h4 className="text-lg font-semibold text-[#e8e6f7]">Social Media</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                  Facebook URL
                </label>
                <Input
                  value={editedContent.contact.facebookUrl}
                  onChange={(e) => setEditedContent({
                    ...editedContent,
                    contact: { ...editedContent.contact, facebookUrl: e.target.value }
                  })}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                  placeholder="https://www.facebook.com/profile.php?id=..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                  Instagram URL
                </label>
                <Input
                  value={editedContent.contact.instagramUrl}
                  onChange={(e) => setEditedContent({
                    ...editedContent,
                    contact: { ...editedContent.contact, instagramUrl: e.target.value }
                  })}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                  placeholder="https://www.instagram.com/mindresetnlpbytimea/"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                  LinkedIn URL
                </label>
                <Input
                  value={editedContent.contact.linkedinUrl}
                  onChange={(e) => setEditedContent({
                    ...editedContent,
                    contact: { ...editedContent.contact, linkedinUrl: e.target.value }
                  })}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Section */}
      <Card className="bg-[#16213e] border-[#a594f9]/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-[#a594f9]" />
          <h3 className="text-2xl font-semibold text-[#e8e6f7]">Footer</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Titlu Footer
            </label>
            <Input
              value={editedContent.footer.title}
              onChange={(e) => setEditedContent({
                ...editedContent,
                footer: { ...editedContent.footer, title: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="BUNĂ, EU SUNT MOLNAR TIMEA NOEMI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Subtitlu Footer
            </label>
            <Input
              value={editedContent.footer.subtitle}
              onChange={(e) => setEditedContent({
                ...editedContent,
                footer: { ...editedContent.footer, subtitle: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="Cabinet consiliere și dezvoltare personală"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Telefon Footer
            </label>
            <Input
              value={editedContent.footer.phone}
              onChange={(e) => setEditedContent({
                ...editedContent,
                footer: { ...editedContent.footer, phone: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="(+4) 0724-781.466"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Text Copyright
            </label>
            <Input
              value={editedContent.footer.copyrightText}
              onChange={(e) => setEditedContent({
                ...editedContent,
                footer: { ...editedContent.footer, copyrightText: e.target.value }
              })}
              className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              placeholder="© 2025 Molnar Timea Noemi. Toate drepturile rezervate."
            />
          </div>
        </div>
      </Card>

      {/* Save Button at Bottom */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="bg-[#a594f9] hover:bg-[#8b7fe6] text-white"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Se salvează...' : 'Salvează Toate Modificările'}
        </Button>
      </div>
    </div>
  );
}