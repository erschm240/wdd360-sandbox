// TypeScript file for the Typescript Introduction activity by Emma Schmitz

const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  url: string;
}

interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

function pokemonListTemplate(item: Pokemon) {
    return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item: Pokemon) {
    return `
    <h2>${item.name}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
    `;
    }

function renderPokemonList(pokemon: Pokemon[]) {
    const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
    pokemonList?.insertAdjacentHTML('afterbegin', pokemonListHtml);
}

async function getData(url: string) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function pokeListHandler(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    const pokemonUrl = target.dataset.url;

    if (!pokemonUrl) {
      console.error('No URL found on the target element.');
      return;
    }

    try {
      const list = await getData(pokemonUrl);
      const detailsHtml = pokemonDetailsTemplate(list);
      if (pokemonDetails) {
        pokemonDetails.innerHTML = '';
        pokemonDetails.insertAdjacentHTML('afterbegin', detailsHtml);
      } else {
        throw new Error('Output element not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

async function init() {
    const data = await getData(apiUrl);
    const pokemon = data.results;
    renderPokemonList(pokemon);
}

pokemonList?.addEventListener('click', pokeListHandler);
init();