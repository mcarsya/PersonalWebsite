import { useEffect, useState } from "react";

type Choice = { outcome: string };
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<Choice> };

export function Pwa() {
  const [evt, setEvt] = useState<InstallEvent | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!evt) return null;

  return (
    <button
      onClick={async () => {
        await evt.prompt();
        setEvt(null);
      }}
      className="fixed bottom-5 left-5 z-50 border border-border-strong bg-background/80 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase backdrop-blur-xl hover:bg-secondary"
    >
      Install
    </button>
  );
}
