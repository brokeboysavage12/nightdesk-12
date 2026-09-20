import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NICHES } from "@/lib/niches";
import type { Cadence, Channel, FormatKind, Idea, VideoItem, VideoPackage, VoiceId } from "@/lib/types";
import { slugify, uid } from "@/lib/utils";

interface DeskState {
  hydrated: boolean;
  channel: Channel | null;
  videos: VideoItem[];
  setHydrated: () => void;
  setupChannel: (input: {
    name: string;
    handle: string;
    nicheId: string;
    cadence: Cadence;
    voiceId: VoiceId;
    format: FormatKind;
  }) => void;
  patchChannel: (patch: Partial<Channel>) => void;
  addIdeas: (ideas: Idea[]) => VideoItem[];
  addVideoFromIdea: (idea: Idea) => VideoItem;
  updateVideo: (id: string, patch: Partial<VideoItem>) => void;
  setPackage: (id: string, pack: VideoPackage) => void;
  removeVideo: (id: string) => void;
  markPosted: (id: string) => void;
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      channel: null,
      videos: [],
      setHydrated: () => set({ hydrated: true }),
      setupChannel: (input) =>
        set({
          channel: {
            ...input,
            handle: input.handle.replace(/^@/, ""),
            setupAt: Date.now(),
          },
        }),
      patchChannel: (patch) => {
        const current = get().channel;
        if (!current) return;
        set({ channel: { ...current, ...patch } });
      },
      addIdeas: (ideas) => {
        const created = ideas.map((idea) => makeVideo(idea, get().channel));
        set({ videos: [...created, ...get().videos] });
        return created;
      },
      addVideoFromIdea: (idea) => {
        const item = makeVideo(idea, get().channel);
        set({ videos: [item, ...get().videos] });
        return item;
      },
      updateVideo: (id, patch) =>
        set({
          videos: get().videos.map((v) =>
            v.id === id ? { ...v, ...patch, updatedAt: Date.now() } : v,
          ),
        }),
      setPackage: (id, pack) =>
        set({
          videos: get().videos.map((v) =>
            v.id === id
              ? { ...v, pack, status: "scripted", updatedAt: Date.now() }
              : v,
          ),
        }),
      removeVideo: (id) => set({ videos: get().videos.filter((v) => v.id !== id) }),
      markPosted: (id) =>
        set({
          videos: get().videos.map((v) =>
            v.id === id
              ? { ...v, status: "posted", postedAt: Date.now(), updatedAt: Date.now() }
              : v,
          ),
        }),
    }),
    {
      name: "nightdesk-v1",
      partialize: (s) => ({ channel: s.channel, videos: s.videos }),
      skipHydration: true,
    },
  ),
);

function makeVideo(idea: Idea, channel: Channel | null): VideoItem {
  const nicheId = channel?.nicheId ?? NICHES[0].id;
  return {
    id: uid("vid"),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: "slugged",
    nicheId,
    format: channel?.format ?? "short",
    slug: slugify(idea.workingTitle || idea.hook),
    idea,
    selectedTitleIndex: 0,
  };
}

export function useHydrateDesk() {
  const setHydrated = useDesk((s) => s.setHydrated);
  useEffect(() => {
    const result = useDesk.persist.rehydrate();
    void Promise.resolve(result).then(() => setHydrated());
  }, [setHydrated]);
}
