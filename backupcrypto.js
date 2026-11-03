/** Optional, entirely local encrypted backup. Never store passphrases. */
export const ENCRYPTED_FORMAT='xyra-atlas-encrypted-backup';
const rounds=250000;
function b64(bytes){let s='';for(const n of bytes)s+=String.fromCharCode(n);return btoa(s);}
function un64(str,max){
 if(typeof str!=='string'||str.length>Math.ceil(max*4/3)+8||!/^[A-Za-z0-9+/]*={0,2}$/.test(str))throw Error('Invalid encrypted backup encoding.');
 let raw;try{raw=atob(str);}catch{throw Error('Invalid encrypted backup encoding.');}
 if(raw.length>max)throw Error('Encrypted backup is too large.');
 return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
export function isEncryptedBackup(x){return Boolean(x&&typeof x==='object'&&!Array.isArray(x)&&x.format===ENCRYPTED_FORMAT);}
async function keyFor(pass,salt,crypto){
 const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:rounds,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function encryptBackup(plain,pass,crypto=globalThis.crypto){
 if(typeof pass!=='string'||pass.length<12||pass.length>256)throw Error('Passphrase must be 12 to 256 characters.');
 if(typeof plain!=='string'||plain.length>1048576)throw Error('Backup is too large.');
 if(!crypto?.subtle||!crypto?.getRandomValues)throw Error('Secure browser encryption is unavailable.');
 const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
 const key=await keyFor(pass,salt,crypto);
 const ciphertext=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(plain)));
 return JSON.stringify({format:ENCRYPTED_FORMAT,version:1,kdf:'PBKDF2-SHA256',iterations:rounds,cipher:'AES-256-GCM',salt:b64(salt),iv:b64(iv),ciphertext:b64(ciphertext)},null,2);
}
export async function decryptBackup(data,pass,crypto=globalThis.crypto){
 if(!isEncryptedBackup(data)||data.version!==1||data.kdf!=='PBKDF2-SHA256'||data.cipher!=='AES-256-GCM'||data.iterations!==rounds)throw Error('Unsupported encrypted backup.');
 if(!crypto?.subtle||!pass)throw Error('Passphrase or secure crypto unavailable.');
 const salt=un64(data.salt,16),iv=un64(data.iv,12),ciphertext=un64(data.ciphertext,1048592);
 if(salt.length!==16||iv.length!==12||ciphertext.length<16)throw Error('Encrypted backup is incomplete.');
 try{const key=await keyFor(pass,salt,crypto);
 return new TextDecoder('utf-8',{fatal:true}).decode(await crypto.subtle.decrypt({name:'AES-GCM',iv},key,ciphertext));}
 catch{throw Error('Incorrect passphrase or damaged backup.');}
}
