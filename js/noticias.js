//Creamos una funcion asincrona con ajax para que cuando se cargue la pagina esta muestre las noticias del archivo Json.

const xhr = new XMLHttpRequest();

xhr.open("GET", "../json/noticias.json", true);

// Cuando la respuesta esté lista
xhr.onload = function() {
  if (xhr.status === 200) {
    const datos = JSON.parse(xhr.responseText);
    mostrarNoticias(datos.noticias);
  } else {
    console.error("Error al cargar las noticias:", xhr.status);
  }
};

//errores 
xhr.onerror = function() {
  console.error("Error de conexión AJAX");
};

// Enviar la petición
xhr.send();

// Función para mostrar las noticias en el div
function mostrarNoticias(noticias) {
  const contenedor = document.getElementById("listaNoticias");
  contenedor.innerHTML = "";

  noticias.forEach(noticia => {
    const item = document.createElement("div");
    item.classList.add("noticia");
    item.innerHTML = `
      <article>
          <div class="article_noticias">
            <h3>${noticia.titulo}</h3>
            <time>${noticia.fecha}</time>
            <p>${noticia.descripcion}</p>
          </div>
        </article>`;
    contenedor.appendChild(item);
  });
}


