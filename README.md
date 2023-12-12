Lista de tareas interactivas

(imagen)



Herramientas para el desarrollo (badges):
html, css, tailwind, js, react, npm, git, github, gh pages, hosting by namecheap.com

Status(badges):
En desarrollo (?)

released (badges):
Nov, 2023

Licencia(badges):
mit

Presentación de proyecto:

Lista de tareas interactivas


Brinda la solución definitiva para tus tareas pendientes de todos los días. Ya no deberás preocuparte por tener 
papel y lapiz a mano, ni por extraviar tus anotaciones. Ésta lista de tareas interactivas cuenta con permanencia de datos en memoria del navegador, esto quiere decir que, en caso de cerrar accidentalmente la ventana en la que estés trabajando, tus anotaciones segurián allí.


Para el usuario


funcionalidades de los diferentes componentes:

Contador de tareas: en el se puede visualizar las tareas completadas y el total de las mismas

Buscador: Puedes buscar una tarea bajo cualquier caracter que contenga el texto.

lista de tareas: en ella se visualizan las tareas añadidas.

botón de completar: para tildar las tareas completadas

botón de eliminar: eliminar las tareas ya ingresadas

Botón de añadir tarea: brinda acceso al modal (ventana emergente) que contiene un formulario, para generar nuevas tareas.
Con sus respectivos botones de añadir o eliminar.


Para el desarrollador:

Este proyecto se encuentra desarrollado bajo los éstandares de React versión 18.2.0 y se utilizaron diferentes herramientas propias del mismo, como hooks para manipular la lógica de estados derivados mediante useEffect, useState y  useContext y API's para la creación de contextos proveedores de "props" mediante React.createContex(). Dicha lógica la podrás encontrar dentro de la carpeta /TodoContext, la cual está dividia en dos archivos principales; useLocalStorage.js e index.js


Carpeta src/TodoContext


archivo src/TodoContext/useLocalStorage.js:

``` js:

import React from "react";

function useLocalStorage(itemNAme, initialValue){

    const [item, setItem] = React.useState(initialValue);

    const [loading, setLoading] = React.useState(true);
    
    const [error, setError] = React.useState(false)


React.useEffect(() => {


    setTimeout(() =>{
        try{
            let localStorageItem = localStorage.getItem(itemNAme)
            let parsedItem;
        
            if(!localStorageItem) {
                localStorage.setItem(itemNAme, JSON.stringify(initialValue));
                parsedItem = initialValue;
                } else {
                parsedItem = JSON.parse(localStorageItem) ;
                setItem(parsedItem)
                }
        
            setLoading(false)}
            catch{
                setLoading(false);
                setError(true)
            }
    }, 2000); 
    // eslint-disable-next-line
}, [])
    
const saveItem = (newItem) => {
    localStorage.setItem(itemNAme, JSON.stringify(newItem));
    setItem(newItem)
}

    return {
        item,
        saveItem,
        loading,
        error,
    }
}  

export { useLocalStorage }; 
```

Se establece la lógica de estados que incluya la manipulación de data alojada en localStorage.


``` js:
function useLocalStorage(itemNAme, initialValue)
``` 

En sus dos parámetros se determina:

* itemName: Llave de los objetos alojados en localStorage

* initialValue: valor de los objetos que alojados en localStorage



En sus hooks de estados derivados se determina:

``` js:
    const [item, setItem] = React.useState(initialValue);
``` 
estados de las tareas guardadas Traer data de localStorage o setearla si es necesario

``` js:
    const [loading, setLoading] = React.useState(true);
```
estado de carga (loading skeletons)

``` js:
    const [error, setError] = React.useState(false)
``` 
estado de error, en caso de que la solicitud a localStorage no sea exitosa



En su función actualizadora del estado:


``` js:
React.useEffect(() => {


    setTimeout(() =>{
        try{
            let localStorageItem = localStorage.getItem(itemNAme)
            let parsedItem;
        
            if(!localStorageItem) {
                localStorage.setItem(itemNAme, JSON.stringify(initialValue));
                parsedItem = initialValue;
                } else {
                parsedItem = JSON.parse(localStorageItem) ;
                setItem(parsedItem)
                }
        
            setLoading(false)}
            catch{
                setLoading(false);
                setError(true)
            }
    }, 2000); 
    // eslint-disable-next-line
}, [])
    
const saveItem = (newItem) => {
    localStorage.setItem(itemNAme, JSON.stringify(newItem));
    setItem(newItem)
}
```

Se establece la lógica dentro del contexto de la función nativa setTimeout(), que dará lugar por 2 segundos, al estado de carga (loading), estado contenedor de los loading skeletons. Esto nos brindará tiempo suficiente para realizar el pedido de data (item) alojados en la API localStorage(), sin necesidad de que el usuario observe un sitio vacío de contendio durante dicho proceso.
Mediante try y catch se determina el estado de éxito o error de dicha solicitud.
Por último, la función flecha "saveItem" controla la lógica de guardado de nuevas tareas (objetos), en localStorage()

Retorno de la función useLocalStorage():

``` js:

return {
        item,
        saveItem,
        loading,
        error,
    }
```

* item: Estado de las tareas guardadas

* saveItem: Función felcha que determina la lógica de guardado en localStorage()

* loading: Estado de carga de los componentes

* error: Estado de error de los componentes

archivo src/TodoContext/index.js:


A primera vista se puede observar la constante TodoContext con el valor asignado React.createContext(), una API que nos permitirá generar un objeto de contexto de props, con el cuál podremos nutrir de props a cualquier componente de nuestra aplicación, sin importar el orden jerárquico de componentes padres e hijos. (ver más adelante)

A continuación el componente <TodoProvider />

Lo primero que vemos en la función es una constante de objetos con todos los valores generados en el archivo importado ./useLocalStorage.js, algunos de ellos se encuentran renombrados, como por ejemplo es el caso de la variable "item" renombrada por "todos". Todos ellos asignados al uso de localStorage(llave valor)


Lógica de estados:

* Estado de valor de búsqueda (searchValue), con un string vacío como estado original.

* Estado del modal (openModal), con "false" como estado original.


Lógica de componentes:

* Tareas completadas (completedTodos) --> consumido en 

* Buscador de tareas (searchedTodos) --> consumido en

* Añadir tareas (addTodos) --> consumido en 

* Marcar tareas cómo completadas (completeTodos) --> consumido en

* Eliminar tareas (deleteTodos) --> consumido en 


Return de la función TodoProvider():

Se determina a la constante TodoContext como componente (<TodoContext></TodoContext>) y le añadimos la propiedad .Provider (<TodoContext.Provider></TodoContext.Provider>), lo cual nos permitirá asignar los valores de contexto que vamos a pasar a los demás componentes consumidores (<TodoContext.Provider value={{loading, error, completedTodos...}}>).
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

* Ing. Ezequiel Miranda - @ezequielmiranda87

* Lic. José Alberto Capinelli

Licencia:

* MIT

Referencias:

https://www.aluracursos.com/blog/como-escribir-un-readme-increible-en-tu-github











