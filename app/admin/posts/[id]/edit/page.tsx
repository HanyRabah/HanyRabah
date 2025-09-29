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
  Tabs,
  Modal
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  EyeOutlined,
  PlusOutlined,
  CloseOutlined,
  CodeOutlined,
  PictureOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text } = Typography
const { TextArea } = Input

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  tags: string[]
  coverImage: string | null
  createdAt: string
  updatedAt: string
}

export default function EditPost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [form] = Form.useForm()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
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

    fetchPost()
  }, [session, status, router, params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      if (response.ok) {
        const postData = await response.json()
        setPost(postData)
        setTags(postData.tags || [])
        setContent(postData.content || '')
        form.setFieldsValue({
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt || '',
          content: postData.content,
          published: postData.published,
          coverImage: postData.coverImage || ''
        })
      } else {
        message.error('Post not found')
        router.push('/admin/posts')
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      message.error('Failed to fetch post')
      router.push('/admin/posts')
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values: any) => {
    try {
      setSaving(true)
      
      const postData = {
        ...values,
        tags: tags,
        coverImage: values.coverImage || null,
        excerpt: values.excerpt || null,
      }
      
      const response = await fetch(`/api/admin/posts/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        message.success('Post updated successfully!')
        router.push('/admin/posts')
      } else {
        message.error('Failed to update post')
      }
    } catch (error) {
      console.error('Failed to save post:', error)
      message.error('Failed to update post')
    } finally {
      setSaving(false)
    }
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

  if (!post) {
    return (
      <AntdProvider>
        <AdminLayout>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={3}>Post not found</Title>
            <Link href="/admin/posts">
              <Button type="primary">Back to Posts</Button>
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
                Edit Post
              </Title>
              <Text type="secondary">Modify your blog post content</Text>
            </div>
            <Space>
              <Link href={`/blog/${post.slug}`} target="_blank">
                <Button icon={<EyeOutlined />}>
                  Preview
                </Button>
              </Link>
              <Link href="/admin/posts">
                <Button icon={<ArrowLeftOutlined />}>
                  Back to Posts
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
                <Card title="Post Content" style={{ marginBottom: 24 }}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input placeholder="Enter post title..." size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please enter a slug' }]}
                  >
                    <Input placeholder="post-url-slug" />
                  </Form.Item>

                  <Form.Item
                    label="Excerpt"
                    name="excerpt"
                    help="Short summary shown in post listings"
                  >
                    <TextArea
                      placeholder="Brief description of the post..."
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                    help="Full post content (HTML supported)"
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
                                placeholder="Write your post content here... (HTML supported)\n\nYou can use HTML tags like:\n<h1>Heading</h1>\n<p>Paragraph</p>\n<strong>Bold</strong>\n<em>Italic</em>\n<img src='url' alt='description' />\n<pre><code>Code block</code></pre>"
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
                  <Card title="Publish Settings">
                    <Form.Item
                      label="Published"
                      name="published"
                      valuePropName="checked"
                      help="Make this post visible to the public"
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

                  <Card title="Cover Image">
                    <Form.Item
                      name="coverImage"
                      help="URL of the cover image for this post"
                    >
                      <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>
                  </Card>

                  <Card title="Tags">
                    <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                      <Input
                        placeholder="Add a tag..."
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

                  <Card title="Post Information">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Status">
                        <Tag color={post.published ? 'green' : 'orange'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Created">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Descriptions.Item>
                    </Descriptions>
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
