'use client'

import { useState } from 'react'
import { Table, Tag, Space, Button, Modal, message, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { 
  EditOutlined, 
  DeleteOutlined, 
  CheckOutlined,
  CloseOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons'
import Link from 'next/link'

interface ContentTableProps {
  data: any[]
  type: string
  loading: boolean
  onRefresh?: () => void
}

export default function ContentTable({ data, type, loading, onRefresh }: ContentTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    Modal.confirm({
      title: 'Delete Item',
      content: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setDeletingId(id)
          const response = await fetch(`/api/admin/${type}/${id}`, {
            method: 'DELETE',
          })

          if (response.ok) {
            message.success('Item deleted successfully')
            onRefresh?.()
          } else {
            message.error('Failed to delete item')
          }
        } catch (error) {
          console.error('Error deleting item:', error)
          message.error('Failed to delete item')
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean, field: 'published' | 'featured') => {
    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [field]: !currentStatus,
        }),
      })

      if (response.ok) {
        message.success(`${field === 'published' ? 'Publication' : 'Featured'} status updated`)
        onRefresh?.()
      } else {
        message.error(`Failed to update ${field} status`)
      }
    } catch (error) {
      console.error(`Error updating ${field} status:`, error)
      message.error(`Failed to update ${field} status`)
    }
  }

  const getColumns = () => {
    const baseColumns: ColumnsType<any> = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: any) => (
          <div>
            <Link href={`/admin/${type}/${record.id}/edit`}>
              <Button type="link" style={{ padding: 0, height: 'auto', fontWeight: 500 }}>
                {text}
              </Button>
            </Link>
            {record.excerpt && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                {record.excerpt.length > 80 ? `${record.excerpt.substring(0, 80)}...` : record.excerpt}
              </div>
            )}
            {record.description && !record.excerpt && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                {record.description.length > 80 ? `${record.description.substring(0, 80)}...` : record.description}
              </div>
            )}
          </div>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        width: 150,
        render: (record: any) => {
          const hasPublished = typeof record.published === 'boolean'
          const isPublished = hasPublished ? record.published : true
          const isFeatured = !!record.featured
          const isAffiliate = !!record.isAffiliate
          return (
            <Space direction="vertical" size={4}>
              {hasPublished && (
                <Tag color={isPublished ? 'green' : 'orange'}>
                  {isPublished ? 'Published' : 'Draft'}
                </Tag>
              )}
              {isFeatured && <Tag color="blue">Featured</Tag>}
              {typeof record.isAffiliate === 'boolean' && (
                <Tag color={isAffiliate ? 'purple' : 'default'}>
                  {isAffiliate ? 'Affiliate' : 'Non-affiliate'}
                </Tag>
              )}
            </Space>
          )
        },
      },
    ]

    // Add type-specific columns
    if (type === 'resources') {
      baseColumns.splice(1, 0, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value: string) => (
          <Tag color="geekblue">{value?.split('_').join(' ')}</Tag>
        ),
      })

      baseColumns.splice(3, 0, {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category: string) => category ? <Tag>{category}</Tag> : <span>-</span>,
      })

      baseColumns.splice(4, 0, {
        title: 'Display Order',
        dataIndex: 'displayOrder',
        key: 'displayOrder',
        width: 120,
        render: (order: number) => <span>{order ?? 0}</span>,
      })
    }

    if (type === 'articles') {
      baseColumns.splice(2, 0, {
        title: 'Details',
        key: 'details',
        width: 120,
        render: (record: any) => (
          <Space direction="vertical" size={4}>
            {record.difficulty && (
              <Tag color={
                record.difficulty === 'BEGINNER' ? 'green' : 
                record.difficulty === 'INTERMEDIATE' ? 'orange' : 'red'
              }>
                {record.difficulty}
              </Tag>
            )}
            {record.readTime && (
              <div style={{ fontSize: '12px', color: '#666' }}>
                {record.readTime} min read
              </div>
            )}
          </Space>
        ),
      })
    }

    if (type === 'projects' || type === 'designs') {
      baseColumns.splice(2, 0, {
        title: 'Technologies',
        dataIndex: 'technologies',
        key: 'technologies',
        render: (text: any, record: any) => {
          const technologies = Array.isArray(text) ? text : (record.technologies || [])
          return (
            <Space wrap>
              {technologies?.slice(0, 3).map((tech: string) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
              {technologies?.length > 3 && (
                <Tag>+{technologies.length - 3} more</Tag>
              )}
            </Space>
          )
        },
      })
    }

    if (type === 'designs') {
      baseColumns.splice(-1, 0, {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category: string) => category ? <Tag>{category.replace('_', ' ')}</Tag> : <span>-</span>,
      })
    }

    // Add date column
    baseColumns.push({
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span>{new Date(date).toLocaleDateString()}</span>,
    })

    // Add actions column
    baseColumns.push({
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (record: any) => (
        <Space wrap>
          <Tooltip title="Edit">
            <Link href={`/admin/${type}/${record.id}/edit`}>
              <Button size="small" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          
          {typeof record.published === 'boolean' && (
            <Tooltip title={record.published ? 'Unpublish' : 'Publish'}>
              <Button
                size="small"
                icon={record.published ? <CloseOutlined /> : <CheckOutlined />}
                onClick={() => handleToggleStatus(record.id, record.published, 'published')}
              />
            </Tooltip>
          )}
          
          {typeof record.featured === 'boolean' && type !== 'resources' && (
            <Tooltip title={record.featured ? 'Remove from Featured' : 'Mark as Featured'}>
              <Button
                size="small"
                icon={record.featured ? <StarFilled /> : <StarOutlined />} 
                onClick={() => handleToggleStatus(record.id, record.featured, 'featured')}
              />
            </Tooltip>
          )}
          
          <Tooltip title="Delete">
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              loading={deletingId === record.id}
              onClick={() => handleDelete(record.id, record.title)}
            />
          </Tooltip>
        </Space>
      ),
    })

    return baseColumns
  }

  return (
    <Table
      columns={getColumns()}
      dataSource={data}
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      size="small"
      rowKey="id"
      locale={{ emptyText: `No ${type} found` }}
      scroll={{ x: 800 }}
    />
  )
}
