import puppeteer from "puppeteer-core";
const B = "http://localhost:4000";
const b = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars"]});
let pass=0,fail=0; const ck=(n,ok,d="")=>{console.log(`  ${ok?"PASS":"FAIL"}  ${n}${d?" — "+d:""}`);ok?pass++:fail++;};

console.log("[1] Las cinco páginas del export estático");
for (const r of ["/","/servicios","/equipo","/contacto","/agendar"]) {
  const p = await b.newPage(); await p.setViewport({width:1440,height:900});
  const rotas = [];
  p.on("response", x => { if (x.request().resourceType()==="image" && x.status()>=400) rotas.push(x.url()); });
  const res = await p.goto(B+r,{waitUntil:"networkidle2"});
  // Hay que recorrer la página antes de mirar: casi todas las imágenes van con
  // carga diferida y sin scroll ninguna se ha pedido todavía.
  const alto = await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0; y<alto; y+=500) { await p.evaluate(v=>window.scrollTo(0,v), y); await new Promise(x=>setTimeout(x,100)); }
  await new Promise(x=>setTimeout(x,1800));
  const d = await p.evaluate(()=>({
    h1: document.querySelectorAll("h1").length,
    err: /Application error|client-side exception/i.test(document.body.innerText),
    imgs: [...document.querySelectorAll("img")].filter(i=>!i.complete||i.naturalWidth===0).length,
    nav: document.querySelectorAll(".v2-pill a").length,
    pie: document.querySelectorAll("footer").length,
  }));
  ck(`${r} carga sin errores`, res.status()===200 && d.h1===1 && !d.err && d.pie===1,
     `${res.status()} h1=${d.h1} pie=${d.pie}${d.err?" ERROR DE CLIENTE":""}`);
  ck(`${r} imágenes sin errores`, rotas.length===0 && d.imgs===0,
     rotas.length?`${rotas.length} con 404`:(d.imgs?`${d.imgs} sin cargar`:"todas"));
  await p.close();
}

console.log("\n[2] El mes se corrige en el navegador");
const p = await b.newPage(); await p.setViewport({width:1440,height:900});
await p.goto(B+"/",{waitUntil:"domcontentloaded"});
const html = await p.content();
const enHtml = (html.match(/durante (\w+)/)||[])[1];
await new Promise(x=>setTimeout(x,2500));
const enPantalla = await p.evaluate(()=>(document.body.innerText.match(/durante (\w+)/i)||[])[1]);
const M=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const real = M[new Date(new Date().toLocaleString("en-US",{timeZone:"America/Santiago"})).getMonth()];
ck("el HTML trae un mes (lo que ven los buscadores)", Boolean(enHtml), enHtml);
ck("en pantalla se ve el mes real", (enPantalla||"").toLowerCase()===real, `${enPantalla} vs ${real}`);

console.log("\n[3] El cuestionario funciona sin servidor");
await p.goto(B+"/agendar",{waitUntil:"networkidle2"});
await p.waitForSelector(".v2-chip",{timeout:20000}); await new Promise(x=>setTimeout(x,600));
await p.evaluate(()=>[...document.querySelectorAll(".v2-chip")].find(x=>/Acné/.test(x.textContent)).click());
await new Promise(x=>setTimeout(x,300));
const msg = await p.evaluate(()=>({t:document.querySelector(".v2-preview__txt").textContent, h:document.querySelector(".v2-consulta__cta").href}));
ck("el mensaje recoge la respuesta", /acné/i.test(msg.t), msg.t);
ck("el enlace lleva a wa.me con el texto", msg.h.includes("wa.me") && decodeURIComponent(msg.h).includes("acné"));

console.log("\n[4] Navegación entre páginas");
await p.goto(B+"/",{waitUntil:"networkidle2"}); await new Promise(x=>setTimeout(x,900));
await p.evaluate(()=>document.querySelector('.v2-pill a[href="/servicios"]').click());
await new Promise(x=>setTimeout(x,1800));
ck("el menú navega", p.url().includes("/servicios"), p.url().replace(B,""));
await p.close(); await b.close();
console.log(`\n  ${pass} passed, ${fail} failed`);
process.exitCode = fail?1:0;
