import { createFileRoute, Link } from '@tanstack/react-router'
import { FaJava, FaPython, FaReact, FaJs, FaArrowRight } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss } from 'react-icons/si'
import { Button } from '@/components/atoms/Button'
import { KodeinLogo } from '@/components/atoms/KodeinLogo'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { MaterialCard, MaterialCardSkeleton } from '@/components/molecules/MaterialCard'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { useMaterials } from '@/api/materials/useMaterials'
import { featuredProjects } from '@/content/projects'
import { categories } from '@/content/materials'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'koDein — Software Engineer',
      },
      {
        name: 'description',
        content:
          'Dokumentasi belajar & coding gue — tempat gue nyatet dan berbagi hal fundamental pemrograman. Sekaligus etalase karya yang pernah gue bangun.',
      },
    ],
  }),
  component: Index,
})

// Tech stack yang ditampilkan sebagai sel-sel bertepi di hero.
const stack = [
  { Icon: FaJava, color: '#e76f00', label: 'Java' },
  { Icon: FaPython, color: '#3776ab', label: 'Python' },
  { Icon: SiTypescript, color: '#3178c6', label: 'TypeScript' },
  { Icon: FaJs, color: '#f7df1e', label: 'JavaScript' },
  { Icon: FaReact, color: '#61dafb', label: 'React' },
  { Icon: SiTailwindcss, color: '#38bdf8', label: 'Tailwind' },
]

function Index() {
  const { data, isLoading } = useMaterials()
  const latest = (data ?? []).slice(0, 4)
  const cats = categories(data ?? [])
  const works = featuredProjects().slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      {/* Hero */}
      <section className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block border-2 border-line bg-surf px-3 py-1 text-xs font-bold uppercase tracking-wide text-foam">
            Software Engineer · Catatan & Karya
          </span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Belajar ngoding, <br />
            <span className="bg-surf px-2">tanpa basa-basi.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-mist">
            Dokumentasi belajar &amp; coding gue — tempat gue nyatet dan berbagi hal
            fundamental pemrograman. Sekaligus etalase karya yang pernah gue bangun.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/materials">
              <Button className="min-w-40">Baca Materi</Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary">Lihat Karya</Button>
            </Link>
          </div>
        </div>

        {/* Mascot + grid tech stack (brutalist) */}
        <div className="flex flex-col gap-4">
          <div className="brutal grid place-items-center bg-abyss p-6">
            <KodeinLogo full className="h-56 w-auto sm:h-64" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stack.map((t) => (
              <div
                key={t.label}
                title={t.label}
                className="brutal flex items-center justify-center gap-2 px-2 py-3"
              >
                <t.Icon className="h-6 w-6" style={{ color: t.color }} />
                <span className="hidden text-xs font-bold sm:inline">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori — dibangun dinamis dari materi yang ada */}
      {cats.length > 0 && (
        <section className="py-10">
          <SectionHeading
            title="Jelajah per Kategori"
            subtitle="Bingung mulai dari mana? Pilih kategori yang menarik buat kamu."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c, i) => (
              <Link
                key={c.name}
                to="/materials"
                search={{ category: c.name }}
                className="brutal brutal-press group flex flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-line/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="border-2 border-line bg-abyss px-2 py-0.5 text-xs font-bold">
                    {c.total} materi
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-foam">{c.name}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-foam">
                  Lihat materi <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest: materi terbaru */}
      <section className="py-10">
        <SectionHeading
          title="Baru keluar dari editor"
          subtitle="Catatan baru, hasil ngoprek semalaman."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <MaterialCardSkeleton key={i} />)
            : latest.map((m) => <MaterialCard key={m.slug} material={m} />)}
        </div>
      </section>

      {/* Karya: cuplikan repository */}
      {works.length > 0 && (
        <section className="py-10 pb-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              title="Karya pilihan"
              subtitle="Dari aplikasi produksi sampai proyek AI ber-HAKI. Ini yang pernah gue bangun."
            />
            <Link
              to="/projects"
              className="shrink-0 text-sm font-bold text-foam underline-offset-4 hover:underline"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((p) => (
              <ProjectCard key={p.repo} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
