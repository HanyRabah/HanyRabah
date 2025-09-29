'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Typography, Card } from 'antd'
import { BookOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import ContentTable from '@/components/admin/ContentTable'

const { Title, Text } = Typography

export default function ArticlesManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchArticles()
  }, [session, status, router])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
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
                <BookOutlined style={{ marginRight: 8 }} />
                Technical Articles
              </Title>
              <Text type="secondary">Manage your technical articles and tutorials</Text>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchArticles}
                loading={loading}
              >
                Refresh
              </Button>
              <Link href="/admin/articles/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  New Article
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <ContentTable
              data={articles}
              type="articles"
              loading={loading}
              onRefresh={fetchArticles}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
