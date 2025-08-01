// Utility functions to handle build-time database issues

export function isDatabaseAvailable(): boolean {
  // Check if we're in build mode or if database URL is not set
  return !!(process.env.DATABASE_URL && !process.env.NEXT_PHASE);
}

export async function safeDbQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build, using fallback data');
      return fallback;
    }
    return await queryFn();
  } catch (error) {
    console.warn('Database query failed, using fallback data:', error);
    return fallback;
  }
}
