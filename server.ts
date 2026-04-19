import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fetch from "node-fetch";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple Proxy Implementation to bypass X-Frame-Options
  app.get("/api/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) {
      return res.status(400).send("URL parameter is required");
    }

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: 'follow'
      });
      
      const contentType = response.headers.get("content-type");
      
      if (response.status >= 300 && response.status < 400 && response.headers.has('location')) {
        const redir = response.headers.get('location')!;
        return res.redirect(`/api/proxy?url=${encodeURIComponent(redir)}`);
      }

      if (!contentType || !contentType.includes("text/html")) {
        res.setHeader("Content-Type", contentType || "application/octet-stream");
        res.removeHeader("X-Frame-Options");
        res.removeHeader("Content-Security-Policy");
        return response.body.pipe(res);
      }

      let html = await response.text();
      const urlObj = new URL(targetUrl);
      const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
      const baseWithTrailingSlash = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      
      const customStyles = `
        <style>
          html, body { overflow: auto !important; }
        </style>
        <script>
          try {
            const prevent = () => {
              Object.defineProperty(window, 'top', { get: () => window.self });
              Object.defineProperty(window, 'parent', { get: () => window.self });
            };
            prevent();
            window.addEventListener('load', prevent);
          } catch (e) {}
        </script>
      `;

      html = html.replace("<head>", `<head><base href="${baseWithTrailingSlash}">${customStyles}`);
      
      html = html.replace(/<meta[^>]+http-equiv=["']X-Frame-Options["'][^>]*>/gi, "");
      html = html.replace(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*>/gi, "");
      html = html.replace(/<meta[^>]+content=["'][^"']*frame-ancestors[^"']*["'][^>]*>/gi, "");

      html = html.replace(/if\s*\(window\.top\s*!==\s*window\.self\).*?{.*?}/gs, "");
      html = html.replace(/if\s*\(top\.location\s*!==\s*location\).*?{.*?}/gs, "");

      res.setHeader("Content-Type", "text/html");
      res.removeHeader("X-Frame-Options");
      res.removeHeader("Content-Security-Policy");
      res.send(html);
    } catch (error) {
      console.error("Proxy error:", error);
      res.setHeader("Content-Type", "text/html");
      res.status(500).send(`
        <div style="font-family:sans-serif; padding: 20px; color: #fff; background: #0a0a0a; height: 100vh;">
          <h1 style="color: #00ffa3;">Nexus Tunnel Error</h1>
          <p>The target website <strong>${targetUrl}</strong> refused the connection.</p>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
          <hr style="border: 1px solid #333;">
          <p>This happens when a site has extreme security or blocks cloud requests. Use the <b>BREAKOUT</b> button to visit it directly.</p>
        </div>
      `);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexus Proxy Server running on http://localhost:${PORT}`);
    console.log(`Backend Tunnel Active.`);
  });
}

startServer();
