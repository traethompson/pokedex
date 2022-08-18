let pokemonRepository = (function () {
    let pokemonList =[
        {name: 'Mudkip' , height: 0.4, types:['water'] },
        {name:'Marshtomp' , height:0.7, types:['water', 'ground']},
        {name:'Swampert' , height:1.5, types:['water', 'ground']},
    ];
    
  
    function add(pokemon) {
      // Check if pokemon variable is an object
      if (typeof pokemon === 'object') {
      let keys = Object.keys(pokemon);
      // Check if pokemon variable has 'name', 'height', and 'types' keys
      if (keys.indexOf('name') >= 0 && keys.indexOf('height') >= 0 && keys.indexOf('types') >= 0) {
      pokemonList.push(pokemon);
      }
      }
      }

    
    function showDetails(pokemon){
        console.log(pokemon.name);
      }
    

    function addListItem(pokemon){
      //Format list with buttons
      let pokedexPrint = document.querySelector('.pokedex');
      let listItem = document.createElement('li');
      let buttonList = document.createElement('button');
      buttonList.innerText = pokemon.name;
      buttonList.classList.add('entry');
      listItem.appendChild(buttonList);
      pokedexPrint.appendChild(listItem);
      //allow button to display details
      buttonList.addEventListener('click', showDetails);
    }

   
    
      function getAll() {
        return pokemonList;
      }
    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
      };
  })();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });






