import { createFileRoute } from '@tanstack/react-router'
import {
  FaAward,
  FaBuilding,
  FaDownload,
  FaEnvelope,
  FaGraduationCap,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from 'react-icons/fa6'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { BoyCodeLogo } from '@/components/atoms/BoyCodeLogo'
import { experience, education, certifications } from '@/content/experience'

export const Route = createFileRoute('/about')({
  component: About,
})

const CV_URL = '/CV-Faiz-Ivan-Tama.pdf'

const highlights = [
  { Icon: FaBuilding, label: 'Sekarang di', value: 'PT Circle K Indonesia Utama' },
  { Icon: FaAward, label: 'Karya', value: 'HAKI Terdaftar' },
  { Icon: FaGraduationCap, label: 'S1 Informatika', value: `IPK ${education.gpa}` },
]

const contacts = [
  { Icon: FaEnvelope, label: 'Email', href: 'mailto:faizivantama01@gmail.com' },
  { Icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6285817818297' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/faizivantama' },
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/faizivntm' },
]

function About() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <SectionHeading
        title="Tentang"
        subtitle="Siapa di balik boyCode, dan kenapa situs ini ada."
      />

      {/* Intro */}
      <div className="pt-6 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="space-y-5 leading-relaxed text-mist">
          <p>
            Halo, gue <span className="font-semibold text-foam">Faiz Ivan Tama</span> —
            Software Engineer dari Depok. Sehari-hari bikin aplikasi di <span className="text-foam">PT Circkle K Indonesia Utama</span>, dan sebelumnya ngoding buat <span className="text-foam">PT United Tractors Tbk</span> dan buat riset &amp; proyek pemerintah bareng{' '}
            <span className="text-foam">BRIN</span> dan{' '}
            <span className="text-foam">KLHK</span>.
          </p>
          <p>
            Stack utama gue React, React Native, dan Flutter — dari aplikasi enterprise
            sampai fitur AI on-device. Salah satu karya gue, SIPEKA, sampai terdaftar Hak
            Cipta.
          </p>
          <p>
            <span className="font-semibold text-foam">boyCode</span> lahir dari kebiasaan
            gue nyatet biar nggak lupa. Ternyata nyatet itu cara belajar paling jujur —
            jadi gue rapihin, publikasikan, siapa tahu berguna buat yang lain juga.
          </p>
          <p className="font-semibold text-surf">
            Pelan-pelan aja, kalau buru-buru bisa kecelakaan.
          </p>
        </div>

        <BoyCodeLogo
          full
          className="order-first mx-auto h-64 w-auto drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] sm:h-72 lg:order-last"
        />
      </div>

      {/* Trust signals */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {highlights.map((h) => (
          <div
            key={h.value}
            className="flex items-center gap-3 rounded-2xl border border-line bg-tide/50 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surf/10 text-surf">
              <h.Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-mist">{h.label}</p>
              <p className="truncate font-semibold text-foam">{h.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pengalaman (timeline) */}
      <h2 className="mt-14 text-xl font-bold text-foam">Pengalaman</h2>
      <ol className="mt-6 space-y-8 border-l border-line pl-6">
        {experience.map((e) => (
          <li key={`${e.org}-${e.period}`} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-surf bg-abyss" />
            <p className="text-xs text-mist">{e.period}</p>
            <h3 className="mt-0.5 font-semibold text-foam">
              {e.role} <span className="text-surf">· {e.org}</span>
            </h3>
            <ul className="mt-2 space-y-1.5">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-mist">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-surf" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Pendidikan & sertifikasi */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-foam">Pendidikan</h2>
          <div className="mt-4 rounded-2xl border border-line bg-tide/50 p-5">
            <p className="font-semibold text-foam">{education.school}</p>
            <p className="text-sm text-mist">
              {education.major} · {education.period}
            </p>
            <p className="mt-1 text-sm text-surf">IPK {education.gpa}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foam">Sertifikasi</h2>
          <ul className="mt-4 space-y-2">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 rounded-xl border border-line bg-tide/50 px-4 py-3 text-sm text-mist"
              >
                <FaAward className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Kontak / CTA */}
      <div className="mt-14 rounded-2xl border border-line bg-tide/50 p-8 text-center">
        <h2 className="text-xl font-bold text-foam">Tertarik kerja bareng?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          Terbuka untuk peluang full-time maupun freelance. Ambil CV-nya atau langsung sapa
          gue lewat kanal di bawah.
        </p>
        <a
          href={CV_URL}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-surf px-5 py-2.5 text-sm font-semibold text-abyss transition-colors hover:bg-surf-deep hover:text-foam"
        >
          <FaDownload className="h-4 w-4" /> Download CV
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-mist transition-colors hover:border-surf/50 hover:text-foam"
            >
              <c.Icon className="h-4 w-4" /> {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
