var url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`;
var lastUrl = `https://pokeapi.co/api/v2/pokemon?offset=50&limit=5`;
const po_container = document.querySelector('.po_container');

const takePoke = async () => {
        await getPoke();
}

const getPoke = async pokeGivenData => 
{
    const res = await fetch(url);
    const pokemonDetails = await res.json();
    
    const pokeName =pokemonDetails.results;
    // creating a loop to print all five pokemons at a time
    for (var i=0; i <5;i++)
    {
        const pokeUrl = pokeName[i].url;
        const Name =pokeName[i].name.toUpperCase(); // Getting name of the pokemon
        const res1 = await fetch(pokeUrl);
        const newUrl = await res1.json();
        const pokeData = newUrl.abilities;
        const moves = newUrl.moves;
        var index = newUrl.id;
        const weight = newUrl.weight;
        let pokeMove = "";

        // using for loop to collect all Moves Data

        for (var j=0; j < moves.length; j++) 
            {
                pokeMove +=moves[j].move.name[0].toUpperCase()+moves[j].move.name.slice(1)+", ";

            }
        let temp ="";

        // using for loop to collect all Ability Data

        for (var a=0; a < pokeData.length; a++)
            {
                temp+=pokeData[a].ability.name[a].toUpperCase()+pokeData[a].ability.name.slice(1) + ", ";
            }
                
        // creating  div and adding needed values to it.
        
        const pokeElement=document.createElement('div');
        pokeElement.classList.add('collectedData');
        document.getElementsByClassName("img-container");
        
        // Creating HTML for the card data

        const pokeInnerHTML = 
        `<div class="img-container">
        <table class="table">
        <div class="row">
        <div class="col-3"><h5><b>Details</b></h5></div>
        <div class="col-9"><h5><b>Information</b></h5></div>
        </div>
        <tbody class="table">
        <div class="row">
        <td class="col-3" ><b>${index})</b></td>
        <td class="col-9" id="img" ><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" alt="img">
        </td>
        </div>
        <tr>
        <td class="col-3"><b>Name:</b></td>
        <td class="col-9"><b>${Name}.</b></td>
        </tr>
        <tr>
        <td class="col-3"><b>Weight:</b></td>
        <td class="col-9"><b>${weight} Kg.</b></td>
        </tr>
        <tr>
        <td class="col-3"><b>Ability:</b></td>
        <td class="col-9"><b>${temp} only.</b></td>
        </tr>
        <tr>
        <td class="col-msm-3"><b>Moves:</b></td>
        <td class="col-sm-9 p-2"><b>${pokeMove}etc.</b></td>
        </tr>
        </tbody>
        </table>
        </div>
        `;
        
        pokeElement.innerHTML=pokeInnerHTML;
        po_container.appendChild(pokeElement);

    } 
    
}

// calling the takePuke func
takePoke();

// Creating func for previous onclick event
const prePoka = async pokeGivenData => 
    {
        const res = await fetch(url);
        const pokemonDetails = await res.json();
        url=pokemonDetails.previous;
        // po_container.parentNode.removeChild(pokeElement);
        if(pokemonDetails.previous==null)
            {
                alert("Your are already on first page")
                url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`;
            }
        else
            {   
                takePoke();
            }
    }
   
// Creating func for next onclick event
const nextPoka = async pokeGivenData => 
    {
        const res = await fetch(url);
        const pokemonDetails = await res.json();
        url=pokemonDetails.next;
        if(pokemonDetails.next>=lastUrl)
            {
                alert(`Your are on the last page..!`)
            }
        else
            { 
                takePoke();
            }
    }