//Tiene que leer el archivo JSON y exponer funciones para interactuar con los datos.
const fs = require('fs');


function getPelis() {
  const archivoPelis = fs.readFileSync(__dirname + "/pelis.json");
  const objetoPelis = JSON.parse(archivoPelis);
  return objetoPelis;
};

exports.parsearArgumentos = function(argv) {
  const argumentosSinGuion = {};
  argv.forEach(function (item, i) {
    if (item.startsWith("--")) {
      const argumento = item.slice(2);
      argumentosSinGuion[argumento] = argv[i + 1];
    }
  });
  // console.log(argumentosSinGuion);
  return argumentosSinGuion;
}


exports.getAll = function(parsearArgumentos) {
  const peliculas = getPelis();
  console.log("Todas las peliculas son: ");
  return peliculas
};

exports.getSort = function(parsearArgumentos) {
  const peliculas = getPelis();

  let pelisOrdenada = {};
  if (parsearArgumentos["sort"] === 'title') {
    console.log("Peliculas ordenadas según su título: ");
    pelisOrdenada = peliculas.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    // console.log(pelisOrdenada);
  } else if (parsearArgumentos["sort"] === 'rating') {
    console.log("Peliculas ordenas según su rating: ");
    pelisOrdenada = peliculas.sort((b, a) => a.rating - b.rating);
  } else if (parsearArgumentos["sort"] === 'tags') {
    console.log("Peliculas ordenas según su tags: ");
    pelisOrdenada = peliculas.sort((b, a) => a.tags.length - b.tags.length);
  }
  return pelisOrdenada;
}

exports.getSearch = function(parsearArgumentos) {
  const peliculas = getPelis();
  // console.table(peliculas);
  const wordBuscada = parsearArgumentos.search;
  // console.log(wordBuscada.length);
  console.log("Peliculas filtradas según la palabra indicada: " + wordBuscada);
  const peliFiltrada = peliculas.filter((peli) => peli.title.toLowerCase().includes(wordBuscada)); 
  return peliFiltrada;
}

exports.getTag = function(parsearArgumentos) {
  const peliculas = getPelis();
  const wordBuscada = parsearArgumentos.tag.toLowerCase();
  // console.log(wordBuscada);
  console.log("Peliculas filtradas según su tags: " + wordBuscada);
  const peliFiltrada = peliculas.filter((peli) => peli.tags.includes(wordBuscada));
  return peliFiltrada;
}
