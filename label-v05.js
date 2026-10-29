"use strict";
/* v0.5 · Etiqueta real de prueba: Cebollas rellenas.
   Origen auditado de nutrición y URL: ficha pública canónica y datos/recetas/cebollas-rellenas.json.
   Sin lecturas privadas, sin generación de identificadores/lotes inventados. */
const V5_RECIPE=Object.freeze({
  slug:"cebollas-rellenas",name:"Cebollas rellenas",servings:1,
  kcal:338.68,protein:15.92,carbs:27.50,fat:17.67,
  url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/cebollas-rellenas/"
});
const V5_BITMAP={x:12,y:12,w:304,h:330};
const V5_QR={x:356,y:84,level:"M",module:5};
let v5Logo=null,v5Ready=false,v5PreviewBusy=false;
const V5_EL=(id)=>document.getElementById(id);
function v5Log(message){log("v0.5 · "+message);}
function v5Formatted(iso){
 const [year,month,day]=iso.split("-");
 return day+"/"+month+"/"+year.slice(2);
}
function v5Dates(){
 const packed=V5_EL("v5Packed").value,expires=V5_EL("v5Expiry").value;
 if(!/^\d{4}-\d\d-\d\d$/.test(packed)||!/^\d{4}-\d\d-\d\d$/.test(expires))throw Error("Indica ambas fechas antes de imprimir la etiqueta.");
 if(expires<packed)throw Error("La fecha de consumo preferente no puede ser anterior a la fecha de envasado.");
 return {packed:v5Formatted(packed),expires:v5Formatted(expires)};
}
function v5FullReady(){try{v5Dates();return true}catch(e){return false}}
function updateV05Buttons(){
 const connected=!!(device&&device.gatt&&device.gatt.connected&&writeChannel);
 V5_EL("v5QrOnly").disabled=busy||!connected||!V5_EL("v5Confirm").checked;
 V5_EL("v5Label").disabled=busy||!connected||!V5_EL("v5Confirm").checked||!v5Ready||!v5FullReady();
}
function v5QrCommand(){
 // Both v0.5 buttons reuse EXACTLY the same QR command: real canonical URL, same ECC, dots, placement.
 return 'QRCODE '+V5_QR.x+','+V5_QR.y+','+V5_QR.level+','+V5_QR.module+',A,0,M2,S7,"'+V5_RECIPE.url+'"';
}
async function v5EnsureIdentity(){
 // These two families match the actual link in the published Cebollas rellenas recipe page.
 // Fail closed: do not silently render with fallback fonts if the network has blocked Google Fonts.
 const faces=await Promise.all([
  document.fonts.load('600 24px "Bricolage Grotesque"','Cebollas rellenas'),
  document.fonts.load('500 14px "Geist"','Envasado y congelación 1234567890')
 ]);
 if(faces.some(a=>!a.length||a.some(f=>f.status!=="loaded")))throw Error("Fuentes oficiales Bricolage Grotesque/Geist no disponibles; no se imprimirá con fuentes sustitutas.");
 if(!v5Logo){
  const asset=new Image();
  asset.decoding="async";
  asset.src="./assets/isotipo-bn.svg";
  await asset.decode();
  v5Logo=asset;
 }
 v5Ready=true;updateV05Buttons();
}
function v5Text(ctx,font,text,x,y,maxWidth){
 ctx.font=font;ctx.fillStyle="#000";
 if(maxWidth===undefined)ctx.fillText(text,x,y);else ctx.fillText(text,x,y,maxWidth);
}
function v5SegmentPattern(ctx,angle0,angle1,kind,cx,cy,rOuter=43,rInner=28){
 ctx.save();
 ctx.beginPath();
 ctx.arc(cx,cy,rOuter,angle0,angle1,false);
 ctx.arc(cx,cy,rInner,angle1,angle0,true);
 ctx.closePath();ctx.clip();
 if(kind==="protein"){
  ctx.fillStyle="#000";ctx.fillRect(cx-rOuter,cy-rOuter,rOuter*2,rOuter*2);
 }else if(kind==="carbs"){
  ctx.strokeStyle="#000";ctx.lineWidth=2;
  for(let i=-110;i<140;i+=8){ctx.beginPath();ctx.moveTo(cx-60+i,cy+60);ctx.lineTo(cx+60+i,cy-60);ctx.stroke();}
 }else{
  ctx.fillStyle="#000";
  for(let y=cy-47;y<=cy+47;y+=7)for(let x=cx-48;x<=cx+48;x+=7){
   ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill();
  }
 }
 ctx.restore();
 ctx.strokeStyle="#000";ctx.lineWidth=1;
 ctx.beginPath();ctx.arc(cx,cy,rOuter,angle0,angle1);ctx.arc(cx,cy,rInner,angle1,angle0,true);ctx.closePath();ctx.stroke();
}
function v5Ring(ctx,cx,cy){
 const values=[V5_RECIPE.protein*4,V5_RECIPE.carbs*4,V5_RECIPE.fat*9];
 const sum=values.reduce((a,b)=>a+b,0);
 const kinds=["protein","carbs","fat"];
 let start=-Math.PI/2;
 for(let i=0;i<3;i++){
  const end=start+2*Math.PI*(values[i]/sum);
  v5SegmentPattern(ctx,start,end,kinds[i],cx,cy);start=end;
 }
 ctx.textAlign="center";
 v5Text(ctx,'600 17px "Bricolage Grotesque"',"338,68",cx,cy+1,58);
 v5Text(ctx,'500 11px "Geist"',"kcal",cx,cy+17);
 ctx.textAlign="left";
}
function v5Legend(ctx,x,y,type,title,grams){
 ctx.save();ctx.lineWidth=1;ctx.strokeStyle="#000";
 ctx.strokeRect(x,y-11,10,10);
 if(type==="protein"){ctx.fillStyle="#000";ctx.fillRect(x,y-11,10,10)}
 else if(type==="carbs"){
  ctx.beginPath();
  for(let k=-7;k<11;k+=5){ctx.moveTo(x+Math.max(0,k),y-1);ctx.lineTo(x+Math.min(10,k+10),y-11); }
  ctx.stroke();
 }else{
  for(let ix=0;ix<3;ix++)for(let iy=0;iy<3;iy++)ctx.fillRect(x+2+ix*3,y-9+iy*3,1,1);
 }
 ctx.restore();
 v5Text(ctx,'500 13px "Geist"',title,x+15,y+1,108);
 v5Text(ctx,'600 14px "Geist"',grams,x+15,y+18,105);
}
function v5Pot(ctx,x,y){
 // Icono exacto "cooking-pot" de Lucide, asignado a la categoría guisos-legumbres
 // en la ficha pública; Lucide ISC (ver README).
 const shape=new Path2D("M2 12h20m-2 0v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m0-4l16-4M8.86 6.78l-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8");
 ctx.save();ctx.translate(x,y);ctx.strokeStyle="#000";ctx.lineWidth=2;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke(shape);ctx.restore();
}
function v5RenderLeft(dates){
 const cv=document.createElement("canvas");cv.width=V5_BITMAP.w;cv.height=V5_BITMAP.h;
 const c=cv.getContext("2d",{willReadFrequently:true});
 c.fillStyle="#fff";c.fillRect(0,0,cv.width,cv.height);
 c.imageSmoothingEnabled=true;c.imageSmoothingQuality="high";
 // Header: exact six-part canonical B/W SVG and approved brand title font.
 c.drawImage(v5Logo,4,3,27,27);
 v5Text(c,'600 16px "Bricolage Grotesque"',"MiruRecetas",36,22);
 c.fillStyle="#000";c.fillRect(4,39,296,1);
 c.textBaseline="alphabetic";
 v5Text(c,'600 26px "Bricolage Grotesque"',"Cebollas rellenas",4,74,250);
 v5Pot(c,275,53);
 v5Text(c,'500 14px "Geist"',"1 ración",4,94);
 c.fillRect(4,105,296,1);
 v5Ring(c,55,169);
 v5Legend(c,110,141,"protein","Proteínas","15,92 g");
 v5Legend(c,110,176,"carbs","Hidratos","27,50 g");
 v5Legend(c,110,211,"fat","Grasas","17,67 g");
 c.fillRect(4,229,296,1);
 v5Text(c,'500 12px "Geist"',"Envasado y congelación",4,247,191);
 c.textAlign="right";v5Text(c,'600 12px "Geist"',dates.packed,296,247,78);c.textAlign="left";
 v5Text(c,'500 12px "Geist"',"Consumo preferente",4,266,187);
 c.textAlign="right";v5Text(c,'600 12px "Geist"',dates.expires,296,266,78);c.textAlign="left";
 c.fillRect(4,276,296,1);
 v5Text(c,'500 12px "Geist"',"Nevera · recalentar tapado",4,294,275);
 v5Text(c,'500 10px "Geist"',"REC · cebollas-rellenas",4,313,273);
 return cv;
}
function v5ToTsplBitmap(canvas){
 const ctx=canvas.getContext("2d",{willReadFrequently:true});
 const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
 const widthBytes=Math.ceil(canvas.width/8),bytes=new Uint8Array(widthBytes*canvas.height);
 bytes.fill(255);
 for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
  const off=(y*canvas.width+x)*4;
  // Antialias threshold intentionally avoids bloated strokes on thermal stock.
  const luminance=.2126*pixels[off]+.7152*pixels[off+1]+.0722*pixels[off+2];
  if(luminance<150)bytes[y*widthBytes+(x>>3)] &= ~(0x80>>(x&7));
 }
 return {bytes,widthBytes,height:canvas.height};
}
function v5Header(){return ["SIZE 50 mm,30 mm","GAP 2 mm,0 mm","DIRECTION 0","CLS"].join("\r\n")+"\r\n"}
function v5QrOnlyJob(){
 return encoder.encode(v5Header()+v5QrCommand()+"\r\nPRINT 1,1\r\n");
}
function v5FullJob(dates){
 const artwork=v5ToTsplBitmap(v5RenderLeft(dates));
 const before=encoder.encode(v5Header()+"BITMAP "+V5_BITMAP.x+","+V5_BITMAP.y+","+artwork.widthBytes+","+artwork.height+",0,");
 const after=encoder.encode("\r\n"+v5QrCommand()+"\r\nPRINT 1,1\r\n");
 return joinBuffers(before,artwork.bytes,after);
}
function v5Preview(dates){
 const cv=V5_EL("v5Preview");const c=cv.getContext("2d");
 cv.width=590;cv.height=354;
 c.fillStyle="#fff";c.fillRect(0,0,cv.width,cv.height);
 if(v5Ready){const left=v5RenderLeft(dates);c.drawImage(left,V5_BITMAP.x,V5_BITMAP.y);}
 c.strokeStyle="#aaa";c.lineWidth=1;c.setLineDash([3,3]);c.strokeRect(336,64,225,225);c.setLineDash([]);
 c.fillStyle="#333";c.textAlign="center";c.font='500 15px "Geist"';c.fillText("QR NATIVO",448,171);
 c.font='500 11px "Geist"';c.fillText("(lo dibuja TSPL)",448,193);c.textAlign="left";
}
async function v5Repaint(){
 if(v5PreviewBusy)return;
 v5PreviewBusy=true;
 try{
  await v5EnsureIdentity();
  const dates=V5_EL("v5Packed").value&&V5_EL("v5Expiry").value
    ?v5Dates():{packed:"__/__/__",expires:"__/__/__"};
  v5Preview(dates);
  V5_EL("v5Assets").textContent="Isotipo BN y tipografías oficiales cargados · vista izquierda fiel; QR se imprime nativo.";
 }catch(e){
  v5Ready=false;V5_EL("v5Assets").textContent="No se puede imprimir etiqueta completa: "+e.message;
  v5Log("Activos no listos: "+e.message);
 }finally{
  v5PreviewBusy=false;updateV05Buttons();
 }
}
async function v5Run(which){
 if(busy||!device?.gatt?.connected||!writeChannel||!V5_EL("v5Confirm").checked)return;
 let job;
 try{
  if(which==="label"){await v5EnsureIdentity();job=v5FullJob(v5Dates());}
  else job=v5QrOnlyJob();
 }catch(e){v5Log("Preparación bloqueada: "+e.message);return;}
 const label=which==="label"?"ETIQUETA COMPLETA Cebollas 50×30":"QR URL REAL Cebollas 50×30";
 // Avoid automatic retries. BLE write success does not prove scan or final layout.
 if(!window.confirm("¿Enviar UNA etiqueta '"+label+"' con la URL oficial de Cebollas rellenas?"+(which==="label"?"\nDatos por 1 ración y fechas indicadas.":"")))return;
 v5Log(label+" · URL exacta "+V5_RECIPE.url);
 await transmitDiagnostic(job,label);
 V5_EL("v5Confirm").checked=false;updateV05Buttons();
}
V5_EL("v5Confirm").addEventListener("change",updateV05Buttons);
for(const id of ["v5Packed","v5Expiry"])V5_EL(id).addEventListener("change",()=>{updateV05Buttons();v5Repaint()});
V5_EL("v5QrOnly").addEventListener("click",()=>v5Run("qr"));
V5_EL("v5Label").addEventListener("click",()=>v5Run("label"));
V5_EL("v5RecipeUrl").href=V5_RECIPE.url;
V5_EL("v5UrlLiteral").textContent=V5_RECIPE.url;
const now=new Date();
const pad=n=>String(n).padStart(2,"0");
V5_EL("v5Packed").value=now.getFullYear()+"-"+pad(now.getMonth()+1)+"-"+pad(now.getDate());
v5Log("Plantilla oficial v0.5 · 1 ración · macros de fuente publicada (2026-10-26). La URL real usa ruta canónica sin redirecciones.");
v5Repaint();
