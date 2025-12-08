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
  message,
  Select
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

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

interface DesignFormData {
  title: string
  slug: string
  description: string
  content: string
  published: boolean
  featured: boolean
  category: string
  coverImage: string
  images: string[]
  tools: string[]
  clientName: string
  projectUrl: string
  figmaUrl: string
  behanceUrl: string
  dribbbleUrl: string
  tags: string[]
}

const DESIGN_CATEGORIES = [
  'WEB_DESIGN',
  'MOBILE_APP',
  'UI_UX',
  'BRANDING',
  'ILLUSTRATION',
  'DESIGN_SYSTEM'
]

export default function NewDesign() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [newTool, setNewTool] = useState('')
  const [tools, setTools] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState<string[]>([])

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
      
      const designData = {
        ...values,
        tools: tools,
        images: images,
        tags: tags,
        coverImage: coverImage || null,
        clientName: values.clientName || null,
        projectUrl: values.projectUrl || null,
        figmaUrl: values.figmaUrl || null,
        behanceUrl: values.behanceUrl || null,
        dribbbleUrl: values.dribbbleUrl || null,
      }
      
      const response = await fetch('/api/admin/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      })

      if (response.ok) {
        message.success('Design created successfully!')
        router.push('/admin/designs')
      } else {
        message.error('Failed to create design')
      }
    } catch (error) {
      console.error('Error creating design:', error)
      message.error('Failed to create design')
    } finally {
      setIsLoading(false)
    }
  }

  const addTool = () => {
    if (newTool.trim() && !tools.includes(newTool.trim())) {
      setTools([...tools, newTool.trim()])
      setNewTool('')
    }
  }

  const removeTool = (toolToRemove: string) => {
    setTools(tools.filter(tool => tool !== toolToRemove))
  }

  const handleAddImage = (url: string) => {
    if (url && !images.includes(url)) {
      setImages([...images, url])
    }
  }

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(img => img !== imageToRemove))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
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
                Create New Design
              </Title>
              <Text type="secondary">Add a new design to your portfolio</Text>
            </div>
            <Link href="/admin/work">
              <Button icon={<ArrowLeftOutlined />}>
                Back to Designs
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
              published: false,
              featured: false,
              category: 'WEB_DESIGN',
              clientName: '',
              projectUrl: '',
              figmaUrl: '',
              behanceUrl: '',
              dribbbleUrl: '',
            }}
          >
            <Row gutter={24}>
              {/* Main Content */}
              <Col xs={24} lg={16}>
                <Card title="Design Details" style={{ marginBottom: 24 }}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input
                      placeholder="Enter design title..."
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
                    <Input placeholder="design-url-slug" />
                  </Form.Item>

                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                  >
                    <Select placeholder="Select design category">
                      {DESIGN_CATEGORIES.map(category => (
                        <Option key={category} value={category}>
                          {category.replace('_', ' ')}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                    help="Brief description shown in design listings"
                  >
                    <TextArea
                      placeholder="Brief description of the design..."
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                    help="Detailed design description and process"
                  >
                    <TextArea
                      placeholder="Detailed design description, process, challenges, and solutions..."
                      rows={15}
                    />
                  </Form.Item>
                </Card>
              </Col>

              {/* Sidebar */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Card title="Design Settings">
                    <Form.Item
                      label="Published"
                      name="published"
                      valuePropName="checked"
                      help="Only published designs appear on the website"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      label="Featured"
                      name="featured"
                      valuePropName="checked"
                      help="Mark this design as featured"
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
                        {isLoading ? 'Creating...' : 'Create Design'}
                      </Button>
                    </Form.Item>
                  </Card>

                  <Card title="Media">
                    <div style={{ marginBottom: 16 }}>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Cover Image</Text>
                      <ImageUpload
                        value={coverImage}
                        onChange={(url) => setCoverImage(url)}
                        label="Upload Cover Image"
                        folder="designs"
                      />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Additional Images</Text>
                      <ImageUpload
                        value=""
                        onChange={handleAddImage}
                        label="Add Image"
                        folder="designs"
                      />
                      <div style={{ marginTop: 12 }}>
                        {images.map((image) => (
                          <div 
                            key={image} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 8, 
                              marginBottom: 8,
                              padding: '8px 12px',
                              background: '#f5f5f5',
                              borderRadius: 6,
                              border: '1px solid #e8e8e8'
                            }}
                          >
                            <span style={{ 
                              flex: 1, 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap',
                              fontSize: 13
                            }}>
                              {image.length > 40 ? `${image.substring(0, 40)}...` : image}
                            </span>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<CloseOutlined />}
                              onClick={() => removeImage(image)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card title="Tools & Technologies">
                    <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                      <Input
                        placeholder="Add tool/technology..."
                        value={newTool}
                        onChange={(e) => setNewTool(e.target.value)}
                        onPressEnter={addTool}
                      />
                      <Button
                        type="primary"
                        onClick={addTool}
                        icon={<PlusOutlined />}
                      />
                    </Space.Compact>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {tools.map((tool) => (
                        <Tag
                          key={tool}
                          closable
                          onClose={() => removeTool(tool)}
                          closeIcon={<CloseOutlined />}
                        >
                          {tool}
                        </Tag>
                      ))}
                    </div>
                  </Card>

                  <Card title="Client & Links">
                    <Form.Item
                      label="Client Name"
                      name="clientName"
                      help="Client or company name"
                    >
                      <Input placeholder="Client name" />
                    </Form.Item>

                    <Form.Item
                      label="Project URL"
                      name="projectUrl"
                      help="Link to the live project"
                    >
                      <Input placeholder="https://project-url.com" />
                    </Form.Item>

                    <Form.Item
                      label="Figma URL"
                      name="figmaUrl"
                      help="Link to Figma design"
                    >
                      <Input placeholder="https://figma.com/..." />
                    </Form.Item>

                    <Form.Item
                      label="Behance URL"
                      name="behanceUrl"
                      help="Link to Behance project"
                    >
                      <Input placeholder="https://behance.net/..." />
                    </Form.Item>

                    <Form.Item
                      label="Dribbble URL"
                      name="dribbbleUrl"
                      help="Link to Dribbble shot"
                    >
                      <Input placeholder="https://dribbble.com/..." />
                    </Form.Item>
                  </Card>

                  <Card title="Tags">
                    <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onPressEnter={addTag}
                      />
                      <Button
                        type="primary"
                        onClick={addTag}
                        icon={<PlusOutlined />}
                      />
                    </Space.Compact>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {tags.map((tag) => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => removeTag(tag)}
                          closeIcon={<CloseOutlined />}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
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
