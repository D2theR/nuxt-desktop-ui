// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@nuxtjs/tailwindcss"],
  plugins: [{ src: "~/plugins/directives.client.js", mode: "client" }],

  ui: {
    // NuxtUI options (if any)
  },

  tailwindcss: {
    // Tailwind CSS options (if any)
  },

  compatibilityDate: "2024-10-15",
});