/**
 * Auditoría de contraste de toda la página.
 *
 * Recorre cada texto visible, calcula el fondo efectivo subiendo por los
 * ancestros hasta el primero opaco, y compara contra el mínimo de WCAG AA que
 * corresponda al tamaño y peso de ese texto.
 *
 * Existe porque el ojo no sirve para esto: el texto secundario del sitio estuvo
 * en `opacity: 0.55` durante semanas, que sobre fondo oscuro da 4.46:1 —bajo el
 * mínimo— y sobre beige se desploma a 2.69:1. Ninguna de las dos cosas se ve
 * mal a simple vista.
 *
 *   npm run contraste                      → todas las páginas de la v2
 *   npm run contraste -- http://.../v2     → una sola
 */
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const RUTAS = process.argv[2]
  ? [process.argv[2]]
  : [
      "http://localhost:3001/v2",
      "http://localhost:3001/v2/servicios",
      "http://localhost:3001/v2/equipo",
      "http://localhost:3001/v2/contacto",
      "http://localhost:3001/v2/agendar",
    ];

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let totalFallos = 0;

for (const url of RUTAS) {
  console.log(`\n═══ ${url.replace("http://localhost:3001", "")} ═══`);

  for (const [w, h, tag] of [
    [1440, 900, "desktop"],
    [390, 844, "movil"],
  ]) {
    const p = await navegador.newPage();
    await p.setViewport({
      width: w,
      height: h,
      isMobile: w < 500,
      hasTouch: w < 500,
    });
    await p.goto(url, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1800));

    // Recorrer la página entera dispara las revelaciones al scroll; si no,
    // los bloques de abajo se miden en su estado inicial.
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(h * 0.8)) {
      await p.evaluate((v) => window.scrollTo(0, v), y);
      await new Promise((r) => setTimeout(r, 40));
    }
    await p.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    const res = await p.evaluate(() => {
      const lin = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
      const R = (a, b) => {
        const l1 = L(a);
        const l2 = L(b);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      };
      const rgb = (s) => {
        const m = s.match(/\d+(\.\d+)?/g);
        return m ? m.slice(0, 3).map(Number) : null;
      };
      const alfa = (s) => {
        const m = s.match(/[\d.]+/g);
        return m && m.length > 3 ? parseFloat(m[3]) : 1;
      };
      const mezcla = (f, b, a) => f.map((x, i) => x * a + b[i] * (1 - a));

      // Sube por los ancestros hasta el primer fondo opaco.
      const fondo = (el) => {
        let e = el;
        while (e && e !== document.documentElement) {
          const cs = getComputedStyle(e);
          const c = rgb(cs.backgroundColor);
          const a = alfa(cs.backgroundColor);
          if (c && a >= 0.999) return c;
          e = e.parentElement;
        }
        return [46, 40, 34];
      };

      const malos = [];
      let medidos = 0;
      let peor = 99;

      for (const el of document.querySelectorAll(
        "p,span,a,h1,h2,h3,h4,li,button,strong,b,em,td,th,legend"
      )) {
        // Sólo elementos con texto propio, para no contar dos veces.
        if (
          el.children.length &&
          el.textContent.trim() ===
            [...el.children].map((c) => c.textContent).join("").trim()
        )
          continue;
        const t = el.textContent.trim();
        if (!t || t.length < 2) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const op = parseFloat(cs.opacity);
        if (op < 0.05) continue;

        const bg = fondo(el);
        let fg = rgb(cs.color);
        if (!fg) continue;
        if (op < 1) fg = mezcla(fg, bg, op);

        const ratio = R(fg, bg);
        medidos++;
        if (ratio < peor) peor = ratio;

        const px = parseFloat(cs.fontSize);
        const bold = parseInt(cs.fontWeight) >= 700;
        const grande = px >= 24 || (px >= 18.66 && bold);
        const min = grande ? 3 : 4.5;

        if (ratio < min) {
          malos.push({
            t: t.slice(0, 36),
            ratio: +ratio.toFixed(2),
            min,
            px: Math.round(px),
            fg: cs.color,
            bg: `rgb(${bg.map(Math.round).join(",")})`,
            cls: (el.className || "").toString().slice(0, 36),
          });
        }
      }
      return { malos, medidos, peor: +peor.toFixed(2) };
    });

    const marca = res.malos.length ? "FALLA" : "ok   ";
    console.log(
      `  ${marca} ${tag.padEnd(8)} ${String(res.medidos).padStart(3)} textos · peor ${res.peor}:1`
    );
    for (const m of res.malos.slice(0, 8)) {
      console.log(
        `        ${String(m.ratio).padStart(5)}:1 (min ${m.min}) ${m.px}px «${m.t}»  ${m.fg} sobre ${m.bg}  .${m.cls}`
      );
    }
    totalFallos += res.malos.length;
    await p.close();
  }
}

await navegador.close();
console.log(
  totalFallos
    ? `\n  ${totalFallos} pares bajo AA`
    : "\n  todo cumple AA en desktop y móvil"
);
process.exitCode = totalFallos ? 1 : 0;
