"use strict";
/* Plantilla visual Compacta LIBRE 50x30. Referencia de coordenadas V0.9
 * transcrita, pero sin enlace, import ni dependencia con etiquetas aprobadas.
 * El área del antiguo QR queda deliberadamente vacía y es revisable.
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
  const kcal=M.numeric(raw.kcal,"Kcal"),protein=M.numeric(raw.protein,"Proteínas"),
   carbs=M.numeric(raw.carbs,"Hidratos"),fat=M.numeric(raw.fat,"Grasas");
  const instruction=M.clean(raw.instruction,90,"Instrucciones");
  const note=M.clean(raw.note,90,"Nota");
  return {name,packed:M.date(packed,strict,"La fecha de envasado es obligatoria."),expiry:M.date(expiry,false),mode,
   showNutrition,kcal,protein,carbs,fat,
   showInstruction:raw.showInstruction!==false,instruction,
   showNote:raw.showNote!==false,note};
 }

 function fit(c,text,x,y,size,min,max,style="400",family='"Geist"',align="left"){
  return M.fit(c,text,{x,y,size,min,max,style,family,align,
   error:"Texto demasiado largo para Compacta 50 × 30: "+String(text).slice(0,35)});
 }
 function lines(c,text,max,limit,style="400",size=22,min=17){
  return M.lines(c,text,max,limit,style,size,min);
 }
 function draw(c,data,logo){
  fit(c,data.name,11,46,46,23,474,"700",'"Bricolage Grotesque"');
  c.drawImage(logo,525,5,53,48);
  c.fillRect(0,60,W,12);
  const heading=data.mode==="freeze"?"Envasado y congelación":data.mode==="other"?"Conservación":"Envasado";
  fit(c,heading,15,100,20,17,265);
  fit(c,"Consumo preferente",15,135,20,18,266);
  fit(c,data.packed,300,100,20,18,94,"700");
  fit(c,data.expiry,300,135,20,18,94,"700");
  c.fillRect(0,149,392,4);
  if(data.showNutrition){
   if(data.kcal!==null){fit(c,data.kcal,448,109,30,23,119,"700",'"Bricolage Grotesque"');
    fit(c,"kcal",481,126,15,15,66);}
   for(const [x,value,abbr] of [[436,data.protein,"PR"],[496,data.carbs,"HC"],[555,data.fat,"GR"]]){
    if(value!==null){
     fit(c,value+" g",x,148,15,11,64,"700",'"Geist"',"center");
     fit(c,abbr,x,164,15,14,56,"400",'"Geist"',"center");
    }
   }
  }
  // La zona inferior derecha antes reservada al QR se deja deliberadamente
  // blanca hasta aprobación visual de la composición libre sin QR.
  const textWidth=386;
  if(data.showInstruction&&data.instruction){
   fit(c,"CONSERVACIÓN Y CONSUMO",15,189,24,18,textWidth,"700",'"Bricolage Grotesque"');
   const a=lines(c,data.instruction,textWidth,2,"400",23,17);
   a.forEach((line,i)=>fit(c,line,15,230+i*28,23,17,textWidth));
  }
  if(data.showNote&&data.note){
   fit(c,"NOTA",15,299,20,18,textWidth,"700",'"Bricolage Grotesque"');
   const a=lines(c,data.note,textWidth,2,"italic 500",19,15);
   a.forEach((line,i)=>fit(c,line,15,322+i*23,19,15,textWidth,"italic 500"));
  }
 }

 M.register({id:"component",width:W,height:H,paper:"50 mm,30 mm",normalize,draw});
 if(typeof module!=="undefined"&&module.exports)module.exports={id:"component"};
})(typeof window!=="undefined"?window:globalThis);
