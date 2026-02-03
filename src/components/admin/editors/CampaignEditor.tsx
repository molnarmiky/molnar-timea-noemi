import { useState, useEffect } from 'react';
import { useCMS } from '../../../contexts/CMSContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Card } from '../../ui/card';
import { Label } from '../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CampaignEditorProps {
  campaign: any;
  isCreating: boolean;
  onBack: () => void;
}

export function CampaignEditor({ campaign, isCreating, onBack }: CampaignEditorProps) {
  const { createCampaign, updateCampaign } = useCMS();
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    active: true,
    hero: {
      badge: 'Campanie Specială 2026',
      title: 'Titlu Campanie',
      subtitle: 'Descriere campanie',
      primaryCta: 'Începe Transformarea',
      secondaryCta: 'Află Mai Multe'
    },
    stats: [
      { value: '8 săptămâni', label: 'Program intensiv' },
      { value: '1-la-1', label: 'Ședințe personalizate' },
      { value: '24/7', label: 'Suport continuu' }
    ],
    about: {
      title: 'Despre Program',
      subtitle: 'Subtitlu',
      description: ['Paragraf 1', 'Paragraf 2'],
      cards: [
        { icon: 'Brain', title: 'Autocunoaștere', description: 'Descriere' },
        { icon: 'Heart', title: 'Vindecare', description: 'Descriere' },
        { icon: 'Sparkles', title: 'Transformare', description: 'Descriere' },
        { icon: 'Check', title: 'Echilibru', description: 'Descriere' }
      ]
    },
    benefits: {
      title: 'Ce Vei Câștiga?',
      subtitle: 'Beneficiile programului',
      items: [
        { title: 'Beneficiu 1', description: 'Descriere beneficiu 1' },
        { title: 'Beneficiu 2', description: 'Descriere beneficiu 2' },
        { title: 'Beneficiu 3', description: 'Descriere beneficiu 3' }
      ]
    },
    howItWorks: {
      title: 'Cum Funcționează?',
      subtitle: 'Procesul pas cu pas',
      steps: [
        { step: '1', title: 'Pas 1', description: 'Descriere pas 1' },
        { step: '2', title: 'Pas 2', description: 'Descriere pas 2' },
        { step: '3', title: 'Pas 3', description: 'Descriere pas 3' }
      ]
    },
    testimonials: {
      title: 'Povești de Transformare',
      subtitle: 'Ce spun participanții',
      items: [
        { name: 'Nume P.', role: 'Profesie', text: 'Testimonial' }
      ]
    },
    contact: {
      title: 'Pregătit/ă să Începi?',
      subtitle: 'Completează formularul',
      phone: '+40 745 123 456',
      email: 'contact@molnartimeanoemi.ro',
      address: 'Sibiu, România'
    }
  });

  useEffect(() => {
    if (campaign && !isCreating) {
      setFormData({
        title: campaign.title,
        slug: campaign.slug,
        active: campaign.active,
        ...campaign.content
      });
    }
  }, [campaign, isCreating]);

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Titlul și slug-ul sunt obligatorii');
      return;
    }

    setIsSaving(true);
    try {
      const { title, slug, active, ...content } = formData;
      
      if (isCreating) {
        await createCampaign({
          title,
          slug,
          active,
          content
        });
        toast.success('Campania a fost creată cu succes!');
      } else {
        await updateCampaign(campaign.id, {
          title,
          slug,
          active,
          content
        });
        toast.success('Campania a fost actualizată cu succes!');
      }
      
      onBack();
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('A apărut o eroare la salvarea campaniei');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, defaultItem: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      const key = keys[keys.length - 1];
      current[key] = [...current[key], defaultItem];
      return newData;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      const key = keys[keys.length - 1];
      current[key] = current[key].filter((_: any, i: number) => i !== index);
      return newData;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-[#e8e6f7]">
              {isCreating ? 'Campanie Nouă' : `Editare: ${campaign?.title}`}
            </h2>
            <p className="text-[#e8e6f7]/70 mt-1">
              {isCreating ? 'Creează o nouă campanie de marketing' : 'Modifică conținutul campaniei'}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Se salvează...' : 'Salvează'}
        </Button>
      </div>

      {/* Form */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#16213e] border border-[#a594f9]/30">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Statistici</TabsTrigger>
          <TabsTrigger value="about">Despre</TabsTrigger>
          <TabsTrigger value="benefits">Beneficii</TabsTrigger>
          <TabsTrigger value="process">Proces</TabsTrigger>
          <TabsTrigger value="testimonials">Testimoniale</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titlu Campanie *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                placeholder="Ex: Revino la Tine"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <div className="flex items-center gap-2">
                <span className="text-[#e8e6f7]/50">/campanii/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                  placeholder="revinolatine"
                />
              </div>
              <p className="text-xs text-[#e8e6f7]/50">
                Doar litere mici, cifre și liniuțe. Ex: revinolatine
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Hero */}
        <TabsContent value="hero">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hero-badge">Badge</Label>
              <Input
                id="hero-badge"
                value={formData.hero.badge}
                onChange={(e) => updateField('hero.badge', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-title">Titlu Principal</Label>
              <Input
                id="hero-title"
                value={formData.hero.title}
                onChange={(e) => updateField('hero.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitlu</Label>
              <Textarea
                id="hero-subtitle"
                value={formData.hero.subtitle}
                onChange={(e) => updateField('hero.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-cta-primary">Text Buton Principal</Label>
                <Input
                  id="hero-cta-primary"
                  value={formData.hero.primaryCta}
                  onChange={(e) => updateField('hero.primaryCta', e.target.value)}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-cta-secondary">Text Buton Secundar</Label>
                <Input
                  id="hero-cta-secondary"
                  value={formData.hero.secondaryCta}
                  onChange={(e) => updateField('hero.secondaryCta', e.target.value)}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Stats */}
        <TabsContent value="stats">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-[#1a1a2e] rounded-lg">
                <div className="space-y-2">
                  <Label>Valoare</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...formData.stats];
                      newStats[index].value = e.target.value;
                      updateField('stats', newStats);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Etichetă</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...formData.stats];
                      newStats[index].label = e.target.value;
                      updateField('stats', newStats);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                  />
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input
                value={formData.about.title}
                onChange={(e) => updateField('about.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Subtitlu</Label>
              <Input
                value={formData.about.subtitle}
                onChange={(e) => updateField('about.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Paragrafe</Label>
              {formData.about.description.map((para, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={para}
                    onChange={(e) => {
                      const newDesc = [...formData.about.description];
                      newDesc[index] = e.target.value;
                      updateField('about.description', newDesc);
                    }}
                    className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                    rows={3}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('about.description', index)}
                    className="border-red-500/50 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('about.description', '')}
                className="border-[#a594f9]/50 text-[#a594f9]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Paragraf
              </Button>
            </div>

            <div className="space-y-4">
              <Label>Carduri</Label>
              {formData.about.cards.map((card, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e] rounded-lg space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Icon (Brain, Heart, etc)"
                      value={card.icon}
                      onChange={(e) => {
                        const newCards = [...formData.about.cards];
                        newCards[index].icon = e.target.value;
                        updateField('about.cards', newCards);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Input
                      placeholder="Titlu"
                      value={card.title}
                      onChange={(e) => {
                        const newCards = [...formData.about.cards];
                        newCards[index].title = e.target.value;
                        updateField('about.cards', newCards);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('about.cards', index)}
                      className="border-red-500/50 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Descriere"
                    value={card.description}
                    onChange={(e) => {
                      const newCards = [...formData.about.cards];
                      newCards[index].description = e.target.value;
                      updateField('about.cards', newCards);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    rows={2}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('about.cards', { icon: 'Star', title: '', description: '' })}
                className="border-[#a594f9]/50 text-[#a594f9]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Card
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Benefits */}
        <TabsContent value="benefits">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input
                value={formData.benefits.title}
                onChange={(e) => updateField('benefits.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Subtitlu</Label>
              <Input
                value={formData.benefits.subtitle}
                onChange={(e) => updateField('benefits.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Beneficii</Label>
              {formData.benefits.items.map((item, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e] rounded-lg space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Titlu beneficiu"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...formData.benefits.items];
                        newItems[index].title = e.target.value;
                        updateField('benefits.items', newItems);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('benefits.items', index)}
                      className="border-red-500/50 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Descriere beneficiu"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...formData.benefits.items];
                      newItems[index].description = e.target.value;
                      updateField('benefits.items', newItems);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    rows={2}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('benefits.items', { title: '', description: '' })}
                className="border-[#a594f9]/50 text-[#a594f9]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Beneficiu
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Process */}
        <TabsContent value="process">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input
                value={formData.howItWorks.title}
                onChange={(e) => updateField('howItWorks.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Subtitlu</Label>
              <Input
                value={formData.howItWorks.subtitle}
                onChange={(e) => updateField('howItWorks.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Pași</Label>
              {formData.howItWorks.steps.map((step, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e] rounded-lg space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Număr"
                      value={step.step}
                      onChange={(e) => {
                        const newSteps = [...formData.howItWorks.steps];
                        newSteps[index].step = e.target.value;
                        updateField('howItWorks.steps', newSteps);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Input
                      placeholder="Titlu"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...formData.howItWorks.steps];
                        newSteps[index].title = e.target.value;
                        updateField('howItWorks.steps', newSteps);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('howItWorks.steps', index)}
                      className="border-red-500/50 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Descriere"
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...formData.howItWorks.steps];
                      newSteps[index].description = e.target.value;
                      updateField('howItWorks.steps', newSteps);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    rows={2}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('howItWorks.steps', { step: '', title: '', description: '' })}
                className="border-[#a594f9]/50 text-[#a594f9]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Pas
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input
                value={formData.testimonials.title}
                onChange={(e) => updateField('testimonials.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Subtitlu</Label>
              <Input
                value={formData.testimonials.subtitle}
                onChange={(e) => updateField('testimonials.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Testimoniale</Label>
              {formData.testimonials.items.map((item, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e] rounded-lg space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Nume"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...formData.testimonials.items];
                        newItems[index].name = e.target.value;
                        updateField('testimonials.items', newItems);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Input
                      placeholder="Rol/Profesie"
                      value={item.role}
                      onChange={(e) => {
                        const newItems = [...formData.testimonials.items];
                        newItems[index].role = e.target.value;
                        updateField('testimonials.items', newItems);
                      }}
                      className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('testimonials.items', index)}
                      className="border-red-500/50 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Testimonial"
                    value={item.text}
                    onChange={(e) => {
                      const newItems = [...formData.testimonials.items];
                      newItems[index].text = e.target.value;
                      updateField('testimonials.items', newItems);
                    }}
                    className="bg-[#16213e] border-[#a594f9]/30 text-[#e8e6f7]"
                    rows={3}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('testimonials.items', { name: '', role: '', text: '' })}
                className="border-[#a594f9]/50 text-[#a594f9]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Testimonial
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact">
          <Card className="bg-[#16213e] border-[#a594f9]/30 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input
                value={formData.contact.title}
                onChange={(e) => updateField('contact.title', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Subtitlu</Label>
              <Input
                value={formData.contact.subtitle}
                onChange={(e) => updateField('contact.subtitle', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input
                  value={formData.contact.phone}
                  onChange={(e) => updateField('contact.phone', e.target.value)}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={formData.contact.email}
                  onChange={(e) => updateField('contact.email', e.target.value)}
                  className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Adresă</Label>
              <Input
                value={formData.contact.address}
                onChange={(e) => updateField('contact.address', e.target.value)}
                className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7]"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}