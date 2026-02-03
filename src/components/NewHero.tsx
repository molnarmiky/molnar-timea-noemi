import { ImageWithFallback } from './figma/ImageWithFallback';

export function NewHero() {
  return (
    <section className="bg-gray-100 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight text-gray-800">
                Cabinet consiliere
                <br />
                <span className="text-gray-600">și dezvoltare personală</span>
                <br />
                <span className="font-medium">Molnar Timea Noemi</span>
              </h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Psiholog clinician și psihoterapeut cu peste 8 ani de experiență în sprijinirea persoanelor 
                care doresc să își îmbunătățească calitatea vieții și să depășească provocările emoționale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-colors"
                >
                  Servicii
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full transition-colors"
                >
                  Programează-te
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Content - Professional Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 lg:w-96 h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwc3ljaG9sb2dpc3QlMjB3b21hbiUyMHRoZXJhcGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1Nzg3NTQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Molnar Timea Noemi - Psiholog clinician și psihoterapeut"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}