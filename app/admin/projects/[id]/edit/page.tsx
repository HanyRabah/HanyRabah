'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Button, 
  Typography, 
  Space,
  message,
  Spin
} from 'antd'
import {
  ArrowLeftOutlined,
  EyeOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import { ProjectEditForm } from '@/components/admin/ProjectEditForm'

const { Title, Text } = Typography

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  published: boolean
  featured: boolean
  coverImage: string | null
  images: string[]
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  createdAt: string
  updatedAt: string
}

export default function EditProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchProject()
  }, [session, status, router, params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`)
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
      } else {
        message.error('Project not found')
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
      message.error('Failed to fetch project')
      router.push('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (projectData: any) => {
    const response = await fetch(`/api/admin/projects/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })

    if (response.ok) {
      message.success('Project updated successfully!')
      router.push('/admin/projects')
    } else {
      throw new Error('Failed to update project')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AntdProvider>
        <AdminLayout>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" />
          </div>
        </AdminLayout>
      </AntdProvider>
    )
  }

  if (!project) {
    return (
      <AntdProvider>
        <AdminLayout>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={3}>Project not found</Title>
            <Link href="/admin/projects">
              <Button type="primary">Back to Projects</Button>
            </Link>
          </div>
        </AdminLayout>
      </AntdProvider>
    )
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                Edit Project
              </Title>
              <Text type="secondary">Modify your project details</Text>
            </div>
            <Space>
              <Link href={`/projects/${project.slug}`} target="_blank">
                <Button icon={<EyeOutlined />}>
                  Preview
                </Button>
              </Link>
              <Link href="/admin/projects">
                <Button icon={<ArrowLeftOutlined />}>
                  Back to Projects
                </Button>
              </Link>
            </Space>
          </div>

          <ProjectEditForm project={project} onSave={handleSave} />
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
