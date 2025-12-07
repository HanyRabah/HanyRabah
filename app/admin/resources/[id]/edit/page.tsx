'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
  message,
} from 'antd'

import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import { RESOURCE_TYPE_OPTIONS } from '@/lib/resources'

const { Title, Text } = Typography

type ResourceFormValues = {
  title: string
  description?: string
  type: string
  url: string
  category?: string
  image?: string
  isAffiliate?: boolean
  displayOrder?: number
  published?: boolean
  tags?: string[]
}

export default function EditResourcePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const resourceId = Array.isArray(params?.id) ? params.id[0] : params?.id

  const [form] = Form.useForm<ResourceFormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    if (resourceId) {
      fetchResource(resourceId)
    }
  }, [session, status, resourceId, router])

  const fetchResource = async (id: string) => {
    try {
      setFetching(true)
      const response = await fetch(`/api/admin/resources/${id}`)
      if (!response.ok) {
        throw new Error('Failed to load resource')
      }
      const data = await response.json()
      form.setFieldsValue({
        title: data.title,
        description: data.description ?? '',
        type: data.type,
        url: data.url,
        category: data.category ?? '',
        image: data.image ?? '',
        isAffiliate: data.isAffiliate ?? false,
        displayOrder: data.displayOrder ?? 0,
        published: data.published ?? true,
        tags: data.tags ?? [],
      })
    } catch (error) {
      console.error('Error loading resource:', error)
      message.error('Failed to load resource details')
      router.push('/admin/resources')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (values: ResourceFormValues) => {
    if (!resourceId) return

    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to update resource')
      }

      message.success('Resource updated successfully')
      router.push('/admin/resources')
    } catch (error) {
      console.error('Error updating resource:', error)
      message.error('Failed to update resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!resourceId) return

    Modal.confirm({
      title: 'Delete resource?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setIsDeleting(true)
          const response = await fetch(`/api/admin/resources/${resourceId}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            throw new Error('Failed to delete resource')
          }

          message.success('Resource deleted successfully')
          router.push('/admin/resources')
        } catch (error) {
          console.error('Error deleting resource:', error)
          message.error('Failed to delete resource')
        } finally {
          setIsDeleting(false)
        }
      },
    })
  }

  if (status === 'loading' || !session) {
    return null
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <Flex vertical gap={24}>
          <Flex justify="space-between" align="center">
            <Space direction="vertical" size={0}>
              <Title level={2} style={{ margin: 0 }}>
                <AppstoreOutlined style={{ marginRight: 8 }} />
                Edit Resource
              </Title>
              <Text type="secondary">
                Update the information visible on your public resources pages.
              </Text>
            </Space>

            <Space>
              <Link href="/admin/resources">
                <Button icon={<ArrowLeftOutlined />}>Back to Resources</Button>
              </Link>
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete} loading={isDeleting}>
                Delete
              </Button>
            </Space>
          </Flex>

          <Card>
            {fetching ? (
              <Flex justify="center" style={{ padding: '48px 0' }}>
                <Spin />
              </Flex>
            ) : (
              <Form<ResourceFormValues>
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <Card title="Details" bordered={false}>
                      <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                      >
                        <Input placeholder="e.g. Designing Data-Intensive Applications" />
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ max: 240, message: 'Keep it under 240 characters' }]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Why is this valuable?"
                          showCount
                          maxLength={240}
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Select a type' }]}
                          >
                            <Select
                              placeholder="Choose type"
                              options={RESOURCE_TYPE_OPTIONS.map((option) => ({
                                label: option.label,
                                value: option.value,
                              }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Category / Tag" name="category">
                            <Input placeholder="e.g. Book, Tool, Template" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label="URL"
                        name="url"
                        rules={[
                          { required: true, message: 'Please enter a URL' },
                          { type: 'url', message: 'Enter a valid URL' },
                        ]}
                      >
                        <Input placeholder="https://..." />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item label="Image URL" name="image">
                            <Input placeholder="https://..." />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Tags" name="tags">
                            <Select
                              mode="tags"
                              placeholder="Press enter to add tags"
                              tokenSeparators={[',']}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <Card title="Visibility" bordered={false}>
                        <Form.Item
                          label="Display Order"
                          name="displayOrder"
                          tooltip="Lower numbers appear first on public pages"
                        >
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                          label="Published"
                          name="published"
                          valuePropName="checked"
                          extra="Unpublish to hide from the public site"
                        >
                          <Switch />
                        </Form.Item>

                        <Form.Item
                          label="Affiliate Link"
                          name="isAffiliate"
                          valuePropName="checked"
                          extra="Adds to your disclosure"
                        >
                          <Switch />
                        </Form.Item>
                      </Card>

                      <Card bordered={false}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Button
                            type="primary"
                            size="large"
                            icon={<SaveOutlined />}
                            htmlType="submit"
                            loading={isSubmitting}
                            block
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </Button>
                          <Text type="secondary">
                            Any updates go live immediately when the item is published.
                          </Text>
                        </Space>
                      </Card>
                    </Space>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Flex>
      </AdminLayout>
    </AntdProvider>
  )
}
