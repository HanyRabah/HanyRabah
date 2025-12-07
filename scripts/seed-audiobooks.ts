import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🎧 Seeding audiobooks...')

  // Clear existing audiobooks first
  await prisma.resource.deleteMany({
    where: { type: 'AUDIOBOOK' }
  })

  const audiobooks = await Promise.all([
    // Tech & Programming
    prisma.resource.create({
      data: {
        title: 'The Pragmatic Programmer',
        description: 'Your Journey to Mastery. A timeless guide to software craftsmanship with practical advice for programmers at all levels.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Pragmatic-Programmer-Audiobook/B0833FMYH9',
        category: 'Programming',
        image: '/images/audiobooks/pragmatic-programmer.jpg',
        isAffiliate: true,
        tags: ['programming', 'software-engineering', 'best-practices', 'career'],
        narrator: 'Anna Katarina',
        audioDuration: '10h 7m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin. Learn to write code that is clean, maintainable, and professional.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Clean-Code-Audiobook/B08X8ZXT15',
        category: 'Programming',
        image: '/images/audiobooks/clean-code.jpg',
        isAffiliate: true,
        tags: ['clean-code', 'software-engineering', 'best-practices', 'refactoring'],
        narrator: 'Bob Welch',
        audioDuration: '12h 42m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The Phoenix Project',
        description: 'A Novel about IT, DevOps, and Helping Your Business Win. A gripping story that teaches DevOps principles through narrative.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Phoenix-Project-Audiobook/B00VATFAMI',
        category: 'DevOps',
        image: '/images/audiobooks/phoenix-project.jpg',
        isAffiliate: true,
        tags: ['devops', 'it-management', 'agile', 'business'],
        narrator: 'Chris Ruen',
        audioDuration: '14h 45m',
        clickCount: 0
      }
    }),

    // AI & Technology
    prisma.resource.create({
      data: {
        title: 'Life 3.0',
        description: 'Being Human in the Age of Artificial Intelligence by Max Tegmark. Explores how AI will affect crime, war, justice, jobs, and our very sense of being human.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Life-30-Audiobook/B0742JQF31',
        category: 'AI & Future',
        image: '/images/audiobooks/life-3.jpg',
        isAffiliate: true,
        tags: ['artificial-intelligence', 'future', 'technology', 'philosophy'],
        narrator: 'Rob Shapiro',
        audioDuration: '13h 29m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The Alignment Problem',
        description: 'Machine Learning and Human Values by Brian Christian. A deep dive into AI alignment and ensuring AI systems share our values.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Alignment-Problem-Audiobook/0593149580',
        category: 'AI & Future',
        image: '/images/audiobooks/alignment-problem.jpg',
        isAffiliate: true,
        tags: ['ai-safety', 'machine-learning', 'ethics', 'technology'],
        narrator: 'Brian Christian',
        audioDuration: '16h 32m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'AI Superpowers',
        description: 'China, Silicon Valley, and the New World Order by Kai-Fu Lee. Insights into the AI race between China and the US from a leading AI expert.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/AI-Superpowers-Audiobook/B07D5M3Q4Y',
        category: 'AI & Future',
        image: '/images/audiobooks/ai-superpowers.jpg',
        isAffiliate: true,
        tags: ['artificial-intelligence', 'china', 'silicon-valley', 'future'],
        narrator: 'Mikael Naramore',
        audioDuration: '9h 28m',
        clickCount: 0
      }
    }),

    // Personal Enhancement & Productivity
    prisma.resource.create({
      data: {
        title: 'Atomic Habits',
        description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear. The definitive guide to habit formation and behavior change.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Atomic-Habits-Audiobook/1524779261',
        category: 'Self-Improvement',
        image: '/images/audiobooks/atomic-habits.jpg',
        isAffiliate: true,
        tags: ['habits', 'productivity', 'self-improvement', 'psychology'],
        narrator: 'James Clear',
        audioDuration: '5h 35m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Deep Work',
        description: 'Rules for Focused Success in a Distracted World by Cal Newport. Master the art of deep concentration in an age of constant distraction.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Deep-Work-Audiobook/B0189PVAWY',
        category: 'Productivity',
        image: '/images/audiobooks/deep-work.jpg',
        isAffiliate: true,
        tags: ['productivity', 'focus', 'career', 'self-improvement'],
        narrator: 'Jeff Bottoms',
        audioDuration: '7h 44m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Thinking, Fast and Slow',
        description: 'By Daniel Kahneman. A groundbreaking tour of the mind explaining the two systems that drive the way we think and make decisions.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Thinking-Fast-and-Slow-Audiobook/B005TKKCWC',
        category: 'Psychology',
        image: '/images/audiobooks/thinking-fast-slow.jpg',
        isAffiliate: true,
        tags: ['psychology', 'decision-making', 'behavioral-economics', 'thinking'],
        narrator: 'Patrick Egan',
        audioDuration: '20h 2m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'The 7 Habits of Highly Effective People',
        description: 'By Stephen R. Covey. A timeless classic on personal effectiveness and leadership that has transformed millions of lives.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-7-Habits-of-Highly-Effective-People-Audiobook/B002V5HAL4',
        category: 'Leadership',
        image: '/images/audiobooks/7-habits.jpg',
        isAffiliate: true,
        tags: ['leadership', 'productivity', 'self-improvement', 'business'],
        narrator: 'Stephen R. Covey',
        audioDuration: '15h 50m',
        clickCount: 0
      }
    }),

    // Tech Business & Innovation
    prisma.resource.create({
      data: {
        title: 'The Lean Startup',
        description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses by Eric Ries.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/The-Lean-Startup-Audiobook/B005LXV0HI',
        category: 'Startups',
        image: '/images/audiobooks/lean-startup.jpg',
        isAffiliate: true,
        tags: ['startups', 'entrepreneurship', 'innovation', 'business'],
        narrator: 'Eric Ries',
        audioDuration: '8h 38m',
        clickCount: 0
      }
    }),
    prisma.resource.create({
      data: {
        title: 'Zero to One',
        description: 'Notes on Startups, or How to Build the Future by Peter Thiel. Unconventional wisdom on innovation and building monopolies.',
        type: 'AUDIOBOOK',
        url: 'https://www.audible.com/pd/Zero-to-One-Audiobook/B00M27LBU2',
        category: 'Startups',
        image: '/images/audiobooks/zero-to-one.jpg',
        isAffiliate: true,
        tags: ['startups', 'innovation', 'business', 'entrepreneurship'],
        narrator: 'Blake Masters',
        audioDuration: '4h 50m',
        clickCount: 0
      }
    })
  ])

  console.log(`✅ Seeded ${audiobooks.length} audiobooks`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding audiobooks:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
