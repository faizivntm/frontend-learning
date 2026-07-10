import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaArrowLeft } from 'react-icons/fa6'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { MaterialCard, MaterialCardSkeleton } from '@/components/molecules/MaterialCard'
import { AdminTopbar } from '@/components/organisms/AdminTopbar'
import { useMaterials } from '@/api/materials/useMaterials'
import type { Material } from '@/content/materials'

export const Route = createFileRoute('/materials/')({
  // ?admin=1 → konteks admin. ?category=… → filter materi per kategori (dari home).
  validateSearch: (
    search: Record<string, unknown>,
  ): { admin?: boolean; category?: string } => ({
    ...(search.admin === '1' || search.admin === true ? { admin: true } : {}),
    ...(typeof search.category === 'string' && search.category
      ? { category: search.category }
      : {}),
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
  const { admin, category } = Route.useSearch()
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

  return (
    <>
      {admin && <AdminTopbar />}
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {admin && (
          <Link
            to="/admin/create_materi"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-mist hover:text-surf"
          >
            <FaArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
        )}
      <SectionHeading
        title={category ?? 'Semua Materi'}
        subtitle={
          category
            ? `Materi dengan kategori "${category}".`
            : 'Kalau gue sempat belajar sesuatu, biasanya bakal gue tulis di sini.'
        }
      />

      {category ? <></> : (
        <Link
          to="/materials"
          search={admin ? { admin: true } : {}}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-mist hover:text-surf"
        >
          <FaArrowLeft className="h-3 w-3" /> Lihat semua kategori
        </Link>
      )}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul, isi, kategori, atau tag…"
        className="mt-8 w-full max-w-md rounded-xl border border-line bg-tide/60 px-4 py-2.5 text-foam placeholder:text-mist outline-none transition-colors focus:border-surf/50"
      />

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MaterialCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="mt-10 text-red-300">
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
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <MaterialCard key={m.slug} material={m} admin={admin} />
          ))}
        </div>
      )}
      </div>
    </>
  )
}
