"use strict";
/* MiruRecetas · laboratorio BLE v0.6 · 50×80 mm vertical.
 * Fuente de diseño: Canva "01 · Ración completa · propuesta v1" (189×302 canvas).
 * Reproduce los bloques y el orden de la composición aprobada como piloto,
 * con corrección del anillo 4/4/9 sin añadir el donut de color superpuesto.
 * Los campos siguen siendo dinámicos; no contiene expiraciones inventadas.
 * Reutiliza la carga de identidad oficial y transporte BLE ya validado en v0.5.
 * Experimental: no implica adhesión en congelador ni aprobacion de producción.
 */
const V6_W=590,V6_H=945,V6_QR={x:352,y:638,module:5};
const V6_BANDS=Object.freeze([
 {x:0,y:0,w:576,h:115,label:"cabecera"},
 {x:0,y:130,w:576,h:275,label:"anillo y macros"},
 {x:0,y:430,w:576,h:92,label:"fechas"},
 {x:0,y:546,w:344,h:300,label:"descongelación"},
 {x:0,y:873,w:576,h:72,label:"marca inferior"}
]);
const V6_EL=id=>document.getElementById(id);
let v6Ready=false,v6Rendering=false;
const V6_MACROS=Object.freeze([
 {key:"protein",abbr:"PR",grams:V5_RECIPE.protein,kcal:V5_RECIPE.protein*4},
 {key:"carbs",abbr:"HC",grams:V5_RECIPE.carbs,kcal:V5_RECIPE.carbs*4},
 {key:"fat",abbr:"GR",grams:V5_RECIPE.fat,kcal:V5_RECIPE.fat*9}
]);
function v6Ratios(){
 const total=V6_MACROS.reduce((s,m)=>s+m.kcal,0);
 return V6_MACROS.map(m=>({...m,ratio:m.kcal/total}));
}
function v6Str(g){return g.toFixed(2).replace(".",",")+" g";}
function v6Dates(){
 const packed=V6_EL("v6Packed").value,expires=V6_EL("v6Expiry").value;
 for(const iso of [packed,expires]){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(Date.parse(iso)) ||
      new Date(iso+"T12:00:00").toISOString().slice(0,10)!==iso)
   throw Error("Selecciona dos fechas de calendario válidas.");
 }
 if(expires<packed)throw Error("Consumo preferente no puede preceder al envasado.");
 return {packed:v5Formatted(packed),expires:v5Formatted(expires)};
}
function v6Text(c,font,text,x,y,maxWidth){
 c.font=font;c.fillStyle="#000";
 if(maxWidth!==undefined)c.fillText(text,x,y,maxWidth);
 else c.fillText(text,x,y);
}
function v6PatternSquare(c,key,x,y){
 const S=24;c.save();c.beginPath();c.rect(x,y,S,S);c.clip();
 if(key==="protein"){c.fillStyle="#000";c.fillRect(x,y,S,S);}
 if(key==="carbs"){
  c.strokeStyle="#000";c.lineWidth=3;
  for(let t=-S;t<=2*S;t+=9){c.beginPath();c.moveTo(x+t,y+S);c.lineTo(x+t+S,y);c.stroke();}
 }
 if(key==="fat"){
  c.fillStyle="#000";
  for(let py=y+3;py<y+S;py+=7)for(let px=x+3;px<x+S;px+=7)
   c.fillRect(px,py,3,3);
 }
 c.restore();c.strokeStyle="#000";c.lineWidth=2;c.strokeRect(x,y,S,S);
}
function v6Ring(c,cx,cy){
 const outer=122,inner=75,arcs=[];
 let angle=-Math.PI/2;
 for(const m of v6Ratios()){
  const end=angle+2*Math.PI*m.ratio;
  c.save();c.beginPath();
  c.arc(cx,cy,outer,angle,end,false);
  c.arc(cx,cy,inner,end,angle,true);
  c.closePath();c.clip();
  if(m.key==="protein"){
   c.fillStyle="#000";c.fillRect(cx-outer,cy-outer,2*outer,2*outer);
  }else if(m.key==="carbs"){
   c.strokeStyle="#000";c.lineWidth=3;
   for(let t=-2*outer;t<2*outer;t+=12){
    c.beginPath();c.moveTo(cx-outer+t,cy+outer);c.lineTo(cx+outer+t,cy-outer);c.stroke();
   }
  }else{
   c.fillStyle="#000";
   for(let yy=cy-outer;yy<=cy+outer;yy+=11)
    for(let xx=cx-outer;xx<=cx+outer;xx+=11){
     c.beginPath();c.arc(xx,yy,2,0,2*Math.PI);c.fill();
    }
  }
  c.restore();arcs.push(angle);angle=end;
 }
 c.strokeStyle="#000";c.lineWidth=3;
 for(const radius of [inner,outer]){c.beginPath();c.arc(cx,cy,radius,0,Math.PI*2);c.stroke();}
 for(const theta of arcs){
  c.beginPath();c.moveTo(cx+inner*Math.cos(theta),cy+inner*Math.sin(theta));
  c.lineTo(cx+outer*Math.cos(theta),cy+outer*Math.sin(theta));c.stroke();
 }
 c.textAlign="center";c.textBaseline="alphabetic";
 v6Text(c,'700 33px "Bricolage Grotesque"',"338,68",cx,cy+6,138);
 v6Text(c,'500 22px "Geist"',"kcal",cx,cy+34);
 c.textAlign="left";
}
function v6Render(dates){
 if(!v5Logo)throw Error("No se ha cargado el isotipo oficial BN.");
 const cv=document.createElement("canvas");cv.width=V6_W;cv.height=V6_H;
 const c=cv.getContext("2d",{willReadFrequently:true});if(!c)throw Error("Canvas 2D no disponible.");
 c.fillStyle="#fff";c.fillRect(0,0,cv.width,cv.height);
 c.textBaseline="alphabetic";c.imageSmoothingEnabled=true;
 // Cabecera editorial del Canva: título protagonista, sin nueva marca encima.
 v6Text(c,'700 45px "Bricolage Grotesque"',"Cebollas rellenas",30,81,529);
 // Anillo y leyenda: P 19,14 %, HC 33,06 %, G 47,80 % por energía de macros.
 v6Ring(c,148,265);
 const xs=320,abbrX=361,valueX=564;
 c.textAlign="right";
 for(let i=0;i<V6_MACROS.length;i++){
  const m=V6_MACROS[i],yy=190+i*82;
  v6PatternSquare(c,m.key,xs,yy-25);
  c.textAlign="left";
  v6Text(c,'500 27px "Geist"',m.abbr,abbrX,yy);
  c.textAlign="right";
  v6Text(c,'700 29px "Geist"',v6Str(m.grams),valueX,yy,140);
 }
 c.textAlign="left";
 // Fechas reales elegidas manualmente por la usuaria.
 v6Text(c,'500 23px "Geist"',"Envasado y congelación",28,461,330);
 c.textAlign="right";v6Text(c,'700 25px "Geist"',dates.packed,562,461);c.textAlign="left";
 v6Text(c,'500 23px "Geist"',"Consumo preferente",28,501,330);
 c.textAlign="right";v6Text(c,'700 25px "Geist"',dates.expires,562,501);c.textAlign="left";
 // Zona inferior en la columna izquierda, conservando el espacio nativo para el QR.
 v6Text(c,'700 26px "Bricolage Grotesque"',"DESCONGELACIÓN",28,581,310);
 v6Text(c,'700 26px "Bricolage Grotesque"',"Y CONSUMO",28,616,310);
 v6Text(c,'500 23px "Geist"',"En nevera · Recalentar",28,686,308);
 v6Text(c,'500 23px "Geist"',"tapado",28,715,308);
 v6Text(c,'700 25px "Bricolage Grotesque"',"NOTA",28,767);
 v6Text(c,'italic 500 20px "Geist"',"El huevo puede variar",28,797,300);
 v6Text(c,'italic 500 20px "Geist"',"de textura al congelar.",28,826,310);
 // Pie de firma aprobado: icono exacto BN + palabra en tipografía oficial.
 c.drawImage(v5Logo,156,888,43,43);
 v6Text(c,'600 37px "Bricolage Grotesque"',"MiruRecetas",216,921,340);
 return cv;
}
function v6Crop(src,band){
 const cv=document.createElement("canvas");cv.width=band.w;cv.height=band.h;
 const c=cv.getContext("2d",{willReadFrequently:true});
 c.drawImage(src,band.x,band.y,band.w,band.h,0,0,band.w,band.h);
 return cv;
}
function v6Qr(){
 return 'QRCODE '+V6_QR.x+','+V6_QR.y+',M,'+V6_QR.module+',A,0,M2,S7,"'+V5_RECIPE.url+'"';
}
function v6Header(){return "SIZE 50 mm,80 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n";}
function v6Build(dates){
 const canvas=v6Render(dates),buffers=[encoder.encode(v6Header())];
 for(const b of V6_BANDS){
  const raster=v5ToTsplBitmap(v6Crop(canvas,b));
  buffers.push(encoder.encode("BITMAP "+b.x+","+b.y+","+raster.widthBytes+","+raster.height+",0,"));
  buffers.push(raster.bytes);
  buffers.push(encoder.encode("\r\n"));
 }
 // 2–3 dot borders avoid invisible rules seen in the 50x30 test.
 for(const y of [119,415,530,861])buffers.push(encoder.encode("BAR 26,"+y+",531,3\r\n"));
 // QR native TSPL, same actual URL as successful v0.5 trial.
 buffers.push(encoder.encode(v6Qr()+"\r\nPRINT 1,1\r\n"));
 return joinBuffers(...buffers);
}
function v6Display(dates){
 const preview=V6_EL("v6Preview");
 preview.width=V6_W;preview.height=V6_H;
 const c=preview.getContext("2d");
 c.fillStyle="#fff";c.fillRect(0,0,V6_W,V6_H);
 c.drawImage(v6Render(dates),0,0);
 c.fillStyle="#000";for(const y of [119,415,530,861])c.fillRect(26,y,531,3);
 c.strokeStyle="#bbb";c.lineWidth=1;c.setLineDash([5,5]);
 c.strokeRect(V6_QR.x,V6_QR.y,204,204);c.setLineDash([]);
 c.textAlign="center";
 v6Text(c,'600 17px "Geist"',"QR NATIVO",454,726);
 v6Text(c,'500 13px "Geist"',"URL real · TSPL",454,750);
 c.textAlign="left";
}
function updateV06Buttons(){
 const connected=!!(device&&device.gatt&&device.gatt.connected&&writeChannel);
 let valid=false;try{v6Dates();valid=true}catch(e){}
 V6_EL("v6Label").disabled=busy||!connected||!V6_EL("v6Confirm").checked||!v6Ready||!valid;
 V6_EL("v6Probe").disabled=busy||!connected||!V6_EL("v6ProbeConfirm").checked;
}
async function v6Repaint(){
 if(v6Rendering)return;v6Rendering=true;
 try{
  await v5EnsureIdentity();
  // The medium weight must also be loaded; never silently substitute font.
  const fonts=await Promise.all([
   document.fonts.load('700 45px "Bricolage Grotesque"',"Cebollas rellenas"),
   document.fonts.load('700 29px "Geist"',"15,92 g")
  ]);
  if(fonts.some(f=>!f.length||f.some(x=>x.status!=="loaded")))throw Error("Falta un peso tipográfico oficial.");
  v6Ready=true;
  let dates;try{dates=v6Dates()}catch(e){dates={packed:"__/__/__",expires:"__/__/__"};}
  v6Display(dates);
  V6_EL("v6Assets").textContent="Identidad oficial cargada. Maqueta de Canva recreada en negro térmico; QR indicado como reserva, impreso por TSPL.";
 }catch(e){
  v6Ready=false;V6_EL("v6Assets").textContent="No es posible generar la etiqueta: "+e.message;
  log("v0.6 · error de activos: "+e.message);
 }finally{v6Rendering=false;updateV06Buttons();}
}
async function v6Print(){
 if(busy||!device?.gatt?.connected||!writeChannel||!V6_EL("v6Confirm").checked||!v6Ready)return;
 let job,dates;
 try{dates=v6Dates();job=v6Build(dates);}catch(e){log("v0.6 · impresión bloqueada: "+e.message);return;}
 if(job.length>75000)throw Error("Trabajo superior al límite preventivo de 75 KB.");
 if(!window.confirm("¿Enviar UNA etiqueta experimental de 50 × 80 mm con la URL canónica real, anillo energético corregido y fechas "+dates.packed+" / "+dates.expires+"?\nEl trabajo contiene "+job.length+" bytes (unos "+Math.ceil(job.length/20)+" fragmentos) y puede tardar varios minutos. No repitas si falla."))return;
 log("v0.6 · etiqueta vertical 50×80; QR real; porcentajes "+v6Ratios().map(m=>(m.ratio*100).toFixed(2)+"%").join(" / ")+"; "+job.length+" bytes.");
 await transmitDiagnostic(job,"v0.6 ETIQUETA COMPLETA 50×80 Canva");
 V6_EL("v6Confirm").checked=false;updateV06Buttons();
}
V6_EL("v6Confirm").addEventListener("change",updateV06Buttons);
V6_EL("v6Packed").addEventListener("change",()=>{updateV06Buttons();v6Repaint();});
V6_EL("v6Expiry").addEventListener("change",()=>{updateV06Buttons();v6Repaint();});
V6_EL("v6Label").addEventListener("click",v6Print);

/* v0.6.1 · Test diagnóstico NATIVO, una sola etiqueta.
 * Preserva la misma ubicación y módulo del QR original. Sin BITMAP ni
 * cambios de densidad/calibración/motor; diferencia el canal de raster
 * grande de los problemas que también aparecen en impresión nativa.
 * No es un arreglo confirmado de la V0.6 ni un producto listo.
 */
function v6NativeProbeJob(){
 const c=[
  v6Header().trimEnd(),
  'TEXT 26,38,"3",0,1,1,"MIRURECETAS · CT230B"',
  'TEXT 26,87,"3",0,1,1,"CONTROL 50X80"',
  'BAR 26,128,531,3',
  'TEXT 26,177,"3",0,1,1,"PR HC GR - TEXTOS"',
  'BAR 26,417,531,3',
  'TEXT 26,444,"3",0,1,1,"ENVASADO / FECHAS"',
  'BAR 26,530,531,3',
  'TEXT 26,572,"3",0,1,1,"DESCONGELACION"',
  'TEXT 26,607,"3",0,1,1,"Y CONSUMO"',
  'TEXT 26,674,"3",0,1,1,"RECALENTAR"',
  'TEXT 26,709,"3",0,1,1,"TAPADO"',
  'TEXT 26,767,"3",0,1,1,"NOTA Y TEXTO"',
  'BAR 26,861,531,3',
  'TEXT 26,887,"3",0,1,1,"CONTROL OK"',
  v6Qr(),
  'PRINT 1,1',
  ''
 ].join("\r\n");
 return encoder.encode(c);
}
async function v6RunNativeProbe(){
 if(busy||!device?.gatt?.connected||!writeChannel||!V6_EL("v6ProbeConfirm").checked)return;
 const job=v6NativeProbeJob();
 if(!window.confirm("¿Imprimir UNA etiqueta diagnóstica 50×80 de texto TSPL nativo y QR real, sin bitmap? No modificará parámetros persistentes. Mantén el rollo 50×80."))return;
 log("v0.6.1 · CONTROL NATIVO 50x80; QR en ("+V6_QR.x+","+V6_QR.y+") con módulo "+V6_QR.module+"; "+job.length+" bytes; 0 bitmaps. Comparar QR y zona TAPADO con foto v0.6.");
 await transmitDiagnostic(job,"v0.6.1 CONTROL NATIVO 50×80");
 V6_EL("v6ProbeConfirm").checked=false;updateV06Buttons();
}
V6_EL("v6ProbeConfirm").addEventListener("change",updateV06Buttons);
V6_EL("v6Probe").addEventListener("click",v6RunNativeProbe);

V6_EL("v6Url").href=V5_RECIPE.url;
V6_EL("v6Packed").value=V5_EL("v5Packed").value;
log("v0.6 · referencia Canva 50×80: identidad BN real, anillo 4/4/9 exacto, QR canónico probado en v0.5. Nuevo formato aún sin prueba física.");
v6Repaint();
