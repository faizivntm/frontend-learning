// ┌─────────────────────────────────────────────────────────────────┐
// │  DAFTAR KARYA DI SINI. Edit array `projects` di bawah.             │
// │  Halaman /projects & home baca dari sini.                         │
// │  Karya profesional (closed-source) cukup isi role + highlights,   │
// │  `repo`/`demo` boleh dikosongkan.                                 │
// └─────────────────────────────────────────────────────────────────┘

export interface Project {
  title: string
  description: string // 1–2 kalimat, muncul di kartu
  tech: string[] // label tech stack, mis. ["FastAPI", "Python"]
  category: 'Profesional' | 'Open Source' | 'Eksperimen' // grup di halaman /projects
  date?: string // ISO "2026-07-08" (buat urutan)
  role?: string // peran + tempat, mis. "Android Developer @ BRIN"
  highlights?: string[] // poin dampak/pencapaian (3–4 poin idealnya)
  badge?: string // sorotan spesial, mis. "HAKI Terdaftar"
  featured?: boolean // tampil di homepage
  repo?: string // URL GitHub (opsional — karya profesional biasanya kosong)
  demo?: string // URL demo live (opsional)
}

export const projects: Project[] = [
  // ── Karya Profesional ──────────────────────────────────────────────
  {
    title: 'SIPEKA — Sistem Pendeteksi Kualitas Air Berbasis AI',
    description:
      'Aplikasi Android yang mendeteksi kualitas air dari citra digital memakai algoritma WACODI, dikembangkan bareng tim riset BRIN.',
    role: 'Android Developer @ BRIN',
    badge: 'HAKI Terdaftar',
    highlights: [
      'Implementasi algoritma WACODI (Water Color from Digital Image) untuk analisis kualitas air on-device.',
      'Arsitektur MVVM + Provider agar kode modular dan mudah dikembangkan.',
      'Terdaftar Hak Cipta (KEMENKUMHAM RI, No. EC0020242333560, 2024).',
    ],
    tech: ['Flutter', 'Provider', 'GitLab', 'Figma'],
    category: 'Profesional',
    date: '2024-06',
    featured: true,
  },
  {
    title: 'PILAH BIJAK — Klasifikasi Sampah Berbasis AI',
    description:
      'Aplikasi Android yang mengklasifikasi jenis sampah secara otomatis lewat kamera, dipakai dalam kegiatan festival KLHK 2024.',
    role: 'Android Developer Freelance @ KLHK RI',
    badge: 'Dipakai di Festival KLHK 2024',
    highlights: [
      'Integrasi model TensorFlow Lite untuk inferensi klasifikasi gambar langsung di perangkat (on-device).',
      'Membangun alur capture kamera → inferensi model yang responsif dan stabil.',
      'Menerima Sertifikat Penghargaan sebagai Android Developer dari KLHK RI.',
    ],
    tech: ['Flutter', 'TensorFlow Lite', 'Provider', 'Figma'],
    category: 'Profesional',
    date: '2024-07',
    featured: true,
  },
  {
    title: 'Aplikasi Enterprise — PT United Tractors Tbk',
    description:
      'Serangkaian aplikasi web & mobile internal untuk maintenance (MSPP), monitoring (AEPD), tracking (DriverApps), dan audit (AMS).',
    role: 'Mobile & Web Developer @ United Tractors',
    highlights: [
      'Mengembangkan aplikasi produksi dengan React & React Native untuk 4 sistem internal berbeda.',
      'Memimpin tim kegiatan internal perusahaan, mengoordinasikan ~30 anggota dan beberapa PIC.',
      'Bekerja dalam tim berbasis agile pada skala enterprise.',
    ],
    tech: ['React', 'React Native', 'TypeScript'],
    category: 'Profesional',
    date: '2024-12',
    featured: true,
  },
  {
    title: 'Vocasia — Platform Kursus Online',
    description:
      'Aplikasi kursus online (Vocasia) dan Vocasia Organizer untuk mendukung akses pembelajaran digital.',
    role: 'Apps Developer Intern @ Yayasan Adipurna Inovasi Asia',
    highlights: [
      'Membangun fitur akses pembelajaran dan pengelolaan aktivitas & jadwal.',
      'Integrasi Firebase (auth & database) dan Midtrans untuk sistem pembayaran.',
      'Arsitektur MVVM + Provider untuk struktur kode yang modular.',
    ],
    tech: ['Flutter', 'Firebase', 'Midtrans', 'Provider'],
    category: 'Profesional',
    date: '2023-02',
  },
  {
    title: 'QR Part Monitoring — PT Chemco Harapan Nusantara',
    description:
      'Sistem QR Generator untuk memonitor keberadaan part di lini manufaktur.',
    role: 'Software Developer & Management Trainee @ Chemco',
    highlights: [
      'Aplikasi Flutter (MVVM) dengan backend Flask (Python) & CodeIgniter 4 + MySQL.',
      'Program akselerasi manajemen: memahami alur bisnis manufaktur untuk efisiensi operasional.',
    ],
    tech: ['Flutter', 'Flask', 'CodeIgniter 4', 'MySQL'],
    category: 'Profesional',
    date: '2024-08',
  },
  {
    title: 'Aplikasi Simulasi Ujian Masuk Perguruan Tinggi',
    description:
      'Aplikasi Android simulasi ujian nasional masuk PT dengan fitur latihan soal dan materi.',
    role: 'Android Developer Intern @ PT Edukasi Rekanan Anda',
    highlights: [
      'Clean Architecture + MVVM agar kode modular dan mudah diuji.',
      'Integrasi Firebase untuk autentikasi.',
    ],
    tech: ['Kotlin', 'Clean Architecture', 'Firebase'],
    category: 'Profesional',
    date: '2023-08',
  },

  // ── Open Source ─────────────────────────────────────────────────────
  {
    title: 'FastAPI Clean Architecture Template',
    description:
      'Starter FastAPI production-ready dengan Clean Architecture modular (Router → Service → Repository), JWT, Docker, dan project scaffolder.',
    tech: ['FastAPI', 'Python', 'SQL Server', 'JWT', 'Docker', 'Pydantic'],
    category: 'Open Source',
    date: '2026-07-08',
    repo: 'https://github.com/faizivntm/fastapi-tamplate-by-faiz',
  },
  {
    title: 'boyCode (Backend)',
    description:
      'REST API untuk platform boyCode: autentikasi, manajemen materi, fondasi backend yang bersih & modular.',
    tech: ['FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    category: 'Open Source',
    date: '2026-07-06',
    repo: 'https://github.com/faizivntm/boycode-be',
  },
  {
    title: 'boyCode (Frontend)',
    description:
      'Platform catatan belajar coding sekaligus etalase karya. Situs yang sedang kamu buka ini.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    category: 'Open Source',
    date: '2026-07-06',
    repo: 'https://github.com/faizivntm/boycode',
  },

  // ── Eksperimen Belajar ──────────────────────────────────────────────
  {
    title: 'Learn — React Router',
    description:
      'Eksplorasi React Router: nested routes, layout, dynamic routing, dan navigasi pada aplikasi React modern.',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Eksperimen',
    date: '2026-05-01',
    repo: 'https://github.com/faizivntm/learn-react-router',
  },
  {
    title: 'Mini Project — Movie Info',
    description:
      'Latihan konsumsi REST API, state management, dan rendering data dinamis dengan Mock API film.',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Eksperimen',
    date: '2026-04-01',
    repo: 'https://github.com/faizivntm/learn-movie-info-project/tree/develop',
  },
  {
    title: 'Mini Project — Todo App',
    description:
      'Latihan konsep CRUD, state management, dan reusable component pada frontend modern.',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Eksperimen',
    date: '2026-04-01',
    repo: 'https://github.com/faizivntm/learn-todoapp-project/tree/dev',
  },
]

// Karya terbaru dulu.
export const sortedProjects = () =>
  [...projects].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

// Sorotan buat homepage (karya profesional terbaik).
export const featuredProjects = () => projects.filter((p) => p.featured)

// Urutan grup di halaman /projects.
export const PROJECT_GROUPS: Project['category'][] = [
  'Profesional',
  'Open Source',
  'Eksperimen',
]
