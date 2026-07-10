import { Link, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { Button } from '@/components/atoms/Button'
import { KodeinLogo } from '@/components/atoms/KodeinLogo'
import logoutUser from '@/api/auth/logoutUser'

// Organism: topbar khusus halaman /admin (login tidak memakainya).
export function AdminTopbar() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = async () => {
    await logoutUser() // revoke refresh token di server + bersihkan token lokal
    queryClient.clear()
    navigate({ to: '/admin/login' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-deep/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2 text-lg font-bold text-foam">
          <KodeinLogo className="h-9 w-auto" />
          boy<span className="text-surf">Code</span>
          <span className="ml-1 rounded-md bg-surf/10 px-2 py-0.5 text-xs font-medium text-surf">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className="hidden items-center gap-1.5 text-mist hover:text-surf sm:flex"
          >
            Lihat situs <FaArrowUpRightFromSquare className="h-3 w-3" />
          </Link>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
