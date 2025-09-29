'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Table,
  DatePicker,
  Space,
  Button,
  Select
} from 'antd'
import {
  BarChartOutlined,
  EyeOutlined,
  ReloadOutlined,
  RiseOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

interface AnalyticsData {
  totalViews: number
  uniquePages: number
  topPages: Array<{
    page: string
    visits: number
  }>
  dailyViews: Array<{
    date: string
    visits: number
  }>
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniquePages: 0,
    topPages: [],
    dailyViews: []
  })
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs()
  ])

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchAnalytics()
  }, [session, status, router, dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const startDate = dateRange[0].format('YYYY-MM-DD')
      const endDate = dateRange[1].format('YYYY-MM-DD')
      
      const response = await fetch(`/api/admin/analytics?start=${startDate}&end=${endDate}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const topPagesColumns = [
    {
      title: 'Page',
      dataIndex: 'page',
      key: 'page',
      render: (page: string) => (
        <Text code>{page}</Text>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'visits',
      key: 'visits',
      render: (visits: number) => (
        <Statistic
          value={visits}
          valueStyle={{ fontSize: 14 }}
        />
      ),
    },
  ]

  const dailyViewsColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Views',
      dataIndex: 'visits',
      key: 'visits',
      render: (visits: number) => (
        <Statistic
          value={visits}
          valueStyle={{ fontSize: 14 }}
        />
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
                <BarChartOutlined style={{ marginRight: 8 }} />
                Analytics Dashboard
              </Title>
              <Text type="secondary">Website traffic and performance metrics</Text>
            </div>
            <Space>
              <RangePicker
                value={dateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setDateRange([dates[0], dates[1]])
                  }
                }}
                format="YYYY-MM-DD"
              />
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchAnalytics}
                loading={loading}
              >
                Refresh
              </Button>
            </Space>
          </div>

          {/* Overview Stats */}
          <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Views"
                  value={analytics.totalViews}
                  prefix={<EyeOutlined style={{ color: '#1890ff' }} />}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Unique Pages"
                  value={analytics.uniquePages}
                  prefix={<GlobalOutlined style={{ color: '#52c41a' }} />}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Avg. Daily Views"
                  value={Math.round(analytics.totalViews / 30)}
                  prefix={<RiseOutlined style={{ color: '#faad14' }} />}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Top Page Views"
                  value={analytics.topPages[0]?.visits || 0}
                  prefix={<UserOutlined style={{ color: '#722ed1' }} />}
                  loading={loading}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts and Tables */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Top Pages" size="small">
                <Table
                  columns={topPagesColumns}
                  dataSource={analytics.topPages}
                  loading={loading}
                  pagination={false}
                  size="small"
                  rowKey="page"
                  locale={{ emptyText: 'No page views found' }}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Daily Views" size="small">
                <Table
                  columns={dailyViewsColumns}
                  dataSource={analytics.dailyViews}
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    size: 'small',
                  }}
                  size="small"
                  rowKey="date"
                  locale={{ emptyText: 'No daily views found' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Additional Insights */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={24}>
              <Card title="Analytics Insights" size="small">
                <div style={{ padding: '16px 0' }}>
                  <Text type="secondary">
                    Analytics data is collected from page visits. The data shows traffic patterns 
                    for the selected date range. Use the date picker above to view different time periods.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </AdminLayout>
    </AntdProvider>
  )
}
