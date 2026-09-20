import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as getNiche } from "./niches-DqFCaehY.mjs";
import { d as wordCount, n as copyText, r as downloadBlob, s as formatDuration, t as cn } from "./utils-BMtywCVH.mjs";
import { a as Mic, d as Copy, i as Play, l as Image$1, n as Square, o as LoaderCircle, p as Check, u as Download } from "../_libs/lucide-react.mjs";
import { n as useDesk, t as AppShell } from "./app-shell-CmHc2DTh.mjs";
import { n as selectedTitle, t as downloadYoutubePack } from "./export-BI7fnL5X.mjs";
import { t as Button } from "./button-Bv_FGTsr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-BP_B_4MT.mjs";
import { i as generateVoice, n as generateImage, r as generatePackage } from "./ai-XHZfW8YA.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video._id-CbseZIIk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-inset p-1 shadow-[var(--shadow-border)]", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted", "transition-[background-color,color] duration-150 ease-out", "data-[state=active]:bg-raised data-[state=active]:text-fg", "focus-visible:outline-none", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-md bg-inset px-3 py-3 text-sm text-fg shadow-[var(--shadow-border)]", "placeholder:text-faint", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:shadow-[var(--shadow-border-hover)]", "disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var DB_NAME = "nightdesk";
var DB_VERSION = 1;
var STORE = "media";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbSet(key, value) {
	const db = await openDb();
	await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).put(value, key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	db.close();
}
async function idbGet(key) {
	const db = await openDb();
	const value = await new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
	db.close();
	return value;
}
function mediaKey(videoId, kind) {
	return `${videoId}:${kind}`;
}
function coverDraw(ctx, img, w, h, scale) {
	const iw = img.naturalWidth;
	const ih = img.naturalHeight;
	const s = Math.max(w / iw, h / ih) * scale;
	const dw = iw * s;
	const dh = ih * s;
	const dx = (w - dw) / 2;
	const dy = (h - dh) / 2;
	ctx.drawImage(img, dx, dy, dw, dh);
}
function fillAtmosphere(ctx, w, h, seed) {
	const hues = [
		210,
		24,
		150,
		30,
		260
	];
	const hue = hues[seed % hues.length];
	const g = ctx.createLinearGradient(0, 0, w, h);
	g.addColorStop(0, `hsl(${hue} 8% 10%)`);
	g.addColorStop(1, `hsl(${hue} 6% 4%)`);
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
}
function wrapLines(ctx, text, maxWidth) {
	const words = text.split(/\s+/);
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (ctx.measureText(next).width > maxWidth && line) {
			lines.push(line);
			line = word;
		} else line = next;
	}
	if (line) lines.push(line);
	return lines.slice(0, 3);
}
function drawCaption(ctx, text, w, h) {
	if (!text) return;
	ctx.save();
	ctx.font = `700 ${Math.round(w * .072)}px "IBM Plex Sans", sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.lineJoin = "round";
	ctx.lineWidth = Math.round(w * .018);
	const lines = wrapLines(ctx, text.toUpperCase(), w * .86);
	const lineH = w * .086;
	let y = h * .82 - (lines.length - 1) * lineH;
	for (const line of lines) {
		ctx.strokeStyle = "rgba(11,12,14,0.88)";
		ctx.strokeText(line, w / 2, y);
		ctx.fillStyle = "#eceae4";
		ctx.fillText(line, w / 2, y);
		y += lineH;
	}
	ctx.restore();
}
function currentScene(scenes, t) {
	return scenes.find((s) => t >= s.startSec && t < s.endSec) ?? scenes[scenes.length - 1] ?? null;
}
function currentCaption(captions, t) {
	return captions.find((c) => t >= c.startSec && t < c.endSec)?.text ?? "";
}
function paintFrame(ctx, opts) {
	const { t, duration, scenes, captions, images, channelName, width: w, height: h } = opts;
	const scene = currentScene(scenes, t);
	const idx = scene ? Math.max(0, scenes.indexOf(scene)) : 0;
	const local = scene ? t - scene.startSec : t;
	const span = scene ? Math.max(.2, scene.endSec - scene.startSec) : duration;
	const ken = 1 + Math.min(.12, local / span * .1);
	ctx.fillStyle = "#0b0c0e";
	ctx.fillRect(0, 0, w, h);
	const img = images[idx];
	if (img && img.naturalWidth) coverDraw(ctx, img, w, h, ken);
	else {
		fillAtmosphere(ctx, w, h, idx);
		ctx.fillStyle = "rgba(236,234,228,0.08)";
		ctx.font = `400 ${Math.round(w * .14)}px "Instrument Serif", serif`;
		ctx.textAlign = "center";
		ctx.fillText(String(idx + 1).padStart(2, "0"), w / 2, h * .42);
		if (scene?.onScreenText) {
			ctx.fillStyle = "#eceae4";
			ctx.font = `400 ${Math.round(w * .064)}px "Instrument Serif", serif`;
			wrapLines(ctx, scene.onScreenText, w * .8).forEach((line, i) => {
				ctx.fillText(line, w / 2, h * .52 + i * w * .08);
			});
		}
	}
	const veil = ctx.createLinearGradient(0, h * .45, 0, h);
	veil.addColorStop(0, "rgba(11,12,14,0)");
	veil.addColorStop(1, "rgba(11,12,14,0.78)");
	ctx.fillStyle = veil;
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "rgba(236,234,228,0.62)";
	ctx.font = `500 ${Math.round(w * .028)}px "IBM Plex Sans", sans-serif`;
	ctx.textAlign = "left";
	ctx.fillText(channelName.toUpperCase(), w * .07, h * .07);
	drawCaption(ctx, currentCaption(captions, t) || scene?.onScreenText || "", w, h);
	ctx.fillStyle = "rgba(236,234,228,0.18)";
	ctx.fillRect(w * .07, h * .93, w * .86, 3);
	ctx.fillStyle = "#eceae4";
	ctx.fillRect(w * .07, h * .93, w * .86 * Math.min(1, t / Math.max(.1, duration)), 3);
}
async function assembleCut(input) {
	const width = input.width ?? 1080;
	const height = input.height ?? 1920;
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable.");
	const audio = input.audio;
	await audio.play().catch(() => void 0);
	audio.pause();
	audio.currentTime = 0;
	const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 45;
	const audioCtx = new AudioContext();
	const source = audioCtx.createMediaElementSource(audio);
	const dest = audioCtx.createMediaStreamDestination();
	source.connect(dest);
	source.connect(audioCtx.destination);
	const vStream = canvas.captureStream(30);
	const combined = new MediaStream([...vStream.getVideoTracks(), ...dest.stream.getAudioTracks()]);
	const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") ? "video/webm;codecs=vp9,opus" : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus") ? "video/webm;codecs=vp8,opus" : "video/webm";
	const chunks = [];
	const rec = new MediaRecorder(combined, {
		mimeType: mime,
		videoBitsPerSecond: 6e6
	});
	rec.ondataavailable = (e) => {
		if (e.data.size) chunks.push(e.data);
	};
	const done = new Promise((resolve, reject) => {
		rec.onstop = () => {
			audioCtx.close();
			resolve(new Blob(chunks, { type: "video/webm" }));
		};
		rec.onerror = () => reject(/* @__PURE__ */ new Error("Recorder failed."));
	});
	rec.start(200);
	await audio.play();
	await new Promise((resolve) => {
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
				height
			});
			input.onProgress?.(Math.min(1, t / duration));
			if (audio.ended || t >= duration - .05) {
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
async function loadImage(src) {
	const img = new Image();
	img.crossOrigin = "anonymous";
	await new Promise((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = () => reject(/* @__PURE__ */ new Error("Still failed to load."));
		img.src = src;
	});
	return img;
}
function composeThumbDataUrl(img, text, channelName) {
	const canvas = document.createElement("canvas");
	canvas.width = 1280;
	canvas.height = 720;
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	if (img && img.naturalWidth) coverDraw(ctx, img, 1280, 720, 1.05);
	else fillAtmosphere(ctx, 1280, 720, 2);
	const g = ctx.createLinearGradient(0, 120, 900, 720);
	g.addColorStop(0, "rgba(11,12,14,0.15)");
	g.addColorStop(1, "rgba(11,12,14,0.72)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 1280, 720);
	ctx.fillStyle = "rgba(236,234,228,0.7)";
	ctx.font = "500 22px \"IBM Plex Sans\", sans-serif";
	ctx.fillText(channelName.toUpperCase(), 64, 72);
	ctx.fillStyle = "#eceae4";
	ctx.font = "400 92px \"Instrument Serif\", serif";
	wrapLines(ctx, text, 1100).forEach((line, i) => ctx.fillText(line, 64, 420 + i * 100));
	return canvas.toDataURL("image/jpeg", .9);
}
function VideoStudio({ id }) {
	const video = useDesk((s) => s.videos.find((v) => v.id === id));
	const channel = useDesk((s) => s.channel);
	if (!video || !channel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl italic",
			children: "That slug is gone."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Back to desk"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioBody, { video });
}
function StudioBody({ video }) {
	const channel = useDesk((s) => s.channel);
	const setPackage = useDesk((s) => s.setPackage);
	const updateVideo = useDesk((s) => s.updateVideo);
	const markPosted = useDesk((s) => s.markPosted);
	const niche = getNiche(video.nicheId);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [voiceUrl, setVoiceUrl] = (0, import_react.useState)(null);
	const [sceneUrls, setSceneUrls] = (0, import_react.useState)([]);
	const [thumbUrl, setThumbUrl] = (0, import_react.useState)(null);
	const [cutUrl, setCutUrl] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [tab, setTab] = (0, import_react.useState)("script");
	const [painting, setPainting] = (0, import_react.useState)({});
	const audioRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const previewRaf = (0, import_react.useRef)(0);
	const pack = video.pack;
	const title = selectedTitle(video);
	const isShort = video.format === "short";
	(0, import_react.useEffect)(() => {
		let gone = false;
		async function restore() {
			const voice = await idbGet(mediaKey(video.id, "voice"));
			const thumb = await idbGet(mediaKey(video.id, "thumb"));
			const cut = await idbGet(mediaKey(video.id, "cut"));
			const scenes = [];
			const count = video.pack?.scenes.length ?? 0;
			for (let i = 0; i < count; i++) scenes[i] = await idbGet(mediaKey(video.id, `scene-${i}`)) ?? null;
			if (gone) return;
			if (voice) setVoiceUrl(voice);
			if (thumb) setThumbUrl(thumb);
			if (cut instanceof Blob) setCutUrl(URL.createObjectURL(cut));
			if (scenes.length) setSceneUrls(scenes);
		}
		restore();
		return () => {
			gone = true;
		};
	}, [video.id, video.pack?.scenes.length]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (previewRaf.current) cancelAnimationFrame(previewRaf.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || !pack) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let cancelled = false;
		(async () => {
			const images = await Promise.all(pack.scenes.map(async (_, i) => {
				const src = sceneUrls[i];
				if (!src) return null;
				try {
					return await loadImage(src);
				} catch {
					return null;
				}
			}));
			if (cancelled) return;
			paintFrame(ctx, {
				t: 0,
				duration: pack.durationSec || 45,
				scenes: pack.scenes,
				captions: pack.captions,
				images,
				channelName: channel.name,
				width: canvas.width,
				height: canvas.height
			});
		})();
		return () => {
			cancelled = true;
		};
	}, [
		pack,
		sceneUrls,
		channel.name
	]);
	const bump = (status) => updateVideo(video.id, { status });
	async function writePack() {
		setBusy("pack");
		try {
			const result = await generatePackage({ data: {
				nicheId: video.nicheId,
				format: video.format,
				channelName: channel.name,
				idea: video.idea
			} });
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
			const result = await generateVoice({ data: {
				text: pack.narration,
				voiceId: channel.voiceId
			} });
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
	function scenePrompt(index) {
		if (!pack) return "";
		const scene = pack.scenes[index];
		return [
			niche.imageBible,
			scene.imagePrompt,
			`On-screen beat: ${scene.onScreenText}.`,
			scene.narrationSlice ? `Narration in this beat: ${scene.narrationSlice}` : ""
		].filter(Boolean).join(" ");
	}
	async function paintScene(index) {
		if (!pack) return false;
		setPainting((p) => ({
			...p,
			[index]: true
		}));
		try {
			const img = await generateImage({ data: {
				prompt: scenePrompt(index),
				aspectRatio: isShort ? "9:16" : "16:9",
				kind: "scene"
			} });
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
		const thumbPrompt = pack.thumbnailPrompt || `${niche.imageBible}. Hero still for: ${pack.thumbnailText}. No text.`;
		const thumb = await generateImage({ data: {
			prompt: thumbPrompt,
			aspectRatio: "16:9",
			kind: "thumb"
		} });
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
			const indices = pack.scenes.map((_, i) => i).filter((i) => force || !sceneUrls[i]);
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
			const work = [];
			if (force || !thumbUrl) work.push(async () => {
				const ok = await paintThumb();
				tick();
				return ok;
			});
			for (const i of indices) work.push(async () => {
				const ok = await paintScene(i);
				tick();
				return ok;
			});
			let cursor = 0;
			let painted = 0;
			const worker = async () => {
				while (cursor < work.length) {
					const job = work[cursor++];
					if (await job()) painted += 1;
				}
			};
			await Promise.all([
				worker(),
				worker(),
				worker()
			]);
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
			await new Promise((resolve, reject) => {
				audio.onloadedmetadata = () => resolve();
				audio.onerror = () => reject(/* @__PURE__ */ new Error("Voice would not load."));
			});
			const images = await Promise.all(pack.scenes.map(async (_, i) => {
				const src = sceneUrls[i];
				if (!src) return null;
				try {
					return await loadImage(src);
				} catch {
					return null;
				}
			}));
			const blob = await assembleCut({
				scenes: pack.scenes,
				captions: pack.captions,
				images,
				audio,
				channelName: channel.name,
				title,
				width: isShort ? 1080 : 1920,
				height: isShort ? 1920 : 1080,
				onProgress: setProgress
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
		(async () => {
			const images = await Promise.all(pack.scenes.map(async (_, i) => {
				const src = sceneUrls[i];
				if (!src) return null;
				try {
					return await loadImage(src);
				} catch {
					return null;
				}
			}));
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
					height: canvas.height
				});
				if (!audio.paused && !audio.ended) previewRaf.current = requestAnimationFrame(loop);
			};
			previewRaf.current = requestAnimationFrame(loop);
		})();
	}
	function stopPreview() {
		audioRef.current?.pause();
		if (previewRaf.current) cancelAnimationFrame(previewRaf.current);
	}
	const missingStills = Boolean(pack && pack.scenes.some((_, i) => !sceneUrls[i]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: video.slug
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl italic sm:text-4xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							niche.name,
							" · ",
							video.format === "short" ? "Short" : "Long",
							" ·",
							" ",
							pack ? `${wordCount(pack.narration)} words · ${formatDuration(pack.durationSec)}` : "No package yet"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: !pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: writePack,
						disabled: busy !== null,
						children: [busy === "pack" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : null, "Write package"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: writePack,
							disabled: busy !== null,
							children: "Rewrite"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: voiceUrl ? "secondary" : "default",
							onClick: voiceOver,
							disabled: busy !== null,
							children: [busy === "voice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {}), "Voice"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: missingStills ? "default" : "secondary",
							onClick: () => stills(!missingStills),
							disabled: busy !== null,
							children: [busy === "stills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {}), missingStills ? "Paint stills" : "Repaint stills"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: assemble,
							disabled: busy !== null || !voiceUrl,
							children: [busy === "cut" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Assemble cut"]
						})
					] })
				})]
			}),
			busy && progress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-200 ease-out",
					style: { width: `${Math.round(progress * 100)}%` }
				})
			}) : null,
			!pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-6 py-12 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl italic",
					children: "The file is slugged, not written."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm text-muted",
					children: video.idea.hook
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: setTab,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full justify-start overflow-x-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "script",
									children: "Script"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "titles",
									children: "Titles"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "scenes",
									children: "Scenes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "youtube",
									children: "YouTube"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "script",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "min-h-80 font-display text-lg leading-relaxed",
								value: pack.narration,
								onChange: (e) => updateVideo(video.id, { pack: {
									...pack,
									narration: e.target.value
								} })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBtn, {
									label: "Copy narration",
									text: pack.narration
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBtn, {
									label: "Copy hook",
									text: pack.hook
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "titles",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: pack.titles.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => updateVideo(video.id, { selectedTitleIndex: i }),
									className: cn("w-full rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]", i === video.selectedTitleIndex && "shadow-[var(--shadow-border-hover)]"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: opt.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: opt.reason
									})]
								}) }, opt.title))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "scenes",
							children: [missingStills ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex flex-col gap-3 rounded-lg bg-surface px-4 py-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Those numbered cards are empty slots. Paint stills to generate a real photograph for each beat."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => stills(false),
									disabled: busy !== null,
									className: "shrink-0",
									children: [busy === "stills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {}), "Paint stills"]
								})]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: pack.scenes.map((scene, i) => {
									const src = sceneUrls[i];
									const busyCard = Boolean(painting[i]);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-poster bg-inset sm:aspect-video",
											children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src,
												alt: scene.onScreenText,
												className: "absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-4xl text-faint",
													children: String(i + 1).padStart(2, "0")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted",
													children: "Empty slot"
												})]
											}), busyCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 flex items-center justify-center bg-bg/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-fg" })
											}) : null]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs uppercase tracking-wider text-muted",
												children: [
													formatDuration(scene.startSec),
													"–",
													formatDuration(scene.endSec)
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm",
												children: scene.onScreenText
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "ghost",
												disabled: busy !== null || busyCard,
												onClick: () => void paintScene(i),
												children: [busyCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {}), src ? "Redo" : "Paint"]
											})]
										})]
									}, scene.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "youtube",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeFields, { video })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-xl bg-inset shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: canvasRef,
								width: isShort ? 360 : 640,
								height: isShort ? 640 : 360,
								className: "mx-auto block w-full bg-bg"
							})
						}),
						voiceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
							ref: audioRef,
							src: voiceUrl,
							className: "hidden"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: playPreview,
								disabled: !voiceUrl,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Preview"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: stopPreview,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}), "Stop"]
							})]
						}),
						thumbUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: thumbUrl,
							alt: "Thumbnail",
							className: "w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-white/10"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								cutUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: async () => {
										const res = await fetch(cutUrl);
										downloadBlob(await res.blob(), `${video.slug.toLowerCase()}.webm`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download cut"]
								}) : null,
								voiceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: async () => {
										const res = await fetch(voiceUrl);
										downloadBlob(await res.blob(), `${video.slug.toLowerCase()}-voice.mp3`);
									},
									children: "Download voice"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => downloadYoutubePack(video, channel),
									children: "Download YouTube pack"
								}),
								thumbUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: async () => {
										const data = composeThumbDataUrl(await loadImage(thumbUrl), pack.thumbnailText, channel.name);
										const blob = await (await fetch(data)).blob();
										downloadBlob(blob, `${video.slug.toLowerCase()}-thumb.jpg`);
									},
									children: "Download thumbnail"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => {
										markPosted(video.id);
										toast.success("Marked posted.");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), "Mark posted"]
								})
							]
						})
					]
				})]
			})
		]
	});
}
function CopyBtn({ label, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: async () => {
			await copyText(text);
			toast.success("Copied.");
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), label]
	});
}
function YoutubeFields({ video }) {
	const pack = video.pack;
	const title = selectedTitle(video);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: pack.description,
				multiline: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tags",
				value: pack.tags.join(", ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hashtags",
				value: pack.hashtags.join(" ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pinned comment",
				value: pack.pinnedComment
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "In YouTube Studio, set Altered / synthetic content to Yes before you publish."
			})
		]
	});
}
function Field({ label, value, multiline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-xs text-muted hover:text-fg",
				onClick: async () => {
					await copyText(value);
					toast.success("Copied.");
				},
				children: "Copy"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-2 text-sm", multiline && "whitespace-pre-wrap"),
			children: value
		})]
	});
}
function VideoPage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoStudio, { id }) });
}
//#endregion
export { VideoPage as component };
