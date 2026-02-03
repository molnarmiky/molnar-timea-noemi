import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/9e06a6a4ac9efebe03dc7bd5d63845c4a5041879.png';

export function ExactHero() {
  return (
    <section className="bg-[#1a1a2e] min-h-[70vh] flex items-center py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pr-12 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#b8b4d1] mb-6 sm:mb-8">
              Cabinet consiliere
              <br />
              și dezvoltare personală
              <br />
              <span className="text-[#a594f9] font-medium">Molnar Timea Noemi</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#9db098] mb-8 max-w-2xl">
              Sprijin profesional pentru dezvoltarea personală și bunăstarea emoțională
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-8 py-3 rounded-full transition-colors font-medium"
              >
                Vezi serviciile
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#9db098] text-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] px-8 py-3 rounded-full transition-colors font-medium"
              >
                Programează-te
              </button>
            </div>
          </div>
          
          {/* Right Content - Professional Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-[#a594f9]/30 shadow-2xl">
                <ImageWithFallback
                  src={heroImage}
                  alt="Molnar Timea Noemi - Consilier dezvoltare personală și NLP Coach"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#c4b5fd] rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#9db098] rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}