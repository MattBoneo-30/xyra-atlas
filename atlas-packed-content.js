/** Decode build-packed, repo-authored course data with native browser streams.
 * No eval, code generation, network, storage, worker, or remote dependency.
 * Packed files remain in the same-origin offline service-worker cache.
 * Supported by modern Chromium/Firefox/WebKit (including iOS Safari 16.4+).
 */
export async function unpackAtlasJSON(base64){
 if(typeof base64!=='string'||base64.length<12||base64.length>1500000||!/^[a-zA-Z0-9+/]+={0,2}$/.test(base64))
  throw new TypeError('Invalid packaged Atlas data');
 if(typeof DecompressionStream!=='function')
  throw new Error('This browser does not support compressed Atlas lessons. Update Safari, Chrome or Firefox.');
 const encoded=atob(base64);
 const bytes=Uint8Array.from(encoded,character=>character.charCodeAt(0));
 const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
 const decoded=await new Response(stream).text();
 if(decoded.length>2000000)throw new RangeError('Unpacked Atlas data exceeds safety limit');
 return JSON.parse(decoded);
}
