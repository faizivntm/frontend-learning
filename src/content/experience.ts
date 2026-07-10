// ┌─────────────────────────────────────────────────────────────────┐
// │  RIWAYAT PENGALAMAN. Edit array `experience` di bawah.             │
// │  Ditampilkan sebagai timeline di halaman /about.                  │
// └─────────────────────────────────────────────────────────────────┘

export interface Experience {
  role: string
  org: string
  period: string
  highlights: string[]
}

// Terbaru dulu.
export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    org: 'PT Circle K Indonesia Utama',
    period: 'Juni 2026 — Sekarang',
    highlights: [
      'Mengembangkan aplikasi internal dan beberapa service perusahaan, baik dari sisi backend maupun frontned',
    ],
  },
  {
    role: 'Mobile & Web Developer',
    org: 'PT United Tractors Tbk',
    period: 'Des 2024 — Juni 2026',
    highlights: [
      'Mengembangkan aplikasi web & mobile (React, React Native) untuk sistem maintenance (MSPP), monitoring (AEPD), tracking (DriverApps), dan audit (AMS).',
      'Ketua tim kegiatan internal perusahaan — mengoordinasikan ~30 anggota dan beberapa PIC.',
    ],
  },
  {
    role: 'Software Developer & Management Trainee',
    org: 'PT Chemco Harapan Nusantara',
    period: 'Agu — Nov 2024',
    highlights: [
      'Membangun sistem QR Generator untuk memonitor keberadaan part.',
      'Flutter (MVVM) + backend Flask (Python) & CodeIgniter 4 dengan MySQL.',
      'Program akselerasi manajemen untuk memahami alur bisnis manufaktur.',
    ],
  },
  {
    role: 'Android Developer (Freelance)',
    org: 'Kementerian Lingkungan Hidup dan Kehutanan RI',
    period: 'Jun — Jul 2024',
    highlights: [
      'Aplikasi Android untuk festival KLHK dengan klasifikasi sampah via TensorFlow Lite.',
      'Arsitektur MVVM + Provider; menerima Sertifikat Penghargaan Android Developer.',
    ],
  },
  {
    role: 'Android Developer (Internship)',
    org: 'Badan Riset dan Inovasi Nasional (BRIN)',
    period: 'Feb — Jun 2024',
    highlights: [
      'Mengembangkan SIPEKA — deteksi kualitas air berbasis citra digital (algoritma WACODI).',
      'Arsitektur MVVM + Provider; hasil riset terdaftar HAKI.',
    ],
  },
  {
    role: 'Asisten & Instruktur Laboratorium',
    org: 'LEPKOM Universitas Gunadarma',
    period: 'Jan 2023 — Agu 2024',
    highlights: [
      'Membimbing mahasiswa dalam praktikum pemrograman, dari konsep dasar hingga implementasi.',
      'Membantu debugging, evaluasi praktikum, dan koordinasi dengan dosen.',
    ],
  },
  {
    role: 'Android Developer (Internship)',
    org: 'PT Edukasi Rekanan Anda',
    period: 'Agu — Des 2023',
    highlights: [
      'Aplikasi Android (Kotlin) simulasi ujian masuk perguruan tinggi: latihan soal & materi.',
      'Clean Architecture + MVVM; integrasi Firebase untuk autentikasi.',
    ],
  },
  {
    role: 'Apps Developer (Internship)',
    org: 'Yayasan Adipurna Inovasi Asia',
    period: 'Feb — Jun 2023',
    highlights: [
      'Mengembangkan aplikasi kursus online Vocasia & Vocasia Organizer (Flutter).',
      'Integrasi Firebase (auth & database) dan Midtrans untuk pembayaran.',
    ],
  },
]

// Pendidikan & kredensial (dipakai di /about).
export const education = {
  school: 'Universitas Gunadarma',
  major: 'Informatika',
  period: '2020 — 2024',
  gpa: '3,63',
}

export const certifications = [
  'Sertifikasi Kompetensi Pemrograman — BNSP',
  'Penghargaan Android Developer — KLHK RI',
  'React 19 & TypeScript — Udemy',
]
