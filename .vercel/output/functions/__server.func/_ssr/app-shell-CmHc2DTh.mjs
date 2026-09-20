import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as NICHES } from "./niches-DqFCaehY.mjs";
import { a as formatClock, l as slugify, o as formatDay, t as cn, u as uid } from "./utils-BMtywCVH.mjs";
import { c as LayoutList, f as Clapperboard, m as BookOpen, r as Radio } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-CmHc2DTh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useDesk = create()(persist((set, get) => ({
	hydrated: false,
	channel: null,
	videos: [],
	setHydrated: () => set({ hydrated: true }),
	setupChannel: (input) => set({ channel: {
		...input,
		handle: input.handle.replace(/^@/, ""),
		setupAt: Date.now()
	} }),
	patchChannel: (patch) => {
		const current = get().channel;
		if (!current) return;
		set({ channel: {
			...current,
			...patch
		} });
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
	updateVideo: (id, patch) => set({ videos: get().videos.map((v) => v.id === id ? {
		...v,
		...patch,
		updatedAt: Date.now()
	} : v) }),
	setPackage: (id, pack) => set({ videos: get().videos.map((v) => v.id === id ? {
		...v,
		pack,
		status: "scripted",
		updatedAt: Date.now()
	} : v) }),
	removeVideo: (id) => set({ videos: get().videos.filter((v) => v.id !== id) }),
	markPosted: (id) => set({ videos: get().videos.map((v) => v.id === id ? {
		...v,
		status: "posted",
		postedAt: Date.now(),
		updatedAt: Date.now()
	} : v) })
}), {
	name: "nightdesk-v1",
	partialize: (s) => ({
		channel: s.channel,
		videos: s.videos
	}),
	skipHydration: true
}));
function makeVideo(idea, channel) {
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
		selectedTitleIndex: 0
	};
}
function useHydrateDesk() {
	const setHydrated = useDesk((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		const result = useDesk.persist.rehydrate();
		Promise.resolve(result).then(() => setHydrated());
	}, [setHydrated]);
}
var NAV = [
	{
		to: "/",
		label: "Desk",
		icon: Radio
	},
	{
		to: "/board",
		label: "Board",
		icon: LayoutList
	},
	{
		to: "/playbook",
		label: "Playbook",
		icon: BookOpen
	},
	{
		to: "/channel",
		label: "Channel",
		icon: Clapperboard
	}
];
function AppShell({ children }) {
	useHydrateDesk();
	const hydrated = useDesk((s) => s.hydrated);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl italic tracking-tight",
								children: "NightDesk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-xs uppercase tracking-[0.18em] text-faint sm:inline",
								children: "Overnight YouTube"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150", pathname === item.to && "bg-raised text-fg"),
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs uppercase tracking-wider text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: formatDay(now)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatClock(now)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-ok",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ok" }), "Open"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-8 md:pb-16",
				children: !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 rounded-md bg-raised" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl bg-surface" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-xl bg-surface" })
					]
				}) : children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] uppercase tracking-wider", active ? "text-fg" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				})
			})
		]
	});
}
//#endregion
export { useDesk as n, AppShell as t };
