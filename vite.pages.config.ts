import { resolve } from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Static build for GitHub Pages at https://yusran017.github.io/Omad/ */
export default defineConfig({
  base: "/Omad/",
  plugins: [tailwindcss(), viteReact()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: resolve("dist-pages"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve("site/index.html"),
    },
  },
});
