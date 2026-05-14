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
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('Madrid', 'Cultura, gastronomía y diversidad', 1700, 'España', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg/3840px-Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg', 1),
    ('París', 'Ciudad del amor, arte y moda', 2300, 'Francia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/3840px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', 1),
    ('Roma', 'Historia romana y cultura italiana', 1800, 'Italia', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg', 1),
    ('Londres', 'Ciudad moderna con historia', 2200, 'Reino Unido', 'https://upload.wikimedia.org/wikipedia/commons/6/67/London_Skyline_%28125508655%29.jpeg', 1),
    ('Atenas', 'Cuna de la civilización griega', 1600, 'Grecia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Monastiraki_Square_and_Acropolis_in_Athens_%2844149181684%29.jpg/3840px-Monastiraki_Square_and_Acropolis_in_Athens_%2844149181684%29.jpg', 1),
    ('Viena', 'Elegancia, música y cultura imperial', 1900, 'Austria', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Schoenbrunn_philharmoniker_2012.jpg/3840px-Schoenbrunn_philharmoniker_2012.jpg', 1);
-- =====================
-- 🌏 DESTINOS ASIA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('Tokio', 'Tecnología avanzada, cultura tradicional y vida urbana vibrante', 2200, 'Japón', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000', 2),
    ('Bangkok', 'Templos, mercados y vida nocturna exótica', 1400, 'Tailandia', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000', 2),
    ('Pekín', 'Historia imperial, cultura china y monumentos icónicos', 1700, 'China', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000', 2),
    ('Dubái', 'Lujo, rascacielos y experiencias en el desierto', 2500, 'Emiratos Árabes Unidos', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000', 2),
    ('Nueva Delhi', 'Cultura milenaria, gastronomía y contrastes urbanos', 1600, 'India', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2000', 2),
    ('Seúl', 'Tecnología, cultura moderna y tradición coreana', 2000, 'Corea del Sur', 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2000', 2);
-- =====================
-- 🌍 DESTINOS ÁFRICA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('El Cairo', 'Historia antigua, pirámides y cultura egipcia', 1500, 'Egipto', 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2000', 3),
    ('Marrakech', 'Mercados tradicionales, cultura marroquí y arquitectura exótica', 1200, 'Marruecos', 'https://images.unsplash.com/photo-1597212720419-bd37616e35bc?q=80&w=2000', 3),
    ('Nairobi', 'Safari africano y naturaleza salvaje', 2000, 'Kenia', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000', 3),
    ('Zanzibar', 'Playas paradisíacas y aguas cristalinas', 1800, 'Tanzania', 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2000', 3),
    ('Sahara', 'Aventura en el desierto y paisajes únicos', 1400, 'Marruecos', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000', 3),
    ('Ciudad del Cabo', 'Naturaleza, montaña y costa espectacular', 2200, 'Sudáfrica', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000', 3);
-- =====================
-- 🌏 DESTINOS OCEANÍA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('Sidney', 'Ópera icónica, playas y cultura urbana australiana', 2600, 'Australia', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000', 4),
    ('Melbourne', 'Arte, cultura y vida cosmopolita', 2400, 'Australia', 'https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=2000', 4),
    ('Auckland', 'Volcanes, naturaleza y aventura', 2300, 'Nueva Zelanda', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2000', 4),
    ('Fiyi', 'Playas paradisíacas y relax total', 3000, 'Fiyi', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2000', 4),
    ('Bora Bora', 'Destino romántico con aguas turquesas y lujo', 3500, 'Polinesia Francesa', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000', 4),
    ('Perth', 'Ciudad moderna con naturaleza salvaje', 2200, 'Australia', 'https://images.unsplash.com/photo-1524586410818-196d249560e4?q=80&w=2000', 4);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL NORTE
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('Nueva York', 'Rascacielos, cultura urbana y la ciudad que nunca duerme', 2800, 'Estados Unidos', 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2000', 5),
    ('Ciudad de México', 'Historia, cultura y gastronomía mexicana', 1700, 'México', 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2000', 5),
    ('Toronto', 'Ciudad moderna con multiculturalidad y rascacielos', 2400, 'Canadá', 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=2000', 5),
    ('San Francisco', 'Puentes icónicos, tecnología y cultura alternativa', 2600, 'Estados Unidos', 'https://images.unsplash.com/photo-1501594907352-04cda38eb2f7?q=80&w=2000', 5),
    ('Cancún', 'Playas paradisíacas y relax en el Caribe', 2200, 'México', 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2000', 5),
    ('Chicago', 'Arquitectura, música y ambiente urbano', 2300, 'Estados Unidos', 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2000', 5);
-- =====================
-- 🌎 DESTINOS AMÉRICA DEL SUR
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES
    ('Rio de Janeiro', 'Playas, carnaval y paisajes icónicos como el Cristo Redentor', 1900, 'Brasil', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000', 6),
    ('Buenos Aires', 'Cultura, tango y gastronomía argentina', 1600, 'Argentina', 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=2000', 6),
    ('Machu Picchu', 'Historia inca y maravilla del mundo en los Andes', 2100, 'Perú', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000', 6),
    ('Cartagena', 'Ciudad colonial con playas y encanto caribeño', 1800, 'Colombia', 'https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?q=80&w=2000', 6),
    ('Santiago de Chile', 'Ciudad moderna rodeada de montañas y naturaleza', 2000, 'Chile', 'https://images.unsplash.com/photo-1597006438013-5ef96c154098?q=80&w=2000', 6),
    ('Montevideo', 'Ciudad costera tranquila con cultura y relax', 1700, 'Uruguay', 'https://images.unsplash.com/photo-1619546952812-520e98064a52?q=80&w=2000', 6);

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

-- =====================================================
-- DESTINOS EXTRA UNIFICADOS EN DATA.SQL
-- =====================================================

-- =====================================================
-- INSERT DESTINOS EXTRA JMJ VIAJES
-- No borra datos existentes
-- Añade destinos, alojamientos y habitaciones
-- =====================================================

-- =====================
-- EUROPA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Europa' LIMIT 1)
FROM (VALUES
          ('Lisboa', 'Capital portuguesa con tranvías, miradores, historia y gastronomía atlántica.', 1500, 'Portugal', 'https://images.unsplash.com/photo-1548707309-dcebe6120150?q=80&w=2070'),
          ('Oporto', 'Ciudad del norte de Portugal famosa por el vino, el río Duero y su casco histórico.', 1450, 'Portugal', 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070'),
          ('Praga', 'Ciudad medieval con castillo, puentes históricos y ambiente romántico.', 1600, 'República Checa', 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=2070'),
          ('Budapest', 'Capital húngara con termas, arquitectura imperial y el río Danubio.', 1550, 'Hungría', 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=2070'),
          ('Ámsterdam', 'Canales, bicicletas, museos y ambiente cosmopolita europeo.', 1800, 'Países Bajos', 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- ASIA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Asia' LIMIT 1)
FROM (VALUES
          ('Singapur', 'Ciudad moderna con rascacielos, jardines futuristas y gastronomía internacional.', 2300, 'Singapur', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2070'),
          ('Kioto', 'Templos, jardines zen, tradición japonesa y cultura ancestral.', 2100, 'Japón', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070'),
          ('Bali', 'Playas, templos, arrozales y ambiente tropical en Indonesia.', 1900, 'Indonesia', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070'),
          ('Hanoi', 'Capital vietnamita con historia, mercados, lagos y gastronomía callejera.', 1600, 'Vietnam', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2070'),
          ('Maldivas', 'Islas paradisíacas, aguas turquesas y alojamientos sobre el mar.', 3400, 'Maldivas', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- ÁFRICA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'África' LIMIT 1)
FROM (VALUES
          ('Túnez', 'Playas mediterráneas, zocos, historia antigua y cultura árabe.', 1200, 'Túnez', 'https://images.unsplash.com/photo-1542108154-15f5cc114b3f?q=80&w=2070'),
          ('Dakar', 'Capital senegalesa con cultura africana, costa atlántica y música.', 1600, 'Senegal', 'https://images.unsplash.com/photo-1563212871-331201cbdcd3?q=80&w=2070'),
          ('Victoria Falls', 'Cataratas espectaculares y naturaleza salvaje en el sur de África.', 2400, 'Zimbabue', 'https://images.unsplash.com/photo-1628156170663-8a30595fe1b0?q=80&w=2070'),
          ('Islas Seychelles', 'Playas paradisíacas, naturaleza protegida y turismo exclusivo.', 3200, 'Seychelles', 'https://images.unsplash.com/photo-1588661623912-70b1cb160cf2?q=80&w=2070'),
          ('Addis Abeba', 'Capital etíope con historia, cultura y acceso a paisajes únicos.', 1700, 'Etiopía', 'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- OCEANÍA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Oceanía' LIMIT 1)
FROM (VALUES
          ('Queenstown', 'Aventura, montañas, lagos y naturaleza extrema en Nueva Zelanda.', 2600, 'Nueva Zelanda', 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2070'),
          ('Gold Coast', 'Playas, surf, parques temáticos y ambiente costero australiano.', 2400, 'Australia', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070'),
          ('Hobart', 'Capital de Tasmania con naturaleza, puerto, gastronomía y paisajes salvajes.', 2500, 'Australia', 'https://images.unsplash.com/photo-1559160581-446700c2abdb?q=80&w=2070'),
          ('Samoa', 'Islas volcánicas, playas tranquilas y cultura polinesia.', 3000, 'Samoa', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'),
          ('Tahití', 'Destino tropical con lagunas, montaña, cultura polinesia y relax.', 3400, 'Polinesia Francesa', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- AMÉRICA DEL NORTE
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Norte' LIMIT 1)
FROM (VALUES
          ('Las Vegas', 'Entretenimiento, casinos, espectáculos y excursiones al desierto.', 2500, 'Estados Unidos', 'https://images.unsplash.com/photo-1605810731422-b5e28a50de3f?q=80&w=2070'),
          ('Los Ángeles', 'Hollywood, playas, cultura urbana y ambiente cinematográfico.', 2700, 'Estados Unidos', 'https://images.unsplash.com/photo-1580659328221-d779fdfa7c78?q=80&w=2070'),
          ('Vancouver', 'Ciudad moderna entre montañas, mar y naturaleza canadiense.', 2600, 'Canadá', 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=2070'),
          ('La Habana', 'Historia, música, coches clásicos y arquitectura colonial caribeña.', 1800, 'Cuba', 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2070'),
          ('Punta Cana', 'Playas caribeñas, resorts todo incluido y aguas cristalinas.', 2100, 'República Dominicana', 'https://images.unsplash.com/photo-1580210023604-0328b9cc6711?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- AMÉRICA DEL SUR
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Sur' LIMIT 1)
FROM (VALUES
          ('Lima', 'Capital peruana con gastronomía reconocida, costa e historia colonial.', 1800, 'Perú', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2070'),
          ('La Paz', 'Capital de altura con paisajes andinos, mercados y cultura boliviana.', 1700, 'Bolivia', 'https://images.unsplash.com/photo-1580829891461-8ee3c2356c9a?q=80&w=2070'),
          ('Ushuaia', 'Fin del mundo, naturaleza patagónica y paisajes de montaña y mar.', 2500, 'Argentina', 'https://images.unsplash.com/photo-1518063319808-1f55819772ee?q=80&w=2070'),
          ('Medellín', 'Ciudad moderna, clima primaveral, cultura urbana y montaña.', 1800, 'Colombia', 'https://images.unsplash.com/photo-1563200049-74d30c5e3d74?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================================================
-- ALOJAMIENTOS AUTOMÁTICOS PARA LOS NUEVOS DESTINOS
-- 2 alojamientos por destino: HOTEL y RESORT
-- =====================================================

WITH nuevos_destinos AS (
    SELECT d.id, d.nombre, d.pais, d.precio
    FROM destinos d
    WHERE d.nombre IN (
                       'Lisboa', 'Oporto', 'Praga', 'Budapest', 'Ámsterdam',
                       'Singapur', 'Kioto', 'Bali', 'Hanoi', 'Maldivas',
                       'Túnez', 'Dakar', 'Victoria Falls', 'Islas Seychelles', 'Addis Abeba',
                       'Queenstown', 'Gold Coast', 'Hobart', 'Samoa', 'Tahití',
                       'Las Vegas', 'Los Ángeles', 'Vancouver', 'La Habana', 'Punta Cana',
                       'Lima', 'La Paz', 'Ushuaia', 'Medellín'
        )
)
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at)
SELECT
    nd.nombre || ' Grand Hotel',
    nd.nombre,
    nd.pais,
    'HOTEL',
    ROUND(nd.precio / 12.0),
    nd.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM nuevos_destinos nd
WHERE NOT EXISTS (
    SELECT 1 FROM alojamientos a
    WHERE a.nombre = nd.nombre || ' Grand Hotel'
)
UNION ALL
SELECT
    nd.nombre || ' Paradise Resort',
    nd.nombre,
    nd.pais,
    'RESORT',
    ROUND(nd.precio / 9.0),
    nd.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM nuevos_destinos nd
WHERE NOT EXISTS (
    SELECT 1 FROM alojamientos a
    WHERE a.nombre = nd.nombre || ' Paradise Resort'
);

-- =====================================================
-- HABITACIONES AUTOMÁTICAS
-- 3 habitaciones por alojamiento
-- =====================================================

WITH alojamientos_nuevos AS (
    SELECT a.id, a.precio_por_noche
    FROM alojamientos a
    WHERE a.nombre LIKE '% Grand Hotel'
       OR a.nombre LIKE '% Paradise Resort'
)
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url)
SELECT
    h.tipo,
    h.capacidad,
    ROUND(a.precio_por_noche * h.factor),
    h.regimen,
    a.id,
    ''
FROM alojamientos_nuevos a
         CROSS JOIN (VALUES
                         ('Individual', 1, 0.75, 'SOLO_ALOJAMIENTO'),
                         ('Doble', 2, 1.00, 'DESAYUNO'),
                         ('Suite', 2, 1.60, 'MEDIA_PENSION')
    ) AS h(tipo, capacidad, factor, regimen)
WHERE NOT EXISTS (
    SELECT 1 FROM habitacion hab
    WHERE hab.alojamiento_id = a.id
);

-- =====================================================
-- COMPROBACIÓN FINAL
-- =====================================================

SELECT COUNT(*) AS total_continentes FROM continente;
SELECT COUNT(*) AS total_destinos FROM destinos;
SELECT COUNT(*) AS total_alojamientos FROM alojamientos;
SELECT COUNT(*) AS total_habitaciones FROM habitacion;

-- =====================================================
-- AMPLIACION FINAL DE CATALOGO
-- Objetivo: 120 destinos turisticos en data.sql
-- =====================================================

-- Fotos corregidas para destinos detectados sin imagen
UPDATE destinos SET imagen = 'https://images.unsplash.com/photo-1597212720419-bd37616e35bc?q=80&w=2000'
WHERE nombre = 'Marrakech';

UPDATE destinos SET imagen = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000'
WHERE nombre = 'San Francisco';

UPDATE destinos SET imagen = 'https://images.unsplash.com/photo-1597009049302-6f1d4f27f8f4?q=80&w=2000'
WHERE nombre = 'Santiago de Chile';

-- EUROPA
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Europa' LIMIT 1)
FROM (VALUES
          ('Barcelona', 'Arquitectura modernista, playas urbanas y vida mediterranea.', 1800, 'España', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2000'),
          ('Sevilla', 'Catedral, Alcazar, barrios historicos y cultura andaluza.', 1500, 'España', 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=80&w=2000'),
          ('Valencia', 'Ciudad de las Artes, playas y gastronomia mediterranea.', 1450, 'España', 'https://images.unsplash.com/photo-1590938847175-55255d8a90a2?q=80&w=2000'),

          ('Lyon', 'Gastronomia francesa, casco historico y rios Saona y Rodano.', 1700, 'Francia', 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=2000'),
          ('Marsella', 'Puerto mediterraneo, calanques y cultura provenzal.', 1750, 'Francia', 'https://images.unsplash.com/photo-1588260695969-1f2ee2327c26?q=80&w=2000'),
          ('Niza', 'Costa Azul, paseo maritimo y ambiente mediterraneo elegante.', 1900, 'Francia', 'https://images.unsplash.com/photo-1533614767277-8780f17ffbb0?q=80&w=2000'),

          ('Florencia', 'Arte renacentista, catedral historica y patrimonio italiano.', 1800, 'Italia', 'https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=2000'),
          ('Venecia', 'Canales, gondolas, palacios y plazas iconicas.', 2100, 'Italia', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2000'),
          ('Milan', 'Moda, catedral gotica, diseño y vida urbana italiana.', 1900, 'Italia', 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=2000'),

          ('Edimburgo', 'Castillo, calles medievales, cultura escocesa y festivales.', 1700, 'Reino Unido', 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=2000'),
          ('Manchester', 'Musica, futbol, patrimonio industrial y cultura urbana.', 1650, 'Reino Unido', 'https://images.unsplash.com/photo-1571857114908-67e6d657e1bb?q=80&w=2000'),
          ('Oxford', 'Universidad historica, colegios antiguos y arquitectura inglesa.', 1600, 'Reino Unido', 'https://images.unsplash.com/photo-1587920277771-52d2b9f4f7b6?q=80&w=2000'),

          ('Santorini', 'Casas blancas, caldera volcanica y atardeceres sobre el Egeo.', 1900, 'Grecia', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000'),
          ('Mykonos', 'Playas, molinos, casas cicladicas y vida nocturna.', 1950, 'Grecia', 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=2000'),
          ('Tesalonica', 'Historia bizantina, paseo maritimo y cultura griega moderna.', 1500, 'Grecia', 'https://images.unsplash.com/photo-1598620617137-2ab990aadd88?q=80&w=2000'),

          ('Salzburgo', 'Musica clasica, fortalezas, palacios y paisaje alpino.', 1700, 'Austria', 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2000'),
          ('Innsbruck', 'Montañas alpinas, casco historico y deportes de invierno.', 1750, 'Austria', 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2000'),
          ('Graz', 'Casco historico, diseño contemporaneo y ambiente universitario.', 1500, 'Austria', 'https://images.unsplash.com/photo-1599900703137-f0e9295212bc?q=80&w=2000'),

          ('Sintra', 'Palacios de cuento, bosques y miradores cerca de Lisboa.', 1450, 'Portugal', 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000'),
          ('Faro', 'Costa del Algarve, casco antiguo y playas del sur portugues.', 1500, 'Portugal', 'https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=2000'),

          ('Cesky Krumlov', 'Castillo, calles medievales y encanto bohemio junto al rio.', 1450, 'República Checa', 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=2000'),
          ('Karlovy Vary', 'Balnearios, columnatas y arquitectura elegante.', 1450, 'República Checa', 'https://images.unsplash.com/photo-1596202339028-6f47a2e1696a?q=80&w=2000'),
          ('Brno', 'Arquitectura moderna, plazas historicas y ambiente universitario.', 1400, 'República Checa', 'https://images.unsplash.com/photo-1600670564764-0b8657b5d99f?q=80&w=2000'),

          ('Eger', 'Castillo, termas, vino y casco historico barroco.', 1400, 'Hungría', 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80&w=2000'),
          ('Pecs', 'Patrimonio romano, plazas coloridas y ambiente cultural.', 1400, 'Hungría', 'https://images.unsplash.com/photo-1624811539255-63489b3c9561?q=80&w=2000'),
          ('Szentendre', 'Calles artisticas, museos y ribera del Danubio.', 1350, 'Hungría', 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=2000'),

          ('Rotterdam', 'Arquitectura moderna, puerto y skyline neerlandes.', 1750, 'Países Bajos', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000'),
          ('La Haya', 'Palacios, costa, museos y centro politico neerlandes.', 1700, 'Países Bajos', 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2000'),
          ('Utrecht', 'Canales historicos, torres y ambiente universitario.', 1650, 'Países Bajos', 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2000'),

          ('Dubrovnik', 'Murallas historicas, mar Adriatico y casco antiguo medieval.', 1750, 'Croacia', 'https://images.unsplash.com/photo-1555990538-c48dbe0d6f4b?q=80&w=2000'),
          ('Split', 'Palacio de Diocleciano, costa dalmata y vida mediterranea.', 1650, 'Croacia', 'https://images.unsplash.com/photo-1555990538-c48dbe0d6f4b?q=80&w=2000'),
          ('Zagreb', 'Capital croata con plazas, museos y arquitectura centroeuropea.', 1500, 'Croacia', 'https://images.unsplash.com/photo-1598369412158-1726f2ff644a?q=80&w=2000'),
          ('Hvar', 'Isla luminosa, puerto historico y playas del Adriatico.', 1800, 'Croacia', 'https://images.unsplash.com/photo-1555990538-c48dbe0d6f4b?q=80&w=2000'),

          ('Copenhague', 'Canales, diseño nordico, puerto historico y ambiente moderno.', 1900, 'Dinamarca', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000'),
          ('Aarhus', 'Museos, barrios creativos y costa danesa.', 1700, 'Dinamarca', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000'),
          ('Odense', 'Ciudad de Andersen, calles historicas y ambiente familiar.', 1600, 'Dinamarca', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000'),
          ('Roskilde', 'Catedral, barcos vikingos y patrimonio danes.', 1600, 'Dinamarca', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2000'),

          ('Estocolmo', 'Islas, casco antiguo, museos y arquitectura nordica.', 1950, 'Suecia', 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000'),
          ('Gotemburgo', 'Canales, costa oeste, gastronomia y ambiente marinero.', 1750, 'Suecia', 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000'),
          ('Malmo', 'Puente de Oresund, diseño urbano y costa escandinava.', 1700, 'Suecia', 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000'),
          ('Uppsala', 'Universidad historica, catedral y vida cultural sueca.', 1650, 'Suecia', 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000'),

          ('Reykjavik', 'Naturaleza islandesa, auroras, volcanes y aguas termales.', 2400, 'Islandia', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000'),
          ('Akureyri', 'Fiordos del norte, naturaleza y ambiente islandes tranquilo.', 2300, 'Islandia', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000'),
          ('Vik', 'Playas negras, acantilados y paisajes volcanicos.', 2350, 'Islandia', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000'),
          ('Hofn', 'Glaciares, lagunas y paisajes del sureste islandes.', 2350, 'Islandia', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000'),

          ('Brujas', 'Canales, plazas medievales y arquitectura flamenca.', 1500, 'Bélgica', 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000'),
          ('Bruselas', 'Grand Place, arte, instituciones europeas y gastronomia belga.', 1600, 'Bélgica', 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000'),
          ('Gante', 'Canales, castillo medieval y ambiente universitario.', 1500, 'Bélgica', 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000'),
          ('Amberes', 'Moda, puerto, diamantes y arquitectura flamenca.', 1550, 'Bélgica', 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2000')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- ASIA
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Asia' LIMIT 1)
FROM (VALUES
          ('Osaka', 'Gastronomia japonesa, castillo historico y vida urbana vibrante.', 2050, 'Japón', 'https://source.unsplash.com/1600x900/?osaka,castle'),
          ('Hong Kong', 'Skyline, bahia Victoria, mercados y energia cosmopolita.', 2400, 'China', 'https://source.unsplash.com/1600x900/?hong-kong,skyline'),
          ('Taipei', 'Templos, rascacielos, mercados nocturnos y montanas cercanas.', 2100, 'Taiwan', 'https://source.unsplash.com/1600x900/?taipei,101'),
          ('Kuala Lumpur', 'Torres Petronas, cultura multicultural y gastronomia.', 1800, 'Malasia', 'https://source.unsplash.com/1600x900/?kuala-lumpur,petronas'),
          ('Phuket', 'Playas tropicales, islas, templos y vida costera.', 1700, 'Tailandia', 'https://source.unsplash.com/1600x900/?phuket,beach'),
          ('Siem Reap', 'Templos de Angkor, historia jemer y paisajes culturales.', 1650, 'Camboya', 'https://source.unsplash.com/1600x900/?angkor-wat'),
          ('Katmandu', 'Templos, Himalaya, plazas historicas y cultura nepali.', 1800, 'Nepal', 'https://source.unsplash.com/1600x900/?kathmandu,temple'),
          ('Doha', 'Arquitectura moderna, zocos, museos y costa del Golfo.', 2200, 'Catar', 'https://source.unsplash.com/1600x900/?doha,skyline'),
          ('Jerusalen', 'Historia, lugares sagrados y patrimonio cultural unico.', 1900, 'Israel', 'https://source.unsplash.com/1600x900/?jerusalem,old-city')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- AFRICA
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'África' LIMIT 1)
FROM (VALUES
          ('Luxor', 'Templos faraonicos, valle de los Reyes y ribera del Nilo.', 1500, 'Egipto', 'https://source.unsplash.com/1600x900/?luxor,temple'),
          ('Aswan', 'Nilo, templos nubios, islas y paisajes deserticos.', 1450, 'Egipto', 'https://source.unsplash.com/1600x900/?aswan,nile'),
          ('Fez', 'Medina historica, artesania, puertas monumentales y cultura marroqui.', 1250, 'Marruecos', 'https://source.unsplash.com/1600x900/?fez,morocco'),
          ('Chefchaouen', 'Calles azules, montanas del Rif y ambiente tradicional.', 1200, 'Marruecos', 'https://source.unsplash.com/1600x900/?chefchaouen,blue-city'),
          ('Mombasa', 'Costa keniana, playas, fuerte Jesus y cultura swahili.', 1900, 'Kenia', 'https://source.unsplash.com/1600x900/?mombasa,beach')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- OCEANIA
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Oceanía' LIMIT 1)
FROM (VALUES
          ('Brisbane', 'Rio, clima subtropical, cultura urbana y costa australiana.', 2350, 'Australia', 'https://source.unsplash.com/1600x900/?brisbane,skyline'),
          ('Cairns', 'Gran Barrera de Coral, selva tropical y aventura marina.', 2600, 'Australia', 'https://source.unsplash.com/1600x900/?cairns,great-barrier-reef'),
          ('Darwin', 'Naturaleza tropical, parques nacionales y cultura del norte.', 2450, 'Australia', 'https://source.unsplash.com/1600x900/?darwin,australia'),
          ('Adelaida', 'Vinedos, costa, cultura y ambiente tranquilo australiano.', 2300, 'Australia', 'https://source.unsplash.com/1600x900/?adelaide,australia'),
          ('Wellington', 'Capital neozelandesa con bahia, cultura y montanas cercanas.', 2450, 'Nueva Zelanda', 'https://source.unsplash.com/1600x900/?wellington,new-zealand'),
          ('Christchurch', 'Jardines, arquitectura renovada y puerta a los Alpes del Sur.', 2400, 'Nueva Zelanda', 'https://source.unsplash.com/1600x900/?christchurch,new-zealand'),
          ('Rotorua', 'Geiseres, cultura maori, lagos y actividad geotermal.', 2500, 'Nueva Zelanda', 'https://source.unsplash.com/1600x900/?rotorua,geothermal'),
          ('Nadi', 'Puerta de Fiyi, playas, resorts y cultura isleña.', 3000, 'Fiyi', 'https://source.unsplash.com/1600x900/?fiji,beach')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- AMERICA DEL NORTE
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Norte' LIMIT 1)
FROM (VALUES
          ('Miami', 'Playas, art deco, vida latina y ambiente costero.', 2300, 'Estados Unidos', 'https://source.unsplash.com/1600x900/?miami,beach'),
          ('Boston', 'Historia, universidades, barrios clasicos y costa atlantica.', 2250, 'Estados Unidos', 'https://source.unsplash.com/1600x900/?boston,skyline'),
          ('Washington DC', 'Monumentos nacionales, museos y arquitectura institucional.', 2200, 'Estados Unidos', 'https://source.unsplash.com/1600x900/?washington-dc,monument'),
          ('Seattle', 'Skyline, bahia, cafe, musica y naturaleza cercana.', 2400, 'Estados Unidos', 'https://source.unsplash.com/1600x900/?seattle,space-needle'),
          ('Montreal', 'Cultura francofona, casco antiguo y festivales urbanos.', 2100, 'Canada', 'https://source.unsplash.com/1600x900/?montreal,old-town'),
          ('Quebec', 'Murallas, encanto europeo y patrimonio historico canadiense.', 2050, 'Canada', 'https://source.unsplash.com/1600x900/?quebec-city'),
          ('Orlando', 'Parques tematicos, entretenimiento familiar y resorts.', 2150, 'Estados Unidos', 'https://source.unsplash.com/1600x900/?orlando,theme-park'),
          ('Tulum', 'Ruinas mayas, playas caribeñas y cenotes.', 1850, 'México', 'https://source.unsplash.com/1600x900/?tulum,mexico')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- AMERICA DEL SUR
INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Sur' LIMIT 1)
FROM (VALUES
          ('Cusco', 'Ciudad andina, patrimonio inca y acceso al Valle Sagrado.', 1750, 'Perú', 'https://source.unsplash.com/1600x900/?cusco,peru'),
          ('Valparaiso', 'Cerros coloridos, arte urbano, puerto y miradores.', 1650, 'Chile', 'https://source.unsplash.com/1600x900/?valparaiso,chile'),
          ('Salvador de Bahia', 'Cultura afrobrasileña, playas, musica y casco historico.', 1850, 'Brasil', 'https://source.unsplash.com/1600x900/?salvador-bahia'),
          ('Brasilia', 'Arquitectura moderna, urbanismo singular y edificios iconicos.', 1750, 'Brasil', 'https://source.unsplash.com/1600x900/?brasilia,architecture'),
          ('Punta del Este', 'Playas, puerto, lujo costero y ambiente veraniego.', 1900, 'Uruguay', 'https://source.unsplash.com/1600x900/?punta-del-este'),
          ('Bariloche', 'Lagos, montañas, chocolate y naturaleza patagonica.', 2200, 'Argentina', 'https://source.unsplash.com/1600x900/?bariloche,argentina'),
          ('Mendoza', 'Vinedos, Andes, gastronomia y rutas del vino.', 1850, 'Argentina', 'https://source.unsplash.com/1600x900/?mendoza,vineyard')
     ) AS v(nombre, descripcion, precio, pais, imagen)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================================================
-- HOTELES AUTOMATICOS PARA LOS 54 DESTINOS NUEVOS
-- 4 alojamientos por ciudad
-- =====================================================

WITH destinos_nuevos AS (
    SELECT d.id, d.nombre, d.pais, d.precio
    FROM destinos d
    WHERE d.nombre IN (
        'Barcelona','Sevilla','Valencia','Lyon','Marsella','Niza','Florencia','Venecia','Milan',
        'Edimburgo','Manchester','Oxford','Santorini','Mykonos','Tesalonica','Salzburgo','Innsbruck','Graz',
        'Sintra','Faro','Cesky Krumlov','Karlovy Vary','Brno','Eger','Pecs','Szentendre',
        'Rotterdam','La Haya','Utrecht','Dubrovnik','Split','Zagreb','Hvar','Copenhague','Aarhus','Odense','Roskilde',
        'Estocolmo','Gotemburgo','Malmo','Uppsala','Reykjavik','Akureyri','Vik','Hofn','Brujas','Bruselas','Gante','Amberes',
        'Osaka','Hong Kong','Taipei','Kuala Lumpur','Phuket','Siem Reap','Katmandu','Doha','Jerusalen',
        'Luxor','Aswan','Fez','Chefchaouen','Mombasa',
        'Brisbane','Cairns','Darwin','Adelaida','Wellington','Christchurch','Rotorua','Nadi',
        'Miami','Boston','Washington DC','Seattle','Montreal','Quebec','Orlando','Tulum',
        'Cusco','Valparaiso','Salvador de Bahia','Brasilia','Punta del Este','Bariloche','Mendoza'
    )
)
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at)
SELECT nd.nombre || ' Grand Hotel', nd.nombre, nd.pais, 'HOTEL', ROUND(nd.precio / 12.0), nd.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_nuevos nd
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = nd.nombre || ' Grand Hotel')
UNION ALL
SELECT nd.nombre || ' Boutique Suites', nd.nombre, nd.pais, 'HOTEL', ROUND(nd.precio / 10.0), nd.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_nuevos nd
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = nd.nombre || ' Boutique Suites')
UNION ALL
SELECT nd.nombre || ' Central Palace', nd.nombre, nd.pais, 'HOTEL', ROUND(nd.precio / 11.0), nd.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_nuevos nd
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = nd.nombre || ' Central Palace')
UNION ALL
SELECT nd.nombre || ' Vista Resort', nd.nombre, nd.pais, 'HOTEL', ROUND(nd.precio / 9.0), nd.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_nuevos nd
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = nd.nombre || ' Vista Resort');

-- Dos hoteles extra para destinos ya existentes, hasta dejar el catalogo mas variado
WITH destinos_existentes AS (
    SELECT d.id, d.nombre, d.pais, d.precio
    FROM destinos d
    WHERE d.nombre NOT IN (
        'Barcelona','Sevilla','Valencia','Lyon','Marsella','Niza','Florencia','Venecia','Milan',
        'Edimburgo','Manchester','Oxford','Santorini','Mykonos','Tesalonica','Salzburgo','Innsbruck','Graz',
        'Sintra','Faro','Cesky Krumlov','Karlovy Vary','Brno','Eger','Pecs','Szentendre',
        'Rotterdam','La Haya','Utrecht','Dubrovnik','Split','Zagreb','Hvar','Copenhague','Aarhus','Odense','Roskilde',
        'Estocolmo','Gotemburgo','Malmo','Uppsala','Reykjavik','Akureyri','Vik','Hofn','Brujas','Bruselas','Gante','Amberes',
        'Osaka','Hong Kong','Taipei','Kuala Lumpur','Phuket','Siem Reap','Katmandu','Doha','Jerusalen',
        'Luxor','Aswan','Fez','Chefchaouen','Mombasa',
        'Brisbane','Cairns','Darwin','Adelaida','Wellington','Christchurch','Rotorua','Nadi',
        'Miami','Boston','Washington DC','Seattle','Montreal','Quebec','Orlando','Tulum',
        'Cusco','Valparaiso','Salvador de Bahia','Brasilia','Punta del Este','Bariloche','Mendoza'
    )
)
INSERT INTO alojamientos (nombre, ciudad, pais, tipo, precio_por_noche, destino_id, created_at, updated_at)
SELECT de.nombre || ' Boutique Suites', de.nombre, de.pais, 'HOTEL', ROUND(de.precio / 10.0), de.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_existentes de
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = de.nombre || ' Boutique Suites')
UNION ALL
SELECT de.nombre || ' Central Palace', de.nombre, de.pais, 'HOTEL', ROUND(de.precio / 11.0), de.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM destinos_existentes de
WHERE NOT EXISTS (SELECT 1 FROM alojamientos a WHERE a.nombre = de.nombre || ' Central Palace');

-- Habitaciones para cualquier hotel que todavia no tenga habitaciones
WITH hoteles_sin_habitaciones AS (
    SELECT a.id, a.precio_por_noche
    FROM alojamientos a
    WHERE NOT EXISTS (
        SELECT 1 FROM habitacion h WHERE h.alojamiento_id = a.id
    )
)
INSERT INTO habitacion (tipo, capacidad, precio_por_noche, regimen, alojamiento_id, imagen_url)
SELECT h.tipo, h.capacidad, ROUND(a.precio_por_noche * h.factor), h.regimen, a.id, ''
FROM hoteles_sin_habitaciones a
         CROSS JOIN (VALUES
             ('Individual', 1, 0.75, 'SOLO_ALOJAMIENTO'),
             ('Doble', 2, 1.00, 'DESAYUNO'),
             ('Suite', 2, 1.60, 'MEDIA_PENSION')
         ) AS h(tipo, capacidad, factor, regimen);

SELECT COUNT(*) AS total_destinos_final FROM destinos;
SELECT COUNT(*) AS total_alojamientos_final FROM alojamientos;
SELECT COUNT(*) AS total_habitaciones_final FROM habitacion;
