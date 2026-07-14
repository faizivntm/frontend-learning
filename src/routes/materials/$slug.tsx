import { useEffect } from 'react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { ContentBlocks } from '@/components/organisms/ContentBlocks'
import { AdminTopbar } from '@/components/organisms/AdminTopbar'
import { useMaterials } from '@/api/materials/useMaterials'
import { seriesSiblings } from '@/content/materials'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/materials/$slug')({
  // ?admin=1 → dibuka dari sisi admin (header admin, tombol jadi "Back").
  validateSearch: (search: Record<string, unknown>): { admin?: boolean } =>
    search.admin === '1' || search.admin === true ? { admin: true } : {},
  component: MaterialDetail,
})

function MaterialDetail() {
  const { slug } = Route.useParams()
  const { admin } = Route.useSearch()
  const router = useRouter()
  const { data, isLoading, isError } = useMaterials()

  const material = data?.find((m) => m.slug === slug)

  // Navigasi dalam seri: cari posisi materi ini di antara saudara sekurikulum.
  const siblings = material ? seriesSiblings(data ?? [], material) : []
  const idx = siblings.findIndex((m) => m.slug === slug)
  const prev = idx > 0 ? siblings[idx - 1] : undefined
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined

  // ponytail: native DOM API to set per-article title/description — avoids route loader refactor
  useEffect(() => {
    if (material && !isLoading) {
      document.title = `${material.title} — koDein`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', material.summary)
    }
  }, [material, isLoading])

  // Tombol kembali: dari admin → "Back" (history), publik → link ke daftar materi.
  const back = admin ? (
    <button
      type="button"
      onClick={() => router.history.back()}
      className="text-sm font-bold text-foam underline-offset-4 hover:underline"
    >
      ← Back
    </button>
  ) : (
    <Link to="/materials" className="text-sm font-bold text-foam underline-offset-4 hover:underline">
      ← Semua materi
    </Link>
  )

  return (
    <>
      {admin && <AdminTopbar />}

      {isLoading ? (
        <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center text-mist">
          Memuat materi…
        </div>
      ) : isError || !material ? (
        <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
          <p className="text-mist">
            {isError ? 'Gagal memuat materi.' : 'Materi tidak ditemukan.'}
          </p>
          <div className="mt-4">{back}</div>
        </div>
      ) : (
        <article className="mx-auto w-full max-w-3xl px-6 py-16">
          {back}

          <header className="mt-6 border-b-2 border-line pb-6">
            <div className="flex items-center gap-3 text-xs text-mist">
              <span className="border-2 border-line bg-surf px-2.5 py-1 font-bold text-foam">
                {material.category}
              </span>
              {material.series && (
                <span className="border-2 border-line px-2.5 py-1 font-bold text-foam">
                  {material.series}
                  {material.order != null && ` · Bagian ${material.order}`}
                </span>
              )}
              <time dateTime={material.date}>{formatDate(material.date)}</time>
            </div>
            <h1 className="mt-4 break-words font-display text-4xl font-bold tracking-tight text-foam">
              {material.title}
            </h1>
            <p className="mt-2 break-words text-lg text-mist">{material.summary}</p>
            {material.tags && material.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {material.tags.map((tag) => (
                  <span key={tag} className="text-xs text-mist">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mt-8">
            <ContentBlocks blocks={material.body} />
          </div>

          {/* Navigasi seri: lanjut ke bagian sebelumnya/berikutnya */}
          {(prev || next) && (
            <nav className="mt-12 grid gap-4 border-t-2 border-line pt-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  to="/materials/$slug"
                  params={{ slug: prev.slug }}
                  search={admin ? { admin: true } : {}}
                  className="brutal brutal-press flex flex-col p-4"
                >
                  <span className="text-xs text-mist">← Sebelumnya</span>
                  <span className="mt-1 font-bold text-foam">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to="/materials/$slug"
                  params={{ slug: next.slug }}
                  search={admin ? { admin: true } : {}}
                  className="brutal brutal-press flex flex-col p-4 text-right sm:col-start-2"
                >
                  <span className="text-xs text-mist">Berikutnya →</span>
                  <span className="mt-1 font-bold text-foam">{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>
      )}
    </>
  )
}
