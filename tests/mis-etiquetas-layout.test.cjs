"use strict";
/* Contrato de experiencia de Mis etiquetas: composición responsive, pasos y
 * eliminación de notas. No se requiere hardware CT230B para estas pruebas. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const folder=path.resolve(__dirname,"../ingredientes-v1");
const html=fs.readFileSync(path.join(folder,"index.html"),"utf8");
const css=fs.readFileSync(path.join(folder,"style.css"),"utf8");
const app=fs.readFileSync(path.join(folder,"app.js"),"utf8");
const main=html.slice(html.indexOf('<main class="page">'),html.indexOf('</main>')+7);

test("Encabezado de Conserva como el recetario, con subtítulo breve",()=>{
 const eyebrow=main.indexOf('<p class="eyebrow">Conserva</p>');
 const heading=main.indexOf('<h1>Mis etiquetas</h1>');
 const subtitle=main.indexOf('<p class="intro">Crea e imprime tus etiquetas de conservación.</p>');
 const layout=main.indexOf('<div class="layout-grid">');
 assert.ok(eyebrow>=0&&eyebrow<heading&&heading<subtitle&&subtitle<layout);
 assert.match(css,/\.eyebrow\{[^}]*color:#b96c4a;[^}]*font-size:\.7rem;[^}]*letter-spacing:\.16em;[^}]*font-weight:700;[^}]*text-transform:uppercase/);
 assert.match(css,/\.intro\{[^}]*font-size:16px;[^}]*line-height:1\.5;[^}]*color:#67756b/);
 assert.match(html,/href="\.\/style\.css\?v=20261108-banco-panel-v1"/);
 // No se modifican los elementos visuales aprobados de las etiquetas ni la cabecera interior.
 assert.equal((main.match(/class="card format-card"/g)||[]).length,1);
 assert.equal((main.match(/class="card step-card"/g)||[]).length,2);
});

test("Una tarjeta fija agrupa exactamente selector, cuatro opciones y tres vistas previas",()=>{
 assert.equal((main.match(/class="card format-card"/g)||[]).length,1);
 assert.equal((main.match(/class="format-preview"/g)||[]).length,1);
 assert.match(main,/<h2 id="format-heading">Elige un formato<\/h2>/);
 assert.match(main,/<p class="small">Selecciona el diseño que quieres imprimir<\/p>/);
 assert.equal((main.match(/class="format-icon"/g)||[]).length,4);
 assert.equal((main.match(/data-label-format/g)||[]).length,3);
 for(const id of ["preview","c-preview","a-preview"])
  assert.equal((main.match(new RegExp('id="'+id+'"',"g"))||[]).length,1);
 assert.ok(main.indexOf('class="format-options"')<main.indexOf('class="format-preview"'));
 assert.ok(main.indexOf('class="format-preview"')<main.indexOf('id="data-step"'));
 assert.doesNotMatch(main,/id="preview-heading"|id="preview-subtitle"|id="preview-dimensions"/);
});

test("Dos únicos pasos: 1 abierto y 2 cerrado inicialmente, sin paso intermedio",()=>{
 assert.equal((main.match(/class="card step-card"/g)||[]).length,2);
 assert.match(main,/<details id="data-step" class="card step-card" open>/);
 assert.match(main,/<details id="print-step" class="card step-card">/);
 assert.match(main,/<h2 id="data-heading">Datos de la etiqueta<\/h2>/);
 assert.match(main,/<h2 id="device-heading">Imprime tu etiqueta<\/h2>/);
 assert.ok(main.indexOf('id="data-step"')<main.indexOf('id="print-step"'));
 assert.match(app,/step\.addEventListener\("toggle",/);
 assert.match(app,/if\(step\.open\)for\(const other of steps\)if\(other!==step\)other\.open=false/);
 for(const old of ["data-subtitle","preview-subtitle","preview-dimensions","print-subtitle","alternate-print"])
  assert.ok(!main.includes('id="'+old+'"'));
});

test("Móvil ordenado y escritorio repartido en dos columnas, selector nunca plegable",()=>{
 assert.ok(main.indexOf('class="format-column"')<main.indexOf('class="steps-column"'));
 assert.ok(main.indexOf('class="card format-card"')<main.indexOf('<details'));
 assert.match(css,/\.layout-grid\{display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(0,1\.06fr\)/);
 assert.match(css,/\.format-column\{grid-column:2;grid-row:1/);
 assert.match(css,/\.steps-column\{grid-column:1;grid-row:1/);
 assert.match(css,/@media\(max-width:679px\),\(max-width:900px\) and \(orientation:portrait\)\{[\s\S]*?\.layout-grid\{display:flex;flex-direction:column/);
 assert.ok(!main.includes('class="content-grid"'));
});

test("Formularios sin anotaciones y controles opcionales debajo del campo",()=>{
 assert.ok(!main.includes('class="field-note"'));
 assert.ok(!main.includes('class="disclaimer"'));
 assert.doesNotMatch(main,/\((obligatoria|opcional|encabezado siempre visible)\)/);
 for(const [check,field] of [
  ["notes-enabled","note"],["c-nutrition-enabled","c-nutrition-fields"],
  ["a-nutrition-enabled","a-nutrition-fields"],
  ["c-instruction-enabled","c-instruction"],["c-note-enabled","c-note"],
  ["a-instruction-enabled","a-instruction"],["a-note-enabled","a-note"]
 ]){
  const inputIndex=main.indexOf('id="'+field+'"'),checkIndex=main.indexOf('for="'+check+'"');
  assert.ok(inputIndex>=0&&checkIndex>inputIndex,check+" debe ir después de "+field);
 }
 assert.match(css,/#c-nutrition-fields\[hidden\],#a-nutrition-fields\[hidden\]/);
 for(const id of ["name","grams","mode","packed","expiry","note","notes-enabled",
  "c-name","c-mode","c-packed","c-expiry","c-nutrition-enabled","c-instruction","c-note",
  "a-name","a-mode","a-packed","a-expiry","a-nutrition-enabled","a-instruction","a-note"])
  assert.ok(main.includes('id="'+id+'"'),"Falta "+id);
});

test("Impresión no pierde funciones, pero elimina textos accesorios",()=>{
 for(const id of ["connection","connect","disconnect","copies","copies-plus","copies-minus",
  "confirm-paper","print","transport","progress","copy","clear","log"])
  assert.ok(main.includes('id="'+id+'"'),id);
 assert.ok(!main.includes('id="print-subtitle"'));
 assert.equal((main.match(/class="intro"/g)||[]).length,1);
 assert.ok(!main.includes('class="footer"'));
 assert.ok(!main.includes("La multicopia usa PRINT"));
 assert.ok(!main.includes("Este indicador mide la transmisión"));
 assert.ok(!main.includes("La impresión requiere Chrome Android"));
 assert.match(app,/motor\.build\(motor\.render\(d,logo\),copies\)/);
});

test("La vista previa mantiene accesibilidad y sólo revela errores de construcción",()=>{
 assert.match(css,/\.format-preview \.status-line\{display:none\}/);
 assert.match(css,/\.format-preview \.status-line\[data-error="true"\]\{display:block/);
 for(const id of ["design-status","c-status","a-status"])
  assert.ok(app.includes('$("'+id+'").dataset.error="true"'));
 assert.match(html,/src="\.\/app\.js\?v=20261108-banco-integration-v1"/);
 assert.match(html,/href="\.\/style\.css\?v=20261108-banco-panel-v1"/);
});
