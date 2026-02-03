import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        throw new Error('Toate câmpurile obligatorii trebuie completate.');
      }

      // Salvăm mesajul în localStorage
      const messages = JSON.parse(localStorage.getItem('cms_contact_messages') || '[]');
      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        createdAt: new Date().toISOString(),
        read: false
      };
      
      messages.push(newMessage);
      localStorage.setItem('cms_contact_messages', JSON.stringify(messages));

      console.log('Contact message saved successfully:', newMessage);

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Nu s-a putut trimite mesajul. Vă rugăm să încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 bg-gradient-to-b from-[#1a1a2e] via-[#242444] to-[#1a1a2e] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a594f9]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-[#9db098]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#c4b5fd]/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 lg:space-y-10">
            {/* Header Section */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#a594f9] to-[#c4b5fd] animate-pulse"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#a594f9]/30 to-transparent"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-[#a594f9] via-[#c4b5fd] to-[#a594f9] bg-clip-text text-transparent font-medium leading-tight">
                Să Lucrăm Împreună
              </h2>
              <p className="text-[#b8b4d1] leading-relaxed text-lg sm:text-xl max-w-lg">
                Sunt aici să vă ofer sprijinul de care aveți nevoie pentru a vă depăși 
                provocările și a vă îmbunătăți calitatea vieții. Contactați-mă pentru 
                o programare sau pentru mai multe informații.
              </p>
            </div>
            
            {/* Contact Information Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="group relative bg-gradient-to-r from-[#2d2d50]/50 to-[#242444]/80 backdrop-blur-sm border border-[#a594f9]/20 rounded-2xl p-6 hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#a594f9]/10 h-24">
                <div className="flex items-center gap-5 h-full">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#a594f9]/20 to-[#c4b5fd]/20 border-2 border-[#a594f9]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-[#a594f9] group-hover:text-[#c4b5fd] transition-colors duration-300" size={24} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#9db098] rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <p className="font-medium text-[#e8e6f7] text-base sm:text-lg mb-1">Email</p>
                    <a 
                      href="mailto:timeanoemi@gmail.com" 
                      className="text-[#9db098] hover:text-[#b8e6b8] transition-all duration-300 text-base sm:text-lg font-medium hover:underline block truncate"
                    >
                      timeanoemi@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Phone Card */}
              <div className="group relative bg-gradient-to-r from-[#2d2d50]/50 to-[#242444]/80 backdrop-blur-sm border border-[#a594f9]/20 rounded-2xl p-6 hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#a594f9]/10 h-24">
                <div className="flex items-center gap-5 h-full">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#a594f9]/20 to-[#c4b5fd]/20 border-2 border-[#a594f9]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-[#a594f9] group-hover:text-[#c4b5fd] transition-colors duration-300" size={24} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#9db098] rounded-full animate-ping opacity-75 delay-200"></div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <p className="font-medium text-[#e8e6f7] text-base sm:text-lg mb-1">Telefon</p>
                    <a 
                      href="tel:+40724781466" 
                      className="text-[#9db098] hover:text-[#b8e6b8] transition-all duration-300 text-base sm:text-lg font-medium hover:underline"
                    >
                      (+4) 0724-781.466
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Location Card */}
              <div className="group relative bg-gradient-to-r from-[#2d2d50]/50 to-[#242444]/80 backdrop-blur-sm border border-[#a594f9]/20 rounded-2xl p-6 hover:border-[#a594f9]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#a594f9]/10 h-24">
                <div className="flex items-center gap-5 h-full">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#a594f9]/20 to-[#c4b5fd]/20 border-2 border-[#a594f9]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-[#a594f9] group-hover:text-[#c4b5fd] transition-colors duration-300" size={24} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#9db098] rounded-full animate-ping opacity-75 delay-400"></div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <p className="font-medium text-[#e8e6f7] text-base sm:text-lg mb-1">Cabinet</p>
                    <p className="text-[#b8b4d1] text-base sm:text-lg truncate">Strada Livezii, nr. 100</p>
                    <p className="text-[#9db098] text-sm font-medium">Sibiu, 550042</p>
                  </div>
                </div>
              </div>

              {/* Program Card */}
              <div className="group relative bg-gradient-to-r from-[#2d2d50]/50 to-[#242444]/80 backdrop-blur-sm border border-[#9db098]/20 rounded-2xl p-6 hover:border-[#9db098]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#9db098]/10 h-24">
                <div className="flex items-center gap-5 h-full">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#9db098]/20 to-[#b8e6b8]/20 border-2 border-[#9db098]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-[#9db098] group-hover:text-[#b8e6b8] transition-colors duration-300" size={24} />
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <p className="font-medium text-[#e8e6f7] text-base sm:text-lg mb-1">Program</p>
                    <p className="text-[#b8b4d1] text-base">Luni - Vineri: 9:00 - 18:00</p>
                    <p className="text-[#9db098] text-sm font-medium">Programări doar cu agendare prealabilă</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Heart className="text-[#9db098]" size={20} />
                <p className="font-medium text-[#e8e6f7] text-lg">Urmărește-mă pe social media</p>
              </div>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="group relative w-14 h-14 bg-gradient-to-br from-[#2d2d50] to-[#1a1a2e] border-2 border-[#a594f9]/20 rounded-2xl flex items-center justify-center hover:border-[#a594f9] hover:bg-gradient-to-br hover:from-[#a594f9] hover:to-[#8b7fe6] transition-all duration-300 text-[#b8b4d1] hover:text-[#1a1a2e] hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#a594f9]/20"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a594f9]/0 to-[#c4b5fd]/0 group-hover:from-[#a594f9]/10 group-hover:to-[#c4b5fd]/10 transition-all duration-300"></div>
                </a>
                <a 
                  href="https://www.instagram.com/mindresetnlpbytimea/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-br from-[#2d2d50] to-[#1a1a2e] border-2 border-[#a594f9]/20 rounded-2xl flex items-center justify-center hover:border-[#a594f9] hover:bg-gradient-to-br hover:from-[#a594f9] hover:to-[#8b7fe6] transition-all duration-300 text-[#b8b4d1] hover:text-[#1a1a2e] hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#a594f9]/20"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a594f9]/0 to-[#c4b5fd]/0 group-hover:from-[#a594f9]/10 group-hover:to-[#c4b5fd]/10 transition-all duration-300"></div>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576876101384" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-br from-[#2d2d50] to-[#1a1a2e] border-2 border-[#a594f9]/20 rounded-2xl flex items-center justify-center hover:border-[#a594f9] hover:bg-gradient-to-br hover:from-[#a594f9] hover:to-[#8b7fe6] transition-all duration-300 text-[#b8b4d1] hover:text-[#1a1a2e] hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#a594f9]/20"
                  aria-label="Facebook"
                >
                  <Facebook size={22} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a594f9]/0 to-[#c4b5fd]/0 group-hover:from-[#a594f9]/10 group-hover:to-[#c4b5fd]/10 transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#242444] border-2 border-[#a594f9]/30 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-[#a594f9]/10 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a594f9]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#9db098]/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#a594f9] animate-pulse"></div>
                <h3 className="text-xl sm:text-2xl text-[#a594f9] font-medium bg-gradient-to-r from-[#a594f9] to-[#c4b5fd] bg-clip-text text-transparent">
                  Trimite-mi un Mesaj
                </h3>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="firstName" className="block mb-3 text-[#e8e6f7] font-medium text-sm sm:text-base">
                      Prenume *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-4 bg-[#2d2d50]/80 border-2 border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9]/50 focus:border-[#a594f9] transition-all duration-300 text-[#e8e6f7] placeholder-[#b8b4d1] hover:border-[#a594f9]/40 backdrop-blur-sm"
                        placeholder="Maria"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a594f9]/5 to-[#9db098]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className="block mb-3 text-[#e8e6f7] font-medium text-sm sm:text-base">
                      Nume *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-4 bg-[#2d2d50]/80 border-2 border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9]/50 focus:border-[#a594f9] transition-all duration-300 text-[#e8e6f7] placeholder-[#b8b4d1] hover:border-[#a594f9]/40 backdrop-blur-sm"
                        placeholder="Popescu"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a594f9]/5 to-[#9db098]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="email" className="block mb-3 text-[#e8e6f7] font-medium text-sm sm:text-base">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-4 bg-[#2d2d50]/80 border-2 border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9]/50 focus:border-[#a594f9] transition-all duration-300 text-[#e8e6f7] placeholder-[#b8b4d1] hover:border-[#a594f9]/40 backdrop-blur-sm"
                      placeholder="maria@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a594f9]/5 to-[#9db098]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="phone" className="block mb-3 text-[#e8e6f7] font-medium text-sm sm:text-base">
                    Telefon
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-4 bg-[#2d2d50]/80 border-2 border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9]/50 focus:border-[#a594f9] transition-all duration-300 text-[#e8e6f7] placeholder-[#b8b4d1] hover:border-[#a594f9]/40 backdrop-blur-sm"
                      placeholder="(+4) 0724-781.466"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a594f9]/5 to-[#9db098]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="message" className="block mb-3 text-[#e8e6f7] font-medium text-sm sm:text-base">
                    Mesaj *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-4 bg-[#2d2d50]/80 border-2 border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9]/50 focus:border-[#a594f9] transition-all duration-300 resize-none text-[#e8e6f7] placeholder-[#b8b4d1] hover:border-[#a594f9]/40 backdrop-blur-sm"
                      placeholder="Spune-mi mai multe despre situația ta și cum te pot ajuta..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a594f9]/5 to-[#9db098]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#a594f9] to-[#8b7fe6] text-[#1a1a2e] rounded-xl hover:from-[#8b7fe6] hover:to-[#a594f9] transition-all duration-300 font-medium text-base sm:text-lg shadow-lg shadow-[#a594f9]/25 hover:shadow-xl hover:shadow-[#a594f9]/30 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    disabled={isSubmitting}
                  >
                    <span>Trimite Mesajul</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-xs text-[#9db098] mt-4">
                    <div className="w-2 h-2 rounded-full bg-[#9db098]"></div>
                    <p>Mesajul a fost trimis cu succes!</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-[#ff5555] mt-4">
                    <div className="w-2 h-2 rounded-full bg-[#ff5555]"></div>
                    <p>{errorMessage}</p>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-[#9db098] mt-4">
                  <div className="w-2 h-2 rounded-full bg-[#9db098]"></div>
                  <p>Câmpurile marcate cu * sunt obligatorii</p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Google Maps Section */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#a594f9]/50"></div>
              <MapPin className="text-[#a594f9]" size={24} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#a594f9]/50"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium bg-gradient-to-r from-[#a594f9] to-[#c4b5fd] bg-clip-text text-transparent mb-4">
              Găsește-mă Aici
            </h3>

          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a594f9]/20 via-[#9db098]/20 to-[#a594f9]/20 rounded-3xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-[#2d2d50] to-[#1a1a2e] rounded-3xl overflow-hidden border-2 border-[#a594f9]/30 shadow-2xl shadow-[#a594f9]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.0871!2d24.1512!3d45.7983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c677!2sStrada%20Livezii%20100%2C%20Sibiu%20550042%2C%20Romania!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(110%) brightness(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locația Cabinetului - Strada Livezii 100, Sibiu"
                className="rounded-3xl"
              />
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}