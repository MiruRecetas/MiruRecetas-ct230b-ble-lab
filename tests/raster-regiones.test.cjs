"use strict";
/* Parcelación dispersa v0.6.2 adaptada a motor libre. Verificación exacta:
 * los bytes TSPL se reconstruyen, no basta con comparar tamaños.
 * No requiere conexión BLE ni cambia plantillas históricas.
 */
const test=require("node:test");
const assert=require("node:assert/strict");
const M=require("../ingredientes-v1/motor-libre.js");
require("../ingredientes-v1/plantilla-pequena.js");
require("../ingredientes-v1/plantilla-compacta.js");
require("../ingredientes-v1/plantilla-amplia.js");

function canvas(width,height,paint=()=>{}){
 const data=new Uint8ClampedArray(width*height*4);data.fill(255);
 const ink=(x,y,shade=0)=>{
  if(x<0||y<0||x>=width||y>=height)return;
  const at=(y*width+x)*4;
  data[at]=data[at+1]=data[at+2]=shade;
 };
 const rect=(x,y,w,h,shade=0)=>{
  for(let yy=Math.max(0,y);yy<Math.min(height,y+h);yy++)
   for(let xx=Math.max(0,x);xx<Math.min(width,x+w);xx++)ink(xx,yy,shade);
 };
 paint({ink,rect,width,height});
 return {width,height,data,
  getContext(){return {getImageData:()=>({data})};}
 };
}
function oneBit(source){
 const {width:W,height:H,data:pixels}=source,stride=Math.ceil(W/8),
  bytes=new Uint8Array(stride*H);bytes.fill(255);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const at=(y*W+x)*4;
  if(.2126*pixels[at]+.7152*pixels[at+1]+.0722*pixels[at+2]<150)
   bytes[y*stride+(x>>3)]&=~(0x80>>(x&7));
 }
 return bytes;
}
function oldSize(source,paper,copies=1){
 const {width:W,height:H}=source,stride=Math.ceil(W/8),raw=oneBit(source);
 let total=Buffer.byteLength("SIZE "+paper+"\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n","ascii")
  +Buffer.byteLength("PRINT 1,"+copies+"\r\n","ascii"),count=0;
 for(let y=0;y<H;y+=12){
  let minX=stride,maxX=-1,minY=H,maxY=-1;
  for(let iy=y;iy<Math.min(H,y+12);iy++)for(let ix=0;ix<stride;ix++){
   if(raw[iy*stride+ix]===255)continue;
   minX=Math.min(minX,ix);maxX=Math.max(maxX,ix);
   minY=Math.min(minY,iy);maxY=Math.max(maxY,iy);
  }
  if(maxX<0)continue;
  const w=maxX-minX+1,h=maxY-minY+1;
  total+=Buffer.byteLength("BITMAP "+minX*8+","+minY+","+w+","+h+",0,","ascii")+w*h+2;count++;
 }
 return {bytes:total,tiles:count};
}
function parseTSPL(job,W,H,copies){
 const prefix=Buffer.from("SIZE "+(W===354?"30 mm,20 mm":H===354?"50 mm,30 mm":"50 mm,80 mm")+
  "\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n","ascii");
 const output=new Uint8Array(Math.ceil(W/8)*H);output.fill(255);
 const seen=new Uint8Array(output.length);
 assert.deepEqual(Buffer.from(job.subarray(0,prefix.length)),prefix);
 let offset=prefix.length,count=0;
 const readByte=()=>job[offset++];
 while(offset<job.length){
  const next=Buffer.from(job.subarray(offset,offset+6)).toString("ascii");
  if(next==="PRINT ")break;
  let header="",commas=0;
  while(commas<5&&offset<job.length){
   const ch=String.fromCharCode(readByte());header+=ch;
   if(ch===",")commas++;
  }
  const match=/^BITMAP (\d+),(\d+),(\d+),(\d+),0,$/.exec(header);
  assert.ok(match,"Cabecera TSPL ilegible: "+header);
  const [x,y,w,h]=match.slice(1).map(Number);
  assert.equal(x%8,0);assert.ok(h>0&&h<=12);
  assert.ok(x>=0&&x+w*8<=W+7&&y>=0&&y+h<=H);
  const payload=job.subarray(offset,offset+w*h);offset+=w*h;
  assert.equal(payload.length,w*h);
  assert.deepEqual(Array.from(job.subarray(offset,offset+2)),[13,10]);offset+=2;
  for(let row=0;row<h;row++)for(let col=0;col<w;col++){
   const at=(y+row)*Math.ceil(W/8)+(x>>3)+col;
   assert.equal(seen[at],0,"Los BITMAP no deben solaparse");
   seen[at]=1;output[at]=payload[row*w+col];
  }
  count++;
 }
 assert.equal(Buffer.from(job.subarray(offset)).toString("ascii"),"PRINT 1,"+copies+"\r\n");
 return {bytes:output,tiles:count};
}
const formats=[
 ["ingredient",354,236,"30 mm,20 mm"],
 ["component",590,354,"50 mm,30 mm"],
 ["horizontal",590,945,"50 mm,80 mm"]
];
function check(id,cv,paper,copies=1){
 const M0=M.forFormat(id),raw=oneBit(cv),old=oldSize(cv,paper,copies);
 const tiles=M0.sparse(cv);
 const result=M0.build(cv,copies);
 const decoded=parseTSPL(result.job,cv.width,cv.height,copies);
 assert.deepEqual(Buffer.from(decoded.bytes),Buffer.from(raw),"Raster no idéntico bit a bit");
 assert.equal(decoded.tiles,tiles.length);
 assert.equal(result.bytes,result.job.length);
 assert.equal(result.baselineBytes,old.bytes,"El peso anterior debe medirse exactamente");
 assert.equal(result.baselineTiles,old.tiles);
 assert.equal(result.savedBytes,old.bytes-result.bytes);
 assert.ok(result.bytes<=old.bytes,"La optimización no puede aumentar bytes");
 assert.ok(result.tiles<=Math.ceil(cv.height/12)*6,"Límite de regiones por banda");
 assert.equal(result.fragments,Math.ceil(result.bytes/20));
 return result;
}
test("Los tres formatos reducen blancos interiores, conservando cada píxel",()=>{
 for(const [id,W,H,paper] of formats){
  const cv=canvas(W,H,({rect})=>{
   for(let y=15;y<H-15;y+=37){
    rect(11,y,Math.min(88,W/3),8);
    rect(W-101,y+2,78,6);
   }
  });
  const job=check(id,cv,paper);
  assert.ok(job.savedBytes>0,id+" no redujo bytes");
  assert.ok(job.tiles>job.baselineTiles,"Debería haber sub-bandas");
 }
});
test("Las bandas llenas de negro no empeoran el tamaño (coste TSPL incluido)",()=>{
 for(const [id,W,H,paper] of formats){
  const cv=canvas(W,H,({rect})=>{rect(0,20,W,4);rect(0,H-35,W,3)});
  const job=check(id,cv,paper);
  assert.equal(job.bytes,job.baselineBytes);
  assert.equal(job.tiles,job.baselineTiles);
 }
});
test("Etiquetas vacías, bordes de 8 bits y umbral 1 bpp se preservan",()=>{
 for(const [id,W,H,paper] of formats){
  const white=check(id,canvas(W,H),paper);
  assert.equal(white.tiles,0);assert.equal(white.savedBytes,0);
  const dots=canvas(W,H,({ink})=>{
   ink(0,0);ink(W-1,H-1);ink(8,11,149);ink(16,23,150);
  });
  check(id,dots,paper,2);
 }
});
test("Tinta desfasada por filas y subzonas sin solapamiento raster",()=>{
 for(const [id,W,H,paper] of formats){
  const cv=canvas(W,H,({rect})=>{
   for(let y=1;y<H-10;y+=12){
    rect(15,y,72,2);
    rect(W-82,y+8,55,2);
   }
  });
  const job=check(id,cv,paper);
  assert.ok(job.savedBytes>0);
 }
});
test("Patrones de regiones aleatorias reproducibles para los tres formatos",()=>{
 for(const [id,W,H,paper] of formats)for(let seed=1;seed<=5;seed++){
  let state=(seed*0x9e3779b1)>>>0;
  const rand=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state;};
  const cv=canvas(W,H,({rect})=>{
   for(let n=0;n<75;n++){
    const x=rand()%W,y=rand()%H,w=1+rand()%23,h=1+rand()%10;
    rect(x,y,w,h);
   }
  });
  check(id,cv,paper);
 }
});
test("Sigue bloqueando trabajos grandes sin subir el límite de 35 KB",()=>{
 const cv=canvas(590,945,({rect})=>rect(0,0,590,945));
 assert.throws(()=>M.forFormat("horizontal").build(cv,1),
  /Trabajo demasiado grande \(\d+ bytes; antes de optimizar: \d+ bytes\)/);
 assert.equal(M.forFormat("horizontal").maxBytes,35000);
});
test("La optimización conserva PRINT 1,n y no altera multicopia ni formato",()=>{
 for(const [id,W,H,paper] of formats){
  const cv=canvas(W,H,({rect})=>{rect(30,40,30,4);rect(W-55,42,30,4)});
  const one=check(id,cv,paper,1),two=check(id,cv,paper,2);
  assert.equal(one.bytes,two.bytes);
  assert.equal(one.baselineBytes,two.baselineBytes);
  assert.deepEqual(Buffer.from(one.job.subarray(0,-11)),Buffer.from(two.job.subarray(0,-11)));
 }
});
