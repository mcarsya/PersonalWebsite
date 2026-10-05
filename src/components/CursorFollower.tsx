import { useEffect, useRef, useState } from "react";

export function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(el ? (el as HTMLElement).dataset["cursor"] || "" : null);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  const active = label !== null;

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[90]">
      <div
        className="flex items-center justify-center rounded-full border border-border-strong backdrop-blur-[2px] transition-all duration-300"
        style={{
          width: active ? 84 : 14,
          height: active ? 84 : 14,
          transform: down ? "scale(0.88)" : "scale(1)",
          backgroundColor: active ? "oklch(1 0 0 / 0.06)" : "var(--foreground)",
          transitionTimingFunction: "var(--ease-curtain)",
        }}
      >
        {active && label ? (
          <span className="font-mono text-[9px] tracking-[0.18em] text-foreground uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
