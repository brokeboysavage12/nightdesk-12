import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as getNiche } from "./niches-DqFCaehY.mjs";
import { s as formatDuration, t as cn } from "./utils-BMtywCVH.mjs";
import { h as ArrowUpRight, o as LoaderCircle, s as ListPlus } from "../_libs/lucide-react.mjs";
import { n as useDesk, t as AppShell } from "./app-shell-CmHc2DTh.mjs";
import { t as STATUS_LABEL } from "./types-C0fpVSIT.mjs";
import { t as Button } from "./button-Bv_FGTsr.mjs";
import { r as SetupDesk } from "./setup-desk-Bn3Fh9Hk.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as generatePackage, t as generateIdeas } from "./ai-XHZfW8YA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Qfr5moKL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeskHome() {
	const navigate = useNavigate();
	const channel = useDesk((s) => s.channel);
	const videos = useDesk((s) => s.videos);
	const addIdeas = useDesk((s) => s.addIdeas);
	const setPackage = useDesk((s) => s.setPackage);
	const niche = getNiche(channel.nicheId);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [packingId, setPackingId] = (0, import_react.useState)(null);
	const open = videos.filter((v) => v.status !== "posted");
	const posted = videos.filter((v) => v.status === "posted");
	const ready = videos.filter((v) => v.status === "ready" || v.status === "assembled");
	async function rundown(count = 5) {
		setBusy("ideas");
		try {
			const result = await generateIdeas({ data: {
				nicheId: channel.nicheId,
				format: channel.format,
				avoid: videos.map((v) => v.idea.workingTitle),
				count
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			addIdeas(result.ideas);
			toast.success(`${result.ideas.length} slugs on the desk.`);
		} finally {
			setBusy(null);
		}
	}
	async function writePack(video) {
		setBusy("pack");
		setPackingId(video.id);
		try {
			const result = await generatePackage({ data: {
				nicheId: video.nicheId,
				format: video.format,
				channelName: channel.name,
				idea: video.idea
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			setPackage(video.id, result.pack);
			toast.success("Package is on the desk.");
			navigate({
				to: "/video/$id",
				params: { id: video.id }
			});
		} finally {
			setBusy(null);
			setPackingId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-[0.22em] text-muted",
						children: [
							niche.index,
							" · ",
							niche.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl italic sm:text-4xl",
						children: channel.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted",
						children: niche.hookStyle
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => rundown(5),
						disabled: busy !== null,
						children: [busy === "ideas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, {}), "Tonight's rundown"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => rundown(7),
						disabled: busy !== null,
						children: "Fill the week"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "On desk",
						value: open.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Ready",
						value: ready.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Posted",
						value: posted.length
					})
				]
			}),
			videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRundown, {
				onGenerate: () => rundown(5),
				busy: busy === "ideas"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-12 gap-3 border-b border-line px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-faint sm:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-2",
							children: "Slug"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-5",
							children: "Hook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-2",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-1",
							children: "Dur"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-2 text-right",
							children: "Action"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: videos.slice(0, 18).map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-1 gap-3 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-12 sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: video.slug
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: video.idea.workingTitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted sm:col-span-5",
							children: video.idea.hook
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: video.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums text-muted sm:col-span-1",
							children: formatDuration(video.pack?.durationSec ?? (video.format === "short" ? 48 : 480))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-start gap-2 sm:col-span-2 sm:justify-end",
							children: video.pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/video/$id",
									params: { id: video.id },
									children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => writePack(video),
								disabled: busy !== null,
								children: [packingId === video.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : null, "Write"]
							})
						})
					]
				}, video.id)) })]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-4 py-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.16em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-sm", status === "ready" || status === "assembled" ? "text-ok" : "text-muted", status === "posted" && "text-faint"),
		children: STATUS_LABEL[status]
	});
}
function EmptyRundown({ onGenerate, busy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-6 py-10 text-center shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl italic",
				children: "The desk is clear."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-md text-sm text-muted",
				children: "Generate tonight's rundown. Five original slugs in your niche, each with a cold-open hook. You pick one. The desk writes the rest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-8",
				onClick: onGenerate,
				disabled: busy,
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, {}), "Generate rundown"]
			})
		]
	});
}
function Home() {
	const channel = useDesk((s) => s.channel);
	const hydrated = useDesk((s) => s.hydrated);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: hydrated ? channel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskHome, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupDesk, {}) : null });
}
//#endregion
export { Home as component };
