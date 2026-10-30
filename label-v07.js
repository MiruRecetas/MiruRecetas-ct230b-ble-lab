"use strict";
/*
 * V0.7 · Puré de calabaza y calabacín · etiqueta horizontal aprobada 50×80.
 * La geometría procede del SVG Canva aportado por la usuaria y ya implementado
 * en p15hRender / P15H_LINES / P15H_QR. No se mueve ni rediseña ningún bloque.
 * La composición se gira 90° antihorario para el cabezal físico de 50 mm.
 *
 * Se preservan fuentes Bricolage Grotesque/Geist e isotipo BN oficiales.
 * No se añade anillo inexistente en el SVG horizontal. QR nativo + 2 BAR nativas,
 * raster solo del contenido restante mediante bandas dispersas V0.6.2.
 * NO se modifica el canal UART, la fragmentación BLE ni la cadencia.
 */
const V7_OFFICIAL=Object.freeze({
 name:"Puré de calabaza y calabacín",
 kcal:"215,56", protein:"4,44", carbs:"22,31", fat:"12,92",
 instructionHeading:"DESCONGELACIÓN Y CONSUMO",
 instruction:"Descongelar en nevera y remover mientras se calienta enérgicamente o volver a batir",
 noteHeading:"NOTA",
 note:"La textura puede variar al descongelar.",
 url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/"
});
const v7El=id=>document.getElementById(id);
let v7Ready=false,v7Rendering=false;
function v7Data(draft=false){
 const p=v7El("v7Packed").value,e=v7El("v7Expiry").value;
 if(!draft){
  if(!p||!e)throw Error("Introduce ambas fechas de la etiqueta V0.7.");
  if(e<p)throw Error("Consumo preferente anterior al envasado.");
 }
 return {
  ...V7_OFFICIAL,
  packed:p?p15hIso(p):"__/__/__",
  expiry:e?p15hIso(e):"__/__/__"
 };
}
function v7Artwork(d){return p15hRender(d,4);}
function v7Build(d){return p15hBuild(d,4);}
function v7Preview(d){
 const cv=v7El("v7Preview");
 cv.width=P15H_W;cv.height=P15H_H;
 const c=cv.getContext("2d");
 c.drawImage(v7Artwork(d),0,0);
 for(const l of P15H_LINES){c.fillStyle="#000";c.fillRect(l.x,l.y,l.w,l.h);}
 c.save();
 c.lineWidth=1;c.strokeStyle="#999";c.setLineDash([5,5]);
 c.strokeRect(P15H_QR.x,P15H_QR.y,205,205);c.setLineDash([]);
 c.translate(P15H_QR.x+103,P15H_QR.y+103);c.rotate(-Math.PI/2);
 c.textAlign="center";p15hText(c,"QR NATIVO",0,0,16,"600","Geist",160,12);
 c.restore();
}
function v7Update(){
 const ready=!!(device?.gatt?.connected&&writeChannel&&v7Ready&&!busy&&!v7Rendering);
 let valid=true;
 try{v7Data();}catch(_){valid=false;}
 v7El("v7Print").disabled=!ready||!valid||!v7El("v7Confirm").checked;
}
async function v7Refresh(){
 if(v7Rendering)return;
 v7Rendering=true;
 try{
  await v5EnsureIdentity();
  const fonts=await Promise.all([
   document.fonts.load('700 66px "Bricolage Grotesque"',"Puré de calabaza y calabacín"),
   document.fonts.load('700 60px "Bricolage Grotesque"',"215,56"),
   document.fonts.load('400 25px "Geist"',"Descongelar en nevera"),
   document.fonts.load('italic 500 18px "Geist"',"La textura puede variar")
  ]);
  if(fonts.some(fs=>!fs.length||fs.some(f=>f.status!=="loaded")))
   throw Error("Faltan fuentes oficiales; no se sustituirán silenciosamente.");
  v7Ready=true;
  v7Preview(v7Data(true));
  try{
   const b=v7Build(v7Data());
   v7El("v7Metrics").textContent="V0.7 · "+b.job.length+" bytes · "+
    Math.ceil(b.job.length/20)+" fragmentos BLE · "+b.blocks+
    " bandas raster (datos: "+b.rasterBytes+" bytes) · 2 BAR nativas · QR nativo.";
  }catch(e){
   v7El("v7Metrics").textContent="Pendiente de datos válidos para imprimir: "+e.message;
  }
  v7El("v7Assets").textContent="Fuentes e isotipo BN oficiales cargados. "+
   "Geometría del SVG horizontal aprobado; sin alterar las otras pruebas.";
 }catch(e){
  v7Ready=false;v7El("v7Assets").textContent="Bloqueado: "+e.message;
  log("V0.7 · No se puede preparar etiqueta: "+e.message);
 }finally{v7Rendering=false;v7Update();}
}
async function v7Print(){
 if(busy||v7Rendering||!v7Ready||!device?.gatt?.connected||
    !writeChannel||!v7El("v7Confirm").checked)return;
 let d,b;
 try{d=v7Data();b=v7Build(d);}
 catch(e){log("V0.7 · impresión bloqueada: "+e.message);return;}
 if(!window.confirm("¿Enviar UNA etiqueta V0.7 de 50×80 mm, lectura horizontal "+
  "girada 90° antihorario, para Puré de calabaza y calabacín?\n"+
  "QR REAL: "+d.url+"\n"+b.job.length+" B / "+
  Math.ceil(b.job.length/20)+" fragmentos BLE.\nSin reintentos automáticos."))return;
 log("V0.7 · Puré de calabaza y calabacín · diseño SVG horizontal aprobado "+
  "· fechas "+d.packed+" / "+d.expiry+
  " · BAR nativas 2 · QR TSPL nativo · "+
  b.blocks+" bandas dispersas · "+b.rasterBytes+" B raster · "+
  b.job.length+" B totales · "+Math.ceil(b.job.length/20)+
  " fragmentos BLE · URL "+d.url);
 try{await transmitDiagnostic(b.job,"V0.7 ETIQUETA HORIZONTAL 50×80 Puré de calabaza y calabacín");}
 finally{v7El("v7Confirm").checked=false;v7Update();}
}
const v7Today=new Date();
v7El("v7Packed").value=v7Today.getFullYear()+"-"+
 String(v7Today.getMonth()+1).padStart(2,"0")+"-"+
 String(v7Today.getDate()).padStart(2,"0");
for(const id of ["v7Packed","v7Expiry"]){
 v7El(id).addEventListener("change",()=>{v7Update();v7Refresh();});
 v7El(id).addEventListener("input",()=>{v7Update();v7Refresh();});
}
v7El("v7Confirm").addEventListener("change",v7Update);
v7El("v7Print").addEventListener("click",v7Print);
log("V0.7 preparada · SVG horizontal, Puré de calabaza y calabacín · "+
 "PR 4,44 / HC 22,31 / GR 12,92 / 215,56 kcal · 2 BAR y QR nativos. "+
 "El ensayo físico aún no se ha realizado.");
v7Refresh();
