const pokemonContainer = document.querySelector('.pokemon-container');

let pokemons = []

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        pokemons.push(data.name);
    })
}

function fetchPokemonByName(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        pokemons.push(data.name);
    })
}

const pokemonInput = document.querySelector('.pokemon-input')
const pokemonInputValue = document.querySelector('.pokemon-input').value
const searchBar = document.querySelector('.search-bar')

searchBar.addEventListener('submit', (e) => {
    e.preventDefault()

    if(pokemons.includes(pokemonInput.value.toLowerCase())) {
        alert('Ese pokemon ya está en pantalla');
    } else {
        fetchPokemonByName(pokemonInput.value.toLowerCase())
    }
})

const btnDeletePokemons = document.querySelector('.btnDelete')

btnDeletePokemons.addEventListener('click', (e) => {
    e.preventDefault()
    pokemons = []

    const pokemonContainer = document.querySelector('.pokemon-container')
    pokemonContainer.innerHTML = '';
})


function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div')
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}

fetchPokemons(20)