Listado de tareas interactivo

(imagen)



Herramientas para el desarrollo (badges):
html, css, tailwind, js, react, npm, git.

Status(badges):
En desarrollo (?)

released (badges):
Nov, 2023

Licencia(badges):
mit


Explicación del proyecto:

Listado de todos interactivo, donde podras agregar tareas a tu listado, marcarlas como completadas, buscarlas...


Para el usuario

funcionalidades de los diferentes componentes:


Contador de tareas: en el se puede visualizar las tareas completadas y el total de las mismas

Buscador de palabras clave: Puedes buscar en el listado cualquier tarea bajo cualquier caracter que contenga el texto.

lista de tareas: en ella se pueden visualizar el listado de las mismas

botón de completado: para tildar las tareas completadas

botón de eliminar: eliminar las tareas ya ingresadas

Botón de añadir tarea: brinda acceso al modal (ventana emergente) que contiene un formulario, para generar nuevas tareas.
Con sus respectivos botónes de añadir o eliminar.


Para el desarrollador:

Este proyecto se encuentra desarrollado bajo los éstandares de React versión 19. Por lo tanto, se utilizaron diferentes herramientas propias del mismo, cómo hooks para manipular la lógica de estados derivados mediante "useEffect" y "useState" y API's para la creación de contexto de "props" mediante React.createContex(). Dicha lógica la podrás encontrar dentro de la carpeta /TodoContext, la cuál está dividia en dos archivos; useLocalStorage.js e index.js


Carpeta src/TodoContext


archivo src/TodoContext/useLocalStorage.js: 

Aquí se estable la lógica de estados que incluya la manipulación de data alojada o no en localStorage. Grácias a la misma se obtiene la permanencia en el navegador.
En sus estados se determina:

* Traer data de localStorage o setearla

* estado de carga (loading skeletons)

* estado de error, en caso de que la solicitud a localStorage no sea exitosa


archivo src/TodoContext/index.js:


A primera vista se puede observar la constante TodoContext con el valor asignado React.createContext(), una API que nos permitirá generar un objeto de contexto de props, con el cuál podremos nutrir de props a cualquier componente de nuestra aplicación, sin importar el orden gerarquico de componentes padres e hijos.

A continuación el componente <TodoProvider />

Lo primero que vemos en la función es una constante de objetos con todos los valores generados en el archivo importado ./useLocalStorage.js, algunos de ellos se encuentran renombrados, como por ejemplo es el caso de la variable "item" renombrada por "todos". Todos ellos asignados al uso de localStorage(llave valor)


Lógica de estados:

* Estado de valor de búsqueda (searchValue), con un string vacío cómo estado original.

* Estado del modal (openModal), con "false" cómo estado original.


Lógica de componentes:

* Tareas completadas (completedTodos) --> consumido en 

* Buscador de tareas (searchedTodos) --> consumido en

* Añadir tareas (addTodos) --> consumido en 

* Marcar tareas cómo completadas (completeTodos) --> consumido en

* Eliminar tareas (deleteTodos) --> consumido en 


return de la función TodoProvider():

Se determina a la constante TodoContext cómo componente (<TodoContext></TodoContext>) y le añadimos la propiedad .Provider (<TodoContext.Provider></TodoContext.Provider>), lo cual nos permitirá asignar los valores de contexto que vamos a pasar a los demás componentes consumidores (<TodoContext.Provider value={{loading, error, completedTodos...}}>).
Dentro del componente TodoContext anidamos la propiedad {children} (<TodoContext.Provider value={{loading, error, completedTodos...}}>{children}<TodoContext.Provider />) que será utilizada cómo parametro del componente <function TodoProvider({children})>, esto nos permitirá manipular y personalizar el contenido que renderizamos dentro de cada componente que utilice dichas props, no sólo valores, sino también JSX


Por último exportamos TodoContext y TodoProvider

export {TodoContext TodoProvider}



Carpeta /src/App


src/App/AppUI.js

archivo principal user interface

importamos todos los componentes de nuestra aplicación al archivo /AppUI. Dentro de la función omonima establecemos una constante de objetos con las props que retornamos del componente TodoContext y le asignamos el valor React.useContext(TodoContext), un hook de React, que nos permitirá leer y sobrescribir los valores del parametro que hayamos pasado cómo valor original, en este caso TodoContext, que es contexto de props que generamos anteriormente.

return de la función AppUI():

Dentro del retorno de la función ubicamos los componentes importados, con sus respectivas props y exportamos el componente

export { AppUI }



src/App/index.js

Componente principal de renderizado

Si bien, anteriormente dijimos que gracias a la API createContext(), podiamos enviar valores y código JSX sin importar el orden gerárquico de los componentes, es aquí donde podemos apreciar verdaderamente la "magia" del contexto de ejecución, que en realidad no es más que anidar el componente principal de interfaz de usuario <AppUI /> dentro del componente <TodoProvider />, esto significa que todo lo que se encuentre dentro del <AppUI/> pase a ser un componente hijo del componente proveedor <TodoProvider />

function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}


LINK:
https://ivokonstantinow.lat/


Tecnologías usadas:

* Javascript

* React versión 18.2.0

* NPM

* GIT

dependencias 

* gh-pages

* react-icons

* react fonts

* material ui


Hosting:

* https://www.namecheap.com


Contribuyentes:

* Juan David Castro - @juandc

Desarrollador del proyecto:

* Ivo Konstantinow - @ivokonstantinow

Agradecimientos:

Quiero agradecer infinitamente a dos personas en particular, sin su acompañamiento y supervisión éste proyecto no hubiese sido posible.

* Ezequiel Miranda - @ezequielmiranda87

* José Alberto Capinelli

Licencia:

* MIT

Referencias:

https://www.aluracursos.com/blog/como-escribir-un-readme-increible-en-tu-github











