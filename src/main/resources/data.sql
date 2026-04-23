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
-- DESTINOS
-- =====================
-- aquí pegas TODOS tus INSERT INTO destinos

-- =====================
-- ALOJAMIENTOS
-- =====================
-- aquí pegas TODOS tus INSERT INTO alojamientos

-- =====================
-- HABITACIONES
-- =====================
-- aquí pegas TODOS tus INSERT INTO habitacion