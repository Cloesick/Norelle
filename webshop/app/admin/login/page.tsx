'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function AdminLoginPage() {
  const [userType, setUserType] = useState<'admin' | 'salesperson'>('admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication
    setTimeout(() => {
      if (userType === 'admin') {
        if (email === 'admin@norelle.com' && password === 'admin123') {
          // Store admin session
          localStorage.setItem('norell_admin_session', JSON.stringify({
            type: 'admin',
            email,
            name: 'Administrator',
            permissions: 'full'
          }))
          router.push('/admin/dashboard')
        } else {
          setError('Invalid admin credentials')
        }
      } else {
        if (email === 'sales@norelle.com' && password === 'sales123') {
          // Store salesperson session
          localStorage.setItem('norell_admin_session', JSON.stringify({
            type: 'salesperson',
            email,
            name: 'Sales Representative',
            permissions: 'sales'
          }))
          router.push('/sales/dashboard')
        } else {
          setError('Invalid salesperson credentials')
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-norelle-cream mb-2">
            Norelle
          </h1>
          <p className="text-norelle-text-muted">
            {userType === 'admin' ? 'Administrator' : 'Salesperson'} Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8">
          {/* User Type Toggle */}
          <div className="flex mb-6 bg-norelle-burgundy rounded-lg p-1">
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                userType === 'admin'
                  ? 'bg-norelle-cream text-norelle-burgundy'
                  : 'text-norelle-text-muted hover:text-norelle-cream'
              }`}
            >
              Administrator
            </button>
            <button
              onClick={() => setUserType('salesperson')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                userType === 'salesperson'
                  ? 'bg-norelle-cream text-norelle-burgundy'
                  : 'text-norelle-text-muted hover:text-norelle-cream'
              }`}
            >
              Salesperson
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-norelle-cream mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-norelle-burgundy border border-norelle-border rounded-md text-norelle-cream placeholder-norelle-text-muted focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
                placeholder={userType === 'admin' ? 'admin@norelle.com' : 'sales@norelle.com'}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-norelle-cream mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-norelle-burgundy border border-norelle-border rounded-md text-norelle-cream placeholder-norelle-text-muted focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent pr-12"
                  placeholder={userType === 'admin' ? 'admin123' : 'sales123'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-norelle-text-muted hover:text-norelle-cream"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-800/30 rounded-md p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-norelle-burgundy/50 rounded-md">
            <p className="text-xs text-norelle-text-muted mb-2">Demo Credentials:</p>
            <div className="text-xs text-norelle-text-muted space-y-1">
              <p><strong>Admin:</strong> admin@norelle.com / admin123</p>
              <p><strong>Sales:</strong> sales@norelle.com / sales123</p>
            </div>
          </div>
        </div>

        {/* Back to Store */}
        <div className="text-center mt-6">
          <Link 
            href="/"
            className="text-norelle-text-muted hover:text-norelle-cream text-sm transition-colors duration-200"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
