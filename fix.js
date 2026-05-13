const fs = require('fs');
const path = 'src/main/resources/destinos_extra.sql';
let data = fs.readFileSync(path, 'utf8');

// Fix Africa
data = data.replace(
`          ('Islas Seychelles', 'Playas paradisíacas, naturaleza protegida y turismo exclusivo.', 3200, 'Seychelles'),
          ('Addis Abeba', 'Capital etíope con historia, cultura y acceso a paisajes únicos.', 1700, 'Etiopía')
         ) AS v(nombre, descripcion, precio, pais)`,
`          ('Islas Seychelles', 'Playas paradisíacas, naturaleza protegida y turismo exclusivo.', 3200, 'Seychelles', 'https://images.unsplash.com/photo-1588661623912-70b1cb160cf2?q=80&w=2070'),
          ('Addis Abeba', 'Capital etíope con historia, cultura y acceso a paisajes únicos.', 1700, 'Etiopía', 'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)`
);

// Fix Oceania
data = data.replace(
`INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'Oceanía' LIMIT 1)
FROM (VALUES
          ('Queenstown', 'Aventura, montañas, lagos y naturaleza extrema en Nueva Zelanda.', 2600, 'Nueva Zelanda'),
          ('Gold Coast', 'Playas, surf, parques temáticos y ambiente costero australiano.', 2400, 'Australia'),
          ('Hobart', 'Capital de Tasmania con naturaleza, puerto, gastronomía y paisajes salvajes.', 2500, 'Australia'),
          ('Samoa', 'Islas volcánicas, playas tranquilas y cultura polinesia.', 3000, 'Samoa'),
          ('Tahití', 'Destino tropical con lagunas, montaña, cultura polinesia y relax.', 3400, 'Polinesia Francesa')
         ) AS v(nombre, descripcion, precio, pais)`,
`INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'Oceanía' LIMIT 1)
FROM (VALUES
          ('Queenstown', 'Aventura, montañas, lagos y naturaleza extrema en Nueva Zelanda.', 2600, 'Nueva Zelanda', 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2070'),
          ('Gold Coast', 'Playas, surf, parques temáticos y ambiente costero australiano.', 2400, 'Australia', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070'),
          ('Hobart', 'Capital de Tasmania con naturaleza, puerto, gastronomía y paisajes salvajes.', 2500, 'Australia', 'https://images.unsplash.com/photo-1559160581-446700c2abdb?q=80&w=2070'),
          ('Samoa', 'Islas volcánicas, playas tranquilas y cultura polinesia.', 3000, 'Samoa', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'),
          ('Tahití', 'Destino tropical con lagunas, montaña, cultura polinesia y relax.', 3400, 'Polinesia Francesa', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)`
);

// Fix America del Norte
data = data.replace(
`INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'América del Norte' LIMIT 1)
FROM (VALUES
          ('Las Vegas', 'Entretenimiento, casinos, espectáculos y excursiones al desierto.', 2500, 'Estados Unidos'),
          ('Los Ángeles', 'Hollywood, playas, cultura urbana y ambiente cinematográfico.', 2700, 'Estados Unidos'),
          ('Vancouver', 'Ciudad moderna entre montañas, mar y naturaleza canadiense.', 2600, 'Canadá'),
          ('La Habana', 'Historia, música, coches clásicos y arquitectura colonial caribeña.', 1800, 'Cuba'),
          ('Punta Cana', 'Playas caribeñas, resorts todo incluido y aguas cristalinas.', 2100, 'República Dominicana')
         ) AS v(nombre, descripcion, precio, pais)`,
`INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Norte' LIMIT 1)
FROM (VALUES
          ('Las Vegas', 'Entretenimiento, casinos, espectáculos y excursiones al desierto.', 2500, 'Estados Unidos', 'https://images.unsplash.com/photo-1605810731422-b5e28a50de3f?q=80&w=2070'),
          ('Los Ángeles', 'Hollywood, playas, cultura urbana y ambiente cinematográfico.', 2700, 'Estados Unidos', 'https://images.unsplash.com/photo-1580659328221-d779fdfa7c78?q=80&w=2070'),
          ('Vancouver', 'Ciudad moderna entre montañas, mar y naturaleza canadiense.', 2600, 'Canadá', 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=2070'),
          ('La Habana', 'Historia, música, coches clásicos y arquitectura colonial caribeña.', 1800, 'Cuba', 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2070'),
          ('Punta Cana', 'Playas caribeñas, resorts todo incluido y aguas cristalinas.', 2100, 'República Dominicana', 'https://images.unsplash.com/photo-1580210023604-0328b9cc6711?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)`
);

// Fix America del Sur
data = data.replace(
`INSERT INTO destinos (nombre, descripcion, precio, pais, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais,
       (SELECT id FROM continente WHERE nombre = 'América del Sur' LIMIT 1)
FROM (VALUES
          ('Lima', 'Capital peruana con gastronomía reconocida, costa e historia colonial.', 1800, 'Perú'),
          ('Quito', 'Ciudad andina con centro histórico, volcanes y cultura ecuatoriana.', 1750, 'Ecuador'),
          ('La Paz', 'Capital de altura con paisajes andinos, mercados y cultura boliviana.', 1700, 'Bolivia'),
          ('Ushuaia', 'Fin del mundo, naturaleza patagónica y paisajes de montaña y mar.', 2500, 'Argentina'),
          ('Medellín', 'Ciudad moderna, clima primaveral, cultura urbana y montaña.', 1800, 'Colombia')
         ) AS v(nombre, descripcion, precio, pais)`,
`INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id)
SELECT v.nombre, v.descripcion, v.precio, v.pais, v.imagen,
       (SELECT id FROM continente WHERE nombre = 'América del Sur' LIMIT 1)
FROM (VALUES
          ('Lima', 'Capital peruana con gastronomía reconocida, costa e historia colonial.', 1800, 'Perú', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2070'),
          ('Quito', 'Ciudad andina con centro histórico, volcanes y cultura ecuatoriana.', 1750, 'Ecuador', 'https://images.unsplash.com/photo-1579698545802-861c8f1d7b00?q=80&w=2070'),
          ('La Paz', 'Capital de altura con paisajes andinos, mercados y cultura boliviana.', 1700, 'Bolivia', 'https://images.unsplash.com/photo-1580829891461-8ee3c2356c9a?q=80&w=2070'),
          ('Ushuaia', 'Fin del mundo, naturaleza patagónica y paisajes de montaña y mar.', 2500, 'Argentina', 'https://images.unsplash.com/photo-1518063319808-1f55819772ee?q=80&w=2070'),
          ('Medellín', 'Ciudad moderna, clima primaveral, cultura urbana y montaña.', 1800, 'Colombia', 'https://images.unsplash.com/photo-1563200049-74d30c5e3d74?q=80&w=2070')
         ) AS v(nombre, descripcion, precio, pais, imagen)`
);

fs.writeFileSync(path, data);
console.log('Fixed destinos_extra.sql');