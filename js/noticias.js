

function cargar() {
  $.ajax({
    url: './json/noticias.json',
    type: 'GET',
    dataType: 'json', // importante
    success: function (objeto_json) {
      let cadena = "";
    
      for (let i = 0; i < objeto_json.noticias.length; i++) {
        
        cadena = cadena + objeto_json.noticias[i].titulo+"<br/>";
        cadena = cadena + objeto_json.noticias[i].fecha +"<br/>";
        cadena = cadena + objeto_json.noticias[i].descripcion +"<br/><hr>";
        
      }

      $("#listaNoticias").html(cadena);
    },
    error: function (xhr, status) {
      alert('Disculpe, existió un problema');
    }
  });
}

cargar()


