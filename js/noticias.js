//Aqui creamos lafuncion ajax para cargar los datos de manera asincrona

function cargar() {
  let listaNoticias = document.getElementById('listaNoticias');
  let errorNoticias = document.querySelector('.listaNoticias');
  $.ajax({
    url: './json/noticias.json',
    type: 'GET',
    dataType: 'json',
    success: function (objeto_json) {
      let cadena = "";
    
      for (let i = 0; i < objeto_json.noticias.length; i++) {
        cadena = cadena +"<div class='article_noticias'>";
        cadena = cadena + "<h3>" + objeto_json.noticias[i].titulo + "</h3>";
        cadena = cadena + "<time>" + objeto_json.noticias[i].fecha +"</time><br>";
        cadena = cadena + "<p>" + objeto_json.noticias[i].descripcion +"</p><hr>";
        cadena = cadena + "</div>";
      }

      $(listaNoticias).html(cadena);
    },
    error: function (xhr, status) {
      errorNoticias.innerHTML='Disculpe, existió un problema';
    }
  });
}

cargar();


