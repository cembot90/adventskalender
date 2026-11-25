// Baut index.html: verschluesselt names.json mit dem Passwort (AES-256-GCM, PBKDF2-SHA256).
// Aufruf: ADVENT_PW='geheim' node build/build.js
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const pw=process.env.ADVENT_PW; if(!pw){console.error('ADVENT_PW fehlt');process.exit(1);}
const dir=__dirname, data=fs.readFileSync(path.join(dir,'names.json'),'utf8'); JSON.parse(data);
const ITER=600000, salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(pw.normalize('NFC'),salt,ITER,32,'sha256');
const c=crypto.createCipheriv('aes-256-gcm',key,iv);
const ct=Buffer.concat([c.update(data,'utf8'),c.final(),c.getAuthTag()]);
const payload=JSON.stringify({n:ITER,s:salt.toString('base64'),i:iv.toString('base64'),c:ct.toString('base64')});
const tpl=fs.readFileSync(path.join(dir,'template.html'),'utf8');
if(!tpl.includes('/*__PAYLOAD__*/null'))throw new Error('Platzhalter fehlt');
fs.writeFileSync(path.join(dir,'..','index.html'),tpl.replace('/*__PAYLOAD__*/null',payload));
console.log('index.html gebaut,',ct.length,'Bytes verschluesselt');
