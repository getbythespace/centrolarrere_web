# Imágenes del sitio — dónde va cada cosa

Todo lo que está acá se sirve desde la raíz del sitio: un archivo en
`public/hero/piel-hombro.jpg` se accede como `/hero/piel-hombro.jpg`.

**Para reemplazar una imagen: deja el mismo nombre de archivo.** Si conservas el
nombre no hay que tocar código; si lo cambias, hay que actualizar la referencia.

---

## La regla que no se rompe

Hay dos tipos de imagen en este sitio y **no se mezclan**:

| Tipo | ¿Sirve foto de stock? | Por qué |
|---|---|---|
| Ambiente, textura, ilustración de tratamiento | **Sí** | Es contexto visual, no afirma nada sobre un paciente. |
| **Antes/después y retratos del equipo** | **NO. Nunca.** | Una foto de stock en un antes/después es un resultado clínico falso. Un rostro de stock como «nuestra enfermera» es una identidad falsa. |

Las carpetas `casos/` y `equipo/` sólo aceptan material propio.

---

## `hero/` — imagen principal

| Archivo | Estado | Qué debería ser |
|---|---|---|
| `piel-hombro.jpg` | **Stock temporal** (Unsplash) | Ideal: foto propia de la clínica o un detalle de piel real. Vertical, 1600×2400 o más. |

Formato: JPG o WebP. El sitio la convierte sola a AVIF/WebP y genera los tamaños.

---

## `casos/` — antes y después ⚠️

**Vacía a propósito.** Acá va el corazón del sitio y sólo puede ser material real.

Nombra los archivos así, para que se emparejen solos:

```
casos/rosacea-01-antes.jpg
casos/rosacea-01-despues.jpg
casos/acne-01-antes.jpg
casos/acne-01-despues.jpg
casos/telangiectasia-01-antes.jpg   ...y así
```

Los IDs disponibles hoy están en `lib/cases.ts`: `rosacea-01`, `acne-01`,
`telangiectasia-01`, `capilar-01`, `manos-01`, `onicomicosis-01`.

**Para que un par sirva hacen falta tres cosas:**

1. **Consentimiento informado firmado** del paciente para uso de imagen.
2. **Condiciones idénticas** entre las dos tomas: misma luz, mismo ángulo, misma
   distancia, mismo encuadre, sin maquillaje y sin filtro. Si el «después» está
   mejor iluminado, la comparación no vale y se nota.
3. **Los datos reales**: número de sesiones, tiempo transcurrido y fototipo.
   Van en `lib/cases.ts`, donde hoy dicen `[REEMPLAZAR]`.

Truco para el punto 2: marca en el piso dónde se para la persona y anota la
altura del trípode. Repite exactamente eso en cada control.

---

## `equipo/` — retratos ⚠️

**Vacía a propósito.** Sólo fotos reales del equipo.

```
equipo/cosmetologas.jpg
equipo/belen-munoz.jpg
equipo/dr-mero.jpg
```

Vertical, 4:5, mínimo 800×1000. Fondo neutro y consistente entre las tres.

---

## `tratamientos/` — apoyo visual del catálogo

| Archivo | Estado |
|---|---|
| `piel-pigmentacion.jpg` | Stock temporal (Unsplash) |
| `textura-crema.jpg` | Stock temporal (Unsplash) |

Acá el stock es válido: ilustra el tema, no afirma un resultado. Aun así, foto
propia siempre convierte mejor.

---

## `clinica/` — espacio y ambiente

| Archivo | Estado |
|---|---|
| `textura-piedra.jpg` | Stock temporal (Unsplash) |

**Lo más rentable que puedes subir acá son fotos reales del box de atención, el
equipo láser y la recepción.** Para una clínica, ver el lugar donde te van a
atender vale más que cualquier foto de stock: es lo que responde la pregunta de
«¿esto es serio?».

---

## `og/` — imagen para redes

**Vacía.** Va la imagen que aparece al compartir el enlace en WhatsApp,
Instagram o Facebook.

```
og/portada.jpg     1200×630 exactos
```

Debe llevar el nombre LARRÈRE legible, porque se ve en miniatura.

---

## `marca/` — logo

**Vacía.** Si tienes logo en vector, ponlo acá como `marca/logo.svg`. Hoy el
sitio usa el nombre en tipografía, que funciona, pero un logo propio es mejor.

---

## Sobre las imágenes de stock que están ahora

Son de [Unsplash](https://unsplash.com/license): libres para uso comercial y sin
atribución obligatoria. Están como andamio para que el sitio no se vea vacío
mientras juntas el material propio. **Todas deberían salir.**

Formatos que acepta: `.jpg`, `.png`, `.webp`, `.avif`. No hace falta que
optimices nada: Next.js genera AVIF y WebP en varios tamaños al construir.
Sube el archivo más grande que tengas.
