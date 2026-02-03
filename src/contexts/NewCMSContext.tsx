import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginAdmin, changePassword, AdminUser } from '../utils/supabase/auth';
import * as cmsApi from '../utils/supabase/cms';

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
  orderIndex: number;
}

export interface PricingPackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  active: boolean;
  orderIndex: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  image: string;
}

export interface AboutContent {
  title: string;
  description: string[];
  credentials: string[];
  image: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface CMSContextType {
  // Authentication
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  needsPasswordChange: boolean;
  
  // Blog Management
  blogPosts: BlogPost[];
  loadBlogPosts: () => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; error?: string }>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<{ success: boolean; error?: string }>;
  deleteBlogPost: (id: string) => Promise<{ success: boolean; error?: string }>;
  getBlogPost: (id: string) => BlogPost | undefined;
  
  // Service Management
  services: Service[];
  loadServices: () => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<{ success: boolean; error?: string }>;
  getService: (id: string) => Service | undefined;
  
  // Pricing Management
  pricingPackages: PricingPackage[];
  loadPricingPackages: () => Promise<void>;
  updatePricingPackage: (id: string, pkg: Partial<PricingPackage>) => Promise<{ success: boolean; error?: string }>;
  addPricingPackage: (pkg: Omit<PricingPackage, 'id'>) => Promise<{ success: boolean; error?: string }>;
  deletePricingPackage: (id: string) => Promise<{ success: boolean; error?: string }>;
  
  // Content Management
  heroContent: HeroContent | null;
  aboutContent: AboutContent | null;
  contactInfo: ContactInfo | null;
  loadContent: (section: string) => Promise<any>;
  updateContent: (section: string, content: any) => Promise<{ success: boolean; error?: string }>;
  
  // Loading states
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function NewCMSProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  // Check for stored session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('admin_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await loginAdmin(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('admin_user', JSON.stringify(result.user));
        return { success: true };
      }
      
      return { success: false, error: result.error || 'Autentificare eșuată' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Eroare la autentificare' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  // Change password function
  const changePasswordFunc = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      return { success: false, error: 'Nu există utilizator autentificat' };
    }

    try {
      const result = await changePassword(user.id, currentPassword, newPassword);
      
      if (result.success) {
        // Update user's first_login status
        const updatedUser = { ...user, firstLogin: false };
        setUser(updatedUser);
        localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      }
      
      return result;
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, error: 'Eroare la schimbarea parolei' };
    }
  };

  // Load blog posts
  const loadBlogPosts = async () => {
    try {
      const posts = await cmsApi.getAllBlogPosts();
      setBlogPosts(posts.map(post => ({
        id: post.id,
        date: post.date,
        readTime: post.read_time,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        author: post.author,
        tags: post.tags,
        content: post.content,
        published: post.published,
        createdAt: post.created_at,
        updatedAt: post.updated_at
      })));
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  // Add blog post
  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const result = await cmsApi.createBlogPost(post);
      if (result.success) {
        await loadBlogPosts();
      }
      return result;
    } catch (error) {
      console.error('Error adding blog post:', error);
      return { success: false, error: 'Eroare la adăugarea articolului' };
    }
  };

  // Update blog post
  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const result = await cmsApi.updateBlogPost(id, updates);
      if (result.success) {
        await loadBlogPosts();
      }
      return result;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { success: false, error: 'Eroare la actualizarea articolului' };
    }
  };

  // Delete blog post
  const deleteBlogPost = async (id: string) => {
    try {
      const result = await cmsApi.deleteBlogPost(id);
      if (result.success) {
        await loadBlogPosts();
      }
      return result;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: 'Eroare la ștergerea articolului' };
    }
  };

  // Get blog post
  const getBlogPost = (id: string) => {
    return blogPosts.find(post => post.id === id);
  };

  // Load services
  const loadServices = async () => {
    try {
      const servicesData = await cmsApi.getAllServices();
      setServices(servicesData.map(service => ({
        id: service.id,
        title: service.title,
        duration: service.duration,
        price: service.price,
        sessions: service.sessions,
        image: service.image,
        linkText: service.link_text,
        description: service.description,
        benefits: service.benefits,
        process: service.process,
        target: service.target,
        active: service.active,
        orderIndex: service.order_index
      })));
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  // Update service
  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const result = await cmsApi.updateService(id, updates);
      if (result.success) {
        await loadServices();
      }
      return result;
    } catch (error) {
      console.error('Error updating service:', error);
      return { success: false, error: 'Eroare la actualizarea serviciului' };
    }
  };

  // Get service
  const getService = (id: string) => {
    return services.find(service => service.id === id);
  };

  // Load pricing packages
  const loadPricingPackages = async () => {
    try {
      const packages = await cmsApi.getAllPricingPackages();
      setPricingPackages(packages.map(pkg => ({
        id: pkg.id,
        title: pkg.title,
        price: pkg.price,
        duration: pkg.duration,
        description: pkg.description,
        features: pkg.features,
        popular: pkg.popular,
        active: pkg.active,
        orderIndex: pkg.order_index
      })));
    } catch (error) {
      console.error('Error loading pricing packages:', error);
    }
  };

  // Update pricing package
  const updatePricingPackage = async (id: string, updates: Partial<PricingPackage>) => {
    try {
      const result = await cmsApi.updatePricingPackage(id, updates);
      if (result.success) {
        await loadPricingPackages();
      }
      return result;
    } catch (error) {
      console.error('Error updating pricing package:', error);
      return { success: false, error: 'Eroare la actualizarea pachetului' };
    }
  };

  // Add pricing package
  const addPricingPackage = async (pkg: Omit<PricingPackage, 'id'>) => {
    try {
      const result = await cmsApi.createPricingPackage(pkg);
      if (result.success) {
        await loadPricingPackages();
      }
      return result;
    } catch (error) {
      console.error('Error adding pricing package:', error);
      return { success: false, error: 'Eroare la adăugarea pachetului' };
    }
  };

  // Delete pricing package
  const deletePricingPackage = async (id: string) => {
    try {
      const result = await cmsApi.deletePricingPackage(id);
      if (result.success) {
        await loadPricingPackages();
      }
      return result;
    } catch (error) {
      console.error('Error deleting pricing package:', error);
      return { success: false, error: 'Eroare la ștergerea pachetului' };
    }
  };

  // Load content
  const loadContent = async (section: string) => {
    try {
      const content = await cmsApi.getSiteContent(section);
      
      switch (section) {
        case 'hero':
          setHeroContent(content);
          break;
        case 'about':
          setAboutContent(content);
          break;
        case 'contact':
          setContactInfo(content);
          break;
      }
      
      return content;
    } catch (error) {
      console.error(`Error loading ${section} content:`, error);
      return null;
    }
  };

  // Update content
  const updateContentFunc = async (section: string, content: any) => {
    if (!user) {
      return { success: false, error: 'Nu există utilizator autentificat' };
    }

    try {
      const result = await cmsApi.updateSiteContent(section, content, user.id);
      
      if (result.success) {
        await loadContent(section);
      }
      
      return result;
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      return { success: false, error: 'Eroare la actualizarea conținutului' };
    }
  };

  const value: CMSContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    changePassword: changePasswordFunc,
    needsPasswordChange: user?.firstLogin || false,
    
    blogPosts,
    loadBlogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPost,
    
    services,
    loadServices,
    updateService,
    getService,
    
    pricingPackages,
    loadPricingPackages,
    updatePricingPackage,
    addPricingPackage,
    deletePricingPackage,
    
    heroContent,
    aboutContent,
    contactInfo,
    loadContent,
    updateContent: updateContentFunc,
    
    isLoading
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

export function useNewCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useNewCMS must be used within a NewCMSProvider');
  }
  return context;
}
