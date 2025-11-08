'use client'

import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Typography, Alert, Space, Spin } from 'antd'
import { GoogleOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text } = Typography

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await getSession()
      if (session?.user?.email === 'hany.rabah@gmail.com') {
        router.push('/admin/dashboard')
      }
    }
    checkAuth()
  }, [router])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const result = await signIn('google', {
        callbackUrl: '/admin/dashboard',
        redirect: false,
      })

      if (result?.error) {
        setError('Access denied. Only authorized users can access the admin dashboard.')
      }
    } catch (error) {
      setError('An error occurred during sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AntdProvider>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Card
            style={{ 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              border: 'none'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                width: 64,
                height: 64,
                backgroundColor: '#e6f7ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <SafetyOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              </div>
              <Title level={2} style={{ margin: '0 0 8px 0' }}>Admin Dashboard</Title>
              <Text type="secondary">Sign in to manage your portfolio content</Text>
            </div>
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}
              
              <Button
                type="primary"
                size="large"
                block
                icon={isLoading ? <Spin size="small" /> : <GoogleOutlined />}
                onClick={handleGoogleSignIn}
                loading={isLoading}
                style={{ height: 48 }}
              >
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>
              
              <div style={{ textAlign: 'center' }}>
                <Space>
                  <UserOutlined style={{ color: '#8c8c8c' }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>Authorized access only</Text>
                </Space>
              </div>
            </Space>
          </Card>
          
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Need help? Contact{' '}
              <a 
                href="mailto:hany.rabah@gmail.com" 
                style={{ color: '#1890ff' }}
              >
                contact@hanyrabah.com
              </a>
            </Text>
          </div>
        </div>
      </div>
    </AntdProvider>
  )
}
