/**
 * Target companies to watch. Seed with `npx tsx prisma/seed-jobs.ts`.
 * egyptPresence = has Egypt office or hires MENA remote.
 * workdayConfig  = used only when source === 'WORKDAY'.
 */

import type { WorkdayConfig } from './sources/workday';

export type CompanyTier =
  | 'EGYPT_MENA'
  | 'GLOBAL_AI'
  | 'GLOBAL_SENIOR'
  | 'GLOBAL_ENTERPRISE';

export type JobSource =
  | 'GREENHOUSE'
  | 'ASHBY'
  | 'LEVER'
  | 'REMOTEOK'
  | 'WORKDAY'
  | 'WUZZUF'
  | 'BAYT'
  | 'LINKEDIN_POSTS'
  | 'OTHER';

export interface TargetCompany {
  name: string;
  slug: string;
  source: JobSource;
  tier: CompanyTier;
  egyptPresence?: boolean;
  careersUrl?: string;
  notes?: string;
  workdayConfig?: WorkdayConfig;
}

export const TARGET_COMPANIES: TargetCompany[] = [
  // ── Tier 1 — Egypt / MENA local ────────────────────────────────────
  { name: 'Instabug',        slug: 'instabug',        source: 'LEVER',      tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://instabug.com/careers' },
  { name: 'Paymob',          slug: 'paymob',          source: 'GREENHOUSE', tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://paymob.com/en/careers' },
  { name: 'Swvl',            slug: 'swvl',            source: 'GREENHOUSE', tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://www.swvl.com/careers' },
  { name: 'MaxAB',           slug: 'maxab',           source: 'GREENHOUSE', tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://www.maxab.io/careers' },
  { name: 'Halan',           slug: 'halan',           source: 'LEVER',      tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://halan.com/careers' },
  { name: 'Dubizzle Group',  slug: 'dubizzlegroup',   source: 'GREENHOUSE', tier: 'EGYPT_MENA', egyptPresence: true, careersUrl: 'https://group.dubizzle.com/careers' },

  // ── International consulting / Big 4 / MNCs with Egypt offices ─────
  // Workday-based (adapter can fetch)
  {
    name: 'PwC Middle East', slug: 'pwc-me', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://www.pwc.com/m1/en/careers.html',
    workdayConfig: { subdomain: 'pwc', pod: 'wd3', tenant: 'pwc', board: 'Global_Experienced_Careers', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Deloitte', slug: 'deloitte', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://apply.deloitte.com',
    workdayConfig: { subdomain: 'deloitte', pod: 'wd12', tenant: 'deloitte', board: 'Deloitte', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'EY (Ernst & Young)', slug: 'ey', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://careers.ey.com',
    workdayConfig: { subdomain: 'ey', pod: 'wd3', tenant: 'ey', board: 'EY_EMEA', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Accenture', slug: 'accenture', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://www.accenture.com/eg-en/careers',
    workdayConfig: { subdomain: 'accenture', pod: 'wd3', tenant: 'accenture', board: 'AccentureCareers', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'IBM', slug: 'ibm', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://careers.ibm.com',
    workdayConfig: { subdomain: 'ibmglobal', pod: 'wd3', tenant: 'ibmglobal', board: 'IBM', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Siemens', slug: 'siemens', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://jobs.siemens.com',
    workdayConfig: { subdomain: 'siemens', pod: 'wd3', tenant: 'siemens', board: 'Siemens', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Cisco', slug: 'cisco', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://jobs.cisco.com',
    workdayConfig: { subdomain: 'cisco', pod: 'wd5', tenant: 'ciscoinc', board: 'ciscopre', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Capgemini', slug: 'capgemini', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://www.capgemini.com/careers/',
    workdayConfig: { subdomain: 'capgemini', pod: 'wd3', tenant: 'capgemini', board: 'Capgemini', countries: ['Egypt'], searchText: 'engineer' },
  },
  {
    name: 'Globant', slug: 'globant', source: 'WORKDAY', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true,
    careersUrl: 'https://careers.globant.com',
    workdayConfig: { subdomain: 'globant', pod: 'wd3', tenant: 'globant', board: 'globant_careers', countries: ['Egypt'], searchText: 'engineer' },
  },

  // Non-Workday (watch-only — careers link shown, no auto-fetch until adapter ships)
  { name: 'KPMG',       slug: 'kpmg',       source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://kpmg.com/eg/en/home/careers.html', notes: 'SuccessFactors — watch-only' },
  { name: 'McKinsey',   slug: 'mckinsey',   source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://www.mckinsey.com/careers', notes: 'Custom ATS — watch-only' },
  { name: 'BCG',        slug: 'bcg',        source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://careers.bcg.com', notes: 'Workday but gated — watch-only' },
  { name: 'Bain',       slug: 'bain',       source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://www.bain.com/careers/', notes: 'Custom ATS — watch-only' },
  { name: 'Microsoft',  slug: 'microsoft',  source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://jobs.careers.microsoft.com/global/en/search', notes: 'Custom ATS — watch-only' },
  { name: 'Oracle',     slug: 'oracle',     source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://careers.oracle.com', notes: 'Taleo — watch-only' },
  { name: 'SAP',        slug: 'sap',        source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://jobs.sap.com', notes: 'SuccessFactors — watch-only' },
  { name: 'Thoughtworks', slug: 'thoughtworks', source: 'LEVER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://www.thoughtworks.com/careers' },
  { name: 'EPAM',       slug: 'epam',       source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://www.epam.com/careers', notes: 'Custom ATS — watch-only' },
  { name: 'Cognizant',  slug: 'cognizant',  source: 'OTHER', tier: 'GLOBAL_ENTERPRISE', egyptPresence: true, careersUrl: 'https://careers.cognizant.com', notes: 'Workday (gated) — watch-only' },

  // ── Tier 2 — Global AI (FDE sweet spot) ────────────────────────────
  { name: 'Anthropic',    slug: 'anthropic',    source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://www.anthropic.com/careers' },
  { name: 'OpenAI',       slug: 'openai',       source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://openai.com/careers/' },
  { name: 'Scale AI',     slug: 'scaleai',      source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://scale.com/careers' },
  { name: 'Sierra',       slug: 'sierra',       source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://sierra.ai/careers' },
  { name: 'Decagon',      slug: 'decagon',      source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://decagon.ai/careers' },
  { name: 'Harvey',       slug: 'harvey',       source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://www.harvey.ai/careers' },
  { name: 'Cursor',       slug: 'anysphere',    source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://cursor.com/careers' },
  { name: 'Perplexity',   slug: 'perplexity',   source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://www.perplexity.ai/hub/careers' },
  { name: 'Hugging Face', slug: 'huggingface',  source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://apply.workable.com/huggingface/' },
  { name: 'Mistral AI',   slug: 'mistralai',    source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://mistral.ai/careers' },
  { name: 'Cohere',       slug: 'cohere',       source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://cohere.com/careers' },
  { name: 'LangChain',    slug: 'langchain',    source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://www.langchain.com/careers' },
  { name: 'Pinecone',     slug: 'pinecone',     source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://www.pinecone.io/careers' },
  { name: 'Replicate',    slug: 'replicate',    source: 'ASHBY',      tier: 'GLOBAL_AI', careersUrl: 'https://replicate.com/about#jobs' },
  { name: 'Vercel',       slug: 'vercel',       source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://vercel.com/careers' },

  // ── Tier 3 — Global senior / full-stack (remote-friendly) ──────────
  { name: 'GitLab',      slug: 'gitlab',      source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://about.gitlab.com/jobs/' },
  { name: 'Deel',        slug: 'deel',        source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://www.deel.com/careers' },
  { name: 'Automattic',  slug: 'automattic',  source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://automattic.com/work-with-us/' },
  { name: 'Zapier',      slug: 'zapier',      source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://zapier.com/jobs' },
  { name: 'Supabase',    slug: 'supabase',    source: 'ASHBY',      tier: 'GLOBAL_SENIOR', careersUrl: 'https://supabase.com/careers' },
  { name: 'Linear',      slug: 'linear',      source: 'ASHBY',      tier: 'GLOBAL_SENIOR', careersUrl: 'https://linear.app/careers' },
  { name: 'PlanetScale', slug: 'planetscale', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://planetscale.com/careers' },
  { name: 'Clerk',       slug: 'clerk',       source: 'ASHBY',      tier: 'GLOBAL_SENIOR', careersUrl: 'https://clerk.com/careers' },
  { name: 'Turso',       slug: 'turso',       source: 'ASHBY',      tier: 'GLOBAL_SENIOR', careersUrl: 'https://turso.tech/careers' },
  { name: 'Toptal',      slug: 'toptal',      source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://www.toptal.com/careers' },

  // ── Tier 4 — Enterprise / fintech (occasional remote) ──────────────
  { name: 'Palantir',   slug: 'palantirtechnologies', source: 'LEVER',      tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.palantir.com/careers/' },
  { name: 'Stripe',     slug: 'stripe',               source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://stripe.com/jobs' },
  { name: 'Datadog',    slug: 'datadog',              source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://careers.datadoghq.com/' },
  { name: 'Shopify',    slug: 'shopify',              source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.shopify.com/careers' },
  { name: 'Twilio',     slug: 'twilio',               source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.twilio.com/en-us/company/jobs' },
  { name: 'Figma',      slug: 'figma',                source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.figma.com/careers/' },
  { name: 'Notion',     slug: 'notion',               source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.notion.so/careers' },
];

/**
 * Keywords the scorer rewards.
 */
export const FRONTEND_KEYWORDS = [
  'frontend',
  'front-end',
  'front end',
  'ui engineer',
  'ux engineer',
  'react',
  'react native',
  'next.js',
  'nextjs',
  'design system',
  'component library',
];

export const PROFILE_KEYWORDS_HI = [
  'forward deployed',
  'forward-deployed',
  'full stack',
  'full-stack',
  'fullstack',
  'react',
  'next.js',
  'nextjs',
  'typescript',
  'node.js',
  'nodejs',
  'ai engineer',
  'ai engineering',
  'llm',
  'rag',
  'prompt',
  'senior engineer',
  'staff engineer',
  'tech lead',
  'technical lead',
  'lead engineer',
  'lead frontend',
];

export const PROFILE_KEYWORDS_LO = [
  'postgres',
  'postgresql',
  'graphql',
  'tailwind',
  'aws',
  'vercel',
  'docker',
  'prisma',
  'react native',
  'expo',
  'design system',
  'rtl',
  'arabic',
  'fintech',
  'kyc',
  'aml',
  'payments',
  'stripe',
  'marketplace',
];

/**
 * Titles that disqualify (pure backend/infra/ML research without product/UI).
 */
export const BACKEND_ONLY_TITLE_KEYWORDS = [
  'kubernetes',
  'devops',
  'sre ',
  'site reliability',
  'platform engineer',
  'infrastructure engineer',
  'machine learning researcher',
  'ml researcher',
  'research scientist',
  'data engineer',
  'database engineer',
  'security engineer',
  'golang',
  'go developer',
  'rust developer',
  'c++',
  'embedded',
  'firmware',
  'android engineer',
  'ios engineer',
];

export const BLOCKERS = [
  'us citizens only',
  'us citizens',
  'us citizenship required',
  'security clearance required',
  'must be located in the united states',
  'must reside in the us',
  'onsite only',
  'on-site only',
  'in-office only',
  'no remote',
  'work authorization in the us',
  'us work authorization',
  'eu work authorization required',
  'eu citizens only',
  'uk work authorization',
  'junior',
  'entry level',
  'intern',
  'apprentice',
];

export const EGYPT_SIGNALS = [
  'cairo',
  'egypt',
  'egyptian',
  'mena',
  'middle east',
  'emea',
];

export const REMOTE_GLOBAL_SIGNALS = [
  'worldwide',
  'anywhere',
  'global',
  'fully remote',
  'remote-first',
  'remote first',
];

export const VISA_FRIENDLY_SIGNALS = [
  'visa sponsorship',
  'we sponsor',
  'relocation support',
  'relocation package',
  'visa support',
];
