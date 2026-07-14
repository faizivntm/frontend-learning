import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaArrowLeft } from 'react-icons/fa6'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { MaterialCard, MaterialCardSkeleton } from '@/components/molecules/MaterialCard'
import { AdminTopbar } from '@/components/organisms/AdminTopbar'
import { useMaterials } from '@/api/materials/useMaterials'
import { groupBySeries, type Material } from '@/content/materials'

export const Route = createFileRoute('/materials/')({
  // ?admin=1 → konteks admin. ?category=… → filter per kategori.
  // ?series=… → drill-down ke satu seri (materi urut pakai `order`).
  validateSearch: (
    search: Record<string, unknown>,
  ): { admin?: boolean; category?: string; series?: string } => ({
    ...(search.admin === '1' || search.admin === true ? { admin: true } : {}),
    ...(typeof search.category === 'string' && search.category
      ? { category: search.category }
      : {}),
    ...(typeof search.series === 'string' && search.series
      ? { series: search.series }
      : {}),
  }),
  head: () => ({
    meta: [
      {
        title: 'Materi — koDein',
      },
      {
        name: 'description',
        content: 'Kumpulan catatan belajar coding — konsep fundamental, best practices, dan teknik pemrograman dari berbagai topik.',
      },
    ],
  }),
  component: Materials,
})

// Gabungkan semua teks yang bisa dicari dari satu materi (termasuk isi blok).
function searchableText(m: Material): string {
  const parts: string[] = [m.title, m.summary, m.category, ...(m.tags ?? [])]
  for (const b of m.body) {
    if (b.type === 'heading' || b.type === 'paragraph') parts.push(b.text)
    else if (b.type === 'list') parts.push(...b.items)
    else if (b.type === 'code') parts.push(b.code)
  }
  return parts.join(' ').toLowerCase()
}

function Materials() {
  const { admin, category, series } = Route.useSearch()
  const { data, isLoading, isError } = useMaterials()
  const [query, setQuery] = useState('')

  // Filter kategori dulu (kalau dipilih dari home), baru pencarian teks.
  const byCategory = useMemo(
    () => (data ?? []).filter((m) => !category || m.category === category),
    [data, category],
  )

  // Precompute indeks teks sekali per data (bukan tiap ketikan).
  const index = useMemo(
    () => byCategory.map((m) => ({ material: m, text: searchableText(m) })),
    [byCategory],
  )

  const items = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length) return byCategory
    return index
      .filter(({ text }) => terms.every((t) => text.includes(t)))
      .map(({ material }) => material)
  }, [index, query, byCategory])

  const searching = query.trim().length > 0
  const groups = useMemo(() => groupBySeries(items), [items])
  // Grup yang punya seri → jadi pilihan di picker. Grup null → materi lepasan.
  const seriesGroups = groups.filter((g) => g.series)
  const loose = groups.find((g) => !g.series)?.items ?? []
  // Materi dalam seri terpilih, sudah urut naik pakai `order`.
  const inSeries = useMemo(
    () => (series ? groups.find((g) => g.series === series)?.items ?? [] : []),
    [groups, series],
  )

  // Alur: (kategori) → pilih seri → materi urut. `view` menentukan tampilan.
  const view = searching
    ? 'search'
    : series
      ? 'series' // materi berurutan di dalam satu seri
      : category
        ? 'picker' // pilihan seri dalam kategori
        : 'all' // semua materi, dikelompokkan per seri

  const heading =
    view === 'series'
      ? { title: series!, subtitle: 'Ikuti materinya urut dari bagian 1.' }
      : category
        ? { title: category, subtitle: `Pilih seri untuk mulai belajar ${category}.` }
        : {
            title: 'Semua Materi',
            subtitle: 'Kalau gue sempat belajar sesuatu, biasanya bakal gue tulis di sini.',
          }

  return (
    <>
      {admin && <AdminTopbar />}
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {admin && (
          <Link
            to="/admin/create_materi"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-mist underline-offset-4 hover:text-foam hover:underline"
          >
            <FaArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
        )}

      {/* Breadcrumb balik dari seri ke daftar seri kategori */}
      {view === 'series' && category && (
        <Link
          to="/materials"
          search={{ ...(admin ? { admin: true } : {}), category }}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-mist underline-offset-4 hover:text-foam hover:underline"
        >
          <FaArrowLeft className="h-3 w-3" /> Semua seri {category}
        </Link>
      )}

      <SectionHeading title={heading.title} subtitle={heading.subtitle} />

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul, isi, kategori, atau tag…"
        className="mt-8 w-full max-w-md border-2 border-line bg-tide px-4 py-2.5 text-foam shadow-brutal outline-none placeholder:text-mist focus:bg-surf/20"
      />

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MaterialCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="mt-10 font-medium text-red-600">
          Waduh, materinya gagal dimuat. Cek koneksi atau coba lagi sebentar ya.
        </p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-mist">
          {(data ?? []).length === 0
            ? 'Belum ada materi di sini—tapi tenang, lagi disiapkan.'
            : query
              ? `Nggak ada materi yang cocok sama "${query}". Coba kata kunci lain?`
              : `Belum ada materi di kategori "${category}".`}
        </p>
      ) : view === 'search' ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <MaterialCard key={m.slug} material={m} admin={admin} />
          ))}
        </div>
      ) : view === 'series' ? (
        /* Materi berurutan: daftar bernomor sesuai `order` */
        <ol className="mt-8 flex flex-col gap-3">
          {inSeries.map((m, i) => (
            <li key={m.slug}>
              <Link
                to="/materials/$slug"
                params={{ slug: m.slug }}
                search={admin ? { admin: true } : {}}
                className="brutal brutal-press flex items-center gap-4 p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-line bg-surf font-display text-lg font-bold text-foam">
                  {m.order ?? i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold text-foam">{m.title}</span>
                  <span className="line-clamp-1 text-sm text-mist">{m.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : view === 'picker' ? (
        /* Pilihan seri dalam kategori + materi lepasan (tanpa seri) */
        <div className="mt-8 flex flex-col gap-10">
          {seriesGroups.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {seriesGroups.map((g) => (
                <Link
                  key={g.series}
                  to="/materials"
                  search={{ ...(admin ? { admin: true } : {}), category, series: g.series! }}
                  className="brutal brutal-press group flex flex-col p-5"
                >
                  <span className="border-2 border-line bg-surf px-2.5 py-1 text-xs font-bold text-foam">
                    Seri
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-foam group-hover:underline">
                    {g.series}
                  </h3>
                  <p className="mt-1 text-sm text-mist">{g.items.length} materi berurutan</p>
                  <span className="mt-4 text-sm font-bold text-foam">Mulai dari bagian 1 →</span>
                </Link>
              ))}
            </div>
          )}
          {loose.length > 0 && (
            <section>
              {seriesGroups.length > 0 && (
                <h2 className="mb-4 inline-block border-2 border-line bg-surf px-3 py-1 font-display text-lg font-bold text-foam">
                  Materi lepas
                </h2>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loose.map((m) => (
                  <MaterialCard key={m.slug} material={m} admin={admin} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Semua materi: dikelompokkan per seri, judul seri bisa diklik */
        <div className="mt-8 flex flex-col gap-12">
          {groups.map((g) => (
            <section key={g.series ?? '__loose__'}>
              {g.series && (
                <Link
                  to="/materials"
                  search={{
                    ...(admin ? { admin: true } : {}),
                    category: g.items[0].category,
                    series: g.series,
                  }}
                  className="mb-4 inline-block border-2 border-line bg-surf px-3 py-1 font-display text-lg font-bold text-foam underline-offset-4 hover:underline"
                >
                  {g.series} →
                </Link>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((m) => (
                  <MaterialCard key={m.slug} material={m} admin={admin} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
      </div>
    </>
  )
}
