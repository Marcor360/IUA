import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = normalize(join(process.cwd(), "dist"));
const port = 4173;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  const relative = pathname.replace(/^\/+/, "");
  let file = normalize(join(root, relative));
  if (!file.startsWith(root)) { response.writeHead(400).end("Bad request"); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && !extname(file)) file = join(file, "index.html");
  const found = existsSync(file) && statSync(file).isFile();
  const target = found ? file : join(root, "404.html");
  response.writeHead(found ? 200 : 404, { "Content-Type": types[extname(target)] ?? "application/octet-stream" });
  response.end(readFileSync(target));
}).listen(port, "127.0.0.1", () => console.log(`Serving dist on http://127.0.0.1:${port}`));
