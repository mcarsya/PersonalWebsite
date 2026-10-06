import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import projectImm from "@/assets/project-imm.png";
import projectUkpi from "@/assets/project-ukpi.png";
import projectMoodle from "@/assets/project-moodle.png";
import reel01 from "@/assets/reel-01.jpg";
import reel02 from "@/assets/reel-02.jpg";
import reel03 from "@/assets/reel-03.jpg";
import reel04 from "@/assets/reel-04.jpg";
import { webProjects, studies, reels } from "@/data/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Mahfuzh Arsya" },
      {
        name: "description",
        content: "Selected work across web development, data science and cinematic video editing.",
      },
      { property: "og:title", content: "Portfolio — Mahfuzh Arsya" },
      {
        property: "og:description",
        content: "Shipped products, analytical studies and directed edits.",
      },
    ],
  }),
  component: Portfolio,
});

const tabs = [
  { key: "all", label: "All" },
  { key: "web", label: "Web Dev" },
  { key: "data", label: "Data Science" },
  { key: "video", label: "Video Editing" },
] as const;

const projectShots = [projectImm, projectUkpi, projectMoodle];
const reelPosters = [reel01, reel02];

function WebDev() {
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative"
      onMouseMove={(e) => {
        if (preview.current) {
          preview.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 110}px, 0)`;
        }
      }}
    >
      <header className="flex items-baseline justify-between border-b border-border pb-5">
        <h2 className="display-lg" style={{ color: "var(--web)" }}>
          Web Development
        </h2>
        <p className="eyebrow">Shipped systems</p>
      </header>

      <ul>
        {webProjects.map((p, i) => (
          <li
            key={p.no}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="group grid gap-3 border-b border-border py-8 transition-colors md:grid-cols-[90px_1.2fr_1.3fr_auto] md:items-baseline md:gap-8"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              {p.no}
            </span>
            <div>
              <h3 className="font-display text-3xl md:text-4xl">{p.name}</h3>
              <p className="eyebrow mt-2">
                {p.category} / {p.year}
              </p>
              {p.description ? (
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              ) : null}
            </div>
            <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
              {p.stack}
            </p>
            <div className="flex gap-3">
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="Live"
                className="border border-border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase hover:bg-secondary"
              >
                Live demo
              </a>
              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Code"
                  className="border border-border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase hover:bg-secondary"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden w-[340px] overflow-hidden border border-border-strong transition-opacity duration-300 md:block"
        style={{ opacity: hover === null ? 0 : 1 }}
      >
        {hover !== null ? (
          <img
            src={projectShots[hover]}
            alt=""
            width={1024}
            height={640}
            className="w-full object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}

function DataScience() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="display-lg" style={{ color: "var(--data)" }}>
            Data Science
          </h2>
          <p className="eyebrow mt-1">Laboratory</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="border border-border p-2 hover:bg-secondary transition-colors" aria-label="Scroll left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => scroll('right')} className="border border-border p-2 hover:bg-secondary transition-colors" aria-label="Scroll right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {studies.map((s) => (
          <article key={s.no} className="border border-border bg-surface/60 min-w-[85vw] md:min-w-[45%] lg:min-w-[40%] shrink-0 snap-start">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              <span>
                ~/studies/{s.no} <span style={{ color: "var(--data)" }}>●</span>
              </span>
              <span>{s.metric}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-3xl">{s.title}</h3>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                &gt; objective: {s.objective}
                <br />
                &gt; stack: {s.stack}
              </p>

              <div className="mt-6 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={s.series} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
                    <defs>
                      <linearGradient id={`g-${s.no}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--data)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--data)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                    <XAxis
                      dataKey="x"
                      stroke="var(--muted-foreground)"
                      tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-strong)",
                        borderRadius: 0,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--foreground)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="a"
                      name="model"
                      stroke="var(--data)"
                      strokeWidth={1.5}
                      fill={`url(#g-${s.no})`}
                    />
                    <Line
                      type="monotone"
                      dataKey="b"
                      name="baseline"
                      stroke="var(--muted-foreground)"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideoEditing() {
  const [open, setOpen] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="display-lg" style={{ color: "var(--video)" }}>
            Video Editing
          </h2>
          <p className="eyebrow mt-1">Reels</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="border border-border p-2 hover:bg-secondary transition-colors" aria-label="Scroll left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => scroll('right')} className="border border-border p-2 hover:bg-secondary transition-colors" aria-label="Scroll right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {reels.map((r, i) => (
          <button
            key={r.no}
            onClick={() => setOpen(i)}
            data-cursor="Play"
            className="group relative overflow-hidden border border-border text-left min-w-[85vw] md:min-w-[45%] lg:min-w-[40%] shrink-0 snap-start"
            onMouseEnter={(e) => {
              const v = e.currentTarget.querySelector("video");
              if (v) void v.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              const v = e.currentTarget.querySelector("video");
              if (v) {
                v.pause();
                v.currentTime = 0;
              }
            }}
          >
            <div className="relative aspect-video">
              <img
                src={reelPosters[i]}
                alt={r.title}
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <video
                src={r.src}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-border p-5">
              <div>
                <p
                  className="font-mono text-[10px] tracking-[0.2em]"
                  style={{ color: "var(--video)" }}
                >
                  {r.no}
                </p>
                <h3 className="mt-2 font-display text-2xl">{r.title}</h3>
                <p className="eyebrow mt-1">{r.role}</p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                {r.duration}
              </span>
            </div>
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-background/95 p-4 backdrop-blur-xl md:p-10"
          role="dialog"
          aria-modal
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow">
              {reels[open]!.no} / {reels[open]!.title}
            </p>
            <button
              onClick={() => setOpen(null)}
              className="border border-border-strong px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase hover:bg-secondary"
            >
              Close
            </button>
          </div>
          <div className="mt-6 flex flex-1 items-center">
            <video
              src={reels[open]!.src}
              controls
              autoPlay
              className="max-h-[70vh] w-full bg-black object-contain"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5">
            {reels[open]!.credits.map((c) => (
              <span key={c} className="font-mono text-[11px] text-muted-foreground">
                {c}
              </span>
            ))}
            <span className="font-mono text-[11px] text-muted-foreground">
              Duration {reels[open]!.duration}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Portfolio() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");

  return (
    <div className="px-4 pb-10 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">Portfolio / Selected work</p>
        <h1 className="display-xl mt-8 max-w-[14ch]">Three pillars</h1>

        <div className="mt-14 flex flex-wrap gap-2 border-b border-border pb-5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
              style={{
                borderColor: tab === t.key ? "var(--foreground)" : "var(--border)",
                backgroundColor: tab === t.key ? "var(--foreground)" : "transparent",
                color: tab === t.key ? "var(--background)" : "var(--muted-foreground)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-20 space-y-32">
          {(tab === "all" || tab === "web") && <WebDev />}
          {(tab === "all" || tab === "data") && <DataScience />}
          {(tab === "all" || tab === "video") && <VideoEditing />}
        </div>
      </div>
    </div>
  );
}
