# MiguelMarketer - Next.js App Router

Sitio personal orientado a lead generation ejecutivo para posiciones de Marketing Director / Head of Marketing / CMO.

## Stack

- Next.js 13 (App Router)
- TypeScript
- Formularios config-driven
- API routes con Resend

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=Web Miguel <contacto@miguelmarketer.com>
CONTACT_TO_EMAIL=miguelgonzalezcruz@icloud.com
```

## Contenido (single source of truth)

Todo el contenido principal está en:

- `content/siteData.ts`

### Cómo actualizar KPIs

Editar:

- `siteData.kpisHome` (barra de prueba en Home)
- `siteData.kpisAll` (listado completo en `/prueba`)

Importante: en KPIs y casos no incluir nombres de empresa.

### Cómo actualizar casos

Editar:

- `siteData.caseStudies`

Cada caso usa `slug` para generar la ruta `/casos/[slug]`.

### Cómo actualizar experiencia

Editar:

- `siteData.experience`

Aquí sí pueden aparecer nombres de empresa.

### Cómo actualizar PDF del lead magnet

1. Sube el PDF final en:
   - `public/resources/perfil-ejecutivo.pdf`
2. Verifica URL en:
   - `siteData.resources.leadMagnet.downloadUrl`

### Cómo actualizar formularios

Esquemas en:

- `formSchemas` dentro de `content/siteData.ts`

El renderer está en:

- `src/components/forms/SchemaForm.tsx`

La estructura está preparada para evolucionar a multi-step sin refactor de datos.

## Endpoints

- `POST /api/lead`
  - contacto principal y waitlist
  - validación + honeypot + rate limit por IP
- `POST /api/pdf-gate`
  - gate de descarga PDF
  - validación + honeypot + rate limit por IP

## Tracking (vendor-agnostic)

Wrapper en:

- `src/lib/tracking.ts`

Eventos implementados:

- `cta_click`
- `form_submit`
- `case_open`
- `resource_open`

En desarrollo hace `console.log`; se puede sustituir por GA4, Segment, etc.

## SEO

- Metadata única por página
- Canonical + OG
- JSON-LD global (Person + WebSite)
- JSON-LD Breadcrumb por ruta
- JSON-LD CreativeWork en detalle de casos
