$(document).ready(function(){

var i;
for(i=1;i<21;i++){
 
  $.get("https://pokeapi.co/api/v2/pokemon/"+i, function(pokemon, status){

    var j;
    var tipos = "";
    var habilidades ="";
    var evolucion = "-";
    for (j=0;j<pokemon.types.length;j++){
        tipos+='<span class="btn btn-default btn-xs">'+pokemon.types[j].type.name+'</span>';
    }
  
  //if(pokemon.hasOwnProperty('envolves_from_species')){
    var URL_evolucion = pokemon.species.url;
    //console.log(URL_evolucion);
    $.get(URL_evolucion, function(old_pokemon, status){
        if(old_pokemon.evolves_from_species!=null)
          evolucion = old_pokemon.evolves_from_species.name;
     
      for (k=0;k<pokemon.abilities.length;k++){
          habilidades+='<span class="btn btn-default btn-xs">'+pokemon.abilities[k].ability.name+'</span>';
      }

      $("#pokemons").append(
        '<div id='+pokemon.id+' class="pokemon col-xs-12 col-sm-6 col-md-4 col-lg-4 " data-toggle="modal" data-target="#myModal"><div class="panel panel-default"><div class="panel-heading "><img src='+pokemon.sprites.front_default+' class="img-responsive center-block"><mark>ID:'+pokemon.id+'</mark></div><div class="panel-body">'+tipos+'<h3 class="text-capitalize">'+pokemon.name+'</h3 ><blockquote><p><small>Evoluciona de:</small>'+evolucion+'</p></blockquote></div></div></div>');
      
      $("#"+pokemon.id).on("click",function(){
        document.getElementById("pok_name").innerHTML = pokemon.name.toUpperCase();
        document.getElementById("pok_img").innerHTML = '<img src='+pokemon.sprites.front_default+' class="img-responsive center-block">';
        document.getElementById("url").innerHTML = "Habilidades: "+habilidades;
        document.getElementById("tipo").innerHTML = "Type: "+tipos;
        document.getElementById("pok_id").innerHTML = "ID: "+pokemon.id;
        document.getElementById("pok_evo").innerHTML = "Evoluciona de: "+evolucion;
      });
    });
  });
}
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".pokemon").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });








});
