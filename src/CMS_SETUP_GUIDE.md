# CMS Admin Panel - Setup Guide

## Overview
This is a complete Content Management System (CMS) for the Molnar Timea Noemi Psychology website, with secure authentication, password management, and full content editing capabilities.

## Features

### ✅ Authentication & Security
- ✅ Secure login with Supabase authentication
- ✅ Password hashing with bcrypt
- ✅ Mandatory password change on first login
- ✅ Password change functionality for authenticated users

### ✅ Content Management
- ✅ **Hero Section Editor** - Edit main banner content
- ✅ **About Section Editor** - Manage about me content and credentials
- ✅ **Services Editor** - Full CRUD for all services (prices, descriptions, benefits, process, etc.)
- ✅ **Pricing & Packages Editor** - Manage pricing packages with features
- ✅ **Blog Editor** - Complete blog management with rich text editor
- ✅ **Contact Info Editor** - Update contact details and social media

### ✅ Dashboard
- Real-time statistics
- Recent blog posts overview
- Quick actions
- Content status monitoring

## Setup Instructions

### 1. Supabase Setup

#### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

#### Step 2: Run Database Migration
1. In your Supabase project dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the entire contents of `/supabase/migrations/001_initial_schema.sql`
4. Paste and run the query
5. This will create all tables, indexes, and default data

#### Step 3: Add Environment Variables
Create or update your `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Install Dependencies

The system uses the following packages (already included):
- `@supabase/supabase-js` - Supabase client
- `bcryptjs` - Password hashing
- `lucide-react` - Icons
- `motion/react` - Animations

### 3. Default Login Credentials

After running the migration, you can log in with:

**Email:** `admin@molnartimeanoemi.ro`  
**Password:** `admin123`

⚠️ **IMPORTANT:** You will be required to change this password on first login!

### 4. Access the Admin Panel

Navigate to `/admin` in your application to access the CMS panel.

## Using the CMS

### Dashboard
- View statistics about your content
- See recent blog posts
- Quick access to common actions

### Hero Section Editor
Edit the main hero section:
- Title
- Subtitle
- CTA button text
- Hero image

### About Section Editor
Manage your about section:
- Title
- Description paragraphs
- Professional credentials
- Profile image

### Services Editor
Full control over all services:
- Service title, duration, price
- Service description
- Benefits list
- Process steps
- Target audience
- Service image
- Active/inactive status
- Display order

### Pricing & Packages Editor
Manage pricing packages:
- Package title and price
- Duration information
- Description
- Feature list
- Popular badge toggle
- Active/inactive status
- Create new packages
- Delete packages

### Blog Editor
Complete blog management:
- Create new blog posts
- Edit existing posts
- Rich text editor for content
- Add tags and categories
- Set featured images
- Publish/unpublish posts
- Delete posts
- Preview before publishing

### Contact Info Editor
Update contact information:
- Email address
- Phone number
- Physical address
- Social media links (Facebook, Instagram, LinkedIn)

## Database Schema

### Tables

#### `admin_users`
- Stores admin user credentials
- Password hashing with bcrypt
- Role-based access (admin/editor)
- First login tracking

#### `site_content`
- Stores general site content (hero, about, contact)
- JSONB format for flexible content structure
- Tracks who updated the content

#### `blog_posts`
- Blog articles with full content
- Published/draft status
- Categories and tags
- Rich text content

#### `services`
- All service offerings
- Detailed information including benefits and process
- Active/inactive status
- Ordering support

#### `pricing_packages`
- Pricing package information
- Feature lists
- Popular highlighting
- Active/inactive status

## Security Considerations

### Password Security
- Passwords are hashed using bcrypt with salt rounds
- Never stored in plain text
- First login requires password change

### Row Level Security (RLS)
- Enabled on all tables
- Policies configured for access control
- Production deployment should refine policies based on authentication

### Environment Variables
- Never commit `.env` files
- Use environment-specific configurations
- Keep Supabase keys secure

## Troubleshooting

### "Login Failed" Error
- Check that the database migration ran successfully
- Verify your environment variables are correct
- Ensure Supabase project is active

### Content Not Saving
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies in Supabase dashboard

### Images Not Displaying
- For Figma assets, use `figma:asset/hash.png` format
- For external images, use full URLs
- Use Unsplash for stock images

## Development vs Production

### Development
- Use test credentials
- Enable detailed error logging
- Use Supabase development environment

### Production
- Change default admin password immediately
- Review and tighten RLS policies
- Enable Supabase production mode
- Add proper error handling
- Implement rate limiting
- Add backup strategies

## Future Enhancements

Potential additions:
- Multi-user support with different roles
- Content versioning and history
- Image upload functionality
- SEO metadata editor
- Analytics integration
- Email template editor
- Newsletter management
- Comment moderation

## Support

For issues or questions:
1. Check this guide first
2. Review Supabase documentation
3. Check browser console for errors
4. Verify database schema matches migration

## License

© 2025 Molnar Timea Noemi. All rights reserved.
