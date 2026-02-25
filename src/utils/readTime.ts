/**
 * Calculate estimated read time for content
 * Based on average reading speed of 200 words per minute
 */
export function getReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
