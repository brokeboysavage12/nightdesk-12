import { createServerFn } from "@tanstack/react-start";
import { getNiche } from "@/lib/niches";
import type { FormatKind, Idea, VideoPackage } from "@/lib/types";
import { parseJsonObject, uid } from "@/lib/utils";

type ChatOk = { ok: true; text: string };
type ChatErr = { ok: false; error: string };
type ChatResult = ChatOk | ChatErr;

async function chat(messages: { role: "system" | "user"; content: string }[], maxTokens: number): Promise<ChatResult> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment." };

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      messages,
      max_tokens: maxTokens,
      temperature: 0.8,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    return { ok: false, error: `Desk line failed (${res.status}). Try again.` };
  }
  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
}

const RULES = `You write original YouTube narration for a faceless channel. Never copy another creator's script. Never impersonate a living private person. Never invent quotes from living public figures. Historical public-domain events are fine. Do not include copyrighted lyrics. Do not give personalized financial, medical, or legal advice. Do not write "hey guys", "in this video", "don't forget to like", or a channel intro. Open on the story. Short sentences. Concrete times, numbers, names, places. The first sentence is the hook and must work with zero context. End by pointing to the next part of the series. Return JSON only.`;

export const generateIdeas = createServerFn({ method: "POST" })
  .validator((input: { nicheId: string; format: FormatKind; avoid: string[]; count?: number }) => input)
  .handler(async ({ data }): Promise<{ ok: true; ideas: Idea[] } | ChatErr> => {
    const niche = getNiche(data.nicheId);
    const count = Math.min(7, Math.max(3, data.count ?? 5));
    const result = await chat(
      [
        { role: "system", content: RULES },
        {
          role: "user",
          content: `Generate ${count} original video ideas for the faceless YouTube niche "${niche.name}".
Niche brief: ${niche.blurb}
Hook style: ${niche.hookStyle}
Series pattern: ${niche.seriesHint}
Format: ${data.format === "short" ? "YouTube Short, 40-55 seconds spoken" : "long video, 7-10 minutes spoken"}
Avoid repeating these titles: ${data.avoid.slice(0, 24).join(" | ") || "none"}
Each idea must be a distinct story, not a rewording.
JSON shape:
{"ideas":[{"workingTitle":"...","hook":"first spoken sentence","angle":"why this one clicks","searchIntent":"what they type into YouTube","series":"series label like Part 4 of Last 24 Hours"}]}`,
        },
      ],
      1800,
    );
    if (!result.ok) return result;
    try {
      const parsed = parseJsonObject<{ ideas: Idea[] }>(result.text);
      const ideas = (parsed.ideas ?? []).slice(0, count).map((idea) => ({
        workingTitle: String(idea.workingTitle ?? "").slice(0, 90),
        hook: String(idea.hook ?? "").slice(0, 180),
        angle: String(idea.angle ?? "").slice(0, 220),
        searchIntent: String(idea.searchIntent ?? "").slice(0, 80),
        series: String(idea.series ?? "").slice(0, 80),
      }));
      if (!ideas.length) return { ok: false, error: "No ideas came back. Run it again." };
      return { ok: true, ideas };
    } catch {
      return { ok: false, error: "Could not parse the rundown. Run it again." };
    }
  });

export const generatePackage = createServerFn({ method: "POST" })
  .validator(
    (input: {
      nicheId: string;
      format: FormatKind;
      channelName: string;
      idea: Idea;
    }) => input,
  )
  .handler(async ({ data }): Promise<{ ok: true; pack: VideoPackage } | ChatErr> => {
    const niche = getNiche(data.nicheId);
    const isShort = data.format === "short";
    const result = await chat(
      [
        { role: "system", content: RULES },
        {
          role: "user",
          content: `Write a full production package for this faceless YouTube ${isShort ? "Short" : "long-form"} video.

Channel: ${data.channelName}
Niche: ${niche.name} — ${niche.blurb}
Visual bible for image prompts: ${niche.imageBible}
Idea title: ${data.idea.workingTitle}
Hook seed: ${data.idea.hook}
Angle: ${data.idea.angle}
Series: ${data.idea.series}

${
  isShort
    ? "Spoken narration: 125-165 words. About 45-55 seconds at 148 wpm. 5 or 6 scenes."
    : "Spoken narration: 850-1050 words. About 7-8 minutes. 8 scenes."
}

Captions: 2-5 words each, all caps, covering the whole narration with startSec/endSec.
Scenes: each has onScreenText (2-4 words), a detailed imagePrompt (must include the visual bible constraints, photoreal, no text in the image), startSec, endSec, narrationSlice.
Titles: 5 options. YouTube title case. Curiosity + specificity. No all-caps. No emoji. Under 70 characters.
Description: first 2 lines must work as the search snippet. Include a short original synopsis. Do not paste the full script. Add 3-5 hashtags at the end.
Tags: 12-18 comma-level topical tags, no spam repeats.
Pinned comment: one line that asks a question and teases the next part.
Thumbnail text: 2-4 words, punchy.
CTA: last spoken line, pointing to the next part — not "like and subscribe".

JSON:
{"titles":[{"title":"","reason":""}],"hook":"","narration":"","captions":[{"text":"","startSec":0,"endSec":0}],"scenes":[{"onScreenText":"","imagePrompt":"","startSec":0,"endSec":0,"narrationSlice":""}],"description":"","tags":[""],"hashtags":[""],"pinnedComment":"","thumbnailText":"","thumbnailPrompt":"","cta":"","durationSec":48}`,
        },
      ],
      isShort ? 3200 : 5000,
    );
    if (!result.ok) return result;
    try {
      const parsed = parseJsonObject<VideoPackage>(result.text);
      const scenes = (parsed.scenes ?? []).slice(0, isShort ? 6 : 8).map((s, i) => ({
        id: uid("sc"),
        onScreenText: String(s.onScreenText ?? "").slice(0, 32),
        imagePrompt: String(s.imagePrompt ?? ""),
        startSec: Number(s.startSec) || i * 8,
        endSec: Number(s.endSec) || i * 8 + 8,
        narrationSlice: String(s.narrationSlice ?? ""),
      }));
      const pack: VideoPackage = {
        titles: (parsed.titles ?? []).slice(0, 5).map((t) => ({
          title: String(t.title ?? "").slice(0, 100),
          reason: String(t.reason ?? "").slice(0, 160),
        })),
        hook: String(parsed.hook ?? data.idea.hook),
        narration: String(parsed.narration ?? "").trim(),
        captions: (parsed.captions ?? []).map((c) => ({
          text: String(c.text ?? "").slice(0, 48),
          startSec: Number(c.startSec) || 0,
          endSec: Number(c.endSec) || 0,
        })),
        scenes,
        description: String(parsed.description ?? ""),
        tags: (parsed.tags ?? []).slice(0, 20).map(String),
        hashtags: (parsed.hashtags ?? []).slice(0, 6).map(String),
        pinnedComment: String(parsed.pinnedComment ?? ""),
        thumbnailText: String(parsed.thumbnailText ?? "").slice(0, 28),
        thumbnailPrompt: String(parsed.thumbnailPrompt ?? ""),
        cta: String(parsed.cta ?? ""),
        durationSec: Number(parsed.durationSec) || Math.round(String(parsed.narration ?? "").split(/\s+/).length / 2.4),
      };
      if (!pack.narration || pack.titles.length < 3 || pack.scenes.length < 3) {
        return { ok: false, error: "Package came back incomplete. Run it again." };
      }
      return { ok: true, pack };
    } catch {
      return { ok: false, error: "Could not parse the package. Run it again." };
    }
  });

export const generateVoice = createServerFn({ method: "POST" })
  .validator((input: { text: string; voiceId: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; audioB64: string; mime: string } | ChatErr> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available in this environment." };
    const text = data.text.slice(0, 4500);
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text,
        voice_id: data.voiceId || "atlas",
        language: "en",
      }),
    });
    if (!res.ok) return { ok: false, error: `Voice line failed (${res.status}).` };
    const buf = Buffer.from(await res.arrayBuffer());
    return { ok: true, audioB64: buf.toString("base64"), mime: res.headers.get("content-type") || "audio/mpeg" };
  });

export const generateImage = createServerFn({ method: "POST" })
  .validator(
    (input: { prompt: string; aspectRatio: "9:16" | "16:9"; kind?: "scene" | "thumb" }) =>
      input,
  )
  .handler(async ({ data }): Promise<{ ok: true; imageB64: string; mime: string } | ChatErr> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available in this environment." };

    const orientation =
      data.aspectRatio === "9:16"
        ? "vertical 9:16 photograph, tall full-frame composition"
        : "widescreen 16:9 cinematic photograph";
    const role =
      data.kind === "thumb"
        ? "Hero thumbnail still. One strong subject, readable at small size."
        : "Single documentary scene still. One beat, one place, atmosphere over clutter.";
    const prompt = [
      "Photoreal cinematic documentary still photograph.",
      orientation,
      role,
      "35mm film grain, motivated lighting, shallow depth of field, no CGI look.",
      "Absolutely no text, letters, typography, captions, logos, watermarks, or UI.",
      "No celebrity likeness and no recognizable living person.",
      data.prompt,
    ]
      .join(" ")
      .slice(0, 1800);

    const run = async () => {
      const res = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-imagine-image-2.0",
          prompt,
          n: 1,
          aspect_ratio: data.aspectRatio,
          resolution: "1k",
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        return {
          ok: false as const,
          error: `Image line failed (${res.status})${detail ? `: ${detail.slice(0, 160)}` : "."}`,
        };
      }
      const body = (await res.json()) as {
        data?: { url?: string; b64_json?: string; mime_type?: string }[];
      };
      const first = body.data?.[0];
      if (first?.b64_json) {
        return { ok: true as const, imageB64: first.b64_json, mime: first.mime_type || "image/png" };
      }
      if (!first?.url) return { ok: false as const, error: "No image returned." };
      const img = await fetch(first.url);
      if (!img.ok) return { ok: false as const, error: "Could not pull the still." };
      const buf = Buffer.from(await img.arrayBuffer());
      const mime = img.headers.get("content-type") || first.mime_type || "image/jpeg";
      return { ok: true as const, imageB64: buf.toString("base64"), mime };
    };

    const firstTry = await run();
    if (firstTry.ok) return firstTry;
    return run();
  });
