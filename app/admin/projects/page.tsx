'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Typography, Card } from 'antd'
import { ProjectOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import ContentTable from '@/components/admin/ContentTable'

const { Title, Text } = Typography

export default function ProjectsManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
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
                <ProjectOutlined style={{ marginRight: 8 }} />
                Projects
              </Title>
              <Text type="secondary">Manage your portfolio projects</Text>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchProjects}
                loading={loading}
              >
                Refresh
              </Button>
              <Link href="/admin/projects/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  New Project
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <ContentTable
              data={projects}
              type="projects"
              loading={loading}
              onRefresh={fetchProjects}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
