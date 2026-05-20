import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isVercel = !!process.env.VERCEL;
const isReplit = !!process.env.REPL_ID;

const port = isVercel ? 3000 : (() => {
  const raw = process.env.PORT;
  if (!raw) throw new Error("PORT environment variable is required but was not provided.");
  const p = Number(raw);
  if (Number.isNaN(p) || p <= 0) throw new Error(`Invalid PORT value: "${raw}"`);
  return p;
})();

const basePath = isVercel ? "/" : (() => {
  const bp = process.env.BASE_PATH;
  if (!bp) throw new Error("BASE_PATH environment variable is required but was not provided.");
  return bp;
})();

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...(!isVercel ? [
      await import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
    ] : []),
    ...(process.env.NODE_ENV !== "production" && isReplit
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({ root: path.resolve(import.meta.dirname, "..") }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true, deny: ["**/.*"] },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
