'use client'

import { Skeleton, SkeletonText, SkeletonTitle, SkeletonCard } from '@/components/ui/skeleton'

export function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </div>
        <div className="space-y-3">
          <SkeletonText className="mx-auto w-4/5" />
          <SkeletonText className="mx-auto w-3/5" />
        </div>
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </section>
  )
}

export function AboutSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SkeletonTitle className="mx-auto mb-4" />
          <SkeletonText className="mx-auto w-2/3" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <SkeletonText />
              <SkeletonText />
              <SkeletonText className="w-4/5" />
            </div>
            <div className="space-y-3">
              <SkeletonText />
              <SkeletonText className="w-3/4" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SkeletonTitle className="mx-auto mb-4" />
          <SkeletonText className="mx-auto w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  )
}

export function ServicesSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SkeletonTitle className="mx-auto mb-4" />
          <SkeletonText className="mx-auto w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <SkeletonTitle className="w-3/4" />
              <div className="space-y-2">
                <SkeletonText />
                <SkeletonText className="w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BlogSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SkeletonTitle className="mx-auto mb-4" />
          <SkeletonText className="mx-auto w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSkeleton />
        <AboutSkeleton />
        <ProjectsSkeleton />
        <ServicesSkeleton />
        <BlogSkeleton />
      </main>
    </div>
  )
}
