import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import {
  FaArrowRight,
  FaBookOpen,
  FaClock,
  FaCode,
  FaFolderOpen,
  FaLayerGroup,
  FaListCheck,
  FaPen,
  FaPenToSquare,
  FaTrash,
} from 'react-icons/fa6'
import { AdminTopbar } from '@/components/organisms/AdminTopbar'
import { useMaterials } from '@/api/materials/useMaterials'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/admin/create_materi')({
  // Guard: tanpa token, lempar ke login.
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      throw redirect({ to: '/admin/login' })
    }
  },
  component: Dashboard,
})

// Aksi dashboard. `to` diisi kalau fiturnya sudah siap; sisanya tampil "Segera".
const ACTIONS = [
  {
    title: 'Tulis Materi',
    desc: 'Kanvas menulis ala blog — bersih, mengalir, langsung terbit.',
    Icon: FaPen,
    to: '/admin/materials/new' as const,
  },
  {
    title: 'Kelola Materi',
    desc: 'Edit atau hapus materi yang sudah terbit.',
    Icon: FaListCheck,
  },
  {
    title: 'Tambah Project',
    desc: 'Publikasikan template atau repo ke halaman Tools.',
    Icon: FaCode,
  },
  {
    title: 'Kelola Project',
    desc: 'Perbarui atau hapus project di halaman Tools.',
    Icon: FaFolderOpen,
  },
]

function Dashboard() {
  const { data, isLoading } = useMaterials()
  const materials = data ?? []
  const categoryCount = new Set(materials.map((m) => m.category)).size
  const recent = materials.slice(0, 5) // server sudah urut terbaru

  const stats = [
    { label: 'Total Materi', value: isLoading ? '…' : materials.length, Icon: FaBookOpen },
    { label: 'Kategori', value: isLoading ? '…' : categoryCount, Icon: FaLayerGroup },
    {
      label: 'Materi terbaru',
      value: isLoading ? '…' : recent[0] ? formatDate(recent[0].date) : '—',
      Icon: FaClock,
    },
  ]

  return (
    <div className="flex min-h-svh flex-col">
      <AdminTopbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <h1 className="text-3xl font-bold text-foam">Dashboard Admin</h1>
        <p className="mt-1 text-mist">Mau menambahkan apa hari ini?</p>

        {/* Statistik */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl border border-line bg-tide/50 p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surf/10 text-surf">
                <s.Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-2xl font-bold text-foam">{s.value}</p>
                <p className="text-sm text-mist">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Aksi cepat */}
        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-mist">
          Aksi cepat
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ACTIONS.map((a) =>
            a.to ? (
              <Link
                key={a.title}
                to={a.to}
                className="group rounded-2xl border border-line bg-tide/60 p-6 transition-colors hover:border-surf/50 hover:bg-tide"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surf/10 text-surf">
                  <a.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-foam group-hover:text-surf">
                  {a.title}
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-1 text-sm text-mist">{a.desc}</p>
              </Link>
            ) : (
              <div
                key={a.title}
                className="rounded-2xl border border-line bg-tide/30 p-6 opacity-60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-mist">
                  <a.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-foam">
                  {a.title}
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-mist">
                    Segera
                  </span>
                </h3>
                <p className="mt-1 text-sm text-mist">{a.desc}</p>
              </div>
            ),
          )}
        </div>

        {/* Materi terbaru */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-mist">
            Materi terbaru
          </h2>
          <Link to="/materials" className="text-xs text-surf hover:underline">
            Lihat semua →
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          {isLoading ? (
            <div className="space-y-px">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse bg-tide/40" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 bg-tide/30 px-6 py-12 text-center">
              <FaBookOpen className="h-6 w-6 text-mist" />
              <p className="text-sm text-mist">
                Belum ada materi. Yuk tulis yang pertama.
              </p>
              <Link
                to="/admin/materials/new"
                className="text-sm font-medium text-surf hover:underline"
              >
                Tulis Materi →
              </Link>
            </div>
          ) : (
            recent.map((m) => (
              <div
                key={m.slug}
                className="flex items-center gap-4 border-b border-line bg-tide/30 px-5 py-3 last:border-b-0 hover:bg-tide/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foam">{m.title}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-mist">
                    <span className="rounded-full bg-surf/10 px-2 py-0.5 font-medium text-surf">
                      {m.category}
                    </span>
                    <span>{formatDate(m.date)}</span>
                  </div>
                </div>
                {/* Slot aksi (aktif setelah endpoint edit/hapus siap) */}
                <div className="flex items-center gap-1 text-mist">
                  <Link
                    to="/materials/$slug"
                    params={{ slug: m.slug }}
                    aria-label="Lihat materi"
                    className="rounded p-2 hover:bg-white/5 hover:text-foam"
                  >
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    disabled
                    aria-label="Edit (segera)"
                    title="Segera"
                    className="rounded p-2 opacity-30"
                  >
                    <FaPenToSquare className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-label="Hapus (segera)"
                    title="Segera"
                    className="rounded p-2 opacity-30"
                  >
                    <FaTrash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
