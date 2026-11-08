"use strict";
/* Plantilla visual Pequeña 30x20. No motor raster ni transporte propio.
 * Coordenadas y reglas de la referencia libre anterior se conservan.
 */
(function(root){
 const M=typeof module!=="undefined"&&module.exports?require("./motor-libre.js"):root.MiruLabelEngine;
 const W=354,H=236;
 function normalize(raw,requireDates=true){
  const name=String(raw.name||"").trim().replace(/\s+/g," ");
  if(!name||name.length>55||/[<>\x00-\x1f\x7f]/.test(name))
   throw Error("Nombre no válido (máximo 55 caracteres).");
  const rawGrams=String(raw.grams??"").trim();
  if(rawGrams!==""&&(!/^\d{1,4}$/.test(rawGrams)||Number(rawGrams)<1||Number(rawGrams)>9999))
   throw Error("Si indicas cantidad, utiliza entre 1 y 9999 gramos enteros.");
  const mode=String(raw.mode||"freeze");
  if(!["freeze","fridge","pantry","preserve","other"].includes(mode))throw Error("Tipo de conservación no reconocido.");
  const notesEnabled=raw.notesEnabled===undefined?String(raw.footer??"none")!=="none":raw.notesEnabled===true;
  let note=raw.note===undefined?({none:"",defrost:"Descongelar en nevera",fridge:"Conservar en nevera"}[String(raw.footer??"none")]):String(raw.note);
  if(typeof note!=="string")throw Error("Instrucción de conservación no reconocida.");
  note=note.trim().replace(/\s+/g," ");
  if(note.length>32||/[<>]/.test(note)||[...note].some(ch=>ch.charCodeAt(0)<32))
   throw Error("La nota no es válida (máximo 32 caracteres).");
  // Una nota en blanco es válida: «Otro tipo» queda editable y sin pie impreso.
  if(!notesEnabled)note="";
  const packed=String(raw.packed||""),expiry=String(raw.expiry||"");
  if(packed&&expiry&&expiry<packed)throw Error("El consumo preferente es anterior al envasado.");
  return {name,grams:rawGrams===""?null:Number(rawGrams),mode,note,notesEnabled,
   packed:M.date(packed,requireDates),expiry:M.date(expiry,false)};
 }

 function fit(c,text,x,y,weight,size,family,max,min){
  return M.fit(c,text,{x,y,style:weight,size,family,max,min,
   error:"El nombre o la cantidad no caben en el formato 30 × 20; abrevia el nombre."});
 }
 function draw(c,data,officialLogo){
  fit(c,data.name,8,32,"700",29,'"Bricolage Grotesque"',337,17);
  c.fillRect(0,48,354,9);
  c.font='400 17px "Geist"';c.fillText(data.mode==="freeze"?"Envasado y congelación":data.mode==="fridge"?"Envasado":"Conservación",8,91);
  c.fillText("Consumo preferente",8,124);
  c.font='700 17px "Geist"';c.textAlign="right";
  c.fillText(data.packed,337,91);c.fillText(data.expiry,337,124);
  c.textAlign="left";c.fillRect(0,136,354,9);
  c.textAlign="center";
  if(data.grams!==null)fit(c,String(data.grams)+" g",128,195,"700",55,'"Bricolage Grotesque"',248,32);
  c.textAlign="left";c.drawImage(officialLogo,268,157,62,62);
  if(data.notesEnabled&&data.note){
   c.textAlign="left";
   try{fit(c,data.note,60,227,"italic 500",16,'"Geist"',285,12);}
   catch(_){throw Error("La nota no cabe en la etiqueta 30 × 20; utiliza un texto más corto.");}
  }
 }

 M.register({id:"ingredient",width:W,height:H,paper:"30 mm,20 mm",normalize,draw});
 if(typeof module!=="undefined"&&module.exports)module.exports={id:"ingredient"};
})(typeof window!=="undefined"?window:globalThis);
