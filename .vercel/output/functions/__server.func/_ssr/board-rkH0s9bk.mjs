import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useDesk, t as AppShell } from "./app-shell-CmHc2DTh.mjs";
import { n as STATUS_ORDER, t as STATUS_LABEL } from "./types-C0fpVSIT.mjs";
import { n as selectedTitle } from "./export-BI7fnL5X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-rkH0s9bk.js
var import_jsx_runtime = require_jsx_runtime();
function BoardView() {
	const videos = useDesk((s) => s.videos);
	const columns = STATUS_ORDER.filter((s) => s !== "voiced" && s !== "visuals");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.22em] text-muted",
			children: "Production board"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl italic",
			children: "The rundown"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: "Slugged, written, cut, posted. Keep the rightmost column moving."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex gap-3 overflow-x-auto pb-4",
			children: columns.map((status) => {
				const items = videos.filter((v) => {
					if (status === "scripted") return v.status === "scripted" || v.status === "voiced" || v.status === "visuals";
					return v.status === status;
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "w-64 shrink-0 rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-[0.16em] text-muted",
							children: STATUS_LABEL[status]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums text-faint",
							children: items.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2",
						children: [items.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/video/$id",
							params: { id: video.id },
							className: "block rounded-md bg-raised px-3 py-3 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-faint",
								children: video.slug
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-snug",
								children: selectedTitle(video)
							})]
						}) }, video.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-1 py-6 text-xs text-faint",
							children: "Empty"
						}) : null]
					})]
				}, status);
			})
		})
	] });
}
function BoardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardView, {}) });
}
//#endregion
export { BoardPage as component };
