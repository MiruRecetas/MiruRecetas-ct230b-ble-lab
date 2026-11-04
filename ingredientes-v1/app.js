"use strict";
/* Prototipo autónomo de ingredientes para Conserva. No importa el motor de
 * etiquetas de recetas ni escribe en Airtable, inventario o backend. */
(function(){
 const E=window.MiruIngredient,$=id=>document.getElementById(id);
 const SERVICE="49535343-fe7d-4ae5-8fa9-9fafd205e455";
 const WRITE="49535343-8841-43f4-a8d4-ecbe34729bb3";
 const NOTIFY="49535343-1e4d-4bd9-ba61-23c647249616";
 let device=null,channel=null,logo=null,assetsPromise=null,busy=false,ready=false,refreshSeq=0;
 function log(s){
  $("log").textContent+="["+new Date().toLocaleTimeString("es-ES")+"] "+s+"\n";
 }
 function connected(){return !!(device?.gatt?.connected&&channel);}
 function values(){return {name:$("name").value,grams:$("grams").value,
  packed:$("packed").value,expiry:$("expiry").value};}
 function update(){
  let valid=false;
  try{E.normalize(values(),true);valid=true;}catch(_){}
  $("connect").disabled=busy||connected();
  $("disconnect").disabled=busy||!connected();
  $("print").disabled=busy||!connected()||!ready||!valid||!$("confirm-paper").checked;
  $("print").textContent=busy?"Operación en curso…":"Imprimir 1 etiqueta · 30 × 20 mm";
  $("connection").textContent=connected()?"CT230B conectada":"Sin conexión CT230B";
  $("connection").dataset.connected=String(connected());
  for(const id of ["name","grams","packed","expiry"])$(id).disabled=busy;
 }
 async function ensureAssets(){
  if(!assetsPromise)assetsPromise=(async()=>{
   const faces=await Promise.all([
    document.fonts.load('700 29px "Bricolage Grotesque"',"Carne Picada"),
    document.fonts.load('700 55px "Bricolage Grotesque"',"500 g"),
    document.fonts.load('400 17px "Geist"',"Envasado y congelación"),
    document.fonts.load('700 17px "Geist"',"30/10/26"),
    document.fonts.load('italic 500 16px "Geist"',"Descongelar en nevera")
   ]);
   if(faces.some(f=>!f.length||f.some(x=>x.status!=="loaded")))
    throw Error("No se cargaron las fuentes oficiales.");
   logo=await E.logo("../assets/isotipo-bn.svg");
  })();
  return assetsPromise;
 }
 async function refresh(){
  const n=++refreshSeq;
  ready=false;update();
  try{
   await ensureAssets();
   if(n!==refreshSeq)return;
   const d=E.normalize(values(),false),cv=E.render(d,logo);
   const canvas=$("preview");
   canvas.getContext("2d").clearRect(0,0,E.width,E.height);
   canvas.getContext("2d").drawImage(cv,0,0);
   let message="Vista previa con fecha pendiente; completa ambos calendarios para imprimir.";
   try{
    const strict=E.normalize(values(),true),full=E.build(E.render(strict,logo));
    message=full.bytes+" B · "+full.fragments+" fragmentos BLE · "+full.tiles+
     " bandas raster · 1 copia · sin QR.";
    ready=true;
   }catch(err){message="Sin envío: "+err.message;}
   $("metrics").textContent=message;
   $("design-status").textContent="Arte aprobado V0.8, tipografía e isotipo cargados.";
  }catch(err){
   if(n===refreshSeq){
    $("design-status").textContent="Vista previa bloqueada: "+err.message;
    $("metrics").textContent="No se puede imprimir sin los activos oficiales.";
    log("Diseño: "+err.message);
   }
  }finally{if(n===refreshSeq)update();}
 }
 function disconnect(){
  channel=null;update();
 }
 $("connect").addEventListener("click",async()=>{
  if(!navigator.bluetooth||!window.isSecureContext){
   log("Bluetooth requiere HTTPS y Chrome Android compatible.");return;
  }
  busy=true;update();
  try{
   device=await navigator.bluetooth.requestDevice({
    filters:[{namePrefix:"CT230B"}],optionalServices:[SERVICE]
   });
   device.addEventListener("gattserverdisconnected",()=>{
    log("CT230B desconectada.");disconnect();
   });
   const server=await device.gatt.connect(),svc=await server.getPrimaryService(SERVICE);
   const write=await svc.getCharacteristic(WRITE);
   if(!(write.properties.write||write.properties.writeWithoutResponse))
    throw Error("Canal UART no admite WRITE.");
   channel=write;
   try{
    const notifications=await svc.getCharacteristic(NOTIFY);
    await notifications.startNotifications();
    log("Notificaciones GATT habilitadas.");
   }catch(err){log("Aviso: notificaciones no disponibles: "+err.message);}
   log("Conectado al servicio UART, sin comandos de impresión.");
  }catch(err){
   log("Error al conectar: "+err.name+": "+err.message);
   if(device?.gatt?.connected)device.gatt.disconnect();
   disconnect();
  }finally{busy=false;update();}
 });
 $("disconnect").addEventListener("click",()=>{
  if(device?.gatt?.connected)device.gatt.disconnect();
  disconnect();
 });
 $("print").addEventListener("click",async()=>{
  if(busy||!ready||!connected()||!$("confirm-paper").checked)return;
  let d,work;
  try{
   d=E.normalize(values(),true);
   work=E.build(E.render(d,logo));
  }catch(err){log("Impresión bloqueada: "+err.message);update();return;}
  if(!window.confirm("Confirmar UNA etiqueta 30 × 20 mm: "+d.name+
    " · "+d.grams+" g · envasado "+d.packed+
    " · consumo preferente "+d.expiry+
    ".\nRollo 30 × 20 mm instalado; no se reintentará automáticamente."))return;
  busy=true;update();
  let done=0;
  const total=work.fragments;
  $("progress").hidden=false;$("progress").value=0;$("progress").max=total;
  log("Envío único de "+work.bytes+" B; "+total+" fragmentos BLE y "+work.tiles+" bandas; sin QR.");
  try{
   for(let i=0;i<work.job.length;i+=20){
    if(!connected())throw Error("Se perdió la conexión BLE durante el envío.");
    const part=work.job.slice(i,i+20);
    if(channel.properties.write&&typeof channel.writeValueWithResponse==="function")
     await channel.writeValueWithResponse(part);
    else if(channel.properties.writeWithoutResponse&&typeof channel.writeValueWithoutResponse==="function")
     await channel.writeValueWithoutResponse(part);
    else throw Error("WRITE no compatible.");
    done++;$("progress").value=done;
    $("progress").setAttribute("aria-valuetext",done+" de "+total+" fragmentos transmitidos");
    await new Promise(resolve=>setTimeout(resolve,75));
   }
   log("Transmitidos "+done+"/"+total+" fragmentos. Verificar físicamente impresión y alineación.");
  }catch(err){
   log("ERROR: "+err.message+"; enviados "+done+"/"+total+". No reintentar sin revisar la impresora.");
  }finally{
   busy=false;$("confirm-paper").checked=false;update();
  }
 });
 $("copy").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText($("log").textContent);}
  catch(err){log("No se pudo copiar el diagnóstico: "+err.message);}
 });
 $("clear").addEventListener("click",()=>{$("log").textContent="";});
 for(const id of ["name","grams","packed","expiry"])
  for(const evt of ["input","change"])$(id).addEventListener(evt,refresh);
 $("confirm-paper").addEventListener("change",update);
 const now=new Date();$("packed").value=now.getFullYear()+"-"+
  String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
 if(!E){$("design-status").textContent="No se ha cargado el motor de ingredientes.";return;}
 log("Módulo aislado de Conserva: solo ingredientes 30 × 20. Impresión no crea inventario.");
 update();void refresh();
})();
