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

test("catálogo de veintitrés fichas, con ID y variante únicos",()=>{
 assert.equal(records.length,23);
 assert.equal(new Set(records.map(x=>x.nombre+"|"+String(x.presentacion))).size,records.length);
 assert.equal(new Set(records.map(x=>x.id)).size,records.length);
 assert.deepEqual(new Set(records.map(x=>x.nombre)),new Set([
  "Carne picada de ternera","Redondo de ternera","Solomillo de ternera",
  "Filetes de ternera","Ternera para guisar",
  "Paletilla de lechazo","Chuletillas de lechazo",
  "Lomo de cerdo","Solomillo de cerdo","Costillas de cerdo",
  "Carne picada de cerdo","Cerdo para guisar",
  "Pollo","Pechuga de pollo","Muslo de pollo","Carne picada de pollo","Pechuga de pavo",
  "Pulpo","Patata","Lechuga","Orejones","Salsa de tomate"
 ]));
 assert.equal(categories.length,4);
 assert.equal(Object.values(subcategories).flat().length,28);
 assert.deepEqual(subcategories["Carnes y Aves"],
  ["Vacuno","Porcino","Ovino","Pollo","Pavo","Otras aves","Caza","Elaborados","Charcutería"]);
 for(const empty of ["Otras aves","Caza","Elaborados","Charcutería"])
  assert.equal(records.filter(x=>x.subcategoria===empty).length,0,"sin fichas: "+empty);
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

test("panel banco replica el cierre, asa móvil y papel de impresión oficiales sin cambiar la lógica",()=>{
 const html=read("index.html"),css=read("style.css"),js=read("banco-ui.js");
 const scope=html.slice(html.indexOf('id="bank-overlay"'),html.indexOf('src="./motor-libre.js'));
 assert.match(scope,/<div class="bank-mobile-handle" aria-hidden="true"><\/div>/);
 assert.match(scope,/<button id="bank-close"[^>]*aria-label="Cerrar banco de ingredientes">×<\/button>/);
 assert.doesNotMatch(scope,/>Cerrar ×<\/button>/);
 assert.match(css,/\.bank-sheet\{position:relative;background:#fffcf7/);
 assert.match(css,/\.bank-close\{display:grid;place-items:center;width:44px;height:44px;min-width:44px/);
 assert.match(css,/border:1px solid #e4dfd5;border-radius:50%;background:#fff;color:#29352e/);
 assert.match(css,/\.bank-mobile-handle\{display:block;position:absolute;top:14px;left:50%/);
 assert.match(css,/width:46px;height:5px;border-radius:4px;/);
 assert.match(css,/background:#c1c9bf;pointer-events:none/);
 assert.match(html,/href="\.\/style\.css\?v=20261108-banco-panel-canonico-v3"/);
 assert.match(js,/\$\("bank-close"\)\.addEventListener\("click",closeSheet\)/);
});

test("vacuno aprobado 36/37/40/41: procedencia exacta, plazos y métodos aplicables",()=>{
 const foodkeeper=JSON.parse(read("banco/fuentes/foodkeeper-es-original.json"));
 const source=foodkeeper.sheets.find(x=>x.name==="Product").data.map(row=>Object.assign({},...row));
 const specs=[
  ["CAR-VAC-002",36,"Redondo de ternera","Pieza entera","Asado redondo"],
  ["CAR-VAC-003",37,"Solomillo de ternera",null,"Lomillo entero"],
  ["CAR-VAC-004",40,"Filetes de ternera","Filetes","Filetes de vacuno"],
  ["CAR-VAC-005",41,"Ternera para guisar","Dados","Carne para guisar"]
 ];
 for(const [id,sourceId,name,presentation,alias] of specs){
  const r=records.find(x=>x.id===id),p=source.find(x=>x.ID===sourceId);
  assert.ok(r&&p,"ID original y ficha derivada");
  assert.equal(p.Category_ID,10);assert.equal(p.Name,"Carne de Res");
  assert.equal(p.DOP_Refrigerate_Min,3);assert.equal(p.DOP_Refrigerate_Max,5);
  assert.equal(p.DOP_Refrigerate_Metric,"Días");
  assert.equal(p.DOP_Freeze_Min,4);assert.equal(p.DOP_Freeze_Max,12);
  assert.equal(p.DOP_Freeze_Metric,"Meses");
  assert.equal(r.nombre,name);assert.equal(r.presentacion,presentation);
  assert.ok(r.sinonimos.includes(alias));
  assert.equal(r.categoria,"Carnes y Aves");assert.equal(r.subcategoria,"Vacuno");
  assert.equal(r.estado_recomendacion,"verificado");
  // FoodKeeper ES 41 discrepa del criterio especializado para carne de guiso
  // troceada: se aplican 2 días / 3 meses de USDA y la fuente es agregada.
  if(sourceId===41){
   assert.equal(r.fuente,"agregación");assert.equal(r.id_fuente,null);
   assert.equal(r.refrigeracion_dias,2);assert.equal(r.congelacion_dias,90);
  }else{
   assert.equal(r.fuente,"FoodKeeper");assert.equal(r.id_fuente,String(sourceId));
   assert.equal(r.refrigeracion_dias,5);assert.equal(r.congelacion_dias,120);
  }
  assert.equal(r.refrigeracion,true);assert.equal(r.tips_refrigeracion,"");
  assert.equal(r.congelacion,true);assert.equal(r.tips_descongelacion,"");
  for(const m of ["despensa","conserva"]){
   assert.equal(r[m],false);assert.equal(r[m+"_dias"],null);
   assert.equal(r["tips_"+m],null);
  }
  assert.equal(r.tips_preparacion_conservacion,null);
 }
 const tenderloin=records.find(x=>x.id==="CAR-VAC-003");
 assert.ok(tenderloin.sinonimos.includes("Medallones de solomillo"));
 assert.ok(tenderloin.sinonimos.includes("Solomillo de vacuno entero"));
 assert.equal(tenderloin.refrigeracion_dias,5);
 assert.equal(tenderloin.congelacion_dias,120);
 assert.equal(new Set(records.map(x=>x.id_fuente).filter(Boolean)).size,
  records.filter(x=>x.id_fuente).length,"ningún origen FoodKeeper duplicado");
});

test("lote ovino/porcino: 8 ID FoodKeeper trazados en 7 fichas y 2 métodos",()=>{
 const original=JSON.parse(read("banco/fuentes/foodkeeper-es-original.json"));
 const products=original.sheets.find(x=>x.name==="Product").data.map(row=>Object.assign({},...row));
 const specs=[
  {id:"CAR-OVI-001",name:"Paletilla de lechazo",presentation:"Pieza entera",category:"Ovino",source:[48],days:[5,120]},
  {id:"CAR-OVI-002",name:"Chuletillas de lechazo",presentation:null,category:"Ovino",source:[51],days:[5,120]},
  {id:"CAR-POR-001",name:"Lomo de cerdo",presentation:null,category:"Porcino",source:[61],days:[5,120]},
  {id:"CAR-POR-002",name:"Solomillo de cerdo",presentation:null,category:"Porcino",source:[67,69],days:[5,120]},
  {id:"CAR-POR-003",name:"Costillas de cerdo",presentation:null,category:"Porcino",source:[72],days:[5,120]},
  {id:"CAR-POR-004",name:"Carne picada de cerdo",presentation:"Picada",category:"Porcino",source:[73],days:[2,90]},
  {id:"CAR-POR-005",name:"Cerdo para guisar",presentation:"Dados",category:"Porcino",source:[75],days:[2,90]}
 ];
 for(const spec of specs){
  const entry=records.find(x=>x.id===spec.id);
  assert.ok(entry,"ficha "+spec.id);
  assert.equal(entry.nombre,spec.name);
  assert.equal(entry.presentacion,spec.presentation);
  assert.equal(entry.categoria,"Carnes y Aves");
  assert.equal(entry.subcategoria,spec.category);
  assert.equal(entry.estado_recomendacion,"verificado");
  const aggregated=spec.id==="CAR-POR-005";
  assert.equal(entry.fuente,aggregated?"agregación":"FoodKeeper");
  assert.equal(entry.id_fuente,aggregated?null:String(spec.source[0]));
  assert.equal(entry.refrigeracion,true);
  assert.equal(entry.refrigeracion_dias,spec.days[0]);
  assert.equal(entry.congelacion,true);
  assert.equal(entry.congelacion_dias,spec.days[1]);
  assert.equal(entry.tips_refrigeracion,"");
  assert.equal(entry.tips_descongelacion,"");
  assert.equal(entry.despensa,false);
  assert.equal(entry.conserva,false);
  assert.equal(entry.despensa_dias,null);
  assert.equal(entry.conserva_dias,null);
  assert.equal(entry.tips_despensa,null);
  assert.equal(entry.tips_conserva,null);
  assert.equal(entry.tips_preparacion_conservacion,null);
  for(const id of spec.source){
   const p=products.find(x=>x.ID===id);
   assert.ok(p);
   assert.equal(p.Category_ID,10);
   assert.equal(p.DOP_Refrigerate_Metric,"Días");
   assert.equal(p.DOP_Freeze_Metric,"Meses");
   assert.equal(p.DOP_Refrigerate_Max,id===73?2:5);
   assert.equal(p.DOP_Freeze_Min,id===73?3:4);
  }
 }
 const tenderloin=records.find(x=>x.id==="CAR-POR-002");
 assert.ok(tenderloin.sinonimos.includes("Medallones de solomillo de cerdo"));
 assert.equal(records.filter(x=>x.nombre==="Solomillo de cerdo").length,1);
 assert.equal(records.filter(x=>x.subcategoria==="Ovino").length,2);
 assert.equal(records.filter(x=>x.subcategoria==="Porcino").length,5);
 const loin=records.find(x=>x.id==="CAR-POR-001");
 assert.equal(loin.presentacion,null);
 assert.ok(loin.sinonimos.includes("Filetes de lomo adobados"));
 assert.ok(loin.sinonimos.includes("Filetes de lomo sin adobar"));
 const allIds=records.map(x=>x.id_fuente).filter(Boolean);
 assert.equal(new Set(allIds).size,allIds.length,"IDs de procedencia únicos (ID 69 queda en expediente)");
});

test("pollo y pavo: 6 variantes, ID de FoodKeeper y solo frío/congelación",()=>{
 const original=JSON.parse(read("banco/fuentes/foodkeeper-es-original.json"));
 const products=original.sheets.find(s=>s.name==="Product").data.map(r=>Object.assign({},...r));
 const expected=[{"id":"CAR-POL-001","sub":"Pollo","name":"Pollo","presentation":"Pieza entera","sourceID":113,"freeze":360,"aggregate":false},{"id":"CAR-POL-002","sub":"Pollo","name":"Pechuga de pollo","presentation":"Pieza entera","sourceID":117,"freeze":270,"aggregate":false},{"id":"CAR-POL-003","sub":"Pollo","name":"Pechuga de pollo","presentation":"Filetes","sourceID":117,"freeze":270,"aggregate":true},{"id":"CAR-POL-004","sub":"Pollo","name":"Muslo de pollo","presentation":"Pieza entera","sourceID":118,"freeze":270,"aggregate":false},{"id":"CAR-POL-005","sub":"Pollo","name":"Carne picada de pollo","presentation":"Picada","sourceID":115,"freeze":90,"aggregate":false},{"id":"CAR-PAV-001","sub":"Pavo","name":"Pechuga de pavo","presentation":"Pieza entera","sourceID":120,"freeze":270,"aggregate":false}];
 for(const e of expected){
  const r=records.find(x=>x.id===e.id),p=products.find(x=>x.ID===e.sourceID);
  assert.ok(r&&p&&p.Category_ID===15);
  assert.equal(r.nombre,e.name);assert.equal(r.subcategoria,e.sub);
  assert.equal(r.presentacion,e.presentation);
  assert.equal(r.fuente,e.aggregate?"agregación":"FoodKeeper");
  assert.equal(r.id_fuente,e.aggregate?null:String(e.sourceID));
  assert.equal(r.refrigeracion,true);assert.equal(r.refrigeracion_dias,2);
  assert.equal(r.congelacion,true);assert.equal(r.congelacion_dias,e.freeze);
  assert.equal(r.despensa,false);assert.equal(r.conserva,false);
  assert.equal(r.despensa_dias,null);assert.equal(r.conserva_dias,null);
  assert.equal(r.tips_refrigeracion,"");assert.equal(r.tips_descongelacion,"");
  assert.equal(p.DOP_Refrigerate_Max,2);
  assert.equal(p.DOP_Freeze_Min*30,e.freeze);
 }
 assert.equal(records.filter(x=>x.nombre==="Pechuga de pollo").length,2);
 assert.deepEqual(records.filter(x=>x.nombre==="Pechuga de pollo").map(x=>x.presentacion),["Pieza entera","Filetes"]);
 assert.equal(records.filter(x=>x.subcategoria==="Pollo").length,5);
 assert.equal(records.filter(x=>x.subcategoria==="Pavo").length,1);
});
