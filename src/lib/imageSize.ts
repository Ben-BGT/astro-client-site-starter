/*
  Build-time intrinsic dimensions for images served straight out of
  `public/`.

  Astro's <Image /> component can't help here: files in `public/` bypass the
  asset pipeline entirely, so nothing knows how big they are and every <img>
  ships without width/height. The browser then reserves no space, and the page
  reflows when the image finally decodes — a visible layout shift, usually on
  exactly the hero or CTA photo a site leads with.

  Reading the header bytes at build time costs nothing at runtime and lets the
  markup carry real width/height, so the browser reserves the correct box from
  first paint.

  Returns null for remote URLs, missing files, or anything unparseable —
  callers fall back to emitting no dimensions, exactly as before.
*/
import { imageSize } from "image-size";
import { readFileSync } from "node:fs";
import path from "node:path";

export interface Dimensions {
  width: number;
  height: number;
}

const cache = new Map<string, Dimensions | null>();

export function getPublicImageSize(src?: string | null): Dimensions | null {
  if (!src || !src.startsWith("/")) return null;
  if (cache.has(src)) return cache.get(src)!;

  let result: Dimensions | null = null;
  try {
    // Strip any query string, then resolve against public/.
    const relative = src.split("?")[0].replace(/^\/+/, "");
    const file = path.join(process.cwd(), "public", relative);
    const { width, height } = imageSize(readFileSync(file));
    if (width && height) result = { width, height };
  } catch {
    result = null;
  }

  cache.set(src, result);
  return result;
}
