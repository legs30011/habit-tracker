## Habit Tracker

Una aplicación web para ayudarte a crear, seguir y gestionar tus hábitos diarios.

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se recargará si haces modificaciones.\
También verás cualquier error de lint en la consola.

### `npm test`

Lanza el ejecutor de pruebas en modo interactivo.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

## Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **TypeScript:** Superset de JavaScript que añade tipado estático.
* **Tailwind CSS:** Framework de CSS utility-first para un diseño rápido.
* **Flowbite React:** Biblioteca de componentes de interfaz de usuario construida sobre Tailwind CSS.

## Dependencias Instaladas

Además de las dependencias base de Create React App con la plantilla de TypeScript, se instalaron las siguientes:

npm install flowbite flowbite-react
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss


* `flowbite` y `flowbite-react`: Para los componentes de la interfaz de usuario como modales, selects, etc.
* `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/postcss`: Para utilizar Tailwind CSS en el proyecto.

## PASOS REALIZADOS:

### Añadir Hábito

* **Entrada de nombre:** Se muestra un campo de texto (`<input type="text" />`) en el componente `AddHabit` para que el usuario ingrese el nombre del nuevo hábito. El valor está controlado por el estado `name`, y los cambios se reflejan en este estado mediante el evento `onChange`.
* **Selección de color:** Se muestran 5 botones circulares, cada uno con un color diferente, generados al mapear el array `colors` en `AddHabit`. Al hacer clic en un botón, se actualiza el estado `color` del componente.
* **Botón "Añadir Hábito":** Un botón `<button type="submit">Añadir Hábito</button>` dentro del formulario en `AddHabit`.
* **Formulario y envío:** El componente `AddHabit` utiliza un formulario (`<form onSubmit={handleSubmit}>`). Al hacer clic en el botón "Añadir Hábito", se ejecuta la función `handleSubmit`, que previene la recarga de la página, crea un nuevo objeto de hábito con los datos ingresados y llama a la función `onAdd` proporcionada por el componente padre (`App`).

### Panel de Hábitos

* **Lista de hábitos en formato de tarjeta:** El componente `HabitList` (aún no detallado) recibe la lista de `habits` desde el estado de `App.tsx` y los renderiza, probablemente utilizando elementos `div` con estilos para simular tarjetas.
* **Cada hábito muestra:**
    * **Nombre:** La propiedad `name` de cada objeto `habit` se muestra en la interfaz de `HabitList`.
    * **Color:** La propiedad `color` se utiliza para aplicar un estilo visual al hábito en `HabitList`.
    * **Casillas de verificación semanales (Lun–Dom):** `HabitList` renderiza una serie de casillas de verificación (o elementos similares) correspondientes a los días de la semana, vinculadas al array `days` de cada hábito.
    * **Barra de progreso:** (Implementación pendiente) Se calcularía el porcentaje de días completados basado en el array `days` y se mostraría visualmente.
    * **Texto de completado:** (Implementación pendiente) Mostraría un texto como "X/7 completados" basado en el estado de los días.

### Seguimiento del Progreso del Hábito

* **Casillas/Toggles semanales:** `HabitList` renderiza estos elementos, cuyo estado se vincula al array `days` del hábito.
* **Marcar días como completados:** Al interactuar con estos elementos en `HabitList`, se llama a la función `onToggleDay` (pasada desde `App.tsx`), que actualiza el array `days` del hábito correspondiente en el estado de `App.tsx`.
* **Actualización automática del progreso y texto:** Cuando el estado `habits` se actualiza, React re-renderiza `HabitList`, recalculando y mostrando el progreso actualizado.

### Editar y Eliminar Hábitos

* **Editar nombre y color:** Implementado con el componente `EditHabitModal` y la lógica en `App.tsx` para abrir/cerrar el modal y guardar los cambios.
* **Opción de eliminar al pasar el ratón:** (Implementación pendiente) Requeriría estilos CSS en `HabitList`.
* **Confirmación antes de eliminar:** (Implementación pendiente) Lógica en `HabitList` para mostrar una confirmación.

### Almacenamiento Persistente

* **Almacenar datos con `localStorage`:** En `App.tsx`, los `useEffect` guardan y cargan la lista de `habits` y el estado del modo oscuro usando `localStorage`.
* **Persistir hábitos:** Los hábitos se guardan automáticamente en `localStorage` cada vez que la lista cambia.

### Restablecer Tracker

* **Botón para restablecer casillas:** El botón "Reiniciar todos los días" en `App.tsx` llama a `resetAllDays`, que actualiza el estado para marcar todos los días como no completados.
* **Persistir hábitos:** Los hábitos reiniciados se guardan automáticamente en `localStorage`.

### Indicador de Hábitos Completados

* **Indicador junto al nombre:** (Implementación pendiente) Lógica en `HabitList` para verificar si todos los días de un hábito están marcados y mostrar un indicador.

### Diseño Responsivo

* **Layout mobile-first:** Se han utilizado algunas clases de Tailwind CSS adaptables, pero la responsividad completa aún podría requerir más ajustes.

### Bonus

* **Toggle de Modo Oscuro:** El componente `DarkModeToggle` y el estado `darkMode` en `App.tsx` gestionan el cambio de tema aplicando la clase `dark` al `<html>`.
* **Filtros y Ordenamiento:** El componente `FilterSort` permite filtrar por nombre y ordenar por racha (la lógica de filtrado y ordenamiento se encuentra en `App.tsx`).
