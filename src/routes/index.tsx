import { useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaJava, FaPython, FaReact, FaJs } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss } from 'react-icons/si'
import { Button } from '@/components/atoms/Button'
import { BoyCodeLogo } from '@/components/atoms/BoyCodeLogo'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { MaterialCard, MaterialCardSkeleton } from '@/components/molecules/MaterialCard'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { useMaterials } from '@/api/materials/useMaterials'
import { featuredProjects } from '@/content/projects'

export const Route = createFileRoute('/')({
  component: Index,
})

// Gelembung tech stack yang mengorbit si anak. pos: posisi absolut, delay: stagger animasi.
const stack = [
  { Icon: FaJava, color: '#e76f00', label: 'Java', pos: 'left-[8%] top-[46%]', size: 'h-11 w-11', delay: '0s' },
  { Icon: FaPython, color: '#3776ab', label: 'Python', pos: 'left-[30%] top-[8%]', size: 'h-14 w-14', delay: '.6s' },
  { Icon: SiTypescript, color: '#3178c6', label: 'TypeScript', pos: 'left-[58%] top-[2%]', size: 'h-12 w-12', delay: '1.2s' },
  { Icon: FaJs, color: '#f7df1e', label: 'JavaScript', pos: 'right-[6%] top-[24%]', size: 'h-12 w-12', delay: '.3s' },
  { Icon: FaReact, color: '#61dafb', label: 'React', pos: 'left-[46%] top-[30%]', size: 'h-10 w-10', delay: '1.5s' },
  { Icon: SiTailwindcss, color: '#38bdf8', label: 'Tailwind', pos: 'right-[20%] top-[50%]', size: 'h-10 w-10', delay: '.9s' },
]

function Index() {
  const { data, isLoading } = useMaterials()
  const latest = (data ?? []).slice(0, 4)
  const topics = useMemo(() => {
    const count = new Map<string, number>()
    for (const m of data ?? []) count.set(m.category, (count.get(m.category) ?? 0) + 1)
    return [...count.entries()].map(([name, total]) => ({ name, total }))
  }, [data])
  const works = featuredProjects().slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      {/* Hero */}
      <section className="grid items-center gap-10 py-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-surf">
            Mobile &amp; Web Developer
          </p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">
            boy<span className="text-surf">Code</span>.
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
            <a href="/CV-Faiz-Ivan-Tama.pdf" download>
              <Button variant="ghost">Download CV</Button>
            </a>
          </div>
        </div>

        {/* Art: si anak dikelilingi orbit tech stack */}
        <div className="relative mx-auto h-72 w-full max-w-sm sm:h-80">
          {/* Harapan yang berterbangan */}
          {[
            { pos: 'left-[15%] bottom-[12%]', delay: '0s' },
            { pos: 'left-[72%] bottom-[22%]', delay: '1.6s' },
            { pos: 'left-[42%] bottom-[6%]', delay: '3.1s' },
            { pos: 'left-[86%] bottom-[38%]', delay: '2.3s' },
            { pos: 'left-[26%] bottom-[32%]', delay: '4.2s' },
          ].map((s, i) => (
            <span
              key={i}
              style={{ animationDelay: s.delay }}
              className={`animate-drift pointer-events-none absolute ${s.pos} h-1.5 w-1.5 rounded-full bg-sun shadow-[0_0_8px_2px_rgba(245,158,11,0.6)]`}
            />
          ))}
          {stack.map((t) => (
            <div
              key={t.label}
              title={t.label}
              style={{ animationDelay: t.delay }}
              className={`animate-bob absolute ${t.pos} ${t.size} grid place-items-center rounded-full border border-line bg-tide/80 shadow-lg backdrop-blur`}
            >
              <t.Icon className="h-1/2 w-1/2" style={{ color: t.color }} />
            </div>
          ))}
          <BoyCodeLogo full className="absolute bottom-0 left-1/2 h-64 w-auto -translate-x-1/2 drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]" />
        </div>
      </section>

      {/* Explore: kategori */}
      <section className="py-10">
        <SectionHeading
          title="Mau mulai dari mana?"
          subtitle="Satu materi hari ini lebih baik daripada seratus rencana yang nggak pernah dimulai."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <MaterialCardSkeleton key={i} />
              ))
            :topics.map((t) => (
            <Link
              key={t.name}
              to="/materials"
              className="rounded-xl border border-line bg-tide/60 p-6 transition-colors hover:border-surf/50 hover:bg-tide"
            >
              <div className='flex flex-row justify-center items-center gap-3'>
              <h3 className="font-semibold text-foam">{t.name}</h3>
              <p className="mt-1 text-sm text-mist">{t.total} materi</p>
              </div>
            
            </Link>
          ))}
        </div>
      </section>

      {/* Latest: materi terbaru */}
      <section className="py-10">
        <SectionHeading
          title="Baru keluar dari editor"
          subtitle="Catatan baru, hasil ngoprek semalaman."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <MaterialCardSkeleton key={i} />
              ))
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
              className="shrink-0 text-sm font-medium text-surf hover:underline"
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
