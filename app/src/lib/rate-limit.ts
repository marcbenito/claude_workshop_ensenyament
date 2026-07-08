/**
 * Limitador de peticions senzill en memòria (finestra fixa per clau).
 *
 * Pensat per protegir login i registre contra força bruta. L'estat viu a la
 * memòria del procés: n'hi ha prou per a un desplegament d'una sola instància o
 * per a desenvolupament. En producció multi-instància caldria un magatzem
 * compartit (p. ex. Redis).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  /** `true` si la petició està dins del límit. */
  allowed: boolean;
  /** Segons que falten fins que es reinicia la finestra (quan es bloqueja). */
  retryAfter: number;
}

/**
 * Registra un intent per a `key` i indica si supera el límit.
 *
 * @param key    Identificador (p. ex. `login:<ip>`).
 * @param limit  Nombre màxim d'intents dins la finestra.
 * @param windowMs  Durada de la finestra en mil·lisegons.
 */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Extreu la IP del client a partir de les capçaleres habituals de proxy. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
