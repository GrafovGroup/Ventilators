// Local review server; design options are never copied into the production export.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = resolve('designs/2026-11-17');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json',
};
const audit = `<script src="/__qa/axe.js"></script><script>window.addEventListener('load',async()=>{const results=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});const report={path:location.pathname,locale:document.documentElement.lang,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,violations:results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:results.incomplete.map(v=>v.id)};const pre=document.createElement('pre');pre.id='qa-report';pre.hidden=true;pre.textContent=JSON.stringify(report);document.body.appendChild(pre);document.body.dataset.qaReady='true';});</script>`;
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/__qa/axe.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(await readFile(require.resolve('axe-core/axe.min.js')));
      return;
    }
    let file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) throw Error('Outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    let data = await readFile(file);
    if (extname(file) === '.html' && url.searchParams.has('audit'))
      data = Buffer.from(data.toString().replace('</head>', `${audit}</head>`));
    res.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex,nofollow',
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(3002, '127.0.0.1', () => console.log('Design review: http://localhost:3002/'));
