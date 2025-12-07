'use client'

import { useState, useEffect } from 'react'
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
  Descriptions
} from 'antd'
import {
  SaveOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { NotionEditor } from '@/components/admin/NotionEditor'

const { Text } = Typography
const { TextArea } = Input

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured: boolean
  coverImage: string | null
  images: string[]
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  createdAt: string
  updatedAt: string
}

interface ProjectEditFormProps {
  project: Project
  onSave: (data: any) => Promise<void>
}

export function ProjectEditForm({ project, onSave }: ProjectEditFormProps) {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [technologies, setTechnologies] = useState<string[]>(project.technologies || [])
  const [images, setImages] = useState<string[]>(project.images || [])
  const [newTech, setNewTech] = useState('')
  const [coverImage, setCoverImage] = useState<string>(project.coverImage || '')
  const [content, setContent] = useState<string>(project.content || '')

  useEffect(() => {
    setCoverImage(project.coverImage || '')
    setContent(project.content || '')
    form.setFieldsValue({
      title: project.title,
      slug: project.slug,
      description: project.description,
      featured: project.featured,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    })
  }, [project, form])

  const onFinish = async (values: any) => {
    try {
      setSaving(true)
      
      const projectData = {
        ...values,
        content: content,
        technologies: technologies,
        images: images,
        coverImage: coverImage || null,
        liveUrl: values.liveUrl || null,
        githubUrl: values.githubUrl || null,
      }
      
      await onSave(projectData)
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

  const addImageUrl = (url: string) => {
    if (url && !images.includes(url)) {
      setImages([...images, url])
      message.success('Image added to gallery')
    }
  }

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(img => img !== imageToRemove))
  }

  return (
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
  )
}
