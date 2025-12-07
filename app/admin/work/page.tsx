'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { isAdmin } from '@/lib/auth'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  message,
  Popconfirm,
  Tabs,
  Spin
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons'
import Link from 'next/link'

type WorkType = 'development' | 'design'

interface WorkItem {
  id: string
  title: string
  slug: string
  description: string
  featured: boolean
  coverImage?: string
  createdAt: string
  updatedAt: string
  // Project fields
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  status?: string
  // Design fields
  tools?: string[]
  category?: string
  figmaUrl?: string
  behanceUrl?: string
  dribbbleUrl?: string
}

export default function AdminWorkPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<WorkItem[]>([])
  const [designs, setDesigns] = useState<WorkItem[]>([])
  const [activeTab, setActiveTab] = useState<WorkType>('development')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated' && session && !isAdmin(session.user?.email || '')) {
      router.push('/')
    } else if (status === 'authenticated') {
      fetchWork()
    }
  }, [status, session, router])

  const fetchWork = async () => {
    setLoading(true)
    try {
      const [projectsRes, designsRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/designs')
      ])
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }
      
      if (designsRes.ok) {
        const designsData = await designsRes.json()
        setDesigns(designsData)
      }
    } catch (error) {
      message.error('Failed to fetch work items')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeatured = async (id: string, type: WorkType, currentFeatured: boolean) => {
    try {
      const endpoint = type === 'development' ? '/api/admin/projects' : '/api/admin/designs'
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured })
      })

      if (response.ok) {
        message.success(`${currentFeatured ? 'Removed from' : 'Added to'} featured`)
        fetchWork()
      } else {
        message.error('Failed to update featured status')
      }
    } catch (error) {
      message.error('Failed to update featured status')
    }
  }

  const handleDelete = async (id: string, type: WorkType) => {
    try {
      const endpoint = type === 'development' ? '/api/admin/projects' : '/api/admin/designs'
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        message.success('Deleted successfully')
        fetchWork()
      } else {
        message.error('Failed to delete')
      }
    } catch (error) {
      message.error('Failed to delete')
    }
  }

  const projectColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: WorkItem) => (
        <Space>
          {record.featured && <StarFilled style={{ color: '#faad14' }} />}
          <span className="font-medium">{text}</span>
        </Space>
      )
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (technologies: string[]) => (
        <Space wrap>
          {technologies?.slice(0, 3).map(tech => (
            <Tag key={tech} color="blue">{tech}</Tag>
          ))}
          {technologies?.length > 3 && <Tag>+{technologies.length - 3}</Tag>}
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'COMPLETED' ? 'green' : status === 'IN_PROGRESS' ? 'blue' : 'default'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkItem) => (
        <Space>
          <Button
            type="text"
            icon={record.featured ? <StarFilled /> : <StarOutlined />}
            onClick={() => handleToggleFeatured(record.id, 'development', record.featured)}
            title={record.featured ? 'Remove from featured' : 'Add to featured'}
          />
          <Link href={`/admin/projects/${record.id}/edit`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>
          <Link href={`/projects/${record.slug}`} target="_blank">
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={() => handleDelete(record.id, 'development')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const designColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: WorkItem) => (
        <Space>
          {record.featured && <StarFilled style={{ color: '#faad14' }} />}
          <span className="font-medium">{text}</span>
        </Space>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="purple">{category?.replace(/_/g, ' ')}</Tag>
      )
    },
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
      render: (tools: string[]) => (
        <Space wrap>
          {tools?.slice(0, 3).map(tool => (
            <Tag key={tool} color="cyan">{tool}</Tag>
          ))}
          {tools?.length > 3 && <Tag>+{tools.length - 3}</Tag>}
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkItem) => (
        <Space>
          <Button
            type="text"
            icon={record.featured ? <StarFilled /> : <StarOutlined />}
            onClick={() => handleToggleFeatured(record.id, 'design', record.featured)}
            title={record.featured ? 'Remove from featured' : 'Add to featured'}
          />
          <Link href={`/admin/designs/${record.id}/edit`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>
          <Link href={`/design/${record.slug}`} target="_blank">
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this design?"
            onConfirm={() => handleDelete(record.id, 'design')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  if (status === 'loading' || !session || !isAdmin(session.user?.email || '')) {
    return (
      <AntdProvider>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      </AntdProvider>
    )
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <div style={{ padding: '24px' }}>
          <Card
            title="Work Management"
            extra={
              <Space>
                <Link href="/admin/projects/new">
                  <Button type="primary" icon={<PlusOutlined />}>
                    New Project
                  </Button>
                </Link>
                <Link href="/admin/designs/new">
                  <Button type="primary" icon={<PlusOutlined />}>
                    New Design
                  </Button>
                </Link>
              </Space>
            }
          >
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key as WorkType)}
              items={[
                {
                  key: 'development',
                  label: `Development (${projects.length})`,
                  children: (
                    <Table
                      dataSource={projects}
                      columns={projectColumns}
                      rowKey="id"
                      loading={loading}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} projects`
                      }}
                    />
                  )
                },
                {
                  key: 'design',
                  label: `Design (${designs.length})`,
                  children: (
                    <Table
                      dataSource={designs}
                      columns={designColumns}
                      rowKey="id"
                      loading={loading}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} designs`
                      }}
                    />
                  )
                }
              ]}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
