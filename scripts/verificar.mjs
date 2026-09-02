import puppeteer from 'puppeteer-core';
const B='http://localhost:3000';
const V1=B; // la v1 ya no existe: quedó en la rama archivo/v1-estetica-anterior
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new',args:['--no-sandbox','--hide-scrollbars']});
let pass=0,fail=0;
const ck=(n,ok,d='')=>{console.log(`  ${ok?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`);ok?pass++:fail++;};
const RUTAS=['/','/servicios','/equipo','/contacto','/agendar'];

console.log('[1] Campaña: el mes se calcula solo');
const p=await b.newPage(); await p.setViewport({width:1440,height:900});
await p.goto(B+'/',{waitUntil:'networkidle2'}); await new Promise(r=>setTimeout(r,1200));
const t=await p.evaluate(()=>document.body.innerText);
const M=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const mes=M[new Date(new Date().toLocaleString('en-US',{timeZone:'America/Santiago'})).getMonth()];
ck(`dice «${mes}», no un mes escrito a mano`, new RegExp(mes,'i').test(t), t.match(/durante \w+/i)?.[0]||'');
ck('ya no dice agosto', mes==='agosto' || !/agosto/i.test(t));
await p.close();

console.log('\n[2] Agendar: precio tachado + gratis');
const q=await b.newPage(); await q.setViewport({width:1440,height:900});
await q.goto(B+'/agendar',{waitUntil:'networkidle2'}); await new Promise(r=>setTimeout(r,900));
const ag=await q.evaluate(()=>{
  const tachado=[...document.querySelectorAll('*')].find(e=>getComputedStyle(e).textDecorationLine.includes('line-through')&&/40\.000/.test(e.textContent));
  return {gratis:/Gratis/.test(document.body.innerText), tachado:!!tachado,
          txt:(document.body.innerText.match(/Gratis[^\n]*/)||[''])[0]};
});
ck('dice Gratis', ag.gratis, ag.txt);
ck('el precio normal va tachado', ag.tachado);
await q.close();

console.log('\n[3] Imagen al compartir');
for (const [base,ruta,nombre] of [[B,'/','portada'],[B,'/contacto','contacto']]) {
  const r=await b.newPage(); await r.goto(base+ruta,{waitUntil:'domcontentloaded'});
  const og=await r.evaluate(()=>document.querySelector('meta[property="og:image"]')?.content||null);
  ck(`og:image en ${nombre}`, Boolean(og), og||'ninguna');
  await r.close();
}

console.log('\n[4] Pie con legales en las cinco páginas de v2');
for (const ruta of RUTAS) {
  const r=await b.newPage(); await r.setViewport({width:1440,height:900});
  await r.goto(B+ruta,{waitUntil:'networkidle2'}); await new Promise(x=>setTimeout(x,700));
  const d=await r.evaluate(()=>({
    priv:document.querySelectorAll('a[href="/privacidad"]').length,
    term:document.querySelectorAll('a[href="/terminos"]').length,
    ig:document.querySelectorAll('a[href*="instagram.com"]').length,
    fb:document.querySelectorAll('a[href*="facebook.com"]').length,
    dir:/Dieciocho de Septiembre 246/.test(document.body.innerText),
    pie:document.querySelectorAll('footer').length,
    main:document.querySelectorAll('main#contenido').length,
  }));
  ck(`${ruta}: legales, redes y dirección`,
     d.priv>0&&d.term>0&&d.ig>0&&d.fb>0&&d.dir&&d.pie===1&&d.main===1,
     `priv ${d.priv} term ${d.term} ig ${d.ig} fb ${d.fb} dir ${d.dir} pie ${d.pie} main ${d.main}`);
  await r.close();
}

console.log('\n[5] WhatsApp siempre a mano en móvil');
const m=await b.newPage(); await m.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
await m.goto(B+'/',{waitUntil:'networkidle2'}); await new Promise(r=>setTimeout(r,1000));
const wa=await m.evaluate(()=>{
  const e=document.querySelector('.v2-pill__wa'); if(!e) return null;
  const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
  return {vis:cs.display!=='none', alto:Math.round(r.height), ancho:Math.round(r.width),
          abajo:r.top>innerHeight/2, href:e.href.includes('wa.me')};
});
ck('botón de WhatsApp visible abajo', wa&&wa.vis&&wa.abajo, wa?`${wa.ancho}×${wa.alto}`:'no existe');
ck('lleva a wa.me', wa&&wa.href);
await m.close();

console.log('\n[6] Cuestionario sin fricción');
const c=await b.newPage(); await c.setViewport({width:1440,height:900});
await c.goto(B+'/agendar',{waitUntil:'networkidle2'});
await c.waitForSelector('.v2-chip',{timeout:20000}); await new Promise(r=>setTimeout(r,600));
const base=await c.evaluate(()=>document.querySelector('.v2-preview__txt').textContent);
ck('funciona sin tocar nada', /Hola/.test(base), base);
await c.evaluate(()=>{const b=[...document.querySelectorAll('.v2-chip')];b.find(x=>/Acné/.test(x.textContent)).click();});
await new Promise(r=>setTimeout(r,300));
const con=await c.evaluate(()=>({
  txt:document.querySelector('.v2-preview__txt').textContent,
  href:document.querySelector('.v2-consulta__cta').href,
}));
ck('el mensaje recoge la respuesta', /acné/i.test(con.txt), con.txt);
ck('el enlace lleva el mensaje escrito', decodeURIComponent(con.href).includes('acné'));
await c.evaluate(()=>{const b=[...document.querySelectorAll('.v2-chip')];b.find(x=>/Acné/.test(x.textContent)).click();});
await new Promise(r=>setTimeout(r,300));
const des=await c.evaluate(()=>document.querySelector('.v2-preview__txt').textContent);
ck('se puede desmarcar', des===base);
const tac=await c.evaluate(()=>Math.min(...[...document.querySelectorAll('.v2-chip')].map(e=>e.getBoundingClientRect().height)));
ck('las opciones son tocables (≥44px)', tac>=44, `${Math.round(tac)}px`);
await c.close();

console.log('\n[7] El sistema de reservas ya no existe');
for (const r of ['/comprobante/x','/api/cron','/api/webhooks/calcom']) {
  const z=await b.newPage(); const resp=await z.goto(B+r,{waitUntil:'domcontentloaded'}).catch(()=>null);
  ck(`${r} responde 404`, resp && resp.status()===404, String(resp?.status()));
  await z.close();
}

await b.close();
console.log(`\n  ${pass} passed, ${fail} failed`);
process.exitCode=fail?1:0;
