import { useMemo, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FaArrowLeft, FaCheck, FaEye, FaPen, FaXmark } from 'react-icons/fa6'
import { Button } from '@/components/atoms/Button'
import { AutoTextarea } from '@/components/atoms/AutoTextarea'
import { AdminTopbar } from '@/components/organisms/AdminTopbar'
import { RichEditor } from '@/components/organisms/RichEditor'
import { ContentBlocks } from '@/components/organisms/ContentBlocks'
import { createMaterial } from '@/api/materials/createMaterial'
import { updateMaterial } from '@/api/materials/updateMaterial'
import type { Block, Material } from '@/content/materials'

const field =
  'w-full border-2 border-line bg-abyss px-3 py-2 text-sm text-foam placeholder:text-mist outline-none focus:bg-surf/20'

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Buang tag → cek apakah ada isi teks nyata (editor kosong = "<p></p>").
const htmlText = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const today = new Date().toISOString().slice(0, 10)

// Materi lama bisa punya blok terstruktur (heading/list/…). Ubah ke HTML biar
// bisa disunting di editor tanpa kehilangan isi. ponytail: cukup untuk kasus di sini.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const blocksToHtml = (body: Block[]) =>
  body
    .map((b) => {
      switch (b.type) {
        case 'html': return b.html
        case 'heading': return `<h2>${esc(b.text)}</h2>`
        case 'paragraph': return `<p>${esc(b.text)}</p>`
        case 'list': return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
        case 'code': return `<pre><code>${esc(b.code)}</code></pre>`
      }
    })
    .join('')

// Kanvas menulis dipakai bersama oleh "Tulis Materi" (create) & "Edit" (update).
export function MaterialForm({ initial }: { initial?: Material }) {
  const isEdit = Boolean(initial?.id)
  const navigate = useNavigate()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [summary, setSummary] = useState(initial?.summary ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [series, setSeries] = useState(initial?.series ?? '')
  const [order, setOrder] = useState(initial?.order?.toString() ?? '')
  const [date, setDate] = useState(initial?.date ?? today)
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '))
  const [html, setHtml] = useState(initial ? blocksToHtml(initial.body) : '')
  const [preview, setPreview] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [editorKey, setEditorKey] = useState(0) // remount editor saat reset (TipTap uncontrolled)

  const onTitle = (v: string) => {
    setTitle(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
  const hasBody = htmlText(html).length > 0 || /<(img|pre|hr|table)/.test(html)
  const body: Block[] = hasBody ? [{ type: 'html', html }] : []

  const material: Material = {
    slug,
    title,
    summary,
    category,
    ...(series.trim() ? { series: series.trim() } : {}),
    ...(order.trim() ? { order: Number(order) } : {}),
    date,
    ...(tags.length ? { tags } : {}),
    body,
  }

  const wordCount = useMemo(() => {
    const t = `${title} ${summary} ${htmlText(html)}`.trim()
    return t ? t.split(/\s+/).length : 0
  }, [title, summary, html])

  const queryClient = useQueryClient()
  const save = useMutation({
    mutationFn: (m: Material) =>
      isEdit ? updateMaterial(initial!.id!, m) : createMaterial(m),
    // Segarkan daftar materi supaya perubahan langsung muncul.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['materials'] }),
  })

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setSlugTouched(false)
    setSummary('')
    setCategory('')
    setSeries('')
    setOrder('')
    setDate(today)
    setTagsInput('')
    setHtml('')
    setEditorKey((k) => k + 1)
    setPublishOpen(false)
    setPreview(false)
    save.reset()
  }

  const canWrite = Boolean(title.trim()) && hasBody
  const missing = [
    !title.trim() && 'judul',
    !slug.trim() && 'slug',
    !summary.trim() && 'ringkasan',
    !category.trim() && 'kategori',
    !hasBody && 'isi materi',
  ].filter(Boolean) as string[]
  const canSubmit = missing.length === 0

  return (
    <div className="flex min-h-svh flex-col">
      <AdminTopbar />

      {/* Toolbar editor (sticky di bawah topbar) */}
      <div className="sticky top-16 z-40 border-b-2 border-line bg-deep">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/admin/create_materi"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-mist underline-offset-4 hover:text-foam hover:underline"
          >
            <FaArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs text-mist sm:inline">{wordCount} kata</span>
            <Button
              variant="ghost"
              onClick={() => setPreview((p) => !p)}
              className="gap-1.5 px-3 py-1.5 text-xs"
            >
              {preview ? <FaPen className="h-3 w-3" /> : <FaEye className="h-3 w-3" />}
              {preview ? 'Edit' : 'Pratinjau'}
            </Button>
            <Button
              onClick={() => setPublishOpen(true)}
              disabled={!canWrite}
              className="px-4 py-1.5 text-xs"
            >
              {isEdit ? 'Simpan Perubahan' : 'Terbitkan'}
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        {preview ? (
          /* ── Pratinjau (persis halaman publik) ── */
          <article>
            <div className="flex items-center gap-3 text-xs text-mist">
              {category && (
                <span className="border-2 border-line bg-surf px-2.5 py-1 font-bold text-foam">
                  {category}
                </span>
              )}
              <span>{date}</span>
            </div>
            <h1 className="mt-3 break-words font-display text-4xl font-bold tracking-tight text-foam">
              {title || 'Judul materi'}
            </h1>
            {summary && <p className="mt-3 break-words text-lg text-mist">{summary}</p>}
            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="text-xs text-mist">#{t}</span>
                ))}
              </div>
            )}
            <div className="mt-8">
              {body.length ? (
                <ContentBlocks blocks={body} />
              ) : (
                <p className="text-mist">Belum ada isi.</p>
              )}
            </div>
          </article>
        ) : (
          /* ── Kanvas menulis ── */
          <div>
            <AutoTextarea
              value={title}
              onChange={(e) => onTitle(e.target.value)}
              placeholder="Judul materi"
              className="text-4xl font-bold tracking-tight text-foam"
            />
            <AutoTextarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan singkat — muncul di kartu & hasil pencarian"
              className="mt-2 text-xl text-mist"
            />

            <hr className="my-6 border-t-2 border-line" />

            <RichEditor key={editorKey} value={html} onChange={setHtml} />
          </div>
        )}
      </main>

      {/* ── Dialog Terbitkan (metadata) ── */}
      {publishOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-line/40 p-6">
          <div className="w-full max-w-lg border-2 border-line bg-tide p-6 shadow-brutal-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-foam">
                {isEdit ? 'Simpan perubahan' : 'Terbitkan materi'}
              </h3>
              <button
                type="button"
                onClick={() => setPublishOpen(false)}
                aria-label="Tutup"
                className="border-2 border-line p-1.5 text-foam hover:bg-surf"
              >
                <FaXmark className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm text-mist">
              Lengkapi detail publikasi sebelum menyimpan.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5 text-sm text-mist">
                Slug (URL)
                <input
                  className={field}
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true)
                    setSlug(e.target.value)
                  }}
                  placeholder="pengenalan-java"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5 text-sm text-mist">
                  Kategori
                  <input
                    className={field}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Java"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-mist">
                  Tanggal
                  <input
                    type="date"
                    className={field}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <label className="flex flex-col gap-1.5 text-sm text-mist">
                  Seri (opsional)
                  <input
                    className={field}
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    placeholder="Java Fundamental"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-mist">
                  Urutan
                  <input
                    type="number"
                    min={1}
                    className={`${field} w-24`}
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    placeholder="1"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm text-mist">
                Tags (pisahkan dengan koma)
                <input
                  className={field}
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="java, dasar, oop"
                />
              </label>
            </div>

            {save.isError && (
              <p className="mt-4 border-2 border-line bg-red-100 px-3 py-2 text-sm font-medium text-red-700">
                {save.error.message}
              </p>
            )}
            {!canSubmit && (
              <p className="mt-4 text-xs text-mist">Masih kurang: {missing.join(', ')}.</p>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setPublishOpen(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1"
                onClick={() => save.mutate(material)}
                disabled={!canSubmit || save.isPending}
              >
                {save.isPending ? 'Menyimpan…' : 'Simpan Materi'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay loading */}
      {save.isPending && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-line/40">
          <div className="flex flex-col items-center gap-3 border-2 border-line bg-tide px-8 py-6 shadow-brutal-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-transparent" />
            <p className="text-sm font-medium text-foam">Menyimpan materi…</p>
          </div>
        </div>
      )}

      {/* Modal sukses */}
      {save.isSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-line/40 p-6">
          <div className="w-full max-w-sm border-2 border-line bg-tide p-6 text-center shadow-brutal-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border-2 border-line bg-green-400 text-foam">
              <FaCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foam">
              {isEdit ? 'Perubahan tersimpan!' : 'Materi tersimpan!'}
            </h3>
            <p className="mt-1 break-words text-sm text-mist">
              "{save.data?.title ?? title}" berhasil disimpan ke database.
            </p>
            <div className="mt-6 flex gap-3">
              {isEdit ? (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() =>
                    navigate({
                      to: '/materials/$slug',
                      params: { slug: save.data?.slug ?? slug },
                      search: { admin: true },
                    })
                  }
                >
                  Lihat Materi
                </Button>
              ) : (
                <Button variant="secondary" className="flex-1" onClick={resetForm}>
                  Tulis Lagi
                </Button>
              )}
              <Button
                className="flex-1"
                onClick={() => navigate({ to: '/admin/create_materi' })}
              >
                Ke Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
