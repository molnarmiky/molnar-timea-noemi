import { Phone, Mail, MapPin } from 'lucide-react';

export function ExactContactBar() {
  return (
    <div className="bg-[#9db098] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Phone */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center bg-[#b8e6b8]/20 p-4 rounded-xl backdrop-blur-sm">
              <Phone size={24} className="mr-4 text-[#1a1a2e]" />
              <div>
                <div className="text-sm text-[#1a1a2e] uppercase tracking-wide font-medium">TELEFON</div>
                <div className="text-lg font-medium text-[#1a1a2e]">(+4) 0724-781.466</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-[#b8e6b8]/20 p-4 rounded-xl backdrop-blur-sm">
              <Mail size={24} className="mr-4 text-[#1a1a2e]" />
              <div>
                <div className="text-sm text-[#1a1a2e] uppercase tracking-wide font-medium">EMAIL</div>
                <div className="text-base sm:text-lg font-medium text-[#1a1a2e] break-all">timeanoemi@gmail.com</div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex items-center bg-[#b8e6b8]/20 p-4 rounded-xl backdrop-blur-sm">
              <MapPin size={24} className="mr-4 text-[#1a1a2e]" />
              <div>
                <div className="text-sm text-[#1a1a2e] uppercase tracking-wide font-medium">ADRESĂ</div>
                <div className="text-lg font-medium text-[#1a1a2e]">Strada Livezii, nr. 100</div>
                <div className="text-sm text-[#1a1a2e] opacity-75">Sibiu, 550042</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}