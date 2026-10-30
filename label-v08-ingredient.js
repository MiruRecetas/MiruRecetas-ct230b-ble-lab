"use strict";
/* V0.8 · Ingrediente 30x20, referencia Canva DAHZfxOJgfA.
 * Reconstrucción en coordenadas de 300 dpi (354 x 236) basada en el
 * diseño aprobado, sin modificar Canva ni V0.7.3.
 * Cuatro campos dinámicos; dos reglas horizontales completas; isotipo BN.
 * Sin QR. Impresión TSPL de BITMAP disperso; BLE 20B/75ms heredado.
 */
const V8_ID=id=>document.getElementById(id);
const V8_WIDTH=354,V8_HEIGHT=236,V8_LIMIT=35000;
let v8Ready=false,v8Preparing=false,v8Printing=false;
function v8Date(str,required=true){
 if(!str){if(required)throw Error("Selecciona ambas fechas.");return "__/__/__";}
 if(!/^\d{4}-\d{2}-\d{2}$/.test(str))throw Error("Fecha incorrecta.");
 const t=new Date(str+"T12:00:00");
 if(Number.isNaN(t.valueOf())||t.toISOString().slice(0,10)!==str)throw Error("Fecha de calendario inválida.");
 return str.slice(8,10)+"/"+str.slice(5,7)+"/"+str.slice(2,4);
}
function v8Data(allowEmpty=false){
 const name=V8_ID("v8Name").value.trim().replace(/\s+/g," ");
 if(!name||name.length>55||/[<>\x00-\x1f]/.test(name))throw Error("Nombre del ingrediente no válido (máximo 55 caracteres).");
 const packed=V8_ID("v8Packed").value,expiry=V8_ID("v8Expiry").value;
 if(packed&&expiry&&expiry<packed)throw Error("El consumo preferente es anterior al envasado.");
 const quantity=Number(V8_ID("v8Quantity").value);
 if(!Number.isSafeInteger(quantity)||quantity<1||quantity>9999)throw Error("La cantidad debe estar entre 1 y 9999 gramos.");
 return {name,quantity,packed:v8Date(packed,!allowEmpty),expiry:v8Date(expiry,!allowEmpty)};
}
function v8Text(c,text,x,y,font,maxWidth,minSize){
 const match=/^(\w+)\s+(\d+)px\s+(.+)$/.exec(font);
 if(!match){c.font=font;c.fillText(text,x,y);return;}
 const [ ,weight,px,family]=match;
 let n=+px;
 c.font=weight+" "+n+"px "+family;
 while(c.measureText(text).width>maxWidth&&n>minSize){
  n--;c.font=weight+" "+n+"px "+family;
 }
 if(c.measureText(text).width>maxWidth)throw Error("El nombre o la cantidad no caben con lectura suficiente. Acorta el nombre.");
 c.fillText(text,x,y);
}
function v8Draw(d){
 if(typeof v7GetVisibleLogo!=="function")throw Error("No se cargó el isotipo oficial.");
 const logo=v7GetVisibleLogo();
 const cv=document.createElement("canvas");
 cv.width=V8_WIDTH;cv.height=V8_HEIGHT;
 const c=cv.getContext("2d",{willReadFrequently:true});
 if(!c)throw Error("Canvas no disponible.");
 c.fillStyle="#fff";c.fillRect(0,0,V8_WIDTH,V8_HEIGHT);
 c.fillStyle="#000";c.textAlign="left";c.textBaseline="alphabetic";
 // Autoridad visual: Canva 03 · ingrediente; encabezado sin cambio de posición.
 v8Text(c,d.name,8,32,'700 29px "Bricolage Grotesque"',337,17);
 // Dos líneas gruesas de ancho completo que separan título / fechas / contenido.
 c.fillRect(0,48,354,9);
 c.font='400 17px "Geist"';
 c.fillText("Envasado y congelación",8,91);
 c.fillText("Consumo preferente",8,124);
 c.font='700 17px "Geist"';c.textAlign="right";
 c.fillText(d.packed,337,91);
 c.fillText(d.expiry,337,124);
 c.textAlign="left";
 c.fillRect(0,136,354,9);
 // Cantidad en gran cuerpo, a la izquierda y libre de solapes con el isotipo.
 c.textAlign="center";
 v8Text(c,d.quantity+" g",128,195,'700 55px "Bricolage Grotesque"',248,32);
 c.textAlign="left";
 // Isotipo monocromo oficial de 6 piezas; no sustituir con un rectángulo.
 c.drawImage(logo,268,157,62,62);
 c.font='italic 500 16px "Geist"';
 c.fillText("Descongelar en nevera",60,227);
 return cv;
}
function v8Build(d){
 const canvas=v8Draw(d),blocks=v62SparseRegion(canvas,{x:0,y:0,w:354,h:236,label:"Canva ingrediente 30x20"});
 const parts=[encoder.encode("SIZE 30 mm,20 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")];
 for(const b of blocks){
  if(b.height>12)throw Error("Banda raster superior a 12 filas.");
  parts.push(encoder.encode("BITMAP "+b.x+","+b.y+","+b.widthBytes+","+b.height+",0,"));
  parts.push(b.bytes,encoder.encode("\r\n"));
 }
 parts.push(encoder.encode("PRINT 1,1\r\n"));
 const job=joinBuffers(...parts);
 if(job.length>V8_LIMIT)throw Error("El trabajo "+job.length+" B supera "+V8_LIMIT+" B; no se envía.");
 return {job,blocks:blocks.length,raster:blocks.reduce((s,b)=>s+b.bytes.length,0)};
}
function v8Update(){
 let valid=false;try{v8Data();valid=true;}catch(e){}
 V8_ID("v8Print").disabled=busy||v8Printing||!v8Ready||!valid||
  !device?.gatt?.connected||!writeChannel||!V8_ID("v8Confirm").checked;
}
async function v8Refresh(){
 if(v8Preparing)return;
 v8Preparing=true;
 try{
  await v5EnsureIdentity();
  const fs=await Promise.all([
   document.fonts.load('700 29px "Bricolage Grotesque"',"Carne Picada"),
   document.fonts.load('700 55px "Bricolage Grotesque"',"500 g"),
   document.fonts.load('400 17px "Geist"',"Envasado y congelación"),
   document.fonts.load('700 17px "Geist"',"30/10/26"),
   document.fonts.load('italic 500 16px "Geist"',"Descongelar en nevera")
  ]);
  if(fs.some(a=>!a.length||a.some(f=>f.status!=="loaded")))
   throw Error("No se cargó alguna fuente oficial.");
  v8Ready=true;
  const data=v8Data(true),view=V8_ID("v8Preview");
  view.width=V8_WIDTH;view.height=V8_HEIGHT;
  view.getContext("2d").drawImage(v8Draw(data),0,0);
  try{
   const m=v8Build(v8Data());
   V8_ID("v8Metrics").textContent=m.job.length+" B · "+Math.ceil(m.job.length/20)+
    " fragmentos BLE · "+m.blocks+" bandas de máximo 12 filas · sin QR.";
  }catch(e){V8_ID("v8Metrics").textContent="Vista previa disponible. Impresión pendiente: "+e.message;}
  V8_ID("v8Status").textContent="Vista previa preparada con las fuentes e isotipo oficiales. Diseño 30 × 20 en pruebas; V0.7.3 no modificada.";
 }catch(e){
  v8Ready=false;V8_ID("v8Status").textContent="No se puede generar la vista previa: "+e.message;
  log("V0.8 · ERROR: "+e.message);
 }finally{v8Preparing=false;v8Update();}
}
async function v8Print(){
 if(busy||v8Printing||!v8Ready||!device?.gatt?.connected||
    !writeChannel||!V8_ID("v8Confirm").checked)return;
 let b,d;
 try{d=v8Data();b=v8Build(d);}
 catch(e){log("V0.8 · BLOQUEADO: "+e.message);return;}
 if(!window.confirm("Imprimir UNA etiqueta de ingrediente 30 × 20 mm: "+d.name+
     " · "+d.quantity+" g · envasado "+d.packed+" · consumo "+d.expiry+"?\n"+
     "Trabajo "+b.job.length+" B. Papel 30×20 mm instalado. Sin reintentos automáticos."))return;
 v8Printing=true;v8Update();
 log("V0.8 · Ingrediente "+d.name+" · "+d.quantity+" g · "+b.job.length+" B / "+
   b.blocks+" bandas; 30×20, dos líneas raster, SIN QR.");
 try{await transmitDiagnostic(b.job,"V0.8 INGREDIENTE 30×20 · Canva aprobado");}
 finally{v8Printing=false;V8_ID("v8Confirm").checked=false;v8Update();}
}
for(const id of ["v8Name","v8Packed","v8Expiry","v8Quantity"]){
 V8_ID(id).addEventListener("input",()=>{v8Update();v8Refresh();});
 V8_ID(id).addEventListener("change",()=>{v8Update();v8Refresh();});
}
V8_ID("v8Confirm").addEventListener("change",v8Update);
V8_ID("v8Print").addEventListener("click",v8Print);
V8_ID("v8Name").value="Carne Picada";
V8_ID("v8Quantity").value="500";
const v8Today=new Date();
V8_ID("v8Packed").value=v8Today.getFullYear()+"-"+String(v8Today.getMonth()+1).padStart(2,"0")+
 "-"+String(v8Today.getDate()).padStart(2,"0");
log("V0.8 · Diseño Canva 30×20 ingrediente disponible; 4 campos; fuente e isotipo oficiales; sin QR. Impresión física pendiente.");
v8Refresh();
