// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
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
    db()
  ]
});