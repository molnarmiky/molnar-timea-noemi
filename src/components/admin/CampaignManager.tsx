import { useState } from 'react';
import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Edit, Users, Eye, EyeOff, Trash2, Copy } from 'lucide-react';
import { CampaignEditor } from './editors/CampaignEditor';
import { CampaignLeads } from './CampaignLeads';

export function CampaignManager() {
  const { campaigns, updateCampaign, deleteCampaign } = useSupabaseCMS();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'edit' | 'leads'>('list');
  const [isCreating, setIsCreating] = useState(false);
  
  const handleToggleActive = async (campaign: any) => {
    try {
      await updateCampaign(campaign.id, {
        ...campaign,
        active: !campaign.active
      });
      toast.success(`Campania a fost ${!campaign.active ? 'activată' : 'dezactivată'}`);
    } catch (error) {
      toast.error('A apărut o eroare la actualizarea campaniei');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sigur vrei să ștergi această campanie? Aceasta acțiune nu poate fi anulată.')) {
      return;
    }

    try {
      await deleteCampaign(id);
      toast.success('Campania a fost ștearsă');
    } catch (error) {
      toast.error('A apărut o eroare la ștergerea campaniei');
    }
  };

  const handleCreateNew = () => {
    setSelectedCampaign(null);
    setIsCreating(true);
    setViewMode('edit');
  };

  const handleEdit = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsCreating(false);
    setViewMode('edit');
  };

  const handleViewLeads = (campaign: any) => {
    setSelectedCampaign(campaign);
    setViewMode('leads');
  };

  const handleCopyUrl = (slug: string) => {
    const url = `${window.location.origin}/campanii/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('URL-ul a fost copiat în clipboard!');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedCampaign(null);
    setIsCreating(false);
  };

  if (viewMode === 'edit') {
    return (
      <CampaignEditor 
        campaign={selectedCampaign}
        isCreating={isCreating}
        onBack={handleBack}
      />
    );
  }

  if (viewMode === 'leads' && selectedCampaign) {
    return (
      <CampaignLeads 
        campaign={selectedCampaign}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#e8e6f7]">Gestionare Campanii</h2>
          <p className="text-[#e8e6f7]/70 mt-1">
            Creează și gestionează campaniile de marketing
          </p>
        </div>
        <Button
          onClick={handleCreateNew}
          className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Campanie Nouă
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <Card className="bg-[#16213e] border-[#a594f9]/30 p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#a594f9]/20 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-[#a594f9]" />
            </div>
            <h3 className="text-xl font-semibold text-[#e8e6f7]">
              Nicio campanie creată încă
            </h3>
            <p className="text-[#e8e6f7]/70">
              Începe prin a crea prima ta campanie de marketing
            </p>
            <Button
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-[#a594f9] to-[#86A789] hover:from-[#a594f9]/90 hover:to-[#86A789]/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Creează Prima Campanie
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-[#16213e] border-[#a594f9]/30 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-semibold text-[#e8e6f7]">
                      {campaign.title}
                    </h3>
                    <Badge
                      variant={campaign.active ? 'default' : 'secondary'}
                      className={campaign.active 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }
                    >
                      {campaign.active ? 'Activă' : 'Dezactivată'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-[#e8e6f7]/70">
                    <span>URL:</span>
                    <code className="px-2 py-1 bg-[#1a1a2e] rounded text-[#a594f9]">
                      /campanii/{campaign.slug}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyUrl(campaign.slug)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {campaign.leads && campaign.leads.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-[#e8e6f7]/70">
                      <Users className="w-4 h-4 text-[#86A789]" />
                      <span>{campaign.leads.length} înscrieri</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(campaign)}
                    className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
                  >
                    {campaign.active ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Dezactivează
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Activează
                      </>
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewLeads(campaign)}
                    className="border-[#86A789]/50 text-[#86A789] hover:bg-[#86A789]/10"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Înscrieri ({campaign.leads?.length || 0})
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(campaign)}
                    className="border-[#a594f9]/50 text-[#a594f9] hover:bg-[#a594f9]/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editează
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(campaign.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}