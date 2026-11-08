"use strict";
/* Banco inicial: comprobar datos, precedencia de fuente y que Pequeña conserva su modo libre.
 * Ejecución: node --test tests/banco-ingredientes.test.cjs
 * No necesita red, Bluetooth ni navegador. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const dir=path.join(__dirname,"..","ingredientes-v1");
const read=p=>fs.readFileSync(path.join(dir,p),"utf8");
const schema=JSON.parse(read("banco/catalogo.schema.json"));
const data=JSON.parse(read("banco/catalogo.json"));
const records=data.ingredientes;
const props=schema.$defs.ingrediente.properties;
const allOf=schema.$defs.ingrediente.allOf;
const categories=props.categoria.enum;
const subcategories=Object.fromEntries(allOf.slice(0,4).map(r=>[r.if.properties.categoria.const,r.then.properties.subcategoria.enum]));
const byName=name=>records.find(x=>x.nombre===name);

test("catálogo de seis ingredientes, con ID único y taxonomía aprobada",()=>{
 assert.equal(records.length,6);
 assert.equal(new Set(records.map(x=>x.id)).size,6);
 assert.deepEqual(new Set(records.map(x=>x.nombre)),new Set([
  "Carne picada de ternera","Pulpo","Patata","Lechuga","Orejones","Salsa de tomate"
 ]));
 assert.equal(categories.length,4);
 assert.equal(Object.values(subcategories).flat().length,26);
 for(const r of records){
  assert.match(r.id,/^[A-Z]{2,}-[A-Z]{2,}-\d{3,}$/);
  assert.ok(categories.includes(r.categoria));
  assert.ok(subcategories[r.categoria].includes(r.subcategoria));
  assert.ok(Array.isArray(r.sinonimos));
  for(const key of schema.$defs.ingrediente.required)assert.ok(Object.hasOwn(r,key),r.nombre+": "+key);
 }
});
test("el origen es GLOBAL y los datos no conocidos no reciben plazos inventados",()=>{
 const modeDefs=[["refrigeracion","refrigeracion_dias","tips_refrigeracion"],["congelacion","congelacion_dias","tips_descongelacion"],["despensa","despensa_dias","tips_despensa"],["conserva","conserva_dias","tips_conserva"]];
 for(const r of records){
  assert.ok(["verificado","parcial","sin_datos"].includes(r.estado_recomendacion));
  if(r.estado_recomendacion==="sin_datos"){
   assert.equal(r.fuente,null);assert.equal(r.id_fuente,null);
   assert.ok(modeDefs.every(([m])=>!Object.hasOwn(r,m)));
   continue;
  }
  assert.equal(typeof r.fuente,"string");
  for(const [m,d,t] of modeDefs){
   assert.equal(typeof r[m],"boolean");
   assert.ok(r[d]===null||(Number.isInteger(r[d])&&r[d]>0));
   assert.ok(r[t]===null||typeof r[t]==="string");
   if(r[m]===false){assert.equal(r[d],null);assert.equal(r[t],null);}
  }
 }
});
test("plazos del archivo original: sin extrapolar datos de otros alimentos",()=>{
 const meat=byName("Carne picada de ternera"),potato=byName("Patata"),lettuce=byName("Lechuga");
 const apricot=byName("Orejones");
 assert.equal(meat.estado_recomendacion,"verificado");assert.equal(meat.fuente,"agregación");
 assert.equal(meat.id_fuente,null);assert.equal(meat.refrigeracion_dias,2);
 assert.equal(meat.despensa,false);assert.equal(meat.conserva,false);
 assert.equal(meat.congelacion_dias,90);
 assert.equal(potato.id_fuente,"297");assert.equal(potato.refrigeracion_dias,14);
 assert.equal(potato.despensa_dias,null);assert.equal(potato.congelacion,false);assert.equal(potato.congelacion_dias,null);
 assert.equal(lettuce.estado_recomendacion,"verificado");assert.equal(lettuce.fuente,"agregación");
 assert.equal(lettuce.id_fuente,null);assert.equal(lettuce.refrigeracion_dias,14);
 assert.equal(lettuce.despensa,false);assert.equal(lettuce.conserva,false);
 assert.equal(lettuce.congelacion,false);
 assert.equal(apricot.id_fuente,"379");assert.equal(apricot.despensa_dias,180);assert.equal(apricot.refrigeracion,false);
 assert.ok(apricot.sinonimos.includes("Albaricoques deshidratados"));
 assert.equal(byName("Pulpo").estado_recomendacion,"sin_datos");
 assert.equal(byName("Salsa de tomate").estado_recomendacion,"sin_datos");
});
test("Pequeña tiene chips y panel, sin alterar Compacta/Amplia ni el motor común",()=>{
 const html=read("index.html"),js=read("banco-ui.js"),css=read("style.css");
 const app=read("app.js"),engine=read("motor-libre.js");
 assert.match(html,/id="bank-free"[^>]*>Ingrediente libre/);
 assert.match(html,/id="bank-open"[^>]*>Cargar del banco/);
 assert.match(html,/id="bank-sheet"/);
 assert.ok(html.indexOf('id="ingredient-bank-controls"')<html.indexOf('id="data-step"'));
 assert.match(html,/src="\.\/banco-ui\.js\?v=/);
 assert.match(js,/fetch\("\.\/banco\/catalogo\.json"/);
 assert.match(js,/sinonimos/);
 assert.match(js,/Tiempo recomendado: /);
 assert.match(html,/Restablecer recomendación/);
 assert.doesNotMatch(html,/bank-source-info|Consultar fuente/);
 assert.doesNotMatch(js,/foodkeeper-es-original\.json|bank-source-info/);
 assert.match(js,/notePresets/);
 assert.match(js,/setModeOptions\(item/);
 assert.match(js,/allowedModes\(item\)/);
 assert.match(js,/appliedItem\(\)/);
 assert.match(app,/\?"other":\$\("mode"\)\.value/);
 assert.match(js,/bank-reset-date/);
 assert.match(css,/\.bank-overlay/);
 assert.doesNotMatch(engine,/bank-(?:sheet|open|free)|catalogo\.json/);
 assert.match(app,/noteDefaults=/);
 assert.ok(html.includes('id="c-preview"')&&html.includes('id="a-preview"'));
 assert.doesNotThrow(()=>new vm.Script(js));
});
test("restaurada la plantilla aprobada y tres modos originales sin cambios",()=>{
 const motor=require(path.join(dir,"motor-libre.js"));
 require(path.join(dir,"plantilla-pequena.js"));
 const label=motor.forFormat("ingredient");
 for(const mode of ["fridge","freeze","other"]){
  const d=label.normalize({name:"Patata",grams:"",mode,packed:"2026-11-08",expiry:"",note:"",notesEnabled:false});
  assert.equal(d.mode,mode);
 }
 assert.throws(()=>label.normalize({name:"Patata",mode:"preserve"}),/Tipo/);
 assert.throws(()=>label.normalize({name:"Patata",mode:"pantry"}),/Tipo/);
 const template=read("plantilla-pequena.js");
 assert.ok(template.includes('data.mode==="other"?"Conservación":"Envasado"'));
});
test("los métodos del banco solo aparecen cuando están habilitados",()=>{
 const options={fridge:"refrigeracion",freeze:"congelacion",pantry:"despensa",preserve:"conserva"};
 const permitted=item=>item.estado_recomendacion==="sin_datos"?[]:
  Object.entries(options).filter(([,key])=>item[key]===true).map(([mode])=>mode);
 assert.deepEqual(permitted(byName("Carne picada de ternera")),["fridge","freeze"]);
 assert.deepEqual(permitted(byName("Lechuga")),["fridge"]);
 assert.deepEqual(permitted(byName("Patata")),["fridge","pantry"]);
 assert.deepEqual(permitted(byName("Orejones")),["pantry"]);
 assert.deepEqual(permitted(byName("Pulpo")),[]);
 assert.deepEqual(permitted(byName("Salsa de tomate")),[]);
});
