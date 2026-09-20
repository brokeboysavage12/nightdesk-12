import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BMtywCVH.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function formatClock(date) {
	return date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatDay(date) {
	return date.toLocaleDateString([], {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function slugify(value) {
	return value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 18);
}
function wordCount(text) {
	return text.trim() ? text.trim().split(/\s+/).length : 0;
}
function formatDuration(totalSec) {
	const s = Math.max(0, Math.round(totalSec));
	return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}
async function copyText(text) {
	await navigator.clipboard.writeText(text);
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadText(text, filename, type = "text/plain") {
	downloadBlob(new Blob([text], { type }), filename);
}
function parseJsonObject(raw) {
	const trimmed = raw.trim();
	const body = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim() ?? trimmed;
	const start = body.indexOf("{");
	const end = body.lastIndexOf("}");
	if (start === -1 || end === -1) throw new Error("The desk could not read the model output.");
	return JSON.parse(body.slice(start, end + 1));
}
//#endregion
export { formatClock as a, parseJsonObject as c, wordCount as d, downloadText as i, slugify as l, copyText as n, formatDay as o, downloadBlob as r, formatDuration as s, cn as t, uid as u };
