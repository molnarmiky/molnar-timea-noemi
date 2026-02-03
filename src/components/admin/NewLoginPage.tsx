import { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNewCMS } from '../../contexts/NewCMSContext';
import logo from 'figma:asset/cf4267bdb822a155ad9fde12895a0375974e88f7.png';

export function NewLoginPage() {
  const { login } = useNewCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.error || 'Autentificare eșuată');
      }
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm încercați din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#242444] to-[#1a1a2e] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #a594f9 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
            Admin CMS
          </h1>
          <p className="text-[#b8b4d1]">
            Molnar Timea Noemi - Psihologie
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#242444] rounded-2xl shadow-2xl border border-[#a594f9]/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#a594f9]/10 rounded-xl">
              <Shield className="text-[#a594f9]" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#e8e6f7]">
                Autentificare
              </h2>
              <p className="text-sm text-[#b8b4d1]">
                Accesează panoul de administrare
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent transition-all"
                  placeholder="admin@molnartimeanoemi.ro"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Parolă
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b8b4d1]" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8b4d1] hover:text-[#a594f9] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] hover:from-[#9b86f5] hover:to-[#8f78f0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-[#a594f9]/20 hover:shadow-[#a594f9]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Autentificare...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Autentifică-te</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#a594f9]/10 border border-[#a594f9]/20 rounded-lg">
            <p className="text-xs text-[#b8b4d1] text-center">
              💡 Prima autentificare va solicita schimbarea parolei
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-[#b8b4d1]">
          <p>&copy; 2025 Molnar Timea Noemi. Toate drepturile rezervate.</p>
        </div>
      </div>
    </div>
  );
}
