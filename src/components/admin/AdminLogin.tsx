import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../utils/supabase/auth';
import { toast } from 'sonner@2.0.3';

interface AdminLoginProps {
  onLoginSuccess: (isFirstLogin: boolean) => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginAdmin({ email, password });

      if (response.success && response.user) {
        toast.success('Autentificare reușită!');
        onLoginSuccess(response.isFirstLogin || false);
      } else {
        setError(response.error || 'Eroare la autentificare');
        toast.error(response.error || 'Eroare la autentificare');
      }
    } catch (err) {
      setError('A apărut o eroare neașteptată');
      toast.error('A apărut o eroare neașteptată');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a594f9] to-[#9db098] mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            CMS Admin
          </h1>
          <p className="text-[#e8e6f7]/70">
            Autentifică-te pentru a accesa panoul de administrare
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#1a1a1a] border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@molnartimeanoemi.ro"
                required
                disabled={isLoading}
                className="bg-[#0a0a0a] border-white/20 text-white h-12"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Parolă
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="bg-[#0a0a0a] border-white/20 text-white h-12"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#a594f9] to-[#9db098] hover:from-[#a594f9]/90 hover:to-[#9db098]/90 text-white h-12 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Se autentifică...
                </>
              ) : (
                'Autentifică-te'
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-white/60 text-sm">
              Credențiale implicite:<br />
              <span className="text-white/80 font-mono">admin@molnartimeanoemi.ro</span><br />
              <span className="text-white/80 font-mono">admin123</span>
            </p>
            <p className="text-center text-white/50 text-xs mt-2">
              Vei fi solicitat să schimbi parola după prima autentificare
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            © 2026 Molnár Timea Noemi. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </div>
  );
}
