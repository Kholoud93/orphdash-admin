import { readdirSync } from "node:fs";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

const localesDir = join(process.cwd(), "i18n", "locales");

function getLocaleFiles(lang: string): string[] {
  const dir = join(localesDir, lang);
  try {
    return readdirSync(dir)
      .filter((f: string) => f.endsWith(".json"))
      .sort()
      .map((f: string) => `${lang}/${f}`);
  } catch {
    return [];
  }
}

export default defineNuxtConfig({
  compatibilityDate: "2026-05-01",
  devtools: { enabled: true },
  srcDir: "app",
  components: [
    { path: "~/components/ui", prefix: "QuUI" },
    { path: "~/components/app", prefix: "QuApp" },
    { path: "~/components/vectors", prefix: "QuVector" },
    { path: "~/components/icons", prefix: "QuIcon" },
    "~/components/shell",
  ],
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? "",
      dashboardApiEnabled: process.env.NUXT_PUBLIC_DASHBOARD_API_ENABLED === "true",
    },
  },
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  fonts: {
    families: [
      { name: "Space Grotesk", provider: "google", weights: [500, 600, 700] },
      { name: "DM Sans", provider: "google", weights: [400, 500, 600] },
    ],
  },
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        files: getLocaleFiles("en"),
      },
      {
        code: "ar",
        language: "ar",
        name: "العربية",
        dir: "rtl",
        files: getLocaleFiles("ar"),
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "../i18n/locales",
    strategy: "prefix_except_default",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});
