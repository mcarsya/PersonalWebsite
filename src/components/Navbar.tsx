import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { identity } from "@/data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact Me" },
] as const;

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: identity.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Navbar() {
  const time = useLocalTime();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 border border-border bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
        <Link to="/" className="group flex items-center gap-3" data-cursor="Home">
          <img src="/logo.jpg" alt="Logo" className="size-8 object-contain" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground tabular-nums">
            {time ?? "--:--"} {identity.tzLabel}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                data-cursor="Open"
                className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div ref={wrap} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="border border-border-strong px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-secondary"
            >
              Download CV
            </button>
            {open ? (
              <div className="absolute right-0 mt-2 w-60 border border-border bg-surface shadow-lift">
                <a
                  href={identity.cv.en}
                  download
                  className="block px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-surface-2"
                >
                  Curriculum Vitae (EN)
                </a>
                {identity.cv.id ? (
                  <a
                    href={identity.cv.id}
                    download
                    className="block border-t border-border px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-surface-2"
                  >
                    Curriculum Vitae (ID)
                  </a>
                ) : (
                  <span className="block border-t border-border px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    Versi ID — menyusul
                  </span>
                )}
              </div>
            ) : null}
          </div>

          <button
            onClick={() => setMenu((v) => !v)}
            className="border border-border-strong px-3 py-2 font-mono text-[11px] uppercase md:hidden"
            aria-label="Menu"
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {menu ? (
        <div className="mx-auto mt-2 max-w-[1400px] border border-border bg-background/95 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenu(false)}
              className="block border-b border-border px-5 py-4 font-display text-2xl last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
