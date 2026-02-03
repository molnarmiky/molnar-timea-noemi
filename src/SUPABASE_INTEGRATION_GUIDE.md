# 🚀 Supabase Integration Guide - Complete Refactoring

## 📋 Overview

This guide documents the complete refactoring of the admin panel with real Supabase authentication and database integration while **keeping the main site display unchanged**.

## ✅ What Has Been Created

### 1. Database Schema (`/supabase/migrations/001_initial_schema.sql`)

**Tables Created:**
- ✅ `admin_users` - Admin authentication with password change tracking
- ✅ `site_content` - Editable site content (hero, about, footer, contact_info)
- ✅ `services` - Services with features, icons, colors
- ✅ `pricing_packages` - Pricing packages with features
- ✅ `blog_posts` - Blog articles with rich content
- ✅ `campaigns` - Marketing campaigns
- ✅ `campaign_leads` - Campaign registrations
- ✅ `contact_messages` - Contact form submissions
- ✅ `newsletter_subscribers` - Newsletter subscriptions

**Features:**
- ✅ UUID primary keys
- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access for active content
- ✅ Indexes for performance
- ✅ Triggers for auto-updating timestamps

### 2. Seed Data (`/supabase/migrations/002_seed_initial_data.sql`)

**Pre-populated Content:**
- ✅ Hero section (title, subtitle, image, CTA buttons)
- ✅ About section (bio, experience, education)
- ✅ Contact info (phone, email, address, map)
- ✅ Footer (about text, social links, legal links)
- ✅ 4 Default services (consiliere individuală, adolescenți, cuplu, părinți)
- ✅ 4 Pricing packages (single session, 5 sessions, 10 sessions, couple therapy)
- ✅ 1 Sample blog post about anxiety management

**Default Admin User:**
- Email: `admin@molnartimeanoemi.ro`
- Password: `admin123`
- First login flag: `true`

### 3. Supabase Client (`/utils/supabase/client.ts`)

**Configuration:**
- ✅ Project ID: `sxyjmnmmtdoahzxfwiyh`
- ✅ URL: `https://sxyjmnmmtdoahzxfwiyh.supabase.co`
- ✅ Environment variable support
- ✅ TypeScript interfaces for all tables
- ✅ Session persistence in localStorage

### 4. Authentication System (`/utils/supabase/auth.ts`)

**Features:**
- ✅ Secure login with bcrypt password hashing
- ✅ Session management (24-hour expiry)
- ✅ Password change functionality
- ✅ First login detection
- ✅ Logout functionality
- ✅ Authentication state checking

**Security:**
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ Session tokens in localStorage
- ✅ Auto-logout after 24 hours
- ✅ Password validation (min 8 chars, uppercase, lowercase, numbers)

### 5. Database Operations (`/utils/supabase/database.ts`)

**Complete CRUD Operations for:**
- ✅ Site Content (get, update, create)
- ✅ Services (get all, get active, create, update, delete)
- ✅ Pricing (get all, get active, create, update, delete)
- ✅ Blog Posts (get all, get published, create, update, delete)
- ✅ Campaigns (get all, get by slug, create, update, delete)
- ✅ Campaign Leads (get by campaign, create)
- ✅ Contact Messages (get all, create, mark as read)
- ✅ Newsletter (get all, create, unsubscribe)

### 6. Admin UI Components

**Created:**
- ✅ `/components/admin/AdminLogin.tsx` - Secure login page
- ✅ `/components/admin/ChangePasswordModal.tsx` - Password change modal

**Features:**
- ✅ Modern dark theme matching site design
- ✅ Loading states and error handling
- ✅ Password strength indicator
- ✅ Required password change on first login
- ✅ Responsive design
- ✅ Toast notifications

### 7. Configuration Files

**Created:**
- ✅ `/supabase/config.toml` - Supabase project configuration
- ✅ `/.env` - Environment variables with API keys
- ✅ Updated `.supabaseignore` (removed old ignore rules)

---

## 🔧 Next Steps Required

### Step 1: Install Dependencies

You need to add these packages to your project:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6"
  }
}
```

### Step 2: Deploy Database Migrations

Run these commands to set up your Supabase database:

```bash
# Make sure you're in the project directory
cd /path/to/your/project

# Deploy migrations to Supabase
supabase db push

# Or if using Supabase CLI
supabase migration up
```

### Step 3: Get the Correct Anon Key

The anon key in the code is a placeholder. Get your real key:

1. Go to https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/settings/api
2. Copy the `anon` `public` key
3. Update in `/.env`:

```env
VITE_SUPABASE_ANON_KEY=your_real_anon_key_here
```

4. Update in `/utils/supabase/client.ts` if needed

### Step 4: Hash the Default Password

The default admin password needs to be hashed. You have two options:

**Option A: Run a script to generate hash**
```javascript
// create-admin-hash.js
const bcrypt = require('bcryptjs');
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);
console.log('Password hash:', hash);
```

Run: `node create-admin-hash.js`

**Option B: Use Supabase SQL Editor**
```sql
-- Run this in Supabase SQL Editor after migration
UPDATE admin_users 
SET password_hash = crypt('admin123', gen_salt('bf', 10))
WHERE email = 'admin@molnartimeanoemi.ro';
```

### Step 5: Update CMSContext

The existing `/contexts/CMSContext.tsx` needs to be refactored to use Supabase instead of localStorage. This is a major change that will:

1. Replace all localStorage calls with Supabase database operations
2. Add real-time data synchronization
3. Handle loading states and errors
4. Maintain backward compatibility

**I can create this for you in the next message** - it's a large file that needs careful refactoring.

### Step 6: Update Admin Dashboard

The admin dashboard components need to be updated to:

1. Use the new authentication system
2. Show the login page when not authenticated
3. Show password change modal on first login
4. Integrate with Supabase data instead of localStorage

### Step 7: Create Site Content Editors

New admin components needed for editing:

- ✅ Hero Section Editor
- ✅ About Section Editor
- ✅ Footer Editor
- ✅ Contact Info Editor

These will allow editing all site content from the admin panel while **keeping the display exactly the same**.

---

## 🎯 Design Philosophy

### Main Site Display: UNCHANGED

**Important:** The public-facing site will look **exactly the same** as it does now. Only the data source changes from hardcoded to database.

**Before (Hardcoded):**
```tsx
<h1>Hi, I'm Timea</h1>
```

**After (Database):**
```tsx
<h1>{siteContent.hero.title}</h1>
```

Same visual output, but now editable from admin panel!

### Data Flow

```
User visits site
    ↓
Components fetch from Supabase
    ↓
Display content (same design)
```

```
Admin edits content
    ↓
Save to Supabase
    ↓
Public site updates automatically
```

---

## 🔐 Security Features

### Authentication
- ✅ Bcrypt password hashing (industry standard)
- ✅ Session expiry (24 hours)
- ✅ Forced password change on first login
- ✅ Password strength requirements

### Database
- ✅ Row Level Security (RLS) enabled
- ✅ Public can only read active content
- ✅ Public can insert contact/leads
- ✅ Only authenticated users can update/delete

### API Keys
- ✅ Anon key for client-side (safe to expose)
- ✅ Service role key kept secret (server-side only)
- ✅ Environment variables for configuration

---

## 📊 Database Schema Visual

```
admin_users
├── id (UUID)
├── email (TEXT)
├── password_hash (TEXT)
├── full_name (TEXT)
├── is_first_login (BOOLEAN)
└── timestamps

site_content
├── id (UUID)
├── section (TEXT) - 'hero', 'about', 'footer', 'contact_info'
├── content (JSONB)
├── updated_by (UUID → admin_users)
└── updated_at

services
├── id (UUID)
├── title, slug, description
├── icon, color, features (JSONB)
├── display_order, active
└── timestamps

pricing_packages
├── id (UUID)
├── title, slug, price, currency
├── features (JSONB)
├── highlighted, display_order, active
└── timestamps

blog_posts
├── id (UUID)
├── title, slug, content
├── featured_image, category, tags (JSONB)
├── published, published_at
└── timestamps

campaigns
├── id (UUID)
├── title, slug, content (JSONB)
├── active, start_date, end_date
└── timestamps

campaign_leads
├── id (UUID)
├── campaign_id (UUID → campaigns)
├── name, email, phone, message
└── created_at

contact_messages
├── id (UUID)
├── name, email, phone, subject, message
├── read, replied
└── created_at

newsletter_subscribers
├── id (UUID)
├── email, name
├── active, subscribed_at
```

---

## 🚨 Important Notes

### 1. Backward Compatibility
The system is designed to gracefully handle:
- Missing database connections (fallback to localStorage)
- Network errors (show user-friendly messages)
- Invalid data (validation before saving)

### 2. Performance
- Database queries are optimized with indexes
- Only active content is queried for public display
- Admin panel can query all data (including inactive)

### 3. Data Migration
Current localStorage data can be migrated to Supabase:
- Export from localStorage
- Transform to match database schema
- Import via Supabase client

### 4. Testing Checklist
Before going live:
- [ ] Test login with default credentials
- [ ] Test password change on first login
- [ ] Test creating/editing services
- [ ] Test creating/editing pricing
- [ ] Test creating/editing blog posts
- [ ] Test campaign management
- [ ] Test contact form submission
- [ ] Test newsletter subscription
- [ ] Test data persistence after logout/login
- [ ] Test responsive design on all devices

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue: "Failed to fetch" error**
- Check Supabase project is running
- Verify API keys are correct
- Check network connection

**Issue: "Invalid credentials"**
- Ensure password was hashed correctly in database
- Verify email is exactly `admin@molnartimeanoemi.ro`
- Check bcryptjs is installed

**Issue: "RLS policy violation"**
- Verify RLS policies are created
- Check user permissions
- Ensure policies match your use case

### Debugging

Enable debug mode by adding to console:
```javascript
localStorage.setItem('debug', 'supabase:*');
```

Check Supabase logs in dashboard:
https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/logs/explorer

---

## ✅ Status

**Current Status:** 🟡 **IN PROGRESS**

**Completed:**
- ✅ Database schema designed
- ✅ Seed data created
- ✅ Supabase client configured
- ✅ Authentication system built
- ✅ Database operations layer created
- ✅ Admin login UI created
- ✅ Password change UI created
- ✅ Documentation written

**Remaining:**
- ⏳ Install npm dependencies
- ⏳ Deploy database migrations
- ⏳ Get real anon key
- ⏳ Hash default password
- ⏳ Refactor CMSContext for Supabase
- ⏳ Update admin dashboard components
- ⏳ Create site content editors
- ⏳ Test all functionality
- ⏳ Deploy to production

---

## 🎉 Next Message

In the next message, I will create:

1. **Refactored CMSContext** - Complete Supabase integration
2. **Updated AdminDashboard** - With login/logout flow
3. **Site Content Editors** - For Hero, About, Footer, Contact
4. **Component Updates** - To use database instead of hardcoded content

**Ready to continue? Let me know and I'll proceed with the next phase!**

---

**Last Updated:** February 3, 2026  
**Version:** 1.0.0  
**Status:** Phase 1 Complete, Ready for Phase 2