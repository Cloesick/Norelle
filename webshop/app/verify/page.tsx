'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Step = 'email' | 'code' | 'success'

export default function VerifyPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setStep('code')
      setCountdown(600) // 10 minutes
      // Focus first code input after transition
      setTimeout(() => inputRefs.current[0]?.focus(), 300)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeInput = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return

    const next = [...code]
    next[index] = value.toUpperCase()
    setCode(next)

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6)
    if (!pasted) return

    const next = [...code]
    for (let i = 0; i < pasted.length && i < 6; i++) {
      next[i] = pasted[i]
    }
    setCode(next)

    // Focus appropriate input
    const focusIndex = Math.min(pasted.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      setError('Please enter the full 6-character code.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/verify/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setStep('success')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return
    setError('')
    setLoading(true)
    setCode(['', '', '', '', '', ''])

    try {
      const res = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setCountdown(600)
      inputRefs.current[0]?.focus()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="font-display font-light text-3xl text-norelle-cream tracking-wide">Nor&#x0113;lle</h1>
            <p className="text-norelle-cream/40 text-xs tracking-[0.2em] uppercase mt-1 font-body font-light">
              for those we live with
            </p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-norelle-mocha border border-norelle-cream/10 p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="font-body font-light text-lg text-norelle-cream uppercase tracking-brand mb-3">Verify Your Email</h2>
                <p className="text-norelle-cream/50 text-xs font-light mb-6">
                  Enter your email address and we&apos;ll send you a 6-character verification code.
                </p>

                <form onSubmit={handleSendCode} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-norelle-cream/60 text-xs font-body font-light uppercase tracking-brand mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full input-field text-sm"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="btn-primary w-full text-xs"
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </button>
                </form>

                <p className="text-norelle-cream/30 text-xs text-center mt-6 font-light">
                  We&apos;ll never share your email. Read our{' '}
                  <Link href="/privacy" className="text-norelle-cream/50 hover:text-norelle-cream">Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* Step 2: Code Entry */}
            {step === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="font-body font-light text-lg text-norelle-cream uppercase tracking-brand mb-3">Enter Code</h2>
                <p className="text-norelle-cream/50 text-xs font-light mb-1">
                  We sent a 6-character code to
                </p>
                <p className="text-norelle-cream/70 text-xs font-light mb-6">{email}</p>

                <form onSubmit={handleVerify} className="space-y-6">
                  {/* Code inputs */}
                  <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el }}
                        type="text"
                        inputMode="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeInput(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        className="w-12 h-14 text-center text-lg font-body font-light bg-transparent border-b border-norelle-cream/20 text-norelle-cream focus:outline-none focus:border-norelle-cream transition-colors duration-300"
                        aria-label={`Digit ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Countdown */}
                  {countdown > 0 && (
                    <p className="text-norelle-cream/40 text-xs text-center font-light">
                      Code expires in <span className="text-norelle-cream/60 font-body">{formatCountdown(countdown)}</span>
                    </p>
                  )}

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || code.join('').length !== 6}
                    className="btn-primary w-full text-xs"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </form>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); setError('') }}
                    className="text-norelle-cream/40 text-xs font-light hover:text-norelle-cream transition-colors duration-300"
                  >
                    ← Change email
                  </button>
                  <button
                    onClick={handleResend}
                    disabled={countdown > 0 || loading}
                    className="text-norelle-cream/50 text-xs font-light hover:text-norelle-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Resend code
                  </button>
                </div>

                {/* Dev helper — shows the code in the server console */}
                <p className="text-norelle-cream/20 text-[10px] text-center mt-4 font-light">
                  (Dev mode: check your terminal for the verification code)
                </p>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 border border-norelle-cream/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-norelle-cream/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-body font-light text-lg text-norelle-cream uppercase tracking-brand mb-3">Email Verified</h2>
                <p className="text-norelle-cream/50 text-xs font-light mb-6">
                  Your email <span className="text-norelle-cream/70">{email}</span> has been successfully verified.
                </p>
                <Link
                  href="/"
                  className="btn-primary text-xs inline-block"
                >
                  Continue to Nor&#x0113;lle
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-norelle-cream/20 text-[11px] text-center mt-8 font-light">
          &copy; {new Date().getFullYear()} Nor&#x0113;lle. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
