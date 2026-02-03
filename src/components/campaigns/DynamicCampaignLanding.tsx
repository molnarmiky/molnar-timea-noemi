import { useState } from 'react';
import { Campaign, useCMS } from '../../contexts/CMSContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Check, Heart, Sparkles, Brain, Phone, Mail, MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DynamicCampaignLandingProps {
  campaign: Campaign;
}

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  Heart,
  Sparkles,
  Check,
  Star
};

export function DynamicCampaignLanding({ campaign }: DynamicCampaignLandingProps) {
  const { addCampaignLead } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addCampaignLead(campaign.id, formData);
      toast.success(`🎉 Felicitări! Înscrierea ta la programul "${campaign.title}" a fost confirmată!`);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('A apărut o eroare. Te rog încearcă din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const { hero, stats, about, benefits, howItWorks, testimonials, contact } = campaign.content;

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e8e6f7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a594f9]/20 via-transparent to-[#86A789]/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#a594f9] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#86A789] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#a594f9]/20 rounded-full border border-[#a594f9]/30">
              <Sparkles className="w-4 h-4 text-[#a594f9]" />
              <span className="text-sm text-[#a594f9]">{hero.badge}</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#a594f9] via-[#e8e6f7] to-[#86A789] bg-clip-text text-transparent leading-tight">
              {hero.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#e8e6f7]/80 max-w-3xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90 text-white px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {hero.primaryCta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10 px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[#a594f9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`text-4xl font-bold ${index % 2 === 0 ? 'text-[#a594f9]' : 'text-[#86A789]'}`}>
                  {stat.value}
                </div>
                <div className="text-[#e8e6f7]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#e8e6f7]">
                {about.title}
                <span className="block text-[#a594f9] mt-2">{about.subtitle}</span>
              </h2>
              {about.description.map((para, index) => (
                <p key={index} className="text-lg text-[#e8e6f7]/80 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {about.cards.map((card, index) => {
                const Icon = iconMap[card.icon] || Star;
                return (
                  <Card 
                    key={index}
                    className={`bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-[#a594f9]/20 to-transparent border-[#a594f9]/30' 
                        : 'from-[#86A789]/20 to-transparent border-[#86A789]/30'
                    } p-6 space-y-3 ${index % 2 === 1 ? 'mt-8' : ''}`}
                  >
                    <Icon className={`w-10 h-10 ${index % 2 === 0 ? 'text-[#a594f9]' : 'text-[#86A789]'}`} />
                    <h3 className="font-semibold text-[#e8e6f7]">{card.title}</h3>
                    <p className="text-sm text-[#e8e6f7]/70">{card.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#16213e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#e8e6f7] mb-4">{benefits.title}</h2>
            <p className="text-xl text-[#e8e6f7]/70 max-w-2xl mx-auto">{benefits.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.items.map((benefit, index) => (
              <Card key={index} className="bg-[#1a1a2e] border-[#a594f9]/30 p-6 hover:border-[#a594f9]/60 transition-all hover:shadow-lg hover:shadow-[#a594f9]/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a594f9] to-[#86A789] flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#e8e6f7] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#e8e6f7]/70">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#e8e6f7] mb-4">{howItWorks.title}</h2>
            <p className="text-xl text-[#e8e6f7]/70 max-w-2xl mx-auto">{howItWorks.subtitle}</p>
          </div>
          
          <div className={`grid md:grid-cols-${Math.min(howItWorks.steps.length, 4)} gap-8`}>
            {howItWorks.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a594f9] to-[#86A789] flex items-center justify-center text-2xl font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[#e8e6f7] text-lg">{step.title}</h3>
                  <p className="text-sm text-[#e8e6f7]/70">{step.description}</p>
                </div>
                {index < howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#a594f9] to-[#86A789] opacity-30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#16213e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#e8e6f7] mb-4">{testimonials.title}</h2>
            <p className="text-xl text-[#e8e6f7]/70 max-w-2xl mx-auto">{testimonials.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.items.map((testimonial, index) => (
              <Card key={index} className="bg-[#1a1a2e] border-[#a594f9]/30 p-8 hover:border-[#a594f9]/60 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex-1 mb-6">
                    <p className="text-[#e8e6f7]/80 italic">"{testimonial.text}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a594f9] to-[#86A789] flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#e8e6f7]">{testimonial.name}</div>
                      <div className="text-sm text-[#e8e6f7]/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#e8e6f7] mb-4">{contact.title}</h2>
            <p className="text-xl text-[#e8e6f7]/70">{contact.subtitle}</p>
          </div>
          
          <Card className="bg-[#16213e]/50 border-[#a594f9]/30 p-8">
            {isSubmitted ? (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a594f9] to-[#86A789] flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#e8e6f7]">
                    🎉 Înscrierea ta a fost confirmată!
                  </h3>
                  <p className="text-lg text-[#e8e6f7]/80">
                    Felicitări pentru că ai făcut primul pas către transformare!
                  </p>
                  <p className="text-[#e8e6f7]/70">
                    Te voi contacta în cel mai scurt timp la datele de contact furnizate pentru a stabili prima sesiune.
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-[#e8e6f7]/90">
                      <span className="font-semibold text-[#a594f9]">Următorii pași:</span>
                    </p>
                    <ul className="text-sm text-[#e8e6f7]/70 space-y-1 text-left pl-4">
                      <li>✓ Verifică-ți email-ul pentru confirmarea înscrierii</li>
                      <li>✓ Te voi contacta telefonic în maximum 24 de ore</li>
                      <li>✓ Vom stabili împreună data și ora primei sesiuni</li>
                    </ul>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90 text-white"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Înapoi la Început
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                    Nume complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7] focus:border-[#a594f9]"
                    placeholder="Ion Popescu"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7] focus:border-[#a594f9]"
                    placeholder="ion.popescu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                    Telefon *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7] focus:border-[#a594f9]"
                    placeholder="+40 712 345 678"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                    Mesaj (opțional)
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#1a1a2e] border-[#a594f9]/30 text-[#e8e6f7] focus:border-[#a594f9]"
                    placeholder="Spune-mi pe scurt cu ce te pot ajuta..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90 text-white py-6 text-lg"
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite Mesajul'}
                </Button>
                
                <p className="text-xs text-[#e8e6f7]/60 text-center">
                  Datele tale sunt în siguranță și vor fi folosite doar pentru a te contacta în legătură cu programul.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#a594f9]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl text-[#e8e6f7] mb-4">Molnar Timea Noemi</h3>
              <p className="text-[#e8e6f7]/70 text-sm">
                Cabinet consiliere și dezvoltare personală dedicat să te ajute să descoperi puterea interioară și să trăiești o viață autentică.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#e8e6f7] mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#e8e6f7]/70">
                  <Phone className="w-4 h-4 text-[#a594f9]" />
                  <a href={`tel:${contact.phone}`} className="hover:text-[#a594f9] transition-colors">
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#e8e6f7]/70">
                  <Mail className="w-4 h-4 text-[#a594f9]" />
                  <a href={`mailto:${contact.email}`} className="hover:text-[#a594f9] transition-colors">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#e8e6f7]/70">
                  <MapPin className="w-4 h-4 text-[#a594f9]" />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#e8e6f7] mb-4">Program</h4>
              <div className="space-y-2 text-sm text-[#e8e6f7]/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#a594f9]" />
                  <span>Luni - Vineri: 9:00 - 18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#a594f9]" />
                  <span>Sâmbătă: 10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#a594f9]/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#e8e6f7]/60">
            <p>&copy; 2026 Molnár Timea Noemi. Toate drepturile rezervate.</p>
            <div className="flex gap-6">
              <a 
                href="/" 
                className="hover:text-[#a594f9] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
              >
                Acasă
              </a>
              <a 
                href="/privacy-policy" 
                className="hover:text-[#a594f9] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/privacy-policy';
                }}
              >
                Confidențialitate
              </a>
              <a 
                href="/terms-conditions" 
                className="hover:text-[#a594f9] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/terms-conditions';
                }}
              >
                Termeni
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}