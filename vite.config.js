import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  // base: "/im8health-clone/",
  plugins: [injectHTML()],
});