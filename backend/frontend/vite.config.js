// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require'


export default defineConfig({
  plugins:  [
    vitePluginRequire.default(),
    [react()]
  ],
  build: {
    outDir: '../static/react',  // This folder will contain the built files
    emptyOutDir: true,           // Clears the folder before building new files
    sourcemap: true, // Enable source maps for debugging
    minify: false, // Disable minification
  },
});

