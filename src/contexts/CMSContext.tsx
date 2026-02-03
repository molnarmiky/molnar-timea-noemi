import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  getBlogPost: (id: string) => BlogPost | undefined;
  
  // Service Management
  services: Service[];
  updateService: (id: string, service: Partial<Service>) => void;
  getService: (id: string) => Service | undefined;
  
  // Pricing Management
  pricingPackages: PricingPackage[];
  updatePricingPackage: (index: number, pkg: Partial<PricingPackage>) => void;
  
  // Loading states
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Default data
const defaultBlogPosts: BlogPost[] = [
  {
    id: "anxietate-schimbari",
    date: "8 Martie 2025",
    readTime: "5 min citire",
    title: "Cum să gestionezi anxietatea în timpul schimbărilor majore din viață",
    excerpt: "Schimbările sunt inevitabile în viață, dar modul în care le gestionăm poate face diferența între creștere și suferință. Iată strategii practice pentru a naviga prin perioade de tranziție.",
    category: "Anxietate",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
    author: "Molnar Timea Noemi",
    tags: ["anxietate", "schimbare", "adaptare", "strategii"],
    published: true,
    createdAt: "2025-01-08T10:00:00Z",
    updatedAt: "2025-01-08T10:00:00Z",
    content: `Schimbările sunt o parte inevitabilă din viață, iar modul în care le abordăm poate face diferența între o experiență de creștere și una de suferință. Fie că vorbim despre o mudanță, o schimbare de carieră, o relație care se termină sau alte tranziții majore, anxietatea care însoțește aceste momente este complet normală.

Primul pas în gestionarea anxietății este să recunoaștem că este o reacție naturală la incertitudine. Creierul nostru este programat să perceapă schimbarea ca pe o potențială amenințare, activând sistemul de "luptă sau fugă". Înțelegerea acestui mecanism ne poate ajuta să fim mai compasivi cu noi înșine.

Strategii practice pentru gestionarea anxietății în perioada de schimbare:

1. **Acceptarea incertitudinii**: În loc să luptăm împotriva sentimentului de incertitudine, putem învăța să îl acceptăm ca pe o parte temporară a procesului de tranziție.

2. **Focusarea pe ceea ce putem controla**: Deși nu putem controla toate aspectele unei schimbări, putem identifica și ne putem concentra pe acțiunile concrete pe care le putem întreprinde.

3. **Crearea de rutine noi**: Rutinele oferă un sentiment de stabilitate în mijlocul haosului. Chiar și rutine simple, cum ar fi o cană de ceai dimineața, pot oferi reconfort.

4. **Tehnici de relaxare**: Respirația profundă, meditația și alte tehnici de relaxare pot ajuta la reducerea simptomelor fizice ale anxietății.

5. **Construirea unei rețele de sprijin**: Nu trebuie să trecem prin schimbare singuri. Prietenii, familia sau un terapeut pot oferi sprijin emoțional valoros.

Importante de reținut este că adaptarea la schimbare este un proces, nu un eveniment. Să fim răbdători cu noi înșine în timp ce navigăm prin aceste tranziții și să nu ezităm să cerem ajutor când avem nevoie.`
  }
];

const defaultServices: Service[] = [
  {
    id: "consiliere-individuala",
    title: "Consiliere individuală (50 min.)",
    duration: "50 minute",
    price: "200 RON",
    sessions: "Săptămânal",
    image: "https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwc2Vzc2lvbiUyMGluZGl2aWR1YWwlMjBjb3Vuc2VsaW5nfGVufDF8fHx8MTc1NzgzMjYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkText: "AFLĂ MAI MULTE",
    description: "Consiliere individuală pentru dezvoltarea personală și bunăstarea emoțională. Un spațiu sigur pentru explorarea gândurilor, emoțiilor și comportamentelor într-un mod constructiv și orientat către soluții.",
    benefits: [
      "Dezvoltarea încrederii în sine și a stiei de sine",
      "Gestionarea eficientă a stresului și anxietății",
      "Îmbunătățirea abilităților de comunicare",
      "Clarificarea obiectivelor personale și profesionale",
      "Dezvoltarea strategiilor de coping sănătoase",
      "Procesarea experiențelor traumatice sau dificile"
    ],
    process: [
      "Evaluare inițială și stabilirea obiectivelor",
      "Identificarea resurselor și punctelor forte",
      "Explorarea temelor și provocărilor actuale",
      "Dezvoltarea strategiilor personalizate",
      "Implementarea și monitorizarea progresului",
      "Consolidarea învățăturilor și planificarea viitorului"
    ],
    target: "Adulții care doresc să își îmbunătățească calitatea vieții, să gestioneze mai bine stresul, să dezvolte relații mai sănătoase sau să navigheze prin perioade de tranziție și schimbare.",
    active: true
  },
  {
    id: "consiliere-adolescenti",
    title: "Consiliere adolescenți (50 min.)",
    duration: "50 minute",
    price: "180 RON",
    sessions: "Săptămânal/Bilunar",
    image: "figma:asset/724dbc239775302f1ce79f782053cc0b94b2c378.png",
    linkText: "AFLĂ MAI MULTE",
    description: "Sprijin specializat pentru adolescenți în navigarea provocărilor specifice acestei etape de dezvoltare, cu accent pe dezvoltarea identității, gestionarea emoțiilor și construirea relațiilor sănătoase.",
    benefits: [
      "Dezvoltarea identității personale și a încrederii în sine",
      "Gestionarea anxietății și stresului școlar",
      "Îmbunătățirea abilităților sociale și de comunicare",
      "Suport în luarea deciziilor importante",
      "Dezvoltarea strategiilor de coping pentru presiunea socială",
      "Suport pentru problemele legate de imagine corporală"
    ],
    process: [
      "Crearea unui mediu de încredere și siguranță",
      "Evaluarea nevoilor specifice adolescentului",
      "Explorarea provocărilor și preocupărilor actuale",
      "Dezvoltarea abilităților de gestionare emoțională",
      "Lucrarea cu familia pentru suport optim",
      "Planificarea tranziției către vârsta adultă"
    ],
    target: "Adolescenți cu vârste între 13-18 ani care se confruntă cu anxietate, probleme de stimă de sine, dificultăți școlare, probleme relaționale sau care au nevoie de suport în dezvoltarea personală.",
    active: true
  },
  {
    id: "consiliere-cuplu",
    title: "Consiliere de cuplu (60 min.)",
    duration: "60 minute",
    price: "250 RON",
    sessions: "Săptămânal/Bilunar",
    image: "https://images.unsplash.com/photo-1698373890183-ae3943362fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3VwbGUlMjB0aGVyYXB5JTIwY291bnNlbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNTc3OTIzODI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkText: "AFLĂ MAI MULTE",
    description: "Sprijin specializat pentru cupluri care doresc să își întărească relația, să îmbunătățească comunicarea și să rezolve conflictele într-un mod constructiv și empatic.",
    benefits: [
      "Îmbunătățirea comunicării și ascultării active",
      "Rezolvarea constructivă a conflictelor",
      "Întărirea legăturii emoționale și intimității",
      "Dezvoltarea încrederii și transparenței",
      "Gestionarea diferențelor și compromisurilor",
      "Planificarea comună a viitorului"
    ],
    process: [
      "Evaluarea dinamicii relației și identificarea provocărilor",
      "Stabilirea obiectivelor comune pentru terapie",
      "Învățarea tehnicilor de comunicare eficientă",
      "Explorarea nevoilor și așteptărilor fiecărui partner",
      "Dezvoltarea strategiilor de rezolvare a conflictelor",
      "Consolidarea progresului și menținerea rezultatelor"
    ],
    target: "Cupluri care se confruntă cu probleme de comunicare, conflicte frecvente, infidelitate, diferențe de valori sau care doresc să își îmbunătățească relația în mod preventiv.",
    active: true
  },
  {
    id: "parenting",
    title: "Parenting (ședința 50 min.)",
    duration: "50 minute",
    price: "180 RON",
    sessions: "Lunar/Bilunar",
    image: "https://images.unsplash.com/photo-1725382932565-faf3dcecbdcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnRpbmclMjBjb3Vuc2VsaW5nJTIwZmFtaWx5JTIwdGhlcmFweXxlbnwxfHx8fDE3NTc5MjM4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkText: "AFLĂ MAI MULTE",
    description: "Suport și îndrumare pentru părinți în dezvoltarea abilităților parentale eficiente, construirea unei relații sănătoase cu copiii și navigarea provocărilor educaționale contemporane.",
    benefits: [
      "Dezvoltarea strategiilor de disciplină pozitivă",
      "Îmbunătățirea comunicării cu copiii",
      "Gestionarea comportamentelor problematice",
      "Dezvoltarea încrederii în abilitățile parentale",
      "Crearea unui mediu familial armonios",
      "Suport pentru situații speciale (divorț, pierderi)"
    ],
    process: [
      "Evaluarea dinamicii familiale actuale",
      "Identificarea stilurilor parentale și adaptarea lor",
      "Învățarea tehnicilor de comunicare eficientă cu copiii",
      "Dezvoltarea strategiilor de gestionare a comportamentului",
      "Lucrul cu emoțiile și stresul parental",
      "Planificarea și implementarea schimbărilor pozitive"
    ],
    target: "Părinți care se confruntă cu provocări în educarea copiilor, comportamente dificile, probleme de comunicare în familie sau care doresc să își dezvolte competențele parentale.",
    active: true
  }
];

const defaultPricingPackages: PricingPackage[] = [
  {
    title: "Consultație Inițială",
    price: "150",
    duration: "60 minute",
    description: "Prima întâlnire pentru evaluarea situației și stabilirea unui plan de dezvoltare personală.",
    features: [
      "Evaluare completă a situației",
      "Stabilirea obiectivelor de dezvoltare",
      "Plan de dezvoltare personalizat",
      "Recomandări și resurse"
    ],
    popular: false,
    active: true
  },
  {
    title: "Ședință Individuală",
    price: "200",
    duration: "50 minute",
    description: "Sesiuni regulate de consiliere și dezvoltare personală individuală pentru adulți.",
    features: [
      "Consiliere personalizată",
      "Tehnici moderne de dezvoltare",
      "Suport continuu între ședințe",
      "Monitorizarea progresului"
    ],
    popular: true,
    active: true
  }
];

export function CMSProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);

  // Initialize data from localStorage
  useEffect(() => {
    const initializeData = () => {
      try {
        const savedUser = localStorage.getItem('cms_user');
        const savedBlogPosts = localStorage.getItem('cms_blog_posts');
        const savedServices = localStorage.getItem('cms_services');
        const savedPricing = localStorage.getItem('cms_pricing');

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        setBlogPosts(savedBlogPosts ? JSON.parse(savedBlogPosts) : defaultBlogPosts);
        setServices(savedServices ? JSON.parse(savedServices) : defaultServices);
        setPricingPackages(savedPricing ? JSON.parse(savedPricing) : defaultPricingPackages);
        
      } catch (error) {
        console.error('Error loading CMS data:', error);
        // Fallback to defaults
        setBlogPosts(defaultBlogPosts);
        setServices(defaultServices);
        setPricingPackages(defaultPricingPackages);
      } finally {
        setIsLoading(false);
      }
    };

    // Use setTimeout to avoid blocking the main thread
    setTimeout(initializeData, 0);
  }, []);

  // Save to localStorage with debouncing
  useEffect(() => {
    if (!isLoading && blogPosts.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('cms_blog_posts', JSON.stringify(blogPosts));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [blogPosts, isLoading]);

  useEffect(() => {
    if (!isLoading && services.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('cms_services', JSON.stringify(services));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [services, isLoading]);

  useEffect(() => {
    if (!isLoading && pricingPackages.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('cms_pricing', JSON.stringify(pricingPackages));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [pricingPackages, isLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication - in production, this would be a real API call
    if (email === 'admin@molnartimeanoemi.ro' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email: 'admin@molnartimeanoemi.ro',
        name: 'Molnar Timea Noemi',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('cms_user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const getBlogPost = (id: string) => {
    return blogPosts.find(post => post.id === id);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const getService = (id: string) => {
    return services.find(service => service.id === id);
  };

  const updatePricingPackage = (index: number, updates: Partial<PricingPackage>) => {
    setPricingPackages(prev => prev.map((pkg, i) => 
      i === index ? { ...pkg, ...updates } : pkg
    ));
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
    isLoading
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