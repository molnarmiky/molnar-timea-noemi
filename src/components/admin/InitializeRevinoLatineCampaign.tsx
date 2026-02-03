import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Campania "Revino la Tine" extrasă din componenta existentă
const revinoLatineCampaign = {
  id: 'revino-la-tine-2026',
  title: 'Revino la Tine',
  slug: 'revinolatine',
  active: true,
  content: {
    hero: {
      badge: 'LIVE PE ZOOM | 16 - 20 FEBRUARIE | ORA 19:00',
      title: 'Succesul tău a devenit propria ta închisoare?',
      titleHighlight: '',
      subtitle: 'Mecanismele schimbării reale: O abordare pragmatică asupra modului în care programele tale mentale îți consumă viața.',
      primaryCta: 'VREAU SĂ REVIN LA MINE',
      secondaryCta: 'Află Mai Multe',
      bottomText: '5 SERI LIVE GRATUIT'
    },
    stats: [
      { value: '5 seri', label: 'Live gratuit' },
      { value: '16-20 Feb', label: 'Zilnic ora 19:00' },
      { value: 'Pe Zoom', label: 'De acasă' }
    ],
    about: {
      title: 'Despre Program',
      subtitle: 'Revino la Tine',
      description: [
        'În ritmul alert al vieții moderne, ne pierdem adesea în așteptările altora și în rolurile pe care le jucăm. Programul "Revino la Tine" este creat special pentru a te ajuta să redescoperi cine ești cu adevărat, dincolo de măști și presiuni sociale.',
        'Prin sesiuni live interactive, exerciții practice și un cadru sigur de explorare, vei învăța să te conectezi autentic cu nevoile, valorile și pasiunile tale.'
      ],
      cards: [
        {
          icon: 'Brain',
          title: 'Autocunoaștere',
          description: 'Explorează-ți gândurile și emoțiile profunde'
        },
        {
          icon: 'Heart',
          title: 'Vindecare',
          description: 'Procesează traume și experiențe dureroase'
        },
        {
          icon: 'Sparkles',
          title: 'Transformare',
          description: 'Construiește-ți viața pe care ți-o dorești'
        },
        {
          icon: 'Check',
          title: 'Echilibru',
          description: 'Găsește armonia între toate ariile vieții'
        }
      ]
    },
    benefits: {
      title: 'Ce Vei Câștiga?',
      subtitle: 'Beneficiile programului care îți vor transforma viața',
      items: [
        {
          title: 'Claritate asupra propriei identități',
          description: 'Vei înțelege cine ești cu adevărat, ce îți dorești și ce te face fericit/ă'
        },
        {
          title: 'Încredere în sine autentică',
          description: 'Vei dezvolta o relație sănătoasă cu tine însuți/însăți, bazată pe acceptare și compasiune'
        },
        {
          title: 'Relații mai profunde',
          description: 'Când te cunoști pe tine, poți crea conexiuni autentice și semnificative cu ceilalți'
        },
        {
          title: 'Management emoțional',
          description: 'Vei învăța să îți înțelegi și să îți gestionezi emoțiile într-un mod sănătos'
        },
        {
          title: 'Scop și direcție',
          description: 'Vei descoperi ce îți oferă sens și vei crea un plan clar pentru viitorul tău'
        },
        {
          title: 'Reziliență crescută',
          description: 'Vei dezvolta abilitatea de a face față provocărilor cu mai multă încredere și calm'
        }
      ]
    },
    howItWorks: {
      title: 'PROGRAMUL CELOR 5 SERI',
      subtitle: 'ZILNIC, DE LA ORA 19:00 LA 20:30',
      steps: [
        {
          step: '01',
          title: 'De ce ești obosită chiar dacă viața ta arată bine',
          description: 'Aha-ul: nu e lene, e suprasolicitare invizibilă + sistem nervos în „funcționez". Live pe Zoom | 16 Februarie | Ora 19:00'
        },
        {
          step: '02',
          title: 'Capcana Siguranței: de ce schimbarea doare (și nu din motivul pe care îl crezi)',
          description: 'Aha-ul: creierul preferă familiarul, nu fericirea; înveți cum să schimbi fără auto-sabotaj. Live pe Zoom | 17 Februarie | Ora 19:00'
        },
        {
          step: '03',
          title: 'Mitul Disciplinei: de ce voința e o resursă finită',
          description: 'Aha-ul: nu ai nevoie de "mai multă ambiție", ci de un sistem (ritm, limite, energie). Live pe Zoom | 18 Februarie | Ora 19:00'
        },
        {
          step: '04',
          title: 'Harta Invizibilă: cum recunoști tiparele care îți conduc viața pe pilot automat',
          description: 'Aha-ul: identifici „programul" (roluri, loialități, frici) și punctul exact unde pierzi puterea. Live pe Zoom | 19 Februarie | Ora 19:00'
        },
        {
          step: '05',
          title: 'Revino la tine: protocolul simplu pentru energie, limite și liniște interioară',
          description: 'Aha-ul: integrezi un mini-ritual + plan de 7 zile (micro-acțiuni) ca să nu rămână doar "wow". Live pe Zoom | 20 Februarie | Ora 19:00'
        }
      ]
    },
    program: {
      title: 'PROGRAMUL CELOR 5 SERI',
      subtitle: 'ZILNIC, DE LA ORA 19:00 LA 20:30',
      sessions: [
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
      ]
    },
    testimonials: {
      title: 'Povești de Transformare',
      subtitle: 'Ce spun persoanele care au parcurs programul',
      items: [
        {
          name: 'Ana M.',
          role: 'Marketing Manager',
          text: 'După ani de zile în care am trăit conform așteptărilor altora, programul \'Revino la Tine\' m-a ajutat să îmi redescopăr pasiunea și să trăiesc autentic. Sunt recunoscătoare pentru această călătorie!'
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
      ]
    },
    contact: {
      title: 'Rezerva locul',
      subtitle: 'Completează formularul și te voi contacta în cel mai scurt timp pentru a confirma participarea',
      phone: '+40 745 123 456',
      email: 'contact@molnartimeanoemi.ro',
      address: 'Sibiu, România'
    }
  },
  leads: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export function InitializeRevinoLatineCampaign() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInitialize = () => {
    setIsInitializing(true);
    setStatus('idle');
    setMessage('');

    try {
      // Lucrăm exclusiv cu localStorage
      const campaignsData = localStorage.getItem('cms_campaigns');
      let campaigns = campaignsData ? JSON.parse(campaignsData) : [];

      // Verificăm dacă campania există deja
      const existingIndex = campaigns.findIndex((c: any) => c.slug === 'revinolatine');

      if (existingIndex !== -1) {
        // Actualizăm campania existentă, păstrând leads-urile
        campaigns[existingIndex] = {
          ...revinoLatineCampaign,
          id: campaigns[existingIndex].id,
          leads: campaigns[existingIndex].leads || [],
          createdAt: campaigns[existingIndex].createdAt,
          updatedAt: new Date().toISOString()
        };
        setMessage('Campania "Revino la Tine" a fost actualizată cu succes!');
      } else {
        // Adăugăm campania nouă
        campaigns.push(revinoLatineCampaign);
        setMessage('Campania "Revino la Tine" a fost adăugată cu succes în sistem!');
      }

      // Salvăm în localStorage
      localStorage.setItem('cms_campaigns', JSON.stringify(campaigns));

      setStatus('success');
      toast.success('Campanie sincronizată cu succes!');

      // Reîncarcă pagina după 1 secundă pentru a actualiza lista
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error initializing campaign:', error);
      setStatus('error');
      setMessage('A apărut o eroare la inițializarea campaniei. Te rog încearcă din nou.');
      toast.error('Eroare la inițializarea campaniei');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Card className="bg-[#16213e] border-[#a594f9]/30 p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#e8e6f7] mb-2">
              Importă Campania "Revino la Tine"
            </h3>
            <p className="text-sm text-[#e8e6f7]/70 mb-3">
              Campania existentă "Revino la Tine" (URL: <code className="px-1 py-0.5 bg-[#1a1a2e] rounded text-[#a594f9]">/campanii/revinolatine</code>) 
              nu este înregistrată în sistemul de management.
            </p>
            <p className="text-sm text-[#e8e6f7]/70 mb-4">
              Apasă butonul de mai jos pentru a o adăuga în CMS. Aceasta îți va permite să:
            </p>
            <ul className="list-disc list-inside text-sm text-[#e8e6f7]/70 mb-4 space-y-1">
              <li>Editezi conținutul campaniei din panoul de administrare</li>
              <li>Gestionezi și exportezi înscrierile (leads) în format CSV/Excel</li>
              <li>Activezi/dezactivezi campania</li>
              <li>Monitorizezi performanța campaniei</li>
            </ul>
            
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 mb-4 p-3 bg-green-500/10 rounded">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 mb-4 p-3 bg-red-500/10 rounded">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            
            <Button
              onClick={handleInitialize}
              disabled={isInitializing || status === 'success'}
              className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90"
            >
              {isInitializing ? 'Se importă campania...' : status === 'success' ? 'Campanie importată ✓' : 'Importă Campania în CMS'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}