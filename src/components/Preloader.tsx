import { useEffect, useRef, useState } from "react";

const FLAG = "ma-preloaded";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem(FLAG);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;

    setActive(true);
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1900;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(FLAG, "1");
        setLeaving(true);
        window.setTimeout(() => {
          setActive(false);
          document.body.style.overflow = "";
        }, 1000);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || !active) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-background px-6 py-8 transition-[transform,opacity] duration-[900ms] md:px-10"
      style={{
        transitionTimingFunction: "var(--ease-curtain)",
        transform: leaving ? "translateY(-101%) scale(1.04)" : "none",
        opacity: leaving ? 0.2 : 1,
      }}
    >
      <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
        <span>Mahfuzh Arsya</span>
        <span>Portfolio / 2026</span>
      </div>

      <div className="font-mono text-[18vw] leading-none tabular-nums md:text-[12vw]">
        {String(progress).padStart(3, "0")}
        <span className="text-muted-foreground">%</span>
      </div>

      <div>
        <div className="h-px w-full bg-border">
          <div
            className="h-px bg-foreground transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          Preparing the archive
        </p>
      </div>
    </div>
  );
}
