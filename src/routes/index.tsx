import { ProjectMatcher } from "@/components/ProjectMatcher";
import { PricingSection } from "@/components/PricingSection";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ambient } from "@/components/Ambient";
import { identity, disciplines, metrics, valueProps, credibility, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahfuzh Arsya — Full-Stack, Motion & Data Visualization" },
      {
        name: "description",
        content:
          "Mahfuzh Arsya builds reliable digital systems enhanced by code-driven motion design, grounded in data. Based in Surabaya, Indonesia.",
      },
      {
        property: "og:title",
        content: "Mahfuzh Arsya — Full-Stack, Motion & Data Visualization",
      },
      {
        property: "og:description",
        content:
          "Full-stack development, motion design and data visualization — one standard of finish.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-10 pb-24 md:px-8 md:pt-16">
        <Ambient />
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: "var(--data)", boxShadow: "0 0 10px var(--data)" }}
              />
              {identity.status}
            </span>
            <span className="eyebrow">{identity.city}</span>
          </div>

          <h1 className="display-xl reveal-up mt-10 max-w-[18ch]">
            {identity.headline}
            <span className="text-muted-foreground">.</span>
          </h1>

          <div className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-[48ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Full-stack development, motion design and data visualization — building digital
              systems that are reliable to run, precise in motion, and measured in results.
            </p>
            <div className="flex flex-wrap items-end gap-3 md:justify-end">
              <Link
                to="/portfolio"
                data-cursor="Browse"
                className="border border-foreground px-6 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                View portfolio
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="WhatsApp"
                className="border border-border px-6 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="display-lg max-w-[18ch]">Why this pairing works</h2>
            <p className="eyebrow">The bridge / 3 advantages</p>
          </div>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {valueProps.map((v) => (
              <div key={v.index} className="bg-background p-6 md:p-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  {v.index}
                </span>
                <h3 className="mt-8 font-display text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="flex flex-col lg:h-[min(62vh,620px)] lg:flex-row">
          {disciplines.map((d, i) => {
            const active = hover === i;
            return (
              <Link
                key={d.key}
                to="/portfolio"
                data-cursor={d.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group relative flex flex-1 flex-col justify-between overflow-hidden border-b border-border p-6 transition-[flex] duration-700 last:border-b-0 md:p-10 lg:border-r lg:border-b-0 lg:last:border-r-0"
                style={{
                  flexGrow: hover === null ? 1 : active ? 1.9 : 0.75,
                  transitionTimingFunction: "var(--ease-curtain)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(120% 90% at 50% 110%, ${d.accent}, transparent 65%)`,
                    opacity: active ? 0.16 : 0,
                  }}
                />
                <div className="relative flex items-baseline justify-between">
                  <span
                    className="font-mono text-[11px] tracking-[0.2em]"
                    style={{ color: d.accent }}
                  >
                    {d.index}
                  </span>
                  <span className="eyebrow">Discipline</span>
                </div>
                <div className="relative mt-16">
                  <h2 className="display-lg max-w-[12ch]">{d.label}</h2>
                  <p
                    className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted-foreground transition-opacity duration-500"
                    style={{ opacity: hover === null || active ? 1 : 0.35 }}
                  >
                    {d.blurb}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {d.keywords.map((k) => (
                      <span
                        key={k}
                        className="border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="border-t border-border-strong pt-6">
              <p className="font-display text-6xl tracking-tight md:text-7xl">
                {m.value}
                <span className="text-muted-foreground">{m.suffix}</span>
              </p>
              <p className="mt-4 max-w-[26ch] text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-4 py-14 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow">Recognition</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {credibility.map((c) => (
              <li
                key={c}
                className="border border-border px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectMatcher />
      <PricingSection />
      <section className="relative overflow-hidden border-t border-border px-4 py-24 md:px-8 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(90% 120% at 50% 130%, var(--data), transparent 62%)",
            opacity: 0.14,
          }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="eyebrow">Next step</p>
          <h2 className="display-xl mt-8 max-w-[20ch]">
            Have an ambitious idea? Let&apos;s bridge it
          </h2>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Whether it is a platform to build, a campaign to visualise or a film to cut — send a
            message and we can talk it through today.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              data-cursor="WhatsApp"
              className="border border-foreground px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              WhatsApp {identity.whatsappDisplay}
            </a>
            <Link
              to="/contact"
              data-cursor="Write"
              className="border border-border px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-secondary"
            >
              Send a brief
            </Link>
            <span className="eyebrow">Usually replies within a day</span>
          </div>
        </div>
      </section>
    </div>
  );
}
