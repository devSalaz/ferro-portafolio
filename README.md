# David Ferro — Portafolio

## Desarrollo

pnpm install
pnpm run dev

## Generar el sitio para producción

pnpm run build:clean

Este comando limpia las cachés y genera el sitio. Al terminar, la terminal
lista todas las rutas generadas: verificar que estén el home, el about y
todos los works.

Si solo se necesita generar sin limpiar:

pnpm run generate

Y para limpiar por separado:

pnpm run clean

## Probar el resultado antes de subirlo

npx serve .output/public

Abrir cada página y recargar directamente sobre un work
(por ejemplo /works/kevin-fonseca) para confirmar que el HTML se generó bien.

## Subir al hosting

Se sube **únicamente el contenido de la carpeta `public`** que está dentro
de `.output`. No se sube `.output` completa: solo lo que hay dentro de
`.output/public`, que es el sitio listo en HTML, CSS y JS.

## Contenido

El contenido vive en `content/` como archivos Markdown:

- `content/index.md` — home
- `content/about.md` — about
- `content/works/*.md` — un archivo por proyecto

El nombre del archivo define la URL: `kevin-fonseca.md` → `/works/kevin-fonseca`.