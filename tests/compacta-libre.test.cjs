"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const motor=require("../ingredientes-v1/motor-libre.js");
require("../ingredientes-v1/plantilla-pequena.js");
require("../ingredientes-v1/plantilla-compacta.js");
const C=motor.forFormat("component");
const read=p=>fs.readFileSync(path.join(__dirname,"..","ingredientes-v1",p),"utf8");
const example={name:"Pisto",mode:"freeze",packed:"2026-11-07",expiry:"",
 kcal:"164,35",protein:"5,69",carbs:"18,58",fat:"7,84",
 instruction:"Descongelar en nevera. Recalentar tapado o en sartén",
 note:"La textura puede variar al congelar.",showNutrition:true,showInstruction:true,showNote:true};
test("motor libre es propio y no importa V0.9 ni web productiva",()=>{
 const src=read("plantilla-compacta.js");
 assert.doesNotMatch(src,/v9Draw|V9_RECIPE|QRCODE\s|#r047|\/recetas\/pisto/);
 assert.match(src,/require\("\.\/motor-libre\.js"\)/);
 assert.equal(C.width,590);assert.equal(C.height,354);
});
test("fechas siempre visibles y consumo opcional",()=>{
 const d=C.normalize(example);
 assert.equal(d.packed,"07/11/26");assert.equal(d.expiry,"--/--/--");
 assert.throws(()=>C.normalize({...example,packed:""}),/obligatoria/);
 assert.throws(()=>C.normalize({...example,expiry:"2026-10-30"}),/anterior/);
 assert.equal(C.normalize({...example,packed:""},false).packed,"--/--/--");
});
test("campos nutricionales manuales admiten ausencia sin inventar cero",()=>{
 const d=C.normalize({...example,kcal:"",protein:"",carbs:"",fat:"",showNutrition:false});
 for(const field of ["kcal","protein","carbs","fat"])assert.equal(d[field],null);
 assert.equal(d.showNutrition,false);
 assert.equal(C.normalize(example).kcal,"164,35");
 assert.throws(()=>C.normalize({...example,kcal:"nan"}),/Kcal/);
 assert.throws(()=>C.normalize({...example,protein:"-2"}),/Proteínas/);
});
test("no hay gramos, QR ni raciones y los bloques pueden ocultarse",()=>{
 const d=C.normalize({...example,showNutrition:false,showInstruction:false,showNote:false});
 assert.equal(d.showNote,false);assert.equal(d.showInstruction,false);
 assert.equal("grams" in d,false);assert.equal("qr" in d,false);
 const html=read("index.html");
 assert.match(html,/id="c-name"/);assert.match(html,/id="c-nutrition-enabled"/);
 assert.match(html,/id="c-instruction-enabled"/);assert.match(html,/id="c-note-enabled"/);
 assert.match(html,/id="c-preview" width="590" height="354"/);
 assert.match(html,/src="\.\/plantilla-compacta\.js\?v=/);
});
test("vista previa es raster que entra al mismo generador TSPL; 1–20 copias",()=>{
 const old=globalThis.document,painted=[];
 const ctx={
  fillRect(...coords){painted.push(["rect",...coords])},drawImage(){},fillText(txt){painted.push(["text",txt])},
  measureText(txt){return {width:String(txt).length*9}},
  getImageData(){const bytes=new Uint8ClampedArray(590*354*4);bytes.fill(255);return {data:bytes}},
  fillStyle:"#000",textBaseline:"",textAlign:"",font:""
 };
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>ctx})};
 try{
  const canvas=C.render(C.normalize(example),{});
  assert.equal(canvas.width,590);assert.equal(canvas.height,354);
  assert.ok(painted.some(x=>x[1]==="Pisto"));
  assert.ok(painted.some(x=>x[1]==="Envasado y congelación"));
  assert.ok(painted.some(x=>x[1]==="--/--/--"));
  for(const count of [1,2,20]){
   const w=C.build(canvas,count);
   const command=Buffer.from(w.job).toString("latin1");
   assert.match(command,/SIZE 50 mm,30 mm\r\n/);
   assert.ok(command.endsWith("PRINT 1,"+count+"\r\n"));
   assert.doesNotMatch(command,/QRCODE|PRINT 1,\d+\r\nPRINT/);
   assert.equal(w.copies,count);
  }
  assert.throws(()=>C.build(canvas,21),/Copias/);
 }finally{globalThis.document=old;}
});
test("tres pasos comparten datos de Compacta y Pequeña no se altera",()=>{
 const app=read("app.js"),html=read("index.html");
 assert.match(app,/compact\?C:E/);
 assert.match(app,/C\.render\(d,logo\)/);
 assert.match(app,/\["compact-preview",compact\]/);
 assert.match(app,/\["ingredient-preview",ingredient\]/);
 assert.match(app,/\["ingredient-print",active\]/);
 assert.match(app,/input\.disabled=busy/);
 assert.ok(!html.includes("QRCODE"));
});
