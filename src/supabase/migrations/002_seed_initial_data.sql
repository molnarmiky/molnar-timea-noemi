-- Seed initial site content
-- This migration imports the current hardcoded site content into the database

-- Hero Section
INSERT INTO site_content (section, content) VALUES
('hero', '{
  "title": "Hi, I''m Timea",
  "subtitle": "A passionate digital designer crafting beautiful experiences that connect people with brands they love.",
  "primaryButtonText": "View My Work",
  "secondaryButtonText": "Get In Touch",
  "image": "https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzU3ODY4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
}'::jsonb);

-- About Section
INSERT INTO site_content (section, content) VALUES
('about', '{
  "title": "Despre mine",
  "subtitle": "Psiholog clinician cu peste 5 ani de experiență",
  "intro": "Bună! Sunt Molnár Timea Noemi, psiholog clinician specializat în consiliere și dezvoltare personală. Cred că fiecare persoană are resursele necesare pentru a-și depăși provocările, iar rolul meu este să le ofer sprijinul și instrumentele potrivite.",
  "description": "Lucrez cu adulți, copii și adolescenți, oferind consiliere individuală, terapia cuplurilor și sesiuni de grup, întotdeauna cu focus pe nevoile specifice ale fiecărui client.",
  "experience": [
    {
      "period": "2019 - Present",
      "title": "Psiholog Clinician",
      "organization": "Cabinet privat de psihologie"
    },
    {
      "period": "2016 - 2019",
      "title": "Psiholog Școlar",
      "organization": "Colegiul Național Samuel von Brukenthal"
    }
  ],
  "education": [
    {
      "year": "2019",
      "degree": "Master în Psihologie Clinică",
      "institution": "Universitatea \"Lucian Blaga\" Sibiu"
    },
    {
      "year": "2016",
      "degree": "Licență în Psihologie",
      "institution": "Universitatea \"Babeș-Bolyai\" Cluj-Napoca"
    }
  ]
}'::jsonb);

-- Contact Info Section
INSERT INTO site_content (section, content) VALUES
('contact_info', '{
  "phone": "+40 745 123 456",
  "email": "contact@molnartimeanoemi.ro",
  "address": {
    "street": "Strada Livezii, nr. 100",
    "city": "Sibiu",
    "postalCode": "550042",
    "country": "România"
  },
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.123456789!2d24.1234567!3d45.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDQ1JzU1LjYiTiAyNMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro"
}'::jsonb);

-- Footer Section
INSERT INTO site_content (section, content) VALUES
('footer', '{
  "aboutText": "Cabinet consiliere și dezvoltare personală dedicat să te ajute să descoperi puterea interioară și să trăiești o viață autentică.",
  "socialLinks": {
    "facebook": "https://facebook.com/molnartimeanoemi",
    "instagram": "https://instagram.com/molnartimeanoemi",
    "linkedin": "https://linkedin.com/in/molnartimeanoemi"
  },
  "quickLinks": [
    {"label": "Acasă", "href": "/"},
    {"label": "Servicii", "href": "/#services"},
    {"label": "Despre", "href": "/#about"},
    {"label": "Contact", "href": "/#contact"}
  ],
  "legalLinks": [
    {"label": "Politică de confidențialitate", "href": "/privacy-policy"},
    {"label": "Termeni și condiții", "href": "/terms-conditions"},
    {"label": "Politică cookies", "href": "/cookie-policy"}
  ]
}'::jsonb);

-- Insert default services
INSERT INTO services (title, slug, description, full_description, icon, color, features, display_order, active) VALUES
('Consiliere individuală', 'consiliere-individuala', 
 'Sprijin personalizat pentru depășirea provocărilor emoționale și dezvoltarea personală',
 'Sesiunile de consiliere individuală oferă un spațiu sigur și confidențial unde poți explora gândurile, emoțiile și comportamentele tale. Împreună vom identifica sursele de stres și vom dezvolta strategii eficiente de coping.',
 'User',
 '#a594f9',
 '["Anxietate și stres", "Depresie și tulburări de dispoziție", "Traumă și PTSD", "Dezvoltare personală", "Tranziții de viață", "Încredere în sine"]'::jsonb,
 1,
 true),

('Consiliere adolescenți', 'consiliere-adolescenti',
 'Suport specializat pentru adolescenți în navigarea provocărilor specific vârstei',
 'Adolescența este o perioadă plină de schimbări și provocări. Ofer un cadru terapeutic adaptat nevoilor specifice ale adolescenților, bazat pe empatie, respect și înțelegere.',
 'Users',
 '#9db098',
 '["Probleme școlare și performanță", "Relații cu părinții și prietenii", "Anxietate și depresie", "Descoperirea identității", "Bullying și presiune socială", "Tranziția la adult"]'::jsonb,
 2,
 true),

('Terapia cuplurilor', 'terapia-cuplurilor',
 'Îmbunătățirea comunicării și reconstruirea conexiunii în relații',
 'Terapia de cuplu oferă un spațiu sigur unde ambii parteneri pot explora dinamica relației lor, îmbunătăți comunicarea și rezolva conflictele într-un mod constructiv.',
 'Heart',
 '#d4a574',
 '["Probleme de comunicare", "Infidelitate și încredere", "Conflict și managementul furiei", "Intimitate și conexiune", "Tranziții și schimbări majore", "Pregătire pentru căsătorie"]'::jsonb,
 3,
 true),

('Consiliere pentru părinți', 'consiliere-parinti',
 'Ghidare și suport pentru părinți în navigarea provocărilor parentale',
 'Programele de consiliere pentru părinți te ajută să dezvolți abilitățile necesare pentru a crea relații sănătoase cu copiii tăi și să gestionezi provocările parentale cu încredere.',
 'Baby',
 '#c4b5fd',
 '["Managementul comportamentului", "Comunicare eficientă", "Limite și disciplină", "Divorț și familii reconstituite", "Provocări la diferite vârste", "Echilibrul muncă-viață"]'::jsonb,
 4,
 true);

-- Insert default pricing packages
INSERT INTO pricing_packages (title, slug, price, currency, billing_period, description, features, highlighted, display_order, active) VALUES
('Ședință individuală', 'sedinta-individuala',
 200.00,
 'RON',
 'session',
 'Perfect pentru începerea călătoriei de autocunoaștere',
 '["Durată: 50 minute", "Sesiune față în față sau online", "Plan de acțiune personalizat", "Suport între sesiuni prin email"]'::jsonb,
 false,
 1,
 true),

('Pachet 5 ședințe', 'pachet-5-sedinte',
 900.00,
 'RON',
 'package',
 'Cel mai popular pachet pentru progres constant',
 '["5 ședințe de 50 minute", "Flexibilitate în programare", "Plan terapeutic structurat", "Materiale de lucru personalizate", "Suport între sesiuni", "Economie de 10%"]'::jsonb,
 true,
 2,
 true),

('Pachet 10 ședințe', 'pachet-10-sedinte',
 1700.00,
 'RON',
 'package',
 'Pentru transformare profundă și durabilă',
 '["10 ședințe de 50 minute", "Program terapeutic complet", "Exerciții și tehnici personalizate", "Evaluări periodice", "Suport prioritar", "Economie de 15%"]'::jsonb,
 false,
 3,
 true),

('Terapie de cuplu', 'terapie-cuplu',
 300.00,
 'RON',
 'session',
 'Reconstruiți conexiunea și comunicarea în relație',
 '["Durată: 75 minute", "Sesiuni pentru ambii parteneri", "Exerciții pentru acasă", "Tehnici de comunicare", "Plan de acțiune pentru cuplu"]'::jsonb,
 false,
 4,
 true);

-- Insert sample blog post
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  author_id,
  published,
  published_at
) 
SELECT
  'Ghid complet: Cum să gestionezi anxietatea în viața de zi cu zi',
  'ghid-gestionare-anxietate',
  'Anxietatea este o parte normală a vieții, dar când devine copleșitoare, poate afecta semnificativ calitatea vieții tale. Descoperă strategii eficiente de management.',
  '<p>Anxietatea este una dintre cele mai comune probleme de sănătate mintală cu care ne confruntăm astăzi. În acest ghid complet, vei descoperi:</p><h2>Ce este anxietatea?</h2><p>Anxietatea este răspunsul natural al corpului la stres. Este un sentiment de teamă sau îngrijorare despre ceea ce urmează să se întâmple.</p><h2>Simptome comune</h2><ul><li>Nervozitate și agitație</li><li>Creșterea ritmului cardiac</li><li>Respirație rapidă</li><li>Probleme de concentrare</li><li>Dificultăți de somn</li></ul><h2>Tehnici de gestionare</h2><p>Iată câteva strategii eficiente:</p><ol><li><strong>Respirația profundă</strong> - Practică exerciții de respirație pentru a calma sistemul nervos</li><li><strong>Mindfulness și meditație</strong> - Fii prezent în momentul actual</li><li><strong>Exercițiu fizic regulat</strong> - Sport-ul eliberează endorfine care combat stresul</li><li><strong>Somn de calitate</strong> - Asigură-te că dormi 7-9 ore pe noapte</li><li><strong>Alimentație echilibrată</strong> - Evită cofeina și zahărul în exces</li></ol><h2>Când să cauți ajutor profesional</h2><p>Dacă anxietatea interfereră cu viața ta de zi cu zi și tehnicile de auto-ajutorare nu sunt suficiente, este timpul să cauți sprijin profesional. Un psiholog poate:</p><ul><li>Evalua severitatea anxietății tale</li><li>Dezvolta un plan de tratament personalizat</li><li>Învăța tehnici cognitive-comportamentale</li><li>Oferi suport continuu</li></ul><p>Amintește-ți: nu ești singur în această luptă. Cu instrumentele și sprijinul potrivit, poți învăța să gestionezi anxietatea și să trăiești o viață plină și echilibrată.</p>',
  'Sănătate Mintală',
  '["anxietate", "sănătate mintală", "wellness", "auto-ajutorare"]'::jsonb,
  (SELECT id FROM admin_users LIMIT 1),
  true,
  NOW()
);
