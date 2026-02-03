import { ImageWithFallback } from './figma/ImageWithFallback';

export function ExactAbout() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#242444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Professional Photo */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-[#a594f9]/30 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1498334643776-355dec02782b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXRoJTIwcmVhbGl0eSUyMG1vdGl2YXRpb25hbCUyMHBzeWNob2xvZ3klMjBoZWFsaW5nfGVufDF8fHx8MTc1OTQwODI3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Motivational psychology concept - Truth about emotional healing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#a594f9] font-medium">
              BUNĂ ȘI BINE AI VENIT!
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-[#e8e6f7] leading-relaxed text-base sm:text-lg">
              <p>
                Sunt aici pentru a te ajuta să îți întâlnești ca îți se întâmplă să îți schimbi acele aspecte ale vieții tale care nu te 
                mulțumesc. Consilierea reprezintă un drum de autocunoaștere în care îți poți fi alături. Este un <span className="text-[#9db098]">parteneriat bazat 
                pe încredere, onestitate</span>, în care lucrăm împreună să înlăturăm obstacolele cu care te confrunți. Eu ofer un 
                mediu care te va ajuta să faci noi alegeri și schimbări pozitive în viața ta.
              </p>
              
              <p>
                Atracția mea pentru psihologie a început încă din anii facultății, când adeseori să observ comportamentul 
                oamenilor în mediul social. Apoi a luat amploare o dată cu sosirea primului copil, datorită preocupărilor continue 
                de a fi corect informată și pregătită. Usor usor a devenit o <span className="text-[#c4b5fd]">adevărată pasiune</span>, în care am investit ani de formare 
                și multă energie. Am început să practic această frumoasă meserie pentru că iubesc oamenii și este o onoare 
                pentru mine să le pot fi alături în momentele cele mai dificile ale vieții lor.
              </p>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-8 py-3 rounded-full transition-colors font-medium inline-flex items-center gap-2"
              >
                Vezi toate serviciile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}