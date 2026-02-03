import { supabase } from './client';

/**
 * Fetch site content by section
 */
export async function getSiteContent(section: string) {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('section', section)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw error;
    }

    return data?.content || null;
  } catch (error) {
    console.error(`Error fetching ${section} content:`, error);
    return null;
  }
}

/**
 * Update site content
 */
export async function updateSiteContent(section: string, content: any, userId: string) {
  try {
    // Check if content exists
    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .eq('section', section)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('site_content')
        .update({
          content,
          updated_by: userId,
          updated_at: new Date().toISOString()
        })
        .eq('section', section);

      if (error) throw error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('site_content')
        .insert({
          section,
          content,
          updated_by: userId
        });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error(`Error updating ${section} content:`, error);
    return { success: false, error };
  }
}

/**
 * Blog Posts
 */
export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: any) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        date: post.date,
        read_time: post.readTime,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        author: post.author,
        tags: post.tags,
        content: post.content,
        published: post.published
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error };
  }
}

export async function updateBlogPost(id: string, updates: any) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error };
  }
}

/**
 * Services
 */
export async function getAllServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function updateService(id: string, updates: any) {
  try {
    const { error } = await supabase
      .from('services')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error };
  }
}

/**
 * Pricing Packages
 */
export async function getAllPricingPackages() {
  try {
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching pricing packages:', error);
    return [];
  }
}

export async function updatePricingPackage(id: string, updates: any) {
  try {
    const { error } = await supabase
      .from('pricing_packages')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating pricing package:', error);
    return { success: false, error };
  }
}

export async function createPricingPackage(pkg: any) {
  try {
    const { data, error } = await supabase
      .from('pricing_packages')
      .insert(pkg)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating pricing package:', error);
    return { success: false, error };
  }
}

export async function deletePricingPackage(id: string) {
  try {
    const { error } = await supabase
      .from('pricing_packages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting pricing package:', error);
    return { success: false, error };
  }
}
