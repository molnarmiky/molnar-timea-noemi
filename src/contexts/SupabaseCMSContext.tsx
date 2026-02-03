import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  loginAdmin, 
  logoutAdmin, 
  getAdminSession, 
  isAuthenticated as checkAuth 
} from '../utils/supabase/auth';
import {
  getAllServices,
  getActiveServices,
  updateService as updateServiceDB,
  getAllPricing,
  getActivePricing,
  updatePricing as updatePricingDB,
  getAllBlogPosts,
  getPublishedBlogPosts,
  createBlogPost as createBlogPostDB,
  updateBlogPost as updateBlogPostDB,
  deleteBlogPost as deleteBlogPostDB,
  getAllCampaigns,
  getCampaignBySlug,
  createCampaign as createCampaignDB,
  updateCampaign as updateCampaignDB,
  deleteCampaign as deleteCampaignDB,
  getCampaignLeads,
  createCampaignLead as createCampaignLeadDB,
  getAllSiteContent,
  getSiteContent,
  updateSiteContent as updateSiteContentDB
} from '../utils/supabase/database';
import type { 
  Service as DBService,
  PricingPackage as DBPricingPackage,
  BlogPost as DBBlogPost,
  Campaign as DBCampaign,
  CampaignLead as DBCampaignLead,
  SiteContent as DBSiteContent
} from '../utils/supabase/client';

// ==========================================
// TYPE DEFINITIONS (matching old interface)
// ==========================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug?: string;
  duration?: string;
  price?: string;
  sessions?: string;
  image?: string;
  linkText?: string;
  description: string;
  benefits?: string[];
  process?: string[];
  target?: string;
  active: boolean;
}

export interface PricingPackage {
  id: string;
  title: string;
  slug?: string;
  price: number;
  currency?: string;
  billingPeriod?: string;
  duration?: string;
  description?: string;
  features?: string[];
  sessions?: string;
  highlighted?: boolean;
  popular?: boolean;
  active: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  content: any;
  leads?: CampaignLead[];
  createdAt: string;
  updatedAt: string;
}

export interface CampaignLead {
  id: string;
  campaign_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  createdAt: string;
}

export interface SiteContent {
  hero: {
    title: string;
    highlight?: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    image?: string;
  };
  about: {
    title: string;
    subtitle?: string;
    intro?: string;
    description?: string;
    paragraph1?: string;
    paragraph2?: string;
    buttonText?: string;
    experience?: any[];
    education?: any[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city?: string;
    postalCode?: string;
    country?: string;
    workingHours?: string;
    workingNote?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    mapEmbedUrl?: string;
  };
  footer: {
    title?: string;
    subtitle?: string;
    aboutText?: string;
    phone?: string;
    copyrightText?: string;
    socialLinks?: any;
    quickLinks?: any[];
    legalLinks?: any[];
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin';
}

interface CMSContextType {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; isFirstLogin?: boolean; error?: string }>;
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
  updatePricingPackage: (id: string, pkg: Partial<PricingPackage>) => Promise<void>;
  
  // Campaign Management
  campaigns: Campaign[];
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'leads'>) => Promise<void>;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  getCampaign: (slug: string) => Campaign | undefined;
  addCampaignLead: (campaignId: string, lead: Omit<CampaignLead, 'id' | 'createdAt' | 'campaign_id'>) => Promise<void>;
  
  // Site Content Management
  siteContent: SiteContent;
  updateSiteContent: (section: keyof SiteContent, updates: any) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Refresh data
  refreshData: () => Promise<void>;
}

const SupabaseCMSContext = createContext<CMSContextType | undefined>(undefined);

// ==========================================
// DEFAULT DATA (Fallback)
// ==========================================

const defaultSiteContent: SiteContent = {
  hero: {
    title: "Hi, I'm Timea",
    highlight: "Molnar Timea Noemi",
    subtitle: "A passionate digital designer crafting beautiful experiences that connect people with brands they love.",
    primaryButtonText: "View My Work",
    secondaryButtonText: "Get In Touch",
    image: "https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6"
  },
  about: {
    title: "Despre mine",
    subtitle: "Psiholog clinician cu peste 5 ani de experiență",
    intro: "Bună! Sunt Molnár Timea Noemi, psiholog clinician specializat în consiliere și dezvoltare personală.",
    description: "Lucrez cu adulți, copii și adolescenți, oferind consiliere individuală, terapia cuplurilor și sesiuni de grup.",
    paragraph1: "",
    paragraph2: "",
    buttonText: "Află Mai Multe"
  },
  contact: {
    phone: "+40 745 123 456",
    email: "contact@molnartimeanoemi.ro",
    address: "Strada Livezii, nr. 100",
    city: "Sibiu",
    postalCode: "550042",
    country: "România",
    workingHours: "Luni - Vineri: 9:00 - 18:00",
    mapEmbedUrl: ""
  },
  footer: {
    title: "Molnár Timea Noemi",
    subtitle: "Cabinet consiliere și dezvoltare personală",
    aboutText: "Cabinet consiliere și dezvoltare personală dedicat să te ajute să descoperi puterea interioară și să trăiești o viață autentică.",
    phone: "+40 745 123 456",
    copyrightText: "© 2026 Molnár Timea Noemi. Toate drepturile rezervate."
  }
};

// ==========================================
// PROVIDER COMPONENT
// ==========================================

export function SupabaseCMSProvider({ children }: { children: ReactNode }) {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  
  // Data State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  
  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // AUTHENTICATION FUNCTIONS
  // ==========================================

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAdmin({ email, password });
      
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.fullName,
          role: 'admin'
        });
        setIsAuthenticated(true);
        setIsFirstLogin(response.isFirstLogin || false);
        
        // Load all data after login
        await loadAllData();
        
        return { 
          success: true, 
          isFirstLogin: response.isFirstLogin 
        };
      }
      
      return { 
        success: false, 
        error: response.error 
      };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.message || 'A apărut o eroare' 
      };
    }
  };

  const logout = () => {
    logoutAdmin();
    setUser(null);
    setIsAuthenticated(false);
    setIsFirstLogin(false);
  };

  // Check auth on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = checkAuth();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const session = getAdminSession();
        if (session) {
          setUser({
            id: session.userId,
            email: session.email,
            fullName: session.fullName,
            role: 'admin'
          });
          setIsFirstLogin(session.isFirstLogin || false);
          await loadAllData();
        }
      } else {
        // Load public data even if not authenticated
        await loadPublicData();
      }
      
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  // ==========================================
  // DATA LOADING FUNCTIONS
  // ==========================================

  const loadPublicData = async () => {
    try {
      setIsLoading(true);
      
      // Load published blog posts
      const posts = await getPublishedBlogPosts();
      setBlogPosts(posts.map(transformBlogPost));
      
      // Load active services
      const svcs = await getActiveServices();
      setServices(svcs.map(transformService));
      
      // Load active pricing
      const pricing = await getActivePricing();
      setPricingPackages(pricing.map(transformPricing));
      
      // Load active campaigns
      const camps = await getAllCampaigns();
      const activeCamps = camps.filter(c => c.active);
      setCampaigns(await Promise.all(activeCamps.map(transformCampaign)));
      
      // Load site content
      await loadSiteContent();
      
      setError(null);
    } catch (err: any) {
      console.error('Error loading public data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      
      // Load all blog posts (including unpublished)
      const posts = await getAllBlogPosts();
      setBlogPosts(posts.map(transformBlogPost));
      
      // Load all services
      const svcs = await getAllServices();
      setServices(svcs.map(transformService));
      
      // Load all pricing
      const pricing = await getAllPricing();
      setPricingPackages(pricing.map(transformPricing));
      
      // Load all campaigns
      const camps = await getAllCampaigns();
      setCampaigns(await Promise.all(camps.map(transformCampaign)));
      
      // Load site content
      await loadSiteContent();
      
      setError(null);
    } catch (err: any) {
      console.error('Error loading all data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSiteContent = async () => {
    try {
      const sections = await getAllSiteContent();
      const content: any = { ...defaultSiteContent };
      
      sections.forEach((section: any) => {
        if (section.section && section.content) {
          // Map database sections to our structure
          if (section.section === 'hero') {
            content.hero = { ...defaultSiteContent.hero, ...section.content };
          } else if (section.section === 'about') {
            content.about = { ...defaultSiteContent.about, ...section.content };
          } else if (section.section === 'contact_info') {
            content.contact = { ...defaultSiteContent.contact, ...section.content };
          } else if (section.section === 'footer') {
            content.footer = { ...defaultSiteContent.footer, ...section.content };
          }
        }
      });
      
      setSiteContent(content);
    } catch (err) {
      console.error('Error loading site content:', err);
      // Keep default content on error
    }
  };

  const refreshData = async () => {
    if (isAuthenticated) {
      await loadAllData();
    } else {
      await loadPublicData();
    }
  };

  // ==========================================
  // TRANSFORM FUNCTIONS (DB to App format)
  // ==========================================

  const transformBlogPost = (post: DBBlogPost): BlogPost => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    featuredImage: post.featured_image,
    category: post.category,
    tags: post.tags,
    published: post.published,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at
  });

  const transformService = (service: DBService): Service => ({
    id: service.id,
    title: service.title,
    slug: service.slug,
    description: service.description,
    image: service.icon, // We'll need to map this properly
    benefits: service.features,
    active: service.active,
    price: `${service.display_order * 100} RON`, // Temporary mapping
    duration: "50 minute",
    sessions: "Săptămânal"
  });

  const transformPricing = (pricing: DBPricingPackage): PricingPackage => ({
    id: pricing.id,
    title: pricing.title,
    slug: pricing.slug,
    price: Number(pricing.price),
    currency: pricing.currency,
    billingPeriod: pricing.billing_period,
    description: pricing.description,
    features: pricing.features,
    highlighted: pricing.highlighted,
    popular: pricing.highlighted,
    active: pricing.active
  });

  const transformCampaign = async (campaign: DBCampaign): Promise<Campaign> => {
    const leads = await getCampaignLeads(campaign.id);
    return {
      id: campaign.id,
      title: campaign.title,
      slug: campaign.slug,
      active: campaign.active,
      content: campaign.content,
      leads: leads.map(transformCampaignLead),
      createdAt: campaign.created_at,
      updatedAt: campaign.updated_at
    };
  };

  const transformCampaignLead = (lead: DBCampaignLead): CampaignLead => ({
    id: lead.id,
    campaign_id: lead.campaign_id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    createdAt: lead.created_at
  });

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  // Blog Posts
  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbPost = await createBlogPostDB({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featuredImage,
      category: post.category,
      tags: post.tags,
      published: post.published,
      published_at: post.publishedAt,
      author_id: user.id
    });
    
    setBlogPosts([...blogPosts, transformBlogPost(dbPost)]);
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbPost = await updateBlogPostDB(id, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featuredImage,
      category: post.category,
      tags: post.tags,
      published: post.published,
      published_at: post.publishedAt
    });
    
    setBlogPosts(blogPosts.map(p => p.id === id ? transformBlogPost(dbPost) : p));
  };

  const deleteBlogPost = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    
    await deleteBlogPostDB(id);
    setBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  const getBlogPost = (id: string) => {
    return blogPosts.find(p => p.id === id);
  };

  // Services
  const updateService = async (id: string, service: Partial<Service>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbService = await updateServiceDB(id, {
      title: service.title,
      description: service.description,
      features: service.benefits,
      active: service.active
    });
    
    setServices(services.map(s => s.id === id ? transformService(dbService) : s));
  };

  const getService = (id: string) => {
    return services.find(s => s.id === id);
  };

  // Pricing
  const updatePricingPackage = async (id: string, pkg: Partial<PricingPackage>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbPricing = await updatePricingDB(id, {
      title: pkg.title,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features,
      highlighted: pkg.highlighted,
      active: pkg.active
    });
    
    setPricingPackages(pricingPackages.map(p => p.id === id ? transformPricing(dbPricing) : p));
  };

  // Campaigns
  const createCampaign = async (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'leads'>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbCampaign = await createCampaignDB({
      title: campaign.title,
      slug: campaign.slug,
      active: campaign.active,
      content: campaign.content
    });
    
    setCampaigns([...campaigns, await transformCampaign(dbCampaign)]);
  };

  const updateCampaign = async (id: string, campaign: Partial<Campaign>) => {
    if (!user) throw new Error('Not authenticated');
    
    const dbCampaign = await updateCampaignDB(id, {
      title: campaign.title,
      slug: campaign.slug,
      active: campaign.active,
      content: campaign.content
    });
    
    const updated = await transformCampaign(dbCampaign);
    setCampaigns(campaigns.map(c => c.id === id ? updated : c));
  };

  const deleteCampaign = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    
    await deleteCampaignDB(id);
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const getCampaign = (slug: string) => {
    return campaigns.find(c => c.slug === slug);
  };

  const addCampaignLead = async (campaignId: string, lead: Omit<CampaignLead, 'id' | 'createdAt' | 'campaign_id'>) => {
    const dbLead = await createCampaignLeadDB({
      campaign_id: campaignId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message
    });
    
    // Update campaign leads
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      const updatedLeads = [...(campaign.leads || []), transformCampaignLead(dbLead)];
      setCampaigns(campaigns.map(c => 
        c.id === campaignId 
          ? { ...c, leads: updatedLeads }
          : c
      ));
    }
  };

  // Site Content
  const updateSiteContent = async (section: keyof SiteContent, updates: any) => {
    if (!user) throw new Error('Not authenticated');
    
    // Map section names to database section names
    const sectionMap: Record<string, string> = {
      hero: 'hero',
      about: 'about',
      contact: 'contact_info',
      footer: 'footer'
    };
    
    const dbSection = sectionMap[section];
    const currentContent = siteContent[section];
    const newContent = { ...currentContent, ...updates };
    
    await updateSiteContentDB(dbSection, newContent, user.id);
    
    setSiteContent({
      ...siteContent,
      [section]: newContent
    });
  };

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value: CMSContextType = {
    // Auth
    user,
    isAuthenticated,
    isFirstLogin,
    login,
    logout,
    
    // Blog
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPost,
    
    // Services
    services,
    updateService,
    getService,
    
    // Pricing
    pricingPackages,
    updatePricingPackage,
    
    // Campaigns
    campaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
    addCampaignLead,
    
    // Site Content
    siteContent,
    updateSiteContent,
    
    // UI State
    isLoading,
    error,
    
    // Refresh
    refreshData
  };

  return (
    <SupabaseCMSContext.Provider value={value}>
      {children}
    </SupabaseCMSContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useSupabaseCMS() {
  const context = useContext(SupabaseCMSContext);
  if (!context) {
    throw new Error('useSupabaseCMS must be used within SupabaseCMSProvider');
  }
  return context;
}
