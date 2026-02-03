import { useState } from 'react';

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
  active: boolean;
}

export function Newsletter({ 
  title = "Abonează-te la Blog", 
  description = "Primește săptămânal articole noi despre sănătatea mentală și dezvoltarea personală direct în inbox.",
  className = ""
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Get existing subscribers from localStorage
      const subscribersJson = localStorage.getItem('newsletter_subscribers');
      const subscribers: Subscriber[] = subscribersJson ? JSON.parse(subscribersJson) : [];

      // Check if email is already subscribed
      const existingSubscriber = subscribers.find(s => s.email === email);

      if (existingSubscriber && existingSubscriber.active) {
        setSubmitStatus('error');
        setErrorMessage('Acest email este deja abonat la newsletter.');
        setIsSubmitting(false);
        return;
      }

      if (existingSubscriber && !existingSubscriber.active) {
        // Reactivate subscription
        const updatedSubscribers = subscribers.map(s =>
          s.email === email
            ? { ...s, active: true, subscribedAt: new Date().toISOString() }
            : s
        );
        localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
      } else {
        // Add new subscription
        const newSubscriber: Subscriber = {
          email,
          subscribedAt: new Date().toISOString(),
          active: true
        };
        subscribers.push(newSubscriber);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }

      setSubmitStatus('success');
      setEmail('');
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setErrorMessage('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-6 sm:p-8 text-center ${className}`}>
      <h3 className="font-medium text-[#a594f9] mb-4 text-base sm:text-lg">{title}</h3>
      <p className="text-[#b8b4d1] mb-6 max-w-md mx-auto text-sm sm:text-base">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="adresa@email.com"
            className="flex-1 px-4 py-3 bg-[#2d2d50] border border-[#a594f9]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a594f9] focus:border-transparent text-[#e8e6f7] placeholder-[#b8b4d1]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button 
            className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e] px-6 py-3 rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Se procesează...' : 'Abonează-te'}
          </button>
        </div>
        
        {submitStatus === 'success' && (
          <p className="text-[#9db098] text-sm">
            Te-ai abonat cu succes! Vei primi articolele noastre în inbox.
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="text-[#ff5555] text-sm">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}