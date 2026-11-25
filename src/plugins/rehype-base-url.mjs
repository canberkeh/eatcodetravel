import { visit } from "unist-util-visit";

/**
 * Prefixes root-relative src/href attributes (e.g. "/images/x.jpg") with the
 * site's base path, so content written for "/" works under a GitHub Pages
 * project path like "/repo-name/". Handles both markdown-generated elements
 * and raw HTML blocks embedded in markdown (kept as "raw" nodes by Astro).
 */
export function rehypeBaseUrl(base) {
	const prefix = base.replace(/\/$/, "");
	const needsPrefix = (v) => v.startsWith("/") && !v.startsWith("//") && !v.startsWith(`${prefix}/`);
	return () => (tree) => {
		if (!prefix) return;
		visit(tree, (node) => {
			if (node.type === "element") {
				for (const attr of ["src", "href"]) {
					const v = node.properties?.[attr];
					if (typeof v === "string" && needsPrefix(v)) node.properties[attr] = prefix + v;
				}
			} else if (node.type === "raw" && typeof node.value === "string") {
				node.value = node.value.replace(/\b(src|href)=(["'])(\/[^"']*)\2/g, (m, attr, q, v) =>
					needsPrefix(v) ? `${attr}=${q}${prefix}${v}${q}` : m,
				);
			}
		});
	};
}
