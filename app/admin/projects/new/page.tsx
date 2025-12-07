'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
  message
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { NotionEditor } from '@/components/admin/NotionEditor'

const { Title, Text } = Typography
const { TextArea } = Input

export default function NewProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [newTech, setNewTech] = useState('')
  const [technologies, setTechnologies] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }
  }, [session, status, router])

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    form.setFieldsValue({ title, slug })
  }

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true)
      
      const projectData = {
        ...values,
        technologies: technologies,
        images: images,
        coverImage: coverImage || null,
        liveUrl: values.liveUrl || null,
        githubUrl: values.githubUrl || null,
        content: content,
      }
      
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        message.success('Project created successfully!')
        router.push('/admin/projects')
      } else {
        message.error('Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      message.error('Failed to create project')
    } finally {
      setIsLoading(false)
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

  const addImageUrl = (url: string) => {
    if (url && !images.includes(url)) {
      setImages([...images, url])
      message.success('Image added to gallery')
    }
  }

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(img => img !== imageToRemove))
  }

  if (status === 'loading' || !session) {
    return null
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                Create New Project
              </Title>
              <Text type="secondary">Add a new project to your portfolio</Text>
            </div>
            <Link href="/admin/projects">
              <Button icon={<ArrowLeftOutlined />}>
                Back to Projects
              </Button>
            </Link>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              title: '',
              slug: '',
              description: '',
              content: '',
              featured: false,
              thumbnail: '',
              liveUrl: '',
              githubUrl: '',
            }}
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
                    <Input
                      placeholder="Enter project title..."
                      onChange={handleTitleChange}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please enter a slug' }]}
                    help="URL-friendly version of the title (auto-generated)"
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
                    help="Detailed project content with rich text formatting"
                  >
                    <NotionEditor
                      value={content}
                      onChange={(value) => {
                        setContent(value)
                      }}
                      placeholder="Start writing your project details... Type '/' for commands"
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
                        loading={isLoading}
                        icon={<SaveOutlined />}
                        size="large"
                        block
                      >
                        {isLoading ? 'Creating...' : 'Create Project'}
                      </Button>
                    </Form.Item>
                  </Card>

                  <Card title="Media">
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Cover Image</Text>
                      <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: 8 }}>
                        Main project image
                      </Text>
                      <ImageUpload
                        value={coverImage}
                        onChange={setCoverImage}
                        label="Upload Cover Image"
                        folder="projects/covers"
                      />
                    </div>

                    <div>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Additional Images</Text>
                      <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: 8 }}>
                        Upload images for project gallery
                      </Text>
                      <ImageUpload
                        value=""
                        onChange={addImageUrl}
                        label="Upload Image"
                        folder="projects/gallery"
                      />
                      {images.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                          {images.map((image, index) => (
                            <div key={`${image}-${index}`} style={{ position: 'relative' }}>
                              <img
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                style={{ 
                                  width: 80, 
                                  height: 80, 
                                  objectFit: 'cover', 
                                  borderRadius: 4,
                                  border: '1px solid #d9d9d9'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const parent = target.parentElement
                                  if (parent) {
                                    parent.innerHTML = `<div style="width: 80px; height: 80px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999; text-align: center; padding: 4px;">Image<br/>Error</div>`
                                  }
                                }}
                              />
                              <Button
                                size="small"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => removeImage(image)}
                                style={{ position: 'absolute', top: -8, right: -8 }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
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
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
