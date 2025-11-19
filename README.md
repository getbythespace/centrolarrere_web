# LARRÈRE - Centro de Salud y Estética

Sitio web profesional con diseño premium para centro especializado en tratamientos láser y estética médica.

## 🚀 Tecnologías

- **Framework:** Next.js 15.5.4
- **UI:** React 18.3.1, Tailwind CSS
- **Animaciones:** Framer Motion
- **Base de datos:** Supabase (PostgreSQL)
- **Lenguaje:** TypeScript
- **Deploy:** Vercel / Digital Ocean


## ✨ Características

- 🎨 Diseño premium con animaciones fluidas
- 📱 Responsive (móvil, tablet, desktop)
- ⚡ Optimizado para rendimiento
- ♿ Accesible WCAG AA
- 🗓️ Integración con Google Calendar
- 🔍 SEO optimizado

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/larrere.git
cd larrere

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🔐 Variables de Entorno

Crea `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```


## 📝 Scripts

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build para producción
npm start        # Ejecutar build
npm run lint     # Verificar código
```

## 📂 Estructura

```
larrere/
├── app/              # Páginas (App Router)
├── components/       # Componentes reutilizables
├── lib/             # Utilidades y configuración
├── hooks/           # Custom hooks
└── supabase/        # Esquemas de base de datos
```

## 🚀 Deploy en Digital Ocean

### Opción 1: App Platform

1. Conecta tu repo de GitHub
2. Configura las variables de entorno
3. Deploy automático

### Opción 2: Droplet con PM2

```bash
# En tu droplet
git clone https://github.com/tu-usuario/larrere.git
cd larrere
npm install
npm run build

# Instalar PM2
npm install -g pm2

# Iniciar app
pm2 start npm --name "larrere" -- start
pm2 save
pm2 startup
```

## 📞 Contacto

- Email: larreresaludyestetica@gmail.com
- Teléfono: +56 9 4844 6255
- Horario: Lun-Sáb 11:00-19:00

## 📄 Licencia

© 2024 LARRÈRE. Todos los derechos reservados.
