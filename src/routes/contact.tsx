import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { identity, disciplines, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mahfuzh Arsya" },
      {
        name: "description",
        content:
          "Start an engagement with Mahfuzh Arsya — software engineering, data science or cinematic editing.",
      },
      { property: "og:title", content: "Contact — Mahfuzh Arsya" },
      { property: "og:description", content: "Available for select engagements in 2026." },
    ],
  }),
  component: Contact,
});

const fields = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email address", type: "email" },
  { name: "company", label: "Company (optional)", type: "text" },
] as const;

function Contact() {
  const [focus, setFocus] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState<string>("web");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const accent =
    disciplines.find((d) => d.key === discipline)?.accent ?? "var(--foreground)";

  return (
    <div className="px-4 pb-10 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">Contact / {identity.status}</p>
        <h1 className="display-xl mt-8 max-w-[16ch]">Let&apos;s build the bridge</h1>

        <div className="mt-20 grid gap-16 border-t border-border pt-12 lg:grid-cols-[1.3fr_0.7fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-12"
          >
            {fields.map((f) => (
              <label key={f.name} className="block">
                <span className="eyebrow">{f.label}</span>
                <input
                  type={f.type}
                  name={f.name}
                  required={f.name !== "company"}
                  onFocus={() => setFocus(f.name)}
                  onBlur={() => setFocus(null)}
                  className="mt-3 w-full border-b border-border bg-transparent pb-3 font-display text-2xl outline-none md:text-3xl"
                  style={{
                    borderColor: focus === f.name ? accent : "var(--border)",
                    boxShadow: focus === f.name ? `0 10px 30px -22px ${accent}` : "none",
                    transition: "border-color 400ms var(--ease-curtain), box-shadow 400ms",
                  }}
                />
              </label>
            ))}

            <div>
              <span className="eyebrow">Engagement type</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {disciplines.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setDiscipline(d.key)}
                    className="border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
                    style={{
                      borderColor: discipline === d.key ? d.accent : "var(--border)",
                      color: discipline === d.key ? d.accent : "var(--muted-foreground)",
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="eyebrow">Brief</span>
              <textarea
                name="brief"
                required
                rows={3}
                onFocus={() => setFocus("brief")}
                onBlur={() => setFocus(null)}
                className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-lg outline-none"
                style={{
                  borderColor: focus === "brief" ? accent : "var(--border)",
                  transition: "border-color 400ms var(--ease-curtain)",
                }}
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                data-cursor="Send"
                className="border border-foreground px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                {sent ? "Message noted" : "Send enquiry"}
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="WhatsApp"
                className="border border-border px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-secondary"
              >
                Or chat on WhatsApp
              </a>
            </div>

            {sent ? (
              <p className="font-mono text-[11px] text-muted-foreground">
                This form is not wired to an inbox yet — WhatsApp {identity.whatsappDisplay} or
                email {identity.email} in the meantime.
              </p>
            ) : null}
          </form>

          <aside className="space-y-px border border-border bg-border">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              data-cursor="WhatsApp"
              className="block bg-background p-5 transition-colors hover:bg-surface"
              style={{ boxShadow: "inset 2px 0 0 0 var(--data)" }}
            >
              <span className="eyebrow">WhatsApp — fastest reply</span>
              <span className="mt-2 block font-display text-xl">{identity.whatsappDisplay}</span>
            </a>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(identity.email);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }}
              className="block w-full bg-background p-5 text-left transition-colors hover:bg-surface"
            >
              <span className="eyebrow">{copied ? "Copied" : "Email — click to copy"}</span>
              <span className="mt-2 block font-display text-xl break-all">{identity.email}</span>
            </button>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block bg-background p-5 transition-colors hover:bg-surface"
            >
              <span className="eyebrow">LinkedIn</span>
              <span className="mt-2 block font-display text-xl">in/mahfuzharsya</span>
            </a>
            <a
              href={identity.behance}
              target="_blank"
              rel="noreferrer"
              className="block bg-background p-5 transition-colors hover:bg-surface"
            >
              <span className="eyebrow">Behance</span>
              <span className="mt-2 block font-display text-xl">Design archive</span>
            </a>
            <a
              href={identity.linktree}
              target="_blank"
              rel="noreferrer"
              className="block bg-background p-5 transition-colors hover:bg-surface"
            >
              <span className="eyebrow">All links</span>
              <span className="mt-2 block font-display text-xl">linktr.ee</span>
            </a>
            <div className="bg-background p-5">
              <span className="eyebrow">Local time</span>
              <span className="mt-2 block font-display text-xl">{identity.city} (GMT+7)</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
