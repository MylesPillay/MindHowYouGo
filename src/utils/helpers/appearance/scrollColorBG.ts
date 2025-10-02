import * as React from "react";

const initialColorStr = "hsla(39, 89%, 96%, 0.6)";
const finalColorStr = "hsla(160, 58%, 90%, 0.6)";

/** Build a CSS color-mix() color between `initial` and `final` at t∈[0,1]. */
function colorMix(initial: string, final: string, t: number, space: "hsl" | "oklch" = "hsl") {
  const pct = Math.max(0, Math.min(1, t));
  const pFinal = Math.round(pct * 100);
  const pInitial = 100 - pFinal;
  // Example: color-mix(in hsl, hsla(...) 60%, hsla(...) 40%)
  return `color-mix(in ${space}, ${initial} ${pInitial}%, ${final} ${pFinal}%)`;
}

function makeScrollColorHandler({
  setBgColor,
  initial,
  final,
  maxT = 1,
  space = "hsl",
}: {
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  initial: string;
  final: string;
  /** allow slight overshoot if you want (e.g., 1.2) */
  maxT?: number;
  /** mixing color space; defaults to "hsl" */
  space?: "hsl" | "oklch";
}) {
  const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(n, max));
  let ticking = false;

  const compute = () => {
    const scrollTop = window.scrollY || 0;
    const fullHeight =
      Math.max(
        document.documentElement?.scrollHeight || 0,
        document.body?.scrollHeight || 0
      ) - window.innerHeight;

    const denom = Math.max(1, fullHeight); // avoid /0 when page is short
    const t = clamp(scrollTop / denom, 0, maxT);
    setBgColor(colorMix(initial, final, t, space));
  };

  return function handleScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    }
  };
}

function attachScrollColor(opts: {
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  initial: string;
  final: string;
  maxT?: number;
  space?: "hsl" | "oklch";
}) {
  const handler = makeScrollColorHandler(opts);
  handler(); // sync once on mount
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}
export {makeScrollColorHandler, attachScrollColor, initialColorStr, finalColorStr}