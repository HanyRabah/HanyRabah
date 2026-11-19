import type { JobSource } from './companies';

/**
 * Normalized shape produced by every source adapter.
 */
export interface RawJob {
  externalId: string;     // unique within (source, companySlug)
  source: JobSource;
  companySlug: string;    // for matching back to TargetCompany
  companyName: string;
  title: string;
  location?: string;
  remote: boolean;
  description: string;    // plain text, ≤ 4000 chars after normalization
  url: string;
  salary?: string;
  tags?: string[];
  postedAt?: Date;
}

export interface ScoredJob extends RawJob {
  score: number;              // 0..100
  reasons: string[];          // human-readable (e.g. "+30 title match: forward deployed")
  visaFriendly: boolean | null;
  remoteFromEgypt: boolean | null;
}

export interface FetchReport {
  source: JobSource | string;
  companySlug?: string;
  count: number;
  ok: boolean;
  error?: string;
}
