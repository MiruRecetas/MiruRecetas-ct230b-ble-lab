"use strict";
/* Pruebas aisladas del futuro panel Conserva, ejecutables con:
   node --test tests/ingredientes-v1.test.cjs
   No requieren impresora ni red. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const base=path.resolve(__dirname,"../ingredientes-v1");
const engine=require(path.join(base,"engine.js"));
const source=name=>fs.readFileSync(path.join(base,name),"utf8");
const sample={name:"Carne Picada",grams:500,packed:"2026-11-04",expiry:"2027-01-04"};

test("V0.8: dimensiones y contrato de gramos/fecha",()=>{
 assert.equal(engine.width,354);
 assert.equal(engine.height,236);
 assert.equal(engine.maxBytes,35000);
 assert.deepEqual(engine.normalize(sample),{
  name:"Carne Picada",grams:500,packed:"04/11/26",expiry:"04/01/27"
 });
});
test("fechas válidas y no autocalculadas",()=>{
 assert.throws(()=>engine.normalize({...sample,expiry:""}),/dos fechas/);
 assert.throws(()=>engine.normalize({...sample,expiry:"2026-10-31"}),/anterior/);
 assert.throws(()=>engine.normalize({...sample,packed:"2026-02-30"}),/calendario/);
 assert.throws(()=>engine.normalize({...sample,packed:"2025-13-04"}),/calendario/);
 assert.equal(engine.normalize({...sample,expiry:""},false).expiry,"__/__/__");
});
test("límites de nombre y cantidad",()=>{
 for(const bad of [
  {...sample,name:""},{...sample,name:"x".repeat(56)},
  {...sample,name:"<script>alert(1)</script>"},
  {...sample,grams:0},{...sample,grams:10000},
  {...sample,grams:12.5},{...sample,grams:"1e3"}
 ])assert.throws(()=>engine.normalize(bad));
 assert.equal(engine.normalize({...sample,grams:"9999"}).grams,9999);
});
function rasterFixture(){
 const pixels=new Uint8ClampedArray(engine.width*engine.height*4);
 pixels.fill(255);
 // Dos zonas negras, distantes para forzar dos bandas raster.
 for(const [y0,y1,x0,x1] of [[9,20,8,42],[137,149,260,310]]){
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
   const i=(y*engine.width+x)*4;
   pixels[i]=pixels[i+1]=pixels[i+2]=0;
  }
 }
 return {width:engine.width,height:engine.height,
  getContext:()=>({getImageData:()=>({data:pixels})})};
}
test("raster en bandas ≤12 y dentro de 30 × 20",()=>{
 const blocks=engine.sparse(rasterFixture());
 assert.ok(blocks.length>=2);
 for(const b of blocks){
  assert.ok(b.height>0&&b.height<=12);
  assert.ok(b.x>=0&&b.y>=0);
  assert.ok(b.x+b.widthBytes*8<=engine.width+7);
  assert.ok(b.y+b.height<=engine.height);
  assert.equal(b.bytes.length,b.widthBytes*b.height);
 }
});
test("TSPL único, impresión de una copia y ausencia de QR",()=>{
 const result=engine.build(rasterFixture());
 const bytes=result.job,text=new TextDecoder("latin1").decode(bytes);
 assert.ok(text.startsWith("SIZE 30 mm,20 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n"));
 assert.ok(text.endsWith("PRINT 1,1\r\n"));
 assert.equal(text.split("PRINT 1,1\r\n").length-1,1);
 assert.doesNotMatch(text,/QRCODE|PRINT 1,[2-9]/);
 assert.ok(result.bytes<35000);
 assert.equal(result.fragments,Math.ceil(result.bytes/20));
});
test("página autónoma, campos y archivos enlazados",()=>{
 const html=source("index.html"),app=source("app.js"),css=source("style.css");
 for(const id of ["name","grams","packed","expiry","preview","metrics","design-status",
   "connection","connect","disconnect","confirm-paper","print","progress","copy","clear","log"])
  assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/src="\.\/engine\.js"/);
 assert.match(html,/src="\.\/app\.js"/);
 assert.match(html,/href="\.\/style\.css"/);
 assert.match(html,/src="\.\.\/assets\/isotipo-bn\.svg"/);
 assert.match(app,/E\.logo\("\.\.\/assets\/isotipo-bn\.svg"\)/);
 assert.match(css,/--sage:/);
 assert.doesNotMatch(app,/QRCODE|fetch\s*\(|localStorage|sessionStorage/);
});

test("cabecera interior canónica MiruRecetas en página de ingredientes",()=>{
 const html=source("index.html"),css=source("cabecera.css"),js=source("cabecera.js");
 assert.equal((html.match(/<header\\s/g)||[]).length,1);
 assert.match(html,/class="miru-header miru-header--interior" data-miru-header="interior"/);
 assert.doesNotMatch(html,/class="site-header"|class="miru-header--hero"/);
 assert.equal((html.match(/class="miru-trigger"/g)||[]).length,3);
 assert.equal((html.match(/class="miru-panel"/g)||[]).length,3);
 assert.equal((html.match(/<path id="pieza-/g)||[]).length,6);
 assert.match(html,/aria-label="MiruRecetas — ir a la portada"/);
 for(const [label,path] of [["Explorar recetas","recetario/"],["Menús de temporada","planificador/"],["Listas de la compra","planificador/"]]){
  assert.ok(html.includes(label));
  assert.ok(html.includes('href="https://mirurecetas.github.io/menu-anual-recetas/'+path+'"'));
 }
 assert.match(html,/href="\\.\\/cabecera\\.css"/);
 assert.match(html,/src="\\.\\/cabecera\\.js" defer/);
 assert.match(css,/\\.miru-header--interior/);
 assert.match(css,/position:sticky/);
 assert.match(js,/aria-expanded/);
 assert.match(js,/Escape/);
 assert.match(html,/class="miru-install" data-miru-install[^>]*hidden/);
 assert.doesNotMatch(source("style.css"),/\\.site-header[ {]/);
});
