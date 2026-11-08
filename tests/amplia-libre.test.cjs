"use strict";
/* QA: plantilla libre Amplia propuesta B, sin navegador ni CT230B. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"../ingredientes-v1");
const M=require(path.join(root,"motor-libre.js"));
require(path.join(root,"plantilla-amplia.js"));
const A=M.forFormat("horizontal");
const base={
 name:"Pisto casero",mode:"freeze",packed:"2026-11-08",expiry:"2026-11-21",
 showNutrition:true,kcal:"164,35",protein:"5,69",carbs:"18,58",fat:"7,84",
 showInstruction:true,instruction:"Descongelar en nevera. Recalentar tapado.",
 showNote:true,note:"La textura puede variar al descongelar."
};
function inspect(raw){
 const text=[],rects=[],rounded=[],logos=[],turns=[],canvasOps=[];
 const original=global.document;
 const ctx={
  fillStyle:"#000",font:'400 17px "Geist"',textAlign:"left",textBaseline:"alphabetic",
  save(){turns.push("save");},restore(){turns.push("restore");},
  translate(x,y){turns.push(["translate",x,y]);},rotate(a){turns.push(["rotate",a]);},
  beginPath(){},fill(){},moveTo(){},lineTo(){},quadraticCurveTo(){},closePath(){},
  roundRect(x,y,w,h,r){rounded.push({x,y,w,h,r,color:this.fillStyle});},
  fillRect(x,y,w,h){rects.push({x,y,w,h});},
  fillText(v,x,y){text.push({value:String(v),x,y,font:this.font,align:this.textAlign,color:this.fillStyle});},
  drawImage(...args){logos.push(args);},
  measureText(v){const sz=Number((this.font.match(/(\d+)px/)||[])[1]||17);return {width:String(v).length*sz*.48};},
  getImageData(){return {data:new Uint8ClampedArray(A.width*A.height*4).fill(255)};}
 };
 global.document={createElement:()=>({width:0,height:0,getContext:()=>ctx})};
 try{
  const data=A.normalize(raw,false),canvas=A.render(data,{width:314,height:267});
  const job=A.build(canvas,2);
  return {data,text,rects,rounded,logos,turns,canvas,job};
 }finally{global.document=original;}
}
const at=(p,s)=>p.text.find(t=>t.value===s);
test("Amplia crea raster físico girado 590×945 y TSPL 50×80 sin QR",()=>{
 const p=inspect(base);
 assert.deepEqual([p.canvas.width,p.canvas.height],[590,945]);
 assert.ok(p.turns.some(x=>Array.isArray(x)&&x[0]==="translate"&&x[2]===945));
 assert.ok(p.turns.some(x=>Array.isArray(x)&&x[0]==="rotate"&&x[1]===-Math.PI/2));
 const job=new TextDecoder().decode(p.job.job);
 assert.match(job,/SIZE 50 mm,80 mm/);
 assert.match(job,/PRINT 1,2/);
 assert.doesNotMatch(job,/QRCODE|BAR /);
 assert.equal("grams" in p.data,false);
});
test("Cabecera V0.7.3 mantiene título, logo grande y banda",()=>{
 const p=inspect(base);
 assert.deepEqual([at(p,"Pisto casero").x,at(p,"Pisto casero").y],[19,87]);
 assert.deepEqual(p.logos[0].slice(1),[838,8,94,80]);
 assert.ok(p.rects.some(x=>x.x===0&&x.y===109&&x.w===945&&x.h===21));
 assert.equal(at(p,"MiruRecetas"),undefined);
});
test("Macros activos: cuatro filas de fecha y caja inversa kcal redondeada",()=>{
 const p=inspect(base);
 for(const [s,y] of [
 ["Envasado y congelación",169],["08/11/26",207],
 ["Consumo preferente",258],["21/11/26",301]
 ])assert.equal(at(p,s)?.y,y,s);
 const kcal=p.rounded.find(r=>r.x===624&&r.y===146);
 assert.deepEqual([kcal?.w,kcal?.h,kcal?.r],[287,91,15]);
 for(const v of ["164,35","kcal","5,69 g","PR","18,58 g","HC","7,84 g","GR"])
  assert.ok(at(p,v),v);
 assert.deepEqual(["5,69 g","18,58 g","7,84 g"].map(x=>at(p,x).x),[657,766,875]);
});
test("Sin macros: dos columnas centradas sin huecos nutricionales",()=>{
 const p=inspect({...base,showNutrition:false,kcal:"dato inválido",protein:"dato inválido"});
 for(const [s,x] of [
 ["Envasado y congelación",237],["08/11/26",237],
 ["Consumo preferente",708],["21/11/26",708]
 ]){
  assert.equal(at(p,s)?.x,x);
  assert.equal(at(p,s)?.align,"center");
 }
 for(const v of ["kcal","PR","HC","GR","164,35"])assert.equal(at(p,v),undefined);
});
test("Títulos inversos redondeados y líneas que los unen con bordes",()=>{
 for(const nutrition of [true,false]){
  const p=inspect({...base,showNutrition:nutrition});
  for(const v of ["CONSERVACIÓN Y CONSUMO","NOTA"]){
   assert.ok(at(p,v));assert.equal(at(p,v).color,"#fff");
  }
  assert.ok(p.rounded.some(r=>r.x===24&&r.y===351&&r.w===390));
  assert.ok(p.rounded.some(r=>r.x===620&&r.y===351&&r.w===127));
  assert.ok(p.rects.some(r=>r.x===0&&r.y===370));
  assert.ok(p.rects.some(r=>r.x===424&&r.y===370&&r.w===186));
  assert.ok(p.rects.some(r=>r.x===757&&r.y===370&&r.w===188));
 }
});
test("Encabezados estables con textos inferiores vacíos u ocultos",()=>{
 const p=inspect({...base,showInstruction:false,showNote:false,instruction:"antiguo",note:"antigua"});
 assert.ok(at(p,"CONSERVACIÓN Y CONSUMO"));
 assert.ok(at(p,"NOTA"));
 assert.ok(!p.text.some(t=>t.value.includes("antigu")));
 const empty=inspect({...base,instruction:"",note:""});
 assert.ok(at(empty,"CONSERVACIÓN Y CONSUMO"));
 assert.ok(at(empty,"NOTA"));
});
test("Tres tipos de conservación y fecha preferente opcional",()=>{
 for(const [mode,label] of [["freeze","Envasado y congelación"],["fridge","Envasado"],["other","Conservación"]]){
  for(const showNutrition of [true,false]){
   const p=inspect({...base,mode,showNutrition,expiry:""});
   assert.ok(at(p,label));assert.ok(at(p,"Consumo preferente"));
   assert.ok(at(p,"--/--/--"));
  }
 }
 assert.throws(()=>A.normalize({...base,expiry:"2026-11-07"}),/anterior/);
});
test("Los Enter del formulario se conservan en instrucciones y nota, con tres líneas",()=>{
 const p=inspect({...base,
  instruction:"En nevera.\nRecalentar tapado.\nNo volver a congelar.",
  note:"Textura variable.\nConsumir pronto.\nMantener en frío."
 });
 assert.equal(p.data.instruction,"En nevera.\nRecalentar tapado.\nNo volver a congelar.");
 assert.equal(p.data.note,"Textura variable.\nConsumir pronto.\nMantener en frío.");
 for(const [value,x,y] of [
  ["En nevera.",26,431],["Recalentar tapado.",26,465],
  ["No volver a congelar.",26,499],
  ["Textura variable.",622,431],["Consumir pronto.",622,462],
  ["Mantener en frío.",622,493]
 ]){
  const item=at(p,value);
  assert.ok(item,"No aparece la línea literal: "+value);
  assert.deepEqual([item.x,item.y],[x,y],"Posición de "+value);
 }
});
test("CRLF y doble Enter se normalizan sin perder los saltos internos",()=>{
 const data=A.normalize({...base,
  instruction:"Primera instrucción\r\n\r\nTercera instrucción",
  note:"Primera nota\rSegunda nota"
 });
 assert.equal(data.instruction,"Primera instrucción\n\nTercera instrucción");
 assert.equal(data.note,"Primera nota\nSegunda nota");
 const p=inspect({...base,instruction:data.instruction,note:data.note});
 assert.equal(at(p,"Primera instrucción").y,431);
 assert.equal(at(p,"Tercera instrucción").y,499);
 assert.equal(at(p,"Segunda nota").y,462);
});
test("Envoltorio automático conserva palabras y puede ocupar varias líneas",()=>{
 const p=inspect({...base,
  note:"La textura puede variar bastante al descongelar y al volver a calentar el alimento."
 });
 const lines=p.text.filter(x=>x.x===622&&x.y>=431);
 assert.ok(lines.length>=2&&lines.length<=6);
 assert.equal(lines.map(x=>x.value).join(" "),
  "La textura puede variar bastante al descongelar y al volver a calentar el alimento.");
 assert.ok(lines.every(x=>x.y<=590));
});
test("Texto que no cabe se bloquea, sin recorte silencioso ni impresión",()=>{
 assert.throws(()=>A.normalize({...base,instruction:"x".repeat(181)}),/Instrucciones/);
 assert.throws(()=>A.normalize({...base,note:"x".repeat(141)}),/Nota/);
 assert.throws(()=>inspect({...base,note:"supercalifragilisticoespialidoso".repeat(3)}),/no cabe|excede/);
 assert.equal(A.normalize({...base,showNote:false,note:"<inválido>"}).note,"");
});
test("Formulario, preview y bloqueo de impresión de Amplia en fase visual",()=>{
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
 const css=fs.readFileSync(path.join(root,"style.css"),"utf8");
 for(const id of ["wide-fields","wide-preview","a-name","a-mode","a-packed","a-expiry",
  "a-nutrition-enabled","a-kcal","a-protein","a-carbs","a-fat",
  "a-instruction","a-note","a-preview","a-status","a-metrics"])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('src="./plantilla-amplia.js?v=20261108-amplia-b-v2"'));
 assert.ok(app.includes('A=Motor.forFormat("horizontal")'));
 assert.ok(app.includes('selectedFormat==="horizontal"||busy'));
 assert.ok(app.includes('$("a-instruction").value=noteDefaults[mode]'));
 assert.ok(app.includes('$("a-note").value=""'));
 assert.ok(css.includes("#a-preview{width:100%"));
 assert.ok(css.includes("#compact-fields textarea,#wide-fields textarea"));
 assert.ok(css.includes("font:inherit;font-weight:500;line-height:1.5"));
 assert.ok(html.includes('href="./style.css?v=20261108-amplia-multiline"'));
});
