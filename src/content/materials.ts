//Example request body to backend

// ┌─────────────────────────────────────────────────────────────────┐
// │  ISI MATERI DI SINI. Cukup edit array `materials` di bawah.        │
// │  Semua halaman (home, /materials, /materials/$slug) baca dari sini.│
// └─────────────────────────────────────────────────────────────────┘

// Satu "blok" konten di dalam sebuah materi.
export type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'html'; html: string } // konten rich-text dari editor ala Medium

export interface Material {
  id?: number // dari backend; kosong saat materi baru (belum tersimpan)
  slug: string // dipakai di URL: /materials/<slug> — huruf kecil, pakai tanda hubung
  title: string
  summary: string // 1–2 kalimat, muncul di kartu
  category: string // mis. "JavaScript", "Catatan", "Python"
  series?: string // nama seri, buat mengelompokkan tutorial berurutan
  order?: number // urutan dalam seri (1, 2, 3, …)
  date: string // format ISO: "2026-07-08"
  tags?: string[]
  body: Block[] // isi materi, disusun blok demi blok
}

// ── Materi kamu ──────────────────────────────────────────────────────
// Seri "Java Fundamental" — modul awal tanggalnya paling baru biar tampil
// paling atas (daftar materi urut dari tanggal terbaru).
export const materials: Material[] = [
  // {
  //   slug: 'contoh-catatan',
  //   title: 'Contoh: Catatan',
  //   summary:
  //     'Hapus materi contoh ini dan mulai isi catatanmu sendiri. Struktur di file ini sudah siap pakai.',
  //   category: 'Catatan',
  //   date: '2026-07-08',
  //   tags: ['mulai', 'contoh'],
  //   body: [
  //     { type: 'heading', text: 'Cara pakai' },
  //     {
  //       type: 'paragraph',
  //       text: 'Buka src/content/materials.ts, salin objek ini, lalu ganti judul, ringkasan, dan isi body-nya. Halaman akan otomatis menampilkannya.',
  //     },
  //     { type: 'heading', text: 'Blok yang tersedia' },
  //     {
  //       type: 'list',
  //       items: [
  //         'heading — sub-judul di dalam materi',
  //         'paragraph — paragraf teks biasa',
  //         'list — daftar poin seperti ini',
  //         'code — cuplikan kode',
  //       ],
  //     },
  //     {
  //       type: 'code',
  //       lang: 'ts',
  //       code: "const semangat = 'just keep swimming'\nconsole.log(semangat)",
  //     },
  //   ],
  // },
]

// ── Helper (tidak perlu diubah) ──────────────────────────────────────
export const getMaterial = (slug: string) =>
  materials.find((m) => m.slug === slug)

// Materi terbaru dulu.
export const sortedMaterials = () =>
  [...materials].sort((a, b) => b.date.localeCompare(a.date))

// Daftar kategori unik + jumlah materinya (buat section "Explore" di home).
export const categories = () => {
  const count = new Map<string, number>()
  for (const m of materials) count.set(m.category, (count.get(m.category) ?? 0) + 1)
  return [...count.entries()].map(([name, total]) => ({ name, total }))
}
