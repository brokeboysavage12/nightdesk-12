import { i as downloadText } from "./utils-BMtywCVH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/export-BI7fnL5X.js
function selectedTitle(video) {
	return (video.pack?.titles ?? [])[video.selectedTitleIndex]?.title || video.idea.workingTitle;
}
function youtubePack(video, channel) {
	const title = selectedTitle(video);
	const pack = video.pack;
	const tags = pack?.tags?.join(", ") ?? "";
	return [
		`TITLE`,
		title,
		``,
		`DESCRIPTION`,
		pack?.description ?? "",
		(pack?.hashtags ?? []).join(" "),
		``,
		`TAGS`,
		tags,
		``,
		`PINNED COMMENT`,
		pack?.pinnedComment ?? "",
		``,
		`NARRATION`,
		pack?.narration ?? "",
		``,
		`CHANNEL`,
		`${channel.name}  @${channel.handle}`,
		`FORMAT  ${video.format}`,
		`NICHE   ${video.nicheId}`,
		`ALTERED CONTENT  Yes — disclose in YouTube Studio`
	].join("\n");
}
function toSrt(video) {
	const cues = video.pack?.captions ?? [];
	const stamp = (sec) => {
		const ms = Math.max(0, Math.round(sec * 1e3));
		const h = Math.floor(ms / 36e5);
		const m = Math.floor(ms % 36e5 / 6e4);
		const s = Math.floor(ms % 6e4 / 1e3);
		const r = ms % 1e3;
		const pad = (n, w = 2) => n.toString().padStart(w, "0");
		return `${pad(h)}:${pad(m)}:${pad(s)},${pad(r, 3)}`;
	};
	return cues.map((c, i) => `${i + 1}\n${stamp(c.startSec)} --> ${stamp(c.endSec)}\n${c.text}\n`).join("\n");
}
function downloadYoutubePack(video, channel) {
	const slug = video.slug.toLowerCase();
	downloadText(youtubePack(video, channel), `${slug}-youtube.txt`);
	downloadText(toSrt(video), `${slug}.srt`);
	if (video.pack?.narration) downloadText(video.pack.narration, `${slug}-narration.txt`);
}
//#endregion
export { selectedTitle as n, downloadYoutubePack as t };
