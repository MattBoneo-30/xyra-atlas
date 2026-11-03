import test from 'node:test';import assert from 'node:assert/strict';import {webcrypto} from 'node:crypto';import fs from 'node:fs';
import {encryptBackup,decryptBackup,isEncryptedBackup} from '../backupcrypto.js';
test('encrypted backup round-trips with independent salt and IV',async()=>{
 const plain='{"format":"xyra-atlas-backup","state":{"private":"Secret note"}}',pass='a sufficiently strong secret phrase';
 const one=JSON.parse(await encryptBackup(plain,pass,webcrypto)),two=JSON.parse(await encryptBackup(plain,pass,webcrypto));
 assert.ok(isEncryptedBackup(one));assert.notEqual(one.salt,two.salt);assert.notEqual(one.iv,two.iv);
 assert.ok(!JSON.stringify(one).includes('Secret note'));
 assert.equal(await decryptBackup(one,pass,webcrypto),plain);
 await assert.rejects(decryptBackup(one,'wrong',webcrypto),/Incorrect/);
 await assert.rejects(decryptBackup({...one,iterations:999999999},pass,webcrypto),/Unsupported/);
 await assert.rejects(encryptBackup(plain,'short',webcrypto),/12 to 256/);
});
test('encrypted backup is available in offline app bundle and guarded by unlock',()=>{
 const a=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(a,/backup-encrypted-export/);assert.match(a,/backup-unlock-confirm/);
 assert.match(sw,/\/backupcrypto\.js/);assert.match(build,/'backupcrypto\.js'/);
});

test('encrypted backup limits UTF-8 bytes, not JavaScript code units',async()=>{
 const pass='a sufficiently strong secret phrase';
 const oversized='💜'.repeat(300000); // 600k UTF-16 units, 1.2 MB in UTF-8
 await assert.rejects(encryptBackup(oversized,pass,webcrypto),/too large/);
});
