import { useState } from 'react';
import { useSupabaseCMS, Service } from '../../contexts/SupabaseCMSContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';
import { 
  Edit, 
  Save, 
  X, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

export function ServiceManager() {
  const { services, updateService, isLoading } = useSupabaseCMS();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Service>>({});

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setEditForm(service);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedService?.id) return;

    setIsSaving(true);
    try {
      await updateService(selectedService.id, editForm);
      toast.success('Service updated successfully!');
      setIsEditing(false);
      setSelectedService(null);
      setEditForm({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to update service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      await updateService(service.id, { active: !service.active });
      toast.success(service.active ? 'Service deactivated' : 'Service activated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#a594f9] border-t-transparent"></div>
      </div>
    );
  }

  const addBenefit = () => {
    const benefits = editForm.benefits || [];
    setEditForm({ ...editForm, benefits: [...benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const benefits = editForm.benefits || [];
    setEditForm({ ...editForm, benefits: benefits.filter((_, i) => i !== index) });
  };

  const updateBenefit = (index: number, value: string) => {
    const benefits = editForm.benefits || [];
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setEditForm({ ...editForm, benefits: newBenefits });
  };

  const addProcessStep = () => {
    const process = editForm.process || [];
    setEditForm({ ...editForm, process: [...process, ''] });
  };

  const removeProcessStep = (index: number) => {
    const process = editForm.process || [];
    setEditForm({ ...editForm, process: process.filter((_, i) => i !== index) });
  };

  const updateProcessStep = (index: number, value: string) => {
    const process = editForm.process || [];
    const newProcess = [...process];
    newProcess[index] = value;
    setEditForm({ ...editForm, process: newProcess });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-[#e8e6f7]">Service Management</h1>
        <p className="text-[#b8b4d1]">Manage your psychology services and offerings</p>
      </div>

      {/* Services Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-[#242444] border-[#a594f9]/20 overflow-hidden">
            <div className="h-48 bg-[#2d2d50] overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-[#e8e6f7] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#b8b4d1] line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <Badge 
                  variant={service.active ? "default" : "secondary"}
                  className={service.active ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                >
                  {service.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#2d2d50] rounded-lg">
                  <Clock className="w-4 h-4 text-[#a594f9] mx-auto mb-1" />
                  <div className="text-xs text-[#b8b4d1]">Duration</div>
                  <div className="text-sm text-[#e8e6f7] font-medium">{service.duration}</div>
                </div>
                
                <div className="text-center p-3 bg-[#2d2d50] rounded-lg">
                  <DollarSign className="w-4 h-4 text-[#9db098] mx-auto mb-1" />
                  <div className="text-xs text-[#b8b4d1]">Price</div>
                  <div className="text-sm text-[#e8e6f7] font-medium">{service.price}</div>
                </div>
                
                <div className="text-center p-3 bg-[#2d2d50] rounded-lg">
                  <Users className="w-4 h-4 text-[#c4b5fd] mx-auto mb-1" />
                  <div className="text-xs text-[#b8b4d1]">Sessions</div>
                  <div className="text-sm text-[#e8e6f7] font-medium">{service.sessions}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#a594f9]">Benefits:</h4>
                <div className="space-y-1">
                  {service.benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-[#b8b4d1]">
                      <CheckCircle className="w-3 h-3 text-[#9db098] mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                  {service.benefits.length > 3 && (
                    <p className="text-xs text-[#9db098]">
                      +{service.benefits.length - 3} more benefits
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                onClick={() => handleEdit(service)}
                className="w-full bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Service
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={() => {
        setIsEditing(false);
        setSelectedService(null);
        setEditForm({});
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#242444] border-[#a594f9]/20">
          <DialogHeader>
            <DialogTitle className="text-[#e8e6f7]">
              Edit Service: {selectedService?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#e8e6f7]">Service Title *</Label>
                <Input
                  id="title"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="active" className="text-[#e8e6f7]">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="active"
                    checked={editForm.active || false}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, active: checked })}
                  />
                  <span className="text-sm text-[#b8b4d1]">
                    {editForm.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[#e8e6f7]">Duration</Label>
                <Input
                  id="duration"
                  value={editForm.duration || ''}
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="50 minute"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#e8e6f7]">Price</Label>
                <Input
                  id="price"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="200 RON"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessions" className="text-[#e8e6f7]">Sessions</Label>
                <Input
                  id="sessions"
                  value={editForm.sessions || ''}
                  onChange={(e) => setEditForm({ ...editForm, sessions: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="Săptămânal"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className="text-[#e8e6f7]">Image URL</Label>
              <Input
                id="image"
                value={editForm.image || ''}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#e8e6f7]">Description *</Label>
              <Textarea
                id="description"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="Service description..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target" className="text-[#e8e6f7]">Target Audience</Label>
              <Textarea
                id="target"
                value={editForm.target || ''}
                onChange={(e) => setEditForm({ ...editForm, target: e.target.value })}
                rows={2}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="Who is this service for..."
              />
            </div>
            
            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[#e8e6f7]">Benefits</Label>
                <Button
                  type="button"
                  size="sm"
                  onClick={addBenefit}
                  className="bg-[#9db098] hover:bg-[#7d9578] text-[#1a1a2e]"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-2">
                {(editForm.benefits || []).map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                      placeholder="Enter benefit..."
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeBenefit(index)}
                      className="text-[#f87171] hover:text-[#fca5a5] hover:bg-[#f87171]/10"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Process */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[#e8e6f7]">Process Steps</Label>
                <Button
                  type="button"
                  size="sm"
                  onClick={addProcessStep}
                  className="bg-[#c4b5fd] hover:bg-[#a594f9] text-[#1a1a2e]"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-2">
                {(editForm.process || []).map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex items-center justify-center w-8 h-10 bg-[#a594f9] text-[#1a1a2e] rounded text-sm font-medium">
                      {index + 1}
                    </div>
                    <Input
                      value={step}
                      onChange={(e) => updateProcessStep(index, e.target.value)}
                      className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                      placeholder="Enter process step..."
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeProcessStep(index)}
                      className="text-[#f87171] hover:text-[#fca5a5] hover:bg-[#f87171]/10"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave}
                className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e]"
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedService(null);
                  setEditForm({});
                }}
                className="text-[#b8b4d1] hover:text-[#e8e6f7]"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}