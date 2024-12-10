# **Pokédex App**

## **Descripción General**
pokeapi-challenge es una aplicación desarrollada en Vue.js 3 que simula una Pokédex personalizada. Fue concebida como un proyecto práctico a partir del challege propuesto por Global66 para el puesto de front-end developer, utilizando Vue, gestión de estados, diseño basado en componentes y transiciones fluidas.

El objetivo principal del proyecto fue crear una interfaz interactiva y dinámica que brinde una experiencia atractiva para el usuario, reflejar las decisiones de diseño establecidas en el archivo Figma recibido, y demostrar solidez en el proceso de desarrollo.

---

## **Estructura de Carpetas**  

```plaintext
src/
├── assets/
│   ├── background/
│   │   └── modal-bg.png
│   ├── icons/
│   │   ├── close-btn.png
│   │   ├── list-icon.png
│   │   ├── search-icon.png
│   │   ├── star-filled-icon.png
│   │   └── star-icon.png
│   ├── welcome/  
│   |   └── welcome-image.png
|   └──loader.png
├── components/
│   ├── Button.vue
│   ├── EmptyResults.vue
│   ├── HelloWorld.vue
│   ├── Loading.vue
│   └── Modal.vue
├── router/
│   └── index.js
├── store/
│   └── addedToFav.js
├── views/
│   ├── Home.vue
│   └── Welcome.vue
├── App.vue
├── main.js
├── style.css
└── .gitignore
```

---

### **Descripción de las Carpetas y Archivos**  

#### **1. `assets/`**  
Directorio que contiene recursos estáticos:  
- **`background/`**: Contiene la imagen de fondo para modales (`modal-bg.png`).  
- **`icons/`**: Almacena los íconos utilizados en los botones y elementos interactivos, como estrellas, lupas y listas.  
- **`welcome/`**: Contiene imágenes específicas para la pantalla de bienvenida (`welcome-image.png`).

#### **2. `components/`**  
Componentes reutilizables dentro de la aplicación:  
- **`Button.vue`**: Componente de botón interactivo con variantes (`primary`, `secondary`) y soporte para íconos.  
- **`EmptyResults.vue`**: Mensaje que se muestra cuando no hay resultados en la búsqueda.  
- **`HelloWorld.vue`**: Componente de prueba (posiblemente descartable en producción).  
- **`Loading.vue`**: Componente de animación de carga con una Pokébola giratoria.  
- **`Modal.vue`**: Componente para mostrar los detalles de un Pokémon en un cuadro emergente.  
- **`PokemonDetails.vue`**: Detalles individuales de un Pokémon.  

#### **3. `router/`**  
- **`index.js`**: Configuración del sistema de rutas de la aplicación con `vue-router`.  

#### **4. `store/`**  
- **`addedToFav.js`**: Manejo del estado global con **Pinia**, específicamente para gestionar favoritos `isLoading`.  

#### **5. `views/`**  
Vistas principales de la aplicación:  
- **`Home.vue`**: Página principal que muestra la lista de Pokémon y permite interactuar con ellos.  
- **`Welcome.vue`**: Pantalla inicial que redirige a la página principal (`Home`).  

#### **6. Archivos Base**  
- **`App.vue`**: Componente raíz de la aplicación.  
- **`main.js`**: Archivo principal donde se inicializa Vue y se monta la aplicación.  
- **`style.css`**: Estilos globales para toda la aplicación.  
- **`.gitignore`**: Archivo para excluir archivos o carpetas específicas del control de versiones.  

---

## **Características**
- **API de Vue seleccionada para este proyecto:** Seleccioné la Options API de Vue.js 3, la cual ordena todas las características de un componente en un objeto que es exportado. La razón detrás de esta decisión es que es la API con la que más vengo trabajando, por lo que quise ser honesto al momento de realizar el challenge. De igual manera, he podido explorar con anterioridad la Composition API junto con su mayor sencillez de sintaxis, por lo que no tengo dificultades para poder aprenderla en futuros proyectos.
- **Búsqueda de Pokémon:** Permite buscar un Pokémon por su nombre utilizando un campo de entrada interactivo.
Al efectuar la Pokeapi una búsqueda basada en un match exacto, no fue posible la idea inicial de buscar mediante RegEx los resultados impuestos por el usuario (para tratar de realizar consultas que no fuesen 100% exactas).
El caso de uso reflejado es que el usuario deberá introducir el nombre completo del Pokémon a buscar, efectuando un submit con la tecla `enter`.
- **Sistema de favoritos:** Los usuarios pueden agregar y quitar Pokémon a una lista de favoritos.
Actualmente esos datos no persisten en una recarga de página. Si bien se implementó Pinia para persistirlos en la memoria de la app, falta implementarlo en LocalStorage para poder posibilitarle al usuario acceder a esa información en nuevas visitas a la app.
- **Transiciones de carga:** Implementa un componente `Loading` para mejorar la percepción de carga durante las transiciones de rutas. Actualmente sólo existen dos rutas: `/` y `/home`. La segunda es programática, puesto que cuando se efectúa una búsqueda, la misma se ve reflejada en la URL.
- **Gestión del estado global:** El estado de los favoritos y del loader se gestionan de manera centralizada usando Pinia. Como dije anteriormente, aun queda por implementar la persistencia en nuevas consultas.

---

## **Estructura del Proyecto**

### **Componentes**
1. **`Home`**
   - Funcionalidad principal: mostrar una lista de Pokémon, permitir la búsqueda y la interacción con favoritos.
   - Consideraciones:
     - Se utilizó `mounted` para realizar el llamado a la API cuando el componente es cargado por primera vez.
     - Se utilizó un `v-for` para iterar sobre la lista de Pokémon, optimizando la renderización con claves únicas.
     - Un sistema condicional muestra un componente `EmptyResults` si no hay resultados para una búsqueda.
   - Decisiones:
     - **Por qué no se hizo uso del paginado de la API:** inicialmente me propuse utilizar el paginado que utiliza la pokeapi. La idea era utilizar una variable en el componente llamada endpointBase, mientras que utilizar otro que fuese siendo reemplazado por el String `next` que viene en cada Objeto que nos trae a los Pokémon del llamado inicial.
     No obstante, los tiempos no me permitieron implementar esa lógica, conjuntamente con el sistema de scroll infinito que tenía planeado. Es posible que en futuras iteraciones lo implemente para darle una mejor optimización a la página, independientemente de la realidad de que la latencia de la API al traer todos los resultados es muy baja, pero teniendo en cuenta la otra realidad (siempre van a existir más datos, por lo que esa carga inicial en algún momento seguro se realentice).
    - Mejoras a futuro:
     - **El componente maneja demasiadas tareas:** al terminar la entrega, me doy cuenta de que este componente maneja una gran cantidad de tareas. La idea era que los hijos en muchos casos sean ignorantes de lo que el padre, que crea una instancia de ellos, quiere que realicen en su contexto en particular. Posiblemente haya mejores decisiones en cuanto a Code Design, y por lo pronto creo que es un punto a mejorar para poder escalar mejor la App.
     - **El div renderiza los Pokemon debería ser un componente aparte:** si bien soy consciente de que esto falta en la entrega, entiendo que a futuro va a ser implementado, procurando en este momento realizar la entrega sin mayor dilación de tiempo.

2. **`Welcome`**
   - Pantalla de bienvenida que introduce al usuario antes de redirigir al home.
   - Se siguió la decisión de diseño para brindar una transición fluida hacia el home con el uso del loader. El Loader está planteado como un componente que sólo se renderiza en una transición entre rutas. No deja de ser un componente renderizado condicionalmente, pero esta condición es, por ahora, pasar de `/` a `/home/`. A futuro esta codición puede quitarse para posibilitar la utilización del Loader en más rutas (teniendo en cuenta también que `/home` a `/home?query=<query>` posiblmente se vea afectada, por lo que hay que ser cautelosos).

3. **`Loading`**
   - Componente visual que muestra una Pokébola animada mientras se carga la vista principal.
   - Decisiones:
     - **Implementación del delay:** Se agregó un tiempo mínimo de visualización para evitar que la transición parezca abrupta. Inicialmente la idea era agregarle efectos, no obstante entiendo que para la entrega actual cumple su propósito, y dilatar la misma por una cuestión estética no es estrictamente ágil en términos de entrega de producto.

4. **`Button`**
   - Componente reutilizable para botones interactivos.
   - El componente está pensado para ahorrarle tiempo al futuro desarrollador que implemente Links o Buttons en cada uno de los componentes. Tomé la decisión de agrupar `Router-Link` y `<button>` en el mismo componente, y renderizarlos condicionalmente en base a los props que reciben: cuando se recibe el prop `to`, el componente entiende que tiene que renderizar un `Router-Link`, mientras que la ausencia de este prop hace posible que se renderice un `<button>`. La idea de no usar botones para links es por accesibilidad: los lectores de pantalla deben saber que eso con lo que un usuario puede interactuar es un button o un link. 
   - Soporta variantes (`primary`, `secondary`) y la posibilidad de incluir íconos.
   -

5. **`Modal`**
   - Muestra detalles de un Pokémon seleccionado.
   - Permite agregar o quitar a un Pokémon de favoritos.
   - Decisiones:
     - **Por qué un modal personalizado:** Se evitó usar librerías externas para mantener el control total sobre el diseño y la lógica.
   - Mejoras a futuro: El componente actualmente carece de reusabilidad. El contenido del modal bien puede reemplazarse usando `<slot>`, y de esa forma realizar un modal universal, con contenido flexible.

---

### **Gestión del Estado**
Se utilizó un objeto reactivo para manejar los estados compartidos entre componentes:

1. **`favorites` (lista de favoritos):**
   - Se almacenan los Pokémon favoritos de manera centralizada en Pinia.
   - Incluye métodos para agregar o eliminar Pokémon, establecidos en la propia Store, de manera de que los componentes que hagan uso de la Store sólo llamen a esos métodos, sin necesidad de crear los propios.
   - Decisión:
     - **Pinia:** Se utiliza Pinia, ya que es la librería actual para la gestión de estados globales de Vue (anteriormente se usaba VUEX). La idea es tener un `source of truth` unificado.

2. **`isLoading`:**
   - Maneja la visibilidad del componente `Loading`.
   - Decisión:
     - **Por qué no un estado global:** Actualmente considero que es un dato muy chico como para necesitar compartirse entre gran cantidad de componentes: es necesario solamente para App.vue y su manejo condicional de `Loading` cuando cambian las rutas y se renderice la `RouterView` correspondiente.

---

### **Navegación**
La navegación fue implementada con `vue-router`, y se utilizaron hooks de navegación para manejar el estado del loader:

1. **`beforeEach` y `afterEach`:**
   - Se implementaron para mostrar el loader solo durante la transición de `Welcome` a `Home`.
   - Decisión:
     - **Por qué limitar el loader a esta transición:** Mejora la experiencia de usuario al no añadir cargas innecesarias en otras rutas. Originalmente también se aplicaba a los cambios en `/home` causado por las consultas del usuario. Opino (de momento) que la utilización de Loader para ese caso de uso en particular podría ser reemplazado por Skeletons.

2. **Simulación de tiempo mínimo de carga:**
   - Se utilizó un `setTimeout` en el hook `afterEach` para asegurar que el loader sea visible durante un tiempo breve pero perceptible.

3. **Rutas:**
   - `/`: Es la ruta raiz, la principal de momento. La decisión de no cargar la ruta como `/welcome` se dio porque considero que sobrecargar de rutas con una redirección por defecto en este caso en particular sería innecesario: es posible cuando hay un `/login`, o cuando queremos que la vista principal se llame `/`, pero viendo el diseño (por el componente de "Go back home"), supuse que la vista de las listas debía llamarse `/home`.
   -`/home`: es la ruta principal, que tiene la lista completa de Pokémon. Imaginé un caso de uso en el cual el usuario le comparte la URL de la búsqueda de su Pokémon favorito a otro posible usuario. Me guié fundamentalmente en cómo Google maneja la dinamicidad de las rutas en las búsquedas, y entiendo que la URL debiera reflejar las acciones realizadas por el usuario que cambien el contenido del sitio. Dejarlo estático es posible, no obstante es difícil para el usuario trackear sus propias actividades, y por un tema de SEO también ayuda al sitio en este caso. Una mejora que me queda pendiente es la de afectar justamente la URL al toggle entre favoritos y all.

---

### **Estilos**
1. **Diseño Responsivo:**
   - Se utilizó TailwindCSS para manejar clases y estilos, priorizando la rapidez y flexibilidad en el desarrollo.
   - Decisión:
     - **Por qué TailwindCSS:** Reduce el tiempo de desarrollo y proporciona un sistema bien estructurado para crear diseños limpios y modernos.

2. **No uso de librerías adicionales de UI:**
   - Si bien TailwindCSS fue elegido justamente para ahorrar tiempo de desarrollo en los componentes de UI, para este challenge preferí no depender de librerías adicionales que trajeran componentes resueltos, como `DaisyUI` o `Shadcn`. Pienso que, para el alcance del proyecto, el objetivo del mismo, y los componentes necesarios para llevarlo a cabo, sería un overkill utilizar estas librerías en esta instancia, no siendo descartado la posibilidad de migrar los componentes ya existentes a las mismas (y justamente esta posibilidad fue lo que motivó que hiciera componentes custom de elementos como `Button` y `Modal`).

---

## **Decisiones de Tecnología**

1. **Sin dependencias innecesarias:**
   - Se evitó incorporar librerías externas para mantener el peso del proyecto bajo y el código lo más comprensible posible a primera vista. Adicionalmente, considero que en caso de necesitarlo, los pocos componentes UI hechos en forma custom pueden migrarse, de optar por una librería.

---

## **Futuras Mejoras**
- Persistencia de datos con LocalStorage.
- Paginación y Scroll Infinito para listas largas de Pokémon.
- Evaluar si amerita incorporar nuevas librerías.
- Mejoras en el código para los componentes `Home`, `Modal`.

---