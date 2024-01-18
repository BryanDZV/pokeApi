
//SELECTORES
let pokemonLink = `https://pokeapi.co/api/v2/pokemon?offset=1&limit=150`;
let body$ = document.querySelector("body");
let main$ = document.querySelector("main");
let header$ = document.querySelector("header");

//CREATE
let titulo$ = document.createElement("img");
titulo$.setAttribute("src", `recursos/imagenes/titu.png`);
titulo$.setAttribute("alt", `Es pokemon`);
titulo$.classList.add("imagen-titulo");
header$.appendChild(titulo$);

//creando input
let buscadorInput$ = document.createElement("input");
buscadorInput$.setAttribute("type", "text");
buscadorInput$.setAttribute("placeholder", "Buscar Pokémon...");
header$.appendChild(buscadorInput$);

// Función para filtrar por nombre
function filtrarPorNombre(pokemonMapeo, filtro) {
  let resultado = pokemonMapeo.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(filtro)
  );
  main$.innerHTML = ""; // Limpiar el contenido actual antes de mostrar los nuevos resultados
  pintarPokemon(resultado);
}

//navegador
let divNav$ = document.createElement("div");
divNav$.setAttribute("id", `myTopNav`);
divNav$.setAttribute("class", "nav");
header$.appendChild(divNav$);
let fuego$ = document.createElement("a");
fuego$.setAttribute("href", `#tipo`);
fuego$.setAttribute("class", "active");
fuego$.textContent = "fuego";
let agua$ = document.createElement("a");
agua$.setAttribute("href", `#tipo`);
agua$.setAttribute("class", "active");
agua$.textContent = "agua";
let bicho$ = document.createElement("a");
bicho$.setAttribute("href", `#tipo`);
bicho$.setAttribute("class", "active");
bicho$.textContent = "bicho";
let volador$ = document.createElement("a");
volador$.setAttribute("href", `#tipo`);
volador$.setAttribute("class", "active");
volador$.textContent = "vuelo";
let peso$ = document.createElement("a");
peso$.setAttribute("href", `#peso`);
peso$.setAttribute("class", "active");
peso$.textContent = "peso";
let a2$ = document.createElement("a");

//funcion navegar
a2$.addEventListener(
  "click",
  (navegador = () => {
    let resporNavegador = document.querySelector("#myTopNav");
    if (resporNavegador.className === "nav") {
      resporNavegador.className += " responsive";
    } else {
      resporNavegador.className = "nav";
    }
  })
);

a2$.setAttribute("href", `javascript:void(0)`);
a2$.setAttribute("class", "icon");
let i$ = document.createElement("i");
i$.setAttribute("class", "fa fa-bars");
a2$.appendChild(i$);

divNav$.appendChild(fuego$);
divNav$.appendChild(agua$);
divNav$.appendChild(bicho$);
divNav$.appendChild(volador$);

divNav$.appendChild(peso$);
divNav$.appendChild(a2$);
//funcion navegar
//(si controlo un listener desde funcion esta siempre va antes )
/*let navegador = () => {
  let resporNavegador = document.querySelector("#myTopNav");
  if (resporNavegador.className === "nav") {
    resporNavegador.className += " responsive";
  } else {
    resporNavegador.className = "nav";
  }
};
a2$.addEventListener("click",navegador)*/

//funcion obtener datos
let getDatos = async () => {
  let respuesta = await fetch(`${pokemonLink}`);
  let resjson = await respuesta.json();
  //console.log(resjson);
  let detallesPokemon = []; // Almacena los detalles de los Pokémon si no al hacer el return termina el bucle y solo me da 1 pokemon

  for (let iteracion = 0; iteracion < resjson.results.length; iteracion++) {
    const elemento = resjson.results[iteracion];
    //console.log(elemento);
    if (elemento.url) {
      let detalles = await fetch(elemento.url);
      let resDetalles = await detalles.json();
      //console.log("soy la funcion obtener datos", resDetalles);
      detallesPokemon.push(resDetalles); // Almacena los detalles de cada Pokémon en el array
    }
  }
  return detallesPokemon;
};
//funcion Mapeo
let mapeoPokemon = (inicio) => {
  let resultado = inicio.map((elemento) => ({
    nombre: elemento.name,
    numeroId: elemento.id,
    habilidad: elemento.abilities[0].ability.name,
    tipo: elemento.types
      .map((elementoTipo) => elementoTipo.type.name)
      .join(", "), //el join convierte en string con separador de comas un array de elementos
    peso: elemento.weight,
    foto: elemento.sprites.other.home.front_default,
  }));
  //console.log("estoy mapeando:", resultado);
  return resultado;
};


// Función para voltear la tarjeta
function voltearTarjeta(tarjeta) {
  tarjeta.classList.add('volteada');
}
// Nueva función para revertir la tarjeta
function revertirTarjeta(tarjeta) {
  tarjeta.classList.remove('volteada');
}
// FUNCION Pintar cada pokemon
let pintarPokemon = (pokemonMapeo) => {
  for (const iteracion of pokemonMapeo) {
    let div$ = document.createElement("div");
    main$.appendChild(div$);
    let nombreTitulo$ = document.createElement("h1");
    nombreTitulo$.textContent = `${iteracion.nombre}`;
    let parrafoId$ = document.createElement("p");
    parrafoId$.textContent = `Id: ${iteracion.numeroId}`;
    let habilidad$ = document.createElement("p");
    habilidad$.textContent = `Habilidad: ${iteracion.habilidad}`;
    let tipo$ = document.createElement("p");
    tipo$.textContent = `Tipo: ${iteracion.tipo}`;
    let peso$ = document.createElement("p");
    peso$.textContent = `Peso: ${iteracion.peso} gramos`;
    //abajo creo elemento dom imagen
    let foto$ = document.createElement("img");
    foto$.setAttribute("src", `${iteracion.foto}`);
    foto$.setAttribute("alt", `Es una foto`);
    foto$.classList.add("imagen-pokemon");
    // Crear tarjeta para cada Pokémon cara frontal
    let tarjeta$ = document.createElement("div");
    tarjeta$.classList.add("tarjeta");
    tarjeta$.id = "miTarjeta";

    // Cara trasera de la tarjeta (información o historia del Pokémon)
    let caraDetras = document.createElement("div");
    caraDetras.classList.add("cara-detras");

    let parrafoHistoria = document.createElement("p");
    parrafoHistoria.textContent = "Historia del Pokémon...";
    caraDetras.appendChild(parrafoHistoria);
    // Agregar evento click a la imagen dentro del bucle
    foto$.addEventListener("click", () => {
      // Agrega la clase 'volteada' para girar la tarjeta
      tarjeta$.classList.add('volteada');
    });
    // Agregar evento click a la imagen dentro del bucle
    caraDetras.addEventListener("click", () => {
      // Quita la clase 'volteada' para girar la tarjeta
      tarjeta$.classList.remove('volteada');
    });
    


    //appen aqui segun el orden que coloques aprece en la web
    tarjeta$.appendChild(caraDetras);
    tarjeta$.appendChild(foto$);
    div$.appendChild(nombreTitulo$);
    div$.appendChild(parrafoId$);
    caraDetras.appendChild(habilidad$);
    caraDetras.appendChild(tipo$);
    caraDetras.appendChild(peso$);
    div$.appendChild(tarjeta$);
  }
};
//funcion filtrar por tipo
let filtrarTipo = (pokemonMapeo, tipo) => {
  let filtro = pokemonMapeo.filter((elemento) => elemento.tipo.includes(tipo));
  main$.innerHTML = ""; // Limpiar el contenido actual antes de mostrar los nuevos resultados
  pintarPokemon(filtro); // con esto me pinta pero solo los pokemon filtrados
};
let filtrarPeso = (pokemonMapeo) => {
  let pokemonOrdenadosPorPeso = pokemonMapeo.sort((a, b) => b.peso - a.peso); // Ordena los Pokémon por peso de mayor a menor
  let pokemonMasPesados = pokemonOrdenadosPorPeso.slice(0, 7); // Obtiene los primeros 7 Pokémon más pesados
  main$.innerHTML = ""; // Limpiar el contenido actual antes de mostrar los nuevos resultados
  pintarPokemon(pokemonMasPesados); // Pinta los 7 Pokémon más pesados
};
//funcion incio
let init = async () => {
  let inicio = await getDatos();
  let pokemonMapeo = mapeoPokemon(inicio);
  let pokemonPintar = pintarPokemon(pokemonMapeo);

  //llamdas de tipo pokemon
  fuego$.addEventListener("click", () => {
    filtrarTipo(pokemonMapeo, "fire"); // dentro de init Llama a la función de filtrado con el tipo de fuego despues de las demas funciones
  });
  agua$.addEventListener("click", () => {
    filtrarTipo(pokemonMapeo, "water"); // dentro de init Llama a la función de filtrado con el tipo de fuego despues de las demas funciones
  });
  volador$.addEventListener("click", () => {
    filtrarTipo(pokemonMapeo, "flying"); // dentro de init Llama a la función de filtrado con el tipo de fuego despues de las demas funciones
  });
  bicho$.addEventListener("click", () => {
    filtrarTipo(pokemonMapeo, "bug"); // dentro de init Llama a la función de filtrado con el tipo de fuego despues de las demas funciones
  });
  peso$.addEventListener("click", () => {
    filtrarPeso(pokemonMapeo, "peso");
  });

  buscadorInput$.addEventListener("input", () => {
    filtrarPorNombre(pokemonMapeo, buscadorInput$.value.toLowerCase());
  });
};


init();
