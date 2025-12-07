'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from 'antd'
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'

import { RESOURCE_STATUS_FILTER_OPTIONS, RESOURCE_TYPE_OPTIONS } from '@/lib/resources'

import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import ContentTable from '@/components/admin/ContentTable'

const { Title, Text } = Typography

interface FilterState {
  type?: string
  published?: string
  search?: string
}

const resourceTypeOptions = [{ label: 'All Types', value: '' }, ...RESOURCE_TYPE_OPTIONS.map(option => ({ ...option }))]

const publishedOptions = RESOURCE_STATUS_FILTER_OPTIONS.map(option => ({ ...option }))

export default function ResourcesManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({})

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchResources()
  }, [session, status, router])

  const fetchResources = async (params?: FilterState) => {
    try {
      setLoading(true)
      const searchParams = new URLSearchParams()
      const merged = { ...filters, ...(params ?? {}) }

      if (merged.type) {
        searchParams.set('type', merged.type)
      }
      if (merged.published) {
        searchParams.set('published', merged.published)
      }
      if (merged.search) {
        searchParams.set('search', merged.search)
      }

      const response = await fetch(`/api/admin/resources?${searchParams.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (changed: Partial<FilterState>) => {
    const merged = { ...filters, ...changed }
    setFilters(merged)
    fetchResources(merged)
  }

  const filteredResources = useMemo(() => {
    if (!filters.search) {
      return resources
    }

    const searchTerm = filters.search.toLowerCase()
    return resources.filter((item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.category?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm),
    )
  }, [resources, filters.search])

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
                <AppstoreOutlined style={{ marginRight: 8 }} /> Resources Library
              </Title>
              <Text type="secondary">
                Curate the books, tools, products, and partners you want to highlight.
              </Text>
            </Space>

            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => fetchResources()}
                loading={loading}
              >
                Refresh
              </Button>
              <Link href="/admin/resources/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  New Resource
                </Button>
              </Link>
            </Space>
          </Flex>

          <Card>
            <Form layout="vertical">
              <Flex gap={16} wrap>
                <Form.Item label="Type" style={{ minWidth: 200 }}>
                  <Select
                    allowClear
                    placeholder="All Types"
                    options={resourceTypeOptions}
                    value={filters.type ?? ''}
                    onChange={(value) => handleFilterChange({ type: value || undefined })}
                  />
                </Form.Item>

                <Form.Item label="Status" style={{ minWidth: 200 }}>
                  <Select
                    allowClear
                    placeholder="All"
                    options={publishedOptions}
                    value={filters.published ?? ''}
                    onChange={(value) => handleFilterChange({ published: value || undefined })}
                  />
                </Form.Item>

                <Form.Item label="Search" style={{ flex: 1, minWidth: 240 }}>
                  <Input.Search
                    placeholder="Search by title, description, category"
                    value={filters.search ?? ''}
                    onChange={(event) => handleFilterChange({ search: event.target.value || undefined })}
                    onSearch={(value) => handleFilterChange({ search: value || undefined })}
                  />
                </Form.Item>
              </Flex>
            </Form>
          </Card>

          <Card>
            <ContentTable
              data={filteredResources}
              type="resources"
              loading={loading}
              onRefresh={() => fetchResources()}
            />
          </Card>

          <Card>
            <Space direction="vertical" size="middle">
              <Space align="center" wrap>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text strong>Tips for better resources:</Text>
              </Space>
              <ul style={{ marginLeft: 24 }}>
                <li>
                  Use <strong>Display Order</strong> to control how items appear on public pages.
                </li>
                <li>
                  Add a <strong>Category</strong> (e.g. "Book", "Tool", "Template") for quick filtering.
                </li>
                <li>
                  Mark <strong>Affiliate</strong> items so the disclosure automatically reflects your list.
                </li>
              </ul>
              <Space align="center" wrap>
                <FolderOpenOutlined style={{ color: '#1890ff' }} />
                <Text type="secondary">
                  Need new sections? Add them via code by extending the <code>ResourceType</code> enum.
                </Text>
              </Space>
            </Space>
          </Card>
        </Flex>
      </AdminLayout>
    </AntdProvider>
  )
}
