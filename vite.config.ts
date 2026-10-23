import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Netlify serves this portfolio from the domain root, not /Portfolio-/.
export default defineConfig({ base: "/", plugins: [react()] });
