import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export type MatchResult = {
  services: { key: "web" | "data" | "video"; title: string; reason: string }[];
  summary: string;
  whatsappMessage: string;
  error?: string;
};

const SYSTEM = `You are the project intake assistant for Mahfuzh Arsya, a creative technologist in Surabaya, Indonesia.
His services: "web" (Full-stack web development: web apps, WordPress, Moodle LMS, landing pages), "data" (Data visualization: dashboards, analytics, Python insights, social media performance), "video" (Motion design & video editing: event coverage, brand assets, motion graphics, social video).
Given a prospective client's brief, recommend 1-3 relevant services and draft a personalized WhatsApp message FROM the client TO Mahfuzh.
Reply in the same language as the brief (Indonesian if the brief is Indonesian). Keep the WhatsApp message under 110 words, warm and professional, starting with "Halo Mahfuzh," (or "Hi Mahfuzh," in English), summarising needs, timeline/budget if mentioned, and asking for a discussion.
Return ONLY valid JSON, no markdown: {"services":[{"key":"web|data|video","title":string,"reason":string}],"summary":string,"whatsappMessage":string}. Each reason max 30 words; summary max 40 words.`;

export async function matchBrief(brief: string, signal?: AbortSignal): Promise<MatchResult> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey)
    return {
      services: [],
      summary: "",
      whatsappMessage: "",
      error: "AI belum dikonfigurasi. Pastikan GEMINI_API_KEY ada di file .env.",
    };

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM,
      prompt: `Client brief:\n${brief}`,
      maxRetries: 0,
      ...(signal ? { abortSignal: signal } : {}),
    });
    const text = await result.text;
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as MatchResult;
    parsed.services = (parsed.services ?? []).filter((s) =>
      ["web", "data", "video"].includes(s.key),
    );
    return parsed;
  } catch (e: unknown) {
    console.error("matchBrief failed", e);
    const status = (e as { statusCode?: number })?.statusCode;
    const msg =
      status === 429
        ? "Terlalu banyak permintaan, coba lagi sebentar."
        : status === 402
          ? "Kredit AI habis untuk sementara."
          : "AI sedang tidak tersedia. Silakan hubungi langsung via WhatsApp.";
    return { services: [], summary: "", whatsappMessage: "", error: msg };
  }
}
