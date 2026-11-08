"use strict";
/* Pruebas aisladas del futuro panel Conserva, ejecutables con:
   node --test tests/ingredientes-v1.test.cjs
   No requieren impresora ni red. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const base=path.resolve(__dirname,"../ingredientes-v1");
const motor=require(path.join(base,"motor-libre.js"));
require(path.join(base,"plantilla-pequena.js"));
require(path.join(base,"plantilla-compacta.js"));
const engine=motor.forFormat("ingredient");
const source=name=>fs.readFileSync(path.join(base,name),"utf8");
const sample={name:"Carne Picada",grams:500,packed:"2026-11-04",expiry:"2027-01-04"};

test("V0.8: dimensiones y contrato de gramos/fecha",()=>{
 assert.equal(engine.width,354);
 assert.equal(engine.height,236);
 assert.equal(engine.maxBytes,35000);
 assert.deepEqual(engine.normalize(sample),{
  name:"Carne Picada",grams:500,mode:"freeze",note:"",notesEnabled:false,packed:"04/11/26",expiry:"04/01/27"
 });
});
test("fechas válidas y no autocalculadas",()=>{
 assert.equal(engine.normalize({...sample,expiry:""}).expiry,"--/--/--");
 assert.throws(()=>engine.normalize({...sample,packed:""}),/fecha de envasado/);
 assert.throws(()=>engine.normalize({...sample,expiry:"2026-10-31"}),/anterior/);
 assert.throws(()=>engine.normalize({...sample,packed:"2026-02-30"}),/calendario/);
 assert.throws(()=>engine.normalize({...sample,packed:"2025-13-04"}),/calendario/);
 assert.equal(engine.normalize({...sample,packed:""},false).packed,"--/--/--");
});
test("límites de nombre y cantidad",()=>{
 for(const bad of [
  {...sample,name:""},{...sample,name:"x".repeat(56)},
  {...sample,name:"<script>alert(1)</script>"},
  {...sample,grams:0},{...sample,grams:10000},
  {...sample,grams:12.5},{...sample,grams:"1e3"}
 ])assert.throws(()=>engine.normalize(bad));
 assert.equal(engine.normalize({...sample,grams:"9999"}).grams,9999);
 assert.equal(engine.normalize({...sample,grams:""}).grams,null);
 assert.equal(engine.normalize({...sample,grams:null}).grams,null);
 assert.equal(engine.normalize({...sample,mode:"fridge"}).mode,"fridge");
 assert.equal(engine.normalize({...sample,mode:"other"}).mode,"other");
 assert.equal(engine.normalize({...sample,footer:"fridge"}).note,"Conservar en nevera");
 assert.deepEqual(engine.normalize({...sample,notesEnabled:true,note:"Conservar en nevera"}).note,"Conservar en nevera");
 assert.equal(engine.normalize({...sample,notesEnabled:false,note:"Mi texto"}).note,"");
 assert.equal(engine.normalize({...sample,notesEnabled:true,note:""}).note,"");
 assert.equal(engine.normalize({...sample,mode:"other",notesEnabled:true,note:""}).notesEnabled,true);
 assert.throws(()=>engine.normalize({...sample,notesEnabled:true,note:"X".repeat(33)}),/32 caracteres/);
 assert.throws(()=>engine.normalize({...sample,notesEnabled:true,note:"Mal<texto>"}),/nota no es válida/);
 assert.throws(()=>engine.normalize({...sample,mode:"invented"}),/Tipo/);
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
test("rótulo de fecha cambia en los tres modos y admite pie vacío",()=>{
 const original=globalThis.document;
 let lines=[];
 globalThis.document={createElement:()=>{
  const ctx={
   fillRect(){},drawImage(){},fillText(t){lines.push(String(t));},
   measureText(t){return {width:String(t).length*8}},
   set font(v){this._font=v},get font(){return this._font},
   fillStyle:"",textBaseline:"",textAlign:""
  };
  return {width:0,height:0,getContext:()=>ctx};
 }};
 try{
  for(const [mode,label,note] of [
   ["fridge","Envasado","Conservar en nevera"],
   ["freeze","Envasado y congelación","Descongelar en nevera"],
   ["other","Conservación",""]
  ]){
   lines=[];
   const data=engine.normalize({...sample,mode,note,notesEnabled:true});
   const result=engine.render(data,{});
   assert.equal(result.width,354);assert.equal(result.height,236);
   assert.ok(lines.includes(label),"no aparece el rótulo "+label);
   assert.equal(lines.includes(note),Boolean(note));
   if(mode==="other")assert.ok(!lines.includes("Envasado"));
  }
 }finally{globalThis.document=original;}
});

test("cantidad centrada no invade el isotipo para 1, 500 y 9999 g",()=>{
 const original=globalThis.document;
 const label=[];
 globalThis.document={createElement:()=>{
  const ctx={
   font:"",textAlign:"left",textBaseline:"alphabetic",
   fillRect(){},
   drawImage(img,x,y,w,h){label.push({type:"isotipo",x,y,w,h});},
   measureText(t){
    // Mock tipográfico conservador: los límites deben seguir siendo
    // correctos con el ancho real que devuelva Canvas en Android.
    const size=Number(this.font.match(/(\\d+)px/)?.[1]||17);
    return {width:String(t).length*size*0.65};
   },
   fillText(t,x,y){
    const size=Number(this.font.match(/(\\d+)px/)?.[1]||17);
    label.push({type:"texto",text:String(t),x,y,align:this.textAlign,
     width:this.measureText(t).width,size});
   }
  };
  return {width:0,height:0,getContext:()=>ctx};
 }};
 try{
  for(const grams of [1,500,9999]){
   label.length=0;
   const data=engine.normalize({...sample,name:"Patata",grams,mode:"fridge"},true);
   engine.render(data,{});
   const amount=label.find(x=>x.type==="texto"&&x.text===grams+" g");
   const logo=label.find(x=>x.type==="isotipo");
   assert.ok(amount&&logo);
   assert.equal(amount.align,"center","M.fit debe recibir align=center");
   assert.equal(amount.x,128);
   assert.equal(logo.x,268);
   assert.ok(amount.width<=240,"debe ajustar texto al ancho disponible");
   const left=amount.x-amount.width/2,right=amount.x+amount.width/2;
   assert.ok(left>=8,"no invadir el margen izquierdo");
   assert.ok(right<=logo.x-20,"separar 20 puntos del isotipo");
   assert.ok(amount.size>=32&&amount.size<=55);
  }
 }finally{globalThis.document=original;}
});

test("nota centrada en área libre; no invade isotipo ni sale del borde",()=>{
 const original=globalThis.document;
 const draws=[];
 globalThis.document={createElement:()=>({
  width:0,height:0,getContext:()=>({
   font:"",textAlign:"left",fillStyle:"",textBaseline:"alphabetic",
   fillRect(){},drawImage(_image,x,y,w,h){draws.push({type:"logo",x,y,w,h});},
   measureText(text){
    const px=Number(this.font.match(/(\\d+)px/)?.[1]||16);
    return {width:String(text).length*px*0.56};
   },
   fillText(text,x,y){
    draws.push({type:"text",text:String(text),x,y,align:this.textAlign,
     width:this.measureText(text).width,font:this.font});
   }
  })
 })};
 try{
  for(const note of ["Conservar en nevera","Descongelar en nevera",
   "Descongelar en nevera prueba pru"]){
   draws.length=0;
   const sampleNote=engine.normalize({...sample,grams:500,notesEnabled:true,note},true);
   engine.render(sampleNote,{});
   const line=draws.find(x=>x.type==="text"&&x.text===note);
   const logo=draws.find(x=>x.type==="logo");
   assert.ok(line&&logo,"deben dibujarse nota e isotipo");
   assert.equal(line.align,"center","la nota debe pedir centrado a M.fit");
   assert.equal(line.x,128);
   assert.equal(line.y,227);
   assert.ok(line.width<=240,"ancho de nota no mayor que la zona libre");
   assert.ok(line.x-line.width/2>=8,"la nota no cruza el margen izquierdo");
   assert.ok(line.x+line.width/2<=logo.x-20,"la nota no invade el isotipo");
   assert.equal(logo.x,268);
  }
  draws.length=0;
  engine.render(engine.normalize({...sample,grams:500,notesEnabled:false,note:"Ignorada"},true),{});
  assert.ok(!draws.some(x=>x.text==="Ignorada"),"se respeta ocultar la nota");
 }finally{globalThis.document=original;}
});

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
test("TSPL: un trabajo y copias 1–20, sin QR ni retransmisiones",()=>{
 const result=engine.build(rasterFixture());
 const bytes=result.job,text=new TextDecoder("latin1").decode(bytes);
 assert.ok(text.startsWith("SIZE 30 mm,20 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n"));
 assert.ok(text.endsWith("PRINT 1,1\r\n"));
 assert.equal(text.split("PRINT 1,1\r\n").length-1,1);
 assert.doesNotMatch(text,/QRCODE|PRINT 1,[2-9]/);
 for(const count of [2,6,20]){
  const multiple=engine.build(rasterFixture(),count);
  const cmd=new TextDecoder("latin1").decode(multiple.job);
  assert.ok(cmd.endsWith("PRINT 1,"+count+"\r\n"));
  assert.equal(multiple.copies,count);
  assert.equal(cmd.split("PRINT 1,").length-1,1);
 }
 for(const bad of [-1,0,1.5,21,NaN,"2"])assert.throws(()=>engine.build(rasterFixture(),bad),/copias/);
 assert.ok(result.bytes<35000);
 assert.equal(result.fragments,Math.ceil(result.bytes/20));
});
test("página autónoma, campos y archivos enlazados",()=>{
 const html=source("index.html"),app=source("app.js"),css=source("style.css");
 for(const id of ["name","grams","packed","expiry","preview","metrics","design-status",
   "connection","connect","disconnect","confirm-paper","print","progress","copy","clear","log",
   "mode","note","notes-enabled","copies-minus","copies-plus","copies","transport","transport-count","transport-percent","progress-fill"])
  assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/src="\.\/motor-libre\.js\?v=20261108-raster-regiones-v1"/);
 assert.match(html,/src="\.\/plantilla-pequena\.js\?v=20261108-nota-centrada-v4"/);
 assert.match(html,/src="\.\/app\.js\?v=20261108-banco-correcciones-v2"/);
 assert.match(html,/src="\.\/plantilla-compacta\.js\?v=20261108-compacta-qa2"/);
 assert.match(html,/src="\.\/plantilla-amplia\.js\?v=20261108-amplia-b-v2"/);
 assert.match(html,/href="\.\/style\.css\?v=20261108-banco-correcciones-v2"/);
 assert.ok(html.includes('class="miru-isotipo"'));
 assert.match(app,/E\.logo\("\.\.\/assets\/isotipo-bn\.svg"\)/);
 assert.match(css,/--sage:/);
 assert.match(css,/#b96c4a/);
 assert.match(app,/progress\(done,total,"complete"\)/);
 assert.match(app,/work=motor.build\(motor.render\(d,logo\),copies\)/);
 assert.match(app,/noteDefaults=\{fridge:"Conservar en nevera",freeze:"Descongelar en nevera",pantry:"",preserve:"",other:""\}/);
 assert.match(html,/maxlength="32"/);
 assert.match(html,/id="notes-enabled" type="checkbox" checked/);
 assert.doesNotMatch(app,/QRCODE|fetch\s*\(|localStorage|sessionStorage/);
});


test("Mis etiquetas: selector único de formato vinculado a los tres pasos",()=>{
 const html=source("index.html"),app=source("app.js"),css=source("style.css");
 assert.ok(html.indexOf('class="card format-card"')>html.indexOf('<main class="page">'));
 assert.ok(html.indexOf('class="card format-card"')<html.indexOf('id="data-step"'));
 assert.equal(html.split('data-label-format').length-1,3);
 for(const format of ["horizontal","component","ingredient"])
  assert.match(html,new RegExp('value="'+format+'" data-label-format'));
 assert.match(html,/value="ingredient" data-label-format checked/);
 for(const id of ["ingredient-fields","compact-fields","wide-fields",
  "ingredient-preview","compact-preview","wide-preview","ingredient-print",
  "data-step","print-step","format-heading","data-heading","device-heading"]){
  assert.match(html,new RegExp('id="'+id+'"'));
 }
 assert.doesNotMatch(app,/selectedFormat==="horizontal"\|\|busy/);
 assert.match(app,/active=ingredient\|\|compact\|\|wide/);
 assert.match(app,/selectedFormat==="horizontal"\?aReady/);
 assert.match(app,/function changeFormat\(format\)/);
 assert.match(app,/\+\+refreshSeq/);
 assert.match(css,/\.format-option input:checked/);
 assert.ok(!html.includes('value="vertical" data-label-format'));
 assert.equal(html.split('class="format-icon"').length-1,4);
 for(const label of ["Amplia","Compacta","Pequeña","Más formatos"])
  assert.ok(html.includes("<strong>"+label+"</strong>"));
 for(const dimension of ["50 × 80 mm","50 × 30 mm","30 × 20 mm"])
  assert.ok(html.includes("<span>"+dimension+"</span>"));
 assert.ok(!html.includes("En desarrollo</small>"));
 assert.ok(!html.includes("Disponible para imprimir"));
 assert.ok(html.includes("<span>Próximamente</span>"));
 assert.match(css,/grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
 assert.ok(!css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));

});

test("cabecera interior canónica MiruRecetas en página de ingredientes",()=>{
 const html=source("index.html"),css=source("cabecera.css"),js=source("cabecera.js");
 assert.equal(html.split("<header ").length-1,1);
 assert.ok(html.includes('class="miru-header miru-header--interior" data-miru-header="interior"'));
 assert.ok(!html.includes('class="site-header"')&&!html.includes('miru-header--hero'));
 assert.equal(html.split('class="miru-trigger"').length-1,3);
 assert.equal(html.split('class="miru-panel"').length-1,3);
 assert.equal(html.split('<path id="pieza-').length-1,6);
 assert.ok(html.includes('aria-label="MiruRecetas — ir a la portada"'));
 for(const [label,path] of [["Explorar recetas","recetario/"],["Menús de temporada","planificador/"],["Listas de la compra","planificador/"]]){
  assert.ok(html.includes(label));
  assert.ok(html.includes('href="https://mirurecetas.github.io/menu-anual-recetas/'+path+'"'));
 }
 assert.ok(html.includes('href="./cabecera.css"'));
 assert.ok(html.includes('src="./cabecera.js" defer'));
 assert.ok(css.includes(".miru-header--interior"));
 assert.ok(css.includes("position:sticky"));
 assert.ok(js.includes("aria-expanded"));
 assert.ok(js.includes("Escape"));
 assert.ok(html.includes('class="miru-install" data-miru-install aria-label="Instalar MiruRecetas" hidden'));
 assert.ok(!source("style.css").includes(".site-header"));
});
