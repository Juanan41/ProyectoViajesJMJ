const fs = require('fs');

const citiesRaw = `Madrid,España,Europa,Madrid
Barcelona,España,Europa,Barcelona
Sevilla,España,Europa,Seville
Valencia,España,Europa,Valencia
París,Francia,Europa,Paris
Lyon,Francia,Europa,Lyon
Niza,Francia,Europa,Nice
Roma,Italia,Europa,Rome
Milán,Italia,Europa,Milan
Venecia,Italia,Europa,Venice
Florencia,Italia,Europa,Florence
Berlín,Alemania,Europa,Berlin
Múnich,Alemania,Europa,Munich
Hamburgo,Alemania,Europa,Hamburg
Londres,Reino Unido,Europa,London
Edimburgo,Reino Unido,Europa,Edinburgh
Ámsterdam,Países Bajos,Europa,Amsterdam
Róterdam,Países Bajos,Europa,Rotterdam
Bruselas,Bélgica,Europa,Brussels
Viena,Austria,Europa,Vienna
Salzburgo,Austria,Europa,Salzburg
Zúrich,Suiza,Europa,Zürich
Ginebra,Suiza,Europa,Geneva
Atenas,Grecia,Europa,Athens
Santorini,Grecia,Europa,Santorini
Lisboa,Portugal,Europa,Lisbon
Oporto,Portugal,Europa,Porto
Praga,República Checa,Europa,Prague
Budapest,Hungría,Europa,Budapest
Varsovia,Polonia,Europa,Warsaw
Cracovia,Polonia,Europa,Kraków
Estocolmo,Suecia,Europa,Stockholm
Copenhague,Dinamarca,Europa,Copenhagen
Oslo,Noruega,Europa,Oslo
Helsinki,Finlandia,Europa,Helsinki
Reikiavik,Islandia,Europa,Reykjavík
Dublín,Irlanda,Europa,Dublin
Nueva York,Estados Unidos,América del Norte,New York City
Los Ángeles,Estados Unidos,América del Norte,Los Angeles
Chicago,Estados Unidos,América del Norte,Chicago
Miami,Estados Unidos,América del Norte,Miami
San Francisco,Estados Unidos,América del Norte,San Francisco
Las Vegas,Estados Unidos,América del Norte,Las Vegas
Orlando,Estados Unidos,América del Norte,Orlando
Toronto,Canadá,América del Norte,Toronto
Vancouver,Canadá,América del Norte,Vancouver
Montreal,Canadá,América del Norte,Montreal
Ciudad de México,México,América del Norte,Mexico City
Cancún,México,América del Norte,Cancún
Playa del Carmen,México,América del Norte,Playa del Carmen
Guadalajara,México,América del Norte,Guadalajara
Monterrey,México,América del Norte,Monterrey
La Habana,Cuba,América del Norte,Havana
Punta Cana,República Dominicana,América del Norte,Punta Cana
San Juan,Puerto Rico,América del Norte,San Juan
Río de Janeiro,Brasil,América del Sur,Rio de Janeiro
São Paulo,Brasil,América del Sur,São Paulo
Salvador,Brasil,América del Sur,Salvador Bahia
Buenos Aires,Argentina,América del Sur,Buenos Aires
Mendoza,Argentina,América del Sur,Mendoza
Bariloche,Argentina,América del Sur,Bariloche
Ushuaia,Argentina,América del Sur,Ushuaia
Santiago,Chile,América del Sur,Santiago
Valparaíso,Chile,América del Sur,Valparaíso
Bogotá,Colombia,América del Sur,Bogotá
Medellín,Colombia,América del Sur,Medellín
Cartagena,Colombia,América del Sur,Cartagena
Lima,Perú,América del Sur,Lima
Cusco,Perú,América del Sur,Cusco
Arequipa,Perú,América del Sur,Arequipa
Quito,Ecuador,América del Sur,Quito
Guayaquil,Ecuador,América del Sur,Guayaquil
La Paz,Bolivia,América del Sur,La Paz
Montevideo,Uruguay,América del Sur,Montevideo
Asunción,Paraguay,América del Sur,Asunción
Caracas,Venezuela,América del Sur,Caracas
Tokio,Japón,Asia,Tokyo
Kioto,Japón,Asia,Kyoto
Osaka,Japón,Asia,Osaka
Seúl,Corea del Sur,Asia,Seoul
Busan,Corea del Sur,Asia,Busan
Pekín,China,Asia,Beijing
Shanghái,China,Asia,Shanghai
Hong Kong,China,Asia,Hong Kong
Macao,China,Asia,Macau
Taipéi,Taiwán,Asia,Taipei
Bangkok,Tailandia,Asia,Bangkok
Phuket,Tailandia,Asia,Phuket
Chiang Mai,Tailandia,Asia,Chiang Mai
Singapur,Singapur,Asia,Singapore
Kuala Lumpur,Malasia,Asia,Kuala Lumpur
Hanói,Vietnam,Asia,Hanoi
Ciudad Ho Chi Minh,Vietnam,Asia,Ho Chi Minh City
Yakarta,Indonesia,Asia,Jakarta
Bali,Indonesia,Asia,Bali
Manila,Filipinas,Asia,Manila
Nueva Delhi,India,Asia,New Delhi
Bombay,India,Asia,Mumbai
Jaipur,India,Asia,Jaipur
Agra,India,Asia,Agra
Dubái,Emiratos Árabes Unidos,Asia,Dubai
Abu Dabi,Emiratos Árabes Unidos,Asia,Abu Dhabi
Doha,Catar,Asia,Doha
Tel Aviv,Israel,Asia,Tel Aviv
Jerusalén,Israel,Asia,Jerusalem
Estambul,Turquía,Asia,Istanbul
El Cairo,Egipto,África,Cairo
Luxor,Egipto,África,Luxor
Alejandría,Egipto,África,Alexandria
Marrakech,Marruecos,África,Marrakesh
Casablanca,Marruecos,África,Casablanca
Fez,Marruecos,África,Fez
Túnez,Túnez,África,Tunis
Argel,Argelia,África,Algiers
Nairobi,Kenia,África,Nairobi
Mombasa,Kenia,África,Mombasa
Ciudad del Cabo,Sudáfrica,África,Cape Town
Johannesburgo,Sudáfrica,África,Johannesburg
Pretoria,Sudáfrica,África,Pretoria
Dakar,Senegal,África,Dakar
Accra,Ghana,África,Accra
Lagos,Nigeria,África,Lagos
Zanzíbar,Tanzania,África,Zanzibar
Victoria Falls,Zimbabue,África,Victoria Falls
Seychelles,Seychelles,África,Seychelles
Mauricio,Mauricio,África,Mauritius
Sídney,Australia,Oceanía,Sydney
Melbourne,Australia,Oceanía,Melbourne
Brisbane,Australia,Oceanía,Brisbane
Perth,Australia,Oceanía,Perth
Adelaida,Australia,Oceanía,Adelaide
Gold Coast,Australia,Oceanía,Gold Coast
Auckland,Nueva Zelanda,Oceanía,Auckland
Wellington,Nueva Zelanda,Oceanía,Wellington
Queenstown,Nueva Zelanda,Oceanía,Queenstown
Christchurch,Nueva Zelanda,Oceanía,Christchurch
Fiyi,Fiyi,Oceanía,Fiji
Bora Bora,Polinesia Francesa,Oceanía,Bora Bora
Papeete,Polinesia Francesa,Oceanía,Papeete
Samoa,Samoa,Oceanía,Samoa
Honolulu,Estados Unidos,Oceanía,Honolulu
Ibiza,España,Europa,Ibiza
Mallorca,España,Europa,Majorca
Tenerife,España,Europa,Tenerife
Génova,Italia,Europa,Genoa
Turín,Italia,Europa,Turin
Burdeos,Francia,Europa,Bordeaux
Toulouse,Francia,Europa,Toulouse
Estrasburgo,Francia,Europa,Strasbourg
Basilea,Suiza,Europa,Basel
Lucerna,Suiza,Europa,Lucerne
Colonia,Alemania,Europa,Cologne
Stuttgart,Alemania,Europa,Stuttgart
Düsseldorf,Alemania,Europa,Düsseldorf
Leeds,Reino Unido,Europa,Leeds
Glasgow,Reino Unido,Europa,Glasgow
Belfast,Reino Unido,Europa,Belfast
Dubrovnik,Croacia,Europa,Dubrovnik
Split,Croacia,Europa,Split
Zagreb,Croacia,Europa,Zagreb
Ljubljana,Croacia,Europa,Ljubljana
Bratislava,Eslovenia,Europa,Bratislava
Tallin,Estonia,Europa,Tallinn
Riga,Letonia,Europa,Riga
Vilna,Letonia,Europa,Vilnius
Bucharest,Eslovaquia,Europa,Bucharest
Sofía,Rumania,Europa,Sofia
Belgrado,Bulgaria,Europa,Belgrade
Moscú,Rusia,Europa,Moscow
San Petersburgo,Rusia,Europa,Saint Petersburg
Kiev,Ucrania,Europa,Kyiv
Minsk,Ucrania,Europa,Minsk
Tiflis,Ucrania,Europa,Tbilisi
Yerevan,Georgia,Asia,Yerevan
Bakú,Georgia,Asia,Baku
Taskent,Azerbaiyán,Asia,Tashkent
Almatý,Uzbekistán,Asia,Almaty
Astaná,Kazajistán,Asia,Astana
Ammán,Jordania,Asia,Amman
Beirut,Israel,Asia,Beirut
Teherán,Líbano,Asia,Tehran
Damasco,Siria,Asia,Damascus
Bagdad,Siria,Asia,Baghdad
Kuwait City,Kuwait,Asia,Kuwait City
Manama,Kuwait,Asia,Manama
Mascate,Baréin,Asia,Muscat
Kabul,Irak,Asia,Kabul
Karachi,Pakistán,Asia,Karachi
Lahore,Pakistán,Asia,Lahore
Daca,Bangladés,Asia,Dhaka
Katmandú,Bangladés,Asia,Kathmandu
Colombo,Nepal,Asia,Colombo
Yangon,Nepal,Asia,Yangon
Phnom Penh,Myanmar,Asia,Phnom Penh
Vientián,Laos,Asia,Vientiane
Luang Prabang,Laos,Asia,Luang Prabang
Siem Reap,Camboya,Asia,Siem Reap
Pattaya,Tailandia,Asia,Pattaya
Surabaya,Indonesia,Asia,Surabaya
Bandung,Indonesia,Asia,Bandung
Medan,Indonesia,Asia,Medan
Cebú,Filipinas,Asia,Cebu City
Davao,Filipinas,Asia,Davao City
Sapporo,Japón,Asia,Sapporo
Fukuoka,Japón,Asia,Fukuoka
Nagoya,Japón,Asia,Nagoya
Incheon,Corea del Sur,Asia,Incheon
Jeju,Corea del Sur,Asia,Jeju City
Cantón,China,Asia,Guangzhou
Shenzhen,China,Asia,Shenzhen
Chengdu,China,Asia,Chengdu
Tianjin,China,Asia,Tianjin
Xian,China,Asia,Xi'an
Hangzhou,China,Asia,Hangzhou`.split('\n').map(l => l.trim()).filter(l => l);

const uniqueCities = Array.from(new Set(citiesRaw));
const top200 = uniqueCities.slice(0, 200);

async function fetchUnsplashImage(cityName) {
    const searchTerms = [
        `${cityName} city`,
        `${cityName} landmark`,
        `${cityName} skyline`,
        `${cityName}`
    ];

    for (const term of searchTerms) {
        try {
            const query = encodeURIComponent(term);
            const url = `https://unsplash.com/napi/search/photos?query=${query}&per_page=10&orientation=landscape`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                // Filter out premium photos to avoid watermarks
                const freePhotos = data.results.filter(r => !r.premium && !r.urls.raw.includes('plus.unsplash.com'));
                if (freePhotos.length > 0) {
                    return freePhotos[0].urls.raw + '&w=2000&q=80&fit=crop';
                }
            }
        } catch (e) {
            console.error('Error fetching unsplash for', term, e.message);
        }
        await new Promise(r => setTimeout(r, 200)); // slight delay between terms
    }
    console.log("FALLBACK USED FOR", cityName);
    // generic fallback
    return 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2000';
}

function escapeSql(str) {
    return str.replace(/'/g, "''");
}

const contMap = {
    'Europa': 1,
    'Asia': 2,
    'África': 3,
    'América del Norte': 4,
    'América del Sur': 5,
    'Oceanía': 6
};

// Rate limit handling helper
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
    let sql = `
-- ==========================================
-- SCRIPT DE INYECCIÓN PRECISA (DESTINOS CON UNSPLASH NAPI)
-- ==========================================
TRUNCATE TABLE reservas CASCADE;
TRUNCATE TABLE opiniones CASCADE;
TRUNCATE TABLE habitacion CASCADE;
TRUNCATE TABLE alojamientos CASCADE;
TRUNCATE TABLE destinos CASCADE;

`;

    const destinosInserts = [];
    const alojamientosInserts = [];
    const habitacionesInserts = [];

    let destinoId = 1;
    let alojamientoId = 1;
    let habitacionId = 1;

    console.log("Fetching exact images for 200 cities via Unsplash NAPI...");

    for (let i = 0; i < top200.length; i++) {
        const parts = top200[i].split(',');
        const nombre = parts[0];
        const pais = parts[1];
        let continente = parts[2] || 'Europa';
        let engName = parts[3] || nombre; // Using the english name for better search results
        
        let contId = contMap[continente] || 1;
        const precioDestino = Math.floor(Math.random() * 2000) + 800; // 800 to 2800
        
        const img = await fetchUnsplashImage(engName);
        console.log(`Fetched [${i+1}/200] ${nombre} -> ${img.split('?')[0]}`);

        destinosInserts.push(`(${destinoId}, '${escapeSql(nombre)}', 'Descubre la magia, cultura y lugares increíbles en ${escapeSql(nombre)} (${escapeSql(pais)}).', ${precioDestino}, '${escapeSql(pais)}', '${img}', ${contId})`);

        // Create 2 Hotels per destination
        const precioNoche1 = Math.floor(Math.random() * 100) + 50;
        const precioNoche2 = Math.floor(Math.random() * 250) + 150;
        
        const ts = new Date().toISOString();
        alojamientosInserts.push(`(${alojamientoId}, '${escapeSql(nombre)} Central Hotel', '${escapeSql(nombre)}', '${escapeSql(pais)}', 'HOTEL', ${precioNoche1}, '${ts}', '${ts}', ${destinoId})`);
        alojamientosInserts.push(`(${alojamientoId + 1}, 'Grand Resort ${escapeSql(nombre)}', '${escapeSql(nombre)}', '${escapeSql(pais)}', 'RESORT', ${precioNoche2}, '${ts}', '${ts}', ${destinoId})`);

        // Rooms for Hotel 1
        habitacionesInserts.push(`(${habitacionId}, 'Estándar', 'DESAYUNO', ${precioNoche1}, 2, ${alojamientoId})`);
        habitacionesInserts.push(`(${habitacionId + 1}, 'Suite', 'TODO_INCLUIDO', ${precioNoche1 + 80}, 2, ${alojamientoId})`);
        
        // Rooms for Hotel 2
        habitacionesInserts.push(`(${habitacionId + 2}, 'Deluxe', 'MEDIA_PENSION', ${precioNoche2}, 2, ${alojamientoId + 1})`);
        habitacionesInserts.push(`(${habitacionId + 3}, 'Suite Presidencial', 'TODO_INCLUIDO', ${precioNoche2 + 200}, 4, ${alojamientoId + 1})`);

        destinoId++;
        alojamientoId += 2;
        habitacionId += 4;
        
        // Brief delay to avoid any potential undocumented rate limit from NAPI
        await delay(100);
    }

    // Chunking inserts to avoid huge SQL statements
    const chunkSize = 20;
    
    // Destinos
    for (let i = 0; i < destinosInserts.length; i += chunkSize) {
        const chunk = destinosInserts.slice(i, i + chunkSize);
        sql += `INSERT INTO destinos (id, nombre, descripcion, precio, pais, imagen, continente_id) VALUES \n  ` + chunk.join(',\n  ') + `;\n\n`;
    }
    sql += `SELECT setval('destinos_id_seq', (SELECT MAX(id) FROM destinos));\n\n`;

    // Alojamientos
    for (let i = 0; i < alojamientosInserts.length; i += chunkSize) {
        const chunk = alojamientosInserts.slice(i, i + chunkSize);
        sql += `INSERT INTO alojamientos (id, nombre, ciudad, pais, tipo, precio_por_noche, created_at, updated_at, destino_id) VALUES \n  ` + chunk.join(',\n  ') + `;\n\n`;
    }
    sql += `SELECT setval('alojamientos_id_seq', (SELECT MAX(id) FROM alojamientos));\n\n`;

    // Habitaciones
    for (let i = 0; i < habitacionesInserts.length; i += chunkSize) {
        const chunk = habitacionesInserts.slice(i, i + chunkSize);
        sql += `INSERT INTO habitacion (id, tipo, regimen, precio_por_noche, capacidad, alojamiento_id) VALUES \n  ` + chunk.join(',\n  ') + `;\n\n`;
    }
    sql += `SELECT setval('habitacion_id_seq', (SELECT MAX(id) FROM habitacion));\n\n`;

    fs.writeFileSync('massive_seed_unsplash.sql', sql, 'utf8');
    console.log("massive_seed_unsplash.sql generated successfully with EXACT UNSPLASH images.");
}

main();