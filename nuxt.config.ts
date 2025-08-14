// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia/colada-nuxt"],
  css: ["~/assets/css/main.css"],
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    families: [
      { name: "General Sans", provider: "fontshare" },
    ],
    experimental: {
      processCSSVariables: true,
    },
  },
});