import { Link } from "@tanstack/react-router";
import { identity, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="hairline mt-32 px-4 py-10 pb-24 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl">{identity.headline}</p>
          <p className="eyebrow mt-3">
            {identity.city} — {identity.status}
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link to="/portfolio" className="eyebrow hover:text-foreground" data-cursor="View">
            Portfolio
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="eyebrow hover:text-foreground"
            data-cursor="WhatsApp"
          >
            WhatsApp
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            className="eyebrow hover:text-foreground"
            data-cursor="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={identity.behance}
            target="_blank"
            rel="noreferrer"
            className="eyebrow hover:text-foreground"
            data-cursor="Behance"
          >
            Behance
          </a>
          <span className="eyebrow">
            © {new Date().getFullYear()} {identity.monogram}
          </span>
        </div>
      </div>
    </footer>
  );
}
