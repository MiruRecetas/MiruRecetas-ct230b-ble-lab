"use strict";
/* Etiqueta LIBRE Compacta 50x30 · laboratorio público.
 * Transcripción geométrica autónoma de la referencia V0.9 (590x354).
 * SIN imports, referencias runtime ni enlaces a la etiqueta V0.9 de recetas
 * ni a mirurecetas-web-source. Sin QR, sin raciones y sin gramos.
 * Este diseño SIN QR es experimental y puede revisarse después de verlo.
 */
(function(root){
 const W=590,H=354,MAX=35000,STRIPE=12,enc=new TextEncoder();
 function date(s,mandatory){
  if(!s){if(mandatory)throw Error("La fecha de envasado es obligatoria.");return "--/--/--";}
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error("Fecha inválida.");
  const [y,m,d]=s.split("-").map(Number),v=new Date(Date.UTC(y,m-1,d));
  if(v.getUTCFullYear()!==y||v.getUTCMonth()!==m-1||v.getUTCDate()!==d)
   throw Error("Fecha de calendario inválida.");
  return s.slice(8,10)+"/"+s.slice(5,7)+"/"+s.slice(2,4);
 }
 function clean(s,max,label,required=false){
  const value=String(s??"").trim().replace(/\s+/g," ");
  if((required&&!value)||value.length>max||/[<>]/.test(value)||[...value].some(c=>c.charCodeAt(0)<32))
   throw Error(label+" no válido (máximo "+max+" caracteres).");
  return value;
 }
 function numeric(s,label){
  const value=String(s??"").trim().replace(",",".");
  if(!value)return null;
  if(!/^(?:\d{1,4})(?:\.\d{1,2})?$/.test(value)||Number(value)>9999)
   throw Error(label+": introduce un número positivo con hasta dos decimales.");
  return Number(value).toLocaleString("es-ES",{maximumFractionDigits:2,useGrouping:false});
 }
 function normalize(raw,strict=true){
  const name=clean(raw.name,70,"Nombre",true),packed=String(raw.packed||""),expiry=String(raw.expiry||"");
  if(packed&&expiry&&expiry<packed)throw Error("Consumo preferente anterior al envasado.");
  const mode=String(raw.mode||"freeze");
  if(!["fridge","freeze","other"].includes(mode))throw Error("Conservación desconocida.");
  const showNutrition=raw.showNutrition!==false;
  const kcal=numeric(raw.kcal,"Kcal"),protein=numeric(raw.protein,"Proteínas"),
   carbs=numeric(raw.carbs,"Hidratos"),fat=numeric(raw.fat,"Grasas");
  const instruction=clean(raw.instruction,90,"Instrucciones");
  const note=clean(raw.note,90,"Nota");
  return {name,packed:date(packed,strict),expiry:date(expiry,false),mode,
   showNutrition,kcal,protein,carbs,fat,
   showInstruction:raw.showInstruction!==false,instruction,
   showNote:raw.showNote!==false,note};
 }
 function fit(c,text,x,y,size,min,max,style="400",family='"Geist"',align="left"){
  c.textAlign=align;
  for(let n=size;n>=min;n--){
   c.font=style+" "+n+"px "+family;
   if(c.measureText(text).width<=max){c.fillText(text,x,y);return;}
  }
  throw Error("Texto demasiado largo para Compacta 50 × 30: "+text.slice(0,35));
 }
 function lines(c,text,max,limit,style="400",size=22,min=17){
  if(!text)return [];
  const words=text.split(" "),result=[],advance=word=>{
   let line=result.pop()||"";
   const next=line?line+" "+word:word;
   c.font=style+" "+size+'px "Geist"';
   if(c.measureText(next).width<=max){result.push(next);return;}
   if(line)result.push(line);
   result.push(word);
  };
  for(const word of words)advance(word);
  if(result.length>limit)throw Error("El texto excede "+limit+" líneas. Acórtalo.");
  for(const line of result){
   let ok=false;
   for(let n=size;n>=min;n--){
    c.font=style+" "+n+'px "Geist"';
    if(c.measureText(line).width<=max){ok=true;break;}
   }
   if(!ok)throw Error("Una palabra no cabe: "+line);
  }
  return result;
 }
 function render(data,logo){
  if(!logo)throw Error("Isotipo oficial pendiente.");
  const cv=document.createElement("canvas");cv.width=W;cv.height=H;
  const c=cv.getContext("2d",{willReadFrequently:true});
  c.fillStyle="#fff";c.fillRect(0,0,W,H);c.fillStyle="#000";c.textBaseline="alphabetic";
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
  return cv;
 }
 function sparse(cv){
  if(cv.width!==W||cv.height!==H)throw Error("Dimensiones no válidas.");
  const pixels=cv.getContext("2d",{willReadFrequently:true}).getImageData(0,0,W,H).data;
  const stride=Math.ceil(W/8),all=new Uint8Array(stride*H);all.fill(255);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
   const at=(y*W+x)*4;
   if(.2126*pixels[at]+.7152*pixels[at+1]+.0722*pixels[at+2]<150)
    all[y*stride+(x>>3)]&=~(0x80>>(x&7));
  }
  const blocks=[];
  for(let y=0;y<H;y+=STRIPE){
   let a=stride,b=-1,c=H,d=-1;
   for(let row=y;row<Math.min(H,y+STRIPE);row++)for(let col=0;col<stride;col++)
    if(all[row*stride+col]!==255){a=Math.min(a,col);b=Math.max(b,col);c=Math.min(c,row);d=Math.max(d,row);}
   if(b<0)continue;
   const width=b-a+1,height=d-c+1,bytes=new Uint8Array(width*height);
   for(let row=c;row<=d;row++)
    bytes.set(all.subarray(row*stride+a,row*stride+b+1),(row-c)*width);
   blocks.push({x:a*8,y:c,widthBytes:width,height,bytes});
  }
  return blocks;
 }
 function build(cv,copies=1){
  if(!Number.isInteger(copies)||copies<1||copies>20)throw Error("Copias fuera del intervalo 1–20.");
  const blocks=sparse(cv),parts=[enc.encode("SIZE 50 mm,30 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")];
  for(const b of blocks){
   if(b.height>12||b.y+b.height>H||b.x+b.widthBytes*8>W+7)throw Error("Banda fuera de papel.");
   parts.push(enc.encode("BITMAP "+b.x+","+b.y+","+b.widthBytes+","+b.height+",0,"));
   parts.push(b.bytes,enc.encode("\r\n"));
  }
  parts.push(enc.encode("PRINT 1,"+copies+"\r\n"));
  const bytes=parts.reduce((sum,p)=>sum+p.length,0);
  if(bytes>MAX)throw Error("Trabajo supera 35.000 B; impresión bloqueada.");
  const job=new Uint8Array(bytes);let offset=0;
  for(const p of parts){job.set(p,offset);offset+=p.length;}
  return {job,bytes,tiles:blocks.length,fragments:Math.ceil(bytes/20),copies};
 }
 const api=Object.freeze({width:W,height:H,normalize,render,sparse,build});
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 else root.MiruCompactFree=api;
})(typeof window!=="undefined"?window:globalThis);
