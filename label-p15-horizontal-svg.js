"use strict";
/* P15 · Horizontal 50×80 · reconstrucción GEOMÉTRICA de SVG Canva 20261030_200122.
 * CANÓNICO PARA ESTA PRUEBA: el SVG del usuario. No reutilizar p15Landscape().
 * Lienzo editorial 945×590 (80×50), enviado en retrato físico 590×945
 * conservando orientación y posiciones del SVG: x_fis=y_editorial,
 * y_fis=945-x_editorial. SOLO 2 líneas TSPL BAR nativas.
 * El texto queda editable; raster disperso v62SparseRegion se reutiliza;
 * transporte original transmitDiagnostic(20 B,75 ms) SIN modificación.
 */
const P15H_ED_W=945,P15H_ED_H=590,P15H_W=590,P15H_H=945;
const P15H_QR=Object.freeze({x:345,y:58,module:5});
const P15H_LINES=Object.freeze([
 Object.freeze({x:109,y:0,w:21,h:945,label:"separador grueso bajo título"}),
 Object.freeze({x:251,y:427,w:7,h:518,label:"separador parcial bajo fechas"})
]);
const P15H_REGIONS=Object.freeze([
 {x:0,y:0,w:109,h:945,label:"cabecera"},
 {x:130,y:0,w:121,h:945,label:"fechas y energia"},
 {x:251,y:0,w:94,h:945,label:"textos y macros"},
 {x:345,y:260,w:245,h:685,label:"notas y base"},
 {x:550,y:0,w:40,h:260,label:"margen lateral QR"}
]);
const P15H_LIMIT=35000;
const P15H_DEFAULT=Object.freeze({
 name:"Puré de calabaza y calabacín",
 kcal:"215,56",protein:"4,44",carbs:"22,31",fat:"12,92",
 instructionHeading:"DESCONGELACIÓN Y CONSUMO",
 instruction:"Descongelar en nevera · Recalentar removiendo",
 noteHeading:"NOTA",
 note:"Recalentar removiendo para evitar zonas frías.",
 url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/"
});
const p15h=id=>document.getElementById(id);
let p15hReady=false,p15hBusy=false;
function p15hIso(iso){
 if(!/^\d{4}-\d\d-\d\d$/.test(iso)||
   Number.isNaN(Date.parse(iso))||
   new Date(iso+"T12:00:00").toISOString().slice(0,10)!==iso)
  throw Error("Selecciona fechas de calendario válidas.");
 return v5Formatted(iso);
}
function p15hData(allowDraft=false){
 const get=id=>String(p15h("p15h-"+id).value||"").trim();
 const fields=["name","kcal","protein","carbs","fat","instructionHeading","instruction","noteHeading","note","url"];
 const d={};for(const field of fields)d[field]=get(field);
 d.packed=get("packed");d.expiry=get("expiry");
 if(allowDraft){
  d.packed=d.packed?v5Formatted(d.packed):"__/__/__";
  d.expiry=d.expiry?v5Formatted(d.expiry):"__/__/__";
  return d;
 }
 for(const field of fields)if(!d[field])throw Error("Campo obligatorio vacío: "+field);
 if(d.name.length>90||d.instruction.length>150||d.note.length>160)
  throw Error("Texto demasiado largo para una etiqueta 50×80.");
 for(const f of ["kcal","protein","carbs","fat"]){
  const n=Number(d[f].replace(",","."));
  if(!Number.isFinite(n)||n<0||n>9999)throw Error("Valor nutricional no válido: "+f);
  d[f]=n.toFixed(2).replace(".",",");
 }
 const packed=get("packed"),expiry=get("expiry");
 d.packed=p15hIso(packed);d.expiry=p15hIso(expiry);
 if(expiry<packed)throw Error("Consumo preferente anterior al envasado.");
 const correct=/^https:\/\/mirurecetas\.github\.io\/menu-anual-recetas\/recetas\/[a-z0-9-]+\/$/;
 if(!correct.test(d.url))throw Error("El QR debe enlazar a una ficha pública canónica de MiruRecetas.");
 return d;
}
function p15hText(c,text,x,y,size,weight="500",family="Geist",maxWidth=Infinity,min=13,italic=false){
 if(!text)return;
 let n=size;
 const sty=italic?"italic ":"";
 do{c.font=sty+weight+" "+n+'px "'+family+'"';if(c.measureText(text).width<=maxWidth)break;n--;}
 while(n>=min);
 if(n<min)throw Error("No cabe texto sin deformar: "+text.slice(0,38));
 c.fillStyle="#000";c.fillText(text,x,y);
}
function p15hWrap(c,text,x,y,maxWidth,size,weight="500",italic=false,maxLines=2){
 c.font=(italic?"italic ":"")+weight+" "+size+'px "Geist"';
 const words=text.trim().split(/\s+/),lines=[];let line="";
 for(const word of words){
  const next=line?line+" "+word:word;
  if(c.measureText(next).width<=maxWidth){line=next;continue;}
  if(!line)throw Error("Palabra demasiado larga para esta zona: "+word);
  lines.push(line);line=word;
 }
 if(line)lines.push(line);
 if(lines.length>maxLines)throw Error("Texto ocupa más de "+maxLines+" líneas: "+text.slice(0,50));
 for(let i=0;i<lines.length;i++)p15hText(c,lines[i],x,y+i*(size+5),size,weight,"Geist",maxWidth,size,italic);
}
function p15hRender(d){
 if(!v5Logo)throw Error("No se ha cargado el isotipo oficial de MiruRecetas.");
 const logical=document.createElement("canvas");logical.width=P15H_ED_W;logical.height=P15H_ED_H;
 const c=logical.getContext("2d",{willReadFrequently:true});if(!c)throw Error("Canvas 2D no disponible.");
 c.fillStyle="#fff";c.fillRect(0,0,logical.width,logical.height);
 c.fillStyle="#000";c.textBaseline="alphabetic";
 // Coordenadas calcadas de la composición SVG al girar 90° para leerla:
 // título superior, isotipo GRANDE a la derecha, valores derecha, instrucciones izquierda.
 p15hText(c,d.name,19,87,66,"700","Bricolage Grotesque",803,31);
 c.drawImage(v5Logo,845,19,84,80);
 // Fecha editable: se conserva el espacio de las dos columnas originales del SVG.
 p15hText(c,"Envasado y congelación",26,168,25,"500","Geist",352,18);
 p15hText(c,"Consumo preferente",26,212,25,"500","Geist",352,18);
 p15hText(c,d.packed,396,168,25,"700","Geist",145,18);
 p15hText(c,d.expiry,396,212,25,"700","Geist",145,18);
 // Zona nutricional original a la DERECHA, nunca desplazarla bajo fechas.
 c.textAlign="left";
 p15hText(c,d.kcal,668,194,60,"700","Bricolage Grotesque",251,33);
 p15hText(c,"kcal",742,227,27,"400","Geist",115,17);
 for(const [i,value,label] of [[0,d.protein,"PR"],[1,d.carbs,"HC"],[2,d.fat,"GR"]]){
  const x=[614,729,843][i];
  p15hText(c,value+" g",x,267,24,"700","Geist",105,16);
  p15hText(c,label,x+26,296,20,"400","Geist",70,16);
 }
 // La segunda línea SE CONSERVA con longitud parcial y nativa TSPL; no se añade tercera línea.
 p15hText(c,d.instructionHeading,26,308,23,"700","Bricolage Grotesque",485,16);
 p15hWrap(c,d.instruction,26,349,491,23,"400",false,2);
 p15hText(c,d.noteHeading,26,502,21,"700","Bricolage Grotesque",470,16);
 p15hWrap(c,d.note,26,531,245,18,"500",true,2);
 // Los separadores NO se rasterizan: los dibuja TSPL BAR nativo.
 // El QR nativo ocupa esquina inferior derecha: NO se rasteriza el QR viejo de Canva.
 const physical=document.createElement("canvas");physical.width=P15H_W;physical.height=P15H_H;
 const p=physical.getContext("2d",{willReadFrequently:true});
 p.fillStyle="#fff";p.fillRect(0,0,P15H_W,P15H_H);
 p.translate(0,P15H_H);p.rotate(-Math.PI/2);p.drawImage(logical,0,0);
 return physical;
}
function p15hBuild(d){
 const artwork=p15hRender(d);
 const blocks=[];for(const region of P15H_REGIONS)blocks.push(...v62SparseRegion(artwork,region));
 const buffers=[encoder.encode("SIZE 50 mm,80 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")];
 for(const tile of blocks){
  if(tile.height>12)throw Error("Bloque raster mayor de 12 filas.");
  buffers.push(encoder.encode("BITMAP "+tile.x+","+tile.y+","+tile.widthBytes+","+tile.height+",0,"));
  buffers.push(tile.bytes,encoder.encode("\r\n"));
 }
 for(const line of P15H_LINES)
  buffers.push(encoder.encode("BAR "+line.x+","+line.y+","+line.w+","+line.h+"\r\n"));
 buffers.push(encoder.encode('QRCODE '+P15H_QR.x+','+P15H_QR.y+
  ',M,'+P15H_QR.module+',A,0,M2,S7,"'+d.url+'"\r\n'));
 buffers.push(encoder.encode("PRINT 1,1\r\n"));
 const job=joinBuffers(...buffers);
 if(job.length>P15H_LIMIT)throw Error("Trabajo "+job.length+" B; máximo preventivo "+P15H_LIMIT+" B.");
 return {job,blocks:blocks.length,rasterBytes:blocks.reduce((s,b)=>s+b.bytes.length,0)};
}
function p15hPreview(d){
 const cv=p15h("p15h-preview");cv.width=P15H_W;cv.height=P15H_H;
 const c=cv.getContext("2d");c.drawImage(p15hRender(d),0,0);
 c.fillStyle="#000";for(const l of P15H_LINES)c.fillRect(l.x,l.y,l.w,l.h);
 // Reserva indicativa, NO matriz: la CT230B dibuja el QR con TSPL nativo.
 c.save();c.strokeStyle="#aaa";c.lineWidth=1;c.setLineDash([5,5]);
 c.strokeRect(P15H_QR.x,P15H_QR.y,205,205);c.setLineDash([]);
 c.translate(P15H_QR.x+103,P15H_QR.y+101);
 c.rotate(-Math.PI/2);c.textAlign="center";
 p15hText(c,"QR NATIVO TSPL",0,0,17,"600","Geist",180,12);
 c.restore();
}
function p15hUpdate(){
 const connected=!!(device?.gatt?.connected&&writeChannel);
 let valid=p15hReady;try{p15hData();}catch(e){valid=false;}
 p15h("p15h-print").disabled=busy||p15hBusy||!connected||!valid||!p15h("p15h-confirm").checked;
}
async function p15hRefresh(){
 if(p15hBusy)return;p15hBusy=true;
 try{
  await v5EnsureIdentity();
  const fonts=await Promise.all([
   document.fonts.load('700 66px "Bricolage Grotesque"',"Puré de calabaza y calabacín"),
   document.fonts.load('700 60px "Bricolage Grotesque"',"215,56"),
   document.fonts.load('400 25px "Geist"',"Envasado y congelación"),
   document.fonts.load('italic 500 21px "Geist"',"Recalentar removiendo")
  ]);
  if(fonts.some(x=>!x.length||x.some(f=>f.status!=="loaded")))
   throw Error("No se han cargado las fuentes oficiales.");
  p15hReady=true;
  p15hPreview(p15hData(true));
  try{
   const {job,blocks,rasterBytes}=p15hBuild(p15hData());
   p15h("p15h-metrics").textContent=job.length+" B; "+Math.ceil(job.length/20)+
    " fragmentos BLE; "+blocks+" bandas raster dispersas ("+rasterBytes+" B), "+
    "2 separadores TSPL nativos y QR real.";
  }catch(e){p15h("p15h-metrics").textContent="Sin trabajo imprimible: "+e.message;}
  p15h("p15h-assets").textContent="Diseño horizontal fiel a geometría SVG · isotipo y fuentes oficiales cargados; dos líneas TSPL nativas.";
 }catch(e){
  p15hReady=false;
  p15h("p15h-assets").textContent="Vista/impresión bloqueadas: "+e.message;
  log("P15 SVG · "+e.message);
 }finally{p15hBusy=false;p15hUpdate();}
}
async function p15hPrint(){
 if(busy||p15hBusy||!p15hReady||!device?.gatt?.connected||
  !writeChannel||!p15h("p15h-confirm").checked)return;
 let result,d;try{d=p15hData();result=p15hBuild(d);}
 catch(e){log("P15 SVG · impresión bloqueada: "+e.message);return;}
 const prompt="¿Imprimir UNA etiqueta HORIZONTAL 50×80 de "+d.name+"?\n"+
  "SVG Canva como referencia, 2 líneas TSPL nativas; QR "+d.url+
  "\n"+result.job.length+" bytes / "+Math.ceil(result.job.length/20)+
  " fragmentos BLE. NO hay reintentos automáticos.";
 if(!window.confirm(prompt))return;
 log("P15 SVG horizontal · "+d.name+" · "+result.job.length+" B / "+
  result.blocks+" bandas; línea BAR 109×21 y 251×7; QR "+d.url);
 try{await transmitDiagnostic(result.job,"P15 SVG 50×80 "+d.name);}
 finally{p15h("p15h-confirm").checked=false;p15hUpdate();}
}
for(const [k,v] of Object.entries(P15H_DEFAULT))p15h("p15h-"+k).value=v;
const now=new Date();
p15h("p15h-packed").value=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+
 "-"+String(now.getDate()).padStart(2,"0");
for(const id of ["name","kcal","protein","carbs","fat","packed","expiry",
 "instructionHeading","instruction","noteHeading","note","url"])
 p15h("p15h-"+id).addEventListener("input",()=>{p15hUpdate();p15hRefresh();});
p15h("p15h-confirm").addEventListener("change",p15hUpdate);
p15h("p15h-print").addEventListener("click",p15hPrint);
log("P15 SVG horizontal · Puré de calabaza y calabacín; 2 líneas BAR nativas, QR TSPL, BLE V0.6.2 intacto.");
p15hRefresh();
