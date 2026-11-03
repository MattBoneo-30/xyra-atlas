import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
execFileSync(process.execPath,[path.join(root,'scripts/build.mjs')],{stdio:'inherit'});
const dist=path.join(root,'dist');
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
const port=Number(process.env.PORT||4173);
// Reuse Vercel's production header policy in the local preview so CI
// exercises the same script, image, and network restrictions before deploy.
const headerRules=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8')).headers;
const siteHeaders=headerRules.find(rule=>rule.source==='/(.*)').headers;
const swHeaders=headerRules.find(rule=>rule.source==='/sw.js').headers;
const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return;}
  const safePath=path.resolve(dist,'.'+pathname);
  if(!(safePath===dist||safePath.startsWith(dist+path.sep))){res.writeHead(403);res.end();return;}
  for(const {key,value} of siteHeaders)res.setHeader(key,value);
  if(pathname==='/sw.js')for(const {key,value} of swHeaders)res.setHeader(key,value);
  let file=safePath;
  if(pathname==='/')file=path.join(dist,'index.html');
  else if(!fs.existsSync(file)||!fs.statSync(file).isFile()){
    // Only extensionless app routes may use SPA fallback. Never respond to
    // missing scripts, illustrations, manifests or icon requests with HTML.
    if(path.extname(pathname)){res.writeHead(404);res.end('Not found');return;}
    file=path.join(dist,'index.html');
  }
  const type=mime[path.extname(file)]||'application/octet-stream';
  res.setHeader('Content-Type',type);res.writeHead(200);fs.createReadStream(file).pipe(res);
});
server.listen(port,'0.0.0.0',()=>console.log(`Xyra Atlas local preview: http://localhost:${port}`));
