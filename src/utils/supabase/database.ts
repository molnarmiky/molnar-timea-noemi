import { supabase } from './client';
import type {
  SiteContent,
  Service,
  PricingPackage,
  BlogPost,
  Campaign,
  CampaignLead,
  ContactMessage,
  NewsletterSubscriber
} from './client';

// ============================================
// SITE CONTENT OPERATIONS
// ============================================

export async function getSiteContent(section: string) {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('section', section)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    console.error('Error fetching site content:', error);
    return null;
  }

  return data;
}

export async function getAllSiteContent() {
  const { data, error } = await supabase
    .from('site_content')
    .select('*');

  if (error) {
    console.error('Error fetching all site content:', error);
    return [];
  }

  return data || [];
}

export async function updateSiteContent(
  section: string,
  content: any,
  userId: string
) {
  // Check if content exists
  const existing = await getSiteContent(section);

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from('site_content')
      .update({
        content,
        updated_by: userId,
        updated_at: new Date().toISOString()
      })
      .eq('section', section)
      .select()
      .single();

    if (error) {
      console.error('Error updating site content:', error);
      throw error;
    }

    return data;
  } else {
    // Insert new
    const { data, error } = await supabase
      .from('site_content')
      .insert({
        section,
        content,
        updated_by: userId
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating site content:', error);
      throw error;
    }

    return data;
  }
}

// ============================================
// SERVICES OPERATIONS
// ============================================

export async function getAllServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export async function getActiveServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active services:', error);
    return [];
  }

  return data || [];
}

export async function createService(service: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }

  return data;
}

export async function updateService(id: string, service: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }

  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }

  return true;
}

// ============================================
// PRICING OPERATIONS
// ============================================

export async function getAllPricing() {
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pricing:', error);
    return [];
  }

  return data || [];
}

export async function getActivePricing() {
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active pricing:', error);
    return [];
  }

  return data || [];
}

export async function createPricing(pricing: Partial<PricingPackage>) {
  const { data, error } = await supabase
    .from('pricing_packages')
    .insert(pricing)
    .select()
    .single();

  if (error) {
    console.error('Error creating pricing:', error);
    throw error;
  }

  return data;
}

export async function updatePricing(id: string, pricing: Partial<PricingPackage>) {
  const { data, error } = await supabase
    .from('pricing_packages')
    .update(pricing)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating pricing:', error);
    throw error;
  }

  return data;
}

export async function deletePricing(id: string) {
  const { error } = await supabase
    .from('pricing_packages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting pricing:', error);
    throw error;
  }

  return true;
}

// ============================================
// BLOG OPERATIONS
// ============================================

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getPublishedBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published blog posts:', error);
    return [];
  }

  return data || [];
}

export async function createBlogPost(post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return data;
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }

  return data;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }

  return true;
}

// ============================================
// CAMPAIGNS OPERATIONS
// ============================================

export async function getAllCampaigns() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }

  return data || [];
}

export async function getCampaignBySlug(slug: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching campaign:', error);
    return null;
  }

  return data;
}

export async function createCampaign(campaign: Partial<Campaign>) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert(campaign)
    .select()
    .single();

  if (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }

  return data;
}

export async function updateCampaign(id: string, campaign: Partial<Campaign>) {
  const { data, error } = await supabase
    .from('campaigns')
    .update(campaign)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }

  return data;
}

export async function deleteCampaign(id: string) {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }

  return true;
}

// ============================================
// CAMPAIGN LEADS OPERATIONS
// ============================================

export async function getCampaignLeads(campaignId: string) {
  const { data, error } = await supabase
    .from('campaign_leads')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaign leads:', error);
    return [];
  }

  return data || [];
}

export async function createCampaignLead(lead: Partial<CampaignLead>) {
  const { data, error } = await supabase
    .from('campaign_leads')
    .insert(lead)
    .select()
    .single();

  if (error) {
    console.error('Error creating campaign lead:', error);
    throw error;
  }

  return data;
}

// ============================================
// CONTACT MESSAGES OPERATIONS
// ============================================

export async function getAllContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }

  return data || [];
}

export async function createContactMessage(message: Partial<ContactMessage>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single();

  if (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }

  return data;
}

export async function markMessageAsRead(id: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }

  return data;
}

// ============================================
// NEWSLETTER OPERATIONS
// ============================================

export async function getAllNewsletterSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }

  return data || [];
}

export async function createNewsletterSubscriber(subscriber: Partial<NewsletterSubscriber>) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert(subscriber)
    .select()
    .single();

  if (error) {
    console.error('Error creating newsletter subscriber:', error);
    throw error;
  }

  return data;
}

export async function unsubscribeNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .update({ active: false })
    .eq('email', email)
    .select()
    .single();

  if (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }

  return data;
}
