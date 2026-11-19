'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Card,
  Empty,
  Flex,
  List,
  message,
  Space,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LinkOutlined,
  ReloadOutlined,
  SyncOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import AdminLayout from '@/components/admin/AdminLayout'
import AntdProvider from '@/components/admin/AntdProvider'

const { Title, Text, Paragraph } = Typography

type JobTier = 'EGYPT_MENA' | 'GLOBAL_AI' | 'GLOBAL_SENIOR' | 'GLOBAL_ENTERPRISE'

interface Job {
  id: string
  title: string
  company: string
  source: string
  location: string | null
  remote: boolean
  description: string
  url: string
  salary: string | null
  tags: string[]
  score: number
  scoreReasons: string[]
  visaFriendly: boolean | null
  remoteFromEgypt: boolean | null
  postedAt: string | null
  fetchedAt: string
  status: string
  companyRef?: { tier: JobTier; egyptPresence?: boolean } | null
}

const STORAGE_KEY = 'jobRadar.includeGlobal'

const TIER_LABEL: Record<JobTier, { label: string; color: string }> = {
  EGYPT_MENA: { label: 'Egypt / MENA', color: 'red' },
  GLOBAL_AI: { label: 'Global AI', color: 'purple' },
  GLOBAL_SENIOR: { label: 'Global Senior', color: 'blue' },
  GLOBAL_ENTERPRISE: { label: 'Enterprise', color: 'cyan' },
}

export default function JobsPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState<'SURFACED' | 'APPLIED' | 'DISMISSED'>('SURFACED')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [includeGlobal, setIncludeGlobal] = useState<boolean>(false)

  // Load toggle from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === '1') setIncludeGlobal(true)
    } catch {}
  }, [])

  const fetchJobs = useCallback(
    async (which: typeof tab, global: boolean) => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/admin/jobs?status=${which}&includeGlobal=${global ? 1 : 0}`,
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as { jobs: Job[] }
        setJobs(data.jobs)
      } catch {
        message.error('Failed to load jobs')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (authStatus === 'loading') return
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }
    fetchJobs(tab, includeGlobal)
  }, [authStatus, session, router, tab, includeGlobal, fetchJobs])

  const handleToggleGlobal = (checked: boolean) => {
    setIncludeGlobal(checked)
    try {
      localStorage.setItem(STORAGE_KEY, checked ? '1' : '0')
    } catch {}
  }

  const triggerSync = async () => {
    setSyncing(true)
    try {
      const res = await fetch('/api/admin/jobs/trigger-fetch', { method: 'POST' })
      const data = (await res.json()) as {
        ok: boolean
        inserted?: number
        skippedDuplicates?: number
        droppedLowScore?: number
        error?: string
      }
      if (data.ok) {
        message.success(
          `Sync done — ${data.inserted ?? 0} new, ${data.skippedDuplicates ?? 0} refreshed, ${data.droppedLowScore ?? 0} dropped (low score)`,
        )
        fetchJobs(tab, includeGlobal)
      } else {
        message.error(`Sync failed: ${data.error ?? 'unknown'}`)
      }
    } catch (e) {
      message.error('Sync request failed')
    } finally {
      setSyncing(false)
    }
  }

  const act = async (id: string, kind: 'APPLIED' | 'DISMISSED' | 'SAVED') => {
    try {
      const res = await fetch(`/api/jobs/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind }),
      })
      if (!res.ok) throw new Error()
      message.success(`Marked ${kind.toLowerCase()}`)
      fetchJobs(tab, includeGlobal)
    } catch {
      message.error('Action failed')
    }
  }

  const tabs = useMemo(
    () => [
      { key: 'SURFACED', label: `Today & New` },
      { key: 'APPLIED', label: `Applied` },
      { key: 'DISMISSED', label: `Dismissed` },
    ],
    [],
  )

  if (authStatus === 'loading' || !session) return null

  return (
    <AntdProvider>
      <AdminLayout>
        <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            <ThunderboltOutlined style={{ marginRight: 8 }} />
            Job Radar
          </Title>
          <Space size="middle">
            <Tooltip title="Off → only Egypt-presence companies + Egypt-friendly remote. On → everything, including global-only roles.">
              <Space size="small">
                <Switch checked={includeGlobal} onChange={handleToggleGlobal} />
                <Text>Include global jobs</Text>
              </Space>
            </Tooltip>
            <Button icon={<ReloadOutlined />} onClick={() => fetchJobs(tab, includeGlobal)} loading={loading}>
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<SyncOutlined spin={syncing} />}
              onClick={triggerSync}
              loading={syncing}
            >
              Fetch New Jobs
            </Button>
          </Space>
        </Flex>

        <Tabs
          activeKey={tab}
          onChange={(k) => setTab(k as typeof tab)}
          items={tabs.map((t) => ({ key: t.key, label: t.label }))}
        />

        {jobs.length === 0 && !loading ? (
          <Empty
            description={
              tab === 'SURFACED'
                ? 'No jobs yet. Click "Fetch New Jobs" to pull a fresh batch.'
                : tab === 'APPLIED'
                  ? 'No applications marked yet.'
                  : 'No dismissed jobs.'
            }
            style={{ padding: 48 }}
          />
        ) : (
          <List
            loading={loading}
            dataSource={jobs}
            renderItem={(job) => (
              <List.Item key={job.id} style={{ padding: 0, marginBottom: 12 }}>
                <Card
                  style={{ width: '100%' }}
                  styles={{ body: { padding: 16 } }}
                  hoverable
                >
                  <Flex justify="space-between" align="flex-start" gap={16}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Flex align="center" gap={8} wrap="wrap" style={{ marginBottom: 4 }}>
                        <Text strong style={{ fontSize: 16 }}>
                          {job.title}
                        </Text>
                        <Tag color={scoreColor(job.score)}>{job.score}</Tag>
                        {job.remote && <Tag color="green">Remote</Tag>}
                        {job.remoteFromEgypt === true && (
                          <Tag color="gold">Egypt-friendly</Tag>
                        )}
                        {job.visaFriendly === true && <Tag color="geekblue">Visa</Tag>}
                        {job.companyRef?.tier && (
                          <Tag color={TIER_LABEL[job.companyRef.tier].color}>
                            {TIER_LABEL[job.companyRef.tier].label}
                          </Tag>
                        )}
                      </Flex>
                      <Text type="secondary" style={{ display: 'block' }}>
                        <strong>{job.company}</strong>
                        {job.location ? ` · ${job.location}` : ''} · via {job.source}
                        {job.salary ? ` · ${job.salary}` : ''}
                        {job.postedAt ? ` · ${new Date(job.postedAt).toLocaleDateString()}` : ''}
                      </Text>
                      <Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                        style={{ margin: '8px 0 0 0', color: '#666' }}
                      >
                        {job.description}
                      </Paragraph>
                      {job.scoreReasons.length > 0 && (
                        <Tooltip title={job.scoreReasons.join(' · ')}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {job.scoreReasons.slice(0, 2).join(' · ')}
                            {job.scoreReasons.length > 2 ? ' · …' : ''}
                          </Text>
                        </Tooltip>
                      )}
                    </div>
                    <Flex vertical gap={8} style={{ flexShrink: 0, width: 180 }}>
                      <Button
                        type="primary"
                        icon={<LinkOutlined />}
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        block
                      >
                        Open posting
                      </Button>
                      {tab !== 'APPLIED' && (
                        <Button
                          icon={<CheckCircleOutlined />}
                          onClick={() => act(job.id, 'APPLIED')}
                          block
                        >
                          Mark applied
                        </Button>
                      )}
                      {tab !== 'DISMISSED' && (
                        <Button
                          danger
                          icon={<CloseCircleOutlined />}
                          onClick={() => act(job.id, 'DISMISSED')}
                          block
                        >
                          Dismiss
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </Card>
              </List.Item>
            )}
          />
        )}
      </AdminLayout>
    </AntdProvider>
  )
}

function scoreColor(score: number) {
  if (score >= 80) return 'green'
  if (score >= 60) return 'blue'
  if (score >= 40) return 'orange'
  return 'default'
}
