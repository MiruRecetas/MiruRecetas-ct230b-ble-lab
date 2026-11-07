"use strict";
/* Revisión estructural: un motor y múltiples plantillas sin lógica TSPL propia. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..","ingredientes-v1");
const read=n=>fs.readFileSync(path.join(root,n),"utf8");
const M=require("../ingredientes-v1/motor-libre.js");
require("../ingredientes-v1/plantilla-pequena.js");
require("../ingredientes-v1/plantilla-compacta.js");
test("un motor compartido; solo plantillas pueden declarar geometría y normalización",()=>{
 const shared=read("motor-libre.js");
 for(const file of ["plantilla-pequena.js","plantilla-compacta.js"]){
  const content=read(file);
  assert.match(content,/M\.register\(/);
  assert.doesNotMatch(content,/function sparse\(|function build\(|function logo\(|function isoDate\(/);
  assert.doesNotMatch(content,/QRCODE|https:\/\/mirurecetas\.github\.io|v9Draw|V9_RECIPE/);
  assert.match(content,/require\("\.\/motor-libre\.js"\)/);
 }
 assert.match(shared,/function sparse\(/);
 assert.match(shared,/function build\(/);
 assert.match(shared,/function logo\(/);
 assert.equal(M.forFormat("ingredient"),M.forFormat("ingredient"));
 assert.equal(M.forFormat("component"),M.forFormat("component"));
 assert.throws(()=>M.forFormat("vertical"),/desconocido/);
});
test("ambas plantillas comparten controles de fecha pero mantienen contratos propios",()=>{
 const small=M.forFormat("ingredient"),compact=M.forFormat("component");
 assert.deepEqual([small.width,small.height,compact.width,compact.height],[354,236,590,354]);
 const p=small.normalize({name:"Chorizo",grams:"",packed:"2026-11-07",expiry:"",mode:"other",notesEnabled:true,note:""});
 assert.equal(p.packed,"07/11/26");assert.equal(p.expiry,"--/--/--");assert.equal(p.grams,null);
 const c=compact.normalize({name:"Pisto",packed:"2026-11-07",expiry:"",kcal:"",protein:"",carbs:"",fat:""});
 assert.equal(c.expiry,"--/--/--");
 assert.equal(c.kcal,null);assert.equal(c.protein,null);
 assert.equal("grams" in c,false);
});
function sampleCanvas(width,height){
 const pixels=new Uint8ClampedArray(width*height*4);pixels.fill(255);
 for(const [x,y] of [[9,10],[width-24,height-18]]){
  for(let row=y;row<y+6;row++)for(let col=x;col<x+12;col++){
   const at=(row*width+col)*4;pixels[at]=pixels[at+1]=pixels[at+2]=0;
  }
 }
 return {width,height,getContext:()=>({getImageData:()=>({data:pixels})})};
}
test("mismo raster y constructor TSPL 1 bit para Pequeña y Compacta",()=>{
 for(const [id,size,width,height] of [
  ["ingredient","30 mm,20 mm",354,236],
  ["component","50 mm,30 mm",590,354]
 ]){
  const label=M.forFormat(id),canvas=sampleCanvas(width,height),blocks=label.sparse(canvas);
  assert.ok(blocks.length>=2);
  assert.ok(blocks.every(b=>b.height<=12&&b.y+b.height<=height&&b.x+b.widthBytes*8<=width+7));
  const a=label.build(canvas,1),b=label.build(canvas,2);
  const cmd1=Buffer.from(a.job).toString("latin1");
  const cmd2=Buffer.from(b.job).toString("latin1");
  assert.ok(cmd1.startsWith("SIZE "+size+"\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n"));
  assert.ok(cmd1.endsWith("PRINT 1,1\r\n"));
  assert.ok(cmd2.endsWith("PRINT 1,2\r\n"));
  assert.doesNotMatch(cmd1,/QRCODE/);assert.doesNotMatch(cmd2,/QRCODE/);
  assert.equal(a.bytes,b.bytes);
  assert.deepEqual(Buffer.from(a.job.subarray(0,-11)),Buffer.from(b.job.subarray(0,-11)));
  assert.throws(()=>label.build(canvas,21),/copias/);
 }
});
test("orquestación de un único motor cargado antes de las dos plantillas",()=>{
 const html=read("index.html"),app=read("app.js");
 const s=html.indexOf('src="./motor-libre.js'),p=html.indexOf('src="./plantilla-pequena.js'),
  c=html.indexOf('src="./plantilla-compacta.js'),a=html.indexOf('src="./app.js');
 assert.ok(s>0&&p>s&&c>p&&a>c);
 assert.equal((html.match(/src="\.\/motor-libre\.js/g)||[]).length,1);
 assert.doesNotMatch(html,/src="\.\/(?:engine|compacta-engine)\.js/);
 assert.match(app,/Motor\.forFormat\("ingredient"\)/);
 assert.match(app,/Motor\.forFormat\("component"\)/);
 assert.doesNotMatch(app,/MiruIngredient|MiruCompactFree/);
});
