export function About() {
  const specializations = [
    "Anxietate și panică",
    "Depresie și tristețe",
    "Dezvoltare personală",
    "Probleme de relație",
    "Stres și burnout",
    "Terapia cuplurilor"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-gray-800">
                Despre Mine
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sunt psiholog clinician și psihoterapeut cu peste 8 ani de experiență 
                  în sprijinirea persoanelor care doresc să își îmbunătățească calitatea vieții 
                  și să depășească provocările emoționale.
                </p>
                <p>
                  Abordarea mea este empatică și personalizată, bazată pe încredere și respect mutual. 
                  Cred că fiecare persoană are resursele necesare pentru a-și depăși dificultățile, 
                  iar rolul meu este să le ofer sprijinul și instrumentele potrivite.
                </p>
                <p>
                  Lucrez cu adulți, copii și adolescenți, oferind consiliere individuală, 
                  terapia cuplurilor și sesiuni de grup, întotdeauna cu focus pe nevoile 
                  specifice ale fiecărui client.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl mb-6 text-gray-800">Specializări</h3>
              <div className="grid grid-cols-1 gap-4">
                {specializations.map((specialization, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <span className="text-gray-700">{specialization}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-4 text-gray-800">Pregătire Profesională</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-purple-500 pl-6">
                  <div className="text-sm text-gray-500">2019 - Present</div>
                  <h4 className="font-medium text-gray-800">Psiholog Clinician</h4>
                  <p className="text-sm text-gray-600">Cabinet privat de psihologie</p>
                </div>
                <div className="border-l-2 border-gray-300 pl-6">
                  <div className="text-sm text-gray-500">2016 - 2019</div>
                  <h4 className="font-medium text-gray-800">Psihoterapeut în formare</h4>
                  <p className="text-sm text-gray-600">Centrul de Psihoterapie Integrativă</p>
                </div>
                <div className="border-l-2 border-gray-300 pl-6">
                  <div className="text-sm text-gray-500">2012 - 2016</div>
                  <h4 className="font-medium text-gray-800">Master în Psihologie Clinică</h4>
                  <p className="text-sm text-gray-600">Universitatea din București</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}