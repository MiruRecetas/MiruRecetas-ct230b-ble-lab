"use strict";
/* QA de la Compacta libre: contrato visual de V0.9 + estados opcionales. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const base=path.resolve(__dirname,"../ingredientes-v1");
const M=require(path.join(base,"motor-libre.js"));
require(path.join(base,"plantilla-compacta.js"));
const compact=M.forFormat("component");
const sample={name:"Pisto casero",packed:"2026-11-07",expiry:"2027-02-15",mode:"freeze",
 showNutrition:true,kcal:"164,35",protein:"5,69",carbs:"18,58",fat:"7,84",
 showInstruction:true,instruction:"Descongelar en nevera. Recalentar tapado.",
 showNote:true,note:"La textura puede variar."};
function preview(raw){
 const texts=[],rects=[],rounded=[],logos=[];
 const original=globalThis.document;
 const ctx={
  fillStyle:"#000",font:'400 17px "Geist"',textAlign:"left",textBaseline:"alphabetic",
  fillRect(x,y,w,h){rects.push({x,y,w,h,color:this.fillStyle});},
  beginPath(){},roundRect(x,y,w,h,r){rounded.push({x,y,w,h,r,color:this.fillStyle});},
  fill(){},drawImage(...args){logos.push(args);},
  fillText(value,x,y){texts.push({value:String(value),x,y,font:this.font,color:this.fillStyle,align:this.textAlign});},
  measureText(value){
   const size=Number((this.font.match(/(\d+)px/)||[])[1]||17);
   return {width:String(value).length*size*.52};
  }
 };
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>ctx})};
 try{compact.render(compact.normalize(raw),{width:314,height:267});}
 finally{globalThis.document=original;}
 return {texts,rects,rounded,logos};
}
function where(p,value){return p.texts.find(t=>t.value===value);}
test("Restaurar EXACTAMENTE cabecera V0.9: texto, isotipo y barra",()=>{
 assert.deepEqual([compact.width,compact.height],[590,354]);
 assert.equal("grams" in compact.normalize({...sample,grams:500}),false);
 const p=preview(sample);
 assert.deepEqual(p.logos[0].slice(1),[525,5,53,48]);
 assert.deepEqual([where(p,"Pisto casero").x,where(p,"Pisto casero").y],[11,46]);
 assert.match(where(p,"Pisto casero").font,/700 46px "Bricolage Grotesque"/);
 assert.ok(p.rects.some(x=>x.x===0&&x.y===60&&x.w===590&&x.h===12));
 assert.equal(where(p,"MiruRecetas"),undefined,"No introducir texto bajo el isotipo");
});
test("Con macros: fechas alineadas por filas, sin separadores entre rótulos y fechas",()=>{
 const p=preview(sample);
 assert.deepEqual([where(p,"Envasado y congelación").y,where(p,"07/11/26").y],[115,115]);
 assert.deepEqual([where(p,"Consumo preferente").y,where(p,"15/02/27").y],[156,156]);
 assert.equal(p.rects.some(x=>x.y===180&&x.w===566),false);
 assert.equal(p.rects.some(x=>x.y===91&&x.h===84),false);
 for(const v of ["164,35","kcal","5,69 g","PR","18,58 g","HC","7,84 g","GR"])
  assert.ok(where(p,v),"Falta "+v);
 const energy=p.rounded.find(x=>x.x===420&&x.y===82);
 assert.deepEqual([energy.w,energy.h,energy.r],[148,49,10]);
 const positions=["5,69 g","18,58 g","7,84 g"].map(v=>where(p,v).x);
 assert.deepEqual(positions,[435,500,565]);
 assert.ok(positions[1]-positions[0]>=60&&positions[2]-positions[1]>=60);
});
test("Sin macros: dos columnas horizontales centradas y sin separadores",()=>{
 const p=preview({...sample,showNutrition:false,kcal:"inválido",protein:"inválido"});
 for(const [label,x] of [["Envasado y congelación",148],["Consumo preferente",442],
  ["07/11/26",148],["15/02/27",442]]){
  assert.equal(where(p,label).x,x,label);
  assert.equal(where(p,label).align,"center",label);
 }
 assert.ok(!p.rects.some(x=>x.x===294&&x.h===85));
 assert.ok(!p.rects.some(x=>x.y===180&&x.w===566));
 for(const v of ["kcal","PR","HC","GR"])
  assert.equal(where(p,v),undefined,"No mostrar "+v);
});
test("Los tres modos copian rótulos aprobados de Pequeña; consumo siempre visible",()=>{
 for(const [mode,label] of [
  ["freeze","Envasado y congelación"],["fridge","Envasado"],["other","Conservación"]
 ]){
  for(const showNutrition of [false,true]){
   const p=preview({...sample,mode,showNutrition});
   assert.ok(where(p,label),mode);
   assert.ok(where(p,"Consumo preferente"));
   assert.ok(where(p,"07/11/26"));assert.ok(where(p,"15/02/27"));
  }
 }
});
test("Conservación y Nota conservan títulos y posiciones con textos vacíos u ocultos",()=>{
 const full=preview(sample);
 const blank=preview({...sample,showInstruction:false,showNote:false,
  instruction:"Texto antiguo",note:"Nota antigua"});
 for(const title of ["CONSERVACIÓN Y CONSUMO","NOTA"]){
  assert.ok(where(full,title));
  assert.deepEqual([where(full,title).x,where(full,title).y],
   [where(blank,title).x,where(blank,title).y]);
 }
 assert.equal(where(blank,"Texto antiguo"),undefined);
 assert.equal(where(blank,"Nota antigua"),undefined);
 const empty=preview({...sample,instruction:"",note:""});
 assert.ok(where(empty,"CONSERVACIÓN Y CONSUMO"));
 assert.ok(where(empty,"NOTA"));
});
test("Consumo preferente vacío se representa con guiones en los dos modos",()=>{
 for(const enabled of [true,false]){
  const p=preview({...sample,showNutrition:enabled,expiry:""});
  assert.ok(where(p,"--/--/--"));
 }
});
test("App cambia instrucciones y limpia nota por modo, como Pequeña, sin plazo inferido",()=>{
 const app=fs.readFileSync(path.join(base,"app.js"),"utf8");
 assert.match(app,/noteDefaults=\{fridge:"Conservar en nevera",freeze:"Descongelar en nevera",other:""\}/);
 assert.match(app,/\$\("c-mode"\)\.addEventListener\("change"/);
 assert.match(app,/\$\("c-instruction"\)\.value=noteDefaults\[mode\]/);
 assert.match(app,/\$\("c-note"\)\.value=""/);
 assert.doesNotMatch(app,/expiresAt|expiryDays|plusDays/);
});
