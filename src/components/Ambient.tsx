import { Suspense, lazy, useEffect, useState } from "react";

const AmbientField = lazy(() => import("./AmbientField"));

export function Ambient({ className }: { className?: string }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setTimeout(() => setOk(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 -z-10 opacity-70"}
    >
      {ok ? (
        <Suspense fallback={null}>
          <AmbientField />
        </Suspense>
      ) : null}
    </div>
  );
}
