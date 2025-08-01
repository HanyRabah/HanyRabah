import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  })

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.coverImage ? [project.coverImage] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true },
    })

    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    // Return empty array if database is not set up yet
    console.warn('Database not available during build, skipping static generation for projects')
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mb-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                View Code
              </a>
            )}
          </div>

          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full mb-8"
            />
          )}
        </header>

        {project.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        )}

        {project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
