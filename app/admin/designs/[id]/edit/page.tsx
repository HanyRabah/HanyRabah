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
  Descriptions,
  Select
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
import { ImageUpload } from '@/components/admin/ImageUpload'

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

interface Design {
  id: string
  title: string
  slug: string
  description: string
  content: string
  published: boolean
  featured: boolean
  coverImage: string | null
  images: string[]
  tags: string[]
  category: string
  tools: string[]
  clientName: string | null
  projectUrl: string | null
  figmaUrl: string | null
  behanceUrl: string | null
  dribbbleUrl: string | null
  createdAt: string
  updatedAt: string
}

const DESIGN_CATEGORIES = [
  'WEB_DESIGN',
  'MOBILE_APP',
  'UI_UX',
  'BRANDING',
  'ILLUSTRATION',
  'DESIGN_SYSTEM'
]

export default function EditDesign() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [form] = Form.useForm()
  const [design, setDesign] = useState<Design | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tools, setTools] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string>('')
  const [newTool, setNewTool] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchDesign()
  }, [session, status, router, params.id])

  const fetchDesign = async () => {
    try {
      const response = await fetch(`/api/admin/designs/${params.id}`)
      if (response.ok) {
        const designData = await response.json()
        setDesign(designData)
        setTools(designData.tools || [])
        setImages(designData.images || [])
        setTags(designData.tags || [])
        setCoverImage(designData.coverImage || '')
        form.setFieldsValue({
          title: designData.title,
          slug: designData.slug,
          description: designData.description,
          content: designData.content,
          published: designData.published,
          featured: designData.featured,
          category: designData.category,
          coverImage: designData.coverImage || '',
          clientName: designData.clientName || '',
          projectUrl: designData.projectUrl || '',
          figmaUrl: designData.figmaUrl || '',
          behanceUrl: designData.behanceUrl || '',
          dribbbleUrl: designData.dribbbleUrl || ''
        })
      } else {
        message.error('Design not found')
        router.push('/admin/work')
      }
    } catch (error) {
      console.error('Failed to fetch design:', error)
      message.error('Failed to fetch design')
      router.push('/admin/work')
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values: any) => {
    try {
      setSaving(true)
      
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
      
      const response = await fetch(`/api/admin/designs/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      })

      if (response.ok) {
        message.success('Design updated successfully!')
        router.push('/admin/designs')
      } else {
        message.error('Failed to update design')
      }
    } catch (error) {
      console.error('Failed to save design:', error)
      message.error('Failed to update design')
    } finally {
      setSaving(false)
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

  if (!design) {
    return (
      <AntdProvider>
        <AdminLayout>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={3}>Design not found</Title>
            <Link href="/admin/designs">
              <Button type="primary">Back to Designs</Button>
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
                Edit Design
              </Title>
              <Text type="secondary">Modify your design details</Text>
            </div>
            <Space>
              <Link href={`/designs/${design.slug}`} target="_blank">
                <Button icon={<EyeOutlined />}>
                  Preview
                </Button>
              </Link>
              <Link href="/admin/work">
                <Button icon={<ArrowLeftOutlined />}>
                  Back to Designs
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
                <Card title="Design Details" style={{ marginBottom: 24 }}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input placeholder="Enter design title..." size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please enter a slug' }]}
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

                  <Card title="Design Information">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Status">
                        <Tag color={design.featured ? 'blue' : 'default'}>
                          {design.featured ? 'Featured' : 'Regular'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Category">
                        {design.category.replace('_', ' ')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Created">
                        {new Date(design.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated">
                        {new Date(design.updatedAt).toLocaleDateString()}
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
