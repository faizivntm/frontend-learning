// ┌─────────────────────────────────────────────────────────────────┐
// │  DAFTAR KARYA / REPOSITORY DI SINI. Edit array `projects` di bawah.│
// │  Halaman /projects baca dari sini. Tambah entry = tinggal duplikat.│
// └─────────────────────────────────────────────────────────────────┘

export interface Project {
  title: string
  description: string // 1–2 kalimat, muncul di kartu
  repo: string // URL GitHub (atау tautan lain)
  tech: string[] // label tech stack, mis. ["FastAPI", "Python"]
  category?: string // mis. "Template", "Library", "Tools"
  date?: string // format ISO: "2026-07-08" (buat urutan)
}

export const projects: Project[] = [
  {
    title: 'FastAPI Clean Architecture Template',
    description:
      'Production-ready FastAPI starter dengan Clean Architecture modular berbasis fitur (Router → Service → Repository). Dilengkapi SQL Server (pymssql), JWT Authentication, Docker, structured logging, serta project scaffolder untuk mempercepat pengembangan backend yang scalable dan mudah dipelihara.',
    repo: 'https://github.com/faizivntm/fastapi-tamplate-by-faiz',
    tech: ['FastAPI', 'Python', 'SQL Server', 'JWT', 'Docker', 'Pydantic'],
    category: 'Template',
    date: '2026-07-08',
  },
  {
    title: 'boyCode (Frontend)',
    description:
      'Platform catatan belajar coding pribadi sekaligus etalase karya open-source. Dibangun dengan React dan TypeScript.',
    repo: 'https://github.com/faizivntm/boycode',
    tech: ['React', 'TypeScript', 'CSS'],
    category: 'Personal Project',
    date: '2026-07-06',
  },
  {
    title: 'boyCode (Backend)',
    description:
      'REST API backend untuk platform boyCode menggunakan FastAPI, SQLAlchemy, dan PostgreSQL. Menyediakan autentikasi, manajemen materi belajar, serta fondasi backend yang bersih, modular, dan mudah dikembangkan.',
    repo: 'https://github.com/faizivntm/boycode-be',
    tech: ['FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    category: 'Personal Project',
    date: '2026-07-06',
  },
  {
    title: 'Learn - React Router',
    description:
      'Project eksplorasi React Router sebagai referensi implementasi client-side routing, nested routes, layout, dynamic routing, dan navigasi pada aplikasi React modern.',
    repo: 'https://github.com/faizivntm/learn-react-router',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Learning',
    date: '2026-05-01',
  },
  {
    title: 'Mini Project - Movie Info',
    description:
      'Aplikasi React sederhana yang mengintegrasikan Mock API untuk menampilkan informasi film. Dibuat sebagai latihan konsumsi REST API, state management, dan rendering data secara dinamis.',
    repo: 'https://github.com/faizivntm/learn-movie-info-project/tree/develop',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Mini Project',
    date: '2026-04-01',
  },
  {
    title: 'Mini Project - Todo App',
    description:
      'Aplikasi Todo berbasis React sebagai media pembelajaran konsep CRUD, state management, reusable component, dan praktik pengembangan frontend modern.',
    repo: 'https://github.com/faizivntm/learn-todoapp-project/tree/dev',
    tech: ['React', 'TypeScript', 'Vite'],
    category: 'Mini Project',
    date: '2026-04-01',
  },
  {
    title: 'Project Intern - Online Tryout Application',
    description:
      'Project selama program magang berupa aplikasi Tryout Online berbasis Android menggunakan Kotlin. Menerapkan Clean Architecture untuk menghasilkan struktur kode yang modular, scalable, dan mudah diuji.',
    repo: 'https://github.com/faizivntm/learn-todoapp-project/tree/dev',
    tech: ['Kotlin', 'Clean Architecture'],
    category: 'Internship',
    date: '2023-07',
  },
]

// Karya terbaru dulu.
export const sortedProjects = () =>
  [...projects].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
