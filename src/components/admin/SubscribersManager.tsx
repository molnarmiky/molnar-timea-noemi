import { useState, useEffect } from 'react';
import { Mail, Trash2, Download, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Subscriber {
  email: string;
  subscribedAt: string;
  active: boolean;
  unsubscribedAt?: string;
}

export function SubscribersManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    try {
      setIsLoading(true);
      const subscribersJson = localStorage.getItem('newsletter_subscribers');
      const data: Subscriber[] = subscribersJson ? JSON.parse(subscribersJson) : [];
      // Sort by subscribed date, newest first
      data.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
      setSubscribers(data);
    } catch (error) {
      console.error('Error loading subscribers:', error);
      setSubscribers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (email: string) => {
    if (!confirm('Sigur doriți să ștergeți acest abonat permanent?')) return;

    try {
      const updatedSubscribers = subscribers.filter(s => s.email !== email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
      setSubscribers(updatedSubscribers);
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Eroare la ștergerea abonatului. Vă rugăm să încercați din nou.');
    }
  };

  const handleToggleActive = (subscriber: Subscriber) => {
    try {
      const newActive = !subscriber.active;
      const updatedSubscribers = subscribers.map(s =>
        s.email === subscriber.email
          ? {
              ...s,
              active: newActive,
              unsubscribedAt: newActive ? undefined : new Date().toISOString()
            }
          : s
      );
      localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
      setSubscribers(updatedSubscribers);
    } catch (error) {
      console.error('Error toggling subscriber status:', error);
      alert('Eroare la actualizarea statusului. Vă rugăm să încercați din nou.');
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Data Abonării', 'Status', 'Data Dezabonării'],
      ...filteredSubscribers.map(s => [
        s.email,
        new Date(s.subscribedAt).toLocaleDateString('ro-RO'),
        s.active ? 'Activ' : 'Inactiv',
        s.unsubscribedAt ? new Date(s.unsubscribedAt).toLocaleDateString('ro-RO') : '-'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `abonati-newsletter-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredSubscribers = subscribers
    .filter(s => {
      if (filter === 'active') return s.active;
      if (filter === 'inactive') return !s.active;
      return true;
    })
    .filter(s => s.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.active).length,
    inactive: subscribers.filter(s => !s.active).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#a594f9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#b8b4d1]">Se încarcă abonații...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium text-[#a594f9] mb-2">Abonați Newsletter</h2>
          <p className="text-[#b8b4d1]">Gestionează lista de abonați la newsletter</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#9db098] hover:bg-[#8a9f87] text-[#1a1a2e] rounded-lg transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Exportă CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#2d2d50] border border-[#a594f9]/20 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-[#a594f9]" />
            <div>
              <p className="text-[#b8b4d1] text-sm">Total Abonați</p>
              <p className="text-2xl font-medium text-[#e8e6f7]">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2d2d50] border border-[#9db098]/20 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-[#9db098]" />
            <div>
              <p className="text-[#b8b4d1] text-sm">Activi</p>
              <p className="text-2xl font-medium text-[#e8e6f7]">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2d2d50] border border-[#ff5555]/20 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-[#ff5555]" />
            <div>
              <p className="text-[#b8b4d1] text-sm">Inactivi</p>
              <p className="text-2xl font-medium text-[#e8e6f7]">{stats.inactive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              filter === 'all'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#2d2d50] text-[#b8b4d1] hover:bg-[#3a3a5f]'
            }`}
          >
            Toți
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              filter === 'active'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#2d2d50] text-[#b8b4d1] hover:bg-[#3a3a5f]'
            }`}
          >
            Activi
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              filter === 'inactive'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#2d2d50] text-[#b8b4d1] hover:bg-[#3a3a5f]'
            }`}
          >
            Inactivi
          </button>
        </div>
        <input
          type="text"
          placeholder="Caută după email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-[#2d2d50] border border-[#a594f9]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a594f9] text-[#e8e6f7] placeholder-[#b8b4d1]"
        />
      </div>

      {/* Subscribers List */}
      {filteredSubscribers.length === 0 ? (
        <div className="bg-[#2d2d50] border border-[#a594f9]/20 rounded-xl p-12 text-center">
          <Mail className="w-16 h-16 text-[#a594f9]/30 mx-auto mb-4" />
          <p className="text-[#b8b4d1] text-lg">
            {searchTerm ? 'Nu s-au găsit abonați care să corespundă căutării.' : 'Nu există înc�� abonați.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#2d2d50] border border-[#a594f9]/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#242444]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#a594f9]">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#a594f9]">Data Abonării</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#a594f9]">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[#a594f9]">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a594f9]/10">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.email} className="hover:bg-[#242444]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#a594f9]" />
                        <span className="text-[#e8e6f7]">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#b8b4d1]">
                        <Calendar className="w-4 h-4" />
                        {new Date(subscriber.subscribedAt).toLocaleDateString('ro-RO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {subscriber.active ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#9db098]/20 text-[#9db098] rounded-full text-sm">
                          <CheckCircle className="w-3 h-3" />
                          Activ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff5555]/20 text-[#ff5555] rounded-full text-sm">
                          <XCircle className="w-3 h-3" />
                          Inactiv
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(subscriber)}
                          className="p-2 hover:bg-[#a594f9]/20 rounded-lg transition-colors"
                          title={subscriber.active ? 'Dezactivează' : 'Activează'}
                        >
                          {subscriber.active ? (
                            <XCircle className="w-4 h-4 text-[#ff5555]" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-[#9db098]" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.email)}
                          className="p-2 hover:bg-[#ff5555]/20 rounded-lg transition-colors"
                          title="Șterge"
                        >
                          <Trash2 className="w-4 h-4 text-[#ff5555]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}