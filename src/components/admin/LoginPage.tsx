import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert } from '../ui/alert';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

export function LoginPage() {
  const { login } = useCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#a594f9] rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-[#1a1a2e]" />
          </div>
          <h1 className="text-3xl font-medium text-[#e8e6f7] mb-2">
            CMS Admin
          </h1>
          <p className="text-[#b8b4d1]">
            Molnar Timea Noemi - Cabinet consiliere și dezvoltare personală
          </p>
        </div>

        <Card className="bg-[#242444] border-[#a594f9]/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="bg-[#f87171]/10 border-[#f87171]/20 text-[#f87171]">
                {error}
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#e8e6f7]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b8b4d1] w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7] placeholder-[#b8b4d1] focus:border-[#a594f9]"
                  placeholder="admin@molnartimeanoemi.ro"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#e8e6f7]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b8b4d1] w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7] placeholder-[#b8b4d1] focus:border-[#a594f9]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b8b4d1] hover:text-[#e8e6f7]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] font-medium py-2 h-11"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#a594f9]/20">
            <div className="bg-[#2d2d50] rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#a594f9] mb-2">Demo Credentials</h3>
              <p className="text-xs text-[#b8b4d1] mb-1">
                <strong>Email:</strong> admin@molnartimeanoemi.ro
              </p>
              <p className="text-xs text-[#b8b4d1]">
                <strong>Password:</strong> admin123
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-[#9db098]">
            Content Management System for Psychology Practice
          </p>
        </div>
      </div>
    </div>
  );
}