'use client'

/* eslint-disable react-hooks/set-state-in-effect --
   iOS / standalone / service-worker detection is browser-only and must run
   after mount; deriving it during render would cause a hydration mismatch. */

import { useEffect, useState } from 'react'

// The BeforeInstallPromptEvent is not yet in lib.dom.d.ts
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWARegister() {
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
    setIsIOS(ios)

    // Detect standalone (already installed)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .catch((err) => console.error('[PWA] SW registration failed:', err))
    }

    // Capture install prompt for Android/desktop
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Check if dismissed previously in this session
    const wasDismissed = sessionStorage.getItem('pwa-hint-dismissed') === '1'
    if (wasDismissed) setDismissed(true)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setInstallPrompt(null)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('pwa-hint-dismissed', '1')
  }

  // Don't render if already installed or user dismissed the hint
  if (isStandalone || dismissed) return null

  // Don't render if there's nothing actionable to show
  if (!installPrompt && !isIOS) return null

  return (
    <div
      className="fixed inset-x-4 z-50 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-teal-200"
      style={{ bottom: '5rem' }}
      role="banner"
      aria-label="Install app hint"
    >
      {/* Teal accent bar */}
      <div className="h-8 w-1 flex-none rounded-full bg-teal-600" aria-hidden="true" />

      <div className="flex min-w-0 flex-1 flex-col">
        {isIOS ? (
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-teal-700">Install IAMA:</span> tap{' '}
            <span className="font-medium">Share</span> then{' '}
            <span className="font-medium">&ldquo;Add to Home Screen&rdquo;</span>
          </p>
        ) : (
          <button
            onClick={handleInstall}
            className="self-start rounded-lg bg-teal-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Install app
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="flex-none rounded-md p-1 text-slate-400 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        aria-label="Dismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  )
}
