"use strict";
/* Banco doméstico: precarga opcional de Pequeña. No altera motor, TSPL ni BLE. */
(function(){
 const $=id=>document.getElementById(id);
 const fields=["name","grams","mode","packed","expiry","note"];
 const modes={
  fridge:["refrigeracion","refrigeracion_dias","tips_refrigeracion"],
  freeze:["congelacion","congelacion_dias","tips_descongelacion"],
  pantry:["despensa","despensa_dias","tips_despensa"],
  preserve:["conserva","conserva_dias","tips_conserva"]
 };
 const accentFree=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("es").trim();
 let catalog=[],loaded=false,loading=null,selectedId=null,category="",subcategory="",active="free";
 let freeDraft=null,bankDraft=null,bankDraftItemId=null,manuallyEditedExpiry=false,lastAuto="",suppressExpiryInput=false,lastFocus=null;
 const currentFormat=()=>document.querySelector("[data-label-format]:checked")?.value==="ingredient";
 const currentItem=()=>catalog.find(x=>x.id===selectedId)||null;
 function readForm(){
  const draft=Object.fromEntries(fields.map(id=>[id,$(id).value]));
  draft.notesEnabled=$("notes-enabled").checked;
  draft.manuallyEditedExpiry=manuallyEditedExpiry;
  draft.lastAuto=lastAuto;
  return draft;
 }
 function repaint(){
  // El motor de Pequeña ya escucha el evento input y recalcula su vista previa.
  $("name").dispatchEvent(new Event("input",{bubbles:true}));
 }
 function writeForm(draft){
  if(!draft)return;
  for(const id of fields)if(Object.hasOwn(draft,id))$(id).value=draft[id];
  $("notes-enabled").checked=!!draft.notesEnabled;
  manuallyEditedExpiry=!!draft.manuallyEditedExpiry;
  lastAuto=draft.lastAuto||"";
  repaint();
 }
 function chips(){
  $("bank-free").classList.toggle("is-active",active==="free");
  $("bank-open").classList.toggle("is-active",active==="bank");
  $("bank-free").setAttribute("aria-pressed",String(active==="free"));
  $("bank-open").setAttribute("aria-pressed",String(active==="bank"));
 }
 function daysFor(item,mode){
  const cfg=modes[mode];
  if(!item||!cfg||item.estado_recomendacion==="sin_datos"||item[cfg[0]]!==true)return null;
  const n=item[cfg[1]];
  return Number.isInteger(n)&&n>0?n:null;
 }
 function tipFor(item,mode){
  const cfg=modes[mode];if(!item||!cfg||item[cfg[0]]!==true)return "";
  const tip=item[cfg[2]];
  return typeof tip==="string"&&tip.length<=32?tip:"";
 }
 function plusDays(iso,amount){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)||!Number.isInteger(amount)||amount<1)return "";
  const [year,month,day]=iso.split("-").map(Number);
  const d=new Date(Date.UTC(year,month-1,day+amount,12));
  if(!Number.isFinite(d.getTime())||d.getUTCFullYear()>9999)return "";
  // Excluir fechas de origen no válidas sin depender de cambios de hora locales.
  const check=new Date(Date.UTC(year,month-1,day,12));
  if(check.getUTCFullYear()!==year||check.getUTCMonth()!==month-1||check.getUTCDate()!==day)return "";
  return [d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,"0"),String(d.getUTCDate()).padStart(2,"0")].join("-");
 }
 function updateHint(){
  const item=active==="bank"?currentItem():null;
  const days=daysFor(item,$("mode").value);
  $("bank-time-tools").hidden=days===null;
  $("bank-time-hint").textContent=days===null?"":"Tiempo recomendado: "+days+" días";
  $("bank-reset-date").hidden=days===null||!manuallyEditedExpiry;
 }
 function setAutoDate(value){
  suppressExpiryInput=true;
  $("expiry").value=value;
  lastAuto=value;
  $("expiry").dispatchEvent(new Event("input",{bubbles:true}));
  suppressExpiryInput=false;
 }
 function suggestDate(){
  const days=daysFor(currentItem(),$("mode").value);
  if(active!=="bank"){updateHint();return;}
  if(!manuallyEditedExpiry){
   const proposed=days===null?"":plusDays($("packed").value,days);
   if(proposed!==$("expiry").value)setAutoDate(proposed);
   else lastAuto=proposed;
  }
  updateHint();
 }
 function useFree(){
  if(active==="bank"){bankDraft=readForm();bankDraftItemId=selectedId;}
  active="free";
  if(freeDraft)writeForm(freeDraft);
  manuallyEditedExpiry=!!(freeDraft&&freeDraft.manuallyEditedExpiry);
  lastAuto=freeDraft?.lastAuto||"";
  chips();updateHint();
 }
 async function loadCatalog(){
  if(loaded)return;
  if(!loading)loading=(async()=>{
   const response=await fetch("./banco/catalogo.json",{cache:"no-store"});
   if(!response.ok)throw Error("No se ha podido abrir el catálogo ("+response.status+").");
   const data=await response.json();
   if(!data||!Array.isArray(data.ingredientes))throw Error("El catálogo no contiene una lista de ingredientes.");
   catalog=data.ingredientes.filter(x=>x&&typeof x.id==="string"&&typeof x.nombre==="string");
   loaded=true;
  })().catch(error=>{loading=null;throw error;});
  return loading;
 }
 function categoryOptions(){
  const box=$("bank-categories");box.replaceChildren();
  const present=[...new Set(catalog.map(item=>item.categoria))];
  const all=["",...present];
  for(const cat of all){
   const btn=document.createElement("button");
   btn.type="button";btn.className="bank-category";btn.textContent=cat||"Todas";
   btn.setAttribute("aria-pressed",String(category===cat));
   btn.addEventListener("click",()=>{category=cat;subcategory="";renderFilters();renderResults();});
   box.append(btn);
  }
 }
 function subcategoryOptions(){
  const sel=$("bank-subcategory");
  const present=[...new Set(catalog.filter(x=>!category||x.categoria===category).map(x=>x.subcategoria))];
  sel.replaceChildren(new Option("Todas las subcategorías",""));
  for(const sub of present)sel.add(new Option(sub,sub));
  if(!present.includes(subcategory))subcategory="";
  sel.value=subcategory;
 }
 function renderFilters(){categoryOptions();subcategoryOptions();}
 function matches(item){
  if(category&&item.categoria!==category)return false;
  if(subcategory&&item.subcategoria!==subcategory)return false;
  const query=accentFree($("bank-search").value);
  return !query||[item.nombre,item.presentacion,...(item.sinonimos||[])].some(x=>accentFree(x).includes(query));
 }
 function renderResults(){
  const box=$("bank-results");box.replaceChildren();
  const items=catalog.filter(matches);
  $("bank-results-count").textContent=items.length+(items.length===1?" ingrediente":" ingredientes");
  for(const item of items){
   const button=document.createElement("button");
   button.type="button";button.className="bank-item";
   button.setAttribute("role","option");button.setAttribute("aria-selected",String(selectedId===item.id));
   const main=document.createElement("span");main.className="bank-item-body";
   const name=document.createElement("strong");name.className="bank-item-name";name.textContent=item.nombre;
   const meta=document.createElement("span");meta.className="bank-item-meta";
   meta.textContent=item.subcategoria+(item.presentacion?" · "+item.presentacion:"");
   main.append(name,meta);
   const mark=document.createElement("span");mark.className="bank-item-mark";mark.textContent=selectedId===item.id?"✓":"";
   button.append(main,mark);
   button.addEventListener("click",()=>{selectedId=item.id;renderResults();});
   box.append(button);
  }
  if(!items.length){
   const empty=document.createElement("p");empty.className="bank-empty";empty.textContent="No hay ingredientes con estos filtros.";
   box.append(empty);
  }
  $("bank-apply").disabled=!items.some(x=>x.id===selectedId);
 }
 function closeSheet(){
  if($("bank-overlay").hidden)return;
  $("bank-overlay").hidden=true;document.body.style.overflow="";
  if(lastFocus?.isConnected)lastFocus.focus();
 }
 async function openSheet(){
  if(!currentFormat())return;
  lastFocus=document.activeElement;
  $("bank-overlay").hidden=false;document.body.style.overflow="hidden";
  $("bank-apply").disabled=true;
  $("bank-results-count").textContent="Cargando ingredientes…";
  $("bank-results").replaceChildren();
  $("bank-close").focus();
  try{
   await loadCatalog();
   if($("bank-overlay").hidden)return;
   renderFilters();renderResults();
  }catch(error){
   $("bank-results-count").textContent="No se ha podido cargar el banco.";
   const p=document.createElement("p");p.className="bank-empty";p.textContent=error.message;
   $("bank-results").replaceChildren(p);
   $("bank-apply").disabled=true;
  }
 }
 function applySelected(){
  const item=currentItem();if(!item||!catalog.filter(matches).some(x=>x.id===item.id))return;
  if(active==="free"){
   freeDraft=readForm();
   if(bankDraft&&bankDraftItemId===item.id){
    active="bank";writeForm(bankDraft);chips();updateHint();closeSheet();
    $("print-step").open=false;$("data-step").open=true;return;
   }
  }
  active="bank";chips();
  // Cantidad y envasado nunca vienen del catálogo: conservar los que introdujo la usuaria.
  $("name").value=item.nombre;
  $("note").value=tipFor(item,$("mode").value);
  // Un dato sin plazo no borra una fecha manual que la usuaria ya escribió.
  manuallyEditedExpiry=daysFor(item,$("mode").value)===null&&!!$("expiry").value;
  lastAuto="";
  suggestDate();
  bankDraft=readForm();bankDraftItemId=item.id;
  closeSheet();
  $("print-step").open=false;$("data-step").open=true;
  repaint();
 }
 $("bank-open").addEventListener("click",()=>{void openSheet();});
 $("bank-free").addEventListener("click",()=>{closeSheet();useFree();});
 $("bank-close").addEventListener("click",closeSheet);
 $("bank-overlay").addEventListener("click",ev=>{if(ev.target===$("bank-overlay"))closeSheet();});
 $("bank-search").addEventListener("input",renderResults);
 $("bank-subcategory").addEventListener("change",()=>{subcategory=$("bank-subcategory").value;renderResults();});
 $("bank-apply").addEventListener("click",applySelected);
 $("bank-reset-date").addEventListener("click",()=>{
  if(active!=="bank")return;
  manuallyEditedExpiry=false;suggestDate();
  bankDraft=readForm();
 });
 $("expiry").addEventListener("input",()=>{
  if(active==="bank"&&!suppressExpiryInput){manuallyEditedExpiry=true;updateHint();}
 });
 $("packed").addEventListener("input",()=>{if(active==="bank")suggestDate();});
 $("packed").addEventListener("change",()=>{if(active==="bank")suggestDate();});
 $("mode").addEventListener("change",()=>{
  if(active!=="bank")return;
  const item=currentItem();
  $("note").value=tipFor(item,$("mode").value);
  suggestDate();repaint();
 });
 for(const input of document.querySelectorAll("[data-label-format]")){
  input.addEventListener("change",()=>{
   const small=currentFormat();
   $("ingredient-bank-controls").hidden=!small;
   if(!small)closeSheet();
  });
 }
 document.addEventListener("keydown",ev=>{
  if($("bank-overlay").hidden)return;
  if(ev.key==="Escape"){ev.preventDefault();closeSheet();return;}
  if(ev.key!=="Tab")return;
  const focusable=[...$("bank-sheet").querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled)")];
  if(!focusable.length)return;
  if(ev.shiftKey&&document.activeElement===focusable[0]){ev.preventDefault();focusable.at(-1).focus();}
  else if(!ev.shiftKey&&document.activeElement===focusable.at(-1)){ev.preventDefault();focusable[0].focus();}
 });
 chips();updateHint();
})();
