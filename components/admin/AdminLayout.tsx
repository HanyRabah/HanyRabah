'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  theme,
  Typography,
  Space,
  Breadcrumb
} from 'antd'
import {
  DashboardOutlined,
  FileTextOutlined,
  ProjectOutlined,
  PictureOutlined,
  BookOutlined,
  UserOutlined,
  MailOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SketchOutlined,
  ContactsOutlined,
  BulbOutlined,
  AppstoreOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

interface AdminLayoutProps {
  children: React.ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // Menu items configuration
  const menuItems: MenuItem[] = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'content',
      icon: <FileTextOutlined />,
      label: 'Content Management',
      children: [
        {
          key: '/admin/posts',
          icon: <FileTextOutlined />,
          label: 'Blog Posts',
        },
        {
          key: '/admin/articles',
          icon: <BookOutlined />,
          label: 'Technical Articles',
        },
        {
          key: '/admin/projects',
          icon: <ProjectOutlined />,
          label: 'Projects',
        },
        {
          key: '/admin/designs',
          icon: <PictureOutlined />,
          label: 'Design Portfolio',
        },
        {
          key: '/admin/resources',
          icon: <AppstoreOutlined />,
          label: 'Resources',
        },
      ],
    },
    {
      key: 'communications',
      icon: <MailOutlined />,
      label: 'Communications',
      children: [
        {
          key: '/admin/contacts',
          icon: <ContactsOutlined />,
          label: 'Contact Messages',
        },
      ],
    },
    {
      key: '/admin/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
  ]

  // Handle menu click
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/admin/')) {
      router.push(key)
    }
  }

  // Handle user dropdown menu
  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      signOut({ callbackUrl: '/admin/login' })
    } else if (key === 'profile') {
      router.push('/admin/profile')
    }
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      danger: true,
    },
  ]

  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbItems = [
      {
        title: 'Admin',
      },
    ]

    if (pathSegments.length > 1) {
      const pageName = pathSegments[pathSegments.length - 1]
      const formattedName = pageName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbItems.push({
        title: formattedName,
      })
    }

    return breadcrumbItems
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          borderRight: '1px solid #f0f0f0',
        }}
        width={256}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 24px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          {!collapsed && (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              Admin Panel
            </Title>
          )}
          {collapsed && (
            <SettingOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['content', 'profile', 'communications']}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>
      
      <Layout>
        <Header 
          style={{ 
            padding: '0 24px', 
            background: colorBgContainer,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Breadcrumb items={generateBreadcrumbs()} />
          </Space>
          
          <Space>
            <Text type="secondary">{session?.user?.email}</Text>
            <Dropdown 
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <Avatar 
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
        </Header>
        
        <Content
          style={{
            margin: '24px',
            padding: '24px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
