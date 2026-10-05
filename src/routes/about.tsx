import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/portrait.webp";
import {
  identity,
  ethos,
  techMatrix,
  chronology,
  education,
  languages,
  whatsappLink,
} from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mahfuzh Arsya" },
      {
        name: "description",
        content:
          "The ethos, skills, career history and education behind Mahfuzh Arsya's full-stack, motion design and data visualization work.",
      },
      { property: "og:title", content: "About — Mahfuzh Arsya" },
      {
        property: "og:description",
        content: "Engineering rigour and visual authorship, from Surabaya, Indonesia.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="px-4 pb-10 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">About / {identity.monogram}</p>
        <h1 className="display-xl mt-8 max-w-[16ch]">A single standard of finish</h1>

        <div className="mt-20 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="group relative overflow-hidden bg-surface">
            <img
              src={portrait}
              alt={identity.name}
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              style={{ transitionTimingFunction: "var(--ease-curtain)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
              style={{
                background:
                  "linear-gradient(140deg, var(--web), transparent 45%, var(--video))",
              }}
            />
            <figcaption className="eyebrow absolute bottom-4 left-4">
              {identity.name} — {identity.city}
            </figcaption>
          </figure>

          <div>
            <h2 className="display-lg">Ethos</h2>
            {ethos.map((p) => (
              <p key={p} className="mt-6 max-w-[54ch] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}

            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              {techMatrix.map((g) => (
                <div key={g.group} className="bg-background p-5">
                  <p className="eyebrow">{g.group}</p>
                  <ul className="mt-3 space-y-1.5">
                    {g.items.map((i) => (
                      <li key={i} className="text-sm text-foreground">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-28 border-t border-border pt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="display-lg">Chronology</h2>
            <p className="eyebrow">2021 — 2026</p>
          </div>

          <ol className="mt-12">
            {chronology.map((c) => (
              <li
                key={`${c.year}-${c.org}`}
                className="group grid gap-3 border-t border-border py-7 transition-colors hover:bg-surface/60 md:grid-cols-[150px_1fr_1.1fr] md:items-baseline md:gap-8 md:px-2"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  {c.year}
                </span>
                <span className="font-display text-2xl md:text-3xl">{c.role}</span>
                <span className="text-sm text-muted-foreground">
                  <span className="text-foreground">{c.org}</span> — {c.impact}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-mono text-[11px] text-muted-foreground">
            Project visuals for each role are being added.
          </p>
        </section>

        <section className="mt-24 grid gap-12 border-t border-border pt-12 lg:grid-cols-2">
          <div>
            <h2 className="display-lg">Education</h2>
            <ol className="mt-10">
              {education.map((e) => (
                <li
                  key={e.org}
                  className="grid gap-2 border-t border-border py-6 md:grid-cols-[150px_1fr] md:gap-8"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {e.year}
                  </span>
                  <span>
                    <span className="block font-display text-2xl">{e.role}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{e.org}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="display-lg">Languages</h2>
            <ol className="mt-10">
              {languages.map((l) => (
                <li
                  key={l.name}
                  className="flex items-baseline justify-between gap-6 border-t border-border py-6"
                >
                  <span className="font-display text-2xl">{l.name}</span>
                  <span className="eyebrow">{l.level}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-24 border-t border-border pt-12">
          <h2 className="display-lg max-w-[22ch]">Let&apos;s work together</h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              data-cursor="WhatsApp"
              className="border border-foreground px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              WhatsApp {identity.whatsappDisplay}
            </a>
            <a
              href={identity.cv.en}
              download
              className="border border-border px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-secondary"
            >
              Download CV
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
