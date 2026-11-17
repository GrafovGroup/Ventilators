// Local-only accessibility harness. This file and axe never enter the static export.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};
const auditScript = `<script src="/__qa/axe.min.js"></script><script>window.addEventListener('load',async()=>{await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));if(['/en/request-a-quote/','/fr/demande-de-soumission/'].includes(location.pathname)){const deadline=Date.now()+5000;while(!document.querySelector('form')&&Date.now()<deadline)await new Promise(r=>setTimeout(r,50));}const results=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});const report={url:location.pathname,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,passes:results.passes.length,violations:results.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:results.incomplete.map(v=>v.id)};const pre=document.createElement('pre');pre.id='qa-report';pre.style.cssText='white-space:pre-wrap;padding:24px;background:white;color:black';pre.textContent=JSON.stringify(report,null,2);document.body.appendChild(pre);});</script>`;
const server = createServer(async (req, res) => {
  try {
    const entry = new URL(req.url, 'http://localhost');
    if (entry.pathname === '/' || entry.pathname === '/index.html') {
      res.writeHead(301, { Location: '/en/' + entry.search, 'Cache-Control': 'no-store' });
      res.end();
      return;
    }
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/__qa/analytics.js' || url.pathname === '/__qa/google-mock.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(
        await readFile(
          url.pathname.endsWith('google-mock.js')
            ? 'scripts/qa-google-mock.js'
            : 'scripts/qa-analytics.js',
        ),
      );
      return;
    }
    if (url.pathname === '/__qa/performance.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(await readFile('scripts/qa-performance.js'));
      return;
    }
    if (url.pathname === '/__qa/form-delivery.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(await readFile('scripts/qa-form-delivery.js'));
      return;
    }
    if (url.pathname === '/__qa/axe.min.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(await readFile(require.resolve('axe-core/axe.min.js')));
      return;
    }
    let file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    let bytes = await readFile(file);
    // Local QA can never load a real Google tag. Production exports stay unchanged.
    if (url.pathname === '/analytics/collector.js')
      bytes = Buffer.from(
        bytes
          .toString()
          .replace(
            "location.origin !== 'https://ventilators.ca'",
            "location.origin !== 'http://localhost:3001'",
          )
          .replace("'https://www.googletagmanager.com/gtag/js?id=' + id", "'/__qa/google-mock.js'"),
      );
    if (extname(file) === '.html' && url.searchParams.has('analyticstest'))
      bytes = Buffer.from(
        bytes.toString().replace('<head>', '<head><script src="/__qa/analytics.js"></script>'),
      );
    if (extname(file) === '.html' && url.searchParams.has('measure'))
      bytes = Buffer.from(
        bytes.toString().replace('<head>', '<head><script src="/__qa/performance.js"></script>'),
      );
    if (extname(file) === '.html' && url.searchParams.has('formtest'))
      bytes = Buffer.from(
        bytes.toString().replace('<head>', '<head><script src="/__qa/form-delivery.js"></script>'),
      );
    if (extname(file) === '.html' && url.searchParams.has('audit'))
      bytes = Buffer.from(bytes.toString().replace('</head>', `${auditScript}</head>`));
    res.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    });
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});
server.listen(3001, '127.0.0.1', () =>
  console.log('Local accessibility QA: http://localhost:3001/en/?audit=1'),
);
