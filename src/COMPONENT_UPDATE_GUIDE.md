# 🔄 Component Update Guide - Migration to Supabase

## Quick Reference for Updating Components

This guide shows exactly how to update each admin component from `useCMS` to `useSupabaseCMS`.

---

## 🎯 General Pattern

### Step 1: Update Imports

```typescript
// ❌ OLD
import { useCMS } from '../../contexts/CMSContext';

// ✅ NEW
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
```

### Step 2: Update Hook Usage

```typescript
// ❌ OLD
const { blogPosts, addBlogPost } = useCMS();

// ✅ NEW
const { blogPosts, addBlogPost, isLoading, error } = useSupabaseCMS();
```

### Step 3: Make Handlers Async

```typescript
// ❌ OLD
const handleSave = () => {
  updateBlogPost(id, data);
  setEditing(false);
};

// ✅ NEW
const handleSave = async () => {
  try {
    await updateBlogPost(id, data);
    toast.success('Saved successfully!');
    setEditing(false);
  } catch (error: any) {
    toast.error(error.message || 'Failed to save');
  }
};
```

### Step 4: Add Loading States

```typescript
// ❌ OLD
<Button onClick={handleSave}>Save</Button>

// ✅ NEW
const [isSaving, setIsSaving] = useState(false);

<Button 
  onClick={handleSave} 
  disabled={isSaving}
>
  {isSaving ? 'Saving...' : 'Save'}
</Button>
```

---

## 📝 Component-Specific Updates

### 1. BlogManager.tsx

**Current Issues:**
- Uses `useCMS`
- Synchronous operations
- No error handling

**Required Changes:**

```typescript
import { useState } from 'react';
import { useSupabaseCMS, BlogPost } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
// ... other imports

export function BlogManager() {
  const { 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost,
    isLoading 
  } = useSupabaseCMS();
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});

  // Create new post
  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    setIsSaving(true);
    try {
      await addBlogPost({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: formData.excerpt || '',
        content: formData.content,
        featuredImage: formData.featuredImage,
        category: formData.category,
        tags: formData.tags,
        published: formData.published || false,
        publishedAt: formData.published ? new Date().toISOString() : undefined
      });
      
      toast.success('Blog post created!');
      setIsEditing(false);
      setFormData({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    } finally {
      setIsSaving(false);
    }
  };

  // Update existing post
  const handleUpdate = async () => {
    if (!selectedPost?.id) return;

    setIsSaving(true);
    try {
      await updateBlogPost(selectedPost.id, formData);
      toast.success('Blog post updated!');
      setIsEditing(false);
      setSelectedPost(null);
      setFormData({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete post
  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deleteBlogPost(postId);
      toast.success('Blog post deleted!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete post');
    }
  };

  // Toggle publish status
  const handleTogglePublish = async (post: BlogPost) => {
    try {
      await updateBlogPost(post.id, {
        published: !post.published,
        publishedAt: !post.published ? new Date().toISOString() : undefined
      });
      toast.success(post.published ? 'Post unpublished' : 'Post published');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#a594f9] border-t-transparent"></div>
      </div>
    );
  }

  // ... rest of component
}
```

**Key Changes:**
- ✅ Import `useSupabaseCMS`
- ✅ Add `toast` notifications
- ✅ Make all handlers async
- ✅ Add try/catch error handling
- ✅ Add loading states (`isSaving`)
- ✅ Show loading spinner while fetching

---

### 2. ServiceManager.tsx

**Current Issues:**
- Uses `useCMS`
- May use index-based updates

**Required Changes:**

```typescript
import { useState } from 'react';
import { useSupabaseCMS, Service } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
// ... other imports

export function ServiceManager() {
  const { 
    services, 
    updateService,
    isLoading 
  } = useSupabaseCMS();
  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData(service);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedService?.id) return;

    setIsSaving(true);
    try {
      await updateService(selectedService.id, formData); // Use ID, not index!
      toast.success('Service updated!');
      setIsEditing(false);
      setSelectedService(null);
      setFormData({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to update service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      await updateService(service.id, { active: !service.active });
      toast.success(service.active ? 'Service deactivated' : 'Service activated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  // ... rest of component
}
```

**Key Changes:**
- ✅ Change from index to ID: `updateService(service.id, updates)`
- ✅ Add async/await
- ✅ Add error handling
- ✅ Add loading states

---

### 3. CampaignManager.tsx

**Required Changes:**

```typescript
import { useState } from 'react';
import { useSupabaseCMS, Campaign } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
// ... other imports

export function CampaignManager() {
  const { 
    campaigns, 
    createCampaign,
    updateCampaign, 
    deleteCampaign,
    addCampaignLead,
    isLoading 
  } = useSupabaseCMS();
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSaving(true);
    try {
      await createCampaign({
        title: data.title,
        slug: data.slug,
        active: data.active,
        content: data.content
      });
      toast.success('Campaign created!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create campaign');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    setIsSaving(true);
    try {
      await updateCampaign(id, data);
      toast.success('Campaign updated!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update campaign');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign?')) return;
    
    try {
      await deleteCampaign(id);
      toast.success('Campaign deleted!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete campaign');
    }
  };

  const handleToggleActive = async (campaign: Campaign) => {
    try {
      await updateCampaign(campaign.id, { active: !campaign.active });
      toast.success(campaign.active ? 'Campaign deactivated' : 'Campaign activated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  // View campaign leads
  const viewLeads = (campaign: Campaign) => {
    // campaign.leads is already populated from context
    console.log('Campaign leads:', campaign.leads);
  };

  // ... rest of component
}
```

**Key Changes:**
- ✅ Full CRUD operations
- ✅ Async handlers
- ✅ Error handling
- ✅ Toast notifications
- ✅ Campaign leads accessible via `campaign.leads`

---

### 4. SiteContentManager.tsx

**Current Issues:**
- May use old signature: `updateSiteContent(updates)`

**Required Changes:**

```typescript
import { useState } from 'react';
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
// ... other imports

export function SiteContentManager() {
  const { 
    siteContent, 
    updateSiteContent,
    isLoading 
  } = useSupabaseCMS();
  
  const [isSaving, setIsSaving] = useState(false);
  const [heroData, setHeroData] = useState(siteContent.hero);
  const [aboutData, setAboutData] = useState(siteContent.about);
  const [contactData, setContactData] = useState(siteContent.contact);
  const [footerData, setFooterData] = useState(siteContent.footer);

  // Update Hero Section
  const handleSaveHero = async () => {
    setIsSaving(true);
    try {
      await updateSiteContent('hero', heroData); // NEW SIGNATURE: (section, updates)
      toast.success('Hero section updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update hero');
    } finally {
      setIsSaving(false);
    }
  };

  // Update About Section
  const handleSaveAbout = async () => {
    setIsSaving(true);
    try {
      await updateSiteContent('about', aboutData);
      toast.success('About section updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update about');
    } finally {
      setIsSaving(false);
    }
  };

  // Update Contact Section
  const handleSaveContact = async () => {
    setIsSaving(true);
    try {
      await updateSiteContent('contact', contactData);
      toast.success('Contact section updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update contact');
    } finally {
      setIsSaving(false);
    }
  };

  // Update Footer Section
  const handleSaveFooter = async () => {
    setIsSaving(true);
    try {
      await updateSiteContent('footer', footerData);
      toast.success('Footer section updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update footer');
    } finally {
      setIsSaving(false);
    }
  };

  // Sync local state with context when it changes
  useEffect(() => {
    setHeroData(siteContent.hero);
    setAboutData(siteContent.about);
    setContactData(siteContent.contact);
    setFooterData(siteContent.footer);
  }, [siteContent]);

  // ... rest of component
}
```

**Key Changes:**
- ✅ New signature: `updateSiteContent(section, updates)`
- ✅ Separate handler for each section
- ✅ Async operations
- ✅ Error handling
- ✅ Sync with context changes

---

### 5. Dashboard.tsx

**Required Changes:**

```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
// ... other imports

export function Dashboard() {
  const { 
    blogPosts, 
    services, 
    pricingPackages, 
    campaigns,
    siteContent,
    isLoading 
  } = useSupabaseCMS();

  // Calculate stats
  const stats = {
    totalBlogPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.published).length,
    totalServices: services.length,
    activeServices: services.filter(s => s.active).length,
    totalPricing: pricingPackages.length,
    activePricing: pricingPackages.filter(p => p.active).length,
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.active).length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#a594f9] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-medium text-[#e8e6f7]">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Blog Posts"
          value={stats.totalBlogPosts}
          subtitle={`${stats.publishedPosts} published`}
          color="blue"
        />
        
        <StatCard
          icon={Briefcase}
          title="Services"
          value={stats.totalServices}
          subtitle={`${stats.activeServices} active`}
          color="purple"
        />
        
        <StatCard
          icon={DollarSign}
          title="Pricing"
          value={stats.totalPricing}
          subtitle={`${stats.activePricing} active`}
          color="green"
        />
        
        <StatCard
          icon={Megaphone}
          title="Campaigns"
          value={stats.totalCampaigns}
          subtitle={`${stats.activeCampaigns} active`}
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-[#e8e6f7]">Recent Blog Posts</h2>
        <div className="space-y-2">
          {blogPosts.slice(0, 5).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Key Changes:**
- ✅ Use `useSupabaseCMS`
- ✅ Calculate stats from context data
- ✅ Show loading state
- ✅ Display real data

---

### 6. ContactMessages.tsx

**Note:** This may need a new database table or can display placeholder.

**Option A: If database table exists**

```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';

export function ContactMessages() {
  // Add contactMessages to SupabaseCMSContext if needed
  const { isLoading } = useSupabaseCMS();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMessages(data);
    } catch (error: any) {
      toast.error('Failed to load messages');
    }
  };

  // ... rest of component
}
```

**Option B: Show placeholder**

```typescript
export function ContactMessages() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-[#e8e6f7] mb-4">
        Contact Messages
      </h1>
      <p className="text-[#b8b4d1]">
        Contact form integration coming soon...
      </p>
    </div>
  );
}
```

---

### 7. SubscribersManager.tsx

Similar to ContactMessages - either integrate with database or show placeholder.

---

## 🎯 Testing Each Component

After updating each component:

### 1. Check for TypeScript Errors
```bash
npm run build
# Should complete without errors
```

### 2. Test in Browser
```bash
npm run dev
```

### 3. Verify Functionality
- [ ] Component loads without errors
- [ ] Data displays correctly
- [ ] Edit/Update operations work
- [ ] Delete operations work (if applicable)
- [ ] Toggle active/inactive works
- [ ] Loading states display
- [ ] Error messages show on failure
- [ ] Success toasts appear
- [ ] Changes persist after refresh

### 4. Check Console
- No errors in browser console
- No failed network requests
- Supabase operations complete successfully

---

## 📋 Update Checklist

Use this checklist for each component:

- [ ] Updated import from `useCMS` to `useSupabaseCMS`
- [ ] Added `toast` import
- [ ] Made all handlers async
- [ ] Added try/catch blocks
- [ ] Added loading states
- [ ] Updated any index-based operations to use IDs
- [ ] Added toast notifications (success/error)
- [ ] Tested create operation (if applicable)
- [ ] Tested update operation
- [ ] Tested delete operation (if applicable)
- [ ] Tested toggle operations
- [ ] Verified changes persist
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive design maintained

---

## 🚀 Quick Tips

### Tip 1: Loading States Pattern
```typescript
const [isSaving, setIsSaving] = useState(false);

const handleSave = async () => {
  setIsSaving(true);
  try {
    await someOperation();
  } finally {
    setIsSaving(false); // Always reset, even on error
  }
};
```

### Tip 2: Toast Pattern
```typescript
try {
  await operation();
  toast.success('Operation successful!');
} catch (error: any) {
  toast.error(error.message || 'Operation failed');
}
```

### Tip 3: ID vs Index
```typescript
// ❌ OLD (index-based)
updatePricingPackage(0, updates);

// ✅ NEW (ID-based)
updatePricingPackage(package.id, updates);
```

### Tip 4: Async Button Disable
```typescript
<Button 
  onClick={handleSave}
  disabled={isSaving || isLoading}
>
  {isSaving && <Spinner className="mr-2" />}
  {isSaving ? 'Saving...' : 'Save'}
</Button>
```

---

## ✅ Completion Checklist

When all components are updated:

- [ ] All 6 components updated
- [ ] All TypeScript errors resolved
- [ ] All components tested locally
- [ ] Database operations verified
- [ ] Toast notifications working
- [ ] Loading states displaying
- [ ] Error handling working
- [ ] Changes persisting
- [ ] Documentation updated
- [ ] Ready for production deploy

---

**Estimated Time per Component:** 20-30 minutes  
**Total Time for 6 Components:** 2-3 hours  

**You've got this! 🚀**
