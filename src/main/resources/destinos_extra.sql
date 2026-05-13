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
          ('Quito', 'Ciudad andina con centro histórico, volcanes y cultura ecuatoriana.', 1750, 'Ecuador', 'https://images.unsplash.com/photo-1579698545802-861c8f1d7b00?q=80&w=2070'),
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
                       'Lima', 'Quito', 'La Paz', 'Ushuaia', 'Medellín'
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