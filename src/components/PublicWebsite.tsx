import { ExactHeader } from './ExactHeader';
import { ExactHero } from './ExactHero';
import { ExactAbout } from './ExactAbout';
import { ExactServices } from './ExactServices';
import { Pricing } from './Pricing';
import { Blog } from './Blog';
import { Contact } from './Contact';
import { ExactContactBar } from './ExactContactBar';
import { ExactCookieConsent } from './ExactCookieConsent';
import { ExactFooter } from './ExactFooter';

export function PublicWebsite() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e8e6f7]">
      <ExactHeader />
      
      {/* Main Content with improved spacing and organization */}
      <main className="pt-16 lg:pt-20">
        {/* Hero & Introduction Section */}
        <ExactHero />
        <ExactContactBar />
        
        {/* About & Services Section - Core Information */}
        <div className="bg-gradient-to-b from-[#1a1a2e] via-[#242444] to-[#1a1a2e]">
          <ExactAbout />
          <ExactServices />
          <Pricing />
        </div>
        
        {/* Blog Section - Educational Content */}
        <div className="bg-gradient-to-b from-[#1a1a2e] via-[#2d2d50] to-[#242444]">
          <Blog />
        </div>
        
        {/* Contact Section - Call to Action */}
        <Contact />
      </main>
      
      <ExactFooter />
      <ExactCookieConsent />
    </div>
  );
}