import type { Channel, VideoItem } from "@/lib/types";
import { downloadText } from "@/lib/utils";

export function selectedTitle(video: VideoItem) {
  const titles = video.pack?.titles ?? [];
  return titles[video.selectedTitleIndex]?.title || video.idea.workingTitle;
}

export function youtubePack(video: VideoItem, channel: Channel) {
  const title = selectedTitle(video);
  const pack = video.pack;
  const tags = pack?.tags?.join(", ") ?? "";
  const desc = pack?.description ?? "";
  const hashtags = (pack?.hashtags ?? []).join(" ");
  return [
    `TITLE`,
    title,
    ``,
    `DESCRIPTION`,
    desc,
    hashtags,
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
    `ALTERED CONTENT  Yes — disclose in YouTube Studio`,
  ].join("\n");
}

export function toSrt(video: VideoItem) {
  const cues = video.pack?.captions ?? [];
  const stamp = (sec: number) => {
    const ms = Math.max(0, Math.round(sec * 1000));
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const r = ms % 1000;
    const pad = (n: number, w = 2) => n.toString().padStart(w, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(r, 3)}`;
  };
  return cues
    .map((c, i) => `${i + 1}\n${stamp(c.startSec)} --> ${stamp(c.endSec)}\n${c.text}\n`)
    .join("\n");
}

export function downloadYoutubePack(video: VideoItem, channel: Channel) {
  const slug = video.slug.toLowerCase();
  downloadText(youtubePack(video, channel), `${slug}-youtube.txt`);
  downloadText(toSrt(video), `${slug}.srt`);
  if (video.pack?.narration) {
    downloadText(video.pack.narration, `${slug}-narration.txt`);
  }
}
