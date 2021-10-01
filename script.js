//Defining the API.
let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`;
let lastUrl = `https://pokeapi.co/api/v2/pokemon?offset=50&limit=5`;

//Selecting the class of po_container.
const po_container = document.querySelector('.po_container');

// creating  div and adding needed values to it.
let pokeElement=document.createElement('div');

//Defining the veriables
let pokeInnerHTML =" ";
let pokeGivenData =" ";



const takePoke = async () => {

    //Using .catch() function to catch the errors.
    await getPoke().catch(error => {alert(`Their is some problem in loading...!!! Please wait for a while.`)});;
}



//using async-await.
const getPoke = async pokeGivenData => {

    //using catch to checking for errors.
    const res = await fetch(url).catch(error => {alert(`Their is some problem while fatching the ${url}`)});

    //Using .json() to convert given text data into data objects as attribute-value pair and arrys.
    const pokemonDetails = await res.json();
    const pokeName =pokemonDetails.results;
    
    // creating a loop to print all five pokemons at a time.
    for (let i=0; i <5; i++) 
    {
        const pokeUrl = pokeName[i].url;

        // Getting name of the pokemon.
        const Name =pokeName[i].name.toUpperCase();

        //using catch to checking for errors.
        const res1 = await fetch(pokeUrl).catch(error => {alert(`Their is some problem while fatching the ${url}`)}); 

        //Using .json() to convert given text data into data objects as attribute-value pair and arrys.
        const newUrl = await res1.json(); 
        const pokeData = newUrl.abilities;
        const moves = newUrl.moves;
        const index = newUrl.id;
        const weight = newUrl.weight;
        let pokeMove = " ";

        // using for loop to collect all Moves Data.
        for (let j=0; j < moves.length; j++) 
            {
                pokeMove +=moves[j].move.name[0].toUpperCase()+moves[j].move.name.slice(1)+", ";
            }
        let temp =" ";

        // using for loop to collect all Ability Data.
        for (let a=0; a < pokeData.length; a++)
            {
                temp+=pokeData[a].ability.name[a].toUpperCase()+pokeData[a].ability.name.slice(1) + ", ";
            }
        
        // Creating HTML for the card data.
        const dataPoke = 
        `<div class="img-container">
                <table class="table">
                        <div class="row">
                                <div class="col-3"><h5><b>Details</b></h5></div>
                                <div class="col-9"><h5><b>Information</b></h5></div>
                        </div>
                        <tbody class="table">
                                <div class="row">
                                        <td class="col-3" ><b>${index})</b></td>
                                        <td class="col-9" id="img" ><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" alt="img"></td>
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
        </div>`;

        // Collecting the data in the pokeInnerHTML veriable.
        pokeInnerHTML+=dataPoke;

        // Using innerHTML to put all the data of the pokeInnerHTML inside the pokeElement
        pokeElement.innerHTML=pokeInnerHTML;

        //Apending the values of pokeElement to the po_container.
        po_container.append(pokeElement);
    } 
}

// calling the takePuke func.
takePoke();

// Creating func for previous onclick event.
const prePoka = async pokeGivenData => 
    {   
        pokeInnerHTML=" ";
        const res = await fetch(url);
        const pokemonDetails = await res.json();
        url=pokemonDetails.previous;
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
   

// Creating func for next onclick event.
const nextPoka = async pokeGivenData => 
    {   
        pokeInnerHTML=" ";
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