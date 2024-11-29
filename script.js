const inputField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pkmnName = document.getElementById("pokemon-name");
const pkmnId = document.getElementById("pokemon-id");
const pkmnWeight = document.getElementById("weight");
const pkmnHeight = document.getElementById("height");
const pkmnSprite = document.getElementById("default-sprite");
const pkmnShinySprite = document.getElementById("shiny-sprite");
const pkmnTypes = document.getElementById("types");
const pkmnHp = document.getElementById("hp");
const pkmnAtk = document.getElementById("attack");
const pkmnDef = document.getElementById("defense");
const pkmnSpcAtk = document.getElementById("special-attack");
const pkmnSpcDef = document.getElementById("special-defense");
const pkmnSpd = document.getElementById("speed");


const fetchAllValidPkmn = async (endPoint) => {
  try {
      const res = await fetch(endPoint);
      const data = await res.json();
      
      showAllValidPkmn(data);
    } catch (ex) {
      console.log(ex)
    }
};

const showAllValidPkmn = (data) => {
    const {results} = data;
    results.map((item) => {
      const {id, name, url} = item;
      console.log(id, name, url)
    });
};

const fetchSearchData = async (endPoint) => {

    try {
      const res = await fetch(endPoint.concat(inputField.value.toLowerCase()));
      const data = await res.json();

      showSearchResult(data);
    } catch (ex) {
      alert("Pokémon not found");
    }
};

const showSearchResult = (data) => {
    const {base_experience, height, id, name, order, sprites, stats, types, weight} = data;
    const {back_default, back_shiny, front_default, front_shiny} = sprites;
    // const {base_stat, effort, stat} = stats;
    
    pkmnName.innerText = `${name.toUpperCase()}`;
    pkmnId.innerText = `#${id}`;
    pkmnWeight.innerText = `Weight: ${weight}`;
    pkmnHeight.innerText = `Height: ${height}`;
    pkmnSprite.innerHTML = `<img id="sprite" src="${front_default}">`;
    pkmnShinySprite.innerHTML = `<img id="shiny-sprite" src="${front_shiny}">`;

    stats.map((item) => {
      const {base_stat, effort, stat} = item;
      const {name, url} = stat;

      switch(item.stat.name){
        case "hp":
          pkmnHp.innerText = `${item.base_stat}`;
          break;
        case "attack":
          pkmnAtk.innerText = `${item.base_stat}`;
          break;
        case "defense":
          pkmnDef.innerText = `${item.base_stat}`;
          break;
        case "special-attack":
          pkmnSpcAtk.innerText = `${item.base_stat}`;
          break;
        case "special-defense":
          pkmnSpcDef.innerText = `${item.base_stat}`;
          break;
        case "speed":
          pkmnSpd.innerText = `${item.base_stat}`;
          break;
        default:
          break;
      }
    });

    pkmnTypes.innerHTML = types.map((item) => {
      const {slot, type} = item;
      const {name, url} = type;
      return `<p>${type.name}</p>`;
    }).join(" ");
    
    // pkmnHp.innerText = `Weight: ${weight}`;
    // pkmnAtk.innerText = `Weight: ${weight}`;
    // pkmnDef.innerText = `Weight: ${weight}`;
    // pkmnSpcAtk.innerText = `Weight: ${weight}`;
    // pkmnSpcDef.innerText = `Weight: ${weight}`;
    // pkmnSpd.innerText = `Weight: ${weight}`;
};


searchBtn.addEventListener("click", () => {
    const endPoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
    
    // fetchAllValidPkmn(endPoint);
    fetchSearchData(endPoint);
});