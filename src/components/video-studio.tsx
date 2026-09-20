import { Link } from "@tanstack/react-router";
import {
  Check,
  Copy,
  Download,
  ImageIcon,
  LoaderCircle,
  Mic,
  Play,
  Square,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { generateImage, generatePackage, generateVoice } from "@/lib/ai";
import { downloadYoutubePack, selectedTitle } from "@/lib/export";
import { idbGet, idbSet, mediaKey } from "@/lib/idb";
import { getNiche } from "@/lib/niches";
import {
  assembleCut,
  composeThumbDataUrl,
  loadImage,
  paintFrame,
} from "@/lib/renderer";
import { useDesk } from "@/lib/store";
import type { VideoItem, VideoStatus } from "@/lib/types";
import {
  cn,
  copyText,
  downloadBlob,
  formatDuration,
  wordCount,
} from "@/lib/utils";

export function VideoStudio({ id }: { id: string }) {
  const video = useDesk((s) => s.videos.find((v) => v.id === id));
  const channel = useDesk((s) => s.channel);
  if (!video || !channel) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl italic">That slug is gone.</p>
        <Button asChild className="mt-6" variant="secondary">
          <Link to="/">Back to desk</Link>
        </Button>
      </div>
    );
  }
  return <StudioBody video={video} />;
}

function StudioBody({ video }: { video: VideoItem }) {
  const channel = useDesk((s) => s.channel)!;
  const setPackage = useDesk((s) => s.setPackage);
  const updateVideo = useDesk((s) => s.updateVideo);
  const markPosted = useDesk((s) => s.markPosted);
  const niche = getNiche(video.nicheId);

  const [busy, setBusy] = useState<string | null>(null);
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const [sceneUrls, setSceneUrls] = useState<(string | null)[]>([]);
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);
  const [cutUrl, setCutUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [tab, setTab] = useState("script");
  const [painting, setPainting] = useState<Record<number, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRaf = useRef<number>(0);

  const pack = video.pack;
  const title = selectedTitle(video);
  const isShort = video.format === "short";

  useEffect(() => {
    let gone = false;
    async function restore() {
      const voice = await idbGet<string>(mediaKey(video.id, "voice"));
      const thumb = await idbGet<string>(mediaKey(video.id, "thumb"));
      const cut = await idbGet<Blob>(mediaKey(video.id, "cut"));
      const scenes: (string | null)[] = [];
      const count = video.pack?.scenes.length ?? 0;
      for (let i = 0; i < count; i++) {
        scenes[i] = (await idbGet<string>(mediaKey(video.id, `scene-${i}`))) ?? null;
      }
      if (gone) return;
      if (voice) setVoiceUrl(voice);
      if (thumb) setThumbUrl(thumb);
      if (cut instanceof Blob) setCutUrl(URL.createObjectURL(cut));
      if (scenes.length) setSceneUrls(scenes);
    }
    void restore();
    return () => {
      gone = true;
    };
  }, [video.id, video.pack?.scenes.length]);

  useEffect(() => {
    return () => {
      if (previewRaf.current) cancelAnimationFrame(previewRaf.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pack) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let cancelled = false;
    void (async () => {
      const images = await Promise.all(
        pack.scenes.map(async (_, i) => {
          const src = sceneUrls[i];
          if (!src) return null;
          try {
            return await loadImage(src);
          } catch {
            return null;
          }
        }),
      );
      if (cancelled) return;
      paintFrame(ctx, {
        t: 0,
        duration: pack.durationSec || 45,
        scenes: pack.scenes,
        captions: pack.captions,
        images,
        channelName: channel.name,
        width: canvas.width,
        height: canvas.height,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [pack, sceneUrls, channel.name]);

  const bump = (status: VideoStatus) => updateVideo(video.id, { status });

  async function writePack() {
    setBusy("pack");
    try {
      const result = await generatePackage({
        data: {
          nicheId: video.nicheId,
          format: video.format,
          channelName: channel.name,
          idea: video.idea,
        },
      });
      if (!result.ok) return toast.error(result.error);
      setPackage(video.id, result.pack);
      toast.success("Package written.");
    } finally {
      setBusy(null);
    }
  }

  async function voiceOver() {
    if (!pack) return;
    setBusy("voice");
    try {
      const result = await generateVoice({
        data: { text: pack.narration, voiceId: channel.voiceId },
      });
      if (!result.ok) return toast.error(result.error);
      const url = `data:${result.mime};base64,${result.audioB64}`;
      await idbSet(mediaKey(video.id, "voice"), url);
      setVoiceUrl(url);
      bump("voiced");
      toast.success("Voice is on the file.");
    } finally {
      setBusy(null);
    }
  }

  function scenePrompt(index: number) {
    if (!pack) return "";
    const scene = pack.scenes[index];
    return [
      niche.imageBible,
      scene.imagePrompt,
      `On-screen beat: ${scene.onScreenText}.`,
      scene.narrationSlice ? `Narration in this beat: ${scene.narrationSlice}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  async function paintScene(index: number) {
    if (!pack) return false;
    setPainting((p) => ({ ...p, [index]: true }));
    try {
      const img = await generateImage({
        data: {
          prompt: scenePrompt(index),
          aspectRatio: isShort ? "9:16" : "16:9",
          kind: "scene",
        },
      });
      if (!img.ok) {
        toast.error(`Scene ${String(index + 1).padStart(2, "0")}: ${img.error}`);
        return false;
      }
      const url = `data:${img.mime};base64,${img.imageB64}`;
      await idbSet(mediaKey(video.id, `scene-${index}`), url);
      setSceneUrls((prev) => {
        const next = prev.slice();
        while (next.length < pack.scenes.length) next.push(null);
        next[index] = url;
        return next;
      });
      return true;
    } finally {
      setPainting((p) => {
        const next = { ...p };
        delete next[index];
        return next;
      });
    }
  }

  async function paintThumb() {
    if (!pack) return false;
    const thumbPrompt =
      pack.thumbnailPrompt ||
      `${niche.imageBible}. Hero still for: ${pack.thumbnailText}. No text.`;
    const thumb = await generateImage({
      data: { prompt: thumbPrompt, aspectRatio: "16:9", kind: "thumb" },
    });
    if (!thumb.ok) {
      toast.error(`Thumbnail: ${thumb.error}`);
      return false;
    }
    const url = `data:${thumb.mime};base64,${thumb.imageB64}`;
    await idbSet(mediaKey(video.id, "thumb"), url);
    setThumbUrl(url);
    return true;
  }

  async function stills(force = false) {
    if (!pack) return;
    setBusy("stills");
    setTab("scenes");
    setProgress(0);
    try {
      const indices = pack.scenes
        .map((_, i) => i)
        .filter((i) => force || !sceneUrls[i]);
      const jobs = indices.length + (force || !thumbUrl ? 1 : 0);
      if (jobs === 0) {
        toast.success("Stills are already on the file.");
        return;
      }
      let done = 0;
      const tick = () => {
        done += 1;
        setProgress(done / jobs);
      };
      const work: Array<() => Promise<boolean>> = [];
      if (force || !thumbUrl) {
        work.push(async () => {
          const ok = await paintThumb();
          tick();
          return ok;
        });
      }
      for (const i of indices) {
        work.push(async () => {
          const ok = await paintScene(i);
          tick();
          return ok;
        });
      }
      let cursor = 0;
      let painted = 0;
      const worker = async () => {
        while (cursor < work.length) {
          const job = work[cursor++];
          if (await job()) painted += 1;
        }
      };
      await Promise.all([worker(), worker(), worker()]);
      if (painted === 0) {
        toast.error("None of the stills painted. Try again.");
        return;
      }
      bump("visuals");
      toast.success(`${painted} still${painted === 1 ? "" : "s"} on the file.`);
    } finally {
      setBusy(null);
      setProgress(0);
    }
  }

  async function assemble() {
    if (!pack || !voiceUrl) {
      toast.error("Voice the file first.");
      return;
    }
    setBusy("cut");
    setProgress(0);
    try {
      const audio = new Audio(voiceUrl);
      audio.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        audio.onloadedmetadata = () => resolve();
        audio.onerror = () => reject(new Error("Voice would not load."));
      });
      const images = await Promise.all(
        pack.scenes.map(async (_, i) => {
          const src = sceneUrls[i];
          if (!src) return null;
          try {
            return await loadImage(src);
          } catch {
            return null;
          }
        }),
      );
      const blob = await assembleCut({
        scenes: pack.scenes,
        captions: pack.captions,
        images,
        audio,
        channelName: channel.name,
        title,
        width: isShort ? 1080 : 1920,
        height: isShort ? 1920 : 1080,
        onProgress: setProgress,
      });
      const url = URL.createObjectURL(blob);
      await idbSet(mediaKey(video.id, "cut"), blob);
      setCutUrl(url);
      updateVideo(video.id, { status: "ready" });
      toast.success("Cut is ready to upload.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cut failed.");
    } finally {
      setBusy(null);
      setProgress(0);
    }
  }

  function playPreview() {
    if (!pack) return;
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !voiceUrl) {
      toast.error("Voice the file so the preview has a clock.");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!audio) return;
    void (async () => {
      const images = await Promise.all(
        pack.scenes.map(async (_, i) => {
          const src = sceneUrls[i];
          if (!src) return null;
          try {
            return await loadImage(src);
          } catch {
            return null;
          }
        }),
      );
      audio.currentTime = 0;
      await audio.play();
      const duration = audio.duration || pack.durationSec || 45;
      const loop = () => {
        paintFrame(ctx, {
          t: audio.currentTime,
          duration,
          scenes: pack.scenes,
          captions: pack.captions,
          images,
          channelName: channel.name,
          width: canvas.width,
          height: canvas.height,
        });
        if (!audio.paused && !audio.ended) {
          previewRaf.current = requestAnimationFrame(loop);
        }
      };
      previewRaf.current = requestAnimationFrame(loop);
    })();
  }

  function stopPreview() {
    audioRef.current?.pause();
    if (previewRaf.current) cancelAnimationFrame(previewRaf.current);
  }

  const missingStills = Boolean(pack && pack.scenes.some((_, i) => !sceneUrls[i]));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs text-muted">{video.slug}</p>
          <h1 className="mt-2 font-display text-3xl italic sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">
            {niche.name} · {video.format === "short" ? "Short" : "Long"} ·{" "}
            {pack ? `${wordCount(pack.narration)} words · ${formatDuration(pack.durationSec)}` : "No package yet"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!pack ? (
            <Button onClick={writePack} disabled={busy !== null}>
              {busy === "pack" ? <LoaderCircle className="animate-spin" /> : null}
              Write package
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={writePack} disabled={busy !== null}>
                Rewrite
              </Button>
              <Button variant={voiceUrl ? "secondary" : "default"} onClick={voiceOver} disabled={busy !== null}>
                {busy === "voice" ? <LoaderCircle className="animate-spin" /> : <Mic />}
                Voice
              </Button>
              <Button
                variant={missingStills ? "default" : "secondary"}
                onClick={() => stills(!missingStills)}
                disabled={busy !== null}
              >
                {busy === "stills" ? <LoaderCircle className="animate-spin" /> : <ImageIcon />}
                {missingStills ? "Paint stills" : "Repaint stills"}
              </Button>
              <Button onClick={assemble} disabled={busy !== null || !voiceUrl}>
                {busy === "cut" ? <LoaderCircle className="animate-spin" /> : <Play />}
                Assemble cut
              </Button>
            </>
          )}
        </div>
      </div>

      {busy && progress > 0 ? (
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div
            className="h-full bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      ) : null}

      {!pack ? (
        <div className="rounded-xl bg-surface px-6 py-12 shadow-[var(--shadow-border)]">
          <p className="font-display text-2xl italic">The file is slugged, not written.</p>
          <p className="mt-2 max-w-lg text-sm text-muted">
            {video.idea.hook}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="script">Script</TabsTrigger>
              <TabsTrigger value="titles">Titles</TabsTrigger>
              <TabsTrigger value="scenes">Scenes</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
            </TabsList>
            <TabsContent value="script">
              <Textarea
                className="min-h-80 font-display text-lg leading-relaxed"
                value={pack.narration}
                onChange={(e) =>
                  updateVideo(video.id, {
                    pack: { ...pack, narration: e.target.value },
                  })
                }
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyBtn label="Copy narration" text={pack.narration} />
                <CopyBtn label="Copy hook" text={pack.hook} />
              </div>
            </TabsContent>
            <TabsContent value="titles">
              <ul className="space-y-2">
                {pack.titles.map((opt, i) => (
                  <li key={opt.title}>
                    <button
                      type="button"
                      onClick={() => updateVideo(video.id, { selectedTitleIndex: i })}
                      className={cn(
                        "w-full rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
                        i === video.selectedTitleIndex && "shadow-[var(--shadow-border-hover)]",
                      )}
                    >
                      <p className="text-sm">{opt.title}</p>
                      <p className="mt-1 text-xs text-muted">{opt.reason}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="scenes">
              {missingStills ? (
                <div className="mb-4 flex flex-col gap-3 rounded-lg bg-surface px-4 py-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">
                    Those numbered cards are empty slots. Paint stills to generate a real photograph for each beat.
                  </p>
                  <Button onClick={() => stills(false)} disabled={busy !== null} className="shrink-0">
                    {busy === "stills" ? <LoaderCircle className="animate-spin" /> : <ImageIcon />}
                    Paint stills
                  </Button>
                </div>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-2">
                {pack.scenes.map((scene, i) => {
                  const src = sceneUrls[i];
                  const busyCard = Boolean(painting[i]);
                  return (
                    <div
                      key={scene.id}
                      className="overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]"
                    >
                      <div className="relative aspect-poster bg-inset sm:aspect-video">
                        {src ? (
                          <img
                            src={src}
                            alt={scene.onScreenText}
                            className="absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                            <span className="font-display text-4xl text-faint">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs text-muted">Empty slot</span>
                          </div>
                        )}
                        {busyCard ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-bg/50">
                            <LoaderCircle className="size-6 animate-spin text-fg" />
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-start justify-between gap-2 p-3">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted">
                            {formatDuration(scene.startSec)}–{formatDuration(scene.endSec)}
                          </p>
                          <p className="mt-1 text-sm">{scene.onScreenText}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={busy !== null || busyCard}
                          onClick={() => void paintScene(i)}
                        >
                          {busyCard ? <LoaderCircle className="animate-spin" /> : <ImageIcon />}
                          {src ? "Redo" : "Paint"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="youtube">
              <YoutubeFields video={video} />
            </TabsContent>
          </Tabs>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-xl bg-inset shadow-[var(--shadow-border)]">
              <canvas
                ref={canvasRef}
                width={isShort ? 360 : 640}
                height={isShort ? 640 : 360}
                className="mx-auto block w-full bg-bg"
              />
            </div>
            {voiceUrl ? <audio ref={audioRef} src={voiceUrl} className="hidden" /> : null}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={playPreview} disabled={!voiceUrl}>
                <Play />
                Preview
              </Button>
              <Button size="sm" variant="ghost" onClick={stopPreview}>
                <Square />
                Stop
              </Button>
            </div>
            {thumbUrl ? (
              <img
                src={thumbUrl}
                alt="Thumbnail"
                className="w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-white/10"
              />
            ) : null}
            <div className="flex flex-col gap-2">
              {cutUrl ? (
                <Button
                  onClick={async () => {
                    const res = await fetch(cutUrl);
                    downloadBlob(await res.blob(), `${video.slug.toLowerCase()}.webm`);
                  }}
                >
                  <Download />
                  Download cut
                </Button>
              ) : null}
              {voiceUrl ? (
                <Button
                  variant="secondary"
                  onClick={async () => {
                    const res = await fetch(voiceUrl);
                    downloadBlob(await res.blob(), `${video.slug.toLowerCase()}-voice.mp3`);
                  }}
                >
                  Download voice
                </Button>
              ) : null}
              <Button
                variant="outline"
                onClick={() => downloadYoutubePack(video, channel)}
              >
                Download YouTube pack
              </Button>
              {thumbUrl ? (
                <Button
                  variant="outline"
                  onClick={async () => {
                    const img = await loadImage(thumbUrl);
                    const data = composeThumbDataUrl(img, pack.thumbnailText, channel.name);
                    const blob = await (await fetch(data)).blob();
                    downloadBlob(blob, `${video.slug.toLowerCase()}-thumb.jpg`);
                  }}
                >
                  Download thumbnail
                </Button>
              ) : null}
              <Button
                variant="ghost"
                onClick={() => {
                  markPosted(video.id);
                  toast.success("Marked posted.");
                }}
              >
                <Check />
                Mark posted
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function CopyBtn({ label, text }: { label: string; text: string }) {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={async () => {
        await copyText(text);
        toast.success("Copied.");
      }}
    >
      <Copy />
      {label}
    </Button>
  );
}

function YoutubeFields({ video }: { video: VideoItem }) {
  const pack = video.pack!;
  const title = selectedTitle(video);
  return (
    <div className="space-y-5">
      <Field label="Title" value={title} />
      <Field label="Description" value={pack.description} multiline />
      <Field label="Tags" value={pack.tags.join(", ")} />
      <Field label="Hashtags" value={pack.hashtags.join(" ")} />
      <Field label="Pinned comment" value={pack.pinnedComment} />
      <p className="text-sm text-muted">
        In YouTube Studio, set Altered / synthetic content to Yes before you publish.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <button
          type="button"
          className="text-xs text-muted hover:text-fg"
          onClick={async () => {
            await copyText(value);
            toast.success("Copied.");
          }}
        >
          Copy
        </button>
      </div>
      <p className={cn("mt-2 text-sm", multiline && "whitespace-pre-wrap")}>{value}</p>
    </div>
  );
}
