import { useState, useEffect } from 'react';
import { Mail, Save, Check, AlertCircle } from 'lucide-react';

export function EmailSettings() {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadEmailConfig();
  }, []);

  const loadEmailConfig = () => {
    try {
      const savedEmail = localStorage.getItem('email_recipient');
      setRecipientEmail(savedEmail || 'timeanoemi@gmail.com'); // Default email
    } catch (error) {
      console.error('Error loading email config:', error);
      setErrorMessage('Nu s-au putut încărca setările email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setSaveStatus('error');
      setErrorMessage('Vă rugăm să introduceți o adresă de email validă');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      localStorage.setItem('email_recipient', recipientEmail);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setErrorMessage('Nu s-au putut salva setările. Vă rugăm să încercați din nou.');
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
            <span>Această adresă este folosită doar pentru referință locală</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Mesajele de contact sunt salvate în localStorage și pot fi vizualizate în secțiunea "Messages"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Abonații la newsletter sunt gestionați în secțiunea "Subscribers"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#9db098] mt-1">•</span>
            <span>Toate datele sunt stocate local în browser și nu necesită conexiune backend</span>
          </li>
        </ul>
      </div>
    </div>
  );
}