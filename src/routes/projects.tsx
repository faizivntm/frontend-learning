import { createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { sortedProjects, PROJECT_GROUPS } from '@/content/projects'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

const GROUP_SUBTITLE: Record<string, string> = {
  Profesional: 'Karya di dunia kerja & riset — enterprise, pemerintah, dan industri.',
  'Open Source': 'Template & tools yang bebas kamu pakai, modif, dan bagikan.',
  Eksperimen: 'Latihan & eksplorasi. Tempat gue nyoba hal baru.',
}

function Projects() {
  const items = sortedProjects()

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        title="Karya & Pengalaman"
        subtitle="Dari aplikasi produksi sampai eksperimen semalam. Ini yang pernah gue bangun."
      />

      {items.length === 0 ? (
        <p className="mt-10 text-mist">Belum ada karya.</p>
      ) : (
        PROJECT_GROUPS.map((group) => {
          const groupItems = items.filter((p) => p.category === group)
          if (groupItems.length === 0) return null
          return (
            <section key={group} className="mt-12 first:mt-8">
              <h2 className="text-xl font-bold text-foam">{group}</h2>
              {GROUP_SUBTITLE[group] && (
                <p className="mt-1 text-sm text-mist">{GROUP_SUBTITLE[group]}</p>
              )}
              <div className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map((p) => (
                  <ProjectCard key={p.title} project={p} />
                ))}
              </div>
            </section>
          )
        })
      )}
    </div>
  )
}
