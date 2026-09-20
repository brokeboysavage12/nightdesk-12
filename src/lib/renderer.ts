import type { CaptionCue, SceneBeat } from "@/lib/types";

export interface AssembleInput {
  scenes: SceneBeat[];
  captions: CaptionCue[];
  images: (HTMLImageElement | null)[];
  audio: HTMLAudioElement;
  channelName: string;
  title: string;
  width?: number;
  height?: number;
  onProgress?: (ratio: number) => void;
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  scale: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const s = Math.max(w / iw, h / ih) * scale;
  const dw = iw * s;
  const dh = ih * s;
  const dx = (w - dw) / 2;
  const dy = (h - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

function fillAtmosphere(ctx: CanvasRenderingContext2D, w: number, h: number, seed: number) {
  const hues = [210, 24, 150, 30, 260];
  const hue = hues[seed % hues.length];
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, `hsl(${hue} 8% 10%)`);
  g.addColorStop(1, `hsl(${hue} 6% 4%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function drawCaption(ctx: CanvasRenderingContext2D, text: string, w: number, h: number) {
  if (!text) return;
  ctx.save();
  ctx.font = `700 ${Math.round(w * 0.072)}px "IBM Plex Sans", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.round(w * 0.018);
  const lines = wrapLines(ctx, text.toUpperCase(), w * 0.86);
  const lineH = w * 0.086;
  let y = h * 0.82 - (lines.length - 1) * lineH;
  for (const line of lines) {
    ctx.strokeStyle = "rgba(11,12,14,0.88)";
    ctx.strokeText(line, w / 2, y);
    ctx.fillStyle = "#eceae4";
    ctx.fillText(line, w / 2, y);
    y += lineH;
  }
  ctx.restore();
}

function currentScene(scenes: SceneBeat[], t: number) {
  return (
    scenes.find((s) => t >= s.startSec && t < s.endSec) ??
    scenes[scenes.length - 1] ??
    null
  );
}

function currentCaption(captions: CaptionCue[], t: number) {
  return captions.find((c) => t >= c.startSec && t < c.endSec)?.text ?? "";
}

export function paintFrame(
  ctx: CanvasRenderingContext2D,
  opts: {
    t: number;
    duration: number;
    scenes: SceneBeat[];
    captions: CaptionCue[];
    images: (HTMLImageElement | null)[];
    channelName: string;
    width: number;
    height: number;
  },
) {
  const { t, duration, scenes, captions, images, channelName, width: w, height: h } = opts;
  const scene = currentScene(scenes, t);
  const idx = scene ? Math.max(0, scenes.indexOf(scene)) : 0;
  const local = scene ? t - scene.startSec : t;
  const span = scene ? Math.max(0.2, scene.endSec - scene.startSec) : duration;
  const ken = 1 + Math.min(0.12, (local / span) * 0.1);

  ctx.fillStyle = "#0b0c0e";
  ctx.fillRect(0, 0, w, h);

  const img = images[idx];
  if (img && img.naturalWidth) {
    coverDraw(ctx, img, w, h, ken);
  } else {
    fillAtmosphere(ctx, w, h, idx);
    ctx.fillStyle = "rgba(236,234,228,0.08)";
    ctx.font = `400 ${Math.round(w * 0.14)}px "Instrument Serif", serif`;
    ctx.textAlign = "center";
    ctx.fillText(String(idx + 1).padStart(2, "0"), w / 2, h * 0.42);
    if (scene?.onScreenText) {
      ctx.fillStyle = "#eceae4";
      ctx.font = `400 ${Math.round(w * 0.064)}px "Instrument Serif", serif`;
      wrapLines(ctx, scene.onScreenText, w * 0.8).forEach((line, i) => {
        ctx.fillText(line, w / 2, h * 0.52 + i * w * 0.08);
      });
    }
  }

  const veil = ctx.createLinearGradient(0, h * 0.45, 0, h);
  veil.addColorStop(0, "rgba(11,12,14,0)");
  veil.addColorStop(1, "rgba(11,12,14,0.78)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(236,234,228,0.62)";
  ctx.font = `500 ${Math.round(w * 0.028)}px "IBM Plex Sans", sans-serif`;
  ctx.textAlign = "left";
  ctx.fillText(channelName.toUpperCase(), w * 0.07, h * 0.07);

  const caption = currentCaption(captions, t) || scene?.onScreenText || "";
  drawCaption(ctx, caption, w, h);

  ctx.fillStyle = "rgba(236,234,228,0.18)";
  ctx.fillRect(w * 0.07, h * 0.93, w * 0.86, 3);
  ctx.fillStyle = "#eceae4";
  ctx.fillRect(w * 0.07, h * 0.93, w * 0.86 * Math.min(1, t / Math.max(0.1, duration)), 3);
}

export async function assembleCut(input: AssembleInput): Promise<Blob> {
  const width = input.width ?? 1080;
  const height = input.height ?? 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");

  const audio = input.audio;
  await audio.play().catch(() => undefined);
  audio.pause();
  audio.currentTime = 0;

  const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 45;

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const dest = audioCtx.createMediaStreamDestination();
  source.connect(dest);
  source.connect(audioCtx.destination);

  const vStream = canvas.captureStream(30);
  const combined = new MediaStream([
    ...vStream.getVideoTracks(),
    ...dest.stream.getAudioTracks(),
  ]);

  const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
    ? "video/webm;codecs=vp9,opus"
    : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
      ? "video/webm;codecs=vp8,opus"
      : "video/webm";

  const chunks: BlobPart[] = [];
  const rec = new MediaRecorder(combined, { mimeType: mime, videoBitsPerSecond: 6_000_000 });
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };

  const done = new Promise<Blob>((resolve, reject) => {
    rec.onstop = () => {
      void audioCtx.close();
      resolve(new Blob(chunks, { type: "video/webm" }));
    };
    rec.onerror = () => reject(new Error("Recorder failed."));
  });

  rec.start(200);
  await audio.play();

  await new Promise<void>((resolve) => {
    const tick = () => {
      const t = audio.currentTime;
      paintFrame(ctx, {
        t,
        duration,
        scenes: input.scenes,
        captions: input.captions,
        images: input.images,
        channelName: input.channelName,
        width,
        height,
      });
      input.onProgress?.(Math.min(1, t / duration));
      if (audio.ended || t >= duration - 0.05) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  if (rec.state === "recording") rec.stop();
  audio.pause();
  return done;
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Still failed to load."));
    img.src = src;
  });
  return img;
}

export function composeThumbDataUrl(
  img: HTMLImageElement | null,
  text: string,
  channelName: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  if (img && img.naturalWidth) {
    coverDraw(ctx, img, 1280, 720, 1.05);
  } else {
    fillAtmosphere(ctx, 1280, 720, 2);
  }
  const g = ctx.createLinearGradient(0, 120, 900, 720);
  g.addColorStop(0, "rgba(11,12,14,0.15)");
  g.addColorStop(1, "rgba(11,12,14,0.72)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1280, 720);
  ctx.fillStyle = "rgba(236,234,228,0.7)";
  ctx.font = '500 22px "IBM Plex Sans", sans-serif';
  ctx.fillText(channelName.toUpperCase(), 64, 72);
  ctx.fillStyle = "#eceae4";
  ctx.font = '400 92px "Instrument Serif", serif';
  const lines = wrapLines(ctx, text, 1100);
  lines.forEach((line, i) => ctx.fillText(line, 64, 420 + i * 100));
  return canvas.toDataURL("image/jpeg", 0.9);
}
