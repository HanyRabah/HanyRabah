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
  DatePicker,
  Collapse
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
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { quillModules, quillFormats } from '@/components/admin/QuillImageUploader'
import dayjs from 'dayjs'

const { Title, Text } = Typography

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  tags: string[]
  coverImage: string | null
  publishedAt: string | null
  seoTitle: string | null
  seoDescription: string | null
  seoKeywords: string[]
  seoImage: string | null
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
  const [seoKeywords, setSeoKeywords] = useState<string[]>([])
  const [newSeoKeyword, setNewSeoKeyword] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [seoImage, setSeoImage] = useState('')

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
        setSeoKeywords(postData.seoKeywords || [])
        setContent(postData.content || '')
        setCoverImage(postData.coverImage || '')
        setSeoImage(postData.seoImage || '')
        form.setFieldsValue({
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt || '',
          content: postData.content,
          published: postData.published,
          publishedAt: postData.publishedAt ? dayjs(postData.publishedAt) : null,
          seoTitle: postData.seoTitle || '',
          seoDescription: postData.seoDescription || ''
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
        seoKeywords: seoKeywords,
        coverImage: coverImage || null,
        seoImage: seoImage || null,
        excerpt: values.excerpt || null,
        publishedAt: values.publishedAt ? values.publishedAt.toISOString() : null,
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

  const addSeoKeyword = () => {
    if (newSeoKeyword.trim() && !seoKeywords.includes(newSeoKeyword.trim())) {
      setSeoKeywords([...seoKeywords, newSeoKeyword.trim()])
      setNewSeoKeyword('')
    }
  }

  const removeSeoKeyword = (keywordToRemove: string) => {
    setSeoKeywords(seoKeywords.filter(keyword => keyword !== keywordToRemove))
  }

  if (status === 'loading' || loading) {
    return (
      <AntdProvider>
        <AdminLayout>
          <div style={{ textAlign: 'center', padding: '50px' }}>
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
            <Link href="/admin/posts">
              <Button icon={<ArrowLeftOutlined />}>
                Back to Posts
              </Button>
            </Link>
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
                    <Input.TextArea
                      placeholder="Brief description of the post..."
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter content' }]}
                    help="Use the rich text editor to format your content"
                  >
                    <div style={{ minHeight: '400px' }}>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={(value) => {
                          setContent(value)
                          form.setFieldsValue({ content: value })
                        }}
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ height: '350px', marginBottom: '50px' }}
                        placeholder="Write your post content here..."
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

                    <Form.Item
                      label="Publish Date"
                      name="publishedAt"
                      help="Set a custom publish date (optional)"
                    >
                      <DatePicker 
                        showTime 
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD HH:mm"
                      />
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
                    <ImageUpload
                      value={coverImage}
                      onChange={setCoverImage}
                      label="Upload Cover Image"
                      folder="posts/covers"
                    />
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

                  <Collapse 
                    items={[
                      {
                        key: 'seo',
                        label: 'SEO Settings',
                        children: (
                          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Form.Item
                              label="SEO Title"
                              name="seoTitle"
                              help="Custom title for search engines (leave empty to use post title)"
                            >
                              <Input placeholder="Custom SEO title..." />
                            </Form.Item>

                            <Form.Item
                              label="SEO Description"
                              name="seoDescription"
                              help="Meta description for search engines"
                            >
                              <Input.TextArea
                                placeholder="Brief description for search results..."
                                rows={3}
                              />
                            </Form.Item>

                            <div>
                              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                SEO Keywords
                              </label>
                              <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                                <Input
                                  placeholder="Add a keyword..."
                                  value={newSeoKeyword}
                                  onChange={(e) => setNewSeoKeyword(e.target.value)}
                                  onPressEnter={addSeoKeyword}
                                />
                                <Button
                                  type="primary"
                                  onClick={addSeoKeyword}
                                  icon={<PlusOutlined />}
                                />
                              </Space.Compact>

                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {seoKeywords.map((keyword) => (
                                  <Tag
                                    key={keyword}
                                    closable
                                    onClose={() => removeSeoKeyword(keyword)}
                                    closeIcon={<CloseOutlined />}
                                  >
                                    {keyword}
                                  </Tag>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                SEO Image (Open Graph)
                              </label>
                              <ImageUpload
                                value={seoImage}
                                onChange={setSeoImage}
                                label="Upload SEO Image"
                                folder="posts/seo"
                              />
                              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '8px' }}>
                                Recommended size: 1200x630px
                              </Text>
                            </div>
                          </Space>
                        ),
                      },
                    ]}
                  />

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
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
