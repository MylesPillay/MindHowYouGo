// helpers/animations.ts
import * as React from "react";

export type EasingFn = (t: number) => number;

export const WALK_DURATION = 31_000; // ms
export const WALKER_START_OFFSET = 120;     // px: off-screen left
export const WALKER_END_EXTRA = -100;         // px: go a bit past container

// Easing presets
export const EASE = {
  linear: (t: number) => t,
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
} satisfies Record<string, EasingFn>;

type WalkerOpts = {
  walkerEl: HTMLElement | null;
  /** The track the walker moves across. Use the outermost element whose width you care about. */
  trackEl: HTMLElement | null;
  /** Full loop duration in ms. */
  duration?: number;
  /** Where the walker starts (px). Negative to begin off-screen. */
  startOffset?: number;
  /** Extra distance beyond track width (px). */
  endExtra?: number;
  /** Easing function for progress. */
  easing?: EasingFn;
  /** Pause when the tab/window is hidden. */
  pauseWhenHidden?: boolean;
  /** If true and user prefers reduced motion, park the walker and do nothing. */
  respectReducedMotion?: boolean;
};

/**
 * Attaches a horizontal "walker" animation that loops from left to right.
 * Returns a cleanup function (perfect for useEffect).
 */
export function attachWalkerAnimation({
  walkerEl,
  trackEl,
  duration = WALK_DURATION,
  startOffset = WALKER_START_OFFSET,
  endExtra = WALKER_END_EXTRA,
  easing = EASE.linear,
  pauseWhenHidden = true,
  respectReducedMotion = true,
}: WalkerOpts): () => void {
  if (!walkerEl || !trackEl || typeof window === "undefined") return () => {};

  if (
    respectReducedMotion &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    // Respect reduced motion: keep walker parked at start.
    walkerEl.style.transform = `translateX(${startOffset}px)`;
    return () => {};
  }

  let rafId: number | null = null;
  let startTime: number | null = null;
  let trackWidth = trackEl.offsetWidth;

  const computeX = (t: number) => {
    const clamped = Math.min(Math.max(t, 0), 1);
    const eased = easing(clamped);
    // Move from startOffset → (trackWidth + endExtra)
    return startOffset + eased * (trackWidth + endExtra - startOffset);
  };

  const step = (ts: number) => {
    if (startTime == null) startTime = ts;
    const elapsed = ts - startTime;
    const t = elapsed / duration;

    if (t < 1) {
      walkerEl.style.transform = `translateX(${computeX(t)}px)`;
      rafId = window.requestAnimationFrame(step);
    } else {
      // Loop: reset to start and continue
      startTime = ts;
      walkerEl.style.transform = `translateX(${startOffset}px)`;
      rafId = window.requestAnimationFrame(step);
    }
  };

  const start = () => {
    cancel();
    startTime = null;
    trackWidth = trackEl.offsetWidth;
    rafId = window.requestAnimationFrame(step);
  };

  const cancel = () => {
    if (rafId != null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const onResize = () => {
    trackWidth = trackEl.offsetWidth;
  };

  const onVisibility = () => {
    if (!pauseWhenHidden) return;
    if (document.hidden) {
      cancel();
    } else {
      start();
    }
  };

  window.addEventListener("resize", onResize);
  if (pauseWhenHidden) document.addEventListener("visibilitychange", onVisibility);

  walkerEl.style.transform = `translateX(${startOffset}px)`;
  start();

  return () => {
    cancel();
    window.removeEventListener("resize", onResize);
    if (pauseWhenHidden) document.removeEventListener("visibilitychange", onVisibility);
  };
}

/**
 * Optional: tiny React hook wrapper if you prefer refs.
 */
export function useWalkerAnimation(
  walkerRef: React.RefObject<HTMLElement>,
  trackRef: React.RefObject<HTMLElement>,
  opts?: Omit<WalkerOpts, "walkerEl" | "trackEl">
) {
  React.useEffect(() => {
    return attachWalkerAnimation({
      walkerEl: walkerRef.current,
      trackEl: trackRef.current,
      ...opts,
    });
    // we intentionally don't depend on opts objects that may be recreated every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkerRef.current, trackRef.current]);
}
