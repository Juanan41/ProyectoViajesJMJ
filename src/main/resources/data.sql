-- =====================
-- 🌍 CONTINENTES
-- =====================
INSERT INTO continente (nombre) VALUES
('Europa'),
('Asia'),
('África'),
('Oceanía'),
('América del Norte'),
('América del Sur');

-- =====================
-- 🌏 DESTINOS EUROPA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('España', 'Cultura, gastronomía y diversidad', 1700, 1),
('París', 'Ciudad del amor, arte y moda', 2300, 1),
('Roma', 'Historia romana y cultura italiana', 1800, 1),
('Londres', 'Ciudad moderna con historia', 2200, 1),
('Atenas', 'Cuna de la civilización griega', 1600, 1),
('Viena', 'Elegancia, música y cultura imperial', 1900, 1);
-- =====================
-- 🌏 DESTINOS ASIA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('Tokio', 'Tecnología avanzada, cultura tradicional y vida urbana vibrante', 2200, 2),
('Bangkok', 'Templos, mercados y vida nocturna exótica', 1400, 2),
('Pekín', 'Historia imperial, cultura china y monumentos icónicos', 1700, 2),
('Dubái', 'Lujo, rascacielos y experiencias en el desierto', 2500, 2),
('Nueva Delhi', 'Cultura milenaria, gastronomía y contrastes urbanos', 1600, 2),
('Seúl', 'Tecnología, cultura moderna y tradición coreana', 2000, 2);
-- =====================
-- 🌍 DESTINOS ÁFRICA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('El Cairo', 'Historia antigua, pirámides y cultura egipcia', 1500, 3),
('Marrakech', 'Mercados tradicionales, cultura marroquí y arquitectura exótica', 1200, 3),
('Nairobi', 'Safari africano y naturaleza salvaje', 2000, 3),
('Zanzibar', 'Playas paradisíacas y aguas cristalinas', 1800, 3),
('Sahara', 'Aventura en el desierto y paisajes únicos', 1400, 3),
('Ciudad del Cabo', 'Naturaleza, montaña y costa espectacular', 2200, 3);
-- =====================
-- 🌏 DESTINOS OCEANÍA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('Sidney', 'Ópera icónica, playas y cultura urbana australiana', 2600, 4),
('Melbourne', 'Arte, cultura y vida cosmopolita', 2400, 4),
('Auckland', 'Volcanes, naturaleza y aventura', 2300, 4),
('Fiyi', 'Playas paradisíacas y relax total', 3000, 4),
('Bora Bora', 'Destino romántico con aguas turquesas y lujo', 3500, 4),
('Perth', 'Ciudad moderna con naturaleza salvaje', 2200, 4);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL NORTE
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('Nueva York', 'Rascacielos, cultura urbana y la ciudad que nunca duerme', 2800, 5),
('Ciudad de México', 'Historia, cultura y gastronomía mexicana', 1700, 5),
('Toronto', 'Ciudad moderna con multiculturalidad y rascacielos', 2400, 5),
('San Francisco', 'Puentes icónicos, tecnología y cultura alternativa', 2600, 5),
('Cancún', 'Playas paradisíacas y relax en el Caribe', 2200, 5),
('Chicago', 'Arquitectura, música y ambiente urbano', 2300, 5);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL SUR
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, continente_id) VALUES
('Rio de Janeiro', 'Playas, carnaval y paisajes icónicos como el Cristo Redentor', 1900, 6),
('Buenos Aires', 'Cultura, tango y gastronomía argentina', 1600, 6),
('Machu Picchu', 'Historia inca y maravilla del mundo en los Andes', 2100, 6),
('Cartagena', 'Ciudad colonial con playas y encanto caribeño', 1800, 6),
('Santiago de Chile', 'Ciudad moderna rodeada de montañas y naturaleza', 2000, 6),
('Montevideo', 'Ciudad costera tranquila con cultura y relax', 1700, 6);

-- =====================
-- 🏨 ALOJAMIENTOS EUROPA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- ESPAÑA (1)
('Madrid Central Hotel', 'Madrid', 'España', 'Hotel', 150, 1),
('Barcelona Beach Resort', 'Barcelona', 'España', 'Resort', 180, 1),

-- PARÍS (2)
('Paris Luxury Hotel', 'París', 'Francia', 'Hotel', 220, 2),
('Eiffel View Stay', 'París', 'Francia', 'Hotel', 200, 2),

-- ROMA (3)
('Roma Centro Hotel', 'Roma', 'Italia', 'Hotel', 170, 3),
('Colosseum View Stay', 'Roma', 'Italia', 'Hotel', 160, 3),

-- LONDRES (4)
('London Central Hotel', 'Londres', 'UK', 'Hotel', 210, 4),
('Big Ben View Stay', 'Londres', 'UK', 'Hotel', 190, 4),

-- ATENAS (5)
('Athens Acropolis Hotel', 'Atenas', 'Grecia', 'Hotel', 140, 5),
('Greek Paradise Stay', 'Atenas', 'Grecia', 'Hotel', 130, 5),

-- VIENA (6)
('Vienna Palace Hotel', 'Viena', 'Austria', 'Hotel', 180, 6),
('Danube Riverside Stay', 'Viena', 'Austria', 'Hotel', 170, 6);
-- =====================
-- 🏨 ALOJAMIENTOS ASIA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- TOKIO (7)
('Tokyo Central Hotel', 'Tokio', 'Japón', 'Hotel', 210, 7),
('Shinjuku Skyline Resort', 'Tokio', 'Japón', 'Resort', 240, 7),

-- BANGKOK (8)
('Bangkok Palace Hotel', 'Bangkok', 'Tailandia', 'Hotel', 130, 8),
('Chao Phraya Riverside Resort', 'Bangkok', 'Tailandia', 'Resort', 160, 8),

-- PEKÍN (9)
('Beijing Imperial Hotel', 'Pekín', 'China', 'Hotel', 150, 9),
('Forbidden City Stay', 'Pekín', 'China', 'Hotel', 140, 9),

-- DUBÁI (10)
('Dubai Luxury Tower Hotel', 'Dubái', 'EAU', 'Hotel', 300, 10),
('Burj View Resort', 'Dubái', 'EAU', 'Resort', 350, 10),

-- NUEVA DELHI (11)
('Delhi Heritage Hotel', 'Nueva Delhi', 'India', 'Hotel', 120, 11),
('Lotus Garden Stay', 'Nueva Delhi', 'India', 'Hotel', 110, 11),

-- SEÚL (12)
('Seoul City Hotel', 'Seúl', 'Corea del Sur', 'Hotel', 180, 12),
('Han River View Resort', 'Seúl', 'Corea del Sur', 'Resort', 210, 12);
-- =====================
-- 🏨 ALOJAMIENTOS ÁFRICA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- EL CAIRO (13)
('Cairo Pyramids Hotel', 'El Cairo', 'Egipto', 'Hotel', 140, 13),
('Nile View Resort', 'El Cairo', 'Egipto', 'Resort', 170, 13),

-- MARRAKECH (14)
('Marrakech Riad Hotel', 'Marrakech', 'Marruecos', 'Hotel', 120, 14),
('Atlas Mountain Resort', 'Marrakech', 'Marruecos', 'Resort', 150, 14),

-- NAIROBI (15)
('Safari Lodge Nairobi', 'Nairobi', 'Kenia', 'Hotel', 180, 15),
('Savannah Adventure Resort', 'Nairobi', 'Kenia', 'Resort', 210, 15),

-- ZANZIBAR (16)
('Zanzibar Beach Hotel', 'Zanzibar', 'Tanzania', 'Hotel', 200, 16),
('Ocean Paradise Resort', 'Zanzibar', 'Tanzania', 'Resort', 240, 16),

-- SAHARA (17)
('Desert Camp Sahara', 'Sahara', 'Marruecos', 'Hotel', 100, 17),
('Dunes Luxury Camp', 'Sahara', 'Marruecos', 'Resort', 130, 17),

-- CIUDAD DEL CABO (18)
('Cape Town City Hotel', 'Ciudad del Cabo', 'Sudáfrica', 'Hotel', 190, 18),
('Table Mountain View Resort', 'Ciudad del Cabo', 'Sudáfrica', 'Resort', 220, 18);
-- =====================
-- 🏨 ALOJAMIENTOS OCEANÍA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- SIDNEY (19)
('Sydney Harbour Hotel', 'Sidney', 'Australia', 'Hotel', 240, 19),
('Bondi Beach Resort', 'Sidney', 'Australia', 'Resort', 280, 19),

-- MELBOURNE (20)
('Melbourne City Hotel', 'Melbourne', 'Australia', 'Hotel', 220, 20),
('Yarra River Resort', 'Melbourne', 'Australia', 'Resort', 260, 20),

-- AUCKLAND (21)
('Auckland Sky Hotel', 'Auckland', 'Nueva Zelanda', 'Hotel', 210, 21),
('Harbour View Resort', 'Auckland', 'Nueva Zelanda', 'Resort', 250, 21),

-- FIYI (22)
('Fiji Island Hotel', 'Fiyi', 'Fiyi', 'Hotel', 300, 22),
('Coral Reef Resort', 'Fiyi', 'Fiyi', 'Resort', 350, 22),

-- BORA BORA (23)
('Bora Bora Luxury Villas', 'Bora Bora', 'Polinesia Francesa', 'Hotel', 400, 23),
('Overwater Bungalow Resort', 'Bora Bora', 'Polinesia Francesa', 'Resort', 450, 23),

-- PERTH (24)
('Perth City Hotel', 'Perth', 'Australia', 'Hotel', 200, 24),
('Sunset Coast Resort', 'Perth', 'Australia', 'Resort', 230, 24);
-- =====================
-- 🏨 ALOJAMIENTOS AMÉRICA DEL NORTE
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- NUEVA YORK (25)
('Manhattan Central Hotel', 'Nueva York', 'USA', 'Hotel', 300, 25),
('Times Square Luxury Resort', 'Nueva York', 'USA', 'Resort', 350, 25),

-- CIUDAD DE MÉXICO (26)
('Mexico City Downtown Hotel', 'Ciudad de México', 'México', 'Hotel', 150, 26),
('Zócalo Heritage Resort', 'Ciudad de México', 'México', 'Resort', 180, 26),

-- TORONTO (27)
('Toronto City Hotel', 'Toronto', 'Canadá', 'Hotel', 220, 27),
('CN Tower View Resort', 'Toronto', 'Canadá', 'Resort', 260, 27),

-- SAN FRANCISCO (28)
('San Francisco Bay Hotel', 'San Francisco', 'USA', 'Hotel', 250, 28),
('Golden Gate Resort', 'San Francisco', 'USA', 'Resort', 290, 28),

-- CANCÚN (29)
('Cancun Beach Hotel', 'Cancún', 'México', 'Hotel', 240, 29),
('Caribbean Paradise Resort', 'Cancún', 'México', 'Resort', 300, 29),

-- CHICAGO (30)
('Chicago Downtown Hotel', 'Chicago', 'USA', 'Hotel', 210, 30),
('Lake Michigan Resort', 'Chicago', 'USA', 'Resort', 250, 30);
-- =====================
-- 🏨 ALOJAMIENTOS AMÉRICA DEL SUR
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id) VALUES

-- RIO DE JANEIRO (31)
('Rio Beach Hotel', 'Rio de Janeiro', 'Brasil', 'Hotel', 200, 31),
('Copacabana Resort', 'Rio de Janeiro', 'Brasil', 'Resort', 250, 31),

-- BUENOS AIRES (32)
('Buenos Aires Central Hotel', 'Buenos Aires', 'Argentina', 'Hotel', 150, 32),
('Tango City Resort', 'Buenos Aires', 'Argentina', 'Resort', 180, 32),

-- MACHU PICCHU (33)
('Cusco Mountain Hotel', 'Cusco', 'Perú', 'Hotel', 180, 33),
('Inca Trail Resort', 'Cusco', 'Perú', 'Resort', 220, 33),

-- CARTAGENA (34)
('Cartagena Colonial Hotel', 'Cartagena', 'Colombia', 'Hotel', 170, 34),
('Caribbean Sunset Resort', 'Cartagena', 'Colombia', 'Resort', 210, 34),

-- SANTIAGO DE CHILE (35)
('Santiago City Hotel', 'Santiago de Chile', 'Chile', 'Hotel', 190, 35),
('Andes View Resort', 'Santiago de Chile', 'Chile', 'Resort', 230, 35),

-- MONTEVIDEO (36)
('Montevideo Coastal Hotel', 'Montevideo', 'Uruguay', 'Hotel', 160, 36),
('Rio de la Plata Resort', 'Montevideo', 'Uruguay', 'Resort', 200, 36);
-- =====================
-- 🛏️ HABITACIONES EUROPA
-- =====================
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- ESPAÑA (1,2)
('Doble', 2, 150, 'DESAYUNO', 1, ''),
('Suite', 2, 250, 'MEDIA_PENSION', 1, ''),
('Individual', 1, 100, 'SOLO_ALOJAMIENTO', 2, ''),

-- PARÍS (3,4)
('Doble', 2, 200, 'DESAYUNO', 3, ''),
('Suite', 2, 350, 'PENSION_COMPLETA', 3, ''),
('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 4, ''),

-- ROMA (5,6)
('Doble', 2, 180, 'MEDIA_PENSION', 5, ''),
('Suite', 2, 300, 'PENSION_COMPLETA', 5, ''),
('Individual', 1, 120, 'SOLO_ALOJAMIENTO', 6, '');

-- =====================
-- 🛏️ HABITACIONES ASIA
-- =====================
    INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- TOKIO (13,14)
    ('Doble', 2, 200, 'DESAYUNO', 13, ''),
    ('Suite', 2, 320, 'MEDIA_PENSION', 13, ''),
    ('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 14, ''),

-- BANGKOK (15,16)
    ('Doble', 2, 120, 'DESAYUNO', 15, ''),
    ('Suite', 2, 200, 'MEDIA_PENSION', 15, ''),
    ('Individual', 1, 90, 'SOLO_ALOJAMIENTO', 16, ''),

-- PEKÍN (17,18)
    ('Doble', 2, 150, 'MEDIA_PENSION', 17, ''),
    ('Suite', 2, 260, 'PENSION_COMPLETA', 17, ''),
    ('Individual', 1, 110, 'SOLO_ALOJAMIENTO', 18, ''),

-- DUBÁI (19,20)
    ('Doble', 2, 300, 'DESAYUNO', 19, ''),
    ('Suite', 2, 450, 'PENSION_COMPLETA', 19, ''),
    ('Individual', 1, 200, 'SOLO_ALOJAMIENTO', 20, ''),

-- NUEVA DELHI (21,22)
    ('Doble', 2, 110, 'DESAYUNO', 21, ''),
    ('Suite', 2, 180, 'MEDIA_PENSION', 21, ''),
    ('Individual', 1, 80, 'SOLO_ALOJAMIENTO', 22, ''),

-- SEÚL (23,24)
    ('Doble', 2, 180, 'DESAYUNO', 23, ''),
    ('Suite', 2, 300, 'MEDIA_PENSION', 23, ''),
    ('Individual', 1, 130, 'SOLO_ALOJAMIENTO', 24, '');
-- =====================
-- 🛏️ HABITACIONES ÁFRICA
-- =====================
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- EL CAIRO (25,26)
('Doble', 2, 140, 'DESAYUNO', 25, ''),
('Suite', 2, 220, 'MEDIA_PENSION', 25, ''),
('Individual', 1, 90, 'SOLO_ALOJAMIENTO', 26, ''),

-- MARRAKECH (27,28)
('Doble', 2, 120, 'DESAYUNO', 27, ''),
('Suite', 2, 200, 'MEDIA_PENSION', 27, ''),
('Individual', 1, 80, 'SOLO_ALOJAMIENTO', 28, ''),

-- NAIROBI (29,30)
('Doble', 2, 180, 'MEDIA_PENSION', 29, ''),
('Suite', 2, 300, 'PENSION_COMPLETA', 29, ''),
('Individual', 1, 120, 'SOLO_ALOJAMIENTO', 30, ''),

-- ZANZIBAR (31,32)
('Doble', 2, 220, 'DESAYUNO', 31, ''),
('Suite', 2, 350, 'PENSION_COMPLETA', 31, ''),
('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 32, ''),

-- SAHARA (33,34)
('Doble', 2, 100, 'DESAYUNO', 33, ''),
('Suite', 2, 160, 'MEDIA_PENSION', 33, ''),
('Individual', 1, 70, 'SOLO_ALOJAMIENTO', 34, ''),

-- CIUDAD DEL CABO (35,36)
('Doble', 2, 190, 'DESAYUNO', 35, ''),
('Suite', 2, 300, 'MEDIA_PENSION', 35, ''),
('Individual', 1, 130, 'SOLO_ALOJAMIENTO', 36, '');
-- =====================
-- 🛏️ HABITACIONES OCEANÍA
-- =====================
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- SIDNEY (37,38)
('Doble', 2, 240, 'DESAYUNO', 37, ''),
('Suite', 2, 360, 'MEDIA_PENSION', 37, ''),
('Individual', 1, 180, 'SOLO_ALOJAMIENTO', 38, ''),

-- MELBOURNE (39,40)
('Doble', 2, 220, 'DESAYUNO', 39, ''),
('Suite', 2, 340, 'MEDIA_PENSION', 39, ''),
('Individual', 1, 160, 'SOLO_ALOJAMIENTO', 40, ''),

-- AUCKLAND (41,42)
('Doble', 2, 210, 'MEDIA_PENSION', 41, ''),
('Suite', 2, 320, 'PENSION_COMPLETA', 41, ''),
('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 42, ''),

-- FIYI (43,44)
('Doble', 2, 300, 'DESAYUNO', 43, ''),
('Suite', 2, 450, 'PENSION_COMPLETA', 43, ''),
('Individual', 1, 220, 'SOLO_ALOJAMIENTO', 44, ''),

-- BORA BORA (45,46)
('Doble', 2, 400, 'DESAYUNO', 45, ''),
('Suite', 2, 600, 'PENSION_COMPLETA', 45, ''),
('Individual', 1, 300, 'SOLO_ALOJAMIENTO', 46, ''),

-- PERTH (47,48)
('Doble', 2, 200, 'DESAYUNO', 47, ''),
('Suite', 2, 300, 'MEDIA_PENSION', 47, ''),
('Individual', 1, 140, 'SOLO_ALOJAMIENTO', 48, '');
-- =====================
-- 🛏️ HABITACIONES AMÉRICA DEL NORTE
-- =====================
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- NUEVA YORK (49,50)
('Doble', 2, 300, 'DESAYUNO', 49, ''),
('Suite', 2, 450, 'MEDIA_PENSION', 49, ''),
('Individual', 1, 220, 'SOLO_ALOJAMIENTO', 50, ''),

-- CIUDAD DE MÉXICO (51,52)
('Doble', 2, 150, 'DESAYUNO', 51, ''),
('Suite', 2, 250, 'MEDIA_PENSION', 51, ''),
('Individual', 1, 110, 'SOLO_ALOJAMIENTO', 52, ''),

-- TORONTO (53,54)
('Doble', 2, 220, 'MEDIA_PENSION', 53, ''),
('Suite', 2, 350, 'PENSION_COMPLETA', 53, ''),
('Individual', 1, 160, 'SOLO_ALOJAMIENTO', 54, ''),

-- SAN FRANCISCO (55,56)
('Doble', 2, 250, 'DESAYUNO', 55, ''),
('Suite', 2, 380, 'MEDIA_PENSION', 55, ''),
('Individual', 1, 180, 'SOLO_ALOJAMIENTO', 56, ''),

-- CANCÚN (57,58)
('Doble', 2, 240, 'DESAYUNO', 57, ''),
('Suite', 2, 400, 'PENSION_COMPLETA', 57, ''),
('Individual', 1, 170, 'SOLO_ALOJAMIENTO', 58, ''),

-- CHICAGO (59,60)
('Doble', 2, 210, 'DESAYUNO', 59, ''),
('Suite', 2, 320, 'MEDIA_PENSION', 59, ''),
('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 60, '');
-- =====================
-- 🛏️ HABITACIONES AMÉRICA DEL SUR
-- =====================
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url) VALUES

-- RIO DE JANEIRO (61,62)
('Doble', 2, 200, 'DESAYUNO', 61, ''),
('Suite', 2, 320, 'MEDIA_PENSION', 61, ''),
('Individual', 1, 150, 'SOLO_ALOJAMIENTO', 62, ''),

-- BUENOS AIRES (63,64)
('Doble', 2, 150, 'DESAYUNO', 63, ''),
('Suite', 2, 250, 'MEDIA_PENSION', 63, ''),
('Individual', 1, 110, 'SOLO_ALOJAMIENTO', 64, ''),

-- MACHU PICCHU (65,66)
('Doble', 2, 180, 'MEDIA_PENSION', 65, ''),
('Suite', 2, 300, 'PENSION_COMPLETA', 65, ''),
('Individual', 1, 130, 'SOLO_ALOJAMIENTO', 66, ''),

-- CARTAGENA (67,68)
('Doble', 2, 170, 'DESAYUNO', 67, ''),
('Suite', 2, 280, 'MEDIA_PENSION', 67, ''),
('Individual', 1, 120, 'SOLO_ALOJAMIENTO', 68, ''),

-- SANTIAGO DE CHILE (69,70)
('Doble', 2, 190, 'DESAYUNO', 69, ''),
('Suite', 2, 300, 'MEDIA_PENSION', 69, ''),
('Individual', 1, 140, 'SOLO_ALOJAMIENTO', 70, ''),

-- MONTEVIDEO (71,72)
('Doble', 2, 160, 'DESAYUNO', 71, ''),
('Suite', 2, 260, 'MEDIA_PENSION', 71, ''),
('Individual', 1, 120, 'SOLO_ALOJAMIENTO', 72, '');