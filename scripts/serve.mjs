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
const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return;}
  const safePath=path.resolve(dist,'.'+pathname);
  if(!(safePath===dist||safePath.startsWith(dist+path.sep))){res.writeHead(403);res.end();return;}
  const file=fs.existsSync(safePath)&&fs.statSync(safePath).isFile()?safePath:path.join(dist,'index.html');
  const type=mime[path.extname(file)]||'application/octet-stream';
  if(file.endsWith('sw.js'))res.setHeader('Cache-Control','no-cache');
  res.setHeader('Content-Type',type);res.writeHead(200);fs.createReadStream(file).pipe(res);
});
server.listen(port,'0.0.0.0',()=>console.log(`Xyra Atlas local preview: http://localhost:${port}`));
