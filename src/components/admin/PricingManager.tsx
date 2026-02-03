import { useState } from 'react';
import { useCMS, PricingPackage } from '../../contexts/CMSContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Edit, 
  Save, 
  X, 
  DollarSign,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  Star
} from 'lucide-react';

export function PricingManager() {
  const { pricingPackages, updatePricingPackage } = useCMS();
  const [selectedPackage, setSelectedPackage] = useState<{ pkg: PricingPackage; index: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<PricingPackage>>({});

  const handleEdit = (pkg: PricingPackage, index: number) => {
    setSelectedPackage({ pkg, index });
    setEditForm(pkg);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedPackage) {
      updatePricingPackage(selectedPackage.index, editForm);
      setIsEditing(false);
      setSelectedPackage(null);
      setEditForm({});
    }
  };

  const addFeature = () => {
    const features = editForm.features || [];
    setEditForm({ ...editForm, features: [...features, ''] });
  };

  const removeFeature = (index: number) => {
    const features = editForm.features || [];
    setEditForm({ ...editForm, features: features.filter((_, i) => i !== index) });
  };

  const updateFeature = (index: number, value: string) => {
    const features = editForm.features || [];
    const newFeatures = [...features];
    newFeatures[index] = value;
    setEditForm({ ...editForm, features: newFeatures });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-[#e8e6f7]">Pricing Management</h1>
        <p className="text-[#b8b4d1]">Manage your pricing packages and rates</p>
      </div>

      {/* Pricing Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pricingPackages.map((pkg, index) => (
          <Card 
            key={index} 
            className={`bg-[#242444] p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#a594f9]/10 ${
              pkg.popular ? 'border-2 border-[#a594f9]' : 'border border-[#a594f9]/20'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#a594f9] text-[#1a1a2e] font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Header */}
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#e8e6f7] text-left">{pkg.title}</h3>
                  <Badge 
                    variant={pkg.active ? "default" : "secondary"}
                    className={pkg.active ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                  >
                    {pkg.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <span className="text-3xl text-[#a594f9] font-medium">{pkg.price}</span>
                  <span className="text-[#b8b4d1] ml-1">RON</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-[#9db098] text-sm">
                  <Clock className="w-4 h-4" />
                  {pkg.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-[#b8b4d1] text-sm leading-relaxed text-center">
                {pkg.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#a594f9]">Includes:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#9db098] mt-0.5 flex-shrink-0" />
                      <span className="text-[#e8e6f7] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Edit Button */}
              <Button
                onClick={() => handleEdit(pkg, index)}
                className="w-full bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] mt-6"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Package
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#a594f9]/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#a594f9]" />
            </div>
            <div>
              <p className="text-sm text-[#b8b4d1]">Average Price</p>
              <p className="text-xl font-medium text-[#e8e6f7]">
                {Math.round(pricingPackages.reduce((sum, pkg) => sum + parseInt(pkg.price), 0) / pricingPackages.length)} RON
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#9db098]/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#9db098]" />
            </div>
            <div>
              <p className="text-sm text-[#b8b4d1]">Active Packages</p>
              <p className="text-xl font-medium text-[#e8e6f7]">
                {pricingPackages.filter(pkg => pkg.active).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c4b5fd]/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-[#c4b5fd]" />
            </div>
            <div>
              <p className="text-sm text-[#b8b4d1]">Popular Package</p>
              <p className="text-lg font-medium text-[#e8e6f7]">
                {pricingPackages.find(pkg => pkg.popular)?.title || 'None'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={() => {
        setIsEditing(false);
        setSelectedPackage(null);
        setEditForm({});
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#242444] border-[#a594f9]/20">
          <DialogHeader>
            <DialogTitle className="text-[#e8e6f7]">
              Edit Package: {selectedPackage?.pkg.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#e8e6f7]">Package Title *</Label>
                <Input
                  id="title"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                />
              </div>
              
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
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#e8e6f7]">Price (RON) *</Label>
                <Input
                  id="price"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="200"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popular" className="text-[#e8e6f7]">Popular</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={editForm.popular || false}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, popular: checked })}
                    />
                    <span className="text-sm text-[#b8b4d1]">
                      {editForm.popular ? 'Popular package' : 'Regular package'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="active" className="text-[#e8e6f7]">Status</Label>
                  <div className="flex items-center space-x-2">
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#e8e6f7]">Description *</Label>
              <Textarea
                id="description"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="Package description..."
              />
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[#e8e6f7]">Features</Label>
                <Button
                  type="button"
                  size="sm"
                  onClick={addFeature}
                  className="bg-[#9db098] hover:bg-[#7d9578] text-[#1a1a2e]"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-2">
                {(editForm.features || []).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#9db098] mt-2.5 flex-shrink-0" />
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                      placeholder="Enter feature..."
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
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
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedPackage(null);
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