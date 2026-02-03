import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServicePage } from './ServicePage';
import adolescentImage from 'figma:asset/724dbc239775302f1ce79f782053cc0b94b2c378.png';

// Servicii hardcodate
const hardcodedServices = [
  {
    id: 'consiliere-individuala',
    title: 'Consiliere individuală',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpdmlkdWFsJTIwdGhlcmFweSUyMHNlc3Npb24lMjBjb3Vuc2VsaW5nfGVufDF8fHx8MTc3MDExMDgzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Consiliere individuală pentru dezvoltarea personală și bunăstarea emoțională. Un spațiu sigur pentru explorarea gândurilor, emoțiilor și comportamentelor într-un mod constructiv și orientat către soluții.',
    benefits: [
      'Dezvoltarea încrederii în sine și a stiei de sine',
      'Gestionarea eficientă a stresului și anxietății',
      'Îmbunătățirea abilităților de comunicare',
      'Clarificarea obiectivelor personale și profesionale',
      'Dezvoltarea strategiilor de coping sănătoase',
      'Procesarea experiențelor traumatice sau dificile'
    ],
    process: [
      'Evaluare inițială și stabilirea obiectivelor',
      'Identificarea resurselor și punctelor forte',
      'Dezvoltarea planului de intervenție personalizat',
      'Implementarea tehnicilor și strategiilor',
      'Monitorizarea progresului și ajustări',
      'Consolidarea rezultatelor și pregătirea pentru finalizare'
    ],
    target: 'Consiliere individuală se adresează adulților care doresc să își îmbunătățească calitatea vieții, să depășească provocări personale sau profesionale, sau să se dezvolte personal.',
    active: true
  },
  {
    id: 'consiliere-adolescenti',
    title: 'Consiliere adolescenți',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: adolescentImage,
    linkText: 'AFLĂ MAI MULTE',
    description: 'Suport specializat pentru adolescenți în procesul complex al dezvoltării identității, gestionării emoțiilor și navigării relațiilor sociale.',
    benefits: [
      'Dezvoltarea identității și stiei de sine',
      'Gestionarea emoțiilor intense specifice adolescenței',
      'Îmbunătățirea relațiilor cu părinții și colegii',
      'Dezvoltarea abilităților de luare a deciziilor',
      'Gestionarea presiunii sociale și a bullying-ului',
      'Sprijin în perioada de tranziție (școală, liceu, facultate)'
    ],
    process: [
      'Stabilirea unei relații de încredere',
      'Evaluarea nevoilor și provocărilor specifice',
      'Dezvoltarea abilităților de comunicare',
      'Lucrul cu emoțiile și comportamentele',
      'Implicarea familiei când este necesar',
      'Consolidarea resurselor personale'
    ],
    target: 'Serviciul se adresează adolescenților între 12-18 ani care se confruntă cu provocări emoționale, sociale sau comportamentale specifice acestei etape de dezvoltare.',
    active: true
  },
  {
    id: 'consiliere-cuplu',
    title: 'Consiliere de cuplu',
    duration: '60 minute',
    price: '300 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1758524944783-0ec215baf777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0aGVyYXB5JTIwY291bnNlbGluZ3xlbnwxfHx8fDE3NzAxMTA4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Consiliere pentru cupluri care doresc să îmbunătățească comunicarea, să rezolve conflicte și să întărească relația lor.',
    benefits: [
      'Îmbunătățirea comunicării în cuplu',
      'Rezolvarea conflictelor într-un mod constructiv',
      'Reconstruirea încrederii și intimității',
      'Clarificarea așteptărilor și nevoilor',
      'Dezvoltarea abilităților de negociere',
      'Întărirea legăturii emoționale'
    ],
    process: [
      'Evaluarea dinamicii relației',
      'Identificarea pattern-urilor disfuncționale',
      'Învățarea tehnicilor de comunicare eficientă',
      'Lucrul cu emoțiile și vulnerabilitatea',
      'Dezvoltarea obiectivelor comune',
      'Consolidarea schimbărilor pozitive'
    ],
    target: 'Consiliere de cuplu se adresează partenerilor care doresc să îmbunătățească relația lor, indiferent de stadiul în care se află.',
    active: true
  },
  {
    id: 'consiliere-parinti',
    title: 'Consiliere părinți',
    duration: '50 minute',
    price: '200 RON',
    sessions: 'Săptămânal',
    image: 'https://images.unsplash.com/photo-1654613698246-b6d44aef0fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjb3Vuc2VsaW5nJTIwZmFtaWx5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NzAxMTA4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    linkText: 'AFLĂ MAI MULTE',
    description: 'Suport pentru părinți în dezvoltarea abilităților parentale și în gestionarea provocărilor legate de creșterea copiilor.',
    benefits: [
      'Dezvoltarea strategiilor educaționale eficiente',
      'Îmbunătățirea comunicării cu copiii',
      'Gestionarea comportamentelor dificile',
      'Stabilirea limitelor sănătoase',
      'Echilibrarea nevoilor personale cu cele parentale',
      'Colaborarea eficientă între părinți'
    ],
    process: [
      'Evaluarea dinamicii familiale',
      'Identificarea provocărilor specifice',
      'Învățarea tehnicilor de disciplină pozitivă',
      'Dezvoltarea abilităților de comunicare',
      'Lucrul cu propriile emoții și declanșatori',
      'Crearea unui plan parental personalizat'
    ],
    target: 'Serviciul se adresează părinților care doresc să își dezvolte abilitățile parentale și să creeze o relație mai armonioasă cu copiii lor.',
    active: true
  }
];

export function ExactServices() {
  const [selectedService, setSelectedService] = useState<any>(null);
  
  // Only show active services
  const services = hardcodedServices?.filter(service => service.active) || [];
  
  // Map service images, replacing figma:asset references with actual imports
  const servicesWithImages = services.map(service => ({
    ...service,
    image: service.id === 'consiliere-adolescenti' ? adolescentImage : service.image
  }));

  // Debug: Log services
  console.log('ExactServices - Total services:', hardcodedServices?.length, 'Active services:', services.length, services);

  if (selectedService) {
    return (
      <ServicePage 
        service={selectedService} 
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#a594f9] mb-4 font-medium">
            SERVICII OFERITE
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#e8e6f7] text-lg">Nu există servicii disponibile momentan.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {servicesWithImages.map((service, index) => (
              <div 
                key={service.id || index} 
                onClick={() => setSelectedService(service)}
                className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl overflow-hidden hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a594f9]/10 cursor-pointer group"
              >
                <div className="h-48 sm:h-52 bg-[#2d2d50] overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-[#e8e6f7] mb-3 leading-snug font-medium text-sm sm:text-base group-hover:text-[#a594f9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#9db098] text-xs sm:text-sm mb-4 leading-relaxed">
                    {index === 0 && "Sprijin personalizat pentru dezvoltarea și bunăstarea individuală"}
                    {index === 1 && "Ghidare specializată pentru adolescenți în dezvoltare"}
                    {index === 2 && "Întărirea comunicării și conexiunii în relațiile de cuplu"}
                    {index === 3 && "Suport pentru părinți și dezvoltarea competențelor parentale"}
                  </p>
                  <div className="text-[#c4b5fd] group-hover:text-[#a594f9] text-xs sm:text-sm font-medium transition-colors uppercase tracking-wide flex items-center gap-2">
                    {service.linkText}
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}