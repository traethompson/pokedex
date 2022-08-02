let pokemonRepository = (function () {
    let pokemonList =[
        {name: 'Mudkip' , height: 0.4, types:['water'] },
        {name:'Marshtomp' , height:0.7, types:['water', 'ground']},
        {name:'Swampert' , height:1.5, types:['water', 'ground']},
    ];
    
  
    function add(pokemon) {
        pokemonList.push(pokemon);
      }
    
      function getAll() {
        return pokemonList;
      }
    
      return {
        add: add,
        getAll: getAll
      };
  })();
console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height >= 1) {
  document.write( '<p>' + pokemon.name + ' ' + '(Height: ' + pokemon.height + ')' + ' - Wow that\'s big!' + '</p>')
  }
  else document.write( '<p>' + pokemon.name + ' ' + '(Height: ' + + pokemon.height + ')' + '</p>')
  });
pokemonRepository.add('Taillow')
console.log(pokemonRepository.getAll());


pokemonList.forEach(function(pokemon) {
    document.write('<p>'+pokemon.name + ' ' + pokemon.height+'<p>');
  });





