import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as NICHES, r as VOICES, t as CADENCE_LABEL } from "./niches-DqFCaehY.mjs";
import { t as cn } from "./utils-BMtywCVH.mjs";
import { n as useDesk } from "./app-shell-CmHc2DTh.mjs";
import { t as Button } from "./button-Bv_FGTsr.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setup-desk-Bn3Fh9Hk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)]", "placeholder:text-faint", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:shadow-[var(--shadow-border-hover)]", "disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium uppercase tracking-wider text-muted", className),
	...props
}));
Label.displayName = Root.displayName;
function SetupDesk() {
	const setupChannel = useDesk((s) => s.setupChannel);
	const [name, setName] = (0, import_react.useState)("Last Light Files");
	const [handle, setHandle] = (0, import_react.useState)("lastlightfiles");
	const [nicheId, setNicheId] = (0, import_react.useState)(NICHES[0].id);
	const [cadence, setCadence] = (0, import_react.useState)("daily");
	const [voiceId, setVoiceId] = (0, import_react.useState)("atlas");
	const [format, setFormat] = (0, import_react.useState)("short");
	const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.22em] text-muted",
				children: "Assignment desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl italic sm:text-5xl",
				children: "You never have to open an editor."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Pick a faceless niche. NightDesk writes the script, speaks it, paints the stills, and cuts a Short you can upload tonight. Same desk, every day, until the channel looks inevitable."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "channel-name",
								children: "Channel name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "channel-name",
								className: "mt-2",
								value: name,
								onChange: (e) => setName(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "handle",
									children: "Handle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "@"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "handle",
										value: handle,
										onChange: (e) => setHandle(e.target.value.replace(/[^a-z0-9._]/gi, "").toLowerCase())
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.22em] text-muted",
							children: "Niche — pick one and stay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: NICHES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setNicheId(n.id),
								className: cn("rounded-lg bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150", nicheId === n.id && "shadow-[var(--shadow-border-hover)]"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-faint",
											children: n.index
										}), nicheId === n.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-wider text-ok",
											children: "Assigned"
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-xl",
										children: n.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: n.blurb
									})
								]
							}, n.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: niche.why
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fieldset, {
								legend: "Format",
								children: [["short", "Shorts — fastest"], ["long", "Long — later"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: format === id,
									onClick: () => setFormat(id),
									children: label
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fieldset, {
								legend: "Cadence",
								children: Object.keys(CADENCE_LABEL).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: cadence === id,
									onClick: () => setCadence(id),
									children: CADENCE_LABEL[id]
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fieldset, {
								legend: "Voice",
								children: VOICES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: voiceId === v.id,
									onClick: () => setVoiceId(v.id),
									children: v.name
								}, v.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky bottom-16 z-20 -mx-4 bg-bg/95 px-4 py-3 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "w-full sm:w-auto",
							onClick: () => setupChannel({
								name: name.trim() || "Night Desk",
								handle: handle.trim() || "nightdesk",
								nicheId,
								cadence,
								voiceId,
								format
							}),
							children: "Open the desk"
						})
					})
				]
			})
		]
	});
}
function Fieldset({ legend, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.18em] text-muted",
			children: legend
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-col gap-2",
			children
		})]
	});
}
function Choice({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-md px-3 py-2 text-left text-sm text-muted transition-colors duration-150", active && "bg-raised text-fg"),
		children
	});
}
//#endregion
export { Label as n, SetupDesk as r, Input as t };
