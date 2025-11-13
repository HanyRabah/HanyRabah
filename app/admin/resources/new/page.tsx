'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AppstoreAddOutlined,
  ArrowLeftOutlined,
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
  Row,
  Select,
  Space,
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

export default function NewResource() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm<ResourceFormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }
  }, [session, status, router])

  const handleSubmit = async (values: ResourceFormValues) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to create resource')
      }

      message.success('Resource created successfully')
      router.push('/admin/resources')
    } catch (error) {
      console.error('Error creating resource:', error)
      message.error('Failed to create resource')
    } finally {
      setIsSubmitting(false)
    }
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
                <AppstoreAddOutlined style={{ marginRight: 8 }} />
                Create Resource
              </Title>
              <Text type="secondary">
                Add a new item to your resources hub.
              </Text>
            </Space>

            <Link href="/admin/resources">
              <Button icon={<ArrowLeftOutlined />}>Back to Resources</Button>
            </Link>
          </Flex>

          <Card>
            <Form<ResourceFormValues>
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              initialValues={{
                displayOrder: 0,
                published: true,
                isAffiliate: false,
                tags: [],
              }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                  <Card title="Details" variant="borderless">
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
                          {isSubmitting ? 'Creating...' : 'Create Resource'}
                        </Button>
                        <Text type="secondary">
                          You can edit or reorder this later from the resources list.
                        </Text>
                      </Space>
                    </Card>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>
        </Flex>
      </AdminLayout>
    </AntdProvider>
  )
}
