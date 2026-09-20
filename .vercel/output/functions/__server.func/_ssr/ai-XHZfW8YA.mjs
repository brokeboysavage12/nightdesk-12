import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-XHZfW8YA.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateIdeas = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("cf886653e28a101e892a68daaadd44f4a4b684c4b9b8eab6f712b67a6d440fc8"));
var generatePackage = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f792689d94fd0e4814dbeb8aff9d601c10c69d205dae4982c05f66b4021e1242"));
var generateVoice = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ce9988eb7e7c86779f68ca532a781f8023023f678abd92779fd8fddab59302f3"));
var generateImage = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0e37eabcba6353a5384f0c1bfa8547890823ee12288e02107042df2feae902d8"));
//#endregion
export { generateVoice as i, generateImage as n, generatePackage as r, generateIdeas as t };
