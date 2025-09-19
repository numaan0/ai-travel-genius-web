'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.ok) {
        router.push('/');
      } else {
        setError('Registration successful but sign-in failed. Please try signing in manually.');
      }

    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="max-w-md mx-auto pt-20">
        {/* Back Button */}
        <Link 
          href="/"
          className="absolute top-4 left-4 text-white/60 hover:text-white p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Join AI Travel Genius
            </h1>
            <p className="text-blue-200">Create your account and start planning amazing trips!</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                <User className="h-5 w-5 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                <Mail className="h-5 w-5 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                <Lock className="h-5 w-5 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                <Lock className="h-5 w-5 inline mr-2" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl font-bold text-lg shadow-2xl disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="h-5 w-5 inline mr-2" />
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="relative mb-6">
            <hr className="border-white/20" />
            <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 text-white text-sm">
              OR
            </span>
          </div>

          <motion.button
            onClick={() => signIn('google')}
            className="w-full bg-white text-gray-800 p-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition-colors mb-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 inline mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </motion.button>

          <div className="text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
