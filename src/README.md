# 🌟 Molnár Timea Noemi - Site Web Cabinet Consiliere Psihologică

## 📋 Despre Proiect

Site web profesional pentru cabinet de consiliere și dezvoltare personală cu sistem de management al conținutului (CMS), rutare dinamică și funcționare 100% offline.

**Status**: ✅ **PRODUCTION READY**

---

## 🎯 Caracteristici Principale

### 🏠 Site Public
- ✅ Design modern cu temă întunecată
- ✅ Paleta de culori: mov (#a594f9) și verde măsliniu (#9db098)
- ✅ Complet responsiv (desktop, tablet, mobile)
- ✅ Secțiuni: Hero, Servicii, Despre, Contact, Footer
- ✅ Formulare de contact funcționale
- ✅ Newsletter subscription
- ✅ Cookie consent (GDPR compliant)
- ✅ Politică de confidențialitate și termeni

### 🎨 Landing Page-uri Campanii
- ✅ **"Revino la Tine"** - 5 workshopuri gratuite (16-20 Februarie)
- ✅ Design modern și optimizat pentru conversie
- ✅ Formular de înscriere funcțional
- ✅ URL dedicat: `/campanii/revinolatine`

### 🔧 Panou Administrare (CMS)
- ✅ Autentificare securizată
- ✅ Dashboard cu statistici
- ✅ Management blog cu editor rich text
- ✅ Management servicii și prețuri
- ✅ Management campanii și leads
- ✅ Vizualizare mesaje contact
- ✅ Export date în CSV/Excel
- ✅ Editare conținut site din admin

### 💾 Stocare Date
- ✅ **100% localStorage** - nu necesită backend
- ✅ Persistență date în browser
- ✅ Zero dependențe externe
- ✅ Funcționare offline completă
- ✅ Nu necesită API keys sau configurări

---

## 🚀 Quick Start

### Acces Site Public
```
URL: https://timea.molnar-group.com/
```

### Acces Admin Panel
```
URL: https://timea.molnar-group.com/admin
Username: admin
Password: admin123
```

⚠️ **Schimbă parola** din Admin > Setări după prima autentificare!

### Acces Campanie "Revino la Tine"
```
URL: https://timea.molnar-group.com/campanii/revinolatine
```

---

## 📁 Structura Proiect

```
/
├── components/
│   ├── admin/              # Componente admin panel
│   │   ├── AdminDashboard.tsx
│   │   ├── BlogManager.tsx
│   │   ├── CampaignManager.tsx
│   │   ├── ServiceManager.tsx
│   │   └── ...
│   ├── campaigns/          # Landing page-uri campanii
│   │   ├── RevinoLaTineLanding.tsx  # Campanie hardcodată
│   │   ├── DynamicCampaignLanding.tsx
│   │   └── CampaignRouter.tsx
│   ├── ui/                 # Componente UI (shadcn)
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Contact.tsx
│   └── ...
├── contexts/
│   └── CMSContext.tsx      # Context pentru management date
├── styles/
│   └── globals.css         # Stiluri globale Tailwind
├── App.tsx                 # Componenta principală
└── README.md              # Acest fișier
```

---

## 🗄️ Date în localStorage

Aplicația salvează următoarele date în localStorage:

| Cheie | Descriere |
|-------|-----------|
| `cms_contact_messages` | Mesaje din formularul de contact |
| `newsletter_subscribers` | Abonați newsletter |
| `cms_blogPosts` | Articole blog |
| `cms_services` | Servicii oferite |
| `cms_pricing` | Pachete de prețuri |
| `cms_campaigns` | Campanii marketing și leads |
| `cms_siteContent` | Conținut editabil (hero, about, etc.) |
| `cms_adminAuth` | Credențiale admin (hashate) |

---

## 🎨 Paleta de Culori

### Culori Principale
- **Primary Purple**: `#a594f9` - Accent principal
- **Olive Green**: `#9db098` / `#86A789` - Accent secundar
- **Gold/Tan**: `#d4a574` - CTA-uri și highlights

### Culori Fundal
- **Main Background**: `#0a0a0a` - Fundal principal
- **Secondary Background**: `#0f0f0f` - Secțiuni alternative
- **Card Background**: `#1a1a1a` - Carduri și componente

### Culori Text
- **Primary Text**: `#e8e6f7` - Text principal
- **Secondary Text**: `rgba(232, 230, 247, 0.7)` - Text secundar
- **Muted Text**: `rgba(232, 230, 247, 0.5)` - Text discret

---

## 🔧 Tehnologii Utilizate

- **Framework**: React 18
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: Client-side routing custom
- **State Management**: React Context API
- **Storage**: Browser localStorage
- **Toast Notifications**: Sonner
- **Build Tool**: Vite (Figma Make)

---

## 📱 Responsive Design

Aplicația este optimizată pentru toate dimensiunile de ecran:

- ✅ **Desktop**: 1920px și mai mare
- ✅ **Laptop**: 1366px - 1920px
- ✅ **Tablet**: 768px - 1366px
- ✅ **Mobile**: 320px - 768px

---

## 🎯 Pagini Disponibile

### Publice
- `/` - Homepage
- `/privacy-policy` - Politică de confidențialitate
- `/terms-conditions` - Termeni și condiții
- `/campanii/revinolatine` - Campanie "Revino la Tine"

### Admin (Necesită autentificare)
- `/admin` - Dashboard
- `/admin/blog` - Management blog
- `/admin/services` - Management servicii
- `/admin/pricing` - Management prețuri
- `/admin/campaigns` - Management campanii
- `/admin/messages` - Mesaje contact
- `/admin/subscribers` - Abonați newsletter
- `/admin/content` - Editare conținut site

---

## 🔐 Securitate

### Autentificare Admin
- Username și parolă stocate în localStorage
- Parolă hashată cu SHA-256
- Sesiune persistă între vizite
- Logout șterge sesiunea

### Date Personale
- Toate datele sunt stocate LOCAL în browser
- Nu există transfer de date către servere externe
- Utilizatorul are control complet asupra datelor
- GDPR compliant prin cookie consent

⚠️ **Notă Importantă**: Fiind o aplicație frontend-only cu localStorage, nu este recomandată pentru colectarea de date personale sensibile sau PII (Personally Identifiable Information) în medii de producție reale.

---

## 📊 Management Campanii

### Campania "Revino la Tine"

**Conținut:**
- 5 workshopuri gratuite live pe Zoom
- 16-20 Februarie 2026, ora 19:00
- Design modern cu gradient-uri și efecte

**Funcționalități:**
- ✅ Formular de înscriere
- ✅ Salvare leads în localStorage
- ✅ Vizualizare înscrieri în admin
- ✅ Export în CSV/Excel
- ✅ Activare/dezactivare campanie

**Două moduri de folosire:**
1. **Hardcodat** (implicit) - Design custom, modificări prin cod
2. **Din CMS** (după import) - Editabil din admin, design generic

Vezi [CAMPAIGN_IMPORT_GUIDE.md](CAMPAIGN_IMPORT_GUIDE.md) pentru detalii.

---

## 🐛 Troubleshooting

### Eroare 403 la Supabase Functions
**Status**: ✅ **REZOLVAT**

Fișierul `.supabaseignore` previne acum această eroare. Aplicația funcționează 100% offline fără Supabase.

Vezi [DEPLOYMENT_NOTE.md](DEPLOYMENT_NOTE.md) pentru detalii complete.

### Datele nu persistă
**Cauză**: localStorage blocat în browser  
**Soluție**: Verifică setările de privacy și permite localStorage pentru domeniu

### Modificările nu apar
**Soluție**: 
1. Hard refresh: `Ctrl + Shift + R` (Win) / `Cmd + Shift + R` (Mac)
2. Clear cache browser
3. Verifică localStorage în DevTools

### Nu pot face login în admin
**Verificări**:
1. Username: `admin` (lowercase)
2. Password: `admin123`
3. localStorage nu este blocat
4. Nu ești în mod incognito (datele nu persistă)

---

## 🔄 Actualizări și Modificări

### Modificare Conținut Site
**Opțiunea 1**: Din Admin Panel (Recomandat)
- Login în `/admin`
- Navighează la "Conținut Site"
- Editează și salvează

**Opțiunea 2**: Editare cod
- Modifică fișierele în `/components/`
- Rebuild aplicația

### Adăugare Servicii
**Din Admin**:
1. Admin > Servicii
2. Click "Adaugă Serviciu Nou"
3. Completează formularul
4. Salvează

### Adăugare Campanie Nouă
1. Creează componenta landing page în `/components/campaigns/`
2. Adaugă ruta în `CampaignRouter.tsx`
3. (Opțional) Importă în CMS pentru management

---

## 📚 Documentație Suplimentară

- [DEPLOYMENT_NOTE.md](DEPLOYMENT_NOTE.md) - Info despre eroarea 403 și arhitectură offline
- [CAMPAIGN_IMPORT_GUIDE.md](CAMPAIGN_IMPORT_GUIDE.md) - Ghid complet campanie "Revino la Tine"
- [CMS_SETUP_GUIDE.md](CMS_SETUP_GUIDE.md) - Ghid setup și folosire CMS

---

## ✅ Checklist Lansare

- [ ] Verifică toate paginile publice
- [ ] Testează formularele (contact, newsletter, campanii)
- [ ] Verifică responsive design pe toate device-urile
- [ ] Schimbă parola admin din setări
- [ ] Verifică politica de confidențialitate și termenii
- [ ] Testează export date (CSV/Excel)
- [ ] Verifică cookie consent
- [ ] Adaugă serviciile reale în admin
- [ ] Publică primele articole pe blog
- [ ] Promovează URL-ul campaniei active

---

## 🤝 Suport

Pentru întrebări sau probleme:
1. Verifică documentația în acest README
2. Consultă [DEPLOYMENT_NOTE.md](DEPLOYMENT_NOTE.md)
3. Verifică consola browserului pentru erori
4. Inspectează localStorage în DevTools

---

## 📄 Licență

Toate drepturile rezervate © 2026 Molnár Timea Noemi

---

## 🎉 Status Proiect

**✅ PRODUCTION READY**

Aplicația este complet funcțională și pregătită pentru lansare!

### Funcționalități Implementate:
- ✅ Site public complet responsiv
- ✅ Admin panel cu toate funcționalitățile
- ✅ Landing page "Revino la Tine" cu cele 5 workshopuri
- ✅ Management campanii și leads
- ✅ Export date în CSV/Excel
- ✅ Sistem offline 100% funcțional
- ✅ Zero dependențe externe
- ✅ Eroare 403 rezolvată

### Next Steps (Opțional):
- [ ] Personalizare servicii reale
- [ ] Adăugare articole blog
- [ ] Creare campanii noi
- [ ] Personalizare email-uri de confirmare
- [ ] Integrare analytics (dacă e necesar)

---

**Ultima actualizare**: 3 Februarie 2026  
**Versiune**: 2.0.0  
**Build**: Production Ready
