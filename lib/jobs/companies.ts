/**
 * Target companies to watch. Seed this into the DB with `prisma/seed-jobs.ts`.
 * `slug` is the ATS board slug (e.g. Greenhouse: boards-api.greenhouse.io/v1/boards/<slug>/jobs).
 */

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
  | 'WUZZUF'
  | 'BAYT'
  | 'LINKEDIN_POSTS'
  | 'OTHER';

export interface TargetCompany {
  name: string;
  slug: string;        // ATS board slug
  source: JobSource;
  tier: CompanyTier;
  careersUrl?: string;
  notes?: string;
}

/**
 * Starter list. Slugs for Greenhouse/Ashby/Lever boards may need light
 * verification — the scraper logs 404s so we can prune bad ones.
 */
export const TARGET_COMPANIES: TargetCompany[] = [
  // ── Tier 1 — Egypt / MENA ──────────────────────────────────────────
  // Most Egyptian startups use Breezy, custom, or LinkedIn-only. We seed
  // the ones known to run Greenhouse / Ashby / Lever boards; the rest
  // are picked up via Wuzzuf/Bayt (v2) and Google-indexed LinkedIn posts.
  { name: 'Instabug', slug: 'instabug', source: 'LEVER', tier: 'EGYPT_MENA', careersUrl: 'https://instabug.com/careers' },
  { name: 'Paymob', slug: 'paymob', source: 'GREENHOUSE', tier: 'EGYPT_MENA', careersUrl: 'https://paymob.com/en/careers' },
  { name: 'Swvl', slug: 'swvl', source: 'GREENHOUSE', tier: 'EGYPT_MENA', careersUrl: 'https://www.swvl.com/careers' },
  { name: 'MaxAB', slug: 'maxab', source: 'GREENHOUSE', tier: 'EGYPT_MENA', careersUrl: 'https://www.maxab.io/careers' },
  { name: 'Halan', slug: 'halan', source: 'LEVER', tier: 'EGYPT_MENA', careersUrl: 'https://halan.com/careers' },
  { name: 'Dubizzle Group', slug: 'dubizzlegroup', source: 'GREENHOUSE', tier: 'EGYPT_MENA', careersUrl: 'https://group.dubizzle.com/careers' },

  // ── Tier 2 — Global AI (FDE sweet spot) ────────────────────────────
  { name: 'Anthropic', slug: 'anthropic', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://www.anthropic.com/careers' },
  { name: 'OpenAI', slug: 'openai', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://openai.com/careers/' },
  { name: 'Scale AI', slug: 'scaleai', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://scale.com/careers' },
  { name: 'Sierra', slug: 'sierra', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://sierra.ai/careers' },
  { name: 'Decagon', slug: 'decagon', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://decagon.ai/careers' },
  { name: 'Harvey', slug: 'harvey', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://www.harvey.ai/careers' },
  { name: 'Cursor', slug: 'anysphere', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://cursor.com/careers' },
  { name: 'Perplexity', slug: 'perplexity', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://www.perplexity.ai/hub/careers' },
  { name: 'Hugging Face', slug: 'huggingface', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://apply.workable.com/huggingface/' },
  { name: 'Mistral AI', slug: 'mistralai', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://mistral.ai/careers' },
  { name: 'Cohere', slug: 'cohere', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://cohere.com/careers' },
  { name: 'LangChain', slug: 'langchain', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://www.langchain.com/careers' },
  { name: 'Pinecone', slug: 'pinecone', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://www.pinecone.io/careers' },
  { name: 'Replicate', slug: 'replicate', source: 'ASHBY', tier: 'GLOBAL_AI', careersUrl: 'https://replicate.com/about#jobs' },
  { name: 'Vercel', slug: 'vercel', source: 'GREENHOUSE', tier: 'GLOBAL_AI', careersUrl: 'https://vercel.com/careers' },

  // ── Tier 3 — Global senior / full-stack (remote-friendly) ──────────
  { name: 'GitLab', slug: 'gitlab', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://about.gitlab.com/jobs/' },
  { name: 'Deel', slug: 'deel', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://www.deel.com/careers' },
  { name: 'Automattic', slug: 'automattic', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://automattic.com/work-with-us/' },
  { name: 'Zapier', slug: 'zapier', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://zapier.com/jobs' },
  { name: 'Supabase', slug: 'supabase', source: 'ASHBY', tier: 'GLOBAL_SENIOR', careersUrl: 'https://supabase.com/careers' },
  { name: 'Linear', slug: 'linear', source: 'ASHBY', tier: 'GLOBAL_SENIOR', careersUrl: 'https://linear.app/careers' },
  { name: 'PlanetScale', slug: 'planetscale', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://planetscale.com/careers' },
  { name: 'Clerk', slug: 'clerk', source: 'ASHBY', tier: 'GLOBAL_SENIOR', careersUrl: 'https://clerk.com/careers' },
  { name: 'Turso', slug: 'turso', source: 'ASHBY', tier: 'GLOBAL_SENIOR', careersUrl: 'https://turso.tech/careers' },
  { name: 'Toptal', slug: 'toptal', source: 'GREENHOUSE', tier: 'GLOBAL_SENIOR', careersUrl: 'https://www.toptal.com/careers' },

  // ── Tier 4 — Enterprise / fintech (occasional remote) ──────────────
  { name: 'Palantir', slug: 'palantirtechnologies', source: 'LEVER', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.palantir.com/careers/' },
  { name: 'Stripe', slug: 'stripe', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://stripe.com/jobs' },
  { name: 'Datadog', slug: 'datadog', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://careers.datadoghq.com/' },
  { name: 'Shopify', slug: 'shopify', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.shopify.com/careers' },
  { name: 'Twilio', slug: 'twilio', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.twilio.com/en-us/company/jobs' },
  { name: 'Figma', slug: 'figma', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.figma.com/careers/' },
  { name: 'Notion', slug: 'notion', source: 'GREENHOUSE', tier: 'GLOBAL_ENTERPRISE', careersUrl: 'https://www.notion.so/careers' },
];

/**
 * Job-market-wide sources (not tied to a specific company).
 * Kept here for config; adapters handle the actual fetch.
 */
export const BROAD_SOURCES = [
  { source: 'REMOTEOK' as const, description: 'RemoteOK — remote-first jobs' },
  // v2:
  // { source: 'WUZZUF' as const, description: 'Wuzzuf — Egypt tech jobs' },
  // { source: 'BAYT' as const, description: 'Bayt — MENA jobs' },
  // { source: 'LINKEDIN_POSTS' as const, description: 'LinkedIn hiring posts (via Serper)' },
];

/**
 * Keywords the scorer rewards (from CV.md).
 */
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
 * Hard blockers (job description mentions one of these → score penalty).
 */
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
