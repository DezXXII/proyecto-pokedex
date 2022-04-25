const pokemonContainer = document.querySelector('.pokemon-container');
const searchedPokemonContainer = document.querySelector('.searched-pokemon-container');

// Section: Fetching pokemons

async function fetchPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
    })
}

let offset = 1;
let limit = 9;

// Section: Pagination

const previousPaginationButton = document.querySelector('.prevBtn');
const nextPaginationButton = document.querySelector('.nextBtn');

window.onload = previousPaginationButton.setAttribute('disabled', 'disabled');
window.onload = previousPaginationButton.classList.add('disabled');

previousPaginationButton.addEventListener('click', (e) => {
    if (offset != 1) { 
        offset -= 10;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
})

nextPaginationButton.addEventListener('click', (e) => {
    offset += 10;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit);

    previousPaginationButton.style.display = "block";
    nextPaginationButton.textContent = "Next";

    previousPaginationButton.disabled = false;
    previousPaginationButton.classList.remove('disabled');
})

async function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        await fetchPokemon(i);
    }
}

// Section: Fetching pokemons by name

async function fetchPokemonByName(name) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => {
        searchedPokemon(data);
    })
}

let filteredPokemons = [];

const pokemonInput = document.querySelector('.pokemon-input')
const searchBar = document.querySelector('.search-bar')

searchBar.addEventListener('submit', (e) => {
    e.preventDefault()

    if(filteredPokemons.includes(pokemonInput.value.toLowerCase())) {
        alert('You already searched that pokemon');
    } else {
        fetchPokemonByName(pokemonInput.value.toLowerCase())
    }

    filteredPokemons.push(pokemonInput.value.toLowerCase())

    pokemonInput.value = '';
})

// Section: Deleting all pokemons

const btnDeletePokemons = document.querySelector('.btnDelete')

btnDeletePokemons.addEventListener('click', (e) => {
    e.preventDefault()
    filteredPokemons = []

    offset = -8;

    searchedPokemonContainer.innerHTML = '';
})

// Section: Creating the pokemon container based on the search bar result
function searchedPokemon(pokemon) {

    const searchedPokemonsLength = document.querySelector('.searched-pokemon-container').childElementCount;

    if(searchedPokemonsLength < 5) {

        // ******************************************************************************** //
        // Flip Card

        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container')

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
        cardBackTitle.classList.add('back-title')
        cardBackTitle.textContent = "Pokemon Stats";

        cardBack.classList.add('pokemon-block-back');
        cardBack.appendChild(cardBackTitle)
    
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
        searchedPokemonContainer.appendChild(flipCard);

        // ******************************************************************************** //
        // Stats

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');

        const typesContainer = document.createElement('div');
        typesContainer.classList.add('types');

        // ******************************************************************************** //
        // Stats (Types)

        const statType1 = document.createElement('p')
        statType1.textContent = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        
        const statType2 = document.createElement('p')
        if(pokemon.types.length < 1) {
            statType2.textContent = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
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

        // ******************************************************************************** //

        // Logos

    const bugLogo = document.createElement('img')
    bugLogo.classList.add('svg-image')
    bugLogo.src = 'img/bug.svg'

    const darkLogo = document.createElement('img')
    darkLogo.classList.add('svg-image')
    darkLogo.src = 'img/dark.svg'
    
    const dragonLogo = document.createElement('img')
    dragonLogo.classList.add('svg-image')
    dragonLogo.src = 'img/dragon.svg'

    const electricLogo = document.createElement('img')
    electricLogo.classList.add('svg-image')
    electricLogo.src = 'img/electric.svg'
    
    const fairyLogo = document.createElement('img')
    fairyLogo.classList.add('svg-image')
    fairyLogo.src = 'img/fairy.svg'
    
    const fightingLogo = document.createElement('img')
    fightingLogo.classList.add('svg-image')
    fightingLogo.src = 'img/fighting.svg'
    
    const fireLogo = document.createElement('img')
    fireLogo.classList.add('svg-image')
    fireLogo.src = 'img/fire.svg'
    
    const flyingLogo = document.createElement('img')
    flyingLogo.classList.add('svg-image')
    flyingLogo.src = 'img/dark.svg'
    
    const ghostLogo = document.createElement('img')
    ghostLogo.classList.add('svg-image')
    ghostLogo.src = 'img/ghost.svg'
    
    const grassLogo = document.createElement('img')
    grassLogo.classList.add('svg-image')
    grassLogo.src = 'img/grass.svg'
    
    const groundLogo = document.createElement('img')
    groundLogo.classList.add('svg-image')
    groundLogo.src = 'img/ground.svg'
    
    const iceLogo = document.createElement('img')
    iceLogo.classList.add('svg-image')
    iceLogo.src = 'img/ice.svg'
    
    const normalLogo = document.createElement('img')
    normalLogo.classList.add('svg-image')
    normalLogo.src = 'img/normal.svg'
    
    const poisonLogo = document.createElement('img')
    poisonLogo.classList.add('svg-image')
    poisonLogo.src = 'img/poison.svg'
    
    const psychicLogo = document.createElement('img')
    psychicLogo.classList.add('svg-image')
    psychicLogo.src = 'img/psychic.svg'
    
    const rockLogo = document.createElement('img')
    rockLogo.classList.add('svg-image')
    rockLogo.src = 'img/rock.svg'

    const steelLogo = document.createElement('img')
    steelLogo.classList.add('svg-image')
    steelLogo.src = 'img/steel.svg'
    
    const waterLogo = document.createElement('img')
    waterLogo.classList.add('svg-image')
    waterLogo.src = 'img/water.svg'

    const type1Container = document.createElement('div')
    type1Container.classList.add('type1')

    const type2Container = document.createElement('div')
    type2Container.classList.add('type2')
    
    switch (statType1.innerHTML) {
        case "Bug":
            type1Container.appendChild(bugLogo)
            break;
        case "Dark":
            type1Container.appendChild(darkLogo)
            break;
        case "Dragon":
            type1Container.appendChild(dragonLogo)
            break;
        case "Electric":
            type1Container.appendChild(electricLogo)
            break;
        case "Fairy":
            type1Container.appendChild(fairyLogo)
            break;
        case "Fighting":
            type1Container.appendChild(fightingLogo)
            break;
        case "Fire":
            type1Container.appendChild(fireLogo)
            break;
        case "Flying":
            type1Container.appendChild(flyingLogo)
            break;
        case "Ghost":
            type1Container.appendChild(ghostLogo)
            break;
        case "Grass":
            type1Container.appendChild(grassLogo)
            break;
        case "Ground":
            type1Container.appendChild(groundLogo)
            break;
        case "Ice":
            type1Container.appendChild(iceLogo)
            break;
        case "Normal":
            type1Container.appendChild(normalLogo)
            break;
        case "Poison":
            type1Container.appendChild(poisonLogo)
            break;
        case "Psychic":
            type1Container.appendChild(psychicLogo)
            break;
        case "Rock":
            type1Container.appendChild(rockLogo)
            break;
        case "Steel":
            type1Container.appendChild(steelLogo)
            break;
        case "Water":
            type1Container.appendChild(waterLogo)
            break;
        default:
            break;
    }

    switch (statType2.innerHTML) {
        case "Dark":
            type2Container.appendChild(darkLogo)
            break;
        case "Dragon":
            type2Container.appendChild(dragonLogo)
            break;
        case "Electric":
            type2Container.appendChild(electricLogo)
            break;
        case "Fairy":
            type2Container.appendChild(fairyLogo)
            break;
        case "Fighting":
            type2Container.appendChild(fightingLogo)
            break;
        case "Fire":
            type2Container.appendChild(fireLogo)
            break;
        case "Flying":
            type2Container.appendChild(flyingLogo)
            break;
        case "Ghost":
            type2Container.appendChild(ghostLogo)
            break;
        case "Grass":
            type2Container.appendChild(grassLogo)
            break;
        case "Ground":
            type2Container.appendChild(groundLogo)
            break;
        case "Ice":
            type2Container.appendChild(iceLogo)
            break;
        case "Normal":
            type2Container.appendChild(normalLogo)
            break;
        case "Poison":
            type2Container.appendChild(poisonLogo)
            break;
        case "Psychic":
            type2Container.appendChild(psychicLogo)
            break;
        case "Rock":
            type2Container.appendChild(rockLogo)
            break;
        case "Steel":
            type1Container.appendChild(steelLogo)
            break;
        case "Water":
            type2Container.appendChild(waterLogo)
            break;
        default:
            break;
    }

    // More containers...

    if (pokemon.types.length == 2) {
        typesContainer.appendChild(type1Container)
        typesContainer.appendChild(statType1)
        typesContainer.appendChild(type2Container)
        typesContainer.appendChild(statType2)
    } else if (pokemon.types.length == 1) {
        typesContainer.appendChild(type1Container)
        typesContainer.appendChild(statType1)
    }

    // ******************************************************************************** //
    // Stats Containers

    type1Container.appendChild(statType1)
    type2Container.appendChild(statType2)

    statsContainer.appendChild(statHp);
    statsContainer.appendChild(statAttack);
    statsContainer.appendChild(statDefense);
    statsContainer.appendChild(statSpecialAttack);
    statsContainer.appendChild(statSpecialDefense);
    statsContainer.appendChild(statSpeed);

    cardBack.appendChild(typesContainer);
    cardBack.appendChild(statsContainer);
        // Types Container

        if (pokemon.types.length == 2) {
            typesContainer.appendChild(type1Container)
            typesContainer.appendChild(statType1)
            typesContainer.appendChild(type2Container)
            typesContainer.appendChild(statType2)
        } else if (pokemon.types.length == 1) {
            typesContainer.appendChild(type1Container)
            typesContainer.appendChild(statType1)
        }
    
        // ******************************************************************************** //
        // Stats Containers
    
        type1Container.appendChild(statType1)
        type2Container.appendChild(statType2)
    
        statsContainer.appendChild(statHp);
        statsContainer.appendChild(statAttack);
        statsContainer.appendChild(statDefense);
        statsContainer.appendChild(statSpecialAttack);
        statsContainer.appendChild(statSpecialDefense);
        statsContainer.appendChild(statSpeed);
    
        cardBack.appendChild(typesContainer);
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
    cardBackTitle.classList.add('back-title')
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

    // ******************************************************************************** //
    // Stats (Types)

    const statType1 = document.createElement('p')
    statType1.textContent = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    
    const statType2 = document.createElement('p')
    if(pokemon.types.length > 1) {
        statType2.textContent = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
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

    // ******************************************************************************** //
    // Logos

    const bugLogo = document.createElement('img')
    bugLogo.classList.add('svg-image')
    bugLogo.src = 'img/bug.svg'

    const darkLogo = document.createElement('img')
    darkLogo.classList.add('svg-image')
    darkLogo.src = 'img/dark.svg'
    
    const dragonLogo = document.createElement('img')
    dragonLogo.classList.add('svg-image')
    dragonLogo.src = 'img/dragon.svg'

    const electricLogo = document.createElement('img')
    electricLogo.classList.add('svg-image')
    electricLogo.src = 'img/electric.svg'
    
    const fairyLogo = document.createElement('img')
    fairyLogo.classList.add('svg-image')
    fairyLogo.src = 'img/fairy.svg'
    
    const fightingLogo = document.createElement('img')
    fightingLogo.classList.add('svg-image')
    fightingLogo.src = 'img/fighting.svg'
    
    const fireLogo = document.createElement('img')
    fireLogo.classList.add('svg-image')
    fireLogo.src = 'img/fire.svg'
    
    const flyingLogo = document.createElement('img')
    flyingLogo.classList.add('svg-image')
    flyingLogo.src = 'img/dark.svg'
    
    const ghostLogo = document.createElement('img')
    ghostLogo.classList.add('svg-image')
    ghostLogo.src = 'img/ghost.svg'
    
    const grassLogo = document.createElement('img')
    grassLogo.classList.add('svg-image')
    grassLogo.src = 'img/grass.svg'
    
    const groundLogo = document.createElement('img')
    groundLogo.classList.add('svg-image')
    groundLogo.src = 'img/ground.svg'
    
    const iceLogo = document.createElement('img')
    iceLogo.classList.add('svg-image')
    iceLogo.src = 'img/ice.svg'
    
    const normalLogo = document.createElement('img')
    normalLogo.classList.add('svg-image')
    normalLogo.src = 'img/normal.svg'
    
    const poisonLogo = document.createElement('img')
    poisonLogo.classList.add('svg-image')
    poisonLogo.src = 'img/poison.svg'
    
    const psychicLogo = document.createElement('img')
    psychicLogo.classList.add('svg-image')
    psychicLogo.src = 'img/psychic.svg'
    
    const rockLogo = document.createElement('img')
    rockLogo.classList.add('svg-image')
    rockLogo.src = 'img/rock.svg'

    const steelLogo = document.createElement('img')
    steelLogo.classList.add('svg-image')
    steelLogo.src = 'img/steel.svg'
    
    const waterLogo = document.createElement('img')
    waterLogo.classList.add('svg-image')
    waterLogo.src = 'img/water.svg'

    const type1Container = document.createElement('div')
    type1Container.classList.add('type1')

    const type2Container = document.createElement('div')
    type2Container.classList.add('type2')
    
    switch (statType1.innerHTML) {
        case "Bug":
            type1Container.appendChild(bugLogo)
            break;
        case "Dark":
            type1Container.appendChild(darkLogo)
            break;
        case "Dragon":
            type1Container.appendChild(dragonLogo)
            break;
        case "Electric":
            type1Container.appendChild(electricLogo)
            break;
        case "Fairy":
            type1Container.appendChild(fairyLogo)
            break;
        case "Fighting":
            type1Container.appendChild(fightingLogo)
            break;
        case "Fire":
            type1Container.appendChild(fireLogo)
            break;
        case "Flying":
            type1Container.appendChild(flyingLogo)
            break;
        case "Ghost":
            type1Container.appendChild(ghostLogo)
            break;
        case "Grass":
            type1Container.appendChild(grassLogo)
            break;
        case "Ground":
            type1Container.appendChild(groundLogo)
            break;
        case "Ice":
            type1Container.appendChild(iceLogo)
            break;
        case "Normal":
            type1Container.appendChild(normalLogo)
            break;
        case "Poison":
            type1Container.appendChild(poisonLogo)
            break;
        case "Psychic":
            type1Container.appendChild(psychicLogo)
            break;
        case "Rock":
            type1Container.appendChild(rockLogo)
            break;
        case "Steel":
            type1Container.appendChild(steelLogo)
            break;
        case "Water":
            type1Container.appendChild(waterLogo)
            break;
        default:
            break;
    }

    switch (statType2.innerHTML) {
        case "Bug":
            type1Container.appendChild(bugLogo)
            break;
        case "Dark":
            type2Container.appendChild(darkLogo)
            break;
        case "Dragon":
            type2Container.appendChild(dragonLogo)
            break;
        case "Electric":
            type2Container.appendChild(electricLogo)
            break;
        case "Fairy":
            type2Container.appendChild(fairyLogo)
            break;
        case "Fighting":
            type2Container.appendChild(fightingLogo)
            break;
        case "Fire":
            type2Container.appendChild(fireLogo)
            break;
        case "Flying":
            type2Container.appendChild(flyingLogo)
            break;
        case "Ghost":
            type2Container.appendChild(ghostLogo)
            break;
        case "Grass":
            type2Container.appendChild(grassLogo)
            break;
        case "Ground":
            type2Container.appendChild(groundLogo)
            break;
        case "Ice":
            type2Container.appendChild(iceLogo)
            break;
        case "Normal":
            type2Container.appendChild(normalLogo)
            break;
        case "Poison":
            type2Container.appendChild(poisonLogo)
            break;
        case "Psychic":
            type2Container.appendChild(psychicLogo)
            break;
        case "Rock":
            type2Container.appendChild(rockLogo)
            break;
        case "Steel":
            type2Container.appendChild(steelLogo)
            break;
        case "Water":
            type2Container.appendChild(waterLogo)
            break;
        default:
            break;
    }

    // More containers...

    if (pokemon.types.length == 2) {
        typesContainer.appendChild(type1Container)
        typesContainer.appendChild(statType1)
        typesContainer.appendChild(type2Container)
        typesContainer.appendChild(statType2)
    } else if (pokemon.types.length == 1) {
        typesContainer.appendChild(type1Container)
        typesContainer.appendChild(statType1)
    }

    // ******************************************************************************** //
    // Stats Containers

    type1Container.appendChild(statType1)
    type2Container.appendChild(statType2)

    statsContainer.appendChild(statHp);
    statsContainer.appendChild(statAttack);
    statsContainer.appendChild(statDefense);
    statsContainer.appendChild(statSpecialAttack);
    statsContainer.appendChild(statSpecialDefense);
    statsContainer.appendChild(statSpeed);

    cardBack.appendChild(typesContainer);
    cardBack.appendChild(statsContainer);
}

// Pagination related function
function removeChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

// Fetching initial pokemons and pagination related
fetchPokemons(offset, limit);