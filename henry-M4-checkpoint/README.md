# Henry

## Recursos

Exceptuando tu _código escrito_ (de workshops / checkpoints / proyectos que hayas hecho, o librerías / soluciones), tenes permitido usar cualquier recurso que quieras. Eso incluye documencación e _instrucciones_ de workshops.

Asegurate de completar los specs que estan en los siguientes archivos:

`tests/01-react/react-tests.js`

`tests/02-backend/backend-tests.js`

`tests/03-js/flatline-test.js`

#### Este es el orden recomendado en el cual completes cada test, sin embargo, no son dependientes uno del otro! Si te trabás o querés trabajar en un orden diferente deberías ser capáz.

## Comenzando

**Forkea** y clona este repositorio. Corre `npm install`, y luego ejecutá lo siguiente para correr todos los tests:

```bash
npm test
```

Para correr un conjunto de tests _específicos_, podes opcionalmente hacer cualquiera de los siguientes comandos:

```bash
npm run server-test
npm run react-test
npm run js-test
npm run extra-credit
```

Para solo correr un `describe` o `it`, podés también encadenar un `.only`:

```js
it.only('Hace algo', testFunc);
```

## Credito Extra

Para los valientes, el extra crédito (implementar `Promise.map`) esta disponible en `tests/04-extra-credit`. Correlo con `npm run extra-credit`.

## Entrega

1. `git add -A`
2. `git commit -m 'entrega final'`
3. `git push origin master`
