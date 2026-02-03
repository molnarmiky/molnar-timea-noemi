export function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <div className="bg-[#242444] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#a594f9] text-center mb-4">
            Termeni și Condiții
          </h1>
          <p className="text-[#b8b4d1] text-center text-lg">
            Cabinet consiliere și dezvoltare personală Molnar Timea Noemi
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-[#e8e6f7]">
            
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">1. Introducere</h2>
              <p className="leading-relaxed">
                Acești Termeni și Condiții reglementează relația dintre Cabinet consiliere și dezvoltare personală 
                Molnar Timea Noemi și clienții care utilizează serviciile oferite. Prin accesarea serviciilor noastre, 
                acceptați să respectați acești termeni în totalitate.
              </p>
            </section>

            {/* Services */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">2. Serviciile Oferite</h2>
              <div className="space-y-3">
                <h3 className="text-xl text-[#9db098]">Servicii disponibile:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Consiliere de dezvoltare personală</li>
                  <li>Consiliere vocațională</li>
                  <li>Consiliere pentru adulți</li>
                  <li>Consiliere pentru adolescenți</li>
                  <li>Programe de training și workshop-uri</li>
                  <li>Sesiuni de grupuri de suport</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Toate serviciile sunt furnizate de <span className="text-[#9db098] font-medium">consilier atestat</span> 
                  de Ministerul Muncii și Ministerul Educației, cu respectarea standardelor profesionale în vigoare.
                </p>
              </div>
            </section>

            {/* Appointments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">3. Programări și Întâlniri</h2>
              <div className="space-y-3">
                <h3 className="text-xl text-[#9db098]">Condiții de programare:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Programările se fac prin telefon la (+4) 0724-781.466 sau prin email</li>
                  <li>Confirmarea programării se face cu minimum 24 de ore înainte</li>
                  <li>Anulările se pot face cu minimum 24 de ore înainte, fără penalizări</li>
                  <li>Anulările făcute cu mai puțin de 24 de ore se taxează 50% din valoarea ședinței</li>
                  <li>Neprezentarea la programare fără anunț se taxează integral</li>
                </ul>
              </div>
            </section>

            {/* Payments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">4. Plăți și Tarife</h2>
              <div className="space-y-3">
                <h3 className="text-xl text-[#9db098]">Condiții de plată:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Plata se efectuează la finalul fiecărei ședințe</li>
                  <li>Se acceptă plata în numerar sau prin transfer bancar</li>
                  <li>Pentru pachetele de ședințe, plata se poate face în rate</li>
                  <li>Tarifele sunt afișate pe site și pot fi actualizate periodic</li>
                  <li>Se eliberează chitanță fiscală pentru toate plățile</li>
                </ul>
              </div>
            </section>

            {/* Professional Ethics */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">5. Etica Profesională</h2>
              <div className="space-y-3">
                <h3 className="text-xl text-[#9db098]">Angajamente profesionale:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="text-[#c4b5fd]">Confidențialitate absolută</span> - respectarea secretului profesional</li>
                  <li><span className="text-[#c4b5fd]">Neutralitate</span> - abordare obiectivă și nepărtinitoare</li>
                  <li><span className="text-[#c4b5fd]">Competență profesională</span> - formarea continuă și actualizarea cunoștințelor</li>
                  <li><span className="text-[#c4b5fd]">Respect pentru client</span> - tratament egal și demnitate</li>
                  <li><span className="text-[#c4b5fd]">Limite profesionale</span> - menținerea unei relații terapeutice adecvate</li>
                </ul>
              </div>
            </section>

            {/* Client Responsibilities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">6. Responsabilitățile Clientului</h2>
              <div className="space-y-3">
                <p className="leading-relaxed">Clientul se angajează să:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Furnizeze informații complete și corecte</li>
                  <li>Respecte programările stabilite</li>
                  <li>Participe activ la procesul de consiliere</li>
                  <li>Respecte confidențialitatea altor participanți (în cazul ședințelor de grup)</li>
                  <li>Informeze consilierul despre orice schimbări relevante în starea de sănătate</li>
                  <li>Efectueze plata în termenele stabilite</li>
                </ul>
              </div>
            </section>

            {/* Limitations */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">7. Limitări ale Serviciilor</h2>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <span className="text-[#9db098] font-medium">Important:</span> Serviciile de consiliere oferite nu 
                  constituie tratament medical sau psihiatric. În cazul problemelor de sănătate mentală care necesită 
                  intervenție medicală, clientul va fi îndrumat către specialiști competenți.
                </p>
                <h3 className="text-xl text-[#9db098] mt-4">Limitări specifice:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nu se oferă diagnostice medicale sau psihiatrice</li>
                  <li>Nu se prescriu medicamente</li>
                  <li>Nu se garantează rezultate specifice</li>
                  <li>Progresul depinde de implicarea activă a clientului</li>
                </ul>
              </div>
            </section>

            {/* Emergency */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">8. Situații de Urgență</h2>
              <div className="bg-[#242444] p-6 rounded-lg border border-[#a594f9]/20">
                <p className="leading-relaxed mb-4">
                  <span className="text-[#c4b5fd] font-medium">În caz de urgență psihiatrică</span> sau risc de autoagresiune:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="text-[#9db098]">Urgențe:</span> Sunați 112</li>
                  <li><span className="text-[#9db098]">Linia de prevenire a sinuciderii:</span> 0800-801-200</li>
                  <li><span className="text-[#9db098]">Spitalul de Urgență:</span> Serviciul de Psihiatrie</li>
                </ul>
              </div>
            </section>

            {/* Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">9. Limitarea Răspunderii</h2>
              <p className="leading-relaxed">
                Consilierul își asumă responsabilitatea pentru furnizarea serviciilor în conformitate cu standardele 
                profesionale. Responsabilitatea se limitează la valoarea serviciilor furnizate și nu include daune 
                indirecte sau consecințiale.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">10. Soluționarea Conflictelor</h2>
              <p className="leading-relaxed">
                Orice divergențe se vor rezolva prin <span className="text-[#9db098]">dialog constructiv</span>. 
                În cazul în care nu se poate ajunge la o înțelegere, se vor aplica prevederile legale în vigoare 
                în România.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">11. Contact</h2>
              <div className="bg-[#242444] p-6 rounded-lg border border-[#a594f9]/20">
                <div className="space-y-2">
                  <p><span className="text-[#9db098] font-medium">Nume:</span> Molnar Timea Noemi</p>
                  <p><span className="text-[#9db098] font-medium">Telefon:</span> (+4) 0724-781.466</p>
                  <p><span className="text-[#9db098] font-medium">Email:</span> contact@molnartimeanoemi.ro</p>
                  <p><span className="text-[#9db098] font-medium">Certificare:</span> Consilier atestat MMPS și MEN</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-[#a594f9]">12. Modificări</h2>
              <p className="leading-relaxed">
                Acești termeni și condiții pot fi modificați pentru a reflecta schimbările în servicii sau legislație. 
                Clienții vor fi informați despre orice modificări importante.
              </p>
              <p className="text-[#9db098] font-medium">
                Ultima actualizare: ianuarie 2025
              </p>
            </section>

          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-8 py-3 rounded-full transition-colors font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}