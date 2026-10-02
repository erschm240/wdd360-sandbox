// My code
const pokemonList = document.querySelector("#pokemon-list");
const pokemonStats = document.querySelector("#pokemon-stats");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=24";

function pokemonListTemplate(item) {
    return `<li><button data-url="${item.url}">${item.name[0].toUpperCase() + item.name.slice(1)}</button></li>`;
}

function pokemonStatsTemplate(item) {
    return `
    <h2>${item.name[0].toUpperCase() + item.name.slice(1)}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
    `;
}

function displayPokemonList(pokemon) {
    const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
    pokemonList.insertAdjacentHTML('afterbegin', pokemonListHtml);
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function pokemonListHandler(event) {
    const pokemonUrl = event.target.dataset.url;
    const list = await getData(pokemonUrl);
    const statsHtml = pokemonStatsTemplate(list);
    pokemonStats.innerHTML = '';
    pokemonStats.insertAdjacentHTML('afterbegin', statsHtml);

}

async function init() {
    const data = await getData(apiUrl);
    const pokemonData = data.results;
    displayPokemonList(pokemonData);
}

pokemonList.addEventListener('click', pokemonListHandler);
init();