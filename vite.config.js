import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function serveQuinzexPlugin() {
  const quinzexDist = path.resolve(__dirname, 'Quinzex-main/dist');
  const targetDistQuinzex = path.resolve(__dirname, 'dist/quinzex');

  return {
    name: 'serve-quinzex',
    // Dev server middleware
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/quinzex')) {
          let reqPath = req.url.replace(/^\/quinzex/, '') || '/';
          // strip query params
          reqPath = reqPath.split('?')[0];

          if (reqPath === '' || reqPath === '/') {
            reqPath = '/index.html';
          }

          let filePath = path.join(quinzexDist, reqPath);

          // If looking for a static asset file that exists
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.html': 'text/html; charset=utf-8',
              '.js': 'application/javascript; charset=utf-8',
              '.css': 'text/css; charset=utf-8',
              '.json': 'application/json',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.woff2': 'font/woff2',
              '.woff': 'font/woff',
              '.ttf': 'font/ttf',
              '.txt': 'text/plain',
              '.ico': 'image/x-icon'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            return fs.createReadStream(filePath).pipe(res);
          }

          // Otherwise, serve SPA index.html for client-side routing
          const indexPath = path.join(quinzexDist, 'index.html');
          if (fs.existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return fs.createReadStream(indexPath).pipe(res);
          }
        }
        next();
      });
    },

    // Production build hook: Copy Quinzex-main/dist into dist/quinzex
    closeBundle() {
      if (fs.existsSync(quinzexDist)) {
        if (!fs.existsSync(targetDistQuinzex)) {
          fs.mkdirSync(targetDistQuinzex, { recursive: true });
        }
        fs.cpSync(quinzexDist, targetDistQuinzex, { recursive: true });
        console.log('[serveQuinzexPlugin] Successfully copied Quinzex-main/dist into dist/quinzex for production deployment.');
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveQuinzexPlugin()],
});
