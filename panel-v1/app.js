"use strict";
/* Panel V1 · Chrome Android · CT230B. No servidor, sin Airtable,
 * sin telemetría, y sin reintentos automáticos. */
(()=>{
 const $=id=>document.getElementById(id);
 const engine=window.PanelEngine;
 if(!engine)throw Error("No se cargó el motor aprobado del panel.");
 const SERVICE="49535343-fe7d-4ae5-8fa9-9fafd205e455";
 const WRITABLE="49535343-8841-43f4-a8d4-ecbe34729bb3";
 const NOTIFY="49535343-1e4d-4bd9-ba61-23c647249616";
 const overlay=$("p1-overlay"),dialog=$("p1-dialog"),close=$("p1-close"),
       opened=$("p1-open"),format=$("p1-format"),packed=$("p1-packed"),
       expiry=$("p1-expiry"),copies=$("p1-copies"),connect=$("p1-connect"),
       disconnect=$("p1-disconnect"),print=$("p1-print"),preview=$("p1-preview"),
       status=$("p1-status"),error=$("p1-error"),metrics=$("p1-metrics"),
       logElement=$("p1-log");
 let origin=null,device=null,writeChannel=null,notifyChannel=null,busy=false,ready=false;
 let portions=6;
 function log(message){
  logElement.textContent+="["+new Date().toLocaleTimeString("es-ES")+"] "+message+"\n";
  logElement.scrollTop=logElement.scrollHeight;
 }
 function showError(message){
  error.hidden=!message;error.textContent=message||"";
  if(message)log("AVISO: "+message);
 }
 function connected(){return !!(device&&device.gatt&&device.gatt.connected&&writeChannel);}
 function copiesValue(){
  const n=Number(copies.value);
  if(copies.value.trim()===""||!Number.isInteger(n)||n<1||n>20)
   throw Error("El número de etiquetas debe ser un entero entre 1 y 20.");
  return n;
 }
 function dataForPrint(required=true){
  const dates=engine.dates(packed.value,expiry.value,required);
  const count=copiesValue();
  if(!Object.hasOwn(engine.formats,format.value))throw Error("Formato desconocido.");
  return {dates,count};
 }
 function update(){
  const online=connected();
  const label=busy?(online?"Enviando o preparando…":"Conectando…"):(online?"CLABEL CT230B conectada":"Impresora desconectada");
  status.textContent=label;
  $("p1-state-dot").classList.toggle("is-connected",online);
  connect.disabled=busy||online;
  disconnect.disabled=busy||!online;
  let valid=false;
  try{dataForPrint(true);valid=true;}catch(_){}
  print.disabled=busy||!ready||!online||!valid;
  const n=Number(copies.value)||1;
  print.textContent="Imprimir "+(n===1?"1 etiqueta":n+" etiquetas");
 }
 function refreshPreview(){
  if(!ready)return;
  try{
   const dates=engine.dates(packed.value,expiry.value,false);
   const art=engine.preview(format.value,dates);
   preview.width=art.width;preview.height=art.height;
   preview.className="p1-preview"+(format.value==="horizontal"?" p1-horizontal":format.value==="component"?" p1-component":"");
   preview.getContext("2d").drawImage(art,0,0);
   const n=Number(copies.value)||1;
   metrics.textContent=engine.formats[format.value].label+
    " · Pisto · "+n+" "+(n===1?"etiqueta":"etiquetas")+
    " · envasado "+dates.packed+" · consumo "+dates.expiry;
   if(!error.hidden)showError("");
  }catch(e){
   metrics.textContent="Error de vista previa: "+e.message;
   showError(e.message);
  }finally{update();}
 }
 function openDialog(){
  origin=document.activeElement;
  overlay.hidden=false;document.body.classList.add("p1-modal-open");
  close.focus();refreshPreview();update();
 }
 function dismiss(){
  if(busy){log("No se cierra el panel durante la transmisión.");return;}
  overlay.hidden=true;document.body.classList.remove("p1-modal-open");
  origin?.focus();
 }
 opened.addEventListener("click",openDialog);
 close.addEventListener("click",dismiss);
 overlay.addEventListener("click",event=>{if(event.target===overlay)dismiss();});
 document.addEventListener("keydown",event=>{
  if(overlay.hidden)return;
  if(event.key==="Escape"){event.preventDefault();dismiss();return;}
  if(event.key!=="Tab")return;
  const focusable=[...dialog.querySelectorAll("button:not([disabled]),a[href],select:not([disabled]),input:not([disabled])")]
   .filter(el=>el.getClientRects().length);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 for(const input of [format,packed,expiry,copies]){
  input.addEventListener("input",refreshPreview);
  input.addEventListener("change",refreshPreview);
 }
 function renderPortions(){
  $("p1-portions").textContent=String(portions);
  document.querySelectorAll("[data-p1-base]").forEach(element=>{
   const base=Number(element.dataset.p1Base),amount=base*portions/6;
   element.textContent=new Intl.NumberFormat("es-ES",{maximumFractionDigits:2}).format(amount)+
    " "+element.dataset.p1Unit;
  });
 }
 $("p1-minus").addEventListener("click",()=>{portions=Math.max(1,portions-1);renderPortions();});
 $("p1-plus").addEventListener("click",()=>{portions=Math.min(100,portions+1);renderPortions();});
 function clearConnection(){
  writeChannel=null;notifyChannel=null;update();
 }
 function disconnected(){
  log("Impresora desconectada.");clearConnection();
 }
 function notification(event){
  const value=event.target.value;
  const bytes=new Uint8Array(value.buffer,value.byteOffset,value.byteLength);
  log("Notificación CLABEL ["+bytes.length+" B]: "+Array.from(bytes).map(x=>x.toString(16).padStart(2,"0")).join(" "));
 }
 connect.addEventListener("click",async()=>{
  if(busy||connected())return;
  if(!navigator.bluetooth){showError("Web Bluetooth no disponible. Abre esta página por HTTPS en Chrome Android.");return;}
  busy=true;showError("");update();log("Solicitando dispositivo CT230B mediante Web Bluetooth…");
  try{
   device=await navigator.bluetooth.requestDevice({filters:[{namePrefix:"CT230B"}],optionalServices:[SERVICE]});
   device.addEventListener("gattserverdisconnected",disconnected);
   log("CT230B seleccionada. Solicitando conexión GATT…");
   const server=await device.gatt.connect(),service=await server.getPrimaryService(SERVICE);
   const channel=await service.getCharacteristic(WRITABLE);
   if(!channel.properties.write&&!channel.properties.writeWithoutResponse)
    throw Error("Característica BLE sin permiso WRITE.");
   writeChannel=channel;
   log("UART conectado; WRITE="+Boolean(channel.properties.write)+
       "; WRITE_NO_RESPONSE="+Boolean(channel.properties.writeWithoutResponse));
   try{
    notifyChannel=await service.getCharacteristic(NOTIFY);
    notifyChannel.addEventListener("characteristicvaluechanged",notification);
    await notifyChannel.startNotifications();
    log("Notificaciones habilitadas.");
   }catch(e){log("Notificaciones no disponibles: "+e.message);}
   log("Impresora conectada. No se ha enviado ningún comando de impresión.");
  }catch(e){
   log("ERROR DE CONEXIÓN: "+e.name+": "+e.message);
   try{if(device?.gatt?.connected)device.gatt.disconnect();}catch(_){}
   clearConnection();showError("No ha sido posible conectar la CLABEL.");
  }finally{busy=false;update();}
 });
 disconnect.addEventListener("click",()=>{
  if(busy)return;
  try{if(device?.gatt?.connected)device.gatt.disconnect();}catch(e){log("Desconexión: "+e.message);}
  clearConnection();log("Desconexión solicitada.");
 });
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function transmit(bytes,label){
  // Contrato físico original: 20 bytes/fragmento, 75 ms entre escrituras,
  // preferir WRITE con respuesta, sin reintentos ni canales alternativos.
  const chunkSize=20,total=Math.ceil(bytes.length/chunkSize);
  log("Iniciando "+label+": "+bytes.length+" bytes, "+total+" fragmentos BLE.");
  for(let start=0;start<bytes.length;start+=chunkSize){
   if(!connected())throw Error("Conexión BLE perdida durante el transporte.");
   const chunk=bytes.slice(start,start+chunkSize);
   if(writeChannel.properties.write&&typeof writeChannel.writeValueWithResponse==="function")
    await writeChannel.writeValueWithResponse(chunk);
   else if(writeChannel.properties.writeWithoutResponse&&
           typeof writeChannel.writeValueWithoutResponse==="function")
    await writeChannel.writeValueWithoutResponse(chunk);
   else throw Error("No hay método WRITE compatible.");
   await pause(75);
   const completed=Math.min(total,Math.ceil((start+chunk.length)/chunkSize));
   if(completed%100===0||completed===total){
    status.textContent="Enviando "+completed+" / "+total+" fragmentos";
    if(completed===total)log("Envío de fragmentos BLE: "+completed+"/"+total+".");
   }
  }
  log("Datos de "+label+" enviados. El firmware debe procesar las copias; comprobar físicamente la salida y el QR.");
 }
 print.addEventListener("click",async()=>{
  if(busy||!ready||!connected())return;
  let job,dates,count;
  try{
   const data=dataForPrint(true);dates=data.dates;count=data.count;
   job=engine.build(format.value,dates,count);
  }catch(e){showError(e.message);return;}
  log("Trabajo preparado: "+job.format+" · "+count+" "+
     (count===1?"copia":"copias")+" · "+job.bytes+" bytes · "+
     job.fragments+" fragmentos · "+job.tiles+" bandas raster.");
  const text="¿Enviar UN trabajo BLE a la CLABEL para imprimir "+
   count+" "+(count===1?"etiqueta":"etiquetas")+" de Pisto ("+
   engine.formats[format.value].label+")?\n"+
   "Envasado: "+dates.packed+" · Consumo preferente: "+dates.expiry+
   "\nQR corto #r001 · PRINT 1,"+count+".\n"+
   "Sin reintentos. La multicopia todavía está pendiente de validación física.";
  if(!window.confirm(text)){log("Impresión cancelada antes del envío.");return;}
  busy=true;update();showError("");
  try{await transmit(job.job,"PANEL V1 "+job.format+" · PRINT 1,"+count);}
  catch(e){log("ERROR DE TRANSPORTE: "+e.name+": "+e.message+
   ". Puede existir impresión parcial; NO repetir automáticamente.");showError("Transmisión interrumpida: revisar impresora antes de repetir.");}
  finally{busy=false;update();}
 });
 $("p1-copy").addEventListener("click",async()=>{
  const data=logElement.textContent;
  try{
   if(!navigator.clipboard?.writeText)throw Error("API portapapeles no disponible");
   await navigator.clipboard.writeText(data);
   log("Registro copiado al portapapeles.");
  }catch(e){
   log("No se pudo copiar automáticamente: "+e.message+"; seleccionar texto del registro.");
  }
 });
 $("p1-clear").addEventListener("click",()=>{
  if(busy){log("No se puede limpiar el registro mientras se está enviando.");return;}
  logElement.textContent="";
  log("Registro limpiado.");
 });
 async function initialize(){
  log("Panel V1 preparado: HTTPS="+Boolean(window.isSecureContext)+
      "; Web Bluetooth disponible="+Boolean(navigator.bluetooth)+".");
  log("Ficha real Pisto: 6 raciones de cocina; etiqueta siempre 1 ración, datos oficiales 164,35 kcal.");
  log("Diseños: V0.6.2 50×80 vertical, V0.7.3 50×80 horizontal, V0.9 50×30 componente.");
  log("QR de ensayo: "+engine.recipe.shortUrl+"; resolvedor aún no publicado. Multicopia PRINT 1,N pendiente de validación.");
  try{
   await engine.loadIdentity();
   ready=true;
   refreshPreview();
   log("Fuentes oficiales e isotipo BN cargados. Vista previa generada; imprimir requiere fecha y conexión GATT.");
  }catch(e){
   ready=false;showError("No se puede preparar la impresión: "+e.message);
   metrics.textContent="Error al cargar fuentes o isotipo BN.";
  }finally{update();}
 }
 update();
 void initialize();
})();
