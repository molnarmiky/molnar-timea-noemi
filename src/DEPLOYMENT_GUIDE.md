# 🚀 Deployment Guide - Supabase Integration

## ✅ Prerequisites Complete

**API Keys Configured:**
- ✅ Anon Public Key: Configured in `.env`
- ✅ Service Role Key: Configured in `.env`
- ✅ `.gitignore` created to protect secrets
- ✅ Client configured to use environment variables

---

## 📋 Deployment Steps

### Step 1: Install Dependencies (2 minutes)

```bash
# Install Supabase client and bcrypt
npm install @supabase/supabase-js bcryptjs

# Install TypeScript types
npm install -D @types/bcryptjs

# Verify installation
npm list @supabase/supabase-js bcryptjs
```

**Expected Output:**
```
├── @supabase/supabase-js@2.x.x
└── bcryptjs@2.x.x
```

---

### Step 2: Deploy Database Schema (10 minutes)

#### 2.1 Open Supabase SQL Editor

Navigate to:
```
https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/sql/new
```

#### 2.2 Run Migration 001 - Initial Schema

1. Open file: `/supabase/migrations/001_initial_schema.sql`
2. Copy **entire contents**
3. Paste into SQL Editor
4. Click "Run" button
5. Wait for success message

**Expected Output:**
```
Success. No rows returned
```

#### 2.3 Run Migration 002 - Seed Data

1. Open file: `/supabase/migrations/002_seed_initial_data.sql`
2. Copy **entire contents**
3. Paste into SQL Editor
4. Click "Run" button
5. Wait for success message

**Expected Output:**
```
Success. X rows affected
```

#### 2.4 Hash Admin Password

In the same SQL Editor, run:

```sql
-- Hash the default admin password
UPDATE admin_users 
SET password_hash = crypt('admin123', gen_salt('bf', 10))
WHERE email = 'admin@molnartimeanoemi.ro';
```

**Expected Output:**
```
Success. 1 row affected
```

#### 2.5 Verify Database Setup

Run these verification queries:

```sql
-- Check admin user exists
SELECT id, email, full_name, is_first_login, created_at 
FROM admin_users;

-- Check site content sections
SELECT section, updated_at 
FROM site_content 
ORDER BY section;

-- Check services
SELECT title, slug, active, display_order 
FROM services 
ORDER BY display_order;

-- Check pricing packages
SELECT title, slug, price, active, highlighted 
FROM pricing_packages 
ORDER BY display_order;

-- Check blog posts
SELECT title, slug, published, published_at 
FROM blog_posts 
ORDER BY created_at DESC;
```

**Expected Results:**
- 1 admin user
- 4 site content sections (hero, about, footer, contact_info)
- 4 services
- 4 pricing packages
- 1 blog post (welcome article)

---

### Step 3: Test Local Connection (5 minutes)

#### 3.1 Start Development Server

```bash
# Start the dev server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 3.2 Test Public Website

1. Open browser: `http://localhost:5173`
2. Verify homepage loads correctly
3. Check browser console for errors (should be none)
4. Navigate through pages (About, Services, Contact)

**What to verify:**
- [ ] Page loads without errors
- [ ] Images display correctly
- [ ] Navigation works
- [ ] No console errors

#### 3.3 Test Admin Login

1. Navigate to: `http://localhost:5173/admin`
2. You should see the login page
3. Enter credentials:
   ```
   Email: admin@molnartimeanoemi.ro
   Password: admin123
   ```
4. Click "Login"

**Expected behavior:**
- Loading indicator appears
- Password change modal appears (first login)
- Prompt to create new password

#### 3.4 Test Password Change

1. In the password change modal:
   - Old password: `admin123`
   - New password: Choose a strong password (min 8 chars)
   - Confirm password: Same as new password

2. Click "Change Password"

**Expected behavior:**
- Success message appears
- Modal closes
- Admin dashboard loads
- You can see sidebar with navigation

#### 3.5 Test Pricing Manager

1. In admin dashboard, click "Pricing" in sidebar
2. You should see pricing packages
3. Click "Edit Package" on any package
4. Make a small change (e.g., change title)
5. Click "Save Changes"

**Expected behavior:**
- Loading indicator on button
- Success toast notification
- Modal closes
- Changes reflected in package card

#### 3.6 Test Logout

1. Click "Logout" button (top right or sidebar)
2. You should be redirected to homepage

**Expected behavior:**
- Logout confirmation or immediate redirect
- Session cleared
- Cannot access `/admin` without logging in again

---

### Step 4: Build for Production (2 minutes)

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

**Expected Output:**
```
vite v5.x.x building for production...
✓ XXX modules transformed.
dist/index.html                  X.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
✓ built in XXs
```

**Test the preview:**
1. Open preview URL (usually `http://localhost:4173`)
2. Test login flow again
3. Verify everything works

---

### Step 5: Deploy to Hosting Platform

#### Option A: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set environment variables (see below)
```

**Environment Variables in Vercel:**
1. Go to Vercel Project Settings → Environment Variables
2. Add these variables:

```
VITE_SUPABASE_URL=https://sxyjmnmmtdoahzxfwiyh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eWptbm1tdGRvYWh6eGZ3aXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg3MTEsImV4cCI6MjA4NDQ3NDcxMX0.soHn_P9CmRHUmk_NvcMcZ2LtSlJV9MPz8MrviXZwxeQ
```

3. Redeploy for variables to take effect

#### Option B: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --prod

# Follow prompts
```

**Environment Variables in Netlify:**
1. Go to Netlify Site Settings → Environment Variables
2. Add the same variables as above

#### Option C: Custom Server

```bash
# Upload dist/ folder to your server
# Configure nginx/apache to serve static files
# Point domain to your server
```

**Example nginx config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/your-app/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🧪 Post-Deployment Testing

### Test Checklist:

#### Public Site:
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works (About, Services, Contact, Blog)
- [ ] Contact form submits
- [ ] Newsletter signup works
- [ ] Mobile responsive design works
- [ ] No console errors

#### Admin Panel:
- [ ] Can access /admin
- [ ] Login works with new password
- [ ] Dashboard loads with stats
- [ ] Can navigate between sections
- [ ] Pricing editor works
- [ ] Changes save to database
- [ ] Changes persist after logout/login
- [ ] Logout works

#### Database:
- [ ] Data persists between sessions
- [ ] Updates reflect immediately
- [ ] No duplicate entries created
- [ ] Timestamps update correctly

---

## 🔐 Security Checklist

### Must Do:

- [x] `.env` file created with API keys
- [x] `.gitignore` includes `.env`
- [x] Service role key NOT used in client-side code
- [x] Anon key properly configured in client
- [ ] Change admin password from `admin123`
- [ ] Verify `.env` is NOT committed to git
- [ ] Verify production environment variables are set

### Recommended:

- [ ] Enable 2FA on Supabase account
- [ ] Set up row-level security policies (already done in migration)
- [ ] Configure allowed domains in Supabase Auth settings
- [ ] Set up backup schedule in Supabase
- [ ] Monitor Supabase usage and logs
- [ ] Set up alerts for suspicious activity

---

## 🔄 Update Remaining Admin Components

**Status:** 6 components need updates to use `useSupabaseCMS`

### Quick Update Guide:

For each component below, make these changes:

```typescript
// BEFORE:
import { useCMS } from '../../contexts/CMSContext';
const { blogPosts, addBlogPost, updateBlogPost } = useCMS();

// AFTER:
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
const { blogPosts, addBlogPost, updateBlogPost } = useSupabaseCMS();
```

### Components to Update:

#### 1. BlogManager.tsx
```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';

export function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useSupabaseCMS();
  
  // Add async/await to handlers
  const handleSave = async () => {
    try {
      await updateBlogPost(id, data);
      toast.success('Blog post saved!');
    } catch (error) {
      toast.error('Failed to save');
    }
  };
}
```

#### 2. ServiceManager.tsx
```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';

export function ServiceManager() {
  const { services, updateService } = useSupabaseCMS();
  
  // Update to use service.id instead of index
  const handleSave = async () => {
    try {
      await updateService(service.id, data);
      toast.success('Service updated!');
    } catch (error) {
      toast.error('Failed to update');
    }
  };
}
```

#### 3. CampaignManager.tsx
```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';

export function CampaignManager() {
  const { campaigns, createCampaign, updateCampaign, deleteCampaign } = useSupabaseCMS();
  // Add async handlers with error handling
}
```

#### 4. SiteContentManager.tsx
```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';

export function SiteContentManager() {
  const { siteContent, updateSiteContent } = useSupabaseCMS();
  
  // Update signature: updateSiteContent(section, updates)
  const handleSaveHero = async () => {
    try {
      await updateSiteContent('hero', heroData);
      toast.success('Hero section updated!');
    } catch (error) {
      toast.error('Failed to update');
    }
  };
}
```

#### 5. Dashboard.tsx
```typescript
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';

export function Dashboard() {
  const { blogPosts, services, pricingPackages, campaigns } = useSupabaseCMS();
  // Update any stats calculations
}
```

#### 6. ContactMessages.tsx & SubscribersManager.tsx
```typescript
// These may need additional database tables created
// For now, can display placeholder or mock data
```

---

## 📊 Database Management

### Backup Strategy:

**Supabase Dashboard → Database → Backups**
- Automatic daily backups (retained for 7 days on free plan)
- Manual backups before major changes
- Export data to CSV/JSON periodically

### Monitoring:

**Supabase Dashboard → Logs**
```
https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/logs/explorer
```

Monitor for:
- Failed authentication attempts
- Database errors
- Slow queries
- API rate limit warnings

### Useful SQL Queries:

```sql
-- View all admin login attempts (add logging if needed)
SELECT * FROM admin_users ORDER BY updated_at DESC;

-- Count active content
SELECT 
  (SELECT COUNT(*) FROM services WHERE active = true) as active_services,
  (SELECT COUNT(*) FROM pricing_packages WHERE active = true) as active_packages,
  (SELECT COUNT(*) FROM blog_posts WHERE published = true) as published_posts,
  (SELECT COUNT(*) FROM campaigns WHERE active = true) as active_campaigns;

-- Recent updates
SELECT 'service' as type, title, updated_at FROM services
UNION ALL
SELECT 'pricing' as type, title, updated_at FROM pricing_packages
UNION ALL
SELECT 'blog' as type, title, updated_at FROM blog_posts
ORDER BY updated_at DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting

### Problem: "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
npm install @supabase/supabase-js bcryptjs
npm install -D @types/bcryptjs
```

### Problem: "Failed to fetch" when logging in

**Causes & Solutions:**

1. **Database not deployed**
   - Run migrations in Supabase SQL Editor
   - Verify tables exist: `SELECT * FROM admin_users;`

2. **Password not hashed**
   ```sql
   UPDATE admin_users 
   SET password_hash = crypt('admin123', gen_salt('bf', 10))
   WHERE email = 'admin@molnartimeanoemi.ro';
   ```

3. **Wrong API keys**
   - Verify keys in `.env` match Supabase dashboard
   - Restart dev server after changing `.env`

4. **CORS issues**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your domain to allowed URLs

### Problem: "Invalid credentials" error

**Solution:**
```sql
-- Check if user exists
SELECT email, is_first_login FROM admin_users;

-- Reset password
UPDATE admin_users 
SET password_hash = crypt('admin123', gen_salt('bf', 10)),
    is_first_login = true
WHERE email = 'admin@molnartimeanoemi.ro';
```

### Problem: Changes don't persist

**Check:**
1. Console for errors
2. Network tab for failed requests
3. Supabase logs for errors
4. RLS policies are correct (should be from migration)

### Problem: "RLS policy violation"

**Solution:**
```sql
-- Verify RLS is configured
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('services', 'pricing_packages', 'blog_posts');

-- If missing, re-run migration 001
```

---

## 📞 Support Resources

### Supabase Dashboard:
```
Main: https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh
API Settings: https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/settings/api
Database: https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/editor
Logs: https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/logs/explorer
```

### Documentation:
- Supabase Docs: https://supabase.com/docs
- React + Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

### Project Files:
- `IMPLEMENTATION_COMPLETE.md` - Full implementation details
- `SUPABASE_INTEGRATION_GUIDE.md` - Technical guide
- `SUPABASE_IMPLEMENTATION_STATUS.md` - Status tracking

---

## ✅ Deployment Checklist

### Pre-Deployment:
- [x] API keys configured in `.env`
- [x] `.gitignore` created
- [x] Client configured to use environment variables
- [ ] Dependencies installed (`npm install`)
- [ ] Database migrations deployed
- [ ] Admin password hashed
- [ ] Local testing passed

### Deployment:
- [ ] Production build successful (`npm run build`)
- [ ] Environment variables set in hosting platform
- [ ] Application deployed
- [ ] Custom domain configured (if applicable)

### Post-Deployment:
- [ ] Public site accessible
- [ ] Admin login works
- [ ] Database operations work
- [ ] Changes persist
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Changed default password

### Security:
- [ ] `.env` not committed to git
- [ ] Service role key not exposed
- [ ] Admin password changed from default
- [ ] CORS configured correctly
- [ ] RLS policies active

---

## 🎉 Success!

Once all checkboxes are complete, your application is:
- ✅ Fully deployed
- ✅ Connected to Supabase
- ✅ Secure and production-ready
- ✅ Ready for content management

**Next Steps:**
1. Share admin credentials with content managers
2. Train team on admin panel usage
3. Monitor Supabase usage and logs
4. Schedule regular backups
5. Plan future enhancements

---

**Deployment Guide Version:** 1.0  
**Last Updated:** February 3, 2026  
**Status:** Ready for Production 🚀
