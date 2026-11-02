const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
function fixture(fail){
 const requests=[],pending=[];
 const context=vm.createContext({window:{},TextEncoder,Uint8Array,
 document:{fonts:{load:(font,sample)=>{requests.push({font,sample});return new Promise(resolve=>pending.push(()=>resolve(fail===font?[]:[{status:'loaded'}])));}}},
 Image:class{async decode(){}}});
 vm.runInContext(fs.readFileSync(__dirname+'/../panel-v1/engine.js','utf8'),context);
 vm.runInContext('v7GetVisibleLogo=()=>({})',context);
 return {requests,pending,load:()=>context.window.PanelEngine.loadIdentity()};
}
test('waits for regular, semibold and italic faces before enabling printing',async()=>{
 const f=fixture();let done=false;const promise=f.load().then(()=>done=true);
 assert.equal(f.requests.length,6);
 for(const font of ['400 20px "Geist"','600 37px "Bricolage Grotesque"','italic 500 20px "Geist"'])assert.ok(f.requests.some(r=>r.font===font));
 assert.ok(f.requests.every(r=>r.sample.includes('--/--/--')&&r.sample.includes('Envasado y congelación')));
 for(const resolve of f.pending.slice(0,-1))resolve();await Promise.resolve();assert.equal(done,false);
 f.pending.at(-1)();await promise;assert.equal(done,true);
});
test('a missing regular date-label face blocks printing',async()=>{
 const f=fixture('400 20px "Geist"');const p=f.load();f.pending.forEach(r=>r());
 await assert.rejects(p,/fuentes oficiales/);
});
