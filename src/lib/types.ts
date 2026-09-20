export type Cadence = "daily" | "weekdays" | "3x";
export type FormatKind = "short" | "long";
export type VideoStatus =
  | "slugged"
  | "scripted"
  | "voiced"
  | "visuals"
  | "assembled"
  | "ready"
  | "posted";

export type VoiceId =
  | "atlas"
  | "rex"
  | "orion"
  | "helix"
  | "eve"
  | "luna";

export interface Channel {
  name: string;
  handle: string;
  nicheId: string;
  cadence: Cadence;
  voiceId: VoiceId;
  format: FormatKind;
  setupAt: number;
}

export interface Idea {
  workingTitle: string;
  hook: string;
  angle: string;
  searchIntent: string;
  series: string;
}

export interface TitleOption {
  title: string;
  reason: string;
}

export interface CaptionCue {
  text: string;
  startSec: number;
  endSec: number;
}

export interface SceneBeat {
  id: string;
  onScreenText: string;
  imagePrompt: string;
  startSec: number;
  endSec: number;
  narrationSlice: string;
}

export interface VideoPackage {
  titles: TitleOption[];
  hook: string;
  narration: string;
  captions: CaptionCue[];
  scenes: SceneBeat[];
  description: string;
  tags: string[];
  hashtags: string[];
  pinnedComment: string;
  thumbnailText: string;
  thumbnailPrompt: string;
  cta: string;
  durationSec: number;
}

export interface VideoItem {
  id: string;
  createdAt: number;
  updatedAt: number;
  status: VideoStatus;
  nicheId: string;
  format: FormatKind;
  slug: string;
  idea: Idea;
  pack?: VideoPackage;
  selectedTitleIndex: number;
  postedAt?: number;
}

export const STATUS_ORDER: VideoStatus[] = [
  "slugged",
  "scripted",
  "voiced",
  "visuals",
  "assembled",
  "ready",
  "posted",
];

export const STATUS_LABEL: Record<VideoStatus, string> = {
  slugged: "Slugged",
  scripted: "Scripted",
  voiced: "Voiced",
  visuals: "Visuals",
  assembled: "Cut",
  ready: "Ready",
  posted: "Posted",
};
