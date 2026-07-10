import { useState } from 'react'
import { FaGithub, FaArrowUpRightFromSquare, FaAward } from 'react-icons/fa6'
import { Button } from '@/components/atoms/Button'
import type { Project } from '@/content/projects'
import { formatDate } from '@/lib/utils'

// Molecule: kartu satu karya. Karya profesional (tanpa repo) menonjolkan
// peran + dampak; karya open-source menonjolkan tombol repo/demo.
export function ProjectCard({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false)
  const link = project.demo ?? project.repo

  async function share() {
    const url = link ?? window.location.href
    const data = { title: project.title, text: project.description, url }
    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        // user membatalkan — abaikan
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard diblokir — abaikan
    }
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-tide/60 p-5">
      <div className="flex items-center justify-between gap-2 text-xs text-mist">
        <span className="rounded-full bg-surf/10 px-2.5 py-1 font-medium text-surf">
          {project.category}
        </span>
        {project.date && <time dateTime={project.date}>{formatDate(project.date)}</time>}
      </div>

      {project.badge && (
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-sun/15 px-2.5 py-1 text-xs font-semibold text-sun">
          <FaAward className="h-3 w-3" /> {project.badge}
        </span>
      )}

      <h3 className="mt-3 text-lg font-semibold text-foam">{project.title}</h3>
      {project.role && (
        <p className="mt-0.5 text-sm font-medium text-surf">{project.role}</p>
      )}
      <p className="mt-2 text-sm text-mist">{project.description}</p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-mist">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-surf" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md border border-line px-2 py-0.5 text-xs text-mist">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-surf px-4 py-2.5 text-sm font-semibold text-abyss transition-colors hover:bg-surf-deep hover:text-foam"
          >
            <FaArrowUpRightFromSquare className="h-3.5 w-3.5" /> Demo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              project.demo
                ? 'border border-line bg-white/5 text-foam hover:bg-white/10'
                : 'bg-surf text-abyss hover:bg-surf-deep hover:text-foam'
            }`}
          >
            <FaGithub className="h-4 w-4" /> Repo
          </a>
        )}
        <Button variant="secondary" onClick={share}>
          {copied ? 'Link tersalin!' : 'Bagikan'}
        </Button>
      </div>
    </div>
  )
}
