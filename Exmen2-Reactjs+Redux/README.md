# M2 - Checkpoint | Henry Palloza

## 🛑 **Aclaraciones IMPORTANTES**

En este checkpoint vamos a utilizar un Back-End que fue creado con _json-server_. Es **IMPORTANTE** que cumplas con estas aclaraciones. Caso contrario, ¡puede haber problemas con los tests!

-  En este CheckPoint te indicaremos cuándo tengas que usar un componente **funcional** y cuándo **de clase**. Presta atención a las indicaciones.

-  En caso de que utilices hooks de react, deberás escribirlos de la siguiente forma:

        React.useState | React.useEffect

-  Es importante que leas todos los comentarios para saber dónde puedes usar hooks y donde no.

</br>

## 📌 **Objetivos de la app**

Construirás una página con información de eventos relacionados a la música (¡como los eventos lollapalooza que se celebra todos los años!). La app dispondrá de una página principal donde vamos a poder ver los eventos, mostrando su imágen, nombre, banda y precio. Tambien habrá un botón para eliminar un evento.

Al hacer click en el evento, deberá llevarnos al detalle de su banda ("BandDetail"), donde tendremos el nombre, la descripción, el precio. Como bien mencionamos en las aclaraciones, dispondrán de un Back-End ya creado con _json-server_.

Esta librería nos permite crear una _API REST_ con tan solo un archivo json. Lo utilizaremos de forma tal que tengas que realizar una conexión Back-Front utilizando "**_fetch_**" o "**_axios_**" (ya viene instalado).

El objetivo de este CheckPoint es prepararte para la instancia del Proyecto Individual (PI). Así, podrás "volver" a este CheckPoint y utilizarlo como referencia. Recuerda que puedes revisar las homeworks y el contenido teórico que se dió durante todo el módulo.

La app va a contar con tres rutas:

-  **'/'** : nuestra Home donde se van a ver todos las bandas de los eventos.
-  **'/band/:id'** : el detalle de la banda.
-  **'/band/create'** : el formulario de creación de una banda.

</br>

### Para comenzar:

`npm install`

`npm test` (para correr los tests. Puedes pasarle como argumento el nombre del test a correr, por ejemplo: `npm test App` va a correr solamente los tests del archivo App, o simplemente el numero del test `npm test 01`)

Si queres levantar la app y ver cómo va la página lo puedes hacer con:

-  `npm start` para levantar el Front.
-  `npm run server` para levantar nuestro Back-End.

> Recordá que para aprobar solo tienen que pasar los tests.

</br>

## 🔎 **React - Redux**

Vas a trabajar en los siguientes archivos (cada archivo tiene su archivo de test correspondiente). Para el desarrollo de esta aplicación, te recomendamos seguir este camino:

1. App.js
2. components/Nav/Nav.jsx
3. redux/actions/index.js
4. redux/reducer/index.js
5. components/Home/Home.jsx
6. components/CreateBand/CreateBand.jsx
7. components/BandCard/BandCard.jsx
8. components/BandDetail/BandDetail.jsx

Tendrás que leer **cada archivo test por componente**, y sus descripciónes para avanzar.

</br>

## ✅ **Condiciones de aprobación**

Para aprobar deberán completar al menos **_6_** de los **_8_** testsuite que se encuentran en el CheckPoint.

> Lee bien los tests y lo que piden. Sobre todo los detalles.

> Esta aplicacion esta pensada para que pasen los tests y que tenga la funcionalidad que buscamos. Los estilos son muy simples. Por favor, enfócate primero en pasar los test y luego te invitamos a que le des los estilos que te gusten!

![Hombre Sufriendo](https://media.tenor.com/xqhHM6bEigUAAAAM/frustrating-work.gif)

</br >

---

## **✅ FEEDBACK**

### Usa este [**formulario**](https://docs.google.com/forms/d/e/1FAIpQLSfHGK9eRc7N8_qhiOQP9CNkUUNOxwhguf1k9aozP0xJme1-TQ/viewform) para reportar tus observaciones de mejora o errores. Tu feedback es muy importante para seguir mejorando el modelo educativo.
