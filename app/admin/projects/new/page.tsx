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
  Tabs,
  Modal
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  PlusOutlined,
  CloseOutlined,
  EyeOutlined,
  CodeOutlined,
  PictureOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text } = Typography
const { TextArea } = Input

interface ProjectFormData {
  title: string
  slug: string
  description: string
  content: string
  featured: boolean
  thumbnail: string
  images: string[]
  technologies: string[]
  liveUrl: string
  githubUrl: string
}

export default function NewProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [newTech, setNewTech] = useState('')
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newImage, setNewImage] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [contentMode, setContentMode] = useState<'write' | 'preview'>('write')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [codeSnippet, setCodeSnippet] = useState('')
  const [codeLanguage, setCodeLanguage] = useState('javascript')

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
        thumbnail: values.thumbnail || null,
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

  const addImage = () => {
    if (newImage.trim() && !images.includes(newImage.trim())) {
      setImages([...images, newImage.trim()])
      setNewImage('')
    }
  }

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(img => img !== imageToRemove))
  }

  const insertImage = () => {
    if (imageUrl.trim()) {
      const imageHtml = `<img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto; margin: 10px 0;" />`
      setContent(prev => prev + '\n\n' + imageHtml + '\n\n')
      form.setFieldsValue({ content: content + '\n\n' + imageHtml + '\n\n' })
      setImageUrl('')
      setShowImageModal(false)
    }
  }

  const insertCode = () => {
    if (codeSnippet.trim()) {
      const codeHtml = `<pre><code class="language-${codeLanguage}">${codeSnippet}</code></pre>`
      setContent(prev => prev + '\n\n' + codeHtml + '\n\n')
      form.setFieldsValue({ content: content + '\n\n' + codeHtml + '\n\n' })
      setCodeSnippet('')
      setShowCodeModal(false)
    }
  }

  const insertHtml = (htmlTag: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)
      
      let htmlToInsert = ''
      switch (htmlTag) {
        case 'bold':
          htmlToInsert = `<strong>${selectedText || 'Bold text'}</strong>`
          break
        case 'italic':
          htmlToInsert = `<em>${selectedText || 'Italic text'}</em>`
          break
        case 'h1':
          htmlToInsert = `<h1>${selectedText || 'Heading 1'}</h1>`
          break
        case 'h2':
          htmlToInsert = `<h2>${selectedText || 'Heading 2'}</h2>`
          break
        case 'h3':
          htmlToInsert = `<h3>${selectedText || 'Heading 3'}</h3>`
          break
        case 'p':
          htmlToInsert = `<p>${selectedText || 'Paragraph text'}</p>`
          break
        case 'ul':
          htmlToInsert = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`
          break
        case 'ol':
          htmlToInsert = `<ol>\n  <li>${selectedText || 'List item'}</li>\n</ol>`
          break
        case 'blockquote':
          htmlToInsert = `<blockquote>${selectedText || 'Quote text'}</blockquote>`
          break
        case 'link':
          htmlToInsert = `<a href="#">${selectedText || 'Link text'}</a>`
          break
      }
      
      const newContent = textarea.value.substring(0, start) + htmlToInsert + textarea.value.substring(end)
      setContent(newContent)
      form.setFieldsValue({ content: newContent })
    }
  }

  const renderPreview = (htmlContent: string) => {
    return (
      <div 
        className="content-preview"
        style={{ 
          minHeight: '400px', 
          padding: '16px', 
          border: '1px solid #d9d9d9', 
          borderRadius: '6px',
          backgroundColor: '#fafafa'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
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
                    name="content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                    help="Detailed project content (HTML supported)"
                  >
                    <div>
                      {/* Rich Text Toolbar */}
                      <div style={{ 
                        marginBottom: '8px', 
                        padding: '8px', 
                        border: '1px solid #d9d9d9', 
                        borderRadius: '6px 6px 0 0',
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        <Button size="small" onClick={() => insertHtml('bold')} title="Bold">
                          <strong>B</strong>
                        </Button>
                        <Button size="small" onClick={() => insertHtml('italic')} title="Italic">
                          <em>I</em>
                        </Button>
                        <Button size="small" onClick={() => insertHtml('h1')} title="Heading 1">
                          H1
                        </Button>
                        <Button size="small" onClick={() => insertHtml('h2')} title="Heading 2">
                          H2
                        </Button>
                        <Button size="small" onClick={() => insertHtml('h3')} title="Heading 3">
                          H3
                        </Button>
                        <Button size="small" onClick={() => insertHtml('p')} title="Paragraph">
                          P
                        </Button>
                        <Button size="small" onClick={() => insertHtml('ul')} title="Bullet List">
                          • List
                        </Button>
                        <Button size="small" onClick={() => insertHtml('ol')} title="Numbered List">
                          1. List
                        </Button>
                        <Button size="small" onClick={() => insertHtml('blockquote')} title="Quote">
                          Quote
                        </Button>
                        <Button size="small" onClick={() => insertHtml('link')} title="Link">
                          Link
                        </Button>
                        <Button 
                          size="small" 
                          icon={<PictureOutlined />} 
                          onClick={() => setShowImageModal(true)}
                          title="Insert Image"
                        >
                          Image
                        </Button>
                        <Button 
                          size="small" 
                          icon={<CodeOutlined />} 
                          onClick={() => setShowCodeModal(true)}
                          title="Insert Code"
                        >
                          Code
                        </Button>
                      </div>

                      {/* Content Tabs */}
                      <Tabs
                        activeKey={contentMode}
                        onChange={(key) => setContentMode(key as 'write' | 'preview')}
                        items={[
                          {
                            key: 'write',
                            label: 'Write',
                            children: (
                              <TextArea
                                placeholder="Write your project content here... (HTML supported)\n\nDescribe your project, the challenges you faced, technologies used, and what you learned."
                                rows={15}
                                value={content}
                                onChange={(e) => {
                                  setContent(e.target.value)
                                  form.setFieldsValue({ content: e.target.value })
                                }}
                                style={{ borderRadius: '0 0 6px 6px' }}
                              />
                            )
                          },
                          {
                            key: 'preview',
                            label: (
                              <span>
                                <EyeOutlined /> Preview
                              </span>
                            ),
                            children: renderPreview(content)
                          }
                        ]}
                      />
                    </div>
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
                </Space>
              </Col>
            </Row>
          </Form>

          {/* Image Modal */}
          <Modal
            title="Insert Image"
            open={showImageModal}
            onOk={insertImage}
            onCancel={() => {
              setShowImageModal(false)
              setImageUrl('')
            }}
            okText="Insert"
          >
            <Form layout="vertical">
              <Form.Item label="Image URL">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Form.Item>
              <Form.Item help="Paste the URL of your image. The image will be inserted at the current cursor position.">
                {imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </Form.Item>
            </Form>
          </Modal>

          {/* Code Modal */}
          <Modal
            title="Insert Code Block"
            open={showCodeModal}
            onOk={insertCode}
            onCancel={() => {
              setShowCodeModal(false)
              setCodeSnippet('')
            }}
            okText="Insert"
            width={600}
          >
            <Form layout="vertical">
              <Form.Item label="Programming Language">
                <Input
                  placeholder="javascript, python, html, css, etc."
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Code">
                <TextArea
                  placeholder="Enter your code here..."
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  rows={8}
                  style={{ fontFamily: 'monospace' }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
