let pokemonRepository = (function () {
    let pokemonList =[
        {name: 'Mudkip' , height: 0.4, types:['water'] },
        {name:'Marshtomp' , height:0.7, types:['water', 'ground']},
        {name:'Swampert' , height:1.5, types:['water', 'ground']},
    ];
    
  
    function add(pokemon) {
        pokemonList.push(pokemon);
      }

    
    function showDetails(pokemon){
        console.log(pokemon.name);
      }
    

    function addListItem(pokemon){
      let pokedexPrint = document.querySelector('.pokedex');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('entry');
      listItem.appendChild(button);
      pokedexPrint.appendChild(listItem);
      button.addEventListener('click', showDetails);
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






