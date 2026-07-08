import { Link } from '@tanstack/react-router'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from '@/components/molecules/NavLink'
import { WhaleLogo } from '@/components/atoms/WhaleLogo'
import { useToggle } from '@/hooks/useToggle'

// Organism: header sticky dengan blur di atas laut.
// Desktop: nav inline. Mobile: nav collapse jadi menu hamburger.
export function Header() {
  const [open, toggle] = useToggle(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-deep/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => open && toggle()}
          className="flex shrink-0 items-center gap-2 text-lg font-bold text-foam"
        >
          <WhaleLogo className="h-9 w-auto" />
          paiss<span className="text-surf">Paus</span>.
        </Link>

        {/* Nav desktop */}
        <nav className="hidden gap-6 text-sm sm:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/materials">Materi</NavLink>
          <NavLink to="/projects">Let's Try</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Menu"
          aria-expanded={open}
          className="text-foam sm:hidden"
        >
          {open ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu dropdown (mobile) */}
      {open && (
        <nav className="flex flex-col border-t border-line bg-deep px-6 py-2 text-sm sm:hidden">
          <NavLink to="/" onClick={toggle} className="py-2">
            Home
          </NavLink>
          <NavLink to="/materials" onClick={toggle} className="py-2">
            Materi
          </NavLink>
          <NavLink to="/projects" onClick={toggle} className="py-2">
            Let's Try
          </NavLink>
          <NavLink to="/about" onClick={toggle} className="py-2">
            About
          </NavLink>
        </nav>
      )}
    </header>
  )
}
