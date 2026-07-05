/**
 * Runtime guards to prevent SSR crashes like:
 *   - `obj[undefined] = value`
 *   - "Cannot assign to read only property 'undefined'"
 *   - loader throws that bubble into renderToReadableStream
 *
 * Use these whenever a key comes from `params`, `search`, a fetch response,
 * or any other untrusted source.
 */

/**
 * Non-throwing key validator. Returns the string when valid, otherwise `null`.
 * Use in code paths where an invalid key should be skipped, not fatal.
 */
export function safeKey(key: unknown, label = "key"): string | null {
  if (typeof key !== "string" || key.trim() === "") {
    if (typeof console !== "undefined") {
      console.error(`[safeKey] invalid ${label}:`, key);
    }
    return null;
  }
  return key;
}

/**
 * Throwing key validator. Use when a missing/invalid key is a real bug that
 * must surface loudly (loaders, server functions, anywhere the caller
 * contract guarantees the key exists).
 */
export function assertKey(key: unknown, context: string): string {
  if (typeof key !== "string" || key.trim().length === 0) {
    throw new Error(`[SSR INVALID KEY] ${context}: ${String(key)}`);
  }
  return key;
}

/**
 * Immutable set — never mutates router-owned objects (loaderData, context).
 * Skips assignment when the key is invalid instead of throwing.
 */
export function safeSet<T extends Record<string, unknown>>(
  obj: T,
  key: unknown,
  value: unknown,
): T {
  const k = safeKey(key, "safeSet.key");
  if (!k) return obj;
  return { ...obj, [k]: value } as T;
}

/**
 * Mutating set with a hard guard. Use only on objects you own (never on
 * router-owned params/loaderData). Throws on invalid keys so the bug is
 * visible instead of writing to `obj["undefined"]`.
 */
export function safeSetMut(
  obj: Record<string, unknown>,
  key: unknown,
  value: unknown,
): void {
  if (typeof key !== "string" || key.trim().length === 0) {
    throw new Error(`[SAFESET BLOCKED] invalid key: ${String(key)}`);
  }
  obj[key] = value;
}

/**
 * Wraps a route loader so a thrown error or invalid input becomes `null`
 * instead of crashing SSR. Prefer explicit `notFound()` / `redirect()` when
 * you need routing semantics; this is the safety net for everything else.
 */
export function safeLoader<Ctx, R>(
  loaderFn: (ctx: Ctx) => Promise<R> | R,
): (ctx: Ctx) => Promise<R | null> {
  return async (ctx: Ctx) => {
    try {
      const result = await loaderFn(ctx);
      return result ?? null;
    } catch (err) {
      if (typeof console !== "undefined") {
        console.error("[safeLoader] error:", err);
      }
      return null;
    }
  };
}

/**
 * Development-time assertion that no top-level property of `obj` is
 * `undefined`. Use on values that are about to be serialized for SSR
 * transport, where an accidental `undefined` corrupts the payload.
 */
export function assertNoUndefined(obj: Record<string, unknown>, label: string): void {
  for (const k of Object.keys(obj)) {
    if (obj[k] === undefined) {
      throw new Error(`[SSR UNDEFINED DETECTED] ${label}.${k}`);
    }
  }
}
