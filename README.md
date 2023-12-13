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
(imagen de la ubicación del archivo)

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



Hooks de estados derivados:

``` js:
    const [item, setItem] = React.useState(initialValue);
``` 
estados de las tareas guardadas. Traer data de localStorage o setearla si es necesario, cómo estado incial del componente item predeterminamos "initialValue", que en el posterior llamado de la función useLocalstorage(), vamos a asignarle "TODOS_V1" la llave de nuestros items de localStorage. 

``` js:
    const [loading, setLoading] = React.useState(true);
```
estado de carga (loading skeletons), seteamos true como valor inicial, luego de dos segundos y contando con una petición exitosa, cambiaremos su estado a "false"

``` js:
    const [error, setError] = React.useState(false)
``` 
estado de error, en caso de que la solicitud a localStorage no sea exitosa, caso contrario su estado se determinará en "true"



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
Por último, la función flecha "saveItem" controla la lógica de guardado de nuevas tareas (objetos), en localStorage.

Retorno de la función useLocalStorage():

``` js:

return {
        item,
        saveItem,
        loading,
        error,
    }
```

* item: Estado de las tareas

* saveItem: Función felcha que determina la lógica de guardado en localStorage

* loading: Estado de carga de los componentes

* error: Estado de error de los componentes





archivo src/TodoContext/index.js:
(imagen de la ubicación del archivo)

``` js:
import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

    function TodoProvider({ children }) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(
        todo => !!todo.completed
    ).length;
    const totalTodos = todos.length;
    

    const searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        }
    );

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };
    
    return (
        <TodoContext.Provider value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
    }}>
    {children}
    </TodoContext.Provider>
);
}

export { TodoContext, TodoProvider };
```

importamos el componente useLocalStorage():

``` js:
import { useLocalStorage } from './useLocalStorage';
```


Asignamos la constante "TodoContext" a la API React.createContext(), lo que nos permitirá generar un objeto de contexto de props, con el cuál podremos nutrir de props a cualquier componente de nuestra aplicación, sin importar el orden jerárquico de componentes padres e hijos. (ver más adelante):

```js:
const TodoContext = React.createContext();
```


Función/componente TodoProvider():

``` js:
function TodoProvider({ children }) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(
        todo => !!todo.completed
    ).length;
    const totalTodos = todos.length;
    

    const searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        }
    );

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };
    
    return (
        <TodoContext.Provider value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
    }}>
    {children}
    </TodoContext.Provider>
);
}
```


Lo primero que vemos en la función es una constante de objetos con todos los valores generados (estados y props) en el archivo importado
./useLocalStorage.js, algunos de ellos se encuentran renombrados, como por ejemplo es el caso de la variable "item" renombrada por "todos". Todos ellos asignados al uso de localStorage("TODOS_V1, []"), bajo su sintaxis de propiedades: llave, valor.


Lógica de estados:

``` js:
    const [searchValue, setSearchValue] = React.useState('');
```

* Estado de valor de búsqueda (searchValue), con un string vacío como estado original.

```js:
    const [openModal, setOpenModal] = React.useState(false);
```

* Estado del modal (openModal), con "false" como estado original, escuchando el evento click en el componente <CreateTodoButton/>, se actualiza su
estado a "true"


Lógica de funciones:


función flecha "completedTodos", consumida en <TodoCounter/>

Props:

* completedTodos

* totalTodos

``` js:
    const completedTodos = todos.filter(
        todo => !!todo.completed
    ).length;
    const totalTodos = todos.length;
```
Aplicamos la propiedad .filter al array "todos" y por cada objeto del array:

1) Contabilizamos la cantidad de objetos que cuenten con la propiedad "completed", dentro del array.

2) Contabilizamos la cantidad de objetos que contenga el array.


función flecha "searchedTodos" consumida en <TodoSearch/>

```js:
    const searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        }
    );
```

Función flecha con la cuál aplicamos la propiedad .filter al array "todos" y por cada objeto del array:

1) Aplicamos la propiedad .toLowerCase(), a los valores alojados dentro de la propiedad "text" de nuestros objetos y los declaramos dentro de la variable "todoText"

2) Aplicamos la propiedad .toLowerCase(), al estado actual del estado "searchValue" y lo declaramos dentro de la variable "searchText"

3) Retornamos el resultado de aplicar la propiedad .includes a la variable "todoText" comparando el valor de la misma con el estado de "searchText". Si dicho parámetro coincide, la propiedad .includes nos devolverá un valor boolean "true" y podremos renderizar dicho resultado en pantalla.


Función flecha "addTodo" consumida en <TodoForm />

``` js:
    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false,
        });
        saveTodos(newTodos);
    };
```
1) Creamos la función flecha "addTodo" con "text" cómo parámetro de la misma.

2) Generamos la constante "newTodos" y declaramos cómo valor una copia del array "todos"

3) Pusheamos el objeto generado dentro de la constante newTodos, con dos propiedades "text" (parámetro de la función) e inicializamos su propiedad "completed" cómo "false"

4) Por ultimo retornamos un llamado a la función "saveTodos" (saveItem renombrada) y le pasamos cómo parámetro "newTodos"



Función flecha "completeTodo" consumida en 

``` js:
    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };
```


Return de la función TodoProvider():

Se determina a la constante TodoContext como componente (<TodoContext></TodoContext>) y añadimos la propiedad .Provider (<TodoContext.Provider></TodoContext.Provider>), lo cual nos permitirá asignar los valores de contexto que vamos a pasar a los demás componentes consumidores (<TodoContext.Provider value={{loading, error, completedTodos...}}>).
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











