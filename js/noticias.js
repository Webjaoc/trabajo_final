 // Esperar a que el DOM esté listo
    window.addEventListener("DOMContentLoaded", function() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "../../json/noticias.json", true);

      xhr.onload = function() {
        if (xhr.status === 200) {
          try {
            const datos = JSON.parse(xhr.responseText);
            mostrarNoticias(datos.noticias);
          } catch (error) {
            console.error("Error al parsear JSON:", error);
            document.getElementById("listaNoticias").innerText = "Error al leer los datos.";
          }
        } else {
          console.error("Error al cargar las noticias:", xhr.status);
          document.getElementById("listaNoticias").innerText = "No se pudieron cargar las noticias.";
        }
      };

      xhr.onerror = function() {
        console.error("Error de conexión AJAX");
        document.getElementById("listaNoticias").innerText = "Error de conexión con el servidor.";
      };

      xhr.send();

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
    });