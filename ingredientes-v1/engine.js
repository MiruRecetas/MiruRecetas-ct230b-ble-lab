"use strict";
/* MiruRecetas · Conserva · ingredientes V1 (laboratorio).
 * Conserva geometría V0.8: 354x236, sin QR. Opciones nuevas experimentales.
 * Sin importaciones del laboratorio histórico ni de la PWA.
 */
(function(root){
 const W=354,H=236,MAX=35000,STRIPE=12;
 const enc=new TextEncoder();
 function isoDate(s,mandatory){
  if(!s){if(mandatory)throw Error("Indica la fecha de envasado.");return "--/--/--";}
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error("Fecha con formato inválido.");
  const y=Number(s.slice(0,4)),m=Number(s.slice(5,7)),d=Number(s.slice(8,10));
  const date=new Date(Date.UTC(y,m-1,d));
  if(!Number.isFinite(date.valueOf())||date.getUTCFullYear()!==y||date.getUTCMonth()+1!==m||date.getUTCDate()!==d)
   throw Error("Fecha de calendario inválida.");
  return s.slice(8,10)+"/"+s.slice(5,7)+"/"+s.slice(2,4);
 }
 function normalize(raw,requireDates=true){
  const name=String(raw.name||"").trim().replace(/\s+/g," ");
  if(!name||name.length>55||/[<>\x00-\x1f\x7f]/.test(name))
   throw Error("Nombre no válido (máximo 55 caracteres).");
  const rawGrams=String(raw.grams??"").trim();
  if(rawGrams!==""&&(!/^\d{1,4}$/.test(rawGrams)||Number(rawGrams)<1||Number(rawGrams)>9999))
   throw Error("Si indicas cantidad, utiliza entre 1 y 9999 gramos enteros.");
  const mode=String(raw.mode||"freeze");
  if(!["freeze","fridge","other"].includes(mode))throw Error("Tipo de conservación no reconocido.");
  const notesEnabled=raw.notesEnabled===undefined?String(raw.footer??"none")!=="none":raw.notesEnabled===true;
  let note=raw.note===undefined?({none:"",defrost:"Descongelar en nevera",fridge:"Conservar en nevera"}[String(raw.footer??"none")]):String(raw.note);
  if(typeof note!=="string")throw Error("Instrucción de conservación no reconocida.");
  note=note.trim().replace(/\s+/g," ");
  if(note.length>32||/[<>]/.test(note)||[...note].some(ch=>ch.charCodeAt(0)<32))
   throw Error("La nota no es válida (máximo 32 caracteres).");
  if(notesEnabled&&!note)throw Error("Escribe una nota o desactiva «Mostrar nota».");
  if(!notesEnabled)note="";
  const packed=String(raw.packed||""),expiry=String(raw.expiry||"");
  if(packed&&expiry&&expiry<packed)throw Error("El consumo preferente es anterior al envasado.");
  return {name,grams:rawGrams===""?null:Number(rawGrams),mode,note,notesEnabled,
   packed:isoDate(packed,requireDates),expiry:isoDate(expiry,false)};
 }
 function fit(ctx,text,x,y,weight,size,family,max,min){
  let n=size;
  do{
   ctx.font=weight+" "+n+"px "+family;
   if(ctx.measureText(text).width<=max){ctx.fillText(text,x,y);return;}
   n--;
  }while(n>=min);
  throw Error("El nombre o la cantidad no caben en el formato 30 × 20; abrevia el nombre.");
 }
 async function logo(url){
  const img=new Image();img.decoding="async";img.src=url;await img.decode();
  const n=512,cv=document.createElement("canvas");cv.width=cv.height=n;
  const c=cv.getContext("2d",{willReadFrequently:true});c.drawImage(img,0,0,n,n);
  const pixels=c.getImageData(0,0,n,n).data;
  let x0=n,y0=n,x1=-1,y1=-1,count=0;
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
   if(pixels[(y*n+x)*4+3]>24){
    x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);count++;
   }
  }
  if(count<1000||x1<=x0||y1<=y0)throw Error("Isotipo BN no visible.");
  const out=document.createElement("canvas");out.width=x1-x0+1;out.height=y1-y0+1;
  out.getContext("2d").drawImage(cv,x0,y0,out.width,out.height,0,0,out.width,out.height);
  return out;
 }
 function render(data,officialLogo){
  if(!officialLogo)throw Error("Falta el isotipo oficial.");
  const cv=document.createElement("canvas");cv.width=W;cv.height=H;
  const c=cv.getContext("2d",{willReadFrequently:true});
  if(!c)throw Error("Canvas no disponible.");
  c.fillStyle="#fff";c.fillRect(0,0,W,H);
  c.fillStyle="#000";c.textBaseline="alphabetic";c.textAlign="left";
  fit(c,data.name,8,32,"700",29,'"Bricolage Grotesque"',337,17);
  c.fillRect(0,48,354,9);
  c.font='400 17px "Geist"';c.fillText(data.mode==="freeze"?"Envasado y congelación":"Envasado",8,91);
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
  return cv;
 }
 function sparse(canvas){
  if(canvas.width!==W||canvas.height!==H)throw Error("Dimensiones de raster incorrectas.");
  const c=canvas.getContext("2d",{willReadFrequently:true});
  const pixels=c.getImageData(0,0,W,H).data,stride=Math.ceil(W/8);
  const bytes=new Uint8Array(stride*H);bytes.fill(255);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
   const j=(y*W+x)*4;
   if((.2126*pixels[j]+.7152*pixels[j+1]+.0722*pixels[j+2])<150)
    bytes[y*stride+(x>>3)]&=~(0x80>>(x&7));
  }
  const blocks=[];
  for(let y=0;y<H;y+=STRIPE){
   let minCol=stride,maxCol=-1,minRow=H,maxRow=-1;
   for(let iy=y;iy<Math.min(H,y+STRIPE);iy++)for(let ix=0;ix<stride;ix++){
    if(bytes[iy*stride+ix]===255)continue;
    minCol=Math.min(minCol,ix);maxCol=Math.max(maxCol,ix);
    minRow=Math.min(minRow,iy);maxRow=Math.max(maxRow,iy);
   }
   if(maxCol<0)continue;
   const w=maxCol-minCol+1,h=maxRow-minRow+1,crop=new Uint8Array(w*h);
   for(let iy=minRow;iy<=maxRow;iy++)
    crop.set(bytes.subarray(iy*stride+minCol,iy*stride+maxCol+1),(iy-minRow)*w);
   blocks.push({x:minCol*8,y:minRow,widthBytes:w,height:h,bytes:crop});
  }
  return blocks;
 }
 function build(canvas,copies=1){
  if(!Number.isInteger(copies)||copies<1||copies>20)throw Error("Número de copias fuera del intervalo 1–20.");
  const tiles=sparse(canvas),parts=[enc.encode("SIZE 30 mm,20 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")];
  for(const b of tiles){
   if(b.height>12||b.x<0||b.y<0||b.x+b.widthBytes*8>W+7||b.y+b.height>H)
    throw Error("Bloque fuera de los límites del papel.");
   parts.push(enc.encode("BITMAP "+b.x+","+b.y+","+b.widthBytes+","+b.height+",0,"));
   parts.push(b.bytes,enc.encode("\r\n"));
  }
  parts.push(enc.encode("PRINT 1,"+copies+"\r\n"));
  const size=parts.reduce((s,b)=>s+b.length,0);
  if(size>MAX)throw Error("Trabajo demasiado grande ("+size+" bytes).");
  const job=new Uint8Array(size);let offset=0;
  for(const part of parts){job.set(part,offset);offset+=part.length;}
  return {job,tiles:tiles.length,bytes:size,fragments:Math.ceil(size/20),copies};
 }
 const api=Object.freeze({width:W,height:H,maxBytes:MAX,normalize,render,logo,sparse,build});
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 else root.MiruIngredient=api;
})(typeof window!=="undefined"?window:globalThis);
