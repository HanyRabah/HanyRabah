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
  Modal,
  Popover,
  Select,
  Space,
  Spin,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
  EditOutlined,
  LinkOutlined,
  MailOutlined,
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
  contactEmail?: string | null
  companyRef?: { tier: JobTier; egyptPresence?: boolean } | null
}

const STORAGE_KEY = 'jobRadar.includeGlobal'
const SOURCES_KEY = 'jobRadar.sources'

const ALL_SOURCES = [
  'GREENHOUSE', 'ASHBY', 'LEVER', 'REMOTEOK', 'WORKDAY', 'WORKABLE',
  'WUZZUF', 'BAYT', 'LINKEDIN_POSTS', 'OTHER',
] as const
type JobSource = typeof ALL_SOURCES[number]

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
  const [selectedSources, setSelectedSources] = useState<JobSource[]>([...ALL_SOURCES])
  const [draftOpen, setDraftOpen] = useState<null | {
    jobId: string; title: string; company: string; text: string; loading: boolean
    contactEmail?: string | null; emailSubject?: string
  }>(null)

  // Load toggles from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === '1') setIncludeGlobal(true)
      const srcSaved = localStorage.getItem(SOURCES_KEY)
      if (srcSaved) {
        const arr = JSON.parse(srcSaved) as string[]
        const valid = arr.filter((s): s is JobSource => (ALL_SOURCES as readonly string[]).includes(s))
        if (valid.length > 0) setSelectedSources(valid)
      }
    } catch {}
  }, [])

  const fetchJobs = useCallback(
    async (which: typeof tab, global: boolean, sources: JobSource[]) => {
      setLoading(true)
      try {
        const sourcesParam =
          sources.length === ALL_SOURCES.length ? '' : `&sources=${sources.join(',')}`
        const res = await fetch(
          `/api/admin/jobs?status=${which}&includeGlobal=${global ? 1 : 0}${sourcesParam}`,
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
    fetchJobs(tab, includeGlobal, selectedSources)
  }, [authStatus, session, router, tab, includeGlobal, selectedSources, fetchJobs])

  const handleSourcesChange = (sources: JobSource[]) => {
    const next = sources.length === 0 ? [...ALL_SOURCES] : sources
    setSelectedSources(next)
    try {
      localStorage.setItem(SOURCES_KEY, JSON.stringify(next))
    } catch {}
  }

  const handleToggleGlobal = (checked: boolean) => {
    setIncludeGlobal(checked)
    try {
      localStorage.setItem(STORAGE_KEY, checked ? '1' : '0')
    } catch {}
  }

  const openDraftCover = async (job: Job, force = false) => {
    setDraftOpen({
      jobId: job.id, title: job.title, company: job.company, text: '', loading: true,
      contactEmail: job.contactEmail, emailSubject: undefined,
    })
    try {
      const res = await fetch(`/api/jobs/${job.id}/draft-cover${force ? '?force=1' : ''}`, { method: 'POST' })
      const data = (await res.json()) as {
        ok: boolean; coverLetter?: string; emailSubject?: string; contactEmail?: string | null
        cached?: boolean; error?: string
      }
      if (!data.ok || !data.coverLetter) throw new Error(data.error ?? 'draft failed')
      setDraftOpen({
        jobId: job.id, title: job.title, company: job.company,
        text: data.coverLetter, loading: false,
        contactEmail: data.contactEmail ?? job.contactEmail,
        emailSubject: data.emailSubject,
      })
      if (!data.cached) message.success('Cover letter drafted')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'draft failed'
      message.error(msg)
      setDraftOpen(null)
    }
  }

  const openEmail = () => {
    if (!draftOpen) return
    const to = draftOpen.contactEmail ?? ''
    const subject = draftOpen.emailSubject ?? `Application: ${draftOpen.title} — Hany El Saydawy`
    const body = draftOpen.text + '\n\n— Hany\n\n(CV attached)'
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  const copyDraft = () => {
    if (!draftOpen) return
    navigator.clipboard.writeText(draftOpen.text).then(
      () => message.success('Copied'),
      () => message.error('Copy failed'),
    )
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
        reports?: Array<{ source: string; companySlug?: string; count: number; ok: boolean; error?: string }>
        error?: string
      }
      if (data.ok) {
        const okReports = (data.reports ?? []).filter((r) => r.ok && r.count > 0)
        const totalRaw = okReports.reduce((s, r) => s + r.count, 0)
        const successCount = (data.reports ?? []).filter((r) => r.ok).length
        const failCount = (data.reports ?? []).filter((r) => !r.ok).length
        const inserted = data.inserted ?? 0
        const refreshed = data.skippedDuplicates ?? 0
        const dropped = data.droppedLowScore ?? 0
        message.success({
          content: inserted > 0
            ? `${inserted} NEW · ${refreshed} refreshed · ${dropped} dropped (low score) · ${successCount}/${successCount + failCount} sources OK · ${totalRaw} raw`
            : `No new jobs this run — all ${refreshed} refreshed from cache · ${successCount}/${successCount + failCount} sources OK · ${totalRaw} raw`,
          duration: 6,
        })
        fetchJobs(tab, includeGlobal, selectedSources)
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
      fetchJobs(tab, includeGlobal, selectedSources)
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
          <Space size="middle" wrap>
            <Select
              mode="multiple"
              value={selectedSources}
              onChange={handleSourcesChange}
              options={ALL_SOURCES.map((s) => ({ label: s, value: s }))}
              maxTagCount="responsive"
              placeholder="Sources"
              style={{ minWidth: 220, maxWidth: 360 }}
            />
            <Tooltip title="Off → only Egypt-presence companies + Egypt-friendly remote. On → everything, including global-only roles.">
              <Space size="small">
                <Switch checked={includeGlobal} onChange={handleToggleGlobal} />
                <Text>Include global jobs</Text>
              </Space>
            </Tooltip>
            <Button icon={<ReloadOutlined />} onClick={() => fetchJobs(tab, includeGlobal, selectedSources)} loading={loading}>
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
                        {job.contactEmail && (
                          <Tooltip title={job.contactEmail}>
                            <Tag color="magenta" icon={<MailOutlined />}>Email</Tag>
                          </Tooltip>
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
                        <Popover
                          placement="bottomLeft"
                          content={
                            <div style={{ maxWidth: 400 }}>
                              {job.scoreReasons.map((r, i) => (
                                <div key={i} style={{ fontSize: 12, fontFamily: 'monospace' }}>
                                  {r}
                                </div>
                              ))}
                            </div>
                          }
                        >
                          <Text type="secondary" style={{ fontSize: 12, cursor: 'help' }}>
                            {job.scoreReasons.slice(0, 2).join(' · ')}
                            {job.scoreReasons.length > 2 ? ` · +${job.scoreReasons.length - 2} more` : ''}
                          </Text>
                        </Popover>
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
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => openDraftCover(job)}
                        block
                      >
                        Draft cover
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

        <Modal
          open={!!draftOpen}
          title={draftOpen ? `Cover letter — ${draftOpen.title} @ ${draftOpen.company}` : ''}
          onCancel={() => setDraftOpen(null)}
          width={720}
          footer={[
            <Button
              key="regen"
              icon={<SyncOutlined />}
              onClick={() => {
                if (draftOpen) {
                  const job = jobs.find((j) => j.id === draftOpen.jobId)
                  if (job) openDraftCover(job, true)
                }
              }}
              disabled={draftOpen?.loading}
            >
              Re-draft
            </Button>,
            <Button
              key="email"
              icon={<MailOutlined />}
              onClick={openEmail}
              disabled={draftOpen?.loading}
              title={draftOpen?.contactEmail ? `Opens mailto:${draftOpen.contactEmail}` : 'No email found — opens mailto with empty To'}
            >
              Open email {draftOpen?.contactEmail ? `(to ${draftOpen.contactEmail})` : ''}
            </Button>,
            <Button key="copy" type="primary" icon={<CopyOutlined />} onClick={copyDraft} disabled={draftOpen?.loading}>
              Copy
            </Button>,
            <Button key="close" onClick={() => setDraftOpen(null)}>
              Close
            </Button>,
          ]}
        >
          {draftOpen?.loading ? (
            <Flex align="center" justify="center" style={{ padding: 48 }}>
              <Spin tip="Drafting with Claude Haiku…" />
            </Flex>
          ) : (
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
                fontSize: 14,
                lineHeight: 1.6,
                padding: 16,
                background: '#fafafa',
                border: '1px solid #eee',
                borderRadius: 4,
                maxHeight: 500,
                overflowY: 'auto',
              }}
            >
              {draftOpen?.text ?? ''}
            </pre>
          )}
        </Modal>
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
