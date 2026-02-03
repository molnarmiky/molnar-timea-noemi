import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { X, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { changeAdminPassword } from '../../utils/supabase/auth';
import { toast } from 'sonner@2.0.3';

interface ChangePasswordModalProps {
  userId: string;
  isFirstLogin: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ChangePasswordModal({ 
  userId, 
  isFirstLogin, 
  onClose, 
  onSuccess 
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Parola trebuie să conțină minim 8 caractere';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Parola trebuie să conțină cel puțin o literă mare';
    }
    if (!/[a-z]/.test(password)) {
      return 'Parola trebuie să conțină cel puțin o literă mică';
    }
    if (!/[0-9]/.test(password)) {
      return 'Parola trebuie să conțină cel puțin o cifră';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    // Validate password strength
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await changeAdminPassword(userId, {
        currentPassword,
        newPassword
      });

      if (response.success) {
        toast.success('Parola a fost schimbată cu succes!');
        onSuccess();
      } else {
        setError(response.error || 'Eroare la schimbarea parolei');
        toast.error(response.error || 'Eroare la schimbarea parolei');
      }
    } catch (err) {
      setError('A apărut o eroare neașteptată');
      toast.error('A apărut o eroare neașteptată');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#a594f9]/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#a594f9]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isFirstLogin ? 'Schimbă Parola' : 'Actualizează Parola'}
              </h2>
              <p className="text-sm text-white/60">
                {isFirstLogin 
                  ? 'Te rugăm să îți schimbi parola implicită' 
                  : 'Creează o parolă nouă și sigură'}
              </p>
            </div>
          </div>
          {!isFirstLogin && (
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* First Login Warning */}
        {isFirstLogin && (
          <div className="mb-6 bg-[#d4a574]/10 border border-[#d4a574]/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#d4a574]">
              <p className="font-semibold mb-1">Schimbă parola implicită</p>
              <p>Pentru securitatea contului tău, te rugăm să îți schimbi parola înainte de a continua.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Current Password */}
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium text-white">
              Parola curentă
            </label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Introdu parola curentă"
              required
              disabled={isLoading}
              className="bg-[#0a0a0a] border-white/20 text-white h-12"
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium text-white">
              Parolă nouă
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Introdu parola nouă"
              required
              disabled={isLoading}
              className="bg-[#0a0a0a] border-white/20 text-white h-12"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
              Confirmă parola nouă
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmă parola nouă"
              required
              disabled={isLoading}
              className="bg-[#0a0a0a] border-white/20 text-white h-12"
            />
          </div>

          {/* Password Requirements */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-white mb-2">Parola trebuie să conțină:</p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${newPassword.length >= 8 ? 'text-[#9db098]' : 'text-white/30'}`} />
                <span className={newPassword.length >= 8 ? 'text-white/90' : 'text-white/50'}>
                  Minim 8 caractere
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${/[A-Z]/.test(newPassword) ? 'text-[#9db098]' : 'text-white/30'}`} />
                <span className={/[A-Z]/.test(newPassword) ? 'text-white/90' : 'text-white/50'}>
                  O literă mare (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${/[a-z]/.test(newPassword) ? 'text-[#9db098]' : 'text-white/30'}`} />
                <span className={/[a-z]/.test(newPassword) ? 'text-white/90' : 'text-white/50'}>
                  O literă mică (a-z)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${/[0-9]/.test(newPassword) ? 'text-[#9db098]' : 'text-white/30'}`} />
                <span className={/[0-9]/.test(newPassword) ? 'text-white/90' : 'text-white/50'}>
                  O cifră (0-9)
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {!isFirstLogin && (
              <Button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/5"
              >
                Anulează
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className={`${isFirstLogin ? 'w-full' : 'flex-1'} bg-gradient-to-r from-[#a594f9] to-[#9db098] hover:from-[#a594f9]/90 hover:to-[#9db098]/90 text-white h-12 font-semibold`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Se salvează...
                </>
              ) : (
                'Schimbă Parola'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
