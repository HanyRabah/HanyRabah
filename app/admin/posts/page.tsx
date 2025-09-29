'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Typography, Card } from 'antd'
import { FileTextOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import ContentTable from '@/components/admin/ContentTable'

const { Title, Text } = Typography

export default function PostsManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchPosts()
  }, [session, status, router])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || !session) {
    return null
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                <FileTextOutlined style={{ marginRight: 8 }} />
                Blog Posts
              </Title>
              <Text type="secondary">Manage your blog content</Text>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchPosts}
                loading={loading}
              >
                Refresh
              </Button>
              <Link href="/admin/posts/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  New Post
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <ContentTable
              data={posts}
              type="posts"
              loading={loading}
              onRefresh={fetchPosts}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
