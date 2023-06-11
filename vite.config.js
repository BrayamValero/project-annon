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
            "@store": path.resolve(__dirname, "./src/js/store"),
            "@page": path.resolve(__dirname, "./src/js/pages"),
            "@router": path.resolve(__dirname, "./src/js/router"),
            "@composable": path.resolve(__dirname, "./src/js/composables"),
        },
    },
    server: {
        port: 3000,
        hot: true,
    },
})
