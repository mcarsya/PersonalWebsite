import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { matchProject } from "@/lib/matcher.functions";
type MatchResult = Awaited<ReturnType<typeof matchProject>>;
import { identity } from "@/data/site";

const accent = { web: "var(--web)", data: "var(--data)", video: "var(--video)" } as const;

export function ProjectMatcher() {
  const run = useServerFn(matchProject);
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<MatchResult | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (brief.trim().length < 15) return setErr("Ceritakan kebutuhan Anda minimal satu kalimat.");
    setErr("");
    setLoading(true);
    setRes(null);
    try {
      const r = await run({ data: { brief } });
      if (r.error) setErr(r.error);
      else {
        setRes(r);
        setMsg(r.whatsappMessage);
      }
    } catch {
      setErr("Gagal memproses. Coba lagi atau hubungi langsung via WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const wa = `https://wa.me/${identity.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <section className="border-t border-border px-6 py-28 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">AI Project Matcher</p>
          <h2 className="display-lg mt-6 max-w-[14ch]">Describe it. Get a tailored plan.</h2>
          <p className="mt-6 max-w-[44ch] leading-relaxed text-muted-foreground">
            Tulis kebutuhan proyek Anda — AI akan merekomendasikan layanan yang paling relevan dan
            menyusun pesan WhatsApp yang siap dikirim.
          </p>
        </div>
        <div>
          <form onSubmit={submit} className="space-y-4">
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="Contoh: Saya butuh website kursus online dengan dashboard progres siswa dan video promosi singkat, target rilis 2 bulan."
              className="w-full resize-none border border-border bg-card p-5 text-base leading-relaxed outline-none transition-colors focus:border-foreground/40"
            />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                data-cursor="Match"
                className="border border-foreground px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                {loading ? "Menganalisis…" : "Analisis kebutuhan"}
              </button>
              {err && <span className="text-sm text-destructive">{err}</span>}
            </div>
          </form>

          {res && (
            <div className="mt-10 space-y-6">
              {res.summary && <p className="text-muted-foreground">{res.summary}</p>}
              <div className="grid gap-3">
                {res.services.map((s) => (
                  <div key={s.key} className="border border-border bg-card p-5" style={{ borderLeft: `2px solid ${accent[s.key]}` }}>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: accent[s.key] }}>
                      {s.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.reason}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="eyebrow mb-3">Draf pesan WhatsApp — bisa diedit</p>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={6}
                  className="w-full resize-none border border-border bg-card p-5 text-sm leading-relaxed outline-none focus:border-foreground/40"
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="WhatsApp"
                    className="border border-foreground bg-foreground px-7 py-4 font-mono text-[11px] tracking-[0.18em] text-background uppercase"
                  >
                    Kirim via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(msg)}
                    className="border border-border px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-secondary"
                  >
                    Salin pesan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
