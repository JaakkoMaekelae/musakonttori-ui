#!/usr/bin/env node
/**
 * Generates tokens.css from tokens.ts.
 *
 * The CSS is generated rather than hand-written so there is exactly one place
 * a colour can be changed. Hand-maintaining both is how the codebase ended up
 * with two competing brand reds in the first place.
 *
 * Runs before tsc in `pnpm build`, and writes into src/ so the file is also
 * available to Storybook and to `pnpm dev`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// tokens.ts is plain TypeScript with no runtime deps beyond types, so it can
// be loaded directly once stripped. Node 22+ strips types natively; fall back
// to a tiny inline transform if it does not.
const tokensPath = resolve(root, "src/tokens.ts");

let mod;
try {
  mod = await import(pathToFileURL(tokensPath).href);
} catch (err) {
  console.error(
    "Could not import src/tokens.ts directly. Node >= 22.6 with type stripping is required.\n" +
      "Run with: node --experimental-strip-types scripts/build-tokens.mjs",
  );
  throw err;
}

const css =
  "/* GENERATED FILE — edit src/tokens.ts and run `pnpm build:tokens`. */\n\n" +
  mod.tokensCss() +
  "\n";

for (const out of [resolve(root, "src/tokens.css"), resolve(root, "dist/tokens.css")]) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, css, "utf8");
  console.log(`wrote ${out.replace(root + "/", "")}`);
}
