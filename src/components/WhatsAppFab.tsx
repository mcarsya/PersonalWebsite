import { whatsappLink } from "@/data/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      data-cursor="WhatsApp"
      aria-label="Chat on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 border border-border-strong bg-background/80 px-4 py-3 backdrop-blur-xl transition-colors hover:bg-secondary md:right-8 md:bottom-8"
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: "var(--data)", boxShadow: "0 0 10px var(--data)" }}
      />
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase">WhatsApp</span>
    </a>
  );
}
