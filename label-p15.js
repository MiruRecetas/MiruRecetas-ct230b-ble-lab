"use strict";
/* P15 · Cuatro ensayos editoriales Canva · CT230B, NO VALIDADO FÍSICAMENTE.
 * Se reutilizan v5EnsureIdentity, v5ToTsplBitmap, v62SparseRegion y
 * transmitDiagnostic: BLE 20 B, espera 75 ms, sin reintentos, raster 12 filas.
 * Las cuatro propuestas son recreaciones Canvas/TSPL, NO exportaciones Canva.
 */
const P15_RECIPES=Object.freeze({
 cebollas:Object.freeze({name:"Cebollas rellenas",kcal:338.68,protein:15.92,carbs:27.50,fat:17.67,
  url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/cebollas-rellenas/"}),
 pisto:Object.freeze({name:"Pisto",kcal:164.35,protein:5.69,carbs:18.58,fat:7.84,
  url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/pisto/"})
});
const P15_PROFILES=Object.freeze({
 vertical:Object.freeze({title:"50×80 vertical · Cebollas rellenas",width:590,height:945,size:"50 mm,80 mm",
  qr:Object.freeze({x:352,y:664,module:5}),url:P15_RECIPES.cebollas.url,
  canva:"DAHZbhgmFc0"}),
 landscape:Object.freeze({title:"50×80 horizontal · Cebollas rellenas",width:590,height:945,size:"50 mm,80 mm",
  qr:Object.freeze({x:64,y:700,module:5}),url:P15_RECIPES.cebollas.url,
  canva:"DAHZgFaJ6oM"}),
 component:Object.freeze({title:"50×30 componente · Pisto",width:590,height:354,size:"50 mm,30 mm",
  qr:Object.freeze({x:365,y:151,module:5}),url:P15_RECIPES.pisto.url,
  canva:"DAHZfv_-Y-g"}),
 ingredient:Object.freeze({title:"30×20 ingrediente · Carne picada",width:354,height:236,size:"30 mm,20 mm",
  qr:null,url:null,canva:"DAHZfxOJgfA"})
});
const P15_LABELS=Object.freeze(["vertical","landscape","component","ingredient"]);
const P15_MAX_BYTES=35000,P15_STRIPE_ROWS=12,P15_QR_SIDE=205;
let p15Ready=false;
const p15El=id=>document.getElementById(id);
function p15Font(c,font,text,x,y,max){
 c.font=font;c.fillStyle="#000";c.fillText(text,x,y,...(max===undefined?[]:[max]));
}
function p15Format(n){return n.toFixed(2).replace(".",",");}
function p15Data(){
 const packed=p15El("p15Packed").value,expiry=p15El("p15Expiry").value;
 for(const iso of [packed,expiry]){
  if(!/^\d{4}-\d\d-\d\d$/.test(iso)||Number.isNaN(Date.parse(iso))||
     new Date(iso+"T12:00:00").toISOString().slice(0,10)!==iso)throw Error("Selecciona dos fechas válidas.");
 }
 if(expiry<packed)throw Error("Consumo preferente anterior al envasado.");
 const quantity=Number(p15El("p15Quantity").value);
 if(!Number.isSafeInteger(quantity)||quantity<1||quantity>9999)throw Error("Indica un peso entero entre 1 y 9999 g.");
 return {packed:v5Formatted(packed),expiry:v5Formatted(expiry),quantity};
}
function p15Base(w,h){
 if(!v5Logo)throw Error("Isotipo oficial no cargado.");
 const cv=document.createElement("canvas");cv.width=w;cv.height=h;
 const c=cv.getContext("2d",{willReadFrequently:true});
 if(!c)throw Error("No hay Canvas 2D.");
 c.fillStyle="#fff";c.fillRect(0,0,w,h);
 c.fillStyle="#000";c.textBaseline="alphabetic";c.textAlign="left";
 return {cv,c};
}
function p15MacroLine(c,m,x,y){
 v6PatternSquare(c,m.key,x,y-25);
 p15Font(c,'500 26px "Geist"',m.abbr,x+42,y);
 c.textAlign="right";
 p15Font(c,'700 28px "Geist"',p15Format(m.grams)+" g",568,y,143);
 c.textAlign="left";
}
function p15Dates(c,d,x,y,r,small=false){
 const font=small?'500 16px "Geist"':'500 22px "Geist"';
 const bold=small?'700 17px "Geist"':'700 23px "Geist"';
 p15Font(c,font,"Envasado y congelación",x,y,r-x-112);
 c.textAlign="right";p15Font(c,bold,d.packed,r,y);c.textAlign="left";
 p15Font(c,font,"Consumo preferente",x,y+(small?26:40),r-x-112);
 c.textAlign="right";p15Font(c,bold,d.expiry,r,y+(small?26:40));c.textAlign="left";
}
function p15Vertical(d){
 const {cv,c}=p15Base(590,945);
 p15Font(c,'700 43px "Bricolage Grotesque"',"Cebollas rellenas",27,83,468);
 c.drawImage(v5Logo,514,23,48,49);
 c.fillRect(27,119,531,3);
 v6Ring(c,148,274);
 const macros=[
  {key:"protein",abbr:"PR",grams:15.92},
  {key:"carbs",abbr:"HC",grams:27.50},
  {key:"fat",abbr:"GR",grams:17.67}
 ];
 for(let i=0;i<macros.length;i++)p15MacroLine(c,macros[i],313,192+i*82);
 c.fillRect(27,420,531,3);
 p15Dates(c,d,28,466,556);
 c.fillRect(27,538,531,3);
 p15Font(c,'700 25px "Bricolage Grotesque"',"DESCONGELACIÓN Y CONSUMO",28,601,525);
 p15Font(c,'500 23px "Geist"',"En nevera · Recalentar",28,683,303);
 p15Font(c,'500 23px "Geist"',"tapado",28,715,295);
 p15Font(c,'700 24px "Bricolage Grotesque"',"NOTA",28,806);
 p15Font(c,'italic 500 20px "Geist"',"El huevo puede variar",28,839,305);
 p15Font(c,'italic 500 20px "Geist"',"de textura al congelar.",28,867,308);
 // Reserva del QR nativo: x352–557, y664–869. NO rasterizar ahí.
 return cv;
}
function p15Component(d){
 const {cv,c}=p15Base(590,354),r=P15_RECIPES.pisto;
 p15Font(c,'700 50px "Bricolage Grotesque"',r.name,27,59,385);
 c.drawImage(v5Logo,521,13,46,46);
 c.fillRect(25,75,540,2);
 p15Dates(c,d,27,106,339,true);
 c.fillRect(25,153,540,2);
 p15Font(c,'700 20px "Bricolage Grotesque"',"DESCONGELACIÓN Y CONSUMO",27,194,315);
 p15Font(c,'500 18px "Geist"',"En nevera · Recalentar tapado",27,226,307);
 p15Font(c,'500 17px "Geist"',"o en sartén a fuego suave",27,251,307);
 p15Font(c,'700 17px "Bricolage Grotesque"',"NOTA",27,293);
 p15Font(c,'italic 500 16px "Geist"',"El calabacín puede variar",27,317,300);
 p15Font(c,'italic 500 16px "Geist"',"de textura al congelar.",27,338,300);
 c.textAlign="center";
 p15Font(c,'700 29px "Bricolage Grotesque"',p15Format(r.kcal),458,60,140);
 p15Font(c,'500 15px "Geist"',"kcal",458,79);
 c.textAlign="left";
 const vals=[["PR",r.protein],["HC",r.carbs],["GR",r.fat]];
 for(let i=0;i<vals.length;i++){
  const x=388+i*65;
  p15Font(c,'700 15px "Geist"',p15Format(vals[i][1])+" g",x,114,61);
  p15Font(c,'500 13px "Geist"',vals[i][0],x,131);
 }
 // QR real de Pisto. Zona despejada también de reglas, textos y tramas.
 c.fillStyle="#fff";c.fillRect(353,142,232,207);
 return cv;
}
function p15Ingredient(d){
 const {cv,c}=p15Base(354,236);
 p15Font(c,'700 36px "Bricolage Grotesque"',"Carne picada",17,51,309);
 c.fillRect(17,62,320,2);
 p15Font(c,'500 17px "Geist"',"Envasado y congelación",17,96,229);
 c.textAlign="right";p15Font(c,'700 17px "Geist"',d.packed,335,96);c.textAlign="left";
 p15Font(c,'500 17px "Geist"',"Consumo preferente",17,129,223);
 c.textAlign="right";p15Font(c,'700 17px "Geist"',d.expiry,335,129);c.textAlign="left";
 p15Font(c,'700 48px "Bricolage Grotesque"',d.quantity+" g",17,195,238);
 c.drawImage(v5Logo,281,159,44,44);
 p15Font(c,'500 16px "Geist"',"Descongelar en nevera",17,223,252);
 return cv;
}
function p15Landscape(d){
 // 80×50 visual horizontal sobre rollo de ancho FÍSICO 50 mm: girar dibujo,
 // NO mandar SIZE 80 mm,50 mm que excedería el cabezal de 50 mm.
 const {cv:logical,c}=p15Base(945,590),r=P15_RECIPES.cebollas;
 c.drawImage(v5Logo,35,23,56,56);
 p15Font(c,'700 54px "Bricolage Grotesque"',r.name,112,77,776);
 c.fillRect(34,106,876,3);
 // Retícula horizontal: energía y macros sin el anillo, como Canva 01bis.
 p15Font(c,'700 59px "Bricolage Grotesque"',p15Format(r.kcal),45,187,205);
 p15Font(c,'500 23px "Geist"',"kcal",268,187);
 for(const [i,abbr,qty] of [[0,"PR",r.protein],[1,"HC",r.carbs],[2,"GR",r.fat]]){
  const x=50+i*206;
  p15Font(c,'700 25px "Geist"',p15Format(qty)+" g",x,241,148);
  p15Font(c,'500 20px "Geist"',abbr,x,268);
 }
 c.fillRect(34,293,877,3);
 p15Dates(c,d,36,342,606);
 c.fillRect(34,397,877,3);
 p15Font(c,'700 24px "Bricolage Grotesque"',"DESCONGELACIÓN Y CONSUMO",36,434,565);
 p15Font(c,'500 21px "Geist"',"En nevera · Recalentar tapado",36,471,580);
 p15Font(c,'700 20px "Bricolage Grotesque"',"NOTA",36,517);
 p15Font(c,'italic 500 18px "Geist"',"El huevo puede variar de textura al congelar.",36,550,598);
 // Zona lógica despejada x688..918,y309..539 para QR físico x64..269,y700..905.
 c.fillStyle="#fff";c.fillRect(688,309,230,230);
 const physical=document.createElement("canvas");
 physical.width=590;physical.height=945;
 const pc=physical.getContext("2d",{willReadFrequently:true});
 pc.fillStyle="#fff";pc.fillRect(0,0,590,945);
 pc.translate(590,0);pc.rotate(Math.PI/2);pc.drawImage(logical,0,0);
 return physical;
}
function p15Render(kind,d){
 switch(kind){
  case "vertical":return p15Vertical(d);
  case "landscape":return p15Landscape(d);
  case "component":return p15Component(d);
  case "ingredient":return p15Ingredient(d);
  default:throw Error("Formato desconocido.");
 }
}
function p15Regions(kind){
 if(kind==="ingredient")return [{x:0,y:0,w:354,h:236,label:"ingrediente"}];
 if(kind==="component")return [
  {x:0,y:0,w:590,h:118,label:"cabecera"},
  {x:0,y:118,w:350,h:236,label:"componente textos"},
  {x:350,y:118,w:240,h:236,label:"componente datos"}
 ];
 return [
  {x:0,y:0,w:590,h:120,label:"cabecera"},
  {x:0,y:120,w:305,h:305,label:"grafica izq"},
  {x:305,y:120,w:285,h:305,label:"macros der"},
  {x:0,y:425,w:590,h:128,label:"fechas"},
  {x:0,y:553,w:330,h:392,label:"texto inferior"},
  {x:330,y:553,w:260,h:392,label:"zona derecha"}
 ];
}
function p15Build(kind,d){
 const cfg=P15_PROFILES[kind];
 if(!cfg)throw Error("Formato no reconocido.");
 const canvas=p15Render(kind,d),parts=[
  encoder.encode("SIZE "+cfg.size+"\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")
 ];
 const tiles=[];
 for(const region of p15Regions(kind)){
  for(const tile of v62SparseRegion(canvas,region)){
   if(tile.height>P15_STRIPE_ROWS)throw Error("Banda superior a 12 filas.");
   tiles.push(tile);
  }
 }
 for(const tile of tiles){
  parts.push(encoder.encode("BITMAP "+tile.x+","+tile.y+","+tile.widthBytes+","+tile.height+",0,"));
  parts.push(tile.bytes);parts.push(encoder.encode("\r\n"));
 }
 if(cfg.qr){
  const {x,y,module}=cfg.qr;
  parts.push(encoder.encode('QRCODE '+x+','+y+',M,'+module+',A,0,M2,S7,"'+cfg.url+'"\r\n'));
 }
 parts.push(encoder.encode("PRINT 1,1\r\n"));
 const bytes=joinBuffers(...parts);
 if(bytes.length>P15_MAX_BYTES)
  throw Error("Trabajo de "+bytes.length+" B supera el límite preventivo "+P15_MAX_BYTES+" B. No se enviará.");
 return {bytes,tiles:tiles.length,rasterBytes:tiles.reduce((s,t)=>s+t.bytes.length,0),cfg,canvas};
}
function p15Display(kind,d){
 const cfg=P15_PROFILES[kind],preview=p15El("p15Preview-"+kind);
 preview.width=cfg.width;preview.height=cfg.height;
 const c=preview.getContext("2d");c.drawImage(p15Render(kind,d),0,0);
 if(cfg.qr){
  const {x,y}=cfg.qr;
  c.save();c.strokeStyle="#999";c.setLineDash([6,6]);c.lineWidth=2;
  c.strokeRect(x,y,P15_QR_SIDE,P15_QR_SIDE);c.setLineDash([]);
  c.textAlign="center";p15Font(c,'600 17px "Geist"',"QR NATIVO",x+102,y+95);
  p15Font(c,'500 12px "Geist"',"URL real",x+102,y+115);
  c.restore();
 }
}
function p15Update(){
 const connected=!!(device&&device.gatt?.connected&&writeChannel);
 let good=p15Ready;
 try{p15Data();}catch(e){good=false;}
 for(const kind of P15_LABELS)
  p15El("p15Print-"+kind).disabled=busy||!connected||!good||!p15El("p15Confirm-"+kind).checked;
}
async function p15Refresh(){
 try{
  await v5EnsureIdentity();
  const needs=await Promise.all([
   document.fonts.load('700 54px "Bricolage Grotesque"',"Cebollas rellenas"),
   document.fonts.load('700 28px "Geist"',"15,92 g"),
   document.fonts.load('italic 500 18px "Geist"',"congelar")
  ]);
  if(needs.some(x=>!x.length||x.some(f=>f.status!=="loaded")))
   throw Error("No se cargó alguna fuente oficial.");
  p15Ready=true;
  let data;
  try{data=p15Data();}
  catch(_){data={packed:"__/__/__",expiry:"__/__/__",quantity:500};}
  for(const kind of P15_LABELS){
   p15Display(kind,data);
   try{
    const job=p15Build(kind,data);
    p15El("p15Metrics-"+kind).textContent=job.bytes.length+
     " B · "+Math.ceil(job.bytes.length/20)+" fragmentos BLE · "+
     job.tiles+" bandas (12 filas máximo; "+job.rasterBytes+" B raster).";
   }catch(e){p15El("p15Metrics-"+kind).textContent="NO ENVIABLE: "+e.message;}
  }
  p15El("p15Status").textContent="Identidad oficial cargada. QR en vistas previas es reserva: se genera nativamente por TSPL.";
 }catch(e){
  p15Ready=false;p15El("p15Status").textContent="Bloqueado: "+e.message;
  log("P15 · activos no listos: "+e.message);
 }finally{p15Update();}
}
async function p15Print(kind){
 const cfg=P15_PROFILES[kind],confirm=p15El("p15Confirm-"+kind);
 if(!cfg||busy||!p15Ready||!device?.gatt?.connected||!writeChannel||!confirm.checked)return;
 let job;
 try{job=p15Build(kind,p15Data());}
 catch(e){log("P15 "+kind+" · no enviado: "+e.message);return;}
 if(!window.confirm("¿Imprimir exactamente UNA etiqueta "+cfg.title+"?\n"+
  "Rollo instalado de tamaño físico correcto, trabajo "+job.bytes.length+
  " bytes / "+Math.ceil(job.bytes.length/20)+" paquetes BLE.\n"+
  "Sin reintentos automáticos. Comprueba el papel y QR tras el envío."))return;
 log("P15 · "+cfg.title+" · "+job.bytes.length+" B / "+job.tiles+" bandas raster, QR "+
  (cfg.url?cfg.url:"no procede")+"; Canva "+cfg.canva);
 try{await transmitDiagnostic(job.bytes,"P15 "+cfg.title);}
 finally{confirm.checked=false;p15Update();}
}
for(const kind of P15_LABELS){
 p15El("p15Confirm-"+kind).addEventListener("change",p15Update);
 p15El("p15Print-"+kind).addEventListener("click",()=>p15Print(kind));
}
for(const id of ["p15Packed","p15Expiry","p15Quantity"])
 p15El(id).addEventListener("change",()=>{p15Update();p15Refresh();});
const p15Now=new Date();
p15El("p15Packed").value=p15Now.getFullYear()+"-"+
 String(p15Now.getMonth()+1).padStart(2,"0")+"-"+String(p15Now.getDate()).padStart(2,"0");
log("P15 · 4 diseños Canva en prueba; raster disperso 12 filas; BLE 20 B / 75 ms; sin impresión física nueva.");
p15Refresh();
