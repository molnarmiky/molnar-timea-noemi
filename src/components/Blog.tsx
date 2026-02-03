import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BlogPost } from './BlogPost';
import { Newsletter } from './Newsletter';

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      id: "anxietate-schimbari",
      date: "8 Martie 2024",
      readTime: "5 min citire",
      title: "Cum să gestionezi anxietatea în timpul schimbărilor majore din viață",
      excerpt: "Schimbările sunt inevitabile în viață, dar modul în care le gestionăm poate face diferența între creștere și suferință. Iată strategii practice pentru a naviga prin perioade de tranziție.",
      category: "Anxietate",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["anxietate", "schimbare", "adaptare", "strategii"],
      content: `Schimbările sunt o parte inevitabilă din viață, iar modul în care le abordăm poate face diferența între o experiență de creștere și una de suferință. Fie că vorbim despre o mudanță, o schimbare de carieră, o relație care se termină sau alte tranziții majore, anxietatea care însoțește aceste momente este complet normală.

Primul pas în gestionarea anxietății este să recunoaștem că este o reacție naturală la incertitudine. Creierul nostru este programat să perceapă schimbarea ca pe o potențială amenințare, activând sistemul de "luptă sau fugă". Înțelegerea acestui mecanism ne poate ajuta să fim mai compasivi cu noi înșine.

**Strategii practice pentru gestionarea anxietății în perioada de schimbare:**

1. **Acceptarea incertitudinii**: În loc să luptăm împotriva sentimentului de incertitudine, putem învăța să îl acceptăm ca pe o parte temporară a procesului de tranziție.

2. **Focusarea pe ceea ce putem controla**: Deși nu putem controla toate aspectele unei schimbări, putem identifica și ne putem concentra pe acțiunile concrete pe care le putem întreprinde.

3. **Crearea de rutine noi**: Rutinele oferă un sentiment de stabilitate în mijlocul haosului. Chiar și rutine simple, cum ar fi o cană de ceai dimineața, pot oferi reconfort.

4. **Tehnici de relaxare**: Respirația profundă, meditația și alte tehnici de relaxare pot ajuta la reducerea simptomelor fizice ale anxietății.

5. **Construirea unei rețele de sprijin**: Nu trebuie să trecem prin schimbare singuri. Prietenii, familia sau un terapeut pot oferi sprijin emoțional valoros.

Importante de reținut este că adaptarea la schimbare este un proces, nu un eveniment. Să fim răbdători cu noi înșine în timp ce navigăm prin aceste tranziții și să nu ezităm să cerem ajutor când avem nevoie.`
    },
    {
      id: "granite-relatii",
      date: "1 Martie 2024", 
      readTime: "7 min citire",
      title: "Importanța stabilirii granițelor sănătoase în relații",
      excerpt: "Granițele nu sunt ziduri care ne separă de ceilalți, ci punți care ne permit să ne conectăm într-un mod sănătos. Învață cum să îți protejezi energia emoțională.",
      category: "Relații",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["granițe", "relații", "comunicare", "respect"],
      content: `Granițele în relații sunt ca niște garduri invizibile care definesc unde se termină eu și unde începi tu. Ele nu sunt ziduri menite să ne izoleze, ci mai degrabă punți care ne permit să ne conectăm cu ceilalți într-un mod sănătos și respectuos.

Multe persoane se confruntă cu dificultăți în stabilirea granițelor din cauza unor credințe eronate: "Dacă stabilesc granițe, voi răni pe cineva" sau "Este egoist să îmi pun nevoile pe primul loc". În realitate, granițele sănătoase sunt esențiale pentru bunăstarea noastră și pentru relații durabile.

**Tipuri de granițe:**

1. **Granițe fizice**: Se referă la spațiul personal și la contactul fizic. Avem dreptul să decidem cine ne poate atinge și în ce mod.

2. **Granițe emoționale**: Protejează sentimentele și gândurile noastre. Nu suntem responsabili pentru emoțiile altora și nu trebuie să le permitem să ne afecteze excesiv.

3. **Granițe de timp**: Se referă la modul în care ne organizăm timpul și prioritățile. Este important să spunem "nu" atunci când agenda noastră este plină.

4. **Granițe materiale**: Privesc bunurile noastre și resursele financiare. Avem dreptul să decidem cum și cu cine le împărțim.

**Cum să stabilești granițe sănătoase:**

- **Identifică-ți valorile și nevoile**: Înainte de a putea stabili granițe, trebuie să știi ce este important pentru tine.
- **Comunică clar și direct**: Folosește afirmații în persoana întâi: "Eu am nevoie de..." sau "Eu mă simt...".
- **Fii consecvent**: Granițele trebuie menținute în mod constant pentru a fi eficiente.
- **Pregătește-te pentru rezistență**: Unii oameni pot reacționa negativ la granițele tale, dar aceasta nu înseamnă că greșești.

Să nu uităm că stabilirea granițelor este un act de respect de sine și, în ultimă instanță, îmbunătățește calitatea relațiilor noastre cu ceilalți.`
    },
    {
      id: "mindfulness-digital",
      date: "22 Februarie 2024",
      readTime: "6 min citire", 
      title: "Mindfulness în era digitală: găsirea echilibrului",
      excerpt: "Într-o lume hiperconectată, mindfulness-ul devine mai important ca niciodată. Descoperă tehnici simple pentru a fi prezent în momentul actual.",
      category: "Mindfulness",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["mindfulness", "tehnologie", "prezent", "echilibru"],
      content: `În era digitală în care trăim, suntem constant bombardați cu informații, notificări și stimuli. Smartphones-urile, social media și conectivitatea constantă au devenit parte integrantă din viețile noastre, dar au venit și cu un cost: capacitatea noastră de a fi cu adevărat prezent în moment.

Mindfulness-ul - arta de a fi conștient și prezent în momentul actual - devine din ce în ce mai important într-o lume care ne trage atenția în mii de direcții simultan. Nu este despre renunțarea completă la tehnologie, ci despre găsirea unui echilibru sănătos.

**Provocările ere digitale:**

- **Distragerea constantă**: Notificările întrerup concentrarea și ne împiedică să ne scufundăm profund în activități.
- **FOMO (Fear of Missing Out)**: Frica de a pierde ceva ne menține în stare de alertă constantă.
- **Suprastimularea**: Cantitatea mare de informații poate duce la stres și anxietate.
- **Comparațiile sociale**: Social media ne încurajează să ne comparăm constant cu alții.

**Tehnici de mindfulness pentru era digitală:**

1. **Detox digital programat**: Stabilește perioade zilnice fără dispozitive electronice - măcar 30 de minute dimineața și seara.

2. **Respirația conștientă**: Când simți că ești copleșit de informații, oprește-te și fă 5 respirații profunde și conștiente.

3. **Mâncatul mindful**: În loc să mănânci în timp ce te uiți la ecran, dedică timpul mesei exclusiv acestei activități.

4. **Mersul fără telefon**: Lasă telefonul acasă și fă o plimbare în care să observi cu adevărat mediul înconjurător.

5. **Setarea intențiilor**: Înainte de a deschide o aplicație, întreabă-te: "De ce o fac? Ce caut să obțin?".

6. **Scanarea corpului**: De câteva ori pe zi, oprește-te și observă cum se simte corpul tău, de la vârful capului la vârfurile degetelor.

Mindfulness-ul în era digitală nu înseamnă să ne întoarcem în trecut, ci să folosim tehnologia în mod conștient, ca pe un instrument care să ne servească, nu să ne controleze.`
    },
    {
      id: "perfectionism-toxic",
      date: "15 Februarie 2024",
      readTime: "8 min citire",
      title: "Depășirea perfecționismului: când standardele înalte devin toxice",
      excerpt: "Perfecționismul poate părea o calitate pozitivă, dar adesea ascunde frici profunde și poate duce la burnout. Iată cum să găsești echilibrul.",
      category: "Dezvoltare Personală",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["perfectionism", "burnout", "acceptare", "progres"],
      content: `Perfecționismul poate părea, la prima vedere, o calitate admirabilă. Cine nu ar vrea să facă totul perfect? Totuși, există o diferență substanțială între urmărirea excelenței și perfecționismul toxic care ne poate paraliza și ne poate afecta bunăstarea mentală.

Perfecționismul sănătos ne motivează să dăm tot ce avem mai bun, în timp ce perfecționismul toxic ne ține prizonieri într-un ciclu de nesatisfacție și autocritică constantă. Este important să învățăm să recunoaștem diferența și să dezvoltăm o relație mai sănătoasă cu standardele pe care ni le stabilim.

**Semnele perfecționismului toxic:**

- **Procrănarea**: Amânarea începerii unei activități din frica că nu va ieși perfect.
- **Autocritica excesivă**: Focalizarea pe greșeli mici în detrimentul realizărilor.
- **Gândirea "tot sau nimic"**: Dacă ceva nu este perfect, este considerat un eșec complet.
- **Comparațiile constante**: Măsurarea succesului doar în raport cu alții.
- **Epuizarea**: Munca excesivă pentru a atinge standarde imposibil de atins.

**Cum să ieși din capcana perfecționismului:**

1. **Recunoaște perfecționismul**: Primul pas este să devii conștient de tendințele perfecționiste și de impactul lor asupra ta.

2. **Stabilește standarde realiste**: În loc de "perfect", încearcă "suficient de bun" sau "cel mai bun pe care îl pot da în acest moment".

3. **Celebrează progresul**: Concentrează-te pe îmbunătățirea continuă, nu pe perfecțiunea finală.

4. **Acceptă greșelile ca parte din învățare**: Greșelile sunt oportunități de creștere, nu dovezi ale eșecului.

5. **Practică autocompasiunea**: Vorbește cu tine cum ai vorbi cu un prieten drag în situații similare.

6. **Stabilește termene limită**: Decide dinainte cât timp vei dedica unei activități și respectă această limită.

7. **Caută sprijin**: Nu ezita să discuți cu un terapeut despre tendințele perfecționiste.

Să ne amintim că valoarea noastră ca persoane nu este determinată de realizările noastre perfecte. Suntem ființe umane complexe și imperfecte, și aceasta este partea frumoasă a experienței umane.`
    },
    {
      id: "comunicare-asertiva",
      date: "8 Februarie 2024",
      readTime: "4 min citire",
      title: "Comunicarea asertivă: cum s�� îți exprimi nevoile fără conflict",
      excerpt: "Asertivitatea este abilitatea de a-ți exprima opiniile și nevoile într-un mod respectuos, dar ferm. Este o abilitate care se poate învăța și practica.",
      category: "Comunicare",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["asertivitate", "comunicare", "respect", "granițe"],
      content: `Comunicarea asertivă reprezintă echilibrul perfect între pasivitate și agresivitate. Este abilitatea de a-ți exprima gândurile, sentimentele și nevoile într-un mod direct, onest și respectuos, fără a fi nici prea docil, nici prea agresiv.

Multe persoane se confruntă cu dificultăți în comunicarea asertivă din cauza unor temeri: frica de conflict, frica de respingere sau credința că nevoile altora sunt mai importante decât ale noastre. Totuși, asertivitatea este o abilitate care se poate învăța și practica.

**Caracteristicile comunicării asertive:**

- **Directă și clară**: Mesajul este transmis fără ambiguități
- **Respectuoasă**: Ține cont de sentimentele și drepturile celorlalți
- **Fermă**: Nu cedează sub presiune, dar rămâne deschisă la negociere
- **Onestă**: Se bazează pe sinceritate și autenticitate

**Tehnici de comunicare asertivă:**

1. **Tehnica "EU"**: Folosește afirmații care încep cu "Eu simt/cred/am nevoie" în loc de "Tu faci/ești".

2. **Tehnica sandwich-ului**: Începe cu ceva pozitiv, continuă cu mesajul principal, termină cu ceva constructiv.

3. **Repetarea calmă**: Dacă mesajul tău nu este înțeles, repetă-l calm și constant fără a te escalada.

4. **Acceptarea criticii constructive**: Recunoaște când critica este justificată și folosește-o pentru creștere.

5. **Compromisul**: Fii dispus să negociezi când este posibil, dar nu renunța la nevoile tale esențiale.

**Exemple practice:**

- În loc de: "Nu mă asculți niciodată!" încearcă: "Simt că nu îmi sunt ascultate părerile. Am nevoie să discutăm despre asta."
- În loc de: "Bine, nu contează" (când într-adevăr contează) încearcă: "Pentru mine este important să găsim o soluție care să funcționeze pentru amândoi."

Asertivitatea nu garantează că vei obține întotdeauna ceea ce vrei, dar garantează că îți vei exprima nevoile într-un mod sănătos și respectuos.`
    },
    {
      id: "somn-sanatate-mentala",
      date: "1 Februarie 2024",
      readTime: "6 min citire",
      title: "Rolul somnului în sănătatea mentală",
      excerpt: "Somnul de calitate este fundamental pentru echilibrul emoțional și mental. Explorează conexiunea dintre somn și starea de bine psihică.",
      category: "Sănătate Mentală", 
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop",
      author: "Molnar Timea Noemi",
      tags: ["somn", "sănătate mentală", "echilibru", "odihnă"],
      content: `Somnul nu este doar o pauză pe care o facem de la activitățile zilnice - este un proces activ și vital pentru sănătatea noastră mentală și fizică. În timp ce dormim, creierul nostru "își face curat", procesează informațiile din ziua precedentă și se pregătește pentru ziua următoare.

Conexiunea dintre somn și sănătatea mentală este bidirectională: problemele de somn pot duce la probleme de sănătate mentală, iar problemele de sănătate mentală pot afecta calitatea somnului. Este un ciclu pe care este important să îl întrerupem prin practici sănătoase.

**Impactul somnului asupra sănătății mentale:**

1. **Reglarea emoțiilor**: Somnul ajută la procesarea emoțiilor și la reglarea răspunsurilor emoționale.

2. **Memoria și concentrarea**: Un somn odihnitor îmbunătățește capacitatea de concentrare și consolidarea memoriei.

3. **Rezistența la stres**: Persoanele odihnite gestionează mai bine stresul zilnic.

4. **Luarea deciziilor**: Somnul adecvat îmbunătățește capacitatea de judecată și luarea deciziilor.

**Strategii pentru un somn mai bun:**

1. **Igienă somnului**: Stabilește un program regulat de culcare și trezire, chiar și în weekend.

2. **Ritualul de seară**: Creează o rutină relaxantă înainte de culcare (citit, baie caldă, tehnici de relaxare).

3. **Mediul de somn**: Asigură-te că dormitorul este întuneric, silențios și la o temperatură confortabilă.

4. **Limitarea ecranelor**: Evită ecranele cu cel puțin o oră înainte de culcare din cauza luminii albastre.

5. **Exercițiul fizic**: Activitatea fizică regulată îmbunătățește calitatea somnului, dar nu prea aproape de ora de culcare.

6. **Gestionarea gândurilor**: Dacă mintea ta aleargă la culcare, încearcă tehnici ca jurnalul sau meditația.

**Când să cauți ajutor:**

Dacă probleme persistente de somn afectează viața ta zilnică, este important să consulți un specialist. Tulburările de somn pot fi tratate eficient cu ajutorul profesional.

Să ne amintim că somnul nu este un lux, ci o necesitate pentru sănătatea noastră mentală și fizică.`
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Anxietate": return "bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30";
      case "Relații": return "bg-[#c4b5fd]/20 text-[#c4b5fd] border border-[#c4b5fd]/30";
      case "Mindfulness": return "bg-[#9db098]/20 text-[#9db098] border border-[#9db098]/30";
      case "Dezvoltare Personală": return "bg-[#a594f9]/20 text-[#a594f9] border border-[#a594f9]/30";
      case "Comunicare": return "bg-[#b8e6b8]/20 text-[#b8e6b8] border border-[#b8e6b8]/30";
      case "Sănătate Mentală": return "bg-[#d4a5f9]/20 text-[#d4a5f9] border border-[#d4a5f9]/30";
      default: return "bg-[#b8b4d1]/20 text-[#b8b4d1] border border-[#b8b4d1]/30";
    }
  };

  const handleSelectPost = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  };

  if (selectedPost) {
    return (
      <BlogPost 
        post={selectedPost} 
        onBack={() => setSelectedPost(null)}
        onSelectPost={handleSelectPost}
      />
    );
  }

  return (
    <section id="blog" className="py-16 sm:py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-[#a594f9] font-medium">
            Blog
          </h2>
          <p className="text-[#b8b4d1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Articole și insights despre sănătatea mentală, dezvoltarea personală și bunăstarea emoțională. 
            Informații utile bazate pe cercetarea științifică și experiența practică.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl overflow-hidden hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a594f9]/10">
              <div className="h-48 sm:h-52 bg-[#2d2d50] overflow-hidden">
                <ImageWithFallback 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-[#9db098] text-xs sm:text-sm">{post.readTime}</span>
                </div>

                <h3 
                  className="font-medium text-[#e8e6f7] mb-3 leading-snug hover:text-[#a594f9] transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </h3>

                <p className="text-[#b8b4d1] text-xs sm:text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[#9db098] text-xs sm:text-sm">{post.date}</span>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-[#c4b5fd] hover:text-[#a594f9] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    Citește mai mult 
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-8 py-3 rounded-2xl transition-colors font-medium">
            Vezi toate articolele
          </button>
        </div>

        <Newsletter className="mt-16" />
      </div>
    </section>
  );
}