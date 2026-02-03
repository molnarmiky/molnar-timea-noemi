import { Newsletter } from './Newsletter';

export function Events() {
  const events = [
    {
      date: "15 Martie 2025",
      time: "18:00 - 20:00",
      title: "Workshop: Gestionarea Anxietății în Viața de Zi cu Zi",
      location: "Centrul de Dezvoltare Personală, Sibiu",
      description: "Un workshop interactiv despre tehnicile practice de gestionare a anxietății și stresului cotidian.",
      price: "120 RON",
      spots: "8 locuri disponibile",
      category: "Workshop"
    },
    {
      date: "22 Martie 2025", 
      time: "19:00 - 20:30",
      title: "Conferință: Comunicarea Eficientă în Cuplu",
      location: "Online (Zoom)",
      description: "O conferință despre îmbunătățirea comunicării în relațiile de cuplu și depășirea blocajelor comunicaționale.",
      price: "Gratuit",
      spots: "50 locuri disponibile",
      category: "Conferință"
    },
    {
      date: "5 Aprilie 2025",
      time: "10:00 - 16:00",
      title: "Retragere de Mindfulness și Relaxare",
      location: "Casa de Retragere, Brașov",
      description: "O zi dedicată practicilor de mindfulness, meditație și tehnici de relaxare profundă.",
      price: "250 RON",
      spots: "12 locuri disponibile", 
      category: "Retragere"
    },
    {
      date: "18 Aprilie 2025",
      time: "18:30 - 20:00",
      title: "Grup de Suport: Depășirea Depresiei",
      location: "Cabinet Molnar Timea Noemi, Sibiu",
      description: "Întâlnire săptămânală a grupului de suport pentru persoanele care se confruntă cu depresia.",
      price: "80 RON/ședință",
      spots: "3 locuri libere",
      category: "Grup de Suport"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Workshop": return "bg-[#c4b5fd]/20 text-[#c4b5fd] border border-[#c4b5fd]/30";
      case "Conferință": return "bg-[#9db098]/20 text-[#9db098] border border-[#9db098]/30";
      case "Retragere": return "bg-[#a594f9]/20 text-[#a594f9] border border-[#a594f9]/30";
      case "Grup de Suport": return "bg-[#b8e6b8]/20 text-[#b8e6b8] border border-[#b8e6b8]/30";
      default: return "bg-[#b8b4d1]/20 text-[#b8b4d1] border border-[#b8b4d1]/30";
    }
  };

  return (
    <section id="events" className="py-16 sm:py-20 bg-[#242444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-[#a594f9] font-medium">
            Evenimente și Workshop-uri
          </h2>
          <p className="text-[#b8b4d1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Participă la evenimentele noastre educaționale și de dezvoltare personală. 
            O oportunitate de a învăța alături de alții și de a-ți dezvolta abilitățile de viață.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-[#2d2d50] border border-[#a594f9]/20 rounded-2xl p-4 sm:p-6 hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a594f9]/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-[#9db098] text-sm">{event.spots}</span>
                  </div>
                  <h3 className="font-medium text-[#e8e6f7] mb-2 text-sm sm:text-base leading-snug">{event.title}</h3>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-[#b8b4d1]">
                  <div className="w-4 h-4 mr-3 flex-shrink-0">📅</div>
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center text-sm text-[#b8b4d1]">
                  <div className="w-4 h-4 mr-3 flex-shrink-0">📍</div>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-[#b8b4d1]">
                  <div className="w-4 h-4 mr-3 flex-shrink-0">💰</div>
                  <span className="font-medium text-[#9db098]">{event.price}</span>
                </div>
              </div>

              <p className="text-[#b8b4d1] text-xs sm:text-sm mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] py-2 px-4 rounded-xl transition-colors text-sm font-medium"
                >
                  Înscrie-te
                </button>
                <button className="border-2 border-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] text-[#9db098] py-2 px-4 rounded-xl transition-colors text-sm font-medium">
                  Detalii
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Newsletter 
            title="Vrei să fii anunțat despre noile evenimente?"
            description="Abonează-te la newsletter-ul nostru pentru a primi informații despre workshop-urile și conferințele viitoare."
          />
        </div>
      </div>
    </section>
  );
}