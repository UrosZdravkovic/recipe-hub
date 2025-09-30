import { useCallback, useRef, useState } from 'react';

/**
 * Simple reusable pop (scale) animation hook using state + Tailwind classes.
 * Returns {scaleClass, trigger, active}
 */
export function usePop(opts?: { durationMs?: number; scaleFrom?: number; scaleTo?: number; bufferMs?: number }) {
  const { durationMs = 300, scaleFrom = 1, scaleTo = 1.25, bufferMs = 40 } = opts || {};
  const [active, setActive] = useState(false);
  const tRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    if (tRef.current) window.clearTimeout(tRef.current);
    setActive(true);
    tRef.current = window.setTimeout(() => setActive(false), durationMs + bufferMs);
  }, [durationMs, bufferMs]);

  const scaleClass = active ? `scale-[${scaleTo}]` : `scale-[${scaleFrom}]`;
  return { active, trigger, scaleClass };
}

export default usePop;
