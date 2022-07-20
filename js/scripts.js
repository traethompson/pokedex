let pokemonList = [
    {name: 'Mudkip' , height: 0.4, type1:'water', type2: null},
    {name:'Marshtomp' , height:0.7, type1: 'water', type2:'ground'},
    {name:'Swampert' , height:1.5, type1:'water', type2: 'ground'},
];

for (let i = 0; i<=pokemonList.length; i++){
    
    document.write("Name: " + pokemonList[i].name + "\n", 
    "Height: " + pokemonList[i].height + "\n");
        if (pokemonList[i].height > 1){
            document.write(" - Wow, that's big!");
        }
    document.write("<br>");
}

