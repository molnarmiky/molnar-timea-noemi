import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useNewCMS } from '../../contexts/NewCMSContext';

interface PasswordChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isRequired?: boolean;
}

export function PasswordChangeDialog({ isOpen, onClose, isRequired = false }: PasswordChangeDialogProps) {
  const { changePassword } = useNewCMS();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setError('Parola trebuie să aibă minimum 8 caractere');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Parolele nu se potrivesc');
      return false;
    }
    if (newPassword === currentPassword) {
      setError('Parola nouă trebuie să fie diferită de cea curentă');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          resetForm();
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Eroare la schimbarea parolei');
      }
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm încercați din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#242444] rounded-2xl shadow-2xl border border-[#a594f9]/20 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#a594f9]/20 to-[#9b86f5]/20 border-b border-[#a594f9]/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#a594f9]/20 rounded-lg">
              <Lock className="text-[#a594f9]" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#e8e6f7]">
                {isRequired ? 'Schimbă Parola (Obligatoriu)' : 'Schimbă Parola'}
              </h2>
              <p className="text-sm text-[#b8b4d1]">
                {isRequired ? 'Prima autentificare necesită schimbarea parolei' : 'Actualizează-ți parola de acces'}
              </p>
            </div>
          </div>
          {!isRequired && (
            <button
              onClick={() => { resetForm(); onClose(); }}
              className="text-[#b8b4d1] hover:text-[#e8e6f7] transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-2">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-green-200 text-sm">Parola a fost schimbată cu succes!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Parola Curentă
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={18} />
                <input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                  required
                  disabled={isLoading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8b4d1] hover:text-[#a594f9] transition-colors"
                  disabled={isLoading || success}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Parolă Nouă
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={18} />
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                  required
                  disabled={isLoading || success}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8b4d1] hover:text-[#a594f9] transition-colors"
                  disabled={isLoading || success}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-[#b8b4d1] mt-1">Minimum 8 caractere</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Confirmă Parola Nouă
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={18} />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                  required
                  disabled={isLoading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8b4d1] hover:text-[#a594f9] transition-colors"
                  disabled={isLoading || success}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              {!isRequired && (
                <button
                  type="button"
                  onClick={() => { resetForm(); onClose(); }}
                  disabled={isLoading || success}
                  className="flex-1 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 text-[#e8e6f7] font-medium rounded-lg hover:bg-[#242444] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anulează
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading || success}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] hover:from-[#9b86f5] hover:to-[#8f78f0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-[#a594f9]/20 hover:shadow-[#a594f9]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Se schimbă...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Succes!</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Schimbă Parola</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
