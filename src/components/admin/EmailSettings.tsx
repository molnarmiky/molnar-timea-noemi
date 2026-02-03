import { useState, useEffect } from 'react';
import { Mail, Save, Check, AlertCircle } from 'lucide-react';

export function EmailSettings() {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEmailConfig();
  }, []);

  const fetchEmailConfig = async () => {
    try {
      const response = await fetch('/make-server-976c2dfb/config/email');
      const data = await response.json();
      setRecipientEmail(data.recipientEmail || '');
    } catch (error) {
      console.error('Error fetching email config:', error);
      setErrorMessage('Nu s-au putut încărca setările email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setSaveStatus('error');
      setErrorMessage('Vă rugăm să introduceți o adresă de email validă');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/make-server-976c2dfb/config/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setErrorMessage(data.error || 'Nu s-au putut salva setările');
      }
    } catch (error) {
      setSaveStatus('error');
      setErrorMessage('Eroare de rețea. Verificați conexiunea.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a594f9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#e8e6f7] mb-2">
          Setări Email
        </h1>
        <p className="text-[#b8b4d1]">
          Configurează adresa de email pentru primirea mesajelor de contact și notificări abonați
        </p>
      </div>

      <div className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="recipientEmail" className="flex items-center gap-2 text-[#e8e6f7] font-medium mb-3">
              <Mail size={20} className="text-[#a594f9]" />
              Adresa Email Destinatar
            </label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2d2d50] border border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent text-[#e8e6f7] placeholder-[#b8b4d1]"
              placeholder="admin@molnartimeanoemi.ro"
            />
            <p className="text-sm text-[#b8b4d1] mt-2">
              Această adresă va primi toate mesajele de contact și notificările despre abonații noi.
            </p>
          </div>

          <div className="pt-4 border-t border-[#a594f9]/20">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-6 py-3 rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1a1a2e]"></div>
                  <span>Se salvează...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvează Setările</span>
                </>
              )}
            </button>
          </div>

          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 text-[#9db098] bg-[#9db098]/10 border border-[#9db098]/20 rounded-xl p-4">
              <Check size={20} />
              <span>Setările au fost salvate cu succes!</span>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 text-[#ff5555] bg-[#ff5555]/10 border border-[#ff5555]/20 rounded-xl p-4">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#2d2d50] border border-[#9db098]/20 rounded-2xl p-6">
        <h3 className="text-[#9db098] font-medium mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          Informații Importante
        </h3>
        <ul className="space-y-2 text-sm text-[#b8b4d1]">
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Asigură-te că serviciul Resend este configurat corect în setările Supabase</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Toate mesajele de contact vor fi trimise automat la această adresă</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Vei primi notificări când cineva se abonează la newsletter</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Mesajele sunt stocate și în baza de date pentru referință ulterioară</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
