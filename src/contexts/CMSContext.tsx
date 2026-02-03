import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Campania "Revino la Tine" - datele implicite
const revinoLatineCampaignData = {
  id: 'revino-la-tine-2026',
  title: 'Revino la Tine',
  slug: 'revinolatine',
  active: true,
  content: {
    hero: {
      badge: 'Campanie Specială 2026',
      title: 'Revino la Tine',
      subtitle: 'Un program de reconectare cu tine însuți, prin care vei descoperi puterea de a trăi autentic și echilibrat.',
      primaryCta: 'Începe Transformarea',
      secondaryCta: 'Află Mai Multe'
    },
    stats: [
      { value: '8 săptămâni', label: 'Program intensiv' },
      { value: '1-la-1', label: 'Ședințe personalizate' },
      { value: '24/7', label: 'Suport continuu' }
    ],
    about: {
      title: 'Despre Programul',
      subtitle: 'Revino la Tine',
      description: [
        'În ritmul alert al vieții moderne, ne pierdem adesea în așteptările altora și în rolurile pe care le jucăm. Programul "Revino la Tine" este creat special pentru a te ajuta să redescoperi cine ești cu adevărat, dincolo de măști și presiuni sociale.',
        'Prin sesiuni de terapie individuală, exerciții practice și un cadru sigur de explorare, vei învăța să te conectezi autentic cu nevoile, valorile și pasiunile tale.'
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
      title: 'Cum Funcționează?',
      subtitle: 'Un proces simplu și structurat pentru transformarea ta',
      steps: [
        {
          step: '1',
          title: 'Evaluare Inițială',
          description: 'O primă întâlnire în care vom explora unde te afli acum și unde vrei să ajungi'
        },
        {
          step: '2',
          title: 'Plan Personalizat',
          description: 'Creăm împreună un program adaptat nevoilor și obiectivelor tale unice'
        },
        {
          step: '3',
          title: 'Ședințe Săptămânale',
          description: 'Lucrăm constant la transformarea ta prin sesiuni de terapie structurate'
        },
        {
          step: '4',
          title: 'Integrare & Creștere',
          description: 'Implementezi învățăturile în viața de zi cu zi și continui să crești'
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
      title: 'Pregătit/ă să Începi?',
      subtitle: 'Completează formularul și te voi contacta în cel mai scurt timp pentru a stabili prima sesiune',
      phone: '+40 745 123 456',
      email: 'contact@molnartimeanoemi.ro',
      address: 'Sibiu, România'
    }
  },
  leads: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Types for our CMS data
export interface BlogPost {
  id: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  duration: string;
  price: string;
  sessions: string;
  image: string;
  linkText: string;
  description: string;
  benefits: string[];
  process: string[];
  target: string;
  active: boolean;
}

export interface PricingPackage {
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  active: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  content: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
    stats: Array<{ value: string; label: string }>;
    about: {
      title: string;
      subtitle: string;
      description: string[];
      cards: Array<{ icon: string; title: string; description: string }>;
    };
    benefits: {
      title: string;
      subtitle: string;
      items: Array<{ title: string; description: string }>;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      steps: Array<{ step: string; title: string; description: string }>;
    };
    testimonials: {
      title: string;
      subtitle: string;
      items: Array<{ name: string; role: string; text: string }>;
    };
    contact: {
      title: string;
      subtitle: string;
      phone: string;
      email: string;
      address: string;
    };
  };
  leads?: CampaignLead[];
  createdAt: string;
  updatedAt: string;
}

export interface CampaignLead {
  id: string;
  campaignId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface SiteContent {
  hero: {
    title: string;
    highlight: string; // "Molnar Timea Noemi"
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    buttonText: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    workingHours: string;
    workingNote: string;
    facebookUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
  };
  footer: {
    title: string;
    subtitle: string;
    phone: string;
    copyrightText: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

interface CMSContextType {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Blog Management
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  getBlogPost: (id: string) => BlogPost | undefined;
  
  // Service Management
  services: Service[];
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  getService: (id: string) => Service | undefined;
  
  // Pricing Management
  pricingPackages: PricingPackage[];
  updatePricingPackage: (index: number, pkg: Partial<PricingPackage>) => Promise<void>;
  
  // Campaign Management
  campaigns: Campaign[];
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'leads'>) => Promise<void>;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  getCampaign: (slug: string) => Campaign | undefined;
  addCampaignLead: (campaignId: string, lead: Omit<CampaignLead, 'id' | 'createdAt' | 'campaignId'>) => Promise<void>;
  
  // Site Content Management
  siteContent: SiteContent;
  updateSiteContent: (updates: Partial<SiteContent>) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  
  // Refresh data
  refreshData: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// DEZACTIVAT: API-ul nu este disponibil, folosim doar localStorage
// Flag pentru a determina dacă API-ul este disponibil - FORȚAT PE FALSE
let isAPIAvailable = false;
let apiCheckDone = true; // Presupunem că verificarea s-a făcut (API nu e disponibil)

// Mock data pentru funcționare offline
const mockBlogPosts: BlogPost[] = [];

// Servicii default - extrase din site-ul principal
const defaultServices: Service[] = [
  {
    id: 'consiliere-individuala',
    title: 'Consiliere individuală',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpdmlkdWFsJTIwdGhlcmFweSUyMHNlc3Npb24lMjBjb3Vuc2VsaW5nfGVufDF8fHx8MTc3MDExMDgzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Consiliere individuală pentru dezvoltarea personală și bunăstarea emoțională. Un spațiu sigur pentru explorarea gândurilor, emoțiilor și comportamentelor într-un mod constructiv și orientat către soluții.',
    benefits: [
      'Dezvoltarea încrederii în sine și a stiei de sine',
      'Gestionarea eficientă a stresului și anxietății',
      'Îmbunătățirea abilităților de comunicare',
      'Clarificarea obiectivelor personale și profesionale',
      'Dezvoltarea strategiilor de coping sănătoase',
      'Procesarea experiențelor traumatice sau dificile'
    ],
    process: [
      'Evaluare inițială și stabilirea obiectivelor',
      'Identificarea resurselor și punctelor forte',
      'Dezvoltarea planului de intervenție personalizat',
      'Implementarea tehnicilor și strategiilor',
      'Monitorizarea progresului și ajustări',
      'Consolidarea rezultatelor și pregătirea pentru finalizare'
    ],
    target: 'Consiliere individuală se adresează adulților care doresc să își îmbunătățească calitatea vieții, să depășească provocări personale sau profesionale, sau să se dezvolte personal.',
    active: true
  },
  {
    id: 'consiliere-adolescenti',
    title: 'Consiliere adolescenți',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1747470198294-b906f9d0af48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwYWRvbGVzY2VudCUyMHRoZXJhcHl8ZW58MXx8fHwxNzcwMTEwODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Suport specializat pentru adolescenți în procesul complex al dezvoltării identității, gestionării emoțiilor și navigării relațiilor sociale.',
    benefits: [
      'Dezvoltarea identității și stiei de sine',
      'Gestionarea emoțiilor intense specifice adolescenței',
      'Îmbunătățirea relațiilor cu părinții și colegii',
      'Dezvoltarea abilităților de luare a deciziilor',
      'Gestionarea presiunii sociale și a bullying-ului',
      'Sprijin în perioada de tranziție (școală, liceu, facultate)'
    ],
    process: [
      'Stabilirea unei relații de încredere',
      'Evaluarea nevoilor și provocărilor specifice',
      'Dezvoltarea abilităților de comunicare',
      'Lucrul cu emoțiile și comportamentele',
      'Implicarea familiei când este necesar',
      'Consolidarea resurselor personale'
    ],
    target: 'Serviciul se adresează adolescenților între 12-18 ani care se confruntă cu provocări emoționale, sociale sau comportamentale specifice acestei etape de dezvoltare.',
    active: true
  },
  {
    id: 'consiliere-cuplu',
    title: 'Consiliere de cuplu',
    duration: '60 minute',
    price: '300 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1758524944783-0ec215baf777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0aGVyYXB5JTIwY291bnNlbGluZ3xlbnwxfHx8fDE3NzAxMTA4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Consiliere pentru cupluri care doresc să îmbunătățească comunicarea, să rezolve conflicte și să întărească relația lor.',
    benefits: [
      'Îmbunătățirea comunicării în cuplu',
      'Rezolvarea conflictelor într-un mod constructiv',
      'Reconstruirea încrederii și intimității',
      'Clarificarea așteptărilor și nevoilor',
      'Dezvoltarea abilităților de negociere',
      'Întărirea legăturii emoționale'
    ],
    process: [
      'Evaluarea dinamicii relației',
      'Identificarea pattern-urilor disfuncționale',
      'Învățarea tehnicilor de comunicare eficientă',
      'Lucrul cu emoțiile și vulnerabilitatea',
      'Dezvoltarea obiectivelor comune',
      'Consolidarea schimbărilor pozitive'
    ],
    target: 'Consiliere de cuplu se adresează partenerilor care doresc să îmbunătățească relația lor, indiferent de stadiul în care se află.',
    active: true
  },
  {
    id: 'consiliere-parinti',
    title: 'Consiliere părinți',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1654613698246-b6d44aef0fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjb3Vuc2VsaW5nJTIwZmFtaWx5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NzAxMTA4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Suport pentru părinți în dezvoltarea abilităților parentale și în gestionarea provocărilor legate de creșterea copiilor.',
    benefits: [
      'Dezvoltarea strategiilor educaționale eficiente',
      'Îmbunătățirea comunicării cu copiii',
      'Gestionarea comportamentelor dificile',
      'Stabilirea limitelor sănătoase',
      'Echilibrarea nevoilor personale cu cele parentale',
      'Colaborarea eficientă între părinți'
    ],
    process: [
      'Evaluarea dinamicii familiale',
      'Identificarea provocărilor specifice',
      'Învățarea tehnicilor de disciplină pozitivă',
      'Dezvoltarea abilităților de comunicare',
      'Lucrul cu propriile emoții și declanșatori',
      'Crearea unui plan parental personalizat'
    ],
    target: 'Serviciul se adresează părinților care doresc să își dezvolte abilitățile parentale și să creeze o relație mai armonioasă cu copiii lor.',
    active: true
  }
];

const mockPricingPackages: PricingPackage[] = [];

// API helper function - DEZACTIVATĂ
async function apiCall(endpoint: string, options: RequestInit = {}) {
  // API-ul nu este disponibil
  throw new Error('API not available - using localStorage only');
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>({
    hero: {
      title: 'Cabinet consiliere\nși dezvoltare personală',
      highlight: 'Molnar Timea Noemi',
      subtitle: 'Sprijin profesional pentru dezvoltarea personală și bunăstarea emoțională',
      primaryButtonText: 'Vezi serviciile',
      secondaryButtonText: 'Programează-te'
    },
    about: {
      title: 'BUNĂ ȘI BINE AI VENIT!',
      paragraph1: 'Sunt aici pentru a te ajuta să îți întâlnești ca îți se întâmplă să îți schimbi acele aspecte ale vieții tale care nu te mulțumesc. Consilierea reprezintă un drum de autocunoaștere în care îți poți fi alături. Este un parteneriat bazat pe încredere, onestitate, în care lucrăm împreună să înlăturăm obstacolele cu care te confrunți. Eu ofer un mediu care te va ajuta să faci noi alegeri și schimbări pozitive în viața ta.',
      paragraph2: 'Atracția mea pentru psihologie a început încă din anii facultății, când adeseori să observ comportamentul oamenilor în mediul social. Apoi a luat amploare o dată cu sosirea primului copil, datorită preocupărilor continue de a fi corect informată și pregătită. Usor usor a devenit o adevărată pasiune, în care am investit ani de formare și multă energie. Am început să practic această frumoasă meserie pentru că iubesc oamenii și este o onoare pentru mine să le pot fi alături în momentele cele mai dificile ale vieții lor.',
      buttonText: 'Vezi toate serviciile'
    },
    contact: {
      phone: '(+4) 0724-781.466',
      email: 'timeanoemi@gmail.com',
      address: 'Strada Livezii, nr. 100',
      city: 'Sibiu, 550042',
      workingHours: 'Luni - Vineri: 9:00 - 18:00',
      workingNote: 'Programări doar cu agendare prealabilă',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61576876101384',
      instagramUrl: 'https://www.instagram.com/mindresetnlpbytimea/',
      linkedinUrl: '#'
    },
    footer: {
      title: 'BUNĂ, EU SUNT MOLNAR TIMEA NOEMI',
      subtitle: 'Cabinet consiliere și dezvoltare personală',
      phone: '(+4) 0724-781.466',
      copyrightText: '© 2025 Molnar Timea Noemi. Toate drepturile rezervate.'
    }
  });

  // Load all data
  const loadData = async () => {
    // Dacă API-ul nu este disponibil, folosim localStorage direct
    if (!isAPIAvailable && apiCheckDone) {
      const savedPosts = localStorage.getItem('cms_blogPosts');
      const savedServices = localStorage.getItem('cms_services');
      const savedPricing = localStorage.getItem('cms_pricing');
      const savedCampaigns = localStorage.getItem('cms_campaigns');
      const savedSiteContent = localStorage.getItem('cms_siteContent');

      setBlogPosts(savedPosts ? JSON.parse(savedPosts) : []);
      const parsedServices = savedServices ? JSON.parse(savedServices) : defaultServices;
      setServices(parsedServices);
      setPricingPackages(savedPricing ? JSON.parse(savedPricing) : []);
      
      // Salvăm serviciile default dacă nu există
      if (!savedServices) {
        localStorage.setItem('cms_services', JSON.stringify(defaultServices));
      }
      
      console.log('CMSContext - Initial load (no API):', {
        servicesCount: parsedServices.length,
        services: parsedServices
      });
      
      // Pentru campanii, adăugăm "Revino la Tine" dacă nu există
      const localCampaigns = savedCampaigns ? JSON.parse(savedCampaigns) : [];
      const hasRevinoLatine = localCampaigns.some((c: Campaign) => c.slug === 'revinolatine');
      if (!hasRevinoLatine) {
        const updatedCampaigns = [revinoLatineCampaignData, ...localCampaigns];
        setCampaigns(updatedCampaigns);
        localStorage.setItem('cms_campaigns', JSON.stringify(updatedCampaigns));
      } else {
        setCampaigns(localCampaigns);
      }

      if (savedSiteContent) {
        setSiteContent(JSON.parse(savedSiteContent));
      }
      return;
    }

    try {
      // Încercăm să încărcăm datele de la API (doar o singură dată)
      const results = await Promise.allSettled([
        apiCall('/blog/posts'),
        apiCall('/services'),
        apiCall('/pricing'),
        apiCall('/campaigns'),
        apiCall('/site-content')
      ]);

      const loadedPosts = results[0].status === 'fulfilled' ? (results[0].value.posts || []) : [];
      const loadedServices = results[1].status === 'fulfilled' ? (results[1].value.services || []) : [];
      const loadedPricing = results[2].status === 'fulfilled' ? (results[2].value.packages || []) : [];
      const loadedCampaigns = results[3].status === 'fulfilled' ? (results[3].value.campaigns || []) : [];
      const loadedSiteContent = results[4].status === 'fulfilled' ? (results[4].value.content || {}) : {};

      // Dacă toate au eșuat, folosim localStorage
      if (results.every(r => r.status === 'rejected')) {
        const savedPosts = localStorage.getItem('cms_blogPosts');
        const savedServices = localStorage.getItem('cms_services');
        const savedPricing = localStorage.getItem('cms_pricing');
        const savedCampaigns = localStorage.getItem('cms_campaigns');
        const savedSiteContent = localStorage.getItem('cms_siteContent');

        setBlogPosts(savedPosts ? JSON.parse(savedPosts) : []);
        const parsedServices = savedServices ? JSON.parse(savedServices) : defaultServices;
        setServices(parsedServices);
        setPricingPackages(savedPricing ? JSON.parse(savedPricing) : []);
        
        // Salvăm serviciile default dacă nu există
        if (!savedServices) {
          localStorage.setItem('cms_services', JSON.stringify(defaultServices));
        }
        
        console.log('CMSContext - Initial load (no API):', {
          servicesCount: parsedServices.length,
          services: parsedServices
        });
        
        // Pentru campanii, adăugăm "Revino la Tine" dacă nu există
        const localCampaigns = savedCampaigns ? JSON.parse(savedCampaigns) : [];
        const hasRevinoLatine = localCampaigns.some((c: Campaign) => c.slug === 'revinolatine');
        if (!hasRevinoLatine) {
          const updatedCampaigns = [revinoLatineCampaignData, ...localCampaigns];
          setCampaigns(updatedCampaigns);
          localStorage.setItem('cms_campaigns', JSON.stringify(updatedCampaigns));
        } else {
          setCampaigns(localCampaigns);
        }

        if (savedSiteContent) {
          setSiteContent(JSON.parse(savedSiteContent));
        }
        return;
      }

      setBlogPosts(loadedPosts);
      setServices(loadedServices.length > 0 ? loadedServices : defaultServices);
      setPricingPackages(loadedPricing);
      
      // Salvăm în localStorage pentru funcționare offline
      if (loadedPosts.length > 0) localStorage.setItem('cms_blogPosts', JSON.stringify(loadedPosts));
      
      // Salvăm serviciile - fie cele încărcate, fie cele default
      if (loadedServices.length > 0) {
        localStorage.setItem('cms_services', JSON.stringify(loadedServices));
      } else {
        localStorage.setItem('cms_services', JSON.stringify(defaultServices));
      }
      
      if (loadedPricing.length > 0) localStorage.setItem('cms_pricing', JSON.stringify(loadedPricing));
      
      // Verificăm dacă există campania "Revino la Tine"
      const hasRevinoLatine = loadedCampaigns.some((c: Campaign) => c.slug === 'revinolatine');
      
      if (!hasRevinoLatine) {
        // Adăugăm campania local (API-ul nu e disponibil sau campania nu există)
        const updatedCampaigns = [revinoLatineCampaignData, ...loadedCampaigns];
        setCampaigns(updatedCampaigns);
        localStorage.setItem('cms_campaigns', JSON.stringify(updatedCampaigns));
      } else {
        setCampaigns(loadedCampaigns);
        localStorage.setItem('cms_campaigns', JSON.stringify(loadedCampaigns));
      }

      if (Object.keys(loadedSiteContent).length > 0) {
        setSiteContent(loadedSiteContent);
        localStorage.setItem('cms_siteContent', JSON.stringify(loadedSiteContent));
      }
    } catch (error) {
      // Fallback la localStorage în caz de eroare
      const savedPosts = localStorage.getItem('cms_blogPosts');
      const savedServices = localStorage.getItem('cms_services');
      const savedPricing = localStorage.getItem('cms_pricing');
      const savedCampaigns = localStorage.getItem('cms_campaigns');
      const savedSiteContent = localStorage.getItem('cms_siteContent');

      setBlogPosts(savedPosts ? JSON.parse(savedPosts) : []);
      const parsedServices = savedServices ? JSON.parse(savedServices) : defaultServices;
      setServices(parsedServices);
      setPricingPackages(savedPricing ? JSON.parse(savedPricing) : []);
      
      // Salvăm serviciile default dacă nu există
      if (!savedServices) {
        localStorage.setItem('cms_services', JSON.stringify(defaultServices));
      }
      
      console.log('CMSContext - Initial load (no API):', {
        servicesCount: parsedServices.length,
        services: parsedServices
      });
      
      if (savedCampaigns) {
        const localCampaigns = JSON.parse(savedCampaigns);
        const hasRevinoLatine = localCampaigns.some((c: Campaign) => c.slug === 'revinolatine');
        if (!hasRevinoLatine) {
          const updatedCampaigns = [revinoLatineCampaignData, ...localCampaigns];
          setCampaigns(updatedCampaigns);
          localStorage.setItem('cms_campaigns', JSON.stringify(updatedCampaigns));
        } else {
          setCampaigns(localCampaigns);
        }
      } else {
        // Dacă nu există nimic salvat, folosim cel puțin campania Revino la Tine
        setCampaigns([revinoLatineCampaignData]);
        localStorage.setItem('cms_campaigns', JSON.stringify([revinoLatineCampaignData]));
      }

      if (savedSiteContent) {
        setSiteContent(JSON.parse(savedSiteContent));
      }
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check for saved user session
        const savedUser = localStorage.getItem('cms_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        // Load data from API
        await loadData();
      } catch (error) {
        console.error('Error initializing CMS:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('cms_user', JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await apiCall('/blog/posts', {
        method: 'POST',
        body: JSON.stringify(post),
      });

      if (response.success) {
        setBlogPosts(prev => [response.post, ...prev]);
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const response = await apiCall(`/blog/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (response.success) {
        setBlogPosts(prev => prev.map(post => 
          post.id === id ? response.post : post
        ));
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await apiCall(`/blog/posts/${id}`, {
        method: 'DELETE',
      });

      setBlogPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  };

  const getBlogPost = (id: string) => {
    return blogPosts.find(post => post.id === id);
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      if (!isAPIAvailable) {
        // Mod offline - salvăm în localStorage
        const updated = services.map(service => 
          service.id === id ? { ...service, ...updates } : service
        );
        setServices(updated);
        localStorage.setItem('cms_services', JSON.stringify(updated));
        return;
      }

      const response = await apiCall(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (response.success) {
        const updated = services.map(service => 
          service.id === id ? response.service : service
        );
        setServices(updated);
        localStorage.setItem('cms_services', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error updating service:', error);
      // Fallback la salvare locală
      const updated = services.map(service => 
        service.id === id ? { ...service, ...updates } : service
      );
      setServices(updated);
      localStorage.setItem('cms_services', JSON.stringify(updated));
    }
  };

  const getService = (id: string) => {
    return services.find(service => service.id === id);
  };

  const updatePricingPackage = async (index: number, updates: Partial<PricingPackage>) => {
    try {
      const response = await apiCall(`/pricing/${index}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (response.success) {
        setPricingPackages(prev => prev.map((pkg, i) => 
          i === index ? response.package : pkg
        ));
      }
    } catch (error) {
      console.error('Error updating pricing package:', error);
      throw error;
    }
  };

  const createCampaign = async (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'leads'>) => {
    try {
      if (!isAPIAvailable) {
        // Mod offline - salvăm în localStorage
        const newCampaign: Campaign = {
          ...campaign,
          id: `campaign-${Date.now()}`,
          leads: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const updated = [newCampaign, ...campaigns];
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
        return;
      }

      const response = await apiCall('/campaigns', {
        method: 'POST',
        body: JSON.stringify(campaign),
      });

      if (response.success) {
        const updated = [response.campaign, ...campaigns];
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      if (!isAPIAvailable) {
        // Mod offline - salvăm în localStorage
        const updated = campaigns.map(campaign => 
          campaign.id === id ? { ...campaign, ...updates, updatedAt: new Date().toISOString() } : campaign
        );
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
        return;
      }

      const response = await apiCall(`/campaigns/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (response.success) {
        const updated = campaigns.map(campaign => 
          campaign.id === id ? response.campaign : campaign
        );
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      if (!isAPIAvailable) {
        // Mod offline - salvăm în localStorage
        const updated = campaigns.filter(campaign => campaign.id !== id);
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
        return;
      }

      await apiCall(`/campaigns/${id}`, {
        method: 'DELETE',
      });

      const updated = campaigns.filter(campaign => campaign.id !== id);
      setCampaigns(updated);
      localStorage.setItem('cms_campaigns', JSON.stringify(updated));
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  };

  const getCampaign = (slug: string) => {
    return campaigns.find(campaign => campaign.slug === slug);
  };

  const addCampaignLead = async (campaignId: string, lead: Omit<CampaignLead, 'id' | 'createdAt' | 'campaignId'>) => {
    try {
      const newLead: CampaignLead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        ...lead,
        createdAt: new Date().toISOString()
      };

      if (!isAPIAvailable) {
        // Mod offline - salvăm direct în localStorage
        const updated = campaigns.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, leads: [...(campaign.leads || []), newLead] } 
            : campaign
        );
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
        return;
      }

      // Încercăm să salvăm prin API
      const response = await apiCall(`/campaigns/${campaignId}/leads`, {
        method: 'POST',
        body: JSON.stringify(lead),
      });

      if (response.success) {
        const updated = campaigns.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, leads: [...(campaign.leads || []), response.lead] } 
            : campaign
        );
        setCampaigns(updated);
        localStorage.setItem('cms_campaigns', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error adding campaign lead:', error);
      // Dacă API-ul eșuează, salvăm local oricum
      const newLead: CampaignLead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        ...lead,
        createdAt: new Date().toISOString()
      };
      const updated = campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, leads: [...(campaign.leads || []), newLead] } 
          : campaign
      );
      setCampaigns(updated);
      localStorage.setItem('cms_campaigns', JSON.stringify(updated));
    }
  };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    try {
      if (!isAPIAvailable) {
        // Mod offline - salvăm în localStorage
        const updated = { ...siteContent, ...updates };
        setSiteContent(updated);
        localStorage.setItem('cms_siteContent', JSON.stringify(updated));
        return;
      }

      const response = await apiCall('/site-content', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (response.success) {
        const updated = { ...siteContent, ...response.content };
        setSiteContent(updated);
        localStorage.setItem('cms_siteContent', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error updating site content:', error);
      // Fallback la salvare locală
      const updated = { ...siteContent, ...updates };
      setSiteContent(updated);
      localStorage.setItem('cms_siteContent', JSON.stringify(updated));
    }
  };

  const value: CMSContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPost,
    services,
    updateService,
    getService,
    pricingPackages,
    updatePricingPackage,
    campaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
    addCampaignLead,
    siteContent,
    updateSiteContent,
    isLoading,
    refreshData
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}