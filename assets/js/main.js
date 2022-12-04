const pokemon_list_id = document.getElementById('pokemonList');
const limit = 8;
let offset = 0;

const max_records = 152;
const max_width = 55;

function load_more_pokemons(offset, limit) {
	function convert_pokemon_to_html(pokemon) {
		return `<li class="pokemon ${pokemon.type}">
					<div class"main">
						<span class="name">${pokemon.name}</span>
						<span class="number">#${pokemon.id}</span>
					</div>
					<ol class="types">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}" alt="">
						<div class="weakness">
							Weak to
							<ol class="types">
								${pokemon.weakness.map((weak) => `<li class=${weak}>${weak}</li>`).join('')}
							</ol
						</div>
				</li>`;
	}

	poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
		pokemon_list_id.innerHTML += pokemons.map(convert_pokemon_to_html).join('');
	})
}

load_more_pokemons(offset, limit);

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		offset += limit;
		if (offset <= max_records) {
			load_more_pokemons(offset, limit);
		}
    }
};