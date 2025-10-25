//Creamos una funcion asincrona con ajax para que cuando se cargue la pagina esta muestre las noticias del archivo Json.

$(document).ready(function() {
  $.ajax({
    url: '../json/noticias.json',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      mostrarNoticias(datos);
    },
    error: function(xhr, status, error) {
      console.error('Error al cargar noticias:', error);
      $('.listaNoticias').text('   No se pudieron cargar las noticias!!!');
    }
  });
});

function mostrarNoticias(datos) {
  const cont = $('#listaNoticias');
  cont.empty();

  if (datos.noticias && Array.isArray(datos.noticias)) {
    datos.noticias.forEach(n => {
      const article = `
        <article>
          <div class="article_noticias">
            <h3>${n.titulo}</h3>
            <time>${n.fecha}</time>
            <p>${n.descripcion}</p>
          </div>
        </article>`;
      cont.append(article);
    });
  } else {
    $('#listaNoticias').text('No hay noticias disponibles.');
  }
}

