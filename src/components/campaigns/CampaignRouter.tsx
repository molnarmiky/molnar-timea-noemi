import { useCMS } from '../../contexts/CMSContext';
import { RevinoLaTineLanding } from './RevinoLaTineLanding';
import { DynamicCampaignLanding } from './DynamicCampaignLanding';

interface CampaignRouterProps {
  campaignId: string;
}

export function CampaignRouter({ campaignId }: CampaignRouterProps) {
  const { getCampaign } = useCMS();
  
  // Get campaign from CMS
  const campaign = getCampaign(campaignId);
  
  // If campaign exists and is active, show it
  if (campaign && campaign.active) {
    return <DynamicCampaignLanding campaign={campaign} />;
  }
  
  // Special handling for hardcoded Revino la Tine campaign (for backwards compatibility)
  if (campaignId === 'revinolatine') {
    return <RevinoLaTineLanding />;
  }

  // Route to different campaign landing pages based on campaignId
  switch (campaignId.toLowerCase()) {
    case 'revinolatine':
      return <RevinoLaTineLanding />;
    
    // Add more campaigns here as needed
    // case 'altacampanie':
    //   return <AltaCampanieLanding />;
    
    default:
      // 404 page for unknown campaigns
      return (
        <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center text-center px-4">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold text-[#a594f9] mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-[#e8e6f7] mb-4">
              Campania nu a fost găsită
            </h2>
            <p className="text-[#e8e6f7]/70 mb-8">
              Ne pare rău, dar campania pe care o cauți nu există sau nu mai este activă.
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a594f9] to-[#86A789] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Înapoi la pagina principală
            </a>
          </div>
        </div>
      );
  }
}