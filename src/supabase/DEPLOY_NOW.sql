-- ================================================
-- SUPABASE DEPLOYMENT SCRIPT - COMPLETE
-- ================================================
-- Project: Molnár Timea Noemi - Psychology Website CMS
-- Date: February 3, 2026
-- 
-- INSTRUCTIONS:
-- 1. Open Supabase SQL Editor: https://app.supabase.com/project/sxyjmnmmtdoahzxfwiyh/sql/new
-- 2. Copy this ENTIRE file
-- 3. Paste and click "RUN"
-- 4. Wait for success message
-- 5. Verify data with queries at the end
-- ================================================

-- ================================================
-- STEP 1: CREATE SCHEMA
-- ================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_first_login BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Content Table
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section VARCHAR(50) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- Services Table  
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    icon VARCHAR(255),
    color VARCHAR(50),
    features TEXT[],
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing Packages Table
CREATE TABLE IF NOT EXISTS public.pricing_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RON',
    billing_period VARCHAR(50),
    description TEXT,
    features TEXT[],
    display_order INTEGER DEFAULT 0,
    highlighted BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    category VARCHAR(100),
    tags TEXT[],
    author_id UUID REFERENCES admin_users(id),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Leads Table
CREATE TABLE IF NOT EXISTS public.campaign_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- ================================================
-- STEP 2: CREATE TRIGGERS
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to relevant tables
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON site_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pricing_packages_updated_at ON pricing_packages;
CREATE TRIGGER update_pricing_packages_updated_at
    BEFORE UPDATE ON pricing_packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- STEP 3: CREATE INDEXES
-- ================================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_pricing_packages_active ON pricing_packages(active);
CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(active);
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_campaign_leads_campaign_id ON campaign_leads(campaign_id);

-- ================================================
-- STEP 4: SEED INITIAL DATA
-- ================================================

-- Insert default admin user (password will be hashed next)
INSERT INTO admin_users (email, full_name, password_hash, is_first_login)
VALUES (
    'admin@molnartimeanoemi.ro',
    'Molnár Timea Noemi',
    'temp_will_be_hashed',
    true
)
ON CONFLICT (email) DO NOTHING;

-- Get admin user ID for references
DO $$
DECLARE
    admin_id UUID;
BEGIN
    SELECT id INTO admin_id FROM admin_users WHERE email = 'admin@molnartimeanoemi.ro';

    -- Insert site content sections
    INSERT INTO site_content (section, content, updated_by) VALUES
    ('hero', '{
        "title": "Cabinet consiliere și dezvoltare personală",
        "highlight": "Molnár Timea Noemi",
        "subtitle": "Sprijin profesional pentru dezvoltarea personală și bunăstarea emoțională",
        "primaryButtonText": "Vezi serviciile",
        "secondaryButtonText": "Programează-te"
    }'::jsonb, admin_id),
    ('about', '{
        "title": "BUNĂ ȘI BINE AI VENIT!",
        "paragraph1": "Mă numesc Molnár Timea Noemi și sunt psiholog clinician specializat în consiliere individuală, terapia cuplurilor și dezvoltare personală. Cu o experiență de peste 5 ani în domeniu, ajut oamenii să își depășească provocările emoționale și să își atingă potențialul maxim.",
        "paragraph2": "Cred cu tărie că fiecare persoană are resurse interne puternice și capacitatea de a se vindeca și de a crește. Rolul meu este să te ghidez în acest proces, oferindu-ți un spațiu sigur, fără judecată, unde poți explora gândurile, emoțiile și comportamentele tale.",
        "buttonText": "Vezi toate serviciile"
    }'::jsonb, admin_id),
    ('footer', '{
        "title": "BUNĂ, EU SUNT MOLNAR TIMEA NOEMI",
        "subtitle": "Cabinet consiliere și dezvoltare personală",
        "phone": "(+4) 0724-781.466",
        "copyrightText": "© 2026 Molnár Timea Noemi. Toate drepturile rezervate."
    }'::jsonb, admin_id),
    ('contact_info', '{
        "phone": "(+4) 0724-781.466",
        "email": "timeanoemi@gmail.com",
        "address": "Strada Livezii, nr. 100",
        "city": "Sibiu, 550042",
        "workingHours": "Luni - Vineri: 9:00 - 18:00",
        "workingNote": "Programări doar cu agendare prealabilă",
        "facebookUrl": "https://www.facebook.com/profile.php?id=61567837034903",
        "instagramUrl": "https://www.instagram.com/mindresetnlpbytimea/",
        "linkedinUrl": ""
    }'::jsonb, admin_id)
    ON CONFLICT (section) DO NOTHING;

    -- Insert services
    INSERT INTO services (title, slug, description, features, display_order, active) VALUES
    (
        'Consiliere individuală',
        'consiliere-individuala',
        'Consiliere individuală pentru dezvoltarea personală și bunăstarea emoțională. Un spațiu sigur pentru explorarea gândurilor, emoțiilor și comportamentelor.',
        ARRAY['Dezvoltarea încrederii în sine', 'Gestionarea eficientă a stresului și anxietății', 'Îmbunătățirea abilităților de comunicare', 'Clarificarea obiectivelor personale'],
        1,
        true
    ),
    (
        'Consiliere adolescenți',
        'consiliere-adolescenti',
        'Suport specializat pentru adolescenți în procesul complex al dezvoltării identității, gestionării emoțiilor și navigării relațiilor sociale.',
        ARRAY['Dezvoltarea identității și stiei de sine', 'Gestionarea emoțiilor intense', 'Îmbunătățirea relațiilor cu părinții și colegii', 'Sprijin în perioada de tranziție'],
        2,
        true
    ),
    (
        'Consiliere de cuplu',
        'consiliere-cuplu',
        'Consiliere pentru cupluri care doresc să îmbunătățească comunicarea, să rezolve conflicte și să întărească relația lor.',
        ARRAY['Îmbunătățirea comunicării în cuplu', 'Rezolvarea conflictelor constructiv', 'Reconstruirea încrederii', 'Întărirea conexiunii emoționale'],
        3,
        true
    ),
    (
        'Consiliere de grup',
        'consiliere-grup',
        'Sesiuni de grup pentru dezvoltare personală, suport mutual și învățare din experiențele altora într-un mediu sigur și confidențial.',
        ARRAY['Suport și validare din partea grupului', 'Învățare din experiențele altora', 'Dezvoltarea abilităților sociale', 'Cost accesibil comparativ cu terapia individuală'],
        4,
        true
    )
    ON CONFLICT (slug) DO NOTHING;

    -- Insert pricing packages
    INSERT INTO pricing_packages (title, slug, price, billing_period, description, features, display_order, highlighted, active) VALUES
    (
        'Ședință Individuală',
        'sedinta-individuala',
        200.00,
        'per session',
        'Consiliere individuală personalizată pentru nevoile tale',
        ARRAY['50 minute de consiliere', 'Plan personalizat de dezvoltare', 'Suport între ședințe prin email', 'Instrumente și tehnici practice'],
        1,
        false,
        true
    ),
    (
        'Pachet 4 Ședințe',
        'pachet-4-sedinte',
        720.00,
        'monthly',
        'Ideal pentru lucru consistent și rezultate durabile',
        ARRAY['4 ședințe de 50 minute', 'Economie de 10%', 'Prioritate la programare', 'Materiale suplimentare de lucru', 'Check-in săptămânal prin mesaj'],
        2,
        true,
        true
    ),
    (
        'Pachet 8 Ședințe',
        'pachet-8-sedinte',
        1360.00,
        'two months',
        'Pentru transformare profundă și rezultate pe termen lung',
        ARRAY['8 ședințe de 50 minute', 'Economie de 15%', 'Acces prioritar la programare', 'Plan complet de dezvoltare', 'Suport 24/7 în situații de criză', 'Sesiune bonus de follow-up'],
        3,
        false,
        true
    ),
    (
        'Ședință de Cuplu',
        'sedinta-cuplu',
        300.00,
        'per session',
        'Consiliere specializată pentru cupluri',
        ARRAY['60 minute de consiliere', 'Ambii parteneri incluși', 'Exerciții practice pentru acasă', 'Plan de îmbunătățire a relației'],
        4,
        false,
        true
    )
    ON CONFLICT (slug) DO NOTHING;

    -- Insert sample blog post
    INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author_id, published, published_at) VALUES
    (
        'Bine ați venit pe site-ul meu!',
        'bine-ati-venit',
        'Încep această călătorie digitală cu inima deschisă și cu dorința de a crea un spațiu online unde să putem împărtăși, învăța și crește împreună.',
        'Bună și bine ai venit pe site-ul meu!\n\nÎncep această călătorie digitală cu inima deschisă și cu dorința de a crea un spațiu online unde să putem împărtăși, învăța și crește împreună.\n\nAici vei găsi articole despre dezvoltare personală, sănătate mintală, și multe alte subiecte care ne pot ajuta să navigăm mai bine prin provocările vieții moderne.\n\nAștept cu nerăbdare să te cunosc!',
        'Psihologie',
        ARRAY['dezvoltare personală', 'bun venit', 'introducere'],
        admin_id,
        true,
        NOW()
    )
    ON CONFLICT (slug) DO NOTHING;

END $$;

-- ================================================
-- STEP 5: HASH ADMIN PASSWORD
-- ================================================
-- CRITICAL: Run this to hash the default password

UPDATE admin_users 
SET password_hash = crypt('admin123', gen_salt('bf', 10))
WHERE email = 'admin@molnartimeanoemi.ro';

-- ================================================
-- STEP 6: ENABLE ROW LEVEL SECURITY
-- ================================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read published blog posts" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Public can read active services" ON services
    FOR SELECT USING (active = true);

CREATE POLICY "Public can read active pricing" ON pricing_packages
    FOR SELECT USING (active = true);

CREATE POLICY "Public can read active campaigns" ON campaigns
    FOR SELECT USING (active = true);

CREATE POLICY "Public can read site content" ON site_content
    FOR SELECT USING (true);

-- Create policies for public inserts (leads, messages, subscribers)
CREATE POLICY "Public can insert campaign leads" ON campaign_leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- ================================================
-- STEP 7: VERIFICATION QUERIES
-- ================================================

-- Run these to verify everything was created successfully:

-- Check admin user
SELECT id, email, full_name, is_first_login, created_at FROM admin_users;

-- Check site content sections
SELECT section, updated_at FROM site_content ORDER BY section;

-- Check services
SELECT title, slug, active, display_order FROM services ORDER BY display_order;

-- Check pricing packages
SELECT title, slug, price, active, highlighted FROM pricing_packages ORDER BY display_order;

-- Check blog posts
SELECT title, slug, published, published_at FROM blog_posts;

-- Count all records
SELECT 
    (SELECT COUNT(*) FROM admin_users) as admin_users,
    (SELECT COUNT(*) FROM site_content) as site_content,
    (SELECT COUNT(*) FROM services) as services,
    (SELECT COUNT(*) FROM pricing_packages) as pricing_packages,
    (SELECT COUNT(*) FROM blog_posts) as blog_posts;

-- ================================================
-- DEPLOYMENT COMPLETE! ✅
-- ================================================
-- 
-- NEXT STEPS:
-- 1. Verify all queries above show correct data
-- 2. Test login at /admin with:
--    Email: admin@molnartimeanoemi.ro
--    Password: admin123
-- 3. Change password immediately after first login!
-- 4. Start managing your content
--
-- ================================================
