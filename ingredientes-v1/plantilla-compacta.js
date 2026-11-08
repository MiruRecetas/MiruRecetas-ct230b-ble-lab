"use strict";
/* Compacta libre 50 × 30: composición elegida el 08/11/2026.
 * Motor común de etiquetas libres; sin QR, ni motores históricos o productivos.
 * Macro desactivado: dos columnas de fechas, sin área nutricional vacía.
 * Encabezados inferiores siempre impresos; contenido opcional y área reservada.
 */
(function(root){
 const M=typeof module!=="undefined"&&module.exports?require("./motor-libre.js"):root.MiruLabelEngine;
 const W=590,H=354;
 function normalize(raw,strict=true){
  const name=M.clean(raw.name,70,"Nombre",true),packed=String(raw.packed||""),expiry=String(raw.expiry||"");
  if(packed&&expiry&&expiry<packed)throw Error("Consumo preferente anterior al envasado.");
  const mode=String(raw.mode||"freeze");
  if(!["fridge","freeze","other"].includes(mode))throw Error("Conservación desconocida.");
  const showNutrition=raw.showNutrition!==false;
  const showInstruction=raw.showInstruction!==false,showNote=raw.showNote!==false;
  // Campos ocultos no aportan texto al raster ni bloquean la impresión.
  const kcal=showNutrition?M.numeric(raw.kcal,"Kcal"):null;
  const protein=showNutrition?M.numeric(raw.protein,"Proteínas"):null;
  const carbs=showNutrition?M.numeric(raw.carbs,"Hidratos"):null;
  const fat=showNutrition?M.numeric(raw.fat,"Grasas"):null;
  const instruction=showInstruction?M.clean(raw.instruction,90,"Instrucciones"):"";
  const note=showNote?M.clean(raw.note,90,"Nota"):"";
  return {name,packed:M.date(packed,strict,"La fecha de envasado es obligatoria."),
   expiry:M.date(expiry,false),mode,showNutrition,kcal,protein,carbs,fat,
   showInstruction,instruction,showNote,note};
 }
 function fit(c,text,x,y,size,min,max,style="400",family='"Geist"',align="left"){
  return M.fit(c,text,{x,y,size,min,max,style,family,align,
   error:"Texto demasiado largo para Compacta 50 × 30: "+String(text).slice(0,35)});
 }
 function labelLine(c,label,x,y,max){
  fit(c,label,x,y,17,14,max,"600",'"Geist"');
 }
 function section(c,label,x,y,width){
  c.fillStyle="#000";
  if(typeof c.roundRect==="function"){
   c.beginPath();c.roundRect(x,y,width,27,6);c.fill();
  }else c.fillRect(x,y,width,27);
  c.fillStyle="#fff";
  fit(c,label,x+12,y+21,20,17,width-24,"700",'"Bricolage Grotesque"');
  c.fillStyle="#000";
  c.fillRect(x+width+11,y+13,W-x-width-25,2);
 }
 function draw(c,data,logo){
  // Firma oficial: isotipo BN aprobado + MiruRecetas en Bricolage Grotesque.
  fit(c,data.name,12,50,49,23,463,"700",'"Bricolage Grotesque"');
  c.drawImage(logo,523,3,52,52*logo.height/logo.width);
  fit(c,"MiruRecetas",490,60,19,13,89,"700",'"Bricolage Grotesque"');
  c.fillRect(0,69,W,10);

  const first=data.mode==="freeze"?"Envasado y congelación":
   data.mode==="other"?"Conservación":"Envasado";
  if(data.showNutrition){
   // Dos fechas en filas a la izquierda; nutrición a la derecha.
   c.fillRect(177,91,2,84);
   c.fillRect(298,91,2,84);
   const firstLines=data.mode==="freeze"?["Envasado y","congelación"]:[first];
   firstLines.forEach((part,i)=>labelLine(c,part,14,106+i*19,153));
   labelLine(c,"Consumo",14,151,153);
   labelLine(c,"preferente",14,170,153);
   fit(c,data.packed,187,119,21,16,104,"700");
   fit(c,data.expiry,187,164,21,16,104,"700");

   // Cifras manuales independientes: no se inventan macros vacíos.
   if(data.kcal!==null){
    c.fillRect(310,97,99,63);
    c.fillStyle="#fff";
    fit(c,data.kcal,360,136,31,19,91,"700",'"Bricolage Grotesque"',"center");
    fit(c,"kcal",360,153,16,14,74,"700",'"Geist"',"center");
    c.fillStyle="#000";
   }
   for(const [x,value,abbr] of [[438,data.protein,"PR"],[495,data.carbs,"HC"],[552,data.fat,"GR"]]){
    if(value===null)continue;
    fit(c,value+" g",x,125,17,12,54,"700",'"Geist"',"center");
    fit(c,abbr,x,146,18,15,52,"400",'"Geist"',"center");
   }
   c.fillRect(465,111,2,35);
   c.fillRect(523,111,2,35);
  }else{
   // Sin nutrición: las dos fechas ocupan el ancho completo en dos columnas.
   c.fillRect(294,89,2,85);
   fit(c,first,14,117,24,17,260,"600");
   fit(c,"Consumo preferente",310,117,24,17,263,"600");
   fit(c,data.packed,14,163,29,22,261,"700");
   fit(c,data.expiry,310,163,29,22,261,"700");
  }
  c.fillRect(12,180,566,3);

  // Bloques inferiores: títulos y separadores siempre, sin recolocar alturas.
  section(c,"CONSERVACIÓN Y CONSUMO",12,191,316);
  if(data.showInstruction&&data.instruction){
   const text=M.lines(c,data.instruction,560,2,"400",21,16);
   text.forEach((part,i)=>fit(c,part,15,243+i*23,21,16,560));
  }
  section(c,"NOTA",12,274,86);
  if(data.showNote&&data.note){
   const text=M.lines(c,data.note,560,2,"italic 500",20,15);
   text.forEach((part,i)=>fit(c,part,15,324+i*22,20,15,560,"italic 500"));
  }
 }
 M.register({id:"component",width:W,height:H,paper:"50 mm,30 mm",normalize,draw});
 if(typeof module!=="undefined"&&module.exports)module.exports={id:"component"};
})(typeof window!=="undefined"?window:globalThis);
