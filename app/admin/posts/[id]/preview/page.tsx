'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Spin, Typography, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import '@/app/blog/[slug]/blog-post.css'

const { Title, Text } = Typography

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  tags: string[]
  coverImage: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export default function PreviewPost() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      if (response.ok) {
        const postData = await response.json()
        setPost(postData)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#fff'
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#fff',
        padding: '2rem'
      }}>
        <Title level={3}>Post not found</Title>
        <Link href={`/admin/posts/${params.id}/edit`}>
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Editor
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Preview Header */}
      <div style={{ 
        background: '#f0f0f0', 
        padding: '1rem 2rem',
        borderBottom: '1px solid #d9d9d9',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Text strong style={{ fontSize: '16px' }}>Preview Mode</Text>
            <Text type="secondary" style={{ marginLeft: '1rem' }}>
              {post.published ? 'Published' : 'Draft'}
            </Text>
          </div>
          <Link href={`/admin/posts/${params.id}/edit`}>
            <Button icon={<ArrowLeftOutlined />}>
              Back to Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Post Preview */}
      <article style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '3rem 2rem'
      }}>
        {/* Cover Image */}
        {post.coverImage && (
          <div style={{ 
            marginBottom: '2rem',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        {/* Title */}
        <Title level={1} style={{ marginBottom: '0.5rem' }}>
          {post.title}
        </Title>

        {/* Meta Info */}
        <div style={{ 
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <Text type="secondary">
            {post.publishedAt 
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
            }
          </Text>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div style={{ 
            fontSize: '1.125rem',
            lineHeight: '1.75',
            color: '#666',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div 
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            color: '#333'
          }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ 
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e8e8e8'
          }}>
            <Text strong style={{ marginRight: '1rem' }}>Tags:</Text>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  marginRight: '0.5rem',
                  marginBottom: '0.5rem',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}
