import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          role: 'admin' | 'editor';
          first_login: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
      site_content: {
        Row: {
          id: string;
          section: string;
          content: any;
          updated_at: string;
          updated_by: string;
        };
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          date: string;
          read_time: string;
          title: string;
          excerpt: string;
          category: string;
          image: string;
          author: string;
          tags: string[];
          content: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          title: string;
          duration: string;
          price: string;
          sessions: string;
          image: string;
          link_text: string;
          description: string;
          benefits: string[];
          process: string[];
          target: string;
          active: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      pricing_packages: {
        Row: {
          id: string;
          title: string;
          price: string;
          duration: string;
          description: string;
          features: string[];
          popular: boolean;
          active: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pricing_packages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pricing_packages']['Insert']>;
      };
    };
  };
}
