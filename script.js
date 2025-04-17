
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const subbtn = document.getElementById("subbtn");
let shinychk = document.getElementById("shiny");

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
}

let getPokeData = () => {
    let id = Math.floor(Math.random() * 1025) + 1;
    console.log(id)
    
    const finalUrl = url + id;
    
    console.log(finalUrl);

    fetch(finalUrl).then((response) => response.json()).then((data) =>{ 
        generateCard(data);
        });
    };

let getPokeDataSearch = () => {
    let input = document.getElementById("srch").value;
    console.log(input)
    
    if (input == ""){
        input = 1;
    };

    const finalUrl = url + input;
        
    console.log(finalUrl);
    
    fetch(finalUrl).then((response) => response.json()).then((data) =>{ 
        generateCard(data);
        });
    };

let generateCard = (data) => {
    //get data and assign
    console.log(data);
    const hp = data.stats[0].base_stat;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const pokeName = data.name;

    if (shinychk.checked) {
        var imgSrc = data.sprites.other.home.front_shiny;
     } else {
        var imgSrc = data.sprites.other.home.front_default;
     }
    
    const themeColor = typeColor[data.types[0].type.name];

    console.log(themeColor)
    console.log(pokeName,hp,statAttack,statDefense,statSpeed);

    card.innerHTML= `
            <p class="hp">
                    <span>HP</span>
                    ${hp}
            </p>
            <img src="${imgSrc}" alt="demo">
            <h2 class="poke-name"> ${pokeName} </h2>
            <div class="types">

            </div>
            <div class="stats">
                <div>
                    <h3>${statAttack}</h3>
                    <p>attack</p>
                </div>
                <div>
                    <h3>${statDefense}</h3>
                    <p>defense</p>
                </div>
                <div>
                    <h3>${statSpeed}</h3>
                    <p>speed</p>
                </div>
            </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor)
};
let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        console.log(span);
        document.querySelector(".types").appendChild(span);
    });
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(
        circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach(typeColor => {
        typeColor.style.backgroundColor = color
    });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
window.addEventListener("load", getPokeDataSearch);
