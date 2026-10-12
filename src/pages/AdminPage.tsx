import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Lock, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

export const AdminPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch(API_ENDPOINTS.adminLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setStatus('Authentication Successful. Session established.');
      } else {
        setStatus(data.error || 'Authorization Denied: Invalid Credentials');
      }
    } catch {
      setStatus('Network unreachable or invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] pt-32 pb-20 flex items-center justify-center bg-[#0a0a0a]">
      <div className="max-w-md w-full px-4">
        <Card variant="raised" padding="lg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              VPD Administrative Portal
            </h1>
            <p className="text-xs text-[#888888] mt-1">
              Internal management gate for services, portfolio, blogs, and inquiries.
            </p>
          </div>

          {status && (
            <div
              className={`mb-6 p-3 rounded-xl text-xs font-mono ${
                status.includes('Successful')
                  ? 'bg-green-950/40 border border-green-800 text-green-300'
                  : 'bg-red-950/40 border border-red-800 text-red-300'
              }`}
            >
              {status}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                Operator Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_id"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none"
                />
                <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                Access Token / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none"
                />
                <Shield className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="md"
              fullWidth
              className="mt-2"
            >
              {isLoading ? 'Verifying Credentials...' : 'Authenticate Operator'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#222222] text-center">
            <Link to="/" className="text-xs text-[#888888] hover:text-white transition-colors">
              Return to Public Website
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
