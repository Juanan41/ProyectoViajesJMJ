package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.reservas.dto.ReservaRequestDto;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private HabitacionRepository habitacionRepository;

    @InjectMocks
    private ReservaService reservaService;

    @Test
    void debeCrearReservaCorrectamente() {
        String emailUsuario = "cliente1@viajes.com";

        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(LocalDate.of(2026, 5, 15));
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        when(reservaRepository.save(any(Reserva.class))).thenAnswer(invocation -> {
            Reserva reserva = invocation.getArgument(0);
            ReflectionTestUtils.setField(reserva, "id", 10L);
            reserva.setFechaReserva(LocalDateTime.now());
            return reserva;
        });

        ReservaResponseDto response = reservaService.crearReserva(dto, emailUsuario);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("París", response.getDestino());
        assertEquals("Hotel Central", response.getHotel());
        assertEquals("AVION", response.getTransporte());
        assertEquals("DOBLE", response.getTipoHabitacion());
        assertEquals(LocalDate.of(2026, 5, 10), response.getFechaInicio());
        assertEquals(LocalDate.of(2026, 5, 15), response.getFechaFin());
        assertEquals(500.0, response.getPrecioTotal());
        assertEquals("CONFIRMADA", response.getEstado());
        assertNotNull(response.getFechaReserva());
    }

    @Test
    void debeLanzarErrorSiUsuarioNoExisteAlCrearReserva() {
        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(LocalDate.of(2026, 5, 15));
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail("noexiste@viajes.com")).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, "noexiste@viajes.com"));

        assertEquals("404 NOT_FOUND \"Usuario no encontrado\"", exception.getMessage());
    }

    @Test
    void debeLanzarErrorSiHabitacionNoExiste() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(99L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(LocalDate.of(2026, 5, 15));
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, emailUsuario));

        assertEquals("404 NOT_FOUND \"Habitación no encontrada\"", exception.getMessage());
    }

    @Test
    void debeLanzarErrorSiFechaInicioEsNula() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(null);
        dto.setFechaFin(LocalDate.of(2026, 5, 15));
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"Las fechas son obligatorias\"", exception.getMessage());
    }

    @Test
    void debeLanzarErrorSiFechaFinEsNula() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(null);
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"Las fechas son obligatorias\"", exception.getMessage());
    }

    @Test
    void debeLanzarErrorSiFechaFinEsAnteriorOIgualAFechaInicio() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(LocalDate.of(2026, 5, 10));
        dto.setTransporte("AVION");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"La fecha de fin debe ser posterior a la de inicio\"", exception.getMessage());
    }

    @Test
    void debeLanzarErrorSiTransporteEsInvalido() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 5, 10));
        dto.setFechaFin(LocalDate.of(2026, 5, 15));
        dto.setTransporte("COCHE");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.crearReserva(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"Transporte inválido\"", exception.getMessage());
    }

    @Test
    void debeCalcularCorrectamenteElPrecioTotalPorNoches() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        Habitacion habitacion = crearHabitacionCompleta(1L, "DOBLE", 80.0, "Roma", "Hotel Roma");

        ReservaRequestDto dto = new ReservaRequestDto();
        dto.setHabitacionId(1L);
        dto.setFechaInicio(LocalDate.of(2026, 7, 1));
        dto.setFechaFin(LocalDate.of(2026, 7, 4));
        dto.setTransporte("TREN");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(habitacionRepository.findById(1L)).thenReturn(Optional.of(habitacion));

        when(reservaRepository.save(any(Reserva.class))).thenAnswer(invocation -> {
            Reserva reserva = invocation.getArgument(0);
            ReflectionTestUtils.setField(reserva, "id", 11L);
            reserva.setFechaReserva(LocalDateTime.now());
            return reserva;
        });

        ReservaResponseDto response = reservaService.crearReserva(dto, emailUsuario);

        assertEquals(240.0, response.getPrecioTotal());
    }

    @Test
    void debeObtenerReservasDelUsuarioOrdenadasPorFechaDesc() {
        String emailUsuario = "cliente1@viajes.com";

        Reserva r1 = crearReserva(1L, "CONFIRMADA", TransporteTipo.AVION,
                LocalDate.of(2026, 5, 10), LocalDate.of(2026, 5, 15), 500.0,
                LocalDateTime.of(2026, 4, 20, 10, 0),
                crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central"));

        Reserva r2 = crearReserva(2L, "CONFIRMADA", TransporteTipo.TREN,
                LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 5), 300.0,
                LocalDateTime.of(2026, 4, 25, 12, 0),
                crearHabitacionCompleta(2L, "INDIVIDUAL", 75.0, "Roma", "Hotel Roma"));

        when(reservaRepository.findByUsuarioEmailOrderByFechaReservaDesc(emailUsuario))
                .thenReturn(List.of(r2, r1));

        List<ReservaResponseDto> response = reservaService.obtenerReservasDeUsuario(emailUsuario);

        assertEquals(2, response.size());
        assertEquals(2L, response.get(0).getId());
        assertEquals(1L, response.get(1).getId());
    }

    @Test
    void debeObtenerReservaPorIdSiPerteneceAlUsuario() {
        String emailUsuario = "cliente1@viajes.com";

        Reserva reserva = crearReserva(1L, "CONFIRMADA", TransporteTipo.AVION,
                LocalDate.of(2026, 5, 10), LocalDate.of(2026, 5, 15), 500.0,
                LocalDateTime.now(),
                crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central"));

        when(reservaRepository.findByIdAndUsuarioEmail(1L, emailUsuario))
                .thenReturn(Optional.of(reserva));

        ReservaResponseDto response = reservaService.obtenerReservaPorId(1L, emailUsuario);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("París", response.getDestino());
    }

    @Test
    void debeLanzarErrorSiReservaNoPerteneceAlUsuario() {
        when(reservaRepository.findByIdAndUsuarioEmail(1L, "cliente1@viajes.com"))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.obtenerReservaPorId(1L, "cliente1@viajes.com"));

        assertEquals("404 NOT_FOUND \"Reserva no encontrada\"", exception.getMessage());
    }

    @Test
    void debeCancelarReservaCorrectamente() {
        String emailUsuario = "cliente1@viajes.com";

        Reserva reserva = crearReserva(1L, "CONFIRMADA", TransporteTipo.AVION,
                LocalDate.of(2026, 5, 10), LocalDate.of(2026, 5, 15), 500.0,
                LocalDateTime.now(),
                crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central"));

        when(reservaRepository.findByIdAndUsuarioEmail(1L, emailUsuario))
                .thenReturn(Optional.of(reserva));
        when(reservaRepository.save(any(Reserva.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ReservaResponseDto response = reservaService.cancelarReserva(1L, emailUsuario);

        assertEquals("CANCELADA", response.getEstado());
        assertEquals("CANCELADA", reserva.getEstado());
    }

    @Test
    void debeLanzarErrorSiReservaYaEstaCancelada() {
        String emailUsuario = "cliente1@viajes.com";

        Reserva reserva = crearReserva(1L, "CANCELADA", TransporteTipo.AVION,
                LocalDate.of(2026, 5, 10), LocalDate.of(2026, 5, 15), 500.0,
                LocalDateTime.now(),
                crearHabitacionCompleta(1L, "DOBLE", 100.0, "París", "Hotel Central"));

        when(reservaRepository.findByIdAndUsuarioEmail(1L, emailUsuario))
                .thenReturn(Optional.of(reserva));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> reservaService.cancelarReserva(1L, emailUsuario));

        assertEquals("400 BAD_REQUEST \"La reserva ya está cancelada\"", exception.getMessage());
    }

    private Usuario crearUsuario(Long id, String username, String email, Rol rol) {
        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", id);
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setPassword("hash");
        usuario.setRole(rol);
        usuario.setSaldo(BigDecimal.ZERO);
        return usuario;
    }

    private Habitacion crearHabitacionCompleta(Long id, String tipoHabitacion, Double precioPorNoche, String nombreDestino, String nombreHotel) {
        Destino destino = new Destino();
        ReflectionTestUtils.setField(destino, "id", 1L);
        destino.setNombre(nombreDestino);

        Alojamiento alojamiento = new Alojamiento();
        ReflectionTestUtils.setField(alojamiento, "id", 1L);
        alojamiento.setNombre(nombreHotel);
        alojamiento.setDestino(destino);

        Habitacion habitacion = new Habitacion();
        ReflectionTestUtils.setField(habitacion, "id", id);
        habitacion.setTipo(tipoHabitacion);
        habitacion.setPrecioPorNoche(precioPorNoche);
        habitacion.setAlojamiento(alojamiento);

        return habitacion;
    }

    private Reserva crearReserva(Long id,
                                 String estado,
                                 TransporteTipo transporte,
                                 LocalDate fechaInicio,
                                 LocalDate fechaFin,
                                 Double precioTotal,
                                 LocalDateTime fechaReserva,
                                 Habitacion habitacion) {
        Reserva reserva = new Reserva();
        ReflectionTestUtils.setField(reserva, "id", id);
        reserva.setEstado(estado);
        reserva.setTransporte(transporte);
        reserva.setFechaInicio(fechaInicio);
        reserva.setFechaFin(fechaFin);
        reserva.setPrecioTotal(precioTotal);
        reserva.setFechaReserva(fechaReserva);
        reserva.setHabitacion(habitacion);
        return reserva;
    }
}