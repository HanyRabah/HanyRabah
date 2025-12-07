'use client'

import { useSession } from 'next-auth/react'
import { isAdmin } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Card, 
  Col, 
  Row, 
  Statistic, 
  Typography, 
  Button, 
  Space,
  Tabs,
  Table,
  Tag
} from 'antd'
import {
  FileTextOutlined,
  ProjectOutlined,
  PictureOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  MailOutlined,
  BarChartOutlined,
  LinkOutlined,
  GithubOutlined,
  DatabaseOutlined,
  CloudOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text } = Typography

// Recent Content Table Component
interface RecentContentTableProps {
  data: any[]
  type: string
  loading: boolean
}

function RecentContentTable({ data, type, loading }: RecentContentTableProps) {
  const getColumns = () => {
    const baseColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: any) => (
          <Link href={`/admin/${type}/${record.id}/edit`}>
            <Button type="link" style={{ padding: 0, height: 'auto' }}>
              {text}
            </Button>
          </Link>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        render: (record: any) => {
          const isPublished = record.published !== undefined ? record.published : true
          const isFeatured = record.featured || false
          return (
            <Space>
              <Tag color={isPublished ? 'green' : 'orange'}>
                {isPublished ? 'Published' : 'Draft'}
              </Tag>
              {isFeatured && <Tag color='blue'>Featured</Tag>}
            </Space>
          )
        },
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => new Date(date).toLocaleDateString(),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (record: any) => (
          <Space>
            <Link href={`/admin/${type}/${record.id}/edit`}>
              <Button size="small" icon={<EditOutlined />} />
            </Link>
            <Button size="small" icon={<EyeOutlined />} />
          </Space>
        ),
      },
    ]

    return baseColumns
  }

  return (
    <Table
      columns={getColumns()}
      dataSource={data}
      loading={loading}
      pagination={false}
      size="small"
      rowKey="id"
      locale={{ emptyText: `No recent ${type} found` }}
    />
  )
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    posts: 0,
    projects: 0,
    designs: 0,
    articles: 0,
    contacts: 0,
    views: 0
  })
  const [recentContent, setRecentContent] = useState<{
    posts: any[]
    projects: any[]
    designs: any[]
    contacts: any[]
  }>({
    posts: [],
    projects: [],
    designs: [],
    contacts: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || !isAdmin(session.user?.email)) {
      router.push('/admin/login')
      return
    }

    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const [statsRes, postsRes, projectsRes, designsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/posts?limit=5'),
        fetch('/api/admin/projects?limit=5'),
        fetch('/api/admin/designs?limit=5')
      ])
      
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats({
          posts: statsData.posts || 0,
          projects: statsData.projects || 0,
          designs: statsData.designs || 0,
          articles: statsData.articles || 0,
          contacts: statsData.contacts || 0,
          views: statsData.views || 0
        })
      }
      
      const [posts, projects, designs] = await Promise.all([
        postsRes.ok ? postsRes.json() : [],
        projectsRes.ok ? projectsRes.json() : [],
        designsRes.ok ? designsRes.json() : []
      ])
      
      setRecentContent({ posts, projects, designs, contacts: [] })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
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
          <Title level={2} style={{ marginBottom: 24 }}>Dashboard Overview</Title>
          
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Blog Posts"
                  value={stats.posts}
                  prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
                  loading={loading}
                />
                <Text type="secondary">Published articles</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Projects"
                  value={stats.projects}
                  prefix={<ProjectOutlined style={{ color: '#52c41a' }} />}
                  loading={loading}
                />
                <Text type="secondary">Portfolio projects</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Designs"
                  value={stats.designs}
                  prefix={<PictureOutlined style={{ color: '#faad14' }} />}
                  loading={loading}
                />
                <Text type="secondary">Design works</Text>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
            <Col xs={24} lg={12}>
              <Card title="Quick Actions" size="small">
                <Space wrap>
                  <Link href="/admin/posts/new">
                    <Button type="primary" icon={<PlusOutlined />}>
                      New Blog Post
                    </Button>
                  </Link>
                  <Link href="/admin/projects/new">
                    <Button icon={<PlusOutlined />}>
                      New Project
                    </Button>
                  </Link>
                  <Link href="/admin/designs/new">
                    <Button icon={<PlusOutlined />}>
                      New Design
                    </Button>
                  </Link>
                  <Link href="/admin/contacts">
                    <Button icon={<MailOutlined />}>
                      View Messages
                    </Button>
                  </Link>
                  <Link href="/admin/analytics">
                    <Button icon={<BarChartOutlined />}>
                      Analytics
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>

            {/* Useful Links */}
            <Col xs={24} lg={12}>
              <Card title="Useful Links" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <a 
                    href="https://github.com/HanyRabah/HanyRabah" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      block 
                      icon={<GithubOutlined />}
                      style={{ textAlign: 'left' }}
                    >
                      GitHub Repository
                    </Button>
                  </a>
                  <a 
                    href="https://vercel.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      block 
                      icon={<CloudOutlined />}
                      style={{ textAlign: 'left' }}
                    >
                      Vercel Dashboard
                    </Button>
                  </a>
                  <a 
                    href={process.env.NEXT_PUBLIC_DATABASE_URL ? 'https://supabase.com/dashboard' : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      block 
                      icon={<DatabaseOutlined />}
                      style={{ textAlign: 'left' }}
                    >
                      Database Dashboard
                    </Button>
                  </a>
                  <a 
                    href="https://analytics.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      block 
                      icon={<BarChartOutlined />}
                      style={{ textAlign: 'left' }}
                    >
                      Google Analytics
                    </Button>
                  </a>
                  <a 
                    href="/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      block 
                      icon={<LinkOutlined />}
                      style={{ textAlign: 'left' }}
                    >
                      View Live Site
                    </Button>
                  </a>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Recent Content Tabs */}
          <Card title="Recent Content" size="small">
            <Tabs 
              defaultActiveKey="posts"
              items={[
                {
                  key: 'posts',
                  label: 'Recent Posts',
                  children: (
                    <RecentContentTable 
                      data={recentContent.posts} 
                      type="posts" 
                      loading={loading}
                    />
                  ),
                },
                {
                  key: 'projects',
                  label: 'Recent Projects',
                  children: (
                    <RecentContentTable 
                      data={recentContent.projects} 
                      type="projects" 
                      loading={loading}
                    />
                  ),
                },
                {
                  key: 'designs',
                  label: 'Recent Designs',
                  children: (
                    <RecentContentTable 
                      data={recentContent.designs} 
                      type="designs" 
                      loading={loading}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
