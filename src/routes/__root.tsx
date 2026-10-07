import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CursorFollower } from "@/components/CursorFollower";
import { Pwa } from "@/components/Pwa";
import { WhatsAppFab } from "@/components/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-lg">404</h1>
        <p className="mt-4 eyebrow">This page is not part of the archive</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-secondary"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-lg">Oops</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-secondary"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#08080a" },
      { name: "author", content: "Mahfuzh Arsya" },
      {
        name: "keywords",
        content:
          "Mahfuzh Arsya, Full-Stack Developer, Motion Design, Data Visualization, Surabaya, Web Developer Indonesia",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo.jpg" },
      { property: "og:site_name", content: "Mahfuzh Arsya Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.jpg", type: "image/jpeg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Inter+Tight:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="select-none" onCopy={(e) => e.preventDefault()}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <CursorFollower />
      <div className="film-grain" aria-hidden />
      <Navbar />
      <main className="min-h-screen pt-28 md:pt-32">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <Pwa />
    </QueryClientProvider>
  );
}
