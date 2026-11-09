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

test("catálogo de ciento setenta y siete fichas, con ID y variante únicos",()=>{
 assert.equal(records.length,177);
 assert.equal(new Set(records.map(x=>x.nombre+"|"+String(x.presentacion))).size,records.length);
 assert.equal(new Set(records.map(x=>x.id)).size,records.length);
 assert.deepEqual(new Set(records.map(x=>x.nombre)),new Set([
  "Carne picada de ternera","Redondo de ternera","Solomillo de ternera",
  "Filetes de ternera","Ternera para guisar",
  "Paletilla de lechazo","Chuletillas de lechazo",
  "Lomo de cerdo","Solomillo de cerdo","Costillas de cerdo",
  "Carne picada de cerdo","Cerdo para guisar",
  "Pollo","Pechuga de pollo","Muslo de pollo","Carne picada de pollo","Pechuga de pavo",
  "Hamburguesas de ternera","Hamburguesas de pollo","Salchichas frescas","Chorizo fresco","Chorizo criollo","Morcilla de Burgos","Morcilla Matachana","Filetes rusos","Pincho moruno","Lomo de cerdo adobado","Cachopo","San Jacobo","Jamón cocido","Jamón serrano","Jamón ibérico","Pechuga de pavo (fiambre)","Salami","Lomo de cerdo embuchado","Salchichón","Chorizo curado","Bacon","Cecina",
  "Bacalao","Abadejo","Dorada","Lubina","Merluza","Corvina","Boquerón","Atún","Bonito","Caballa","Jurel","Pez espada","Salmón","Sardina","Almejas","Mejillones","Langostinos","Gambas","Gambón","Zamburiñas","Bogavante","Pulpo","Calamar","Chipirón","Sepia","Patata","Boniato","Yuca","Apionabo","Zanahoria","Remolacha","Champiñón","Portobello","Shiitake","Seta de ostra","Boletus","Níscalos","Lechuga","Repollo","Espinacas","Mezcla de hojas para ensalada","Acelga","Rúcula","Berzas","Escarola","Endivias","Canónigos","Orejones","Salsa de tomate",
  "Alcachofa","Espárragos","Brócoli","Coles de Bruselas","Coliflor","Puerro","Pepino","Berenjena","Pimiento","Calabaza","Calabacín","Tomate","Tomate cherry","Ajo","Cebolla seca","Cebolleta","Judías verdes","Habas frescas","Guisantes frescos","Edamame fresco","Rábano",
  "Manzana","Albaricoque fresco","Melocotón","Nectarina","Ciruela","Pera","Cerezas","Uvas","Granada","Naranja","Limón","Lima","Pomelo","Mandarina","Clementina","Fresas / fresón","Frambuesas","Moras","Grosellas","Arándanos azules","Aguacate","Chirimoya","Kiwi","Piña","Papaya","Mango fresco","Melón","Sandía","Plátano dulce / banana","Coco fresco","Coco rallado","Dátiles","Uvas pasas","Higos frescos","Caqui","Nísperos","Membrillo fresco","Compota de manzana casera"
 ]));
 assert.equal(categories.length,4);
 assert.equal(Object.values(subcategories).flat().length,28);
 assert.deepEqual(subcategories["Carnes y Aves"],
  ["Vacuno","Porcino","Ovino","Pollo","Pavo","Otras aves","Caza","Elaborados","Charcutería"]);
 for(const empty of ["Otras aves","Caza"])
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
 assert.equal(potato.despensa_dias,60);assert.equal(potato.presentacion,"Pieza entera cruda");assert.equal(potato.congelacion,false);assert.equal(potato.congelacion_dias,null);
 assert.equal(lettuce.estado_recomendacion,"verificado");assert.equal(lettuce.fuente,"agregación");
 assert.equal(lettuce.id_fuente,null);assert.equal(lettuce.refrigeracion_dias,14);
 assert.equal(lettuce.despensa,false);assert.equal(lettuce.conserva,false);
 assert.equal(lettuce.congelacion,false);
 assert.equal(apricot.id_fuente,"379");assert.equal(apricot.despensa_dias,180);assert.equal(apricot.refrigeracion,false);
 assert.ok(apricot.sinonimos.includes("Albaricoques deshidratados"));
 assert.equal(byName("Pulpo").estado_recomendacion,"verificado");
 assert.equal(byName("Pulpo").refrigeracion_dias,2);
 assert.equal(byName("Pulpo").congelacion_dias,180);
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
 assert.deepEqual(permitted(byName("Pulpo")),["fridge","freeze"]);
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
 assert.ok(!loin.sinonimos.includes("Filetes de lomo adobados"));
 assert.ok(records.find(x=>x.id==="CAR-ELA-010").sinonimos.includes("Filetes de lomo adobados"));
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

test("Elaborados y Charcutería: veintidós fichas, fuentes y modalidades coherentes",()=>{
 const additions=[{"id":"CAR-ELA-001","name":"Hamburguesas de ternera","cat":"Elaborados","presentation":null,"fridge":2,"freeze":90,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-002","name":"Hamburguesas de pollo","cat":"Elaborados","presentation":null,"fridge":2,"freeze":90,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-003","name":"Salchichas frescas","cat":"Elaborados","presentation":null,"fridge":2,"freeze":30,"src":"FoodKeeper","sourceId":"102","state":"verificado"},{"id":"CAR-ELA-004","name":"Chorizo fresco","cat":"Elaborados","presentation":null,"fridge":2,"freeze":30,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-005","name":"Chorizo criollo","cat":"Elaborados","presentation":null,"fridge":2,"freeze":30,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-006","name":"Morcilla de Burgos","cat":"Elaborados","presentation":null,"fridge":5,"freeze":30,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-007","name":"Morcilla Matachana","cat":"Elaborados","presentation":null,"fridge":5,"freeze":30,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-008","name":"Filetes rusos","cat":"Elaborados","presentation":null,"fridge":2,"freeze":90,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-009","name":"Pincho moruno","cat":"Elaborados","presentation":null,"fridge":2,"freeze":90,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-010","name":"Lomo de cerdo adobado","cat":"Elaborados","presentation":null,"fridge":5,"freeze":120,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-ELA-011","name":"Cachopo","cat":"Elaborados","presentation":null,"fridge":2,"freeze":null,"src":"agregación","sourceId":null,"state":"parcial"},{"id":"CAR-ELA-012","name":"San Jacobo","cat":"Elaborados","presentation":null,"fridge":2,"freeze":null,"src":"agregación","sourceId":null,"state":"parcial"},{"id":"CAR-CHA-001","name":"Jamón cocido","cat":"Charcutería","presentation":"Al corte","fridge":5,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-002","name":"Jamón serrano","cat":"Charcutería","presentation":"Al corte","fridge":3,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-003","name":"Jamón ibérico","cat":"Charcutería","presentation":"Al corte","fridge":3,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-004","name":"Pechuga de pavo (fiambre)","cat":"Charcutería","presentation":"Al corte","fridge":5,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-005","name":"Salami","cat":"Charcutería","presentation":"Al corte","fridge":6,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-006","name":"Lomo de cerdo embuchado","cat":"Charcutería","presentation":"Al corte","fridge":6,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-007","name":"Salchichón","cat":"Charcutería","presentation":"Al corte","fridge":6,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-008","name":"Chorizo curado","cat":"Charcutería","presentation":"Al corte","fridge":6,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"},{"id":"CAR-CHA-009","name":"Bacon","cat":"Charcutería","presentation":"Al corte","fridge":7,"freeze":30,"src":"FoodKeeper","sourceId":"79","state":"verificado"},{"id":"CAR-CHA-010","name":"Cecina","cat":"Charcutería","presentation":"Al corte","fridge":6,"freeze":null,"src":"agregación","sourceId":null,"state":"verificado"}];
 for(const e of additions){
  const r=records.find(x=>x.id===e.id);
  assert.ok(r,e.id);
  assert.equal(r.categoria,"Carnes y Aves");
  assert.equal(r.subcategoria,e.cat);
  assert.equal(r.nombre,e.name);
  assert.equal(r.presentacion,e.presentation);
  assert.equal(r.estado_recomendacion,e.state);
  assert.equal(r.fuente,e.src);
  assert.equal(r.id_fuente,e.sourceId);
  assert.equal(r.refrigeracion,true);
  assert.equal(r.refrigeracion_dias,e.fridge);
  assert.equal(r.congelacion,!["CAR-CHA-001","CAR-CHA-002","CAR-CHA-003","CAR-CHA-004","CAR-CHA-005","CAR-CHA-006","CAR-CHA-007","CAR-CHA-008","CAR-CHA-010"].includes(r.id));
  assert.equal(r.congelacion_dias,e.freeze);
  if(!r.congelacion)assert.equal(r.tips_descongelacion,null);
  assert.equal(r.despensa,["CAR-CHA-002","CAR-CHA-003","CAR-CHA-006","CAR-CHA-007","CAR-CHA-008"].includes(r.id));assert.equal(r.conserva,false);
  assert.equal(r.despensa_dias,r.despensa?60:null);assert.equal(r.conserva_dias,null);
  if(e.freeze===null)assert.equal(r.tips_descongelacion,null);
 }
 assert.equal(records.filter(x=>x.subcategoria==="Elaborados").length,12);
 assert.equal(records.filter(x=>x.subcategoria==="Charcutería").length,15);
 for(const id of ["CAR-ELA-006","CAR-ELA-007"]){
  const x=records.find(r=>r.id===id);
  assert.equal(x.refrigeracion_dias,5);
  assert.equal(x.tips_refrigeracion,"Frío obligatorio: 2–4 °C");
  assert.equal(x.despensa,false);
  assert.equal(x.congelacion_dias,30);
 }
 for(const id of ["CAR-CHA-002","CAR-CHA-003","CAR-CHA-006","CAR-CHA-007","CAR-CHA-008"]){
  const x=records.find(r=>r.id===id);
  assert.equal(x.despensa,true);assert.equal(x.despensa_dias,60);
  assert.equal(x.tips_despensa,"Envasado al vacío");
 }
 for(const id of ["CAR-CHA-001","CAR-CHA-004","CAR-CHA-005","CAR-CHA-009","CAR-CHA-010"]){
  const x=records.find(r=>r.id===id);
  assert.equal(x.despensa,false);assert.equal(x.despensa_dias,null);
 }
 const natural=records.find(x=>x.id==="CAR-POR-001");
 assert.equal(natural.subcategoria,"Porcino");
 assert.ok(!natural.sinonimos.includes("Lomo de cerdo adobado"));
 const dressed=records.find(x=>x.id==="CAR-ELA-010");
 assert.equal(dressed.nombre,"Lomo de cerdo adobado");
 assert.ok(dressed.sinonimos.includes("Filetes de lomo adobados"));
});

test("cinco piezas enteras solo despensa y cinco loncheados condicionados al vacío",()=>{
 const originalIds=["CAR-CHA-002","CAR-CHA-003","CAR-CHA-006","CAR-CHA-007","CAR-CHA-008"];
 const wholeIds=["CAR-CHA-011","CAR-CHA-012","CAR-CHA-013","CAR-CHA-014","CAR-CHA-015"];
 for(let i=0;i<5;i++){
  const cut=records.find(x=>x.id===originalIds[i]);
  const whole=records.find(x=>x.id===wholeIds[i]);
  assert.ok(cut&&whole);assert.equal(cut.nombre,whole.nombre);
  assert.equal(cut.presentacion,"Al corte");assert.equal(whole.presentacion,"Pieza entera");
  assert.equal(cut.refrigeracion,true);assert.equal(cut.congelacion,false);
  assert.equal(cut.congelacion_dias,null);
  assert.equal(cut.despensa,true);assert.equal(cut.despensa_dias,60);
  assert.equal(cut.tips_despensa,"Envasado al vacío");
  assert.equal(whole.refrigeracion,false);assert.equal(whole.congelacion,false);
  assert.equal(whole.despensa,true);assert.equal(whole.despensa_dias,180);
  assert.equal(whole.conserva,false);assert.equal(whole.fuente,"usuario");
  assert.equal(whole.id_fuente,null);
 }
 assert.equal(records.length,177);
 assert.equal(records.filter(x=>x.subcategoria==="Charcutería").length,15);
});

test("Pescado azul doméstico · 10 presentaciones, plazos FoodKeeper 146",()=>{
 const expected=[{"id":"PES-AZU-001","name":"Boquerón","presentation":"Pieza entera"},{"id":"PES-AZU-002","name":"Atún","presentation":"Lomos"},{"id":"PES-AZU-003","name":"Bonito","presentation":"Lomos"},{"id":"PES-AZU-004","name":"Bonito","presentation":"Rodajas"},{"id":"PES-AZU-005","name":"Caballa","presentation":"Pieza entera"},{"id":"PES-AZU-006","name":"Jurel","presentation":"Lomos"},{"id":"PES-AZU-007","name":"Jurel","presentation":"Pieza entera"},{"id":"PES-AZU-008","name":"Pez espada","presentation":"Rodajas"},{"id":"PES-AZU-009","name":"Salmón","presentation":"Lomos"},{"id":"PES-AZU-010","name":"Sardina","presentation":"Pieza entera"}];
 const actual=records.filter(x=>x.subcategoria==="Pescado azul");
 assert.equal(actual.length,10);
 for(const e of expected){
  const x=actual.find(x=>x.id===e.id);
  assert.ok(x,e.id);
  assert.equal(x.nombre,e.name);
  assert.equal(x.presentacion,e.presentation);
  assert.equal(x.refrigeracion_dias,2);
  assert.equal(x.congelacion_dias,60);
  assert.equal(x.despensa,false);
  assert.equal(x.fuente,"agregación");
  assert.equal(x.id_fuente,null);
 }
});

test("mariscos: vivos/frescos unidos, variantes seleccionadas y Pulpo completado",()=>{
 const shells=[["PES-CRM-001","Almejas","Frescas",2,60],["PES-CRM-002","Mejillones","Frescos",2,60],["PES-CRM-003","Langostinos","Crudos",3,180],["PES-CRM-004","Langostinos","Cocidos",4,30],["PES-CRM-005","Langostinos","Pelados",3,180],["PES-CRM-006","Gambas","Crudas",3,180],["PES-CRM-007","Gambas","Cocidas",4,30],["PES-CRM-008","Gambas","Peladas",3,180],["PES-CRM-009","Gambón","Crudo",3,180],["PES-CRM-010","Gambón","Cocido",4,30],["PES-CRM-011","Gambón","Pelado",3,180],["PES-CRM-012","Zamburiñas","Frescas",3,180],["PES-CRM-013","Bogavante","Pieza entera",1,60],["PES-CRM-014","Bogavante","Colas",2,60]];
 const cephs=[["PES-CEF-002","Calamar",null,3,180],["PES-CEF-003","Chipirón","Fresco",3,180],["PES-CEF-004","Sepia","Fresca",3,180]];
 for(const [id,n,p,fr,fz] of [...shells,...cephs]){
  const x=records.find(r=>r.id===id);assert.ok(x,id);
  assert.equal(x.nombre,n);assert.equal(x.presentacion,p);
  assert.equal(x.refrigeracion_dias,fr);assert.equal(x.congelacion_dias,fz);
  assert.equal(x.despensa,false);assert.equal(x.conserva,false);
 }
 assert.equal(records.filter(x=>x.subcategoria==="Crustáceos y moluscos").length,14);
 assert.equal(records.filter(x=>x.subcategoria==="Cefalópodos").length,4);
 assert.equal(records.filter(x=>x.id==="PES-CEF-001").length,1);
 assert.equal(records.find(x=>x.id==="PES-CEF-001").estado_recomendacion,"verificado");
 assert.equal(records.length,177);
});

test("verduras de hoja aprobadas: 14 fichas, sin duplicar lechuga ni atribuir IDs de grupos",()=>{
 const hoja=records.filter(x=>x.subcategoria==="Verduras de hoja");
 assert.equal(hoja.length,14);
 const lettuce=hoja.find(x=>x.id==="FRV-HOJ-001");
 assert.equal(lettuce.nombre,"Lechuga");assert.equal(lettuce.presentacion,"Iceberg o romana");
 assert.equal(lettuce.refrigeracion_dias,14);assert.equal(lettuce.id_fuente,null);
 const fresh=[["Repollo","Crudo",14,"278"],["Espinacas","Crudas",7,null],
  ["Acelga","Cruda",14,"550"],["Berzas","Crudas",7,null]];
 const blanched=[["Repollo","Escaldado",300],["Espinacas","Escaldadas",240],
  ["Acelga","Escaldada",240],["Berzas","Escaldadas",240]];
 for(const [nombre,presentacion,days,source] of fresh){
  const x=hoja.find(z=>z.nombre===nombre&&z.presentacion===presentacion);
  assert.ok(x,nombre+" crudo");assert.equal(x.refrigeracion_dias,days);
  assert.equal(x.congelacion,false);assert.equal(x.id_fuente,source);
 }
 for(const [nombre,presentacion,days] of blanched){
  const x=hoja.find(z=>z.nombre===nombre&&z.presentacion===presentacion);
  assert.ok(x,nombre+" escaldado");assert.equal(x.refrigeracion_dias,4);
  assert.equal(x.congelacion_dias,days);assert.equal(x.fuente,"agregación");assert.equal(x.id_fuente,null);
 }
 for(const [nombre,days,source] of [["Mezcla de hojas para ensalada",2,"415"],
  ["Rúcula",7,"678"],["Escarola",7,null],["Endivias",7,null],["Canónigos",5,null]]){
  const x=hoja.find(z=>z.nombre===nombre);assert.ok(x,nombre);
  assert.equal(x.refrigeracion_dias,days);assert.equal(x.congelacion,false);
  assert.equal(x.id_fuente,source);
 }
 const ids=records.map(x=>x.id_fuente).filter(Boolean);
 assert.equal(new Set(ids).size,ids.length);
});

test("hortalizas seleccionadas y rábano: 23 fichas, 21 nombres, trazabilidad sin IDs inventados",()=>{
 const a=records.filter(x=>x.subcategoria==="Hortalizas");
 assert.equal(records.length,177);assert.equal(a.length,22);
 assert.equal(records.filter(x=>x.subcategoria==="Tubérculos").length,13);
 for(const n of ["Alcachofa","Espárragos","Brócoli","Coles de Bruselas","Coliflor","Puerro","Pepino","Berenjena","Pimiento","Calabaza","Calabacín","Tomate","Tomate cherry","Ajo","Cebolla seca","Cebolleta","Judías verdes","Habas frescas","Guisantes frescos","Edamame fresco"])assert.ok(a.some(x=>x.nombre===n),n);
 const by=(n,p)=>a.find(x=>x.nombre===n&&x.presentacion===p);
 for(const n of ["Pimiento","Cebolla seca"]){assert.ok(by(n,"Pieza entera"));assert.ok(by(n,"Picada"));}
 assert.equal(by("Pimiento","Pieza entera").id_fuente,"296");
 assert.equal(by("Pimiento","Picada").id_fuente,null);
 assert.equal(by("Cebolla seca","Pieza entera").id_fuente,"294");
 assert.equal(by("Cebolla seca","Picada").id_fuente,null);
 assert.equal(by("Pimiento","Picada").refrigeracion_dias,3);
 assert.equal(by("Cebolla seca","Picada").refrigeracion_dias,7);
 assert.equal(by("Judías verdes",null).id_fuente,"273");
 for(const n of ["Habas frescas","Guisantes frescos"]){assert.equal(by(n,null).fuente,"agregación");assert.equal(by(n,null).id_fuente,null);}
 assert.equal(by("Calabacín","Fresco, entero").id_fuente,"302");
 assert.equal(by("Tomate",null).id_fuente,"306");assert.equal(by("Tomate",null).despensa,false);
 const radish=records.find(x=>x.nombre==="Rábano");
 assert.equal(radish.subcategoria,"Tubérculos");assert.equal(radish.id_fuente,"299");
 const products=JSON.parse(read("banco/fuentes/foodkeeper-es-original.json")).sheets.find(x=>x.name==="Product").data.map(row=>Object.assign({},...row));
 for(const x of [...a,radish])if(x.id_fuente!==null)assert.ok(products.some(y=>String(y.ID)===x.id_fuente&&y.Category_ID===19));
 const refs=records.map(x=>x.id_fuente).filter(Boolean);assert.equal(new Set(refs).size,refs.length);
 for(const x of a){assert.equal(x.conserva,false);if(!x.congelacion)assert.equal(x.congelacion_dias,null);}
});

test("Frutas aprobadas: 39 nuevas fichas, compota en Conservas sin despensa y sin duplicar Orejones",()=>{
 const fruit=records.filter(x=>x.subcategoria==="Frutas");
 assert.equal(records.length,177);assert.equal(fruit.length,40);
 assert.equal(records.filter(x=>x.nombre==="Orejones").length,1);
 const get=(n,p)=>fruit.find(x=>x.nombre===n&&x.presentacion===p);
 for(const n of ["Manzana","Albaricoque fresco","Melocotón","Nectarina","Ciruela","Pera","Cerezas","Uvas","Granada","Naranja","Limón","Lima","Pomelo","Mandarina","Clementina","Fresas / fresón","Frambuesas","Moras","Grosellas","Arándanos azules","Aguacate","Chirimoya","Kiwi","Piña","Papaya","Mango fresco","Melón","Sandía","Plátano dulce / banana","Coco fresco","Coco rallado","Dátiles","Uvas pasas","Higos frescos","Caqui","Nísperos","Membrillo fresco"])assert.ok(fruit.some(x=>x.nombre===n),n);
 for(const n of ["Granada","Piña"]){assert.ok(get(n,"Pieza entera"));assert.ok(get(n,n==="Granada"?"Desgranada":"Cortada"));}
 assert.equal(get("Granada","Pieza entera").id_fuente,"269");
 assert.equal(get("Granada","Desgranada").id_fuente,null);
 assert.equal(get("Piña","Pieza entera").id_fuente,"267");
 assert.equal(get("Piña","Cortada").id_fuente,null);
 assert.equal(get("Naranja",null).id_fuente,"256");
 for(const n of ["Limón","Lima","Pomelo","Mandarina","Clementina"])assert.equal(get(n,null).id_fuente,null);
 assert.equal(get("Melocotón",null).id_fuente,"266");
 for(const n of ["Nectarina","Ciruela","Pera"])assert.equal(get(n,null).id_fuente,null);
 assert.equal(get("Papaya",null).id_fuente,"265");
 assert.equal(get("Mango fresco",null).id_fuente,null);
 assert.equal(get("Uvas pasas",null).id_fuente,null);
 assert.equal(get("Coco rallado","Seco, envase sin abrir").despensa_dias,365);
 const comp=records.find(x=>x.id==="DES-CON-002");
 assert.equal(comp.nombre,"Compota de manzana casera");
 assert.equal(comp.categoria,"Despensa");assert.equal(comp.subcategoria,"Conservas");
 assert.equal(comp.refrigeracion_dias,4);assert.equal(comp.congelacion_dias,120);
 assert.equal(comp.despensa,false);assert.equal(comp.conserva,false);
 for(const n of ["Higos frescos","Caqui","Nísperos","Membrillo fresco"]){assert.equal(get(n,null).id_fuente,null);}
 const ids=records.map(x=>x.id_fuente).filter(Boolean);
 assert.equal(new Set(ids).size,ids.length);
 for(const x of fruit){if(!x.refrigeracion)assert.equal(x.refrigeracion_dias,null);if(!x.congelacion)assert.equal(x.congelacion_dias,null);if(!x.despensa)assert.equal(x.despensa_dias,null);}
});
