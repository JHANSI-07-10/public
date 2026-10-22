/**
 * In-memory spam guards shared by every form pipeline on this site.
 *
 * Each serverless instance keeps its own copy, so this is a friction layer
 * rather than a quota: it stops honest double-clicks and casual script floods,
 * while the hard limits live with the mail provider.
 */

export interface SubmissionGuardOptions {
  maxPerWindow: number;
  windowMs: number;
  dedupeTtlMs: number;
}

export interface SubmissionGuard {
  /** Drop keys older than their own TTL; call at the start of every request. */
  prune(): void;
  isRateLimited(bucket: string): boolean;
  isDuplicate(keys: string[]): boolean;
  recordSent(keys: string[]): void;
}

export function createSubmissionGuard({
  maxPerWindow,
  windowMs,
  dedupeTtlMs,
}: SubmissionGuardOptions): SubmissionGuard {
  const hits = new Map<string, number[]>();
  const seen = new Map<string, number>();

  return {
    prune() {
      const now = Date.now();
      for (const [key, at] of seen) if (now - at > dedupeTtlMs) seen.delete(key);
      for (const [bucket, times] of hits) {
        const fresh = times.filter((at) => now - at < windowMs);
        if (fresh.length === 0) hits.delete(bucket);
        else hits.set(bucket, fresh);
      }
    },

    isRateLimited(bucket) {
      const now = Date.now();
      const times = (hits.get(bucket) ?? []).filter((at) => now - at < windowMs);
      if (times.length >= maxPerWindow) {
        hits.set(bucket, times);
        return true;
      }
      times.push(now);
      hits.set(bucket, times);
      return false;
    },

    isDuplicate(keys) {
      const now = Date.now();
      return keys.some((key) => {
        const at = seen.get(key);
        return at !== undefined && now - at < dedupeTtlMs;
      });
    },

    recordSent(keys) {
      const now = Date.now();
      for (const key of keys) seen.set(key, now);
    },
  };
}
