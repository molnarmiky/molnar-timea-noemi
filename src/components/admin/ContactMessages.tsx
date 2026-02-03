import { useState, useEffect } from 'react';
import { Mail, Trash2, Check, Eye, EyeOff, Search } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      setIsLoading(true);
      const storedMessages = localStorage.getItem('cms_contact_messages');
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        // Convertim formatul din localStorage la formatul așteptat
        const formatted = parsedMessages.map((msg: any) => ({
          id: msg.id,
          name: msg.name,
          email: msg.email,
          phone: msg.phone || '',
          subject: '', // Nu avem subject în formular
          message: msg.message,
          timestamp: msg.createdAt || new Date().toISOString(),
          read: msg.read || false
        }));
        setMessages(formatted);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('cms_contact_messages') || '[]');
      const updated = storedMessages.map((msg: any) => 
        msg.id === id ? { ...msg, read: true } : msg
      );
      localStorage.setItem('cms_contact_messages', JSON.stringify(updated));
      loadMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const markAsUnread = (id: string) => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('cms_contact_messages') || '[]');
      const updated = storedMessages.map((msg: any) => 
        msg.id === id ? { ...msg, read: false } : msg
      );
      localStorage.setItem('cms_contact_messages', JSON.stringify(updated));
      loadMessages();
    } catch (error) {
      console.error('Error marking message as unread:', error);
    }
  };

  const deleteMessage = (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest mesaj?')) {
      return;
    }

    try {
      const storedMessages = JSON.parse(localStorage.getItem('cms_contact_messages') || '[]');
      const filtered = storedMessages.filter((msg: any) => msg.id !== id);
      localStorage.setItem('cms_contact_messages', JSON.stringify(filtered));
      loadMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterRead === 'all' ? true :
      filterRead === 'read' ? msg.read :
      !msg.read;

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#a594f9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#e8e6f7] mb-2">
          Mesaje de Contact
        </h1>
        <p className="text-[#b8b4d1]">
          Gestionează mesajele primite de la vizitatori
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#a594f9]/20 rounded-lg flex items-center justify-center">
              <Mail className="text-[#a594f9]" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#e8e6f7]">{messages.length}</p>
              <p className="text-sm text-[#b8b4d1]">Total Mesaje</p>
            </div>
          </div>
        </div>

        <div className="bg-[#242444] border border-[#9db098]/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9db098]/20 rounded-lg flex items-center justify-center">
              <Eye className="text-[#9db098]" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#e8e6f7]">{unreadCount}</p>
              <p className="text-sm text-[#b8b4d1]">Necitite</p>
            </div>
          </div>
        </div>

        <div className="bg-[#242444] border border-[#c4b5fd]/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c4b5fd]/20 rounded-lg flex items-center justify-center">
              <Check className="text-[#c4b5fd]" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#e8e6f7]">{messages.length - unreadCount}</p>
              <p className="text-sm text-[#b8b4d1]">Citite</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={20} />
          <input
            type="text"
            placeholder="Caută după nume, email sau mesaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#242444] border border-[#a594f9]/20 rounded-xl text-[#e8e6f7] placeholder-[#b8b4d1] focus:outline-none focus:border-[#a594f9]/50"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterRead('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'all'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#242444] text-[#b8b4d1] border border-[#a594f9]/20 hover:border-[#a594f9]/50'
            }`}
          >
            Toate
          </button>
          <button
            onClick={() => setFilterRead('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'unread'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#242444] text-[#b8b4d1] border border-[#a594f9]/20 hover:border-[#a594f9]/50'
            }`}
          >
            Necitite ({unreadCount})
          </button>
          <button
            onClick={() => setFilterRead('read')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'read'
                ? 'bg-[#a594f9] text-[#1a1a2e]'
                : 'bg-[#242444] text-[#b8b4d1] border border-[#a594f9]/20 hover:border-[#a594f9]/50'
            }`}
          >
            Citite
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 bg-[#242444] border border-[#a594f9]/20 rounded-xl">
            <Mail className="w-16 h-16 text-[#b8b4d1] mx-auto mb-4 opacity-50" />
            <p className="text-[#b8b4d1] text-lg">
              {searchTerm || filterRead !== 'all' ? 'Nu există mesaje care să corespundă filtrelor.' : 'Nu există mesaje încă.'}
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-[#242444] border rounded-xl p-6 transition-all ${
                msg.read
                  ? 'border-[#a594f9]/20 opacity-75'
                  : 'border-[#9db098] shadow-lg shadow-[#9db098]/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-[#e8e6f7]">{msg.name}</h3>
                    {!msg.read && (
                      <span className="px-2 py-1 bg-[#9db098]/20 text-[#9db098] text-xs rounded-full">
                        Nou
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-[#b8b4d1]">
                    <p className="flex items-center gap-2">
                      <Mail size={14} />
                      <a href={`mailto:${msg.email}`} className="hover:text-[#a594f9] transition-colors">
                        {msg.email}
                      </a>
                    </p>
                    {msg.phone && (
                      <p className="flex items-center gap-2">
                        <span>📞</span>
                        <a href={`tel:${msg.phone}`} className="hover:text-[#a594f9] transition-colors">
                          {msg.phone}
                        </a>
                      </p>
                    )}
                    <p className="text-xs text-[#9db098]">
                      {new Date(msg.timestamp).toLocaleString('ro-RO', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {msg.read ? (
                    <button
                      onClick={() => markAsUnread(msg.id)}
                      className="p-2 bg-[#242444] border border-[#a594f9]/20 rounded-lg text-[#b8b4d1] hover:text-[#a594f9] hover:border-[#a594f9]/50 transition-colors"
                      title="Marchează ca necitit"
                    >
                      <EyeOff size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="p-2 bg-[#9db098]/20 border border-[#9db098] rounded-lg text-[#9db098] hover:bg-[#9db098] hover:text-[#1a1a2e] transition-colors"
                      title="Marchează ca citit"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 bg-[#242444] border border-[#ff5555]/20 rounded-lg text-[#ff5555] hover:bg-[#ff5555] hover:text-[#1a1a2e] transition-colors"
                    title="Șterge mesajul"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#a594f9]/10">
                <p className="text-[#e8e6f7] whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}