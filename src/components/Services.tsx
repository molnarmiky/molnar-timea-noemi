export function Services() {
  const services = [
    {
      title: "Consiliere Psihologică Individuală",
      description: "Sesiuni personalizate pentru gestionarea anxietății, depresiei, stresului și altor provocări emoționale.",
      duration: "50 minute",
      price: "200 RON"
    },
    {
      title: "Terapia Cuplurilor",
      description: "Sprijin specializat pentru îmbunătățirea comunicării și rezolvarea conflictelor în relații.",
      duration: "60 minute", 
      price: "300 RON"
    },
    {
      title: "Consiliere pentru Copii și Adolescenți",
      description: "Abordare adaptată vârstei pentru problemele comportamentale, emoționale și de dezvoltare.",
      duration: "45 minute",
      price: "180 RON"
    },
    {
      title: "Grupuri de Suport",
      description: "Sesiuni de grup pentru diverse tematici: anxietate, dezvoltare personală, mindfulness.",
      duration: "90 minute",
      price: "100 RON"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-800">
            Serviciile Mele
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofer o gamă largă de servicii de consiliere psihologică și psihoterapie, 
            adaptate nevoilor individuale ale fiecărui client.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-medium text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durată:</span>
                  <span className="text-gray-800">{service.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preț:</span>
                  <span className="font-medium text-purple-600">{service.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}