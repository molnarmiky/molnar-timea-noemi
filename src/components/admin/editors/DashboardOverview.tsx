import { useEffect, useState } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import { FileText, Package, DollarSign, TrendingUp, Eye, Edit } from 'lucide-react';

export function DashboardOverview() {
  const { blogPosts, services, pricingPackages, loadBlogPosts, loadServices, loadPricingPackages } = useNewCMS();
  const [stats, setStats] = useState({
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    activeServices: 0,
    activePricing: 0,
  });

  useEffect(() => {
    // Load all data
    loadBlogPosts();
    loadServices();
    loadPricingPackages();
  }, []);

  useEffect(() => {
    setStats({
      totalBlogPosts: blogPosts.length,
      publishedBlogPosts: blogPosts.filter(p => p.published).length,
      activeServices: services.filter(s => s.active).length,
      activePricing: pricingPackages.filter(p => p.active).length,
    });
  }, [blogPosts, services, pricingPackages]);

  const statCards = [
    {
      title: 'Total Articole Blog',
      value: stats.totalBlogPosts,
      subtitle: `${stats.publishedBlogPosts} publicate`,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Servicii Active',
      value: stats.activeServices,
      subtitle: `din ${services.length} total`,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Pachete Prețuri',
      value: stats.activePricing,
      subtitle: `${pricingPackages.length} pachete disponibile`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Rata de Publicare',
      value: stats.totalBlogPosts > 0 ? `${Math.round((stats.publishedBlogPosts / stats.totalBlogPosts) * 100)}%` : '0%',
      subtitle: 'articole publicate',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    },
  ];

  const recentBlogPosts = blogPosts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
          Dashboard
        </h1>
        <p className="text-[#b8b4d1]">
          Bun venit înapoi! Iată o privire de ansamblu asupra site-ului tău.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-[#242444] border ${stat.borderColor} rounded-xl p-6 hover:shadow-lg hover:shadow-[#a594f9]/10 transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className="text-[#a594f9]" size={24} />
                </div>
              </div>
              <div>
                <p className="text-[#b8b4d1] text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-[#e8e6f7] mb-1">
                  {stat.value}
                </p>
                <p className="text-[#b8b4d1] text-xs">{stat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Blog Posts */}
      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#e8e6f7]">
            Articole Recente
          </h2>
          <span className="text-sm text-[#b8b4d1]">
            {recentBlogPosts.length} din {blogPosts.length}
          </span>
        </div>

        {recentBlogPosts.length > 0 ? (
          <div className="space-y-3">
            {recentBlogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 bg-[#1a1a2e]/50 border border-[#a594f9]/10 rounded-lg hover:border-[#a594f9]/30 transition-all"
              >
                <div className="flex-1">
                  <h3 className="text-[#e8e6f7] font-medium mb-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-[#b8b4d1]">
                    <span className="flex items-center gap-1">
                      {post.published ? (
                        <>
                          <Eye size={14} />
                          Publicat
                        </>
                      ) : (
                        <>
                          <Edit size={14} />
                          Ciornă
                        </>
                      )}
                    </span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.published
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {post.published ? 'Publicat' : 'Ciornă'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto text-[#b8b4d1] mb-3" size={48} />
            <p className="text-[#b8b4d1]">Nu există articole de blog încă.</p>
            <p className="text-sm text-[#b8b4d1]/70 mt-1">
              Creează primul tău articol în secțiunea Blog.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#e8e6f7] mb-4">
          Acțiuni Rapide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-[#a594f9]/10 border border-[#a594f9]/30 rounded-lg hover:bg-[#a594f9]/20 transition-all text-left">
            <FileText className="text-[#a594f9] mb-2" size={24} />
            <h3 className="text-[#e8e6f7] font-medium mb-1">Articol Nou</h3>
            <p className="text-sm text-[#b8b4d1]">Creează un articol de blog</p>
          </button>
          <button className="p-4 bg-[#a594f9]/10 border border-[#a594f9]/30 rounded-lg hover:bg-[#a594f9]/20 transition-all text-left">
            <Package className="text-[#a594f9] mb-2" size={24} />
            <h3 className="text-[#e8e6f7] font-medium mb-1">Editează Servicii</h3>
            <p className="text-sm text-[#b8b4d1]">Actualizează serviciile</p>
          </button>
          <button className="p-4 bg-[#a594f9]/10 border border-[#a594f9]/30 rounded-lg hover:bg-[#a594f9]/20 transition-all text-left">
            <DollarSign className="text-[#a594f9] mb-2" size={24} />
            <h3 className="text-[#e8e6f7] font-medium mb-1">Pachete Prețuri</h3>
            <p className="text-sm text-[#b8b4d1]">Gestionează prețurile</p>
          </button>
        </div>
      </div>
    </div>
  );
}
