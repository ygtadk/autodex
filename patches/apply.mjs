import { readFileSync, writeFileSync } from "node:fs";

const file = "node_modules/@astrojs/db/dist/core/integration/index.js";
let code = readFileSync(file, "utf8");

const oldCode = [
  "async function getTempViteServer({ viteConfig }) {",
  "  const tempViteServer = await createServer(",
  "    mergeConfig(viteConfig, {"
].join("\n");

const newCode = [
  "async function getTempViteServer({ viteConfig }) {",
  "  const filteredConfig = {",
  "    ...viteConfig,",
  "    plugins: (viteConfig.plugins ?? []).flat().filter(",
  "      (p) => !p || typeof p !== 'object' || !('name' in p) || typeof p.name !== 'string' || !p.name.startsWith('vite-plugin-cloudflare')",
  "    )",
  "  };",
  "  const tempViteServer = await createServer(",
  "    mergeConfig(filteredConfig, {"
].join("\n");

if (code.includes("filteredConfig")) {
  console.log("Patch already applied.");
  process.exit(0);
}
if (!code.includes(oldCode)) {
  console.error("Patch target not found — @astrojs/db may have been updated.");
  process.exit(1);
}

code = code.replace(oldCode, newCode);
writeFileSync(file, code);
console.log("Patched @astrojs/db (withastro/astro#16114)");
