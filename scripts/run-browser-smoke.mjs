/** Run every browser smoke scenario without extending the per-shard hang limit.
 * Three sequential isolated runs preserve screenshot artifacts and avoid
 * overloading CI with concurrent Chromium processes.
 */
import {spawn} from 'node:child_process';
import {BROWSER_SHARD_COUNT} from './browser-shard-utils.mjs';

for(let shard=1;shard<=BROWSER_SHARD_COUNT;shard++){
 console.log('\n=== Atlas Chromium browser smoke shard '+shard+'/'+BROWSER_SHARD_COUNT+' ===');
 const code=await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,['tests/browser-smoke.mjs'],{
   cwd:process.cwd(),stdio:'inherit',
   env:{...process.env,ATLAS_BROWSER_SHARD:String(shard),ATLAS_TEST_PORT:String(42751+shard)}
  });
  child.once('error',reject);
  child.once('exit',(code,signal)=>resolve(signal?128:code??1));
 });
 if(code!==0){
  console.error('Chromium smoke shard '+shard+' failed with code '+code+'. All later shards remain unexecuted.');
  process.exitCode=code;
  break;
 }
}
if(!process.exitCode)console.log('\nAll real Chromium browser smoke scenarios passed across '+BROWSER_SHARD_COUNT+' isolated shards.');
