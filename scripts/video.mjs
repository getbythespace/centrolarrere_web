import puppeteer from "puppeteer-core";
const B="http://localhost:4000";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--autoplay-policy=no-user-gesture-required"]});
let pass=0,fail=0; const ck=(n,ok,d="")=>{console.log(`  ${ok?"PASS":"FAIL"}  ${n}${d?" — "+d:""}`);ok?pass++:fail++;};

for (const [w,h,tag,esperado] of [[390,844,"movil","-movil.mp4"],[1440,900,"desktop",".mp4"]]) {
  console.log(`\n═══ ${tag} (${w}px) ═══`);
  const p=await b.newPage();
  await p.setViewport({width:w,height:h,isMobile:w<500,hasTouch:w<500});
  const pedidos=[];
  p.on("response", r=>{ const u=r.url(); if(/\.(mp4|webm)$/.test(u)) pedidos.push({u:u.replace(B,""),s:r.status(),bytes:Number(r.headers()["content-length"]||0)}); });
  await p.goto(B+"/",{waitUntil:"networkidle2"});
  await new Promise(x=>setTimeout(x,5000));

  const v = await p.evaluate(()=>{
    const el=document.querySelector("video"); if(!el) return null;
    return { src: el.currentSrc.replace(location.origin,""), preload: el.preload,
             ancho: el.videoWidth, alto: el.videoHeight,
             reproduciendo: !el.paused && el.readyState>=3, ready: el.readyState,
             fuentes: [...el.querySelectorAll("source")].map(s=>`${s.getAttribute("media")||"—"} ${s.src.replace(location.origin,"")}`) };
  });
  ck("el video está en la página", Boolean(v));
  if (v) {
    ck(`sirve el archivo correcto`, v.src.endsWith(esperado), v.src);
    ck("resolución esperada", tag==="movil" ? v.ancho===480 : v.ancho===720, `${v.ancho}x${v.alto}`);
    ck("preload es metadata, no auto", v.preload==="metadata", v.preload);
    ck("está reproduciendo", v.reproduciendo, `readyState=${v.ready}`);
    ck("no se ofrece WebM", !v.fuentes.some(f=>/webm/.test(f)), v.fuentes.join(" | "));
  }
  // La portada tiene DOS videos distintos: el del hero y el del cierre. Lo que
  // se comprueba es que ninguno venga en el tamaño equivocado, y que el de
  // abajo —fuera de pantalla— no se descargue sin que nadie lo haya visto.
  const bajados = pedidos.filter(x=>x.s<400).map(x=>x.u);
  const equivocado = tag==="movil"
    ? bajados.filter(u=>!u.includes("-movil"))
    : bajados.filter(u=>u.includes("-movil"));
  ck("ningún video en el tamaño equivocado", equivocado.length===0, equivocado.join(" ")||"ninguno");
  ck("sólo se descarga el video visible", bajados.length===1,
     `${bajados.length}: ${bajados.join(" ")}`);
  const kb = pedidos.filter(x=>x.s<400).reduce((a,x)=>a+x.bytes,0)/1024;
  console.log(`         video descargado: ${kb.toFixed(0)} KB`);
  await p.close();
}
await b.close();
console.log(`\n  ${pass} passed, ${fail} failed`);
process.exitCode=fail?1:0;
