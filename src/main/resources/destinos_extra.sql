-- =====================================================
-- INSERT DESTINOS EXTRA JMJ VIAJES
-- No borra datos existentes
-- Añade destinos, alojamientos y habitaciones
-- =====================================================

-- =====================
-- EUROPA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'Europa' LIMIT 1)
FROM (VALUES
          ('Lisboa', 'Capital portuguesa con tranvías, miradores, historia y gastronomía atlántica.', 1500, 'Portugal'),
          ('Oporto', 'Ciudad del norte de Portugal famosa por el vino, el río Duero y su casco histórico.', 1450, 'Portugal'),
          ('Praga', 'Ciudad medieval con castillo, puentes históricos y ambiente romántico.', 1600, 'República Checa'),
          ('Budapest', 'Capital húngara con termas, arquitectura imperial y el río Danubio.', 1550, 'Hungría'),
          ('Ámsterdam', 'Canales, bicicletas, museos y ambiente cosmopolita europeo.', 1800, 'Países Bajos')
         ) AS v(nombre, descripcion, precio, pais)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- ASIA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'Asia' LIMIT 1)
FROM (VALUES
          ('Singapur', 'Ciudad moderna con rascacielos, jardines futuristas y gastronomía internacional.', 2300, 'Singapur'),
          ('Kioto', 'Templos, jardines zen, tradición japonesa y cultura ancestral.', 2100, 'Japón'),
          ('Bali', 'Playas, templos, arrozales y ambiente tropical en Indonesia.', 1900, 'Indonesia'),
          ('Hanoi', 'Capital vietnamita con historia, mercados, lagos y gastronomía callejera.', 1600, 'Vietnam'),
          ('Maldivas', 'Islas paradisíacas, aguas turquesas y alojamientos sobre el mar.', 3400, 'Maldivas')
         ) AS v(nombre, descripcion, precio, pais)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- ÁFRICA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'África' LIMIT 1)
FROM (VALUES
          ('Túnez', 'Playas mediterráneas, zocos, historia antigua y cultura árabe.', 1200, 'Túnez'),
          ('Dakar', 'Capital senegalesa con cultura africana, costa atlántica y música.', 1600, 'Senegal'),
          ('Victoria Falls', 'Cataratas espectaculares y naturaleza salvaje en el sur de África.', 2400, 'Zimbabue'),
          ('Islas Seychelles', 'Playas paradisíacas, naturaleza protegida y turismo exclusivo.', 3200, 'Seychelles'),
          ('Addis Abeba', 'Capital etíope con historia, cultura y acceso a paisajes únicos.', 1700, 'Etiopía')
         ) AS v(nombre, descripcion, precio, pais)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- OCEANÍA
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'Oceanía' LIMIT 1)
FROM (VALUES
          ('Queenstown', 'Aventura, montañas, lagos y naturaleza extrema en Nueva Zelanda.', 2600, 'Nueva Zelanda'),
          ('Gold Coast', 'Playas, surf, parques temáticos y ambiente costero australiano.', 2400, 'Australia'),
          ('Hobart', 'Capital de Tasmania con naturaleza, puerto, gastronomía y paisajes salvajes.', 2500, 'Australia'),
          ('Samoa', 'Islas volcánicas, playas tranquilas y cultura polinesia.', 3000, 'Samoa'),
          ('Tahití', 'Destino tropical con lagunas, montaña, cultura polinesia y relax.', 3400, 'Polinesia Francesa')
         ) AS v(nombre, descripcion, precio, pais)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- AMÉRICA DEL NORTE
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'América del Norte' LIMIT 1)
FROM (VALUES
          ('Las Vegas', 'Entretenimiento, casinos, espectáculos y excursiones al desierto.', 2500, 'Estados Unidos'),
          ('Los Ángeles', 'Hollywood, playas, cultura urbana y ambiente cinematográfico.', 2700, 'Estados Unidos'),
          ('Vancouver', 'Ciudad moderna entre montañas, mar y naturaleza canadiense.', 2600, 'Canadá'),
          ('La Habana', 'Historia, música, coches clásicos y arquitectura colonial caribeña.', 1800, 'Cuba'),
          ('Punta Cana', 'Playas caribeñas, resorts todo incluido y aguas cristalinas.', 2100, 'República Dominicana')
         ) AS v(nombre, descripcion, precio, pais)
WHERE NOT EXISTS (
    SELECT 1 FROM destinos d WHERE d.nombre = v.nombre AND d.pais = v.pais
);

-- =====================
-- AMÉRICA DEL SUR
-- =====================
INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'América del Sur' LIMIT 1)
FROM (VALUES
          ('Lima', 'Capital peruana con gastronomía reconocida, costa e historia colonial.', 1800, 'Perú'),
          ('Quito', 'Ciudad andina con centro histórico, volcanes y cultura ecuatoriana.', 1750, 'Ecuador'),
          ('La Paz', 'Capital de altura con paisajes andinos, mercados y cultura boliviana.', 1700, 'Bolivia'),
          ('Ushuaia', 'Fin del mundo, naturaleza patagónica y paisajes de montaña y mar.', 2500, 'Argentina'),
          ('Medellín', 'Ciudad moderna, clima primaveral, cultura urbana y montaña.', 1800, 'Colombia')
         ) AS v(nombre, descripcion, precio, pais)
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