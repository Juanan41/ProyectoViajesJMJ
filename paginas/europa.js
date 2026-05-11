function recomendarDestino() {
    const clima = document.getElementById('clima').value;
    const actividad = document.getElementById('actividad').value;
    const presupuesto = document.getElementById('presupuesto').value;
    const sugerencia = document.getElementById('sugerencia') ? document.getElementById('sugerencia').value : '';

    let recomendacion = "";
    let enlaceDestino = "#"; 

    if(clima === "calido" && actividad === "playa") {
        recomendacion = "España: disfruta de sus playas y sol.";
        enlaceDestino = "españaestancias.html";
    } else if(clima === "templado" && actividad === "cultural") {
        recomendacion = "París: arte, museos y gastronomía.";
        enlaceDestino = "paris.html";
    } else if(clima === "frio" && actividad === "urbano") {
        recomendacion = "Roma: historia y arquitectura impresionante.";
        enlaceDestino = "roma.html";
    } else if(clima === "templado" && actividad === "montaña") {
        recomendacion = "Viena: naturaleza y cultura.";
        enlaceDestino = "viena.html";
    } else if(clima === "templado" && actividad === "playa") {
        recomendacion = "Atenas: sol y cultura clásica.";
        enlaceDestino = "atenas.html";
    } else if(clima === "calido" && actividad === "urbano") {
        recomendacion = "Londres: mezcla de clásico y moderno.";
        enlaceDestino = "londres.html";
    } else {
        recomendacion = "Europa tiene muchos destinos interesantes, explora nuestra galería!";
        enlaceDestino = "#";
    }

    document.getElementById('resultado').innerHTML = `
        <h3>Recomendación de destino:</h3>
        <p><a href="${enlaceDestino}" class="enlace-recomendacion">${recomendacion}</a></p>
        ${sugerencia ? `<p>Sugerencia: ${sugerencia}</p>` : ''}
    `;
}
