"use strict";
/* QA de la composición Compacta elegida, sin impresora ni navegador externo. */
const test=require("node:test");
const assert=require("node:assert/strict");
const M=require("../ingredientes-v1/motor-libre.js");
require("../ingredientes-v1/plantilla-compacta.js");
const compact=M.forFormat("component");
const sample={name:"Pisto casero",packed:"2026-11-07",expiry:"2027-02-15",mode:"freeze",
 showNutrition:true,kcal:"126",protein:"8,6",carbs:"12,4",fat:"6,1",
 showInstruction:true,instruction:"Descongelar en nevera. Recalentar tapado.",
 showNote:true,note:"Textura variable al descongelar."};
function preview(raw){
 const texts=[],rects=[],logos=[];
 const original=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({
  fillStyle:"#000",font:'400 17px "Geist"',textAlign:"left",textBaseline:"alphabetic",
  fillRect(x,y,w,h){rects.push({x,y,w,h,color:this.fillStyle});},
  beginPath(){},roundRect(){},fill(){},
  drawImage(...args){logos.push(args);},
  fillText(value,x,y){texts.push({value:String(value),x,y,font:this.font,color:this.fillStyle});},
  measureText(value){
   const size=Number((this.font.match(/(\d+)px/)||[])[1]||17);
   return {width:String(value).length*size*.52};
  }
 })})};
 try{compact.render(compact.normalize(raw),{});}finally{globalThis.document=original;}
 return {texts,rects,logos};
}
function where(p,value){return p.texts.find(t=>t.value===value);}
test("Compacta conserva geometría y no integra gramos de ingrediente",()=>{
 assert.deepEqual([compact.width,compact.height],[590,354]);
 assert.equal("grams" in compact.normalize({...sample,grams:500}),false);
 const p=preview(sample);
 assert.equal(p.logos.length,1);
 assert.match(where(p,"Pisto casero").font,/Bricolage Grotesque/);
 assert.match(where(p,"Envasado y").font,/Geist/);
});
test("Con macros, fechas en dos filas a izquierda y nutrición derecha",()=>{
 const p=preview(sample);
 assert.deepEqual([where(p,"07/11/26").x,where(p,"15/02/27").x],[187,187]);
 for(const value of ["126","kcal","8,6 g","PR","12,4 g","HC","6,1 g","GR"])
  assert.ok(where(p,value),"Falta "+value);
 assert.equal(p.rects.some(r=>r.x===298&&r.y===91),true);
});
test("Sin macros, fechas en dos columnas de ancho completo, sin valores ocultos",()=>{
 const p=preview({...sample,showNutrition:false,kcal:"inválido",protein:"inválido"});
 assert.deepEqual([where(p,"07/11/26").x,where(p,"15/02/27").x],[14,310]);
 assert.ok(where(p,"Envasado y congelación"));
 assert.ok(where(p,"Consumo preferente"));
 assert.ok(p.rects.some(r=>r.x===294&&r.y===89&&r.h===85));
 for(const value of ["kcal","PR","HC","GR"])
  assert.equal(where(p,value),undefined,"No debe aparecer "+value);
});
test("Conservación y Nota conservan títulos y posición si faltan textos",()=>{
 const full=preview(sample);
 const blank=preview({...sample,showInstruction:false,showNote:false,
  instruction:"No se imprimirá",note:"Tampoco se imprimirá"});
 for(const heading of ["CONSERVACIÓN Y CONSUMO","NOTA"]){
  assert.ok(where(full,heading));assert.ok(where(blank,heading));
  assert.deepEqual([where(full,heading).x,where(full,heading).y],
   [where(blank,heading).x,where(blank,heading).y]);
 }
 assert.equal(where(blank,"No se imprimirá"),undefined);
 assert.equal(where(blank,"Tampoco se imprimirá"),undefined);
 const empty=preview({...sample,instruction:"",note:""});
 assert.ok(where(empty,"CONSERVACIÓN Y CONSUMO"));
 assert.ok(where(empty,"NOTA"));
});
test("Consumo preferente opcional sigue visible con guiones en las dos disposiciones",()=>{
 for(const enabled of [true,false]){
  const p=preview({...sample,showNutrition:enabled,expiry:""});
  assert.ok(where(p,"--/--/--"));
 }
});
