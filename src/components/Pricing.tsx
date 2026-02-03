export function Pricing() {
  const packages = [
    {
      title: "Ședință individuală",
      price: "200",
      duration: "50 minute",
      description: "Consiliere individuală personalizată pentru gestionarea anxietății, depresiei și stresului cotidian",
      features: [
        "Evaluare inițială completă",
        "Plan terapeutic personalizat",
        "Tehnici de coping adaptative",
        "Suport între ședințe",
        "Monitorizarea progresului"
      ],
      popular: false
    },
    {
      title: "Pachet 4 ședințe", 
      price: "720",
      duration: "4 x 50 minute",
      description: "Pachetul cel mai popular pentru progres consistent și rezultate durabile",
      features: [
        "4 ședințe de consiliere",
        "Plan de dezvoltare personală",
        "Tehnici avansate (CBT, Mindfulness)",
        "Suport continuu între ședințe",
        "Materiale și exerciții personalizate",
        "Evaluare finală și recomandări"
      ],
      popular: true
    },
    {
      title: "Consiliere de cuplu",
      price: "300",
      duration: "60 minute",
      description: "Îmbunătățirea comunicării și întărirea legăturii emoționale între parteneri",
      features: [
        "Evaluarea dinamicii relației",
        "Tehnici de comunicare eficientă",
        "Rezolvarea conflictelor",
        "Reconstruirea încrederii",
        "Planuri de acțiune comune"
      ],
      popular: false
    },
    {
      title: "Consiliere adolescenți",
      price: "180",
      duration: "45 minute", 
      description: "Sprijin specializat pentru adolescenți în navigarea schimbărilor emoționale și sociale",
      features: [
        "Abordare adaptată vârstei",
        "Gestionarea anxietății sociale",
        "Dezvoltarea încrederii în sine",
        "Tehnici de comunicare",
        "Suport pentru părinți"
      ],
      popular: false
    }
  ];

  return (
    <section id="prices" className="py-16 sm:py-20 bg-[#242444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-[#a594f9] font-medium">
            Prețuri și Pachete
          </h2>
          <p className="text-[#b8b4d1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Oferă tarife transparente și opțiuni flexibile pentru a face consilierea și dezvoltarea personală 
            accesibilă tuturor celor care au nevoie de sprijin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-[#2d2d50] p-4 sm:p-6 rounded-2xl border-2 hover:shadow-2xl hover:shadow-[#a594f9]/10 transition-all duration-300 relative flex flex-col ${
                pkg.popular ? 'border-[#a594f9]' : 'border-[#a594f9]/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#a594f9] text-[#1a1a2e] px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-medium text-[#e8e6f7] mb-2 text-sm sm:text-base">{pkg.title}</h3>
                <div className="mb-1">
                  <span className="text-2xl sm:text-3xl text-[#a594f9] font-medium">{pkg.price}</span>
                  <span className="text-[#b8b4d1] ml-1">RON</span>
                </div>
                <p className="text-[#9db098] text-xs sm:text-sm">{pkg.duration}</p>
              </div>

              <p className="text-[#b8b4d1] text-xs sm:text-sm mb-6 leading-relaxed">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-6 sm:mb-8 flex-grow">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-[#9db098] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-[#e8e6f7] text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 rounded-xl transition-colors text-sm font-medium mt-auto ${
                  pkg.popular 
                    ? 'bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e]' 
                    : 'border-2 border-[#9db098] text-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e]'
                }`}
              >
                Programează-te
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#b8b4d1] mb-4 text-sm sm:text-base">
            * Prețurile sunt în RON și includ TVA. Pentru situații sociale dificile, sunt disponibile tarife reduse.
          </p>
          <p className="text-sm text-[#9db098]">
            Pentru mai multe informații despre modalitățile de plată sau programări de urgență, 
            vă rog să mă contactați direct.
          </p>
        </div>
      </div>
    </section>
  );
}