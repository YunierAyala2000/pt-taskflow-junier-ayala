# TaskFlow

Aplicación de gestión de tareas construida con **Next.js 16**, **React 19**, **Tailwind CSS 4** y **Next-Pwa**.

Funciona como una PWA, permitiendo instalarla y usarla fácilmente en computadores, tablets y dispositivos móviles. 🚀

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) instalado globalmente

## ⚡Instalación y ejecución

Clona el repositorio:

```bash
git clone <https://github.com/YunierAyala2000/pt-taskflow-junier-ayala.git>
cd pt-taskflow-junier-ayala
```

## ⚡Ejecución

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

## 🖼️ Screenshots

### 🖥️ Escritorio

![PC modo claro](public/Pc-claro.png)
![PC modo Oscuro](public/Pc-oscuro.png)

### 📱 Móvil — Modo claro

![Móvil claro](public/movil-claro.png)
![Móvil claro detalle](public/movil-claro-det.png)

### 📱 Móvil — Modo oscuro

![Móvil oscuro](public/Movil-oscuro.png)
![Móvil oscuro detalle](public/movil-oscuro-det.png)

## 📂 Estructura del proyecto

```
pt-taskflow-junier-ayala/
├── app/                              # App Router de Next.js
│   ├── globals.css                   # Estilos globales con Tailwind
│   ├── layout.tsx                    # Layout raíz de la aplicación
│   └── page.tsx                      # Página principal
│
├── components/
│   ├── modal-add-task.tsx            # Modal/Drawer para agregar tareas
│   ├── task-item.tsx                 # Lista de tareas individuales
│   ├── task-stats.tsx                # Barra de estadísticas de tareas
│   ├── taskFilterTabs.tsx            # Tabs de filtro (Todas/Completadas/Pendientes)
│   │
│   ├── shared/                       # Componentes reutilizables globales
│   │   ├── AppPagination.tsx         # Paginación con selector de items por página
│   │   ├── ConfirmDialog.tsx         # Diálogo de confirmación genérico
│   │   ├── loader.tsx                # Indicador de carga animado
│   │   ├── PwaInstallButton.tsx      # Botón de instalación de la PWA
│   │   ├── task-empty.tsx            # Estado vacío cuando no hay tareas
│   │   ├── theme-provider.tsx        # Proveedor de tema claro/oscuro
│   │   └── theme-toggle.tsx          # Botón para alternar el tema
│   │
│   └── ui/                           # Componentes de shadcn/ui
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── input.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       └── sonner.tsx
│
├── hooks/                            # Hooks personalizados de React
│   ├── use-media-query.ts            # Detecta el tipo de dispositivo (móvil/escritorio)
│   └── use-task.ts                   # Lógica principal de tareas con SWR
│
├── services/                         # Servicios de lógica de negocio
│   └── task-services.ts              # Llamadas a la API de tareas
│
├── types/                            # Tipos e interfaces TypeScript
│   └── task-types.ts                 # Tipos para Task, TaskFilter, etc.
│
├── lib/                              # Utilidades compartidas
│   └── utils.ts                      # Función cn() para clases condicionales
│
└── public/                           # Archivos estáticos (imágenes, iconos, manifest)
    └── manifest.json                 # Configuración de la PWA
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

### use-task:

Es el núcleo de la lógica de tareas. Centraliza todo el estado, las peticiones a la API y las operaciones CRUD.

Expone todo lo necesario para que los componentes puedan listar, añadir, editar y eliminar tareas sin preocuparse por la lógica interna.

Responsabilidades:

- Gestiona el estado de paginación, filtros y lista local de tareas.
- Usa **SWR** para obtener tareas de la API con caché automático.
- Mantiene un registro de tareas creadas localmente (que la API no persiste) usando un `Set` de IDs en un `ref`.
- Expone las funciones `addTodo`, `toggleTodo` y `removeTodo` para que los componentes las consuman directamente.

##

## Archivos relacionados a `use-task.ts`

### `services/task-services.ts`

Contiene todas las funciones que se comunican con la API externa (`dummyjson.com/todos`). Está marcado con `"use server"` para que Next.js lo ejecute en el servidor, evitando exponer la URL base al cliente.

Funciones que expone:

| Función                          | Método HTTP | Descripción                      |
| -------------------------------- | ----------- | -------------------------------- |
| `getTasksPaginated(limit, skip)` | GET         | Obtiene tareas paginadas         |
| `addTask(payload)`               | POST        | Crea una nueva tarea             |
| `updateTask(id, payload)`        | PUT         | Actualiza el estado de una tarea |
| `removeTask(id)`                 | DELETE      | Elimina una tarea por ID         |

Internamente usa una función genérica `serverRequest<T>` que centraliza el manejo de errores y los headers comunes.

### `types/task-types.ts`

Define todos los tipos e interfaces TypeScript usados a lo largo del flujo de tareas. Garantiza consistencia entre la API, los servicios y los componentes.

| Tipo / Interfaz | Descripción                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| `Task`          | Representa una tarea completa. Incluye `isLocal` para identificar tareas creadas en cliente |
| `AddTask`       | Payload para crear una tarea (sin `id`)                                                     |
| `UpdateTask`    | Payload para actualizar solo el campo `completed`                                           |
| `TaskResponse`  | Respuesta paginada de la API: `todos`, `total`, `skip`, `limit`                             |
| `TaskFilter`    | Union type: `"all"` \| `"completed"` \| `"pending"`                                         |

## Uso de SWR en el proyecto Para las Petciones y gestion de cache

En este proyecto se utiliza SWR como librería principal para la obtención y gestión de datos provenientes de la API.
Ya que este creado Vercel y esta muy optimizado para proyectos con Next.
Y es ideal para apps pequeñas gestion de cache y mas.

En caso de que el proyecto fuera mas grande lo ideal seria usar TanStack Query ya que este permite mutaciones de estado
mas avanzadas y un mejor manejo de cache

---

## 🗂️ Manejo de estado

En este proyecto se utilizó una combinación de **estado local y estado del servidor**, sin usar librerías de estado global como Redux o Zustand, ya que para el tamaño de la aplicación no es necesario.

### `useState` — Estado local de UI

Se usa para manejar:

- La página actual (`page`)
- El filtro activo (`filter`: todas / completadas / pendientes)
- La lista local de tareas (`localTodos`)
- El indicador de carga de mutaciones (`mutating`)
- El número de ítems por página (`itemsPerPage`)

**¿Por qué?** Es la herramienta nativa de React para estado simple y de corta duración. No necesita configuración adicional y es suficiente para los datos de UI de esta aplicación.

### `useRef` — Referencias mutables sin re-render

Se usa para:

- `localTaskIds`: un `Set<number>` que rastrea IDs de tareas creadas localmente para no llamar a la API al editarlas o eliminarlas.
- `idTask`: contador para generar IDs únicos a tareas locales.

**¿Por qué?** Los `ref` no generan re-renders al mutar, lo que los hace ideales para datos de control interno que no deben afectar la UI directamente.

### `SWR` — Estado del servidor (Server State)

Se usa para obtener las tareas paginadas desde la API (`dummyjson.com/todos`). Gestiona automáticamente:

- Caché de respuestas por clave (`swrKey`)
- Estado de carga (`isLoading`)
- Estado de error (`error`)
- Revalidación con `mutate()`

**¿Por qué SWR y no TanStack Query?** Para una aplicación de esta escala, SWR es más ligero y simple. Está creado por Vercel y está optimizado para Next.js. TanStack Query sería más adecuado en proyectos con mutaciones complejas, invalidaciones en cascada o múltiples fuentes de datos.

### `next-themes` — Estado del tema

Gestiona el tema claro/oscuro de la aplicación con persistencia en `localStorage` y soporte para la preferencia del sistema operativo.

**¿Por qué?** Integración nativa con Next.js App Router, sin necesidad de implementación manual con cookies o localStorage.

---

## 🔧 Métodos del hook `useTasks` y su uso en componentes

El hook `useTasks` centraliza toda la lógica de tareas y expone tres métodos principales para mutar el estado. Los componentes los reciben como **props de tipo función (callbacks)**, lo que los mantiene desacoplados del hook y los hace reutilizables.

### `addTodo(taskTitle: string): Promise<Task>`

Crea una nueva tarea con el título recibido. Internamente llama a la API (`POST /todos/add`) y guarda el resultado como tarea local con un ID generado en cliente, ya que la API de `dummyjson` no persiste los datos.

```ts
const { addTodo } = useTasks();
await addTodo("Hacer ejercicio");
```

### `toggleTodo(id: number, completed: boolean): Promise<void>`

Cambia el estado de completado de una tarea. Si la tarea es local (creada en sesión), la actualiza solo en el estado sin llamar a la API. Si es del servidor, llama a `PUT /todos/:id`.

```ts
const { toggleTodo } = useTasks();
await toggleTodo(5, true); // marca como completada
```

### `removeTodo(id: number): Promise<void>`

Elimina una tarea. Si es local, la quita del estado directamente. Si es del servidor, llama a `DELETE /todos/:id`. Si al eliminar la página queda vacía y no es la primera, retrocede una página automáticamente.

```ts
const { removeTodo } = useTasks();
await removeTodo(5);
```

---

## 🧩 Diseño de los componentes que consumen estos métodos

### `task-item.tsx` — Lista de tareas

Recibe `onToggle`, `onDelete` como props de callback en lugar de usar el hook directamente. Esto lo hace **reutilizable en cualquier contexto** sin acoplarse al estado global.

```tsx
<TaskItem
  todos={todos}
  onToggle={(id, completed) => toggleTodo(id, completed)}
  onDelete={removeTodo}
/>
```

Motivo del diseño:

- Al recibir callbacks, el componente no sabe de dónde vienen los datos ni cómo se gestionan.
- Usa un `ConfirmDialog` intermedio antes de ejecutar `onDelete`, para evitar eliminaciones accidentales.
- El prop `isMutating` bloquea la UI mientras hay una operación en curso.

### `modal-add-task.tsx` — Modal para agregar tareas

Recibe `addTodo` directamente como prop y lo pasa al formulario interno `TaskForm`.

```tsx
<AddTaskDrawer
  open={showAddDrawer}
  onOpenChange={setShowAddDrawer}
  addTodo={addTodo}
/>
```

Motivo del diseño:

- Usa `useMediaQuery` para mostrar un **`Dialog`** en escritorio y un **`Drawer`** en móvil, con el mismo formulario (`TaskForm`) en ambos casos. Esto evita duplicar la lógica del formulario.
- El formulario maneja su propio estado de `isLoading` para mostrar un spinner durante la creación.
- Llama a `onCancel` (que cierra el modal) solo si `addTodo` fue exitoso.

### `task-stats.tsx` — Estadísticas de tareas

Este componente es **puramente presentacional**: solo recibe `total`, `completed` y `pending` como números. No necesita los métodos del hook.

```tsx
<TaskStats
  total={allTodos.length}
  completed={allTodos.filter((t) => t.completed).length}
  pending={allTodos.filter((t) => !t.completed).length}
/>
```

Motivo del diseño:

- Al aislar los cálculos fuera del componente, `task-stats` es independiente y testeable.
- Usa `useMediaQuery` para decidir si mostrar las estadísticas como un **panel lateral** (escritorio) o como un **botón flotante que abre un Drawer** (móvil), que ocupa menos espacio en pantallas pequeñas.

---

## ✨ Características extra

La aplicación incluye varias funcionalidades adicionales que mejoran la experiencia de uso y el rendimiento:

- 📄 Paginado de tareas
  Permite navegar fácilmente entre grandes cantidades de tareas sin afectar el rendimiento de la aplicación.

- 📱 Multiplataforma (PWA)
  La aplicación funciona como Progressive Web App, lo que permite instalarla y utilizarla en computadores, tablets y dispositivos móviles.

- 📊 Barra de estadísticas de tareas
  Visualización rápida del estado de las tareas para conocer de forma clara el progreso y organización del trabajo.

- ✨ Cambio de temas La app cuenta con un modo claro y oscuro

- ➤ Boton de contacto via whatsApp

## Herramientas de apoyo

En el desarrollo de la app me apoye de varias herramientas para mejorar tanto el diseño como la velocidad del desarrollo:

- `Visual studio con GitCopilot:` Lo use para creacion de componentes y correccion de errores.

- `GEMINI:` La use para generar la imagen de la app para cuando esta se instale en los dispotivos.

- [V8](https://v0.app/): Para la creacion del prototipo del diseño de la app (le realice mejoras pero me dio una idea inicial)

- [stitch-IA.Desig](https://v0.app/): Para la generacion de otro prototipo (La version que genero V8 no me convencio del todo esta fue la final)

- [uiverse.io](https://uiverse.io/vishalmet/modern-moose-93): Para ver ideas de diseño de componentes de profesionales (de aqui saque el Loader)

- [freeconvert](https://www.freeconvert.com/es/jpg-to-svg): Para convertir el icono de la app generado con gemini a formato SGV

- [iloveimg](https://www.iloveimg.com/es/redimensionar-imagen): Para redimencionar la imagen de la app para que al momento instalarla el icono se vea en todos los dispositivos

Entre otras pero estas fueron las principales !
