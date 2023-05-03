import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue2"
import path from "path"

export default defineConfig({
    plugins: [vue()],
    root: path.resolve(__dirname, "src"),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@lib": path.resolve(__dirname, "./node_modules"),
            "@component": path.resolve(__dirname, "./src/js/components"),
            "@page": path.resolve(__dirname, "./src/js/pages"),
        },
    },
    server: {
        port: 3000,
        hot: true,
    },
})
