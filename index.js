//Recibe argumentos, los procesa y delega las acciones a pelis.js

const peliculas = require("./pelis");


function main() {

  const argumentos = process.argv;
  
  const objeto = peliculas.parsearArgumentos(argumentos);
  // console.log(objeto);

  if (Object.keys(objeto).length === 0) {
    const busquedaPelis = peliculas.getAll();
    console.table(busquedaPelis);
  } else if (objeto.sort) {
    const peliOrdenada = peliculas.getSort(objeto);
    console.table(peliOrdenada);
  } else if (objeto.search) {
    const peliPorTitulo = peliculas.getSearch(objeto);
    console.table(peliPorTitulo);
  } else if (objeto.tag) {
    const peliPorTag = peliculas.getTag(objeto);
    console.table(peliPorTag);
  } else {
    console.log("El argumento no es correcto, vuelva a ingresarlo.");
  }
}

main();