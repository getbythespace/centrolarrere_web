import Script from "next/script";
import { GA4_ID, GTM_ID, META_PIXEL_ID, hasGA4, hasGTM, hasMetaPixel } from "@/lib/analytics";

/**
 * Etiquetas de medición.
 *
 * Todas con `strategy="afterInteractive"`: se cargan después de que la página
 * es usable, así el pixel no compite con el render por el hilo principal. El
 * tráfico viene de anuncios en celular y el LCP es lo que decide si el clic
 * pagado se convierte o se pierde.
 *
 * Si el ID no está en el entorno, no se emite nada.
 */
export default function Analytics() {
  return (
    <>
      {hasMetaPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {hasGTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {/* GA4 directo. Sólo si NO hay GTM: si están los dos, GA4 se configura
          desde GTM y cargar gtag.js aparte duplica los pageviews. */}
      {hasGA4 && !hasGTM && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}

/** El <noscript> de GTM va pegado a la apertura de <body>. */
export function GTMNoScript() {
  if (!hasGTM) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
