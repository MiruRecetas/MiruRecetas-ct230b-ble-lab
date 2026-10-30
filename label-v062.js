"use strict";
/* V0.6.2 · ETIQUETA IGUAL A V0.6, RASTER PARCELADO Y DISPERSO.
 * Hipótesis por comprobar: la carga binaria de 53.146 B puede exceder
 * capacidades de recepción/impresión sostenida del equipo.
 * NO se altera el diseño, las fuentes, macros, patrón, densidad ni QR.
 * Las bandas orig. se dividen en 7 regiones no solapadas y cortes de
 * máximo 12 filas. Solo se transmiten columnas/filas con tinta.
 * No es un resultado validado físicamente ni una solución garantizada.
 */
const V62_EL=id=>document.getElementById(id);
const V62_MAX_BYTES=35000;
const V62_STRIPE_ROWS=12;
const V62_REGIONS=Object.freeze([
 {x:0,y:0,w:576,h:115,label:"cabecera"},
 {x:0,y:130,w:304,h:275,label:"anillo"},
 {x:304,y:130,w:272,h:275,label:"macros"},
 {x:0,y:430,w:416,h:92,label:"fecha textos"},
 {x:416,y:430,w:160,h:92,label:"fecha numeros"},
 {x:0,y:546,w:344,h:300,label:"descongelacion"},
 {x:0,y:873,w:576,h:72,label:"firma"}
]);
function v62SparseRegion(src,region){
 const raster=v5ToTsplBitmap(v6Crop(src,region));
 const blocks=[];
 const stride=raster.widthBytes, bytes=raster.bytes;
 for(let y=0;y<raster.height;y+=V62_STRIPE_ROWS){
  const end=Math.min(raster.height,y+V62_STRIPE_ROWS);
  let minCol=stride,maxCol=-1,minRow=end,maxRow=-1;
  for(let iy=y;iy<end;iy++)for(let ix=0;ix<stride;ix++){
   if(bytes[iy*stride+ix]===255)continue;
   minCol=Math.min(minCol,ix);maxCol=Math.max(maxCol,ix);
   minRow=Math.min(minRow,iy);maxRow=Math.max(maxRow,iy);
  }
  if(maxCol<0)continue;
  const w=maxCol-minCol+1,h=maxRow-minRow+1;
  const cropped=new Uint8Array(w*h);
  for(let iy=minRow;iy<=maxRow;iy++){
   cropped.set(bytes.subarray(iy*stride+minCol,iy*stride+maxCol+1),(iy-minRow)*w);
  }
  blocks.push({x:region.x+minCol*8,y:region.y+minRow,widthBytes:w,height:h,bytes:cropped,label:region.label});
 }
 return blocks;
}
function v62Build(dates){
 const canvas=v6Render(dates),all=[];
 for(const region of V62_REGIONS)all.push(...v62SparseRegion(canvas,region));
 const parts=[encoder.encode(v6Header())];
 for(const tile of all){
  parts.push(encoder.encode("BITMAP "+tile.x+","+tile.y+","+tile.widthBytes+","+tile.height+",0,"));
  parts.push(tile.bytes);
  parts.push(encoder.encode("\r\n"));
 }
 for(const y of [119,415,530,861])parts.push(encoder.encode("BAR 26,"+y+",531,3\r\n"));
 parts.push(encoder.encode(v6Qr()+"\r\nPRINT 1,1\r\n"));
 const job=joinBuffers(...parts);
 return {job,blocks:all.length,rasterBytes:all.reduce((s,t)=>s+t.bytes.length,0)};
}
function updateV062Buttons(){
 const connected=!!(device&&device.gatt&&device.gatt.connected&&writeChannel);
 let valid=false;try{v6Dates();valid=true;}catch(e){}
 V62_EL("v62Label").disabled=busy||!connected||!V62_EL("v62Confirm").checked||!v6Ready||!valid;
}
function v62Metrics(){
 try{
  if(!v6Ready)throw Error("Aún cargando fuentes e isotipo.");
  const dates=v6Dates(),build=v62Build(dates);
  V62_EL("v62Metrics").textContent="Trabajo calculado: "+build.job.length+" bytes / "+Math.ceil(build.job.length/20)+" fragmentos BLE; "+build.blocks+" sub-bandas raster ("+build.rasterBytes+" bytes gráficos). Límite de seguridad de esta prueba: "+V62_MAX_BYTES+" bytes.";
 }catch(e){V62_EL("v62Metrics").textContent="Indica las dos fechas y confirma la carga de fuentes para calcular el tamaño: "+e.message;}
 updateV062Buttons();
}
async function v62Print(){
 if(busy||!device?.gatt?.connected||!writeChannel||!V62_EL("v62Confirm").checked||!v6Ready)return;
 let build,dates;
 try{dates=v6Dates();build=v62Build(dates);}
 catch(e){log("v0.6.2 · BLOQUEADO: "+e.message);return;}
 if(build.job.length>V62_MAX_BYTES){
  log("v0.6.2 · BLOQUEADO, trabajo raster todavía demasiado grande ("+build.job.length+" > "+V62_MAX_BYTES+" bytes). No se ha enviado nada.");
  V62_EL("v62Metrics").textContent="No se puede enviar: el tamaño supera el umbral de prueba.";
  return;
 }
 if(!window.confirm("¿Imprimir UNA etiqueta experimental V0.6.2, 50 × 80 mm, misma composición y QR que v0.6, raster optimizado?\n"+
  "Trabajo "+build.job.length+" bytes en "+Math.ceil(build.job.length/20)+" fragmentos, "+build.blocks+" sub-bandas; inspecciona antes de repetir."))return;
 log("v0.6.2 · MISMO DISEÑO y mismo QR NATIVO, raster disperso; "+build.blocks+" bandas, "+build.rasterBytes+" bytes de imagen y "+build.job.length+" bytes totales.");
 await transmitDiagnostic(build.job,"v0.6.2 ETIQUETA COMPLETA 50×80 RASTER DISPERSO");
 V62_EL("v62Confirm").checked=false;updateV062Buttons();
}
V62_EL("v62Confirm").addEventListener("change",updateV062Buttons);
V62_EL("v62Label").addEventListener("click",v62Print);
for(const id of ["v6Packed","v6Expiry"])V62_EL(id).addEventListener("change",v62Metrics);
log("v0.6.2 · raster disperso disponible; reutiliza vista previa/fuentes/QR v0.6 sin modificar el diseño. NO impresa todavía.");
v5EnsureIdentity().then(v62Metrics).catch(e=>{V62_EL("v62Metrics").textContent="Activos oficiales no disponibles: "+e.message;});
