import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { TrakteerFab } from '@/components/organisms/TrakteerFab'

// Template: kerangka halaman (header + area konten + footer).
// Polos (tanpa header/footer publik) untuk halaman /admin, ATAU saat dibuka
// dalam konteks admin (?admin=1) — di situ halaman render AdminTopbar sendiri.
export function MainLayout({ children }: { children: ReactNode }) {
  const location = useRouterState({ select: (s) => s.location })
  const bare =
    location.pathname.startsWith('/admin') ||
    Boolean((location.search as { admin?: boolean }).admin)

  if (bare) {
    return <main className="flex min-h-svh flex-col">{children}</main>
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <TrakteerFab />
    </div>
  )
}
