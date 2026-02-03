import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServicePage } from './ServicePage';
import { useCMS } from '../contexts/CMSContext';
import adolescentImage from 'figma:asset/724dbc239775302f1ce79f782053cc0b94b2c378.png';

export function ExactServices() {
  const { services: allServices, isLoading } = useCMS();
  const [selectedService, setSelectedService] = useState<any>(null);
  
  // Only show active services
  const services = allServices?.filter(service => service.active) || [];
  
  // Map service images, replacing figma:asset references with actual imports
  const servicesWithImages = services.map(service => ({
    ...service,
    image: service.id === 'consiliere-adolescenti' ? adolescentImage : service.image
  }));

  if (isLoading) {
    return (
      <section id="services" className="py-16 sm:py-20 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#a594f9] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-[#e8e6f7] mt-4">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (selectedService) {
    return (
      <ServicePage 
        service={selectedService} 
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#a594f9] mb-4 font-medium">
            SERVICII OFERITE
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {servicesWithImages.map((service, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedService(service)}
              className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl overflow-hidden hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a594f9]/10 cursor-pointer group"
            >
              <div className="h-48 sm:h-52 bg-[#2d2d50] overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-[#e8e6f7] mb-3 leading-snug font-medium text-sm sm:text-base group-hover:text-[#a594f9] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#9db098] text-xs sm:text-sm mb-4 leading-relaxed">
                  {index === 0 && "Sprijin personalizat pentru dezvoltarea și bunăstarea individuală"}
                  {index === 1 && "Ghidare specializată pentru adolescenți în dezvoltare"}
                  {index === 2 && "Întărirea comunicării și conexiunii în relațiile de cuplu"}
                  {index === 3 && "Suport pentru părinți și dezvoltarea competențelor parentale"}
                </p>
                <div className="text-[#c4b5fd] group-hover:text-[#a594f9] text-xs sm:text-sm font-medium transition-colors uppercase tracking-wide flex items-center gap-2">
                  {service.linkText}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}