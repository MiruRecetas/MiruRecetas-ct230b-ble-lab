"use strict";
/* V0.7 · SVG CANVA ORIGINAL 20261030_200122_0000.svg
 * INDEPENDIENTE de label-p15-horizontal-svg.js y de la reconstrucción del agente.
 * Referencia visual: SVG real aportado por la usuaria (lienzo vertical
 * 141.75 × 226.50 unidades), renderizado e inspeccionado girado 90°.
 * Mapa editorial fiel: 945×590 -> 590×945 a -90° en el rollo de 50×80 mm.
 * Reserva de logo en la esquina derecha del encabezado (activo oficial BN),
 * banda gruesa completa bajo el título, banda fina PARCIAL tras las fechas,
 * instrucciones y nota a la izquierda, kcal/macros/QR a la derecha.
 * Solamente BAR y QR son objetos TSPL nativos. No se añade un anillo.
 */
const V7_W=590,V7_H=945,V7_LW=945,V7_LH=590;
const V7_LIMIT=35000,V7_QR=Object.freeze({x:345,y:58,module:5});
const V7_BARS=Object.freeze([
  {x:109,y:0,w:21,h:945},
  {x:251,y:427,w:7,h:518}
]);
const V7_REGIONS=Object.freeze([
  {x:0,y:0,w:109,h:945,label:"título e isotipo"},
  {x:130,y:0,w:121,h:945,label:"fechas y calorías"},
  {x:251,y:0,w:94,h:945,label:"encabezado y macros"},
  {x:345,y:260,w:245,h:685,label:"instrucciones y nota"},
  {x:550,y:0,w:40,h:260,label:"margen junto a QR"}
]);
const V7_RECIPE=Object.freeze({
  name:"Puré de calabaza y calabacín",
  kcal:"215,56", protein:"4,44", carbs:"22,31", fat:"12,92",
  heading:"DESCONGELACIÓN Y CONSUMO",
  instruction:"Descongelar en nevera y remover mientras se calienta enérgicamente o volver a batir",
  noteHeading:"NOTA",
  note:"La textura puede variar al descongelar.",
  url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/"
});
const v7ById=id=>document.getElementById(id);
let v7Ready=false,v7Busy=false;
function v7Date(iso){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)||!Number.isFinite(Date.parse(iso))||
    new Date(iso+"T12:00:00").toISOString().slice(0,10)!==iso)
     throw Error("Fecha de calendario no válida.");
  return v5Formatted(iso);
}
function v7GetData(preview=false){
  const p=v7ById("v7Packed").value,e=v7ById("v7Expiry").value;
  if(!preview&&(!p||!e))throw Error("Indica las dos fechas.");
  if(p&&e&&e<p)throw Error("Consumo preferente anterior al envasado.");
  return {...V7_RECIPE, packed:p?v7Date(p):"__/__/__", expiry:e?v7Date(e):"__/__/__"};
}
// Medidas y cajas originales del SVG, NO escalar letras horizontalmente.
function v7Text(ctx,str,x,y,size,weight="500",family="Geist",max=Infinity,min=13,italic=false){
  let fontSize=size,sty=italic?"italic ":"";
  while(fontSize>=min){
    ctx.font=sty+weight+" "+fontSize+'px "'+family+'"';
    if(ctx.measureText(str).width<=max)break;
    fontSize--;
  }
  if(fontSize<min)throw Error("No cabe la cadena completa en la zona de Canva: "+str);
  ctx.fillStyle="#000";ctx.fillText(str,x,y);
}
function v7Lines(ctx,str,x,y,maxWidth,size,weight="400",maxLines=4,italic=false){
  const words=str.trim().split(/\s+/);
  // Reducir suavemente el tamaño únicamente si el CONTENIDO de la receta
  // requiere más espacio que el texto de muestra del SVG.
  for(let test=size;test>=18;test--){
    ctx.font=(italic?"italic ":"")+weight+" "+test+'px "Geist"';
    let lines=[],current="",failed=false;
    for(const word of words){
      if(ctx.measureText(word).width>maxWidth){failed=true;break;}
      const candidate=current?current+" "+word:word;
      if(ctx.measureText(candidate).width<=maxWidth){current=candidate;}
      else{if(current)lines.push(current);current=word;}
    }
    if(current)lines.push(current);
    if(!failed&&lines.length<=maxLines){
      for(let i=0;i<lines.length;i++)
        v7Text(ctx,lines[i],x,y+i*(test+6),test,weight,"Geist",maxWidth,test,italic);
      return lines.length;
    }
  }
  throw Error("Instrucciones completas no caben en el bloque del SVG.");
}
function v7Render(d){
  if(!v5Logo)throw Error("No está cargado el isotipo oficial BN.");
  const landscape=document.createElement("canvas");
  landscape.width=V7_LW;landscape.height=V7_LH;
  const c=landscape.getContext("2d",{willReadFrequently:true});
  if(!c)throw Error("El navegador no permite Canvas 2D.");
  c.fillStyle="#fff";c.fillRect(0,0,V7_LW,V7_LH);
  c.textAlign="left";c.textBaseline="alphabetic";c.imageSmoothingEnabled=true;
  // Bloque superior del SVG: tipografía protagonista + reserva exacta del logo.
  v7Text(c,d.name,19,87,66,"700","Bricolage Grotesque",795,30);
  c.drawImage(v5Logo,845,19,84,80);
  // Fechas a la izquierda del módulo energético; coordenadas del SVG.
  v7Text(c,"Envasado y congelación",26,168,25,"400","Geist",350,20);
  v7Text(c,"Consumo preferente",26,212,25,"400","Geist",350,20);
  v7Text(c,d.packed,396,168,25,"700","Geist",147,20);
  v7Text(c,d.expiry,396,212,25,"700","Geist",147,20);
  // Cifras y columnas PR/HC/GR exactamente en el área DERECHA.
  v7Text(c,d.kcal,668,194,65,"700","Bricolage Grotesque",250,40);
  v7Text(c,"kcal",743,227,27,"400","Geist",100,20);
  for(const [x,number,abbr] of [
    [614,d.protein,"PR"],[729,d.carbs,"HC"],[843,d.fat,"GR"]
  ]){
    v7Text(c,number+" g",x,267,24,"700","Geist",105,17);
    v7Text(c,abbr,x+26,296,20,"400","Geist",64,16);
  }
  // Instrucciones bajo la regla PARCIAL, no reordenadas ni superpuestas al QR.
  v7Text(c,d.heading,26,309,23,"700","Bricolage Grotesque",495,18);
  v7Lines(c,d.instruction,26,350,495,23,"400",4,false);
  v7Text(c,d.noteHeading,26,503,21,"700","Bricolage Grotesque",200,17);
  v7Lines(c,d.note,26,532,245,18,"500",2,true);
  // El SVG ya contiene la orientación horizontal aprobada. Gira el arte
  // -90 grados al espacio FÍSICO sin alterar ninguna posición interna.
  const physical=document.createElement("canvas");
  physical.width=V7_W;physical.height=V7_H;
  const p=physical.getContext("2d",{willReadFrequently:true});
  p.fillStyle="#fff";p.fillRect(0,0,V7_W,V7_H);
  p.translate(0,V7_H);p.rotate(-Math.PI/2);p.drawImage(landscape,0,0);
  return physical;
}
function v7Build(d){
  const physical=v7Render(d),parts=[
    encoder.encode("SIZE 50 mm,80 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")
  ];
  let tiles=[];
  for(const region of V7_REGIONS)tiles.push(...v62SparseRegion(physical,region));
  for(const tile of tiles){
    if(tile.height>12)throw Error("La banda raster supera el límite de 12 filas.");
    parts.push(encoder.encode("BITMAP "+tile.x+","+tile.y+","+
      tile.widthBytes+","+tile.height+",0,"));
    parts.push(tile.bytes,encoder.encode("\r\n"));
  }
  for(const b of V7_BARS)parts.push(encoder.encode(
    "BAR "+b.x+","+b.y+","+b.w+","+b.h+"\r\n"));
  parts.push(encoder.encode("QRCODE "+V7_QR.x+","+V7_QR.y+
    ",M,"+V7_QR.module+',A,0,M2,S7,"'+d.url+'"\r\n'));
  parts.push(encoder.encode("PRINT 1,1\r\n"));
  const job=joinBuffers(...parts);
  if(job.length>V7_LIMIT)throw Error("Trabajo de "+job.length+
    " B > límite de "+V7_LIMIT+" B; no se enviará.");
  return {job,tiles:tiles.length,raster:tiles.reduce((n,t)=>n+t.bytes.length,0)};
}
function v7Preview(d){
  const cv=v7ById("v7Preview");
  cv.width=V7_W;cv.height=V7_H;
  const p=cv.getContext("2d");p.drawImage(v7Render(d),0,0);
  p.fillStyle="#000";for(const b of V7_BARS)p.fillRect(b.x,b.y,b.w,b.h);
  p.save();p.strokeStyle="#999";p.lineWidth=1;p.setLineDash([4,4]);
  p.strokeRect(V7_QR.x,V7_QR.y,205,205);p.setLineDash([]);
  p.translate(V7_QR.x+102,V7_QR.y+102);p.rotate(-Math.PI/2);
  p.textAlign="center";v7Text(p,"QR NATIVO TSPL",0,0,16,"600","Geist",170,14);
  p.restore();
}
function v7Update(){
  let valid=false;try{v7GetData();valid=true;}catch(_){}
  v7ById("v7Print").disabled=busy||v7Busy||!v7Ready||!valid||
    !device?.gatt?.connected||!writeChannel||!v7ById("v7Confirm").checked;
}
async function v7Refresh(){
  if(v7Busy)return;v7Busy=true;
  try{
    await v5EnsureIdentity();
    const fs=await Promise.all([
      document.fonts.load('700 66px "Bricolage Grotesque"',V7_RECIPE.name),
      document.fonts.load('700 65px "Bricolage Grotesque"',V7_RECIPE.kcal),
      document.fonts.load('400 25px "Geist"',V7_RECIPE.instruction),
      document.fonts.load('700 24px "Geist"',V7_RECIPE.protein+" g"),
      document.fonts.load('italic 500 18px "Geist"',V7_RECIPE.note)
    ]);
    if(fs.some(a=>!a.length||a.some(f=>f.status!=="loaded")))
      throw Error("No se han cargado todas las fuentes oficiales.");
    // Siempre dibujar la vista previa, incluso con fechas vacías.
    v7Ready=true;v7Preview(v7GetData(true));
    try{
      const m=v7Build(v7GetData());
      v7ById("v7Metrics").textContent=m.job.length+" B / "+
        Math.ceil(m.job.length/20)+" fragmentos BLE · "+m.tiles+
        " bandas dispersas · "+m.raster+" B gráficos · 2 BAR + QR nativos.";
    }catch(e){v7ById("v7Metrics").textContent="Aún no imprimible: "+e.message;}
    v7ById("v7Assets").textContent=
      "Vista previa cargada · reconstrucción independiente del SVG original; fuentes y marca oficiales.";
  }catch(e){
    v7Ready=false;
    v7ById("v7Assets").textContent="Error V0.7: "+e.message;
    log("V0.7 · ERROR DE VISTA PREVIA: "+e.message);
  }finally{v7Busy=false;v7Update();}
}
async function v7Print(){
  if(busy||v7Busy||!v7Ready||!device?.gatt?.connected||
      !writeChannel||!v7ById("v7Confirm").checked)return;
  let d,b;try{d=v7GetData();b=v7Build(d);}
  catch(e){log("V0.7 · BLOQUEADO: "+e.message);return;}
  if(!window.confirm("Enviar UNA etiqueta V0.7 de 50×80 mm para "+
     d.name+" (diseño horizontal aprobado)?\n"+
     b.job.length+" bytes / "+Math.ceil(b.job.length/20)+
     " fragmentos BLE. QR real. Sin reintentos automáticos."))return;
  log("V0.7 · Puré de calabaza y calabacín · "+b.job.length+
    " B / "+b.tiles+" bandas · BAR nativas 2 · QR real "+d.url);
  try{await transmitDiagnostic(b.job,"V0.7 50×80 Puré · SVG original");}
  finally{v7ById("v7Confirm").checked=false;v7Update();}
}
const v7Today=new Date();
v7ById("v7Packed").value=v7Today.getFullYear()+"-"+
  String(v7Today.getMonth()+1).padStart(2,"0")+"-"+
  String(v7Today.getDate()).padStart(2,"0");
for(const id of ["v7Packed","v7Expiry"])
  v7ById(id).addEventListener("change",()=>{v7Update();v7Refresh();});
v7ById("v7Confirm").addEventListener("change",v7Update);
v7ById("v7Print").addEventListener("click",v7Print);
log("V0.7 · Módulo independiente del P15H; referencia directa SVG Canva aprobado, 50×80.");
v7Refresh();
