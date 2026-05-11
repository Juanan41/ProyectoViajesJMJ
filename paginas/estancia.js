// Definimos los hoteles por destino con imagen y nombre
const hotelesPorDestino = {
    "España": [
        { nombre: "Los Jardines de Abama Suites & Villas", imagen: "Europa/Los Jardines de Abama Suites & Villas.webp" },
        { nombre: "Soho Boutique Castillo de Santa Catalina", imagen: "Europa/Soho Boutique Castillo de Santa Catalina.webp" },
        { nombre: "Puebloastur Eco Resort Hotel & Spa Gran Lujo", imagen: "Europa/Puebloastur Eco Resort Hotel & Spa Gran Lujo.jpg" },
        { nombre: "Lamaro Hotel", imagen: "Europa/Lamaro Hotel.jpg" },
        { nombre: "BLESS Hotel Madrid - The Leading Hotels of the World", imagen: "Europa/BLESS Hotel Madrid - The Leading Hotels of the World.jpg" }
    ],
    "París": [
        { nombre: "Hotel Eiffel", imagen: "Europa/Hotel Eiffel.webp" },
        { nombre: "Hotel Louvre", imagen: "Europa/Hotel Louvre.jpg" },
        { nombre: "Hotel Champs élysées paris", imagen: "Europa/Hotel Champs.jpg" },
        { nombre: "Hotel Montmartre", imagen: "Europa/Hotel Montmartre.jpeg" },
        { nombre: "Hotel-Peninsula-Paris", imagen: "Europa/Hotel-Peninsula-Paris.jpeg" }
    ],
    "Roma": [
        { nombre: "Hotel Coliseo", imagen: "Europa/Hotel Coliseo.jpg" },
        { nombre: "Hotel Vaticano", imagen: "Europa/Hotel Vaticano.webp" },
        { nombre: "Hotel Fontana", imagen: "Europa/Hotel Fontana.jpg" },
        { nombre: "Hotel Trastevere", imagen: "Europa/Hotel Trastevere.jpg" },
        { nombre: "Hotel Centro Roma", imagen: "Europa/Hotel Centro Roma.jpg" }
    ],
    "Viena": [
        { nombre: "ARCOTEL Wimberger Wien", imagen: "Europa/ARCOTEL Wimberger Wien.webp" },
        { nombre: "MAXX by Steigenberger Vienna", imagen: "Europa/MAXX by Steigenberger Vienna.jpg" },
        { nombre: "Courtyard by Marriott Vienna Prater/Messe", imagen: "Europa/Courtyard.webp" },
        { nombre: "Spark by Hilton Vienna Messe Prater", imagen: "Europa/Spark by Hilton Vienna Messe Prater.avif" },
        { nombre: "Zoku Vienna", imagen: "Europa/Zoku Vienna.jpg" }
    ],
    "Atenas": [
        { nombre: "Titania Hotel", imagen: "Europa/Titania Hotel.webp" },
        { nombre: "Athenaeum Eridanus Luxury Hotel", imagen: "Europa/Athenaeum Eridanus Luxury Hotel.jpg" },
        { nombre: "Casual Kubic Athens", imagen: "Europa/Casual Kubic Athens.jpeg" },
        { nombre: "Living Yard Acropolis", imagen: "Europa/Living Yard Acropolis.jpg" },
        { nombre: "Emporikon Athens Hotel", imagen: "Europa/Emporikon Athens Hotel.webp" }
    ],
    "Londres": [
        { nombre: "The Dilly", imagen: "Europa/The Dilly.jpg" },
        { nombre: "Radisson Blu Hotel, London Leicester Square", imagen: "Europa/Radisson Blu Hotel, London Leicester Square.avif" },
        { nombre: "NYX Hotel London Holborn by Leonardo Hotels", imagen: "Europa/Radisson Blu Hotel, London Leicester Square.avif" },
        { nombre: "The May Fair, A Radisson Collection Hotel, Mayfair London", imagen: "Europa/The May Fair, A Radisson Collection Hotel, Mayfair London.webp" },
        { nombre: "Royal Garden Hotel", imagen: "Europa/Royal Garden Hotel.webp" }
    ],
    /*ASIA*/
    "Tokio": [
        { nombre: "Grand Prince Hotel Takanawa", imagen: "Asia/Grand-Prince-Hotel-Takanawa.avif" },
        { nombre: "Grand Prince Hotel Shin Takanawa", imagen: "Asia/Hotel-Shin-Takanawa.jpg" },
        { nombre: "Tokyo Prince Hotel", imagen: "Asia/TokioPrince.webp" },
        { nombre: "Toshi Center Hotel", imagen: "Asia/ToshiCenterHotel.jpeg" },
        { nombre: "Hotel Nihonbashi Saibo", imagen: "Asia/Hotel-Nihonbashi-Saibo.jpg" }
    ],
    "Bankok": [
        { nombre: "Solitaire Bangkok Sukhumvit 11", imagen: "Asia/Solitaire Bangkok Sukhumvit 11.jpg" },
        { nombre: "The Ex Capital Hotel Bangkok by Dancenter", imagen: "Asia/The-Ex-Capital-Hotel-Bangkok-by-Dancenter.jpg" },
        { nombre: "Chillax Resort", imagen: "Asia/Chillax-Resort.jpeg" },
        { nombre: "PASSA Hotel Bangkok", imagen: "Asia/PASSA-Hotel-Bangkok.jpg" },
        { nombre: "Hotel y Residencia Oakwood Bangkok", imagen: "Asia/Hotel-y-Residencia-Oakwood-Bangkok.jpeg" }
    ],
    "Pekín": [
        { nombre: "Guo Ji Yi Yuan Hotel", imagen: "Asia/Guo-Ji-Yi-Yuan-Hotel.jpg" },
        { nombre: "Sunworld Hotel Wangfujing", imagen: "Asia/Sunworld-Hotel-Wangfujing.jpeg" },
        { nombre: "Grand Mercure Beijing Central", imagen: "Asia/Grand-Mercure-Beijing-Central.jpg" },
        { nombre: "Happy Dragon Saga Hotel with terrace", imagen: "Asia/Happy-Dragon-Saga-Hotel-with-terrace.jpg" },
        { nombre: "Beijing Pudi Hotel", imagen: "Asia/Beijing Pudi Hotel.jpeg" }
    ],
    "Dubái": [
        { nombre: "ME Dubai by Meliá", imagen: "Asia/ME-Dubai-by-Meliá.jpg" },
        { nombre: "Hotel Local Dubai at Jumeirah Village Triangle", imagen: "Asia/Hotel-Local-Dubai-at-Jumeirah-Village-Triangle.jpg" },
        { nombre: "The Tower Plaza Hotel Dubai", imagen: "Asia/The-Tower-Plaza-Hotel-Dubai.jpg" },
        { nombre: "Golden Sands Boutique Hotel-Dubai Creek", imagen: "Asia/Golden-Sands-Boutique-Hotel-Dubai-Creek.webp" },
        { nombre: "Dusit Thani Dubai", imagen: "Asia/Dusit Thani Dubai.jpg" }
    ],
    "Nueva-Delhi": [
        { nombre: "Hotel Horizon By Shanti", imagen: "Asia/Hotel-Horizon-By-Shanti.webp" },
        { nombre: "Hotel City Pride - City Centre", imagen: "Asia/Hotel City Pride - City Centre.jpg" },
        { nombre: "Hotel City Star", imagen: "Asia/Hotel-City-Star.webp" },
        { nombre: "Radisson Blu Plaza Delhi Airport", imagen: "Asia/Radisson-Blu-Plaza-Delhi-Airport.webp" },
        { nombre: "Hotel The Pearl, City Center - Traveler's", imagen: "Asia/Hotel-The-Pearl,-City-Center-Traveler's.jpg" }
    ],
     "Seul": [
        { nombre: "The Stay Classic Hotel Myeongdong", imagen: "Asia/The Stay Classic Hotel Myeongdong.jpg" },
        { nombre: "THE PLAZA Seoul, Autograph Collection", imagen: "Asia/THE PLAZA Seoul, Autograph Collection.webp" },
        { nombre: "The Ambassador Seoul - A Pullman Hotel", imagen: "Asia/The Ambassador Seoul - A Pullman Hotel.webp" },
        { nombre: "Swiss Grand Hotel Seoul & Grand Suite", imagen: "Asia/Swiss Grand Hotel Seoul & Grand Suite.jpg" },
        { nombre: "Pullman Ambassador Seoul Eastpol", imagen: "Asia/Pullman Ambassador Seoul Eastpol.webp" }
    ],
};


function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}


function iniciarEstancia() {
    const destino = obtenerParametroURL("destino") || "Europa";
    document.getElementById("titulo-destino").innerText = `Reserva tu viaje a ${destino}`;
    document.getElementById("destino").value = destino;

    // Generar hoteles 
    const contenedorHoteles = document.getElementById("hotel-opciones");
    contenedorHoteles.innerHTML = ""; // limpiar primero
    const hoteles = hotelesPorDestino[destino] || [];
    hoteles.forEach((hotel, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="hotel" value="${hotel.nombre}" ${index===0 ? "checked" : ""}>
            <img src="${hotel.imagen}" alt="${hotel.nombre}">
            <span>${hotel.nombre}</span>
        `;
        contenedorHoteles.appendChild(label);
    });
}

// Mostrar resumen
function mostrarReserva() {
    const destino = document.getElementById("destino").value;
    const hotel = document.querySelector('input[name="hotel"]:checked').value;
    const avion = document.getElementById("avion").value;

    document.getElementById("resultado").innerHTML = `
        <h3>Resumen de tu reserva:</h3>
        <p>Destino: <strong>${destino}</strong></p>
        <p>Hotel seleccionado: <strong>${hotel}</strong></p>
        <p>Vuelo seleccionado: <strong>${avion}</strong></p>
        <p><a href="#" onclick="confirmarReserva()" class="enlace-recomendacion">Confirmar reserva</a></p>
    `;
}

// Confirmar reserva
function confirmarReserva() {
    const destino = document.getElementById("destino").value;
    const hotel = document.querySelector('input[name="hotel"]:checked').value;
    const avion = document.getElementById("avion").value;

    document.getElementById("resultado").innerHTML = `
        <h3>Reserva confirmada ✅</h3>
        <p>Destino: <strong>${destino}</strong></p>
        <p>Hotel: <strong>${hotel}</strong></p>
        <p>Vuelo: <strong>${avion}</strong></p>
        <p>¡Gracias por reservar con Viajes JAD!</p>
    `;
}

window.onload = iniciarEstancia;

