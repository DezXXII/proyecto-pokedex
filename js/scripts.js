const pokemonContainer = document.querySelector('.pokemon-container');
const searchedPokemonContainer = document.querySelector('.searched-pokemon-container');

// Section: Fetching pokemons

async function fetchPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        pokemons.push(data.name);
        console.log(data)
    })
}

let offset = 1;
let limit = 9;

// Section: Pagination

const previousPaginationButton = document.querySelector('.prevBtn');
const nextPaginationButton = document.querySelector('.nextBtn');

previousPaginationButton.addEventListener('click', (e) => {
    if (offset != 1) { 
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
})

nextPaginationButton.addEventListener('click', (e) => {
    offset += 9;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit);

    previousPaginationButton.style.display = "block";
    nextPaginationButton.textContent = "Next";
})

function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

// Section: Fetching pokemons by name

async function fetchPokemonByName(name) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => {
        searchedPokemon(data);
        pokemons.push(data.name);
    })
}

let pokemons = [];

const pokemonInput = document.querySelector('.pokemon-input')
const searchBar = document.querySelector('.search-bar')

searchBar.addEventListener('submit', (e) => {
    e.preventDefault()

    if(pokemons.includes(pokemonInput.value.toLowerCase())) {
        alert('That pokemon is already on the screen');
    } else {
        fetchPokemonByName(pokemonInput.value.toLowerCase())
    }

    pokemonInput.value = '';
})

// Section: Deleting all pokemons

const btnDeletePokemons = document.querySelector('.btnDelete')

btnDeletePokemons.addEventListener('click', (e) => {
    e.preventDefault()
    pokemons = []

    offset = -8;

    searchedPokemonContainer.innerHTML = '';
})

// Section: Creating the pokemon container based on the search bar result



function searchedPokemon(pokemon) {

    const searchedPokemonsLength = document.querySelector('.searched-pokemon-container').childElementCount;

    if(searchedPokemonsLength < 5) {
        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container')

        flipCard.appendChild(cardContainer);

        const card = document.createElement('div')
        card.classList.add('pokemon-block');
    
        const spriteContainer = document.createElement('div')
        spriteContainer.classList.add('img-container');
    
        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.other.home.front_default;
    
        spriteContainer.appendChild(sprite);
    
        const number = document.createElement('p');
        number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
    
        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
        card.appendChild(spriteContainer);
        card.appendChild(number);
        card.appendChild(name);

        const cardBack = document.createElement('div');

        const cardBackTitle = document.createElement('p');
        cardBackTitle.textContent = "Pokemon Stats";

        cardBack.classList.add('pokemon-block-back');
        cardBack.appendChild(cardBackTitle)
    
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
        searchedPokemonContainer.appendChild(flipCard);

        // Stats

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');

        const statType1 = document.createElement('p')
        statType1.textContent = 'Tipo: ' + pokemon.types[0].type.name;
        
        const statType2 = document.createElement('p')

        if(pokemon.types.length > 1) {
            statType2.textContent = 'Tipo: ' + pokemon.types[1].type.name;
        }

        const statHp = document.createElement('p')
        statHp.textContent = 'HP: ' + pokemon.stats[0].base_stat;

        // const statAttack = document.createElement('p')
        // statAttack.textContent = 'Attack: ' +

        // const statDefense = document.createElement('p')
        // statDefense.textContent = 'Defense: ' +

        // const statSpecialAttack = document.createElement('p')
        // statSpecialAttack.textContent = 'Special Attack: ' +

        // const statSpecialDefense = document.createElement('p')
        // statSpecialDefense = 'Special Defense: ' + 

        // const statSpeed = document.createElement('p')
        // statSpeed.textContent = 'Speed: ' + 

        statsContainer.appendChild(statType1)
        statsContainer.appendChild(statType2)
        statsContainer.appendChild(statHp);

        cardBack.appendChild(statsContainer);
    }
}

// Section: Creating the pokemons containers with their corresponding data

function createPokemon(pokemon) {

    // ******************************************************************************** //
    // Flip Card

    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);

    // ******************************************************************************** //
    // Creating the container

    const card = document.createElement('div')
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.other.home.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    // ******************************************************************************** //
    // Back Card

    const cardBack = document.createElement('div');

    const cardBackTitle = document.createElement('p');
    cardBackTitle.textContent = "Pokemon Stats";

    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(cardBackTitle)

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);

    // ******************************************************************************** //
    // Stats

    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats');

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types');

    // Stats (Types)

    const statType1 = document.createElement('p')
    statType1.textContent = pokemon.types[0].type.name;
    
    const statType2 = document.createElement('p')

    if(pokemon.types.length > 1) {
        statType2.textContent = pokemon.types[1].type.name;
    }

    // ******************************************************************************** //
    // Stats (Stats)

    const statHp = document.createElement('p')
    statHp.textContent = 'HP: ' + pokemon.stats[0].base_stat;

    const statAttack = document.createElement('p')
    statAttack.textContent = 'Attack: ' + pokemon.stats[1].base_stat;

    const statDefense = document.createElement('p')
    statDefense.textContent = 'Defense: ' + pokemon.stats[2].base_stat;

    const statSpecialAttack = document.createElement('p')
    statSpecialAttack.textContent = 'Special Attack: ' + pokemon.stats[3].base_stat;

    const statSpecialDefense = document.createElement('p')
    statSpecialDefense.textContent = 'Special Defense: ' + pokemon.stats[4].base_stat;

    const statSpeed = document.createElement('p')
    statSpeed.textContent = 'Speed: ' + pokemon.stats[5].base_stat;

    // Types Container

    typesContainer.appendChild(statType1)
    typesContainer.appendChild(statType2)

    // Stats Container

    statsContainer.appendChild(statHp);
    statsContainer.appendChild(statAttack);
    statsContainer.appendChild(statDefense);
    statsContainer.appendChild(statSpecialAttack);
    statsContainer.appendChild(statSpecialDefense);
    statsContainer.appendChild(statSpeed);

    cardBack.appendChild(typesContainer);
    cardBack.appendChild(statsContainer);
}

function removeChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

fetchPokemons(offset, limit);