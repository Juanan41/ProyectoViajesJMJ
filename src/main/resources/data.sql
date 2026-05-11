-- =====================
-- LIMPIEZA PREVIA
-- =====================
TRUNCATE TABLE habitacion RESTART IDENTITY CASCADE;
TRUNCATE TABLE alojamientos RESTART IDENTITY CASCADE;
TRUNCATE TABLE destinos RESTART IDENTITY CASCADE;
TRUNCATE TABLE continente RESTART IDENTITY CASCADE;

-- =====================
-- USUARIOS ADMIN
-- =====================
INSERT INTO usuarios (username, email, password, role, saldo)
VALUES ('Juan Antonio', 'juan@viajes.com', '$2a$10$cNbNdxo49Ei00ifujZ5nH.JzUrhhH5J.jpOxrrcEy1TaeY1i/vz3q', 'ADMIN', 5000.00)
    ON CONFLICT (email) DO UPDATE
                               SET username = EXCLUDED.username,
                               password = EXCLUDED.password,
                               role = EXCLUDED.role,
                               saldo = EXCLUDED.saldo;

INSERT INTO usuarios (username, email, password, role, saldo)
VALUES ('Miguel', 'miguel@viajes.com', '$2a$10$cNbNdxo49Ei00ifujZ5nH.JzUrhhH5J.jpOxrrcEy1TaeY1i/vz3q', 'ADMIN', 5000.00)
    ON CONFLICT (email) DO UPDATE
                               SET username = EXCLUDED.username,
                               password = EXCLUDED.password,
                               role = EXCLUDED.role,
                               saldo = EXCLUDED.saldo;

INSERT INTO usuarios (username, email, password, role, saldo)
VALUES ('Joel', 'joel@viajes.com', '$2a$10$cNbNdxo49Ei00ifujZ5nH.JzUrhhH5J.jpOxrrcEy1TaeY1i/vz3q', 'ADMIN', 5000.00)
    ON CONFLICT (email) DO UPDATE
                               SET username = EXCLUDED.username,
                               password = EXCLUDED.password,
                               role = EXCLUDED.role,
                               saldo = EXCLUDED.saldo;

-- =====================
-- CONTINENTES
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
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('España', 'Cultura, gastronomía y diversidad', 1700, 'España', 1),
                                                                            ('París', 'Ciudad del amor, arte y moda', 2300, 'Francia', 1),
                                                                            ('Roma', 'Historia romana y cultura italiana', 1800, 'Italia', 1),
                                                                            ('Londres', 'Ciudad moderna con historia', 2200, 'Reino Unido', 1),
                                                                            ('Atenas', 'Cuna de la civilización griega', 1600, 'Grecia', 1),
                                                                            ('Viena', 'Elegancia, música y cultura imperial', 1900, 'Austria', 1);
-- =====================
-- 🌏 DESTINOS ASIA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('Tokio', 'Tecnología avanzada, cultura tradicional y vida urbana vibrante', 2200, 'Japón', 2),
                                                                            ('Bangkok', 'Templos, mercados y vida nocturna exótica', 1400, 'Tailandia', 2),
                                                                            ('Pekín', 'Historia imperial, cultura china y monumentos icónicos', 1700, 'China', 2),
                                                                            ('Dubái', 'Lujo, rascacielos y experiencias en el desierto', 2500, 'Emiratos Árabes Unidos', 2),
                                                                            ('Nueva Delhi', 'Cultura milenaria, gastronomía y contrastes urbanos', 1600, 'India', 2),
                                                                            ('Seúl', 'Tecnología, cultura moderna y tradición coreana', 2000, 'Corea del Sur', 2);
-- =====================
-- 🌍 DESTINOS ÁFRICA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('El Cairo', 'Historia antigua, pirámides y cultura egipcia', 1500, 'Egipto', 3),
                                                                            ('Marrakech', 'Mercados tradicionales, cultura marroquí y arquitectura exótica', 1200, 'Marruecos', 3),
                                                                            ('Nairobi', 'Safari africano y naturaleza salvaje', 2000, 'Kenia', 3),
                                                                            ('Zanzibar', 'Playas paradisíacas y aguas cristalinas', 1800, 'Tanzania', 3),
                                                                            ('Sahara', 'Aventura en el desierto y paisajes únicos', 1400, 'Marruecos', 3),
                                                                            ('Ciudad del Cabo', 'Naturaleza, montaña y costa espectacular', 2200, 'Sudáfrica', 3);
-- =====================
-- 🌏 DESTINOS OCEANÍA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('Sidney', 'Ópera icónica, playas y cultura urbana australiana', 2600, 'Australia', 4),
                                                                            ('Melbourne', 'Arte, cultura y vida cosmopolita', 2400, 'Australia', 4),
                                                                            ('Auckland', 'Volcanes, naturaleza y aventura', 2300, 'Nueva Zelanda', 4),
                                                                            ('Fiyi', 'Playas paradisíacas y relax total', 3000, 'Fiyi', 4),
                                                                            ('Bora Bora', 'Destino romántico con aguas turquesas y lujo', 3500, 'Polinesia Francesa', 4),
                                                                            ('Perth', 'Ciudad moderna con naturaleza salvaje', 2200, 'Australia', 4);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL NORTE
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('Nueva York', 'Rascacielos, cultura urbana y la ciudad que nunca duerme', 2800, 'Estados Unidos', 5),
                                                                            ('Ciudad de México', 'Historia, cultura y gastronomía mexicana', 1700, 'México', 5),
                                                                            ('Toronto', 'Ciudad moderna con multiculturalidad y rascacielos', 2400, 'Canadá', 5),
                                                                            ('San Francisco', 'Puentes icónicos, tecnología y cultura alternativa', 2600, 'Estados Unidos', 5),
                                                                            ('Cancún', 'Playas paradisíacas y relax en el Caribe', 2200, 'México', 5),
                                                                            ('Chicago', 'Arquitectura, música y ambiente urbano', 2300, 'Estados Unidos', 5);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL SUR
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id) VALUES
                                                                            ('Rio de Janeiro', 'Playas, carnaval y paisajes icónicos como el Cristo Redentor', 1900, 'Brasil', 6),
                                                                            ('Buenos Aires', 'Cultura, tango y gastronomía argentina', 1600, 'Argentina', 6),
                                                                            ('Machu Picchu', 'Historia inca y maravilla del mundo en los Andes', 2100, 'Perú', 6),
                                                                            ('Cartagena', 'Ciudad colonial con playas y encanto caribeño', 1800, 'Colombia', 6),
                                                                            ('Santiago de Chile', 'Ciudad moderna rodeada de montañas y naturaleza', 2000, 'Chile', 6),
                                                                            ('Montevideo', 'Ciudad costera tranquila con cultura y relax', 1700, 'Uruguay', 6);

-- =====================
-- 🏨 ALOJAMIENTOS EUROPA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Madrid Central Hotel', 'Madrid', 'España', 'HOTEL', 150, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Barcelona Beach Resort', 'Barcelona', 'España', 'RESORT', 180, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Paris Luxury Hotel', 'París', 'Francia', 'HOTEL', 220, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Eiffel View Stay', 'París', 'Francia', 'HOTEL', 200, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Roma Centro Hotel', 'Roma', 'Italia', 'HOTEL', 170, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Colosseum View Stay', 'Roma', 'Italia', 'HOTEL', 160, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('London Central Hotel', 'Londres', 'Reino Unido', 'HOTEL', 210, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Big Ben View Stay', 'Londres', 'Reino Unido', 'HOTEL', 190, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Athens Acropolis Hotel', 'Atenas', 'Grecia', 'HOTEL', 140, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Greek Paradise Stay', 'Atenas', 'Grecia', 'HOTEL', 130, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Vienna Palace Hotel', 'Viena', 'Austria', 'HOTEL', 180, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Danube Riverside Stay', 'Viena', 'Austria', 'HOTEL', 170, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================
-- 🏨 ALOJAMIENTOS ASIA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Tokyo Central Hotel', 'Tokio', 'Japón', 'HOTEL', 210, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Shinjuku Skyline Resort', 'Tokio', 'Japón', 'RESORT', 240, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Bangkok Palace Hotel', 'Bangkok', 'Tailandia', 'HOTEL', 130, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Chao Phraya Riverside Resort', 'Bangkok', 'Tailandia', 'RESORT', 160, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Beijing Imperial Hotel', 'Pekín', 'China', 'HOTEL', 150, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Forbidden City Stay', 'Pekín', 'China', 'HOTEL', 140, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Dubai Luxury Tower Hotel', 'Dubái', 'Emiratos Árabes Unidos', 'HOTEL', 300, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Burj View Resort', 'Dubái', 'Emiratos Árabes Unidos', 'RESORT', 350, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Delhi Heritage Hotel', 'Nueva Delhi', 'India', 'HOTEL', 120, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Lotus Garden Stay', 'Nueva Delhi', 'India', 'HOTEL', 110, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Seoul City Hotel', 'Seúl', 'Corea del Sur', 'HOTEL', 180, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Han River View Resort', 'Seúl', 'Corea del Sur', 'RESORT', 210, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================
-- 🏨 ALOJAMIENTOS ÁFRICA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Cairo Pyramids Hotel', 'El Cairo', 'Egipto', 'HOTEL', 140, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Nile View Resort', 'El Cairo', 'Egipto', 'RESORT', 170, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Marrakech Riad Hotel', 'Marrakech', 'Marruecos', 'HOTEL', 120, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Atlas Mountain Resort', 'Marrakech', 'Marruecos', 'RESORT', 150, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Safari Lodge Nairobi', 'Nairobi', 'Kenia', 'HOTEL', 180, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Savannah Adventure Resort', 'Nairobi', 'Kenia', 'RESORT', 210, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Zanzibar Beach Hotel', 'Zanzibar', 'Tanzania', 'HOTEL', 200, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Ocean Paradise Resort', 'Zanzibar', 'Tanzania', 'RESORT', 240, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Desert Camp Sahara', 'Sahara', 'Marruecos', 'HOTEL', 100, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Dunes Luxury Camp', 'Sahara', 'Marruecos', 'RESORT', 130, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Cape Town City Hotel', 'Ciudad del Cabo', 'Sudáfrica', 'HOTEL', 190, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Table Mountain View Resort', 'Ciudad del Cabo', 'Sudáfrica', 'RESORT', 220, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================
-- 🏨 ALOJAMIENTOS OCEANÍA
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Sydney Harbour Hotel', 'Sidney', 'Australia', 'HOTEL', 240, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Bondi Beach Resort', 'Sidney', 'Australia', 'RESORT', 280, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Melbourne City Hotel', 'Melbourne', 'Australia', 'HOTEL', 220, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Yarra River Resort', 'Melbourne', 'Australia', 'RESORT', 260, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Auckland Sky Hotel', 'Auckland', 'Nueva Zelanda', 'HOTEL', 210, 21, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Harbour View Resort', 'Auckland', 'Nueva Zelanda', 'RESORT', 250, 21, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Fiji Island Hotel', 'Fiyi', 'Fiyi', 'HOTEL', 300, 22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Coral Reef Resort', 'Fiyi', 'Fiyi', 'RESORT', 350, 22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Bora Bora Luxury Villas', 'Bora Bora', 'Polinesia Francesa', 'HOTEL', 400, 23, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Overwater Bungalow Resort', 'Bora Bora', 'Polinesia Francesa', 'RESORT', 450, 23, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Perth City Hotel', 'Perth', 'Australia', 'HOTEL', 200, 24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Sunset Coast Resort', 'Perth', 'Australia', 'RESORT', 230, 24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================
-- 🏨 ALOJAMIENTOS AMÉRICA DEL NORTE
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Manhattan Central Hotel', 'Nueva York', 'Estados Unidos', 'HOTEL', 300, 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Times Square Luxury Resort', 'Nueva York', 'Estados Unidos', 'RESORT', 350, 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Mexico City Downtown Hotel', 'Ciudad de México', 'México', 'HOTEL', 150, 26, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Zócalo Heritage Resort', 'Ciudad de México', 'México', 'RESORT', 180, 26, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Toronto City Hotel', 'Toronto', 'Canadá', 'HOTEL', 220, 27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('CN Tower View Resort', 'Toronto', 'Canadá', 'RESORT', 260, 27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('San Francisco Bay Hotel', 'San Francisco', 'Estados Unidos', 'HOTEL', 250, 28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Golden Gate Resort', 'San Francisco', 'Estados Unidos', 'RESORT', 290, 28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Cancun Beach Hotel', 'Cancún', 'México', 'HOTEL', 240, 29, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Caribbean Paradise Resort', 'Cancún', 'México', 'RESORT', 300, 29, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Chicago Downtown Hotel', 'Chicago', 'Estados Unidos', 'HOTEL', 210, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Lake Michigan Resort', 'Chicago', 'Estados Unidos', 'RESORT', 250, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================
-- 🏨 ALOJAMIENTOS AMÉRICA DEL SUR
-- =====================
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at) VALUES
                                                                                                                ('Rio Beach Hotel', 'Rio de Janeiro', 'Brasil', 'HOTEL', 200, 31, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Copacabana Resort', 'Rio de Janeiro', 'Brasil', 'RESORT', 250, 31, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Buenos Aires Central Hotel', 'Buenos Aires', 'Argentina', 'HOTEL', 150, 32, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Tango City Resort', 'Buenos Aires', 'Argentina', 'RESORT', 180, 32, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Cusco Mountain Hotel', 'Cusco', 'Perú', 'HOTEL', 180, 33, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Inca Trail Resort', 'Cusco', 'Perú', 'RESORT', 220, 33, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Cartagena Colonial Hotel', 'Cartagena', 'Colombia', 'HOTEL', 170, 34, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Caribbean Sunset Resort', 'Cartagena', 'Colombia', 'RESORT', 210, 34, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Santiago City Hotel', 'Santiago de Chile', 'Chile', 'HOTEL', 190, 35, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Andes View Resort', 'Santiago de Chile', 'Chile', 'RESORT', 230, 35, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Montevideo Coastal Hotel', 'Montevideo', 'Uruguay', 'HOTEL', 160, 36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                ('Rio de la Plata Resort', 'Montevideo', 'Uruguay', 'RESORT', 200, 36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
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
('Individual', 1, 120, 'SOLO_ALOJAMIENTO', 6, ''),

-- LONDRES (7,8)
('Doble', 2, 220, 'DESAYUNO', 7, ''),
('Suite', 2, 380, 'PENSION_COMPLETA', 7, ''),
('Individual', 1, 160, 'SOLO_ALOJAMIENTO', 8, ''),

-- ATENAS (9,10)
('Doble', 2, 170, 'MEDIA_PENSION', 9, ''),
('Suite', 2, 280, 'PENSION_COMPLETA', 9, ''),
('Individual', 1, 110, 'SOLO_ALOJAMIENTO', 10, ''),

-- VIENA (11,12)
('Doble', 2, 210, 'DESAYUNO', 11, ''),
('Suite', 2, 340, 'MEDIA_PENSION', 11, ''),
('Individual', 1, 140, 'SOLO_ALOJAMIENTO', 12, '');

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