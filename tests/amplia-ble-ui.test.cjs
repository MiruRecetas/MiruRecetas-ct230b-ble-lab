"use strict";
/* Integración simulada del control de impresión de Amplia.
 * Sin conexión a impresora real ni modificaciones de inventario.
 */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const app=fs.readFileSync(path.resolve(__dirname,"../ingredientes-v1/app.js"),"utf8");

async function prepare(){
 const elements=new Map(),writes=[],prompts=[],builds=[];
 let connected=false,oversize=false,accept=true;
 function get(id){
  if(!elements.has(id))elements.set(id,{
   value:"",checked:false,disabled:false,hidden:false,textContent:"",
   dataset:{},style:{},listeners:{},
   addEventListener(type,handler){this.listeners[type]=handler;},
   setAttribute(){},
   getContext(){return {clearRect(){},drawImage(){},save(){},restore(){},
    translate(){},rotate(){}};}
  });
  return elements.get(id);
 }
 for(const [id,value] of [
  ["name","Carne Picada"],["a-name","Pisto casero"],
  ["c-name","Pisto casero"],["a-mode","freeze"],
  ["a-instruction","Descongelar en nevera"],["a-note","Nota"]
 ])get(id).value=value;
 for(const id of ["a-nutrition-enabled","a-instruction-enabled","a-note-enabled"])
  get(id).checked=true;
 const radios=["ingredient","component","horizontal"].map(value=>({
  value,checked:value==="ingredient",listeners:{},
  addEventListener(type,cb){this.listeners[type]=cb;}
 }));
 const doc={getElementById:get,querySelectorAll:()=>radios,
  fonts:{load:async()=>[{status:"loaded"}]}};
 const WRITE="49535343-8841-43f4-a8d4-ecbe34729bb3";
 const channel={properties:{write:true,writeWithoutResponse:false},
  async writeValueWithResponse(bytes){writes.push([...bytes]);}};
 const device={
  gatt:{get connected(){return connected;},
   async connect(){connected=true;return {async getPrimaryService(){
    return {async getCharacteristic(uuid){
     return uuid===WRITE?channel:{async startNotifications(){}};
    }};
   }};},
   disconnect(){connected=false;}},
  addEventListener(){}
 };
 const navigator={bluetooth:{requestDevice:async()=>device},clipboard:{}};
 const motors={};
 for(const id of ["ingredient","component","horizontal"]){
  motors[id]={
   normalize(raw,strict){
    if(strict&&!String(raw.name||"").trim())
     throw Error("Nombre obligatorio");
    return {name:raw.name,packed:"08/11/26",expiry:"--/--/--",grams:null};
   },
   render:()=>({}),
   build(canvas,copies){
    if(id==="horizontal"&&oversize)throw Error("Trabajo demasiado grande");
    builds.push({id,copies});
    return {job:new Uint8Array(47).fill(65),bytes:47,fragments:3,tiles:4,copies};
   },
   logo:async()=>({width:314,height:267})
  };
 }
 const win={MiruLabelEngine:{forFormat:id=>motors[id]},
  isSecureContext:true,confirm:message=>{prompts.push(message);return accept;}};
 new Function("window","document","navigator","setTimeout",app)
  (win,doc,navigator,cb=>{cb();});
 const flush=async()=>{for(let i=0;i<30;i++)await Promise.resolve();};
 await flush();
 radios[2].checked=true;
 radios[2].listeners.change();
 await flush();
 return {
  get,radios,writes,prompts,builds,flush,
  connect:async()=>{await get("connect").listeners.click();await flush();},
  setOversize(value){oversize=value;},
  setAccept(value){accept=value;}
 };
}

test("Amplia no imprime sin conexión o sin confirmación de papel",async()=>{
 const s=await prepare();
 assert.equal(s.get("paper-dimensions").textContent,"50 × 80 mm");
 assert.equal(s.get("ingredient-print").hidden,false);
 assert.equal(s.get("alternate-print").hidden,true);
 assert.equal(s.get("print").disabled,true);
 s.get("confirm-paper").checked=true;
 s.get("confirm-paper").listeners.change();
 assert.equal(s.get("print").disabled,true);
 await s.connect();
 assert.equal(s.get("print").disabled,false);
 assert.equal(s.get("print").textContent,"Imprimir 1 etiqueta · 50 × 80 mm");
});

test("Amplia envía desde su motor tras confirmación y no reintenta",async()=>{
 const s=await prepare();
 await s.connect();
 s.get("confirm-paper").checked=true;
 s.get("confirm-paper").listeners.change();
 await s.get("print").listeners.click();
 assert.equal(s.prompts.length,1);
 assert.match(s.prompts[0],/50 × 80 mm/);
 assert.match(s.prompts[0],/TSPL PRINT 1,1/);
 assert.ok(s.builds.some(x=>x.id==="horizontal"&&x.copies===1));
 assert.deepEqual(s.writes.map(p=>p.length),[20,20,7]);
 assert.equal(s.get("transport").dataset.state,"complete");
 assert.equal(s.get("confirm-paper").checked,false);
 assert.equal(s.get("print").disabled,true);
 assert.match(s.get("log").textContent,/Transmitidos 3\/3 fragmentos/);
});

test("Multicopia de Amplia se calcula en el mismo trabajo",async()=>{
 const s=await prepare();
 await s.connect();
 s.get("copies-plus").listeners.click();
 await s.flush();
 assert.equal(s.get("copies").textContent,"2");
 assert.equal(s.get("print").textContent,"Imprimir 2 etiquetas · 50 × 80 mm");
 s.get("confirm-paper").checked=true;
 s.get("confirm-paper").listeners.change();
 await s.get("print").listeners.click();
 assert.match(s.prompts[0],/TSPL PRINT 1,2/);
 assert.ok(s.builds.some(x=>x.id==="horizontal"&&x.copies===2));
 assert.equal(s.writes.length,3,"Un solo trabajo BLE, no dos envíos duplicados");
});

test("Cancelación y trabajos fuera de límite nunca transmiten",async()=>{
 const s=await prepare();
 await s.connect();
 s.setOversize(true);
 s.get("a-note").value="Más instrucciones";
 s.get("a-note").listeners.input();
 await s.flush();
 assert.equal(s.get("print").disabled,true);
 s.setOversize(false);
 s.get("a-note").listeners.input();
 await s.flush();
 s.get("confirm-paper").checked=true;
 s.get("confirm-paper").listeners.change();
 assert.equal(s.get("print").disabled,false);
 s.setAccept(false);
 await s.get("print").listeners.click();
 assert.equal(s.prompts.length,1);
 assert.equal(s.writes.length,0);
 assert.equal(s.get("confirm-paper").checked,true,"El usuario canceló, no hubo transmisión");
});
