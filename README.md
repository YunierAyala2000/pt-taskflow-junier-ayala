# TaskFlow

Aplicación de gestión de tareas construida con **Next.js 16**, **React 19** y **Tailwind CSS 4**.

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) instalado globalmente

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <https://github.com/YunierAyala2000/pt-taskflow-junier-ayala.git>
cd pt-taskflow-junier-ayala
```

## Correr el proyecto

### Modo desarrollo

```bash
pnpm dev
```

El comando pnpm dev Instala las depencias y modulos y corre el proyecto
El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

### Compilar para producción

```bash
pnpm build
```

### Iniciar en modo producción

```bash
pnpm start
```

### Formateadores Linter y Prettier

Estos se definieron para que todo el codigo tanga la misma estructura.
con este comando se formatean todos los archivos

```bash
pnpm lint
```

## Estructura del proyecto

```
pt-taskflow-junier-ayala/
├── app/                        # App Router de Next.js
│   ├── globals.css             # Estilos globales con Tailwind
│   ├── layout.tsx              # Layout raíz de la aplicación
│   └── page.tsx                # Página principal
│
├── components/
│   └── ui/                     # Componentes de shadcn/ui personalizados
│       ├── alert-dialog.tsx
├──
│
├── hooks/                      # Hooks personalizados de React
│   ├── use-media-query.ts      # Detecta el tipo de dispositivo (móvil/escritorio)
│   └── use-task.ts             # Lógica principal de tareas con SWR
│
├── services/                   # Servicios de lógica de negocio
│   └── task-services.ts        # Llamadas a la API de tareas
│
├── types/                      # Tipos e interfaces TypeScript
│   └── task-types.ts           # Tipos para Task, TaskFilter, etc.
│
├── lib/                        # Utilidades compartidas
│   └── utils.ts                # Función cn() para clases condicionales
│
└── public/                     # Archivos estáticos (SVGs, imágenes)
```

#### LIBRERIA USADA PARA FRONTEND shadcn/ui

Elegi esta libreria por que [shadcn/ui](https://ui.shadcn.com/) está diseñada específicamente para Tailwind. Por lo que facilita su uso e integracion.
Tambien por que es la cual no es cerrada y no se instala como una dependencia me baja una copia de los componentes y lo puedo modificar
sin restriccion algun por lo cual me parece ideal por que ya tiene funcionalidades y diseños muy utiles y es muy personalizable.

### COMPONENTES DESCARGADOS DE LA LIBRERIA SNADCD/UI

Para el desarrollo de la aplicación se seleccionaron diferentes componentes de la librería shadcn/ui, teniendo en cuenta criterios como adaptabilidad a múltiples dispositivos, facilidad de uso, accesibilidad y consistencia visual dentro de la interfaz.

A continuación se describen los componentes utilizados y su propósito dentro de la aplicación:

[Alert Dialog](https://ui.shadcn.com/docs/components/radix/alert-dialog): para mostrar confirmaciones antes de ejecutar acciones importantes, como eliminar o modificar elementos dentro de la aplicación.

[Input](https://ui.shadcn.com/docs/components/radix/input): para obtener los textos de los ingresados por el usuario en la App.

[Checkbox](https://ui.shadcn.com/docs/components/radix/checkbox): para gestionar el cambio de estado de las tareas, permitiendo marcar o desmarcar elementos completados.

[Button](https://ui.shadcn.com/docs/components/radix/button): para ejecutar acciones o eventos dentro de la interfaz, como guardar, eliminar o confirmar operaciones.

[Badge](https://ui.shadcn.com/docs/components/radix/badge): para resaltar iconos o textos.

[Dialog](https://ui.shadcn.com/docs/components/radix/dialog): para mostrar ventanas emergentes modales que mejoran la interacción del usuario tanto en dispositivos de escritorio como en móviles.

[Drawer](https://ui.shadcn.com/docs/components/radix/drawer): para usarlo cuando se detecte que esta en un dispositivo movil.

[Sonner](https://ui.shadcn.com/docs/components/radix/sonner): Para alertas o mensajes del sistema que informan al usuario sobre el resultado de una acción.

[Pagination](https://ui.shadcn.com/docs/components/radix/pagination)

[Select](https://ui.shadcn.com/docs/components/radix/select)

## HOOKS

### use-media-query:

Este hook se utiliza dentro de la aplicación para:

- Detectar si el usuario está utilizando un dispositivo móvil o escritorio.

- Cambiar dinámicamente componentes de la interfaz ( Drawer en móvil y Dialog en escritorio).

- Mejorar la experiencia de usuario en interfaces responsivas.

- Unificar lógica de media queries y evitar repetir código en múltiples componentes.

##

## Uso de SWR en el proyecto Para las Petciones y gestion de cache

En este proyecto se utiliza SWR como librería principal para la obtención y gestión de datos provenientes de la API.
Ya que este creado Vercel y esta muy optimizado para proyectos con Next.
Y es ideal para apps pequeñas gestion de cache y mas.

En caso de que el proyecto fuera mas grande lo ideal seria usar TanStack Query ya que este permite mutaciones de estado
mas avanzadas y un mejor manejo de cache
