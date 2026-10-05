import { useState } from "react";
import {
  Smartphone, Gauge, MessageCircle, Clock, PenLine, BarChart3, Zap, Palette,
  Plug, Sparkles, Code2, Users, Server, Headphones, Check, Landmark, Globe,
  Video, Captions, Music, Camera, Scissors, Wand2, RefreshCw, Film,
  LayoutTemplate,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Currency = "IDR" | "USD";
type ServiceKey = "web" | "video" | "data";
type Plan = {
  name: string; tier: string; idr: string | null; usd: string | null;
  features: [LucideIcon, string][]; featured?: boolean;
};

const webPlans: Plan[] = [
  { name: "Bronze Pack", tier: "Starter", idr: "Rp999.000", usd: "$75", features: [
    [Smartphone, "1 Mobile-First Page"], [Gauge, "Standard load speed"],
    [MessageCircle, "Floating WhatsApp Integration"], [Clock, "3–5 Days Delivery"]] },
  { name: "Silver Pack", tier: "Professional", idr: "Rp2.499.000", usd: "$199", featured: true, features: [
    [PenLine, "Copywriting & Conversion Optimized"], [BarChart3, "Meta Pixel & GA4 Integration"],
    [Zap, "Core Web Vitals Optimization"], [Clock, "5–8 Days Delivery"]] },
  { name: "Gold Pack", tier: "Enterprise-Lite", idr: "Rp4.999.000", usd: "$399", features: [
    [Palette, "Non-Template Custom UI/UX"], [Plug, "3rd Party API (CRM/Payment)"],
    [Sparkles, "Motion UI & Scripts"], [Clock, "10–14 Days Delivery"]] },
  { name: "Custom Pack", tier: "Tailored", idr: null, usd: null, features: [
    [Code2, "Custom Web App Features"], [Users, "Membership System"],
    [Server, "Advanced Server Architecture"], [Headphones, "Dedicated Support"]] },
];

const videoPlans: Plan[] = [
  { name: "Reels & Social", tier: "Social", idr: "Rp499.000", usd: "$39", features: [
    [Video, "1 Short-Form Video (up to 60s)"], [Captions, "Subtitle & Caption Editing"],
    [Music, "Licensed Music & SFX"], [Clock, "2–3 Days Delivery"]] },
  { name: "Event Coverage", tier: "Documentation", idr: "Rp1.499.000", usd: "$119", features: [
    [Camera, "On-Site Event Coverage"], [Scissors, "Highlight Edit 2–3 Minutes"],
    [Sparkles, "Color Grading & Sound Cleanup"], [Clock, "4–6 Days Delivery"]] },
  { name: "Motion Graphics", tier: "Professional", idr: "Rp2.999.000", usd: "$239", featured: true, features: [
    [Wand2, "Animated Logo & Kinetic Typography"], [BarChart3, "Infographic / Explainer Animation"],
    [RefreshCw, "2 Revision Rounds Included"], [Clock, "7–10 Days Delivery"]] },
  { name: "Brand Motion Kit", tier: "Enterprise-Lite", idr: "Rp4.499.000", usd: "$359", features: [
    [Film, "Intro, Outro & Lower Thirds"], [LayoutTemplate, "Editable Reels Template Set"],
    [Palette, "Consistent Brand Motion System"], [Clock, "10–14 Days Delivery"]] },
];

const dataPlans: Plan[] = [
  { name: "Insight Report", tier: "Starter", idr: "Rp749.000", usd: "$59", features: [
    [BarChart3, "Data Cleaning & Analysis"], [PenLine, "Written Insight Summary"],
    [Gauge, "1 Static Dashboard / Chart Pack"], [Clock, "3–5 Days Delivery"]] },
  { name: "Dashboard Pro", tier: "Professional", idr: "Rp1.999.000", usd: "$159", featured: true, features: [
    [Zap, "Interactive Dashboard (Looker/Power BI)"], [Plug, "Spreadsheet / API Data Source"],
    [RefreshCw, "2 Revision Rounds Included"], [Clock, "5–8 Days Delivery"]] },
  { name: "Data Storytelling", tier: "Creative", idr: "Rp2.499.000", usd: "$199", features: [
    [Sparkles, "Animated Infographic / Motion Chart"], [Palette, "Branded Visual System"],
    [BarChart3, "Presentation-Ready Deck"], [Clock, "7–10 Days Delivery"]] },
  { name: "Analytics Custom", tier: "Tailored", idr: null, usd: null, features: [
    [Code2, "Python / Automation Pipeline"], [Server, "Database & ETL Setup"],
    [Users, "Team Training & Handover"], [Headphones, "Ongoing Support Retainer"]] },
];

const catalog: Record<ServiceKey, Plan[]> = { web: webPlans, video: videoPlans, data: dataPlans };

const serviceMeta: Record<ServiceKey, { label: string; accent: string; scope: string }> = {
  web: { label: "Website", accent: "var(--web)", scope: "Paket Website" },
  video: { label: "Motion & Video", accent: "var(--video)", scope: "Paket Video" },
  data: { label: "Data Analytics", accent: "var(--data)", scope: "Paket Data Analytics" },
};

const wa = (p: Plan, c: Currency, s: ServiceKey) => {
  const price = (c === "IDR" ? p.idr : p.usd) ?? "Custom Quote";
  const scope = serviceMeta[s].scope;
  const text = `Halo Mahfuzh, saya tertarik dengan ${p.name} (${p.tier}) — ${scope}, ${price} (${c}). Boleh diskusi lebih lanjut?`;
  return `https://wa.me/6285117769013?text=${encodeURIComponent(text)}`;
};

export function PricingSection() {
  const [cur, setCur] = useState<Currency>("IDR");
  const [service, setService] = useState<ServiceKey>("web");
  const plans = catalog[service];
  const accent = serviceMeta[service].accent;

  return (
    <section id="pricing" className="border-t border-border px-4 py-24 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display-lg max-w-[16ch]">Packages & pricing</h2>
          <p className="eyebrow">Transparent / 4 tiers</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div role="tablist" aria-label="Pilih layanan" className="flex gap-7 border-b border-border">
            {(Object.keys(serviceMeta) as ServiceKey[]).map((s) => {
              const active = service === s;
              return (
                <button
                  key={s} role="tab" aria-selected={active} onClick={() => setService(s)}
                  className="relative pb-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
                  style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {serviceMeta[s].label}
                  <span
                    className="absolute inset-x-0 -bottom-px h-px origin-left transition-transform duration-500"
                    style={{ backgroundColor: serviceMeta[s].accent, transform: `scaleX(${active ? 1 : 0})` }}
                  />
                </button>
              );
            })}
          </div>

          <div role="tablist" aria-label="Pilih mata uang" className="relative grid grid-cols-2 rounded-full border border-border bg-card/60 p-1 backdrop-blur">
            <span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-foreground transition-transform duration-500 ease-[var(--ease-curtain)]"
              style={{ left: 4, transform: cur === "USD" ? "translateX(100%)" : "none" }}
            />
            {(["IDR", "USD"] as Currency[]).map((c) => (
              <button
                key={c} role="tab" aria-selected={cur === c} onClick={() => setCur(c)}
                className={`relative z-10 px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${cur === c ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c === "IDR" ? "IDR (Domestik)" : "USD (Global)"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => {
            const price = cur === "IDR" ? p.idr : p.usd;
            return (
              <article
                key={p.name}
                className={`group relative flex flex-col border bg-card/50 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1 ${p.featured ? "" : "border-border hover:border-foreground/30"}`}
                style={p.featured ? { borderColor: accent, boxShadow: `0 0 60px -20px ${accent}` } : undefined}
              >
                {p.featured && (
                  <span
                    className="absolute -top-3 left-7 px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-background"
                    style={{ backgroundColor: accent }}
                  >
                    Best Seller
                  </span>
                )}
                <p className="eyebrow">{p.tier}</p>
                <h3 className="mt-3 font-display text-3xl">{p.name}</h3>
                <p key={`${cur}-${service}`} className="reveal-up mt-8 font-display text-4xl">
                  {price ?? "Custom Quote"}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {price ? "One-time project" : "Scoped together"}
                </p>
                <ul className="mt-8 flex-1 space-y-4 border-t border-border pt-6">
                  {p.features.map(([Icon, f]) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Icon className="mt-0.5 size-4 shrink-0" style={{ color: p.featured ? accent : undefined }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={wa(p, cur, service)} target="_blank" rel="noreferrer" data-cursor="Start"
                  className={`mt-8 border px-5 py-3.5 text-center font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${p.featured ? "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground" : "border-border hover:bg-foreground hover:text-background"}`}
                >
                  Get Started
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {[
            { flag: "🇮🇩", title: "Klien Domestik", Icon: Landmark,
              body: "Transfer Bank (BCA, Mandiri, BNI, BRI) & QRIS/E-Wallet (GoPay, OVO, Dana)",
              note: "Termin: 50% Down Payment, 50% Pelunasan setelah UAT" },
            { flag: "🌍", title: "Klien Internasional", Icon: Globe,
              body: "PayPal (Balance, Visa, Mastercard, Amex)",
              note: "Terms: 100% Upfront or 50/50 Milestone for Gold/Custom" },
          ].map(({ flag, title, Icon, body, note }) => (
            <div key={title} className="border border-border bg-card/50 p-7 backdrop-blur md:p-9">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{flag}</span>
                <h3 className="font-display text-2xl">{title}</h3>
                <Icon className="ml-auto size-5 text-muted-foreground" />
              </div>
              <p className="mt-6 leading-relaxed">{body}</p>
              <p className="mt-6 flex items-start gap-2 border-t border-border pt-5 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
                <Check className="size-3.5 shrink-0" style={{ color: "var(--data)" }} /> {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
