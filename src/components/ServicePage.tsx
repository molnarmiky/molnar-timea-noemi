import { ArrowLeft, Clock, Users, Heart, CheckCircle, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicePageProps {
  service: {
    id: string;
    title: string;
    duration: string;
    price: string;
    image: string;
    description: string;
    benefits: string[];
    process: string[];
    target: string;
    sessions: string;
  };
  onBack: () => void;
}

export function ServicePage({ service, onBack }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e8e6f7] pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#a594f9] hover:text-[#c4b5fd] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Înapoi la servicii</span>
        </button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#a594f9] font-medium mb-6">
              {service.title}
            </h1>
            <p className="text-[#b8b4d1] text-lg leading-relaxed mb-8">
              {service.description}
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-4 text-center">
                <Clock className="text-[#9db098] mx-auto mb-2" size={24} />
                <div className="text-[#e8e6f7] font-medium text-sm">Durată</div>
                <div className="text-[#b8b4d1] text-sm">{service.duration}</div>
              </div>
              <div className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-4 text-center">
                <Users className="text-[#9db098] mx-auto mb-2" size={24} />
                <div className="text-[#e8e6f7] font-medium text-sm">Ședințe</div>
                <div className="text-[#b8b4d1] text-sm">{service.sessions}</div>
              </div>
              <div className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-4 text-center">
                <Heart className="text-[#9db098] mx-auto mb-2" size={24} />
                <div className="text-[#e8e6f7] font-medium text-sm">Preț</div>
                <div className="text-[#b8b4d1] text-sm">{service.price}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] py-3 px-6 rounded-2xl font-medium transition-colors">
                Programează-te acum
              </button>
              <button className="flex-1 border-2 border-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] text-[#9db098] py-3 px-6 rounded-2xl font-medium transition-colors">
                Întreabă mai multe
              </button>
            </div>
          </div>

          <div className="lg:order-first">
            <div className="bg-[#242444] border border-[#a594f9]/20 rounded-3xl overflow-hidden">
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Benefits */}
          <div className="bg-[#242444] border border-[#a594f9]/20 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl text-[#a594f9] font-medium mb-6">
              Beneficii
            </h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[#9db098] mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-[#b8b4d1]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="bg-[#242444] border border-[#a594f9]/20 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl text-[#a594f9] font-medium mb-6">
              Cum funcționează
            </h2>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#a594f9] text-[#1a1a2e] rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-[#b8b4d1] pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mt-12 bg-[#2d2d50] border border-[#a594f9]/20 rounded-3xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl text-[#a594f9] font-medium mb-4">
            Pentru cine este recomandat?
          </h2>
          <p className="text-[#b8b4d1] text-lg leading-relaxed max-w-3xl mx-auto">
            {service.target}
          </p>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#a594f9]/10 to-[#9db098]/10 border border-[#a594f9]/20 rounded-3xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl text-[#a594f9] font-medium mb-4">
            Gata să începi?
          </h2>
          <p className="text-[#b8b4d1] mb-6 max-w-2xl mx-auto">
            Contactează-mă pentru o consultație inițială gratuită de 15 minute și să discutăm cum te pot ajuta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+40724781466"
              className="inline-flex items-center gap-2 bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-6 py-3 rounded-2xl font-medium transition-colors"
            >
              <Phone size={20} />
              Sună acum
            </a>
            <a 
              href="mailto:timeanoemi@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] text-[#9db098] px-6 py-3 rounded-2xl font-medium transition-colors"
            >
              <Mail size={20} />
              Trimite email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}