// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import cloudflare from "@astrojs/cloudflare";

// Cloudflare adapter'ın workerd SSR ortamı, dev modunda @astrojs/db ile uyumsuz.
// Adapter yalnızca build sırasında yüklenir (withastro/astro#16114).
const isBuild = process.argv.includes("build");

// https://astro.build/config
export default defineConfig({
  site: "https://autodex.ygtadk100.workers.dev",
  base: "/",

  fonts: [
    {
      name: "Roboto",
      cssVariable: "--font-roboto",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Roboto Mono",
      cssVariable: "--font-roboto-mono",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Geist",
      cssVariable: "--font-geist",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.fontsource(),
    }
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          tr: 'tr-TR'
        },
      },
    }), 
    db({
      mode: isBuild ? 'web' : 'node',
    })
  ],

  adapter: isBuild
    ? cloudflare({
        imageService: { build: 'compile', runtime: 'cloudflare-binding' }
      })
    : undefined
});