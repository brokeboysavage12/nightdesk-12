import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as NICHES, r as VOICES, t as CADENCE_LABEL } from "./niches-DqFCaehY.mjs";
import { t as cn } from "./utils-BMtywCVH.mjs";
import { n as useDesk, t as AppShell } from "./app-shell-CmHc2DTh.mjs";
import { t as Button } from "./button-Bv_FGTsr.mjs";
import { n as Label, r as SetupDesk, t as Input } from "./setup-desk-Bn3Fh9Hk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channel-BhD94rz8.js
var import_jsx_runtime = require_jsx_runtime();
function ChannelView() {
	const channel = useDesk((s) => s.channel);
	const patchChannel = useDesk((s) => s.patchChannel);
	const videos = useDesk((s) => s.videos);
	if (!channel) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: "Identity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl italic",
					children: channel.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: ["@", channel.handle]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nm",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nm",
						className: "mt-2",
						value: channel.name,
						onChange: (e) => patchChannel({ name: e.target.value })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "hd",
						children: "Handle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "hd",
						className: "mt-2",
						value: channel.handle,
						onChange: (e) => patchChannel({ handle: e.target.value.replace(/[^a-z0-9._]/gi, "").toLowerCase() })
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: "Niche"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2",
				children: NICHES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => patchChannel({ nicheId: n.id }),
					className: cn("rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]", channel.nicheId === n.id && "shadow-[var(--shadow-border-hover)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-faint",
						children: n.index
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-3",
						children: n.name
					})]
				}, n.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Format"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-col gap-2",
						children: ["short", "long"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: channel.format === f ? "default" : "ghost",
							onClick: () => patchChannel({ format: f }),
							children: f === "short" ? "Shorts" : "Long form"
						}, f))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Cadence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-col gap-2",
						children: Object.keys(CADENCE_LABEL).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: channel.cadence === c ? "default" : "ghost",
							onClick: () => patchChannel({ cadence: c }),
							children: CADENCE_LABEL[c]
						}, c))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: "Voice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: VOICES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => patchChannel({ voiceId: v.id }),
						className: cn("rounded-md px-3 py-3 text-left", channel.voiceId === v.id ? "bg-raised text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: v.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: v.line
						})]
					}, v.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [videos.length, " files on this desk. Switching niche mid-month is how channels stall."]
			})
		]
	});
}
function ChannelPage() {
	const channel = useDesk((s) => s.channel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: channel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelView, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupDesk, {}) });
}
//#endregion
export { ChannelPage as component };
