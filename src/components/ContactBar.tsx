import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactBar() {
  return (
    <div className="bg-[#a594f9] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Phone */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-2">
              <Phone size={20} className="mr-3 text-[#9db098]" />
              <div>
                <div className="text-xs text-[#b8b4d1] uppercase tracking-wide">Telefon</div>
                <div className="font-medium text-[#e8e6f7]">(+4) 0724-781.466</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-2">
              <Mail size={20} className="mr-3 text-[#9db098]" />
              <div>
                <div className="text-xs text-[#b8b4d1] uppercase tracking-wide">Email</div>
                <div className="font-medium text-[#e8e6f7]">hello@molnartimeanoemi.ro</div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-2">
              <MapPin size={20} className="mr-3 text-[#9db098]" />
              <div>
                <div className="text-xs text-[#b8b4d1] uppercase tracking-wide">Adresă</div>
                <div className="font-medium text-[#e8e6f7]">Strada Livezii, Nr. 100, Sibiu, 550042</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}