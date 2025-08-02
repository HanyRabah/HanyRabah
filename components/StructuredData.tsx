interface StructuredDataProps {
  type: 'Person' | 'Article' | 'WebSite' | 'Blog'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema: any = {}

  switch (type) {
    case 'Person':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        jobTitle: data.jobTitle,
        description: data.description,
        url: data.url,
        sameAs: data.sameAs,
        image: data.image,
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.location,
          addressCountry: 'DE'
        },
        worksFor: {
          '@type': 'Organization',
          name: data.company,
          url: data.companyUrl
        },
        knowsAbout: data.skills,
        alumniOf: data.education,
      }
      break

    case 'Article':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url
        },
        publisher: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        keywords: data.keywords,
        articleSection: 'Technology',
        wordCount: data.wordCount,
        timeRequired: `PT${data.readingTime}M`,
      }
      break

    case 'WebSite':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name,
        description: data.description,
        url: data.url,
        author: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${data.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
      break

    case 'Blog':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: data.name,
        description: data.description,
        url: data.url,
        author: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url
        },
        publisher: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url
        },
        inLanguage: 'en-US',
        blogPost: data.posts?.map((post: any) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${data.url}/${post.slug}`,
          datePublished: post.datePublished,
          author: {
            '@type': 'Person',
            name: data.author.name,
            url: data.author.url
          }
        }))
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
