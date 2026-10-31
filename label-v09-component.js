"use strict";
/* V0.9 · SOLO LABORATORIO · Componente 50 × 30 mm · Pisto.
 * Autoridad: SVG Canva aportado por usuaria (189 × 113, viewBox 141.75 × 84.75).
 * Transcripción geométrica A 590 × 354 dots; no modifica V0.7.3 ni V0.8.
 * Una ración por bolsa; NO mostrar raciones ni gramaje.
 * Texto / isotipo / barras: Canvas 1-bit, raster disperso v62SparseRegion.
 * QR: TSPL nativo, URL canónica. BLE: transmitDiagnostic intacto (20 B/75 ms).
 */
const V9_ID=id=>document.getElementById(id);
const V9_W=590,V9_H=354,V9_LIMIT=35000;
const V9_QR=Object.freeze({x:420,y:187,module:4,box:148});
const V9_RECIPE=Object.freeze({
 name:"Pisto",
 kcal:"164,35", protein:"5,69", carbs:"18,58", fat:"7,84",
 heading:"DESCONGELACIÓN Y CONSUMO",
 instructions:Object.freeze(["En nevera · Recalentar tapado o","en sartén a fuego suave"]),
 noteTitle:"NOTA",
 note:Object.freeze(["El calabacín puede variar","de textura al congelar."]),
 url:"https://mirurecetas.github.io/menu-anual-recetas/recetas/pisto/"
});
let v9Ready=false,v9Preparing=false,v9Printing=false,v9NeedsRefresh=false;
function v9Date(iso,required=true){
 if(!iso){if(required)throw Error("Selecciona las dos fechas.");return "__/__/__";}
 if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))throw Error("Formato de fecha inválido.");
 const d=new Date(iso+"T12:00:00");
 if(Number.isNaN(d.valueOf())||d.toISOString().slice(0,10)!==iso)
  throw Error("Fecha de calendario inválida.");
 return iso.slice(8,10)+"/"+iso.slice(5,7)+"/"+iso.slice(2,4);
}
function v9Data(allowDraft=false){
 const p=V9_ID("v9Packed").value,e=V9_ID("v9Expiry").value;
 if(p&&e&&e<p)throw Error("El consumo preferente precede al envasado.");
 return {packed:v9Date(p,!allowDraft),expiry:v9Date(e,!allowDraft)};
}
function v9Label(c,txt,x,y,size,weight,family,maxWidth,minSize=size,align="left",italic=false){
 c.textAlign=align;
 let px=size;
 const prefix=italic?"italic ":"";
 do{
  c.font=prefix+weight+" "+px+'px "'+family+'"';
  if(c.measureText(txt).width<=maxWidth)break;
  px--;
 }while(px>=minSize);
 if(px<minSize||c.measureText(txt).width>maxWidth)
  throw Error("Texto de diseño fuera de su caja: "+txt);
 c.fillText(txt,x,y);
}
function v9Draw(d){
 if(typeof v7GetVisibleLogo!=="function")throw Error("Falta isotipo oficial recortado V0.7.3.");
 const logo=v7GetVisibleLogo();
 const canvas=document.createElement("canvas");canvas.width=V9_W;canvas.height=V9_H;
 const c=canvas.getContext("2d",{willReadFrequently:true});
 if(!c)throw Error("Canvas no disponible.");
 c.fillStyle="#fff";c.fillRect(0,0,V9_W,V9_H);
 c.fillStyle="#000";c.textBaseline="alphabetic";c.textAlign="left";
 // Geometría del SVG Canva: título a la izquierda; isotipo GRANDE a la derecha.
 v9Label(c,V9_RECIPE.name,11,46,46,"700","Bricolage Grotesque",475);
 c.drawImage(logo,525,5,53,48);
 // Cabecera: banda gruesa de borde a borde (SVG: y≈60–73).
 c.fillRect(0,60,V9_W,12);
 // Fechas: solo estos dos datos son editables durante el ensayo.
 v9Label(c,"Envasado y congelación",15,100,20,"400","Geist",266,18);
 v9Label(c,"Consumo preferente",15,135,20,"400","Geist",266,18);
 v9Label(c,d.packed,300,100,20,"700","Geist",94,18);
 v9Label(c,d.expiry,300,135,20,"700","Geist",94,18);
 // Única segunda regla: FINA y PARCIAL. Termina antes del área nutricional.
 c.fillRect(0,149,392,4);
 // Columna derecha igual que SVG, kcal sobre sus macros, sin cruzar líneas.
 v9Label(c,V9_RECIPE.kcal,448,109,30,"700","Bricolage Grotesque",119,26);
 v9Label(c,"kcal",481,126,15,"400","Geist",66);
 for(const [x,grams,abbr] of [
  [436,V9_RECIPE.protein,"PR"],[496,V9_RECIPE.carbs,"HC"],[555,V9_RECIPE.fat,"GR"]
 ]){
  v9Label(c,grams+" g",x,148,15,"700","Geist",64,13,"center");
  v9Label(c,abbr,x,164,15,"400","Geist",56,14,"center");
 }
 // Instrucciones intactas del diseño. En V0.9 no se ofrece edición de notas.
 // Revisión editorial del SVG: más cuerpo y anchura útil hasta antes del QR.
 // Los textos se detienen en x=401; reserva TSPL del QR desde x=420.
 const v9TextMaxWidth=401-15;
 v9Label(c,V9_RECIPE.heading,15,189,24,"700","Bricolage Grotesque",v9TextMaxWidth,21);
 v9Label(c,V9_RECIPE.instructions[0],15,230,23,"400","Geist",v9TextMaxWidth,21);
 v9Label(c,V9_RECIPE.instructions[1],15,258,23,"400","Geist",v9TextMaxWidth,21);
 v9Label(c,V9_RECIPE.noteTitle,15,299,20,"700","Bricolage Grotesque",v9TextMaxWidth,18);
 v9Label(c,V9_RECIPE.note[0],15,322,19,"500","Geist",v9TextMaxWidth,17,"left",true);
 v9Label(c,V9_RECIPE.note[1],15,345,19,"500","Geist",v9TextMaxWidth,17,"left",true);
 // Zona x≥405,y≥174 SIN TINTA para QR real + quiet zone: no fake QR raster.
 return canvas;
}
function v9Build(d){
 const canvas=v9Draw(d);
 // Raster partido: segunda zona NO invade QR nativo ni su quiet zone.
 const regions=[
  {x:0,y:0,w:V9_W,h:174,label:"Pisto cabecera fechas nutrición"},
  {x:0,y:174,w:405,h:180,label:"Pisto instrucciones y nota"}
 ];
 const tiles=[];
 for(const region of regions)tiles.push(...v62SparseRegion(canvas,region));
 const parts=[encoder.encode("SIZE 50 mm,30 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n")];
 for(const tile of tiles){
  if(tile.height>12)throw Error("Banda BITMAP superior a 12 filas.");
  parts.push(encoder.encode("BITMAP "+tile.x+","+tile.y+","+tile.widthBytes+","+tile.height+",0,"));
  parts.push(tile.bytes,encoder.encode("\r\n"));
 }
 parts.push(encoder.encode("QRCODE "+V9_QR.x+","+V9_QR.y+
  ",M,"+V9_QR.module+',A,0,M2,S7,"'+V9_RECIPE.url+'"\r\n'));
 parts.push(encoder.encode("PRINT 1,1\r\n"));
 const job=joinBuffers(...parts);
 if(job.length>V9_LIMIT)throw Error("Trabajo "+job.length+
  " B supera el límite preventivo "+V9_LIMIT+" B; no se enviará.");
 return {job,tiles:tiles.length,raster:tiles.reduce((s,t)=>s+t.bytes.length,0)};
}
function v9Preview(d){
 const cv=V9_ID("v9Preview");cv.width=V9_W;cv.height=V9_H;
 const c=cv.getContext("2d");c.drawImage(v9Draw(d),0,0);
 c.save();c.strokeStyle="#999";c.lineWidth=1;c.setLineDash([4,4]);
 c.strokeRect(V9_QR.x,V9_QR.y,V9_QR.box,V9_QR.box);
 c.setLineDash([]);c.fillStyle="#666";c.textAlign="center";
 c.font='600 12px "Geist"';c.fillText("QR NATIVO",V9_QR.x+74,V9_QR.y+68);
 c.fillText("TSPL",V9_QR.x+74,V9_QR.y+84);
 c.restore();
}
function v9Update(){
 let valid=false;
 try{v9Data();valid=true;}catch(_){}
 V9_ID("v9Print").disabled=busy||v9Printing||v9Preparing||!v9Ready||
  !valid||!device?.gatt?.connected||!writeChannel||!V9_ID("v9Confirm").checked;
}
async function v9Refresh(){
 if(v9Preparing){v9NeedsRefresh=true;return;}
 v9Preparing=true;
 try{
  await v5EnsureIdentity();
  const fonts=await Promise.all([
   document.fonts.load('700 46px "Bricolage Grotesque"',V9_RECIPE.name),
   document.fonts.load('700 30px "Bricolage Grotesque"',V9_RECIPE.kcal),
   document.fonts.load('400 20px "Geist"',V9_RECIPE.instructions[0]),
   document.fonts.load('700 20px "Geist"',"30/10/26"),
   document.fonts.load('italic 500 16px "Geist"',V9_RECIPE.note[0])
  ]);
  if(fonts.some(a=>!a.length||a.some(f=>f.status!=="loaded")))
   throw Error("Fuentes oficiales no cargadas.");
  v9Ready=true;
  v9Preview(v9Data(true));
  try{
   const m=v9Build(v9Data());
   V9_ID("v9Metrics").textContent=m.job.length+" B · "+Math.ceil(m.job.length/20)+
    " fragmentos BLE · "+m.tiles+" bandas raster dispersas · "+
    m.raster+" B de gráfico · QR nativo TSPL.";
  }catch(e){V9_ID("v9Metrics").textContent="Vista previa lista; impresión pendiente: "+e.message;}
  V9_ID("v9Status").textContent="Diseño del SVG renderizado: línea superior gruesa, segunda parcial, logo oficial grande. QR auténtico solo en la impresión.";
 }catch(e){
  v9Ready=false;V9_ID("v9Status").textContent="Error V0.9: "+e.message;
  log("V0.9 · ERROR DE VISTA PREVIA: "+e.message);
 }finally{
  v9Preparing=false;v9Update();
  if(v9NeedsRefresh){v9NeedsRefresh=false;void v9Refresh();}
 }
}
async function v9Print(){
 if(busy||v9Printing||!v9Ready||!device?.gatt?.connected||
  !writeChannel||!V9_ID("v9Confirm").checked)return;
 let data,result;
 try{data=v9Data();result=v9Build(data);}
 catch(e){log("V0.9 · BLOQUEADO: "+e.message);return;}
 if(!window.confirm("Imprimir UNA etiqueta de COMPONENTE 50 × 30 mm: Pisto.\n"+
  "Envasado: "+data.packed+" · Consumo preferente: "+data.expiry+
  "\n"+result.job.length+" bytes / "+Math.ceil(result.job.length/20)+
  " fragmentos BLE.\nQR real · una sola copia · sin reintentos."))return;
 v9Printing=true;v9Update();
 log("V0.9 · Pisto componente 50×30 · "+result.job.length+
  " B / "+result.tiles+" bandas · QR "+V9_RECIPE.url);
 try{await transmitDiagnostic(result.job,"V0.9 COMPONENTE PISTO 50×30");}
 finally{v9Printing=false;V9_ID("v9Confirm").checked=false;v9Update();}
}
for(const id of ["v9Packed","v9Expiry"]){
 V9_ID(id).addEventListener("input",()=>{v9Update();void v9Refresh();});
 V9_ID(id).addEventListener("change",()=>{v9Update();void v9Refresh();});
}
V9_ID("v9Confirm").addEventListener("change",v9Update);
V9_ID("v9Print").addEventListener("click",v9Print);
const v9Today=new Date();
V9_ID("v9Packed").value=v9Today.getFullYear()+"-"+
 String(v9Today.getMonth()+1).padStart(2,"0")+"-"+String(v9Today.getDate()).padStart(2,"0");
log("V0.9 · Pisto 50×30 según SVG Canva; QR nativo; BLE 20 B / 75 ms intacto. Pendiente ensayo físico.");
void v9Refresh();
