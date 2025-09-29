'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Card,
  Modal,
  message,
  Tooltip,
  Badge
} from 'antd'
import {
  MailOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text, Paragraph } = Typography

interface Contact {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
}

export default function ContactsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchContacts()
  }, [session, status, router])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      message.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: string, status: Contact['status']) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        message.success('Contact status updated')
        fetchContacts()
      } else {
        message.error('Failed to update contact status')
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      message.error('Failed to update contact status')
    }
  }

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        message.success('Contact deleted successfully')
        fetchContacts()
      } else {
        message.error('Failed to delete contact')
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
      message.error('Failed to delete contact')
    }
  }

  const viewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setModalVisible(true)
    
    // Mark as read if unread
    if (contact.status === 'UNREAD') {
      updateContactStatus(contact.id, 'READ')
    }
  }

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'UNREAD': return 'red'
      case 'READ': return 'blue'
      case 'REPLIED': return 'green'
      case 'ARCHIVED': return 'gray'
      default: return 'default'
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Contact) => (
        <Space>
          {record.status === 'UNREAD' && <Badge status="processing" />}
          <Text strong={record.status === 'UNREAD'}>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string) => text || 'No subject',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Contact['status']) => (
        <Tag color={getStatusColor(status)}>
          {status.replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Contact) => (
        <Space>
          <Tooltip title="View Message">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => viewContact(record)}
            />
          </Tooltip>
          <Tooltip title="Mark as Replied">
            <Button
              size="small"
              icon={<CheckOutlined />}
              onClick={() => updateContactStatus(record.id, 'REPLIED')}
              disabled={record.status === 'REPLIED'}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: 'Delete Contact',
                  content: 'Are you sure you want to delete this contact message?',
                  onOk: () => deleteContact(record.id),
                })
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  if (status === 'loading' || !session) {
    return null
  }

  return (
    <AntdProvider>
      <AdminLayout>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                <MailOutlined style={{ marginRight: 8 }} />
                Contact Messages
              </Title>
              <Text type="secondary">Manage incoming contact form submissions</Text>
            </div>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchContacts}
              loading={loading}
            >
              Refresh
            </Button>
          </div>

          <Card>
            <Table
              columns={columns}
              dataSource={contacts}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} messages`,
              }}
              locale={{ emptyText: 'No contact messages found' }}
            />
          </Card>

          <Modal
            title={
              <Space>
                <MailOutlined />
                Contact Message Details
              </Space>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
              selectedContact && selectedContact.status !== 'REPLIED' && (
                <Button
                  key="reply"
                  type="primary"
                  onClick={() => {
                    if (selectedContact) {
                      updateContactStatus(selectedContact.id, 'REPLIED')
                      setModalVisible(false)
                    }
                  }}
                >
                  Mark as Replied
                </Button>
              ),
            ]}
            width={600}
          >
            {selectedContact && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>From: </Text>
                  <Text>{selectedContact.name} ({selectedContact.email})</Text>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Subject: </Text>
                  <Text>{selectedContact.subject || 'No subject'}</Text>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Status: </Text>
                  <Tag color={getStatusColor(selectedContact.status)}>
                    {selectedContact.status.replace('_', ' ')}
                  </Tag>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text strong>Date: </Text>
                  <Text>{new Date(selectedContact.createdAt).toLocaleString()}</Text>
                </div>
                <div>
                  <Text strong>Message:</Text>
                  <Paragraph
                    style={{
                      marginTop: 8,
                      padding: 12,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedContact.message}
                  </Paragraph>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
