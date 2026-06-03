/**
 * Strip HTML tags and dangerous characters from user-supplied strings.
 * Prevents XSS and injection attacks reaching GHL or logs.
 */
export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/[<>"'`]/g, "")          // remove remaining dangerous chars
    .trim()
    .slice(0, 1000);                   // hard cap at 1000 chars
}
