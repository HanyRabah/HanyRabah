'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Typography, Card } from 'antd'
import { PictureOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import ContentTable from '@/components/admin/ContentTable'

const { Title, Text } = Typography

export default function DesignsManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchDesigns()
  }, [session, status, router])

  const fetchDesigns = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/designs')
      if (response.ok) {
        const data = await response.json()
        setDesigns(data)
      }
    } catch (error) {
      console.error('Failed to fetch designs:', error)
    } finally {
      setLoading(false)
    }
  }

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
                <PictureOutlined style={{ marginRight: 8 }} />
                Design Portfolio
              </Title>
              <Text type="secondary">Manage your design projects and creative work</Text>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchDesigns}
                loading={loading}
              >
                Refresh
              </Button>
              <Link href="/admin/designs/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  New Design
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <ContentTable
              data={designs}
              type="designs"
              loading={loading}
              onRefresh={fetchDesigns}
            />
          </Card>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
