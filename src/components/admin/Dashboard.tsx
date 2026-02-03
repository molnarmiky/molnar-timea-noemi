import { useSupabaseCMS } from '../../contexts/SupabaseCMSContext';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Briefcase, 
  DollarSign, 
  Eye, 
  Calendar, 
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

export function Dashboard() {
  const { blogPosts, services, pricingPackages } = useSupabaseCMS();

  const publishedPosts = blogPosts.filter(post => post.published);
  const activeServices = services.filter(service => service.active);
  const activePricing = pricingPackages.filter(pkg => pkg.active);

  const stats = [
    {
      title: 'Published Articles',
      value: publishedPosts.length,
      total: blogPosts.length,
      icon: FileText,
      color: 'text-[#a594f9]',
      bgColor: 'bg-[#a594f9]/10'
    },
    {
      title: 'Active Services',
      value: activeServices.length,
      total: services.length,
      icon: Briefcase,
      color: 'text-[#9db098]',
      bgColor: 'bg-[#9db098]/10'
    },
    {
      title: 'Pricing Packages',
      value: activePricing.length,
      total: pricingPackages.length,
      icon: DollarSign,
      color: 'text-[#c4b5fd]',
      bgColor: 'bg-[#c4b5fd]/10'
    },
    {
      title: 'Total Content',
      value: blogPosts.length + services.length,
      total: null,
      icon: TrendingUp,
      color: 'text-[#f87171]',
      bgColor: 'bg-[#f87171]/10'
    }
  ];

  const recentActivity = [
    {
      action: 'Blog post published',
      item: 'Cum să gestionezi anxietatea...',
      time: '2 hours ago',
      type: 'blog'
    },
    {
      action: 'Service updated',
      item: 'Consiliere individuală',
      time: '1 day ago',
      type: 'service'
    },
    {
      action: 'Pricing modified',
      item: 'Ședință Individuală',
      time: '3 days ago',
      type: 'pricing'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#a594f9]/10 to-[#9db098]/10 border border-[#a594f9]/20 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#a594f9] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#1a1a2e]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-[#e8e6f7]">
              Welcome back, Timea!
            </h1>
            <p className="text-[#b8b4d1]">
              Here's what's happening with your psychology practice website.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#242444] border-[#a594f9]/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#b8b4d1] mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-medium text-[#e8e6f7]">
                      {stat.value}
                    </p>
                    {stat.total && (
                      <p className="text-sm text-[#b8b4d1]">
                        / {stat.total}
                      </p>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-[#a594f9]" />
            <h2 className="text-lg font-medium text-[#e8e6f7]">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[#2d2d50]">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'blog' ? 'bg-[#a594f9]' :
                  activity.type === 'service' ? 'bg-[#9db098]' :
                  'bg-[#c4b5fd]'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-[#e8e6f7]">{activity.action}</p>
                  <p className="text-xs text-[#b8b4d1]">{activity.item}</p>
                </div>
                <p className="text-xs text-[#9db098]">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-[#a594f9]" />
            <h2 className="text-lg font-medium text-[#e8e6f7]">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-[#2d2d50] hover:bg-[#a594f9]/10 border border-[#a594f9]/20 hover:border-[#a594f9]/40 rounded-lg transition-colors group">
              <FileText className="w-6 h-6 text-[#a594f9] mb-2 mx-auto" />
              <p className="text-sm text-[#e8e6f7] group-hover:text-[#a594f9]">New Post</p>
            </button>
            
            <button className="p-4 bg-[#2d2d50] hover:bg-[#9db098]/10 border border-[#9db098]/20 hover:border-[#9db098]/40 rounded-lg transition-colors group">
              <Briefcase className="w-6 h-6 text-[#9db098] mb-2 mx-auto" />
              <p className="text-sm text-[#e8e6f7] group-hover:text-[#9db098]">Edit Service</p>
            </button>
            
            <button className="p-4 bg-[#2d2d50] hover:bg-[#c4b5fd]/10 border border-[#c4b5fd]/20 hover:border-[#c4b5fd]/40 rounded-lg transition-colors group">
              <DollarSign className="w-6 h-6 text-[#c4b5fd] mb-2 mx-auto" />
              <p className="text-sm text-[#e8e6f7] group-hover:text-[#c4b5fd]">Update Pricing</p>
            </button>
            
            <button className="p-4 bg-[#2d2d50] hover:bg-[#f87171]/10 border border-[#f87171]/20 hover:border-[#f87171]/40 rounded-lg transition-colors group">
              <Eye className="w-6 h-6 text-[#f87171] mb-2 mx-auto" />
              <p className="text-sm text-[#e8e6f7] group-hover:text-[#f87171]">View Site</p>
            </button>
          </div>
        </Card>
      </div>

      {/* Content Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Blog Posts */}
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#e8e6f7]">Recent Posts</h3>
            <Badge variant="secondary" className="bg-[#a594f9]/10 text-[#a594f9]">
              {blogPosts.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="p-3 bg-[#2d2d50] rounded-lg">
                <p className="text-sm text-[#e8e6f7] font-medium truncate">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={post.published ? "default" : "secondary"}
                    className={post.published ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </Badge>
                  <span className="text-xs text-[#b8b4d1]">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Services Overview */}
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#e8e6f7]">Services</h3>
            <Badge variant="secondary" className="bg-[#9db098]/10 text-[#9db098]">
              {services.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="p-3 bg-[#2d2d50] rounded-lg">
                <p className="text-sm text-[#e8e6f7] font-medium truncate">
                  {service.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#9db098]">{service.price}</span>
                  <Badge 
                    variant={service.active ? "default" : "secondary"}
                    className={service.active ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                  >
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pricing Overview */}
        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#e8e6f7]">Pricing</h3>
            <Badge variant="secondary" className="bg-[#c4b5fd]/10 text-[#c4b5fd]">
              {pricingPackages.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {pricingPackages.slice(0, 3).map((pkg, index) => (
              <div key={index} className="p-3 bg-[#2d2d50] rounded-lg">
                <p className="text-sm text-[#e8e6f7] font-medium truncate">
                  {pkg.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#c4b5fd]">{pkg.price} RON</span>
                  <div className="flex gap-1">
                    {pkg.popular && (
                      <Badge className="bg-[#a594f9] text-[#1a1a2e] text-xs">
                        Popular
                      </Badge>
                    )}
                    <Badge 
                      variant={pkg.active ? "default" : "secondary"}
                      className={pkg.active ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                    >
                      {pkg.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}