Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

async function getPokemonData(id) {
    if(!id) {
        id = Math.floor(Math.random() * 151) + 1; //Kanto Pokemon
    }
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(async (data) => {
            let stats = "";
            let types = "";
            data.types.forEach((type) => {
                types += `<span class="pokemon__type__pill" data-type="${type.type.name}">${type.type.name.capitalize()}</span>`;
            });

            data.stats.forEach((stat) => {
                stats += `<tr><td>${stat.stat.name.capitalize()}</td><td>: ${stat.base_stat}</td></tr>`;
            });
            
            let element = `
            <article class="card">
                <div class="card__body">
                    <div class="pokemon__sprite">
                        <img class="pokemon__sprite__img" src="https://cdn.traction.one/pokedex/pokemon/${data.id}.png">
                    </div>
                    <div class="card__body__detail">
                        <h2 class="pokemon__title">
                        #${data.id} ${data.name.replace("-m", "♂").replace("-f", "♀").capitalize()}

                        <a href="https://bulbapedia.bulbagarden.net/wiki/${data.name.replace("-m", "♂").replace("-f", "♀").capitalize()}_(Pok%C3%A9mon)" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                        </h2>
                        
                        <div class="pokemon__type">
                            ${types}
                        </div>
                        <div class="pokemon__stats">
                            <table>
                                ${stats}
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card__footer">
                    <button class="button__primary" onclick="getPokemonData()" id="getPokemon">Find Another Buddy</button>
                </div>
            </article>`;

            document.getElementById("content").innerHTML = element;
        });
}

getPokemonData(1);

// const btnGetPokemon = document.getElementById('getPokemon');

// btnGetPokemon.onclick = async function () {
//     await getPokemonData();
// }