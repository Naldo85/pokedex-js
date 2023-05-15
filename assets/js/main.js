const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="window.location.href='poke-about.html?id=${pokemon.number}'">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.nome}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.nome}">
                    
                </div>
                
            </li>
            
    
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit
    const qtdRecordsNexPage = offset + limit

    if (qtdRecordsNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})




