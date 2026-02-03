-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  first_login BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date VARCHAR(50) NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL,
  sessions VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  link_text VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  benefits TEXT[] DEFAULT '{}',
  process TEXT[] DEFAULT '{}',
  target TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pricing_packages table
CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing_packages(active);
CREATE INDEX IF NOT EXISTS idx_pricing_order ON pricing_packages(order_index);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);

-- Insert default admin user (password: admin123)
-- Note: In production, use bcrypt with proper salt rounds
INSERT INTO admin_users (email, password_hash, name, role, first_login)
VALUES (
  'admin@molnartimeanoemi.ro',
  '$2a$10$rBV2kU.nVZ5NqNf8X.6Q0.vEd8QGdALXG6wZkF8xPZM9YvPaFqN7e',
  'Molnar Timea Noemi',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;

-- Insert default services
INSERT INTO services (id, title, duration, price, sessions, image, link_text, description, benefits, process, target, active, order_index)
VALUES
  (
    'consiliere-individuala',
    'Consiliere individuală (50 min.)',
    '50 minute',
    '200 RON',
    'Săptămânal',
    'https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwc2Vzc2lvbiUyMGluZGl2aWR1YWwlMjBjb3Vuc2VsaW5nfGVufDF8fHx8MTc1NzgzMjYwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    'AFLĂ MAI MULTE',
    'Consiliere individuală pentru dezvoltarea personală și bunăstarea emoțională. Un spațiu sigur pentru explorarea gândurilor, emoțiilor și comportamentelor într-un mod constructiv și orientat către soluții.',
    ARRAY[
      'Dezvoltarea încrederii în sine și a stiei de sine',
      'Gestionarea eficientă a stresului și anxietății',
      'Îmbunătățirea abilităților de comunicare',
      'Clarificarea obiectivelor personale și profesionale',
      'Dezvoltarea strategiilor de coping sănătoase',
      'Procesarea experiențelor traumatice sau dificile'
    ],
    ARRAY[
      'Evaluare inițială și stabilirea obiectivelor',
      'Identificarea resurselor și punctelor forte',
      'Explorarea temelor și provocărilor actuale',
      'Dezvoltarea strategiilor personalizate',
      'Implementarea și monitorizarea progresului',
      'Consolidarea învățăturilor și planificarea viitorului'
    ],
    'Adulții care doresc să își îmbunătățească calitatea vieții, să gestioneze mai bine stresul, să dezvolte relații mai sănătoase sau să navigheze prin perioade de tranziție și schimbare.',
    true,
    0
  ),
  (
    'consiliere-adolescenti',
    'Consiliere adolescenți (50 min.)',
    '50 minute',
    '180 RON',
    'Săptămânal/Bilunar',
    'figma:asset/724dbc239775302f1ce79f782053cc0b94b2c378.png',
    'AFLĂ MAI MULTE',
    'Sprijin specializat pentru adolescenți în navigarea provocărilor specifice acestei etape de dezvoltare, cu accent pe dezvoltarea identității, gestionarea emoțiilor și construirea relațiilor sănătoase.',
    ARRAY[
      'Dezvoltarea identității personale și a încrederii în sine',
      'Gestionarea anxietății și stresului școlar',
      'Îmbunătățirea abilităților sociale și de comunicare',
      'Suport în luarea deciziilor importante',
      'Dezvoltarea strategiilor de coping pentru presiunea socială',
      'Suport pentru problemele legate de imagine corporală'
    ],
    ARRAY[
      'Crearea unui mediu de încredere și siguranță',
      'Evaluarea nevoilor specifice adolescentului',
      'Explorarea provocărilor și preocupărilor actuale',
      'Dezvoltarea abilităților de gestionare emoțională',
      'Lucrarea cu familia pentru suport optim',
      'Planificarea tranziției către vârsta adultă'
    ],
    'Adolescenți cu vârste între 13-18 ani care se confruntă cu anxietate, probleme de stimă de sine, dificultăți școlare, probleme relaționale sau care au nevoie de suport în dezvoltarea personală.',
    true,
    1
  ),
  (
    'consiliere-cuplu',
    'Consiliere de cuplu (60 min.)',
    '60 minute',
    '250 RON',
    'Săptămânal/Bilunar',
    'https://images.unsplash.com/photo-1698373890183-ae3943362fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3VwbGUlMjB0aGVyYXB5JTIwY291bnNlbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNTc3OTIzODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'AFLĂ MAI MULTE',
    'Sprijin specializat pentru cupluri care doresc să își întărească relația, să îmbunătățească comunicarea și să rezolve conflictele într-un mod constructiv și empatic.',
    ARRAY[
      'Îmbunătățirea comunicării și ascultării active',
      'Rezolvarea constructivă a conflictelor',
      'Întărirea legăturii emoționale și intimității',
      'Dezvoltarea încrederii și transparenței',
      'Gestionarea diferențelor și compromisurilor',
      'Planificarea comună a viitorului'
    ],
    ARRAY[
      'Evaluarea dinamicii relației și identificarea provocărilor',
      'Stabilirea obiectivelor comune pentru terapie',
      'Învățarea tehnicilor de comunicare eficientă',
      'Explorarea nevoilor și așteptărilor fiecărui partner',
      'Dezvoltarea strategiilor de rezolvare a conflictelor',
      'Consolidarea progresului și menținerea rezultatelor'
    ],
    'Cupluri care se confruntă cu probleme de comunicare, conflicte frecvente, infidelitate, diferențe de valori sau care doresc să își îmbunătățească relația în mod preventiv.',
    true,
    2
  ),
  (
    'parenting',
    'Parenting (ședința 50 min.)',
    '50 minute',
    '180 RON',
    'Lunar/Bilunar',
    'https://images.unsplash.com/photo-1725382932565-faf3dcecbdcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnRpbmclMjBjb3Vuc2VsaW5nJTIwZmFtaWx5JTIwdGhlcmFweXxlbnwxfHx8fDE3NTc5MjM4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'AFLĂ MAI MULTE',
    'Suport și îndrumare pentru părinți în dezvoltarea abilităților parentale eficiente, construirea unei relații sănătoase cu copiii și navigarea provocărilor educaționale contemporane.',
    ARRAY[
      'Dezvoltarea strategiilor de disciplină pozitivă',
      'Îmbunătățirea comunicării cu copiii',
      'Gestionarea comportamentelor problematice',
      'Dezvoltarea încrederii în abilitățile parentale',
      'Crearea unui mediu familial armonios',
      'Suport pentru situații speciale (divorț, pierderi)'
    ],
    ARRAY[
      'Evaluarea dinamicii familiale actuale',
      'Identificarea stilurilor parentale și adaptarea lor',
      'Învățarea tehnicilor de comunicare eficientă cu copiii',
      'Dezvoltarea strategiilor de gestionare a comportamentului',
      'Lucrul cu emoțiile și stresul parental',
      'Planificarea și implementarea schimbărilor pozitive'
    ],
    'Părinți care se confruntă cu provocări în educarea copiilor, comportamente dificile, probleme de comunicare în familie sau care doresc să își dezvolte competențele parentale.',
    true,
    3
  )
ON CONFLICT (id) DO NOTHING;

-- Insert default pricing packages
INSERT INTO pricing_packages (title, price, duration, description, features, popular, active, order_index)
VALUES
  (
    'Consultație Inițială',
    '150',
    '60 minute',
    'Prima întâlnire pentru evaluarea situației și stabilirea unui plan de dezvoltare personală.',
    ARRAY[
      'Evaluare completă a situației',
      'Stabilirea obiectivelor de dezvoltare',
      'Plan de dezvoltare personalizat',
      'Recomandări și resurse'
    ],
    false,
    true,
    0
  ),
  (
    'Ședință Individuală',
    '200',
    '50 minute',
    'Sesiuni regulate de consiliere și dezvoltare personală individuală pentru adulți.',
    ARRAY[
      'Consiliere personalizată',
      'Tehnici moderne de dezvoltare',
      'Suport continuu între ședințe',
      'Monitorizarea progresului'
    ],
    true,
    true,
    1
  )
ON CONFLICT DO NOTHING;

-- Insert default blog post
INSERT INTO blog_posts (id, date, read_time, title, excerpt, category, image, author, tags, content, published)
VALUES (
  'anxietate-schimbari',
  '8 Martie 2025',
  '5 min citire',
  'Cum să gestionezi anxietatea în timpul schimbărilor majore din viață',
  'Schimbările sunt inevitabile în viață, dar modul în care le gestionăm poate face diferența între creștere și suferință. Iată strategii practice pentru a naviga prin perioade de tranziție.',
  'Anxietate',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
  'Molnar Timea Noemi',
  ARRAY['anxietate', 'schimbare', 'adaptare', 'strategii'],
  E'Schimbările sunt o parte inevitabilă din viață, iar modul în care le abordăm poate face diferența între o experiență de creștere și una de suferință. Fie că vorbim despre o mudanță, o schimbare de carieră, o relație care se termină sau alte tranziții majore, anxietatea care însoțește aceste momente este complet normală.\n\nPrimul pas în gestionarea anxietății este să recunoaștem că este o reacție naturală la incertitudine. Creierul nostru este programat să perceapă schimbarea ca pe o potențială amenințare, activând sistemul de "luptă sau fugă". Înțelegerea acestui mecanism ne poate ajuta să fim mai compasivi cu noi înșine.\n\nStrategii practice pentru gestionarea anxietății în perioada de schimbare:\n\n1. **Acceptarea incertitudinii**: În loc să luptăm împotriva sentimentului de incertitudine, putem învăța să îl acceptăm ca pe o parte temporară a procesului de tranziție.\n\n2. **Focusarea pe ceea ce putem controla**: Deși nu putem controla toate aspectele unei schimbări, putem identifica și ne putem concentra pe acțiunile concrete pe care le putem întreprinde.\n\n3. **Crearea de rutine noi**: Rutinele oferă un sentiment de stabilitate în mijlocul haosului. Chiar și rutine simple, cum ar fi o cană de ceai dimineața, pot oferi reconfort.\n\n4. **Tehnici de relaxare**: Respirația profundă, meditația și alte tehnici de relaxare pot ajuta la reducerea simptomelor fizice ale anxietății.\n\n5. **Construirea unei rețele de sprijin**: Nu trebuie să trecem prin schimbare singuri. Prietenii, familia sau un terapeut pot oferi sprijin emoțional valoros.\n\nImportante de reținut este că adaptarea la schimbare este un proces, nu un eveniment. Să fim răbdători cu noi înșine în timp ce navigăm prin aceste tranziții și să nu ezităm să cerem ajutor când avem nevoie.',
  true
) ON CONFLICT (id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON pricing_packages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow all for now - in production, add proper authentication)
CREATE POLICY "Allow all for admin_users" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow all for site_content" ON site_content FOR ALL USING (true);
CREATE POLICY "Allow all for blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Allow all for services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all for pricing_packages" ON pricing_packages FOR ALL USING (true);
