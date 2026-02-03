import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                Hi, I'm Timea
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                A passionate digital designer crafting beautiful experiences 
                that connect people with brands they love.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                View My Work
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzU3ODY4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Molnar Timea Noemi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}