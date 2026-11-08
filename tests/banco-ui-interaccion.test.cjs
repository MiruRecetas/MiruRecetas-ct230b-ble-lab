"use strict";
/* Regresión funcional del banco en DOM simulado, sin Bluetooth ni red.
 * Ejecutar: node --test tests/banco-ui-interaccion.test.cjs
 * No sustituye la revisión visual en Android ni la impresión física. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const base=path.join(__dirname,"..","ingredientes-v1");
const source=fs.readFileSync(path.join(base,"banco-ui.js"),"utf8");
const data=JSON.parse(fs.readFileSync(path.join(base,"banco/catalogo.json"),"utf8"));

class Elemento{
 constructor(tag="input"){
  Object.assign(this,{tag,value:"",checked:false,disabled:false,hidden:false,
   children:[],options:[],listeners:{},style:{},isConnected:true,
   classList:{toggle(){}}});
 }
 addEventListener(type,callback){(this.listeners[type]??=[]).push(callback);}
 fire(type){for(const cb of this.listeners[type]||[])cb({type,target:this});}
 dispatchEvent(event){this.fire(event.type);}
 replaceChildren(...parts){
  this.children=parts;
  if(this.tag==="select"){this.options=parts;this.value=parts[0]?.value??"";}
 }
 append(...parts){this.children.push(...parts);}
 add(part){this.options.push(part);this.children.push(part);}
 setAttribute(){}
 focus(){}
}
function entorno(){
 const elements=new Map();
 const el=id=>elements.get(id)||elements.set(id,
  new Elemento(["mode","bank-subcategory"].includes(id)?"select":"input")).get(id);
 const mode=el("mode");
 mode.options=["fridge","freeze","pantry","preserve","other"]
  .map(value=>({value,textContent:value}));
 mode.value="freeze";
 el("packed").value="2026-11-08";
 el("name").value="Carne Picada";
 el("grams").value="500";
 el("note").value="Descongelar en nevera";
 el("notes-enabled").checked=true;
 el("bank-overlay").hidden=true;
 const formats=["ingredient","component","horizontal"].map((value,i)=>
  Object.assign(new Elemento(),{value,checked:i===0}));
 const document={
  getElementById:el,
  querySelector:()=>formats.find(x=>x.checked),
  querySelectorAll:()=>formats,
  createElement:tag=>new Elemento(tag),
  body:{style:{}},addEventListener(){}
 };
 function Option(text,value){Object.assign(this,{textContent:text,value});}
 function Event(type,options){Object.assign(this,{type,...options});}
 mode.addEventListener("change",()=>{
  el("note").value={fridge:"Conservar en nevera",freeze:"Descongelar en nevera"}[mode.value]||"";
 });
 vm.runInNewContext(source,{document,Option,Event,
  fetch:async()=>({ok:true,json:async()=>data})},{filename:"banco-ui.js"});
 async function aplicar(busqueda){
  el("bank-open").fire("click");
  await Promise.resolve();await Promise.resolve();await Promise.resolve();
  el("bank-search").value=busqueda;el("bank-search").fire("input");
  assert.equal(el("bank-results").children.length,1,"un resultado para "+busqueda);
  el("bank-results").children[0].fire("click");
  assert.equal(el("bank-apply").disabled,false);
  el("bank-apply").fire("click");
 }
 return {el,mode,aplicar};
}

test("lechuga del banco corrige congelación anterior y añade nota y fecha",async()=>{
 const {el,mode,aplicar}=entorno();
 await aplicar("Lechuga");
 assert.deepEqual(mode.options.map(x=>x.value),["fridge"]);
 assert.equal(mode.value,"fridge");
 assert.equal(el("note").value,"Conservar en nevera");
 assert.equal(el("expiry").value,"2026-11-22");
});

test("libre conserva los cinco modos y su borrador; carne limita a dos",async()=>{
 const {el,mode,aplicar}=entorno();
 await aplicar("Lechuga");
 el("bank-free").fire("click");
 assert.deepEqual(mode.options.map(x=>x.value),["fridge","freeze","pantry","preserve","other"]);
 assert.equal(el("name").value,"Carne Picada");
 await aplicar("Carne picada de ternera");
 assert.deepEqual(mode.options.map(x=>x.value),["fridge","freeze"]);
 assert.equal(mode.value,"freeze");
 assert.equal(el("note").value,"Descongelar en nevera");
 assert.equal(el("expiry").value,"2027-02-06");
 mode.value="fridge";mode.fire("change");
 assert.equal(el("note").value,"Conservar en nevera");
 assert.equal(el("expiry").value,"2026-11-10");
});

test("fecha manual prevalece y explorar sin aplicar no cambia el formulario",async()=>{
 const {el,mode,aplicar}=entorno();
 await aplicar("Carne picada de ternera");
 el("expiry").value="2027-04-08";el("expiry").fire("input");
 el("packed").value="2026-11-09";el("packed").fire("input");
 assert.equal(el("expiry").value,"2027-04-08");
 el("bank-open").fire("click");
 await Promise.resolve();await Promise.resolve();await Promise.resolve();
 el("bank-search").value="Patata";el("bank-search").fire("input");
 el("bank-results").children[0].fire("click");
 const previousNote=el("note").value,previousMode=mode.value;
 el("packed").value="2026-11-10";el("packed").fire("input");
 assert.equal(el("note").value,previousNote);
 assert.equal(mode.value,previousMode);
 assert.equal(el("expiry").value,"2027-04-08");
});

test("los borradores sin modo comprobado no aparecen como opciones del banco",async()=>{
 const {el}=entorno();
 el("bank-open").fire("click");
 await Promise.resolve();await Promise.resolve();await Promise.resolve();
 for(const buscado of ["Pulpo","Salsa de tomate"]){
  el("bank-search").value=buscado;el("bank-search").fire("input");
  assert.match(el("bank-results-count").textContent,/0 ingredientes/);
  assert.equal(el("bank-apply").disabled,true);
 }
});
