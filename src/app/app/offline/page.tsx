import Link from 'next/link'

export const metadata = {
  title: "You're Offline | IAMA Annual Meeting",
}

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 text-center shadow-lg ring-1 ring-slate-100">
        {/* Teal icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-teal-600"
            aria-hidden="true"
          >
            <path d="M3 3l18 18" />
            <path d="M8.56 2.75c4.37-1.48 9.5.03 12.17 3.54a6.49 6.49 0 0 1-.22 8.28M3.69 12.09A6.49 6.49 0 0 1 6.3 6.43" />
            <path d="M10.71 5.05A7 7 0 0 1 19 12c0 .9-.17 1.76-.48 2.56M6.5 17.5A7 7 0 0 0 19 12" />
            <circle cx={12} cy={20} r={1} />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-slate-800">You&rsquo;re offline</h1>

        <p className="mb-8 text-sm leading-relaxed text-slate-500">
          The schedule you&rsquo;ve already viewed is available. Reconnect to
          load the rest.
        </p>

        <Link
          href="/app"
          className="inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Back to app
        </Link>
      </div>
    </main>
  )
}
