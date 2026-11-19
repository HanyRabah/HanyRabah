import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Drafts a short cover letter paragraph tailored to a specific job, grounded
 * in Hany's CV.md. Uses Anthropic's Haiku for cost (~$0.01 per draft).
 */

const MODEL = 'claude-haiku-5-5';

let cvCache: string | null = null;
function loadCv(): string {
  if (cvCache) return cvCache;
  const p = path.join(process.cwd(), 'CV.md');
  if (fs.existsSync(p)) {
    cvCache = fs.readFileSync(p, 'utf-8');
    return cvCache;
  }
  cvCache = '';
  return '';
}

export interface DraftCoverInput {
  jobTitle: string;
  company: string;
  jobDescription: string;
  jobUrl?: string;
}

export interface DraftCoverResult {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

export async function draftCoverLetter(input: DraftCoverInput): Promise<DraftCoverResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY env var is not set — add it in Vercel settings.');
  }
  const client = new Anthropic({ apiKey });

  const cv = loadCv();
  const system = [
    `You are drafting a cover letter for Hany El Saydawy — a Senior Full-Stack / Forward Deployed Engineer with 15+ years of experience (React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, AI integration).`,
    `Tone: honest, direct, confident, no buzzwords, no "I am writing to express my interest" fluff.`,
    `Length: 200–260 words total. Opening salutation, two short paragraphs, closing line.`,
    `Content:`,
    `- Paragraph 1: One sentence saying what role you're applying for, one sentence that names the SPECIFIC experience from his CV that matches this job (be concrete: name the company, the metric, the stack). Don't generic-list.`,
    `- Paragraph 2: What specifically about THIS role/company caught his attention — tie to a real detail from the job description (not generic "your mission"). One sentence on what he'd bring in the first 60 days.`,
    `- Close with: "Hany" (just the name, nothing after).`,
    `Hard rules:`,
    `- Never invent experience he doesn't have.`,
    `- If the job needs a language he doesn't use (Python/Rust/Go/Scala), acknowledge it briefly as a ramp-up, don't fake expertise.`,
    `- No em dashes in the output (he doesn't like them).`,
    `- Return just the letter text, no preamble, no commentary.`,
  ].join('\n');

  const user = [
    `Job title: ${input.jobTitle}`,
    `Company: ${input.company}`,
    input.jobUrl ? `URL: ${input.jobUrl}` : '',
    '',
    `Job description:`,
    input.jobDescription,
    '',
    `--- HANY'S CV (reference for grounding; cite specific facts only) ---`,
    cv.slice(0, 12000), // cap to keep token cost bounded
  ]
    .filter(Boolean)
    .join('\n');

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 800,
    system,
    messages: [{ role: 'user', content: user }],
  });

  const text = resp.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();

  return {
    text,
    model: MODEL,
    inputTokens: resp.usage.input_tokens,
    outputTokens: resp.usage.output_tokens,
  };
}
