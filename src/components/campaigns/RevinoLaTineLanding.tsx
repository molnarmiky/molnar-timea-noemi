import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Check, Heart, Sparkles, Brain, Phone, Mail, MapPin, Calendar, ArrowRight, Clock, Users, Video, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useCMS } from '../../contexts/CMSContext';

export function RevinoLaTineLanding() {
  const { addCampaignLead, campaigns } = useCMS();
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
      // Găsim campania "Revino la Tine"
      const campaign = campaigns.find(c => c.slug === 'revinolatine');
      
      if (!campaign) {
        throw new Error('Campania nu a fost găsită');
      }

      // Salvăm lead-ul în campanie
      await addCampaignLead(campaign.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || 'Înregistrare campanie Revino la Tine'
      });

      toast.success('🎉 Felicitări! Înscrierea ta la programul "Revino la Tine" a fost confirmată!');
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

  // Sesiunile programului - 5 workshopuri gratuite
  const sessions = [
    {
      number: '01',
      date: '16 FEB',
      title: 'De ce ești obosită chiar dacă viața ta arată bine',
      description: 'Aha-ul: nu e lene, e suprasolicitare invizibilă + sistem nervos în „funcționez".',
      bonus: 'Live pe Zoom | 16 Februarie | Ora 19:00',
      color: '#9db098'
    },
    {
      number: '02',
      date: '17 FEB',
      title: 'Capcana Siguranței: de ce schimbarea doare (și nu din motivul pe care îl crezi)',
      description: 'Aha-ul: creierul preferă familiarul, nu fericirea; înveți cum să schimbi fără auto-sabotaj.',
      bonus: 'Live pe Zoom | 17 Februarie | Ora 19:00',
      color: '#d4a574'
    },
    {
      number: '03',
      date: '18 FEB',
      title: 'Mitul Disciplinei: de ce voința e o resursă finită',
      description: 'Aha-ul: nu ai nevoie de "mai multă ambiție", ci de un sistem (ritm, limite, energie).',
      bonus: 'Live pe Zoom | 18 Februarie | Ora 19:00',
      color: '#a594f9'
    },
    {
      number: '04',
      date: '19 FEB',
      title: 'Harta Invizibilă: cum recunoști tiparele care îți conduc viața pe pilot automat',
      description: 'Aha-ul: identifici „programul" (roluri, loialități, frici) și punctul exact unde pierzi puterea.',
      bonus: 'Live pe Zoom | 19 Februarie | Ora 19:00',
      color: '#c4b5fd'
    },
    {
      number: '05',
      date: '20 FEB',
      title: 'Revino la tine: protocolul simplu pentru energie, limite și liniște interioară',
      description: 'Aha-ul: integrezi un mini-ritual + plan de 7 zile (micro-acțiuni) ca să nu rămână doar "wow".',
      bonus: 'Live pe Zoom | 20 Februarie | Ora 19:00',
      color: '#9db098'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6f7]">
      {/* Hero Section - Design modern și impactant */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a594f9] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9db098] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center space-y-8">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Video className="w-4 h-4 text-[#d4a574]" />
              <span className="text-sm text-white font-medium uppercase tracking-wider">
                LIVE PE ZOOM | 16 - 20 FEBRUARIE | ORA 19:00
              </span>
            </div>
            
            {/* Titlu principal - optimizat pentru impact */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-5xl mx-auto">
              Succesul tău a devenit<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] via-[#e8c097] to-[#d4a574]">
                propria ta închisoare?
              </span>
            </h1>
            
            {/* Subtitlu */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Mecanismele schimbării reale: O abordare pragmatică asupra modului în care{' '}
              <span className="text-white font-medium">programele tale mentale</span> îți consumă viața.
            </p>
            
            {/* CTA Principal */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-[#d4a574] hover:bg-[#c49564] text-black font-bold px-10 py-7 text-lg rounded-lg shadow-xl shadow-[#d4a574]/20 transition-all hover:shadow-2xl hover:shadow-[#d4a574]/30 hover:scale-105"
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                VREAU SĂ REVIN LA MINE
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            {/* Info badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-5 h-5 text-[#9db098]" />
                <span className="text-sm font-medium">5 SERI LIVE GRATUIT</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-5 h-5 text-[#a594f9]" />
                <span className="text-sm font-medium">LOCURI LIMITATE</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-5 h-5 text-[#d4a574]" />
                <span className="text-sm font-medium">90 MIN/SEARĂ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Optimizat vizual */}
      <section className="py-16 border-y border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#d4a574]/10 to-transparent border border-[#d4a574]/20">
              <div className="text-5xl md:text-6xl font-bold text-[#d4a574]">5</div>
              <div className="text-white/90 font-medium text-lg">seri live gratuite</div>
              <div className="text-white/60 text-sm">Workshopuri interactive</div>
            </div>
            <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#9db098]/10 to-transparent border border-[#9db098]/20">
              <div className="text-5xl md:text-6xl font-bold text-[#9db098]">16-20</div>
              <div className="text-white/90 font-medium text-lg">Februarie 2026</div>
              <div className="text-white/60 text-sm">Zilnic la ora 19:00</div>
            </div>
            <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#a594f9]/10 to-transparent border border-[#a594f9]/20">
              <div className="text-5xl md:text-6xl font-bold text-[#a594f9]">100%</div>
              <div className="text-white/90 font-medium text-lg">Pe Zoom</div>
              <div className="text-white/60 text-sm">De acasă, în confort</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section - PROGRAMUL CELOR 5 SERI */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm text-[#d4a574] uppercase tracking-[0.2em] font-semibold">Program Complet</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Programul Celor{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a594f9] to-[#9db098]">
                5 Seri
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Zilnic, de la ora 19:00 la 20:30 — 90 de minute care îți pot schimba perspectiva asupra vieții tale
            </p>
          </div>
          
          {/* Sessions - Design card modern */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {sessions.map((session, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/5"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Number Badge - mai mare și mai vizibil */}
                  <div 
                    className="flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg"
                    style={{ backgroundColor: session.color }}
                  >
                    <span className="text-3xl font-bold text-black">{session.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight flex-1 group-hover:text-[#d4a574] transition-colors">
                        {session.title}
                      </h3>
                      <div className="text-4xl sm:text-5xl font-bold text-white/10 lg:text-right">
                        {session.date}
                      </div>
                    </div>
                    
                    <p className="text-lg text-white/80 leading-relaxed">
                      {session.description}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/10">
                        <Video className="w-4 h-4 text-[#d4a574]" />
                        <span className="text-sm text-white/90 font-medium">{session.bonus}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ backgroundColor: session.color }}
                ></div>
              </div>
            ))}
          </div>

          {/* CTA după program */}
          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#a594f9] to-[#9db098] hover:from-[#a594f9]/90 hover:to-[#9db098]/90 text-white font-bold px-10 py-7 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              REZERVĂ-ȚI LOCUL GRATUIT ACUM
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-white/60 text-sm mt-4">
              Locurile sunt limitate • Înscrie-te acum pentru a nu rata nicio seară
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Redesigned */}
      <section id="about" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm text-[#a594f9] uppercase tracking-[0.2em] font-semibold">Despre Program</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Revino la{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a594f9] to-[#9db098]">
                  Tine
                </span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                În ritmul alert al vieții moderne, ne pierdem adesea în așteptările altora și în rolurile pe care le jucăm. 
                Programul "Revino la Tine" este creat special pentru a te ajuta să redescoperi cine ești cu adevărat, 
                dincolo de măști și presiuni sociale.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Prin sesiuni live interactive, exerciții practice și un cadru sigur de explorare, 
                vei învăța să te conectezi autentic cu nevoile, valorile și pasiunile tale.
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#a594f9]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#a594f9]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sesiuni Live</div>
                    <div className="text-sm text-white/60">Interactive pe Zoom</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#9db098]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#9db098]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">100% Gratuit</div>
                    <div className="text-sm text-white/60">Fără costuri ascunse</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#d4a574]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Exerciții Practice</div>
                    <div className="text-sm text-white/60">Aplicabile imediat</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#a594f9]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#a594f9]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Cadru Sigur</div>
                    <div className="text-sm text-white/60">Spațiu de explorare</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-[#a594f9]/20 to-transparent border-[#a594f9]/30 p-8 space-y-4 hover:border-[#a594f9]/60 transition-all hover:shadow-lg hover:shadow-[#a594f9]/20">
                <div className="w-14 h-14 rounded-xl bg-[#a594f9]/20 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[#a594f9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Autocunoaștere</h3>
                <p className="text-white/70 leading-relaxed">Explorează-ți gândurile și emoțiile profunde</p>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#9db098]/20 to-transparent border-[#9db098]/30 p-8 space-y-4 mt-8 hover:border-[#9db098]/60 transition-all hover:shadow-lg hover:shadow-[#9db098]/20">
                <div className="w-14 h-14 rounded-xl bg-[#9db098]/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[#9db098]" />
                </div>
                <h3 className="text-xl font-bold text-white">Vindecare</h3>
                <p className="text-white/70 leading-relaxed">Procesează traume și experiențe dureroase</p>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#9db098]/20 to-transparent border-[#9db098]/30 p-8 space-y-4 hover:border-[#9db098]/60 transition-all hover:shadow-lg hover:shadow-[#9db098]/20">
                <div className="w-14 h-14 rounded-xl bg-[#9db098]/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#9db098]" />
                </div>
                <h3 className="text-xl font-bold text-white">Transformare</h3>
                <p className="text-white/70 leading-relaxed">Construiește-ți viața pe care ți-o dorești</p>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#a594f9]/20 to-transparent border-[#a594f9]/30 p-8 space-y-4 mt-8 hover:border-[#a594f9]/60 transition-all hover:shadow-lg hover:shadow-[#a594f9]/20">
                <div className="w-14 h-14 rounded-xl bg-[#a594f9]/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#a594f9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Echilibru</h3>
                <p className="text-white/70 leading-relaxed">Găsește armonia între toate ariile vieții</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Optimizat */}
      <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm text-[#9db098] uppercase tracking-[0.2em] font-semibold">Beneficii</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ce Vei{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a594f9] to-[#9db098]">
                Câștiga?
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Beneficiile programului care îți vor transforma viața
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Claritate asupra propriei identități',
                description: 'Vei înțelege cine ești cu adevărat, ce îți dorești și ce te face fericit/ă',
                icon: Brain
              },
              {
                title: 'Încredere în sine autentică',
                description: 'Vei dezvolta o relație sănătoasă cu tine însuți/însăți, bazată pe acceptare și compasiune',
                icon: Heart
              },
              {
                title: 'Relații mai profunde',
                description: 'Când te cunoști pe tine, poți crea conexiuni autentice și semnificative cu ceilalți',
                icon: Users
              },
              {
                title: 'Management emoțional',
                description: 'Vei învăța să îți înțelegi și să îți gestionezi emoțiile într-un mod sănătos',
                icon: Sparkles
              },
              {
                title: 'Scop și direcție',
                description: 'Vei descoperi ce îți oferă sens și vei crea un plan clar pentru viitorul tău',
                icon: Star
              },
              {
                title: 'Reziliență crescută',
                description: 'Vei dezvolta abilitatea de a face față provocărilor cu mai multă încredere și calm',
                icon: Check
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-[#1a1a1a] border-white/10 p-8 hover:border-[#a594f9]/60 transition-all hover:shadow-xl hover:shadow-[#a594f9]/10 group">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a594f9] to-[#9db098] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed flex-1">{benefit.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Redesigned */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm text-[#d4a574] uppercase tracking-[0.2em] font-semibold">Testimoniale</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Povești de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a594f9] to-[#9db098]">
                Transformare
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ce spun persoanele care au parcurs programul
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ana M.',
                role: 'Marketing Manager',
                text: 'După ani de zile în care am trăit conform așteptărilor altora, programul "Revino la Tine" m-a ajutat să îmi redescopăr pasiunea și să trăiesc autentic. Sunt recunoscătoare pentru această călătorie!'
              },
              {
                name: 'Mihai P.',
                role: 'Antreprenor',
                text: 'Am învățat să îmi gestionez stresul și să îmi pun pe primul loc sănătatea mintală. Timea m-a ghidat cu empatie și profesionalism printr-o perioadă dificilă de tranziție.'
              },
              {
                name: 'Elena R.',
                role: 'Profesoară',
                text: 'Cel mai valoros lucru pe care l-am dobândit este claritatea asupra cine sunt și ce îmi doresc. Acum iau decizii din încredere, nu din frică. Mulțumesc, Timea!'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-[#1a1a1a] border-white/10 p-8 hover:border-[#a594f9]/60 transition-all hover:shadow-xl hover:shadow-[#a594f9]/10">
                <div className="flex flex-col h-full space-y-6">
                  <div className="flex-1">
                    <div className="text-[#d4a574] mb-4 text-4xl">"</div>
                    <p className="text-white/80 leading-relaxed italic">{testimonial.text}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a594f9] to-[#9db098] flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Design modern și prietenos */}
      <section id="contact-form" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm text-[#a594f9] uppercase tracking-[0.2em] font-semibold">Înscriere Gratuită</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Rezervă-ți{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a594f9] to-[#9db098]">
                Locul
              </span>
            </h2>
            <p className="text-xl text-white/70">
              Completează formularul și te voi contacta în cel mai scurt timp pentru a confirma participarea
            </p>
          </div>
          
          <Card className="bg-[#1a1a1a] border-white/10 p-8 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a594f9] to-[#9db098] flex items-center justify-center mx-auto animate-pulse">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-white">
                    Mulțumesc pentru înscriere!
                  </h3>
                  <p className="text-lg text-white/80">
                    Te voi contacta în curând pentru a confirma participarea ta la program.
                  </p>
                </div>
                <div className="bg-[#0f0f0f] border border-white/10 rounded-lg p-6 space-y-3">
                  <p className="text-white/90 font-semibold">Ce urmează?</p>
                  <ul className="text-white/70 space-y-2 text-left">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#9db098] flex-shrink-0 mt-0.5" />
                      <span>Vei primi un email de confirmare în câteva minute</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#a594f9] flex-shrink-0 mt-0.5" />
                      <span>Te voi contacta telefonic în maximum 24 de ore</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
                      <span>Vei primi link-ul de Zoom cu câteva zile înainte de prima seară</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
                >
                  Trimite alt formular
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-white flex items-center gap-2">
                    Nume complet
                    <span className="text-[#d4a574]">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-white/20 text-white focus:border-[#a594f9] h-12 text-base"
                    placeholder="Ex: Maria Popescu"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-white flex items-center gap-2">
                    Email
                    <span className="text-[#d4a574]">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-white/20 text-white focus:border-[#a594f9] h-12 text-base"
                    placeholder="maria.popescu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-white flex items-center gap-2">
                    Telefon
                    <span className="text-[#d4a574]">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-white/20 text-white focus:border-[#a594f9] h-12 text-base"
                    placeholder="+40 7XX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-white">
                    Mesaj (opțional)
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#0a0a0a] border-white/20 text-white focus:border-[#a594f9] text-base"
                    placeholder="Scrie aici dacă ai întrebări sau informații suplimentare..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#a594f9] to-[#9db098] hover:from-[#a594f9]/90 hover:to-[#9db098]/90 text-white py-7 text-lg font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Se trimite...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      REZERVĂ LOCUL GRATUIT
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-white/50 pt-2">
                  🔒 Datele tale vor fi tratate confidențial și nu vor fi partajate cu terți.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="font-bold text-xl text-white mb-2">Molnár Timea Noemi</h3>
              <p className="text-white/60 text-sm max-w-md">
                Cabinet consiliere și dezvoltare personală dedicat să te ajute să descoperi puterea interioară și să trăiești o viață autentică.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/70 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#a594f9]" />
                <a href="tel:+40745123456" className="hover:text-[#a594f9] transition-colors">
                  +40 745 123 456
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/70 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#a594f9]" />
                <a href="mailto:contact@molnartimeanoemi.ro" className="hover:text-[#a594f9] transition-colors">
                  contact@molnartimeanoemi.ro
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/70 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#a594f9]" />
                <span>Sibiu, România</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
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
