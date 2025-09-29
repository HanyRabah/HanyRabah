'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Button, 
  Card, 
  Input, 
  Form, 
  Switch, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Space,
  message,
  Spin,
  Descriptions
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  EyeOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text } = Typography
const { TextArea } = Input

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured: boolean
  thumbnail: string | null
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
  const [form] = Form.useForm()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [technologies, setTechnologies] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [newTech, setNewTech] = useState('')
  const [newImage, setNewImage] = useState('')

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
        setTechnologies(projectData.technologies || [])
        setImages(projectData.images || [])
        form.setFieldsValue({
          title: projectData.title,
          slug: projectData.slug,
          description: projectData.description,
          content: projectData.content,
          featured: projectData.featured,
          thumbnail: projectData.thumbnail || '',
          liveUrl: projectData.liveUrl || '',
          githubUrl: projectData.githubUrl || ''
        })
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

  const onFinish = async (values: any) => {
    try {
      setSaving(true)
      
      const projectData = {
        ...values,
        technologies: technologies,
        images: images,
        thumbnail: values.thumbnail || null,
        liveUrl: values.liveUrl || null,
        githubUrl: values.githubUrl || null,
      }
      
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
        message.error('Failed to update project')
      }
    } catch (error) {
      console.error('Failed to save project:', error)
      message.error('Failed to update project')
    } finally {
      setSaving(false)
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()])
      setNewTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove))
  }

  const addImage = () => {
    if (newImage.trim() && !images.includes(newImage.trim())) {
      setImages([...images, newImage.trim()])
      setNewImage('')
    }
  }

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(img => img !== imageToRemove))
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

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={24}>
              {/* Main Content */}
              <Col xs={24} lg={16}>
                <Card title="Project Details" style={{ marginBottom: 24 }}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input placeholder="Enter project title..." size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please enter a slug' }]}
                  >
                    <Input placeholder="project-url-slug" />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                    help="Brief description shown in project listings"
                  >
                    <TextArea
                      placeholder="Brief description of the project..."
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                    help="Detailed project content"
                  >
                    <TextArea
                      placeholder="Detailed project description..."
                      rows={15}
                    />
                  </Form.Item>
                </Card>
              </Col>

              {/* Sidebar */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Card title="Project Settings">
                    <Form.Item
                      label="Featured"
                      name="featured"
                      valuePropName="checked"
                      help="Mark this project as featured"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                        icon={<SaveOutlined />}
                        size="large"
                        block
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Form.Item>
                  </Card>

                  <Card title="Media">
                    <Form.Item
                      label="Thumbnail URL"
                      name="thumbnail"
                      help="Main project image"
                    >
                      <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>

                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Additional Images</Text>
                      <Space.Compact style={{ width: '100%', marginTop: 8 }}>
                        <Input
                          placeholder="Image URL..."
                          value={newImage}
                          onChange={(e) => setNewImage(e.target.value)}
                          onPressEnter={addImage}
                        />
                        <Button
                          type="primary"
                          onClick={addImage}
                          icon={<PlusOutlined />}
                        />
                      </Space.Compact>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                        {images.map((image) => (
                          <Tag
                            key={image}
                            closable
                            onClose={() => removeImage(image)}
                            closeIcon={<CloseOutlined />}
                            style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {image.length > 30 ? `${image.substring(0, 30)}...` : image}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card title="Technologies">
                    <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                      <Input
                        placeholder="Add technology..."
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onPressEnter={addTechnology}
                      />
                      <Button
                        type="primary"
                        onClick={addTechnology}
                        icon={<PlusOutlined />}
                      />
                    </Space.Compact>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {technologies.map((tech) => (
                        <Tag
                          key={tech}
                          closable
                          onClose={() => removeTechnology(tech)}
                          closeIcon={<CloseOutlined />}
                        >
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </Card>

                  <Card title="Links">
                    <Form.Item
                      label="Live URL"
                      name="liveUrl"
                      help="Link to the live project"
                    >
                      <Input placeholder="https://project-demo.com" />
                    </Form.Item>

                    <Form.Item
                      label="GitHub URL"
                      name="githubUrl"
                      help="Link to the source code"
                    >
                      <Input placeholder="https://github.com/user/repo" />
                    </Form.Item>
                  </Card>

                  <Card title="Project Information">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Status">
                        <Tag color={project.featured ? 'blue' : 'default'}>
                          {project.featured ? 'Featured' : 'Regular'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Created">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
