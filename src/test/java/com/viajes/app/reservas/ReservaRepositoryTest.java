package com.viajes.app.reservas;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@DataJpaTest(properties = {
        "spring.sql.init.mode=never"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ReservaRepositoryTest {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void debeBuscarReservasPorEmailDeUsuario() {
        prepararDatosBase();

        insertarReserva(
                1L,
                1L,
                1L,
                "CONFIRMADA",
                "AVION",
                LocalDate.of(2026, 5, 10),
                LocalDate.of(2026, 5, 15),
                500.0,
                LocalDateTime.of(2026, 4, 20, 10, 0)
        );

        List<Reserva> reservas = reservaRepository.findByUsuarioEmail("cliente1@viajes.com");

        assertNotNull(reservas);
        assertEquals(1, reservas.size());
        assertEquals(1L, reservas.get(0).getId());
    }

    @Test
    void debeBuscarReservaPorIdYEmailDeUsuario() {
        prepararDatosBase();

        insertarReserva(
                1L,
                1L,
                1L,
                "CONFIRMADA",
                "AVION",
                LocalDate.of(2026, 5, 10),
                LocalDate.of(2026, 5, 15),
                500.0,
                LocalDateTime.of(2026, 4, 20, 10, 0)
        );

        Optional<Reserva> reserva = reservaRepository.findByIdAndUsuarioEmail(1L, "cliente1@viajes.com");

        assertTrue(reserva.isPresent());
        assertEquals(1L, reserva.get().getId());
        assertEquals("CONFIRMADA", reserva.get().getEstado());
    }

    @Test
    void debeDevolverVacioSiLaReservaNoPerteneceAlUsuario() {
        prepararDatosBase();

        insertarReserva(
                1L,
                1L,
                1L,
                "CONFIRMADA",
                "AVION",
                LocalDate.of(2026, 5, 10),
                LocalDate.of(2026, 5, 15),
                500.0,
                LocalDateTime.of(2026, 4, 20, 10, 0)
        );

        Optional<Reserva> reserva = reservaRepository.findByIdAndUsuarioEmail(1L, "otro@viajes.com");

        assertTrue(reserva.isEmpty());
    }

    @Test
    void debeOrdenarReservasPorFechaReservaDesc() {
        prepararDatosBase();

        insertarReserva(
                1L,
                1L,
                1L,
                "CONFIRMADA",
                "AVION",
                LocalDate.of(2026, 5, 10),
                LocalDate.of(2026, 5, 15),
                500.0,
                LocalDateTime.of(2026, 4, 20, 10, 0)
        );

        insertarReserva(
                2L,
                1L,
                1L,
                "CONFIRMADA",
                "TREN",
                LocalDate.of(2026, 6, 1),
                LocalDate.of(2026, 6, 5),
                300.0,
                LocalDateTime.of(2026, 4, 25, 12, 0)
        );

        List<Reserva> reservas = reservaRepository.findByUsuarioEmailOrderByFechaReservaDesc("cliente1@viajes.com");

        assertNotNull(reservas);
        assertEquals(2, reservas.size());
        assertEquals(2L, reservas.get(0).getId());
        assertEquals(1L, reservas.get(1).getId());
    }

    private void prepararDatosBase() {
        insertarUsuario(1L, "cliente1", "cliente1@viajes.com", "USER");
        insertarContinente(1L, "Europa");
        insertarDestino(1L, "París", "Ciudad del amor", "Francia", "imagen.jpg", 1200.0, 1L);
        insertarAlojamiento(1L, "Hotel Central", "París", "Francia", "HOTEL", 100.0, 1L);
        insertarHabitacion(1L, "DOBLE", "DESAYUNO", "habitacion.jpg", 2, 100.0, 1L);
    }

    private void insertarUsuario(Long id, String username, String email, String role) {
        jdbcTemplate.update("""
            INSERT INTO usuarios (id, username, email, password, role, saldo)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
                id, username, email, "hash123", role, BigDecimal.ZERO);
    }

    private void insertarContinente(Long id, String nombre) {
        jdbcTemplate.update("""
                INSERT INTO continente (id, nombre)
                VALUES (?, ?)
                """,
                id, nombre);
    }

    private void insertarDestino(Long id, String nombre, String descripcion, String pais, String imagen, Double precio, Long continenteId) {
        jdbcTemplate.update("""
                INSERT INTO destinos (id, nombre, descripcion, pais, imagen, precio, continente_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                id, nombre, descripcion, pais, imagen, precio, continenteId);
    }

    private void insertarAlojamiento(Long id, String nombre, String ciudad, String pais, String tipo, Double precioPorNoche, Long destinoId) {
        jdbcTemplate.update("""
                INSERT INTO alojamientos (id, nombre, ciudad, pais, tipo, precio_por_noche, created_at, updated_at, destino_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                id,
                nombre,
                ciudad,
                pais,
                tipo,
                precioPorNoche,
                Timestamp.valueOf(LocalDateTime.now()),
                Timestamp.valueOf(LocalDateTime.now()),
                destinoId);
    }

    private void insertarHabitacion(Long id, String tipo, String regimen, String imagenUrl, Integer capacidad, Double precioPorNoche, Long alojamientoId) {
        jdbcTemplate.update("""
                INSERT INTO habitacion (id, tipo, regimen, imagen_url, capacidad, precio_por_noche, alojamiento_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                id, tipo, regimen, imagenUrl, capacidad, precioPorNoche, alojamientoId);
    }

    private void insertarReserva(Long id,
                                 Long usuarioId,
                                 Long habitacionId,
                                 String estado,
                                 String transporte,
                                 LocalDate fechaInicio,
                                 LocalDate fechaFin,
                                 Double precioTotal,
                                 LocalDateTime fechaReserva) {
        jdbcTemplate.update("""
                INSERT INTO reservas (id, usuario_id, habitacion_id, estado, transporte, fecha_inicio, fecha_fin, precio_total, fecha_reserva)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                id,
                usuarioId,
                habitacionId,
                estado,
                transporte,
                Date.valueOf(fechaInicio),
                Date.valueOf(fechaFin),
                precioTotal,
                Timestamp.valueOf(fechaReserva));
    }
}