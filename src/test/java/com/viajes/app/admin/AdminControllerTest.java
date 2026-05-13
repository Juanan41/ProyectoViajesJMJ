package com.viajes.app.admin;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.cuentas.CuentaBancaria;
import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.destinos.DestinoRepository;
import com.viajes.app.reservas.Opinion;
import com.viajes.app.reservas.OpinionRepository;
import com.viajes.app.reservas.Reserva;
import com.viajes.app.reservas.ReservaRepository;
import com.viajes.app.reservas.ReservaService;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminControllerTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private DestinoRepository destinoRepository;

    @Mock
    private AlojamientoRepository alojamientoRepository;

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private OpinionRepository opinionRepository;

    @Mock
    private CuentaBancariaRepository cuentaBancariaRepository;

    @Mock
    private ReservaService reservaService;

    @InjectMocks
    private AdminController adminController;

    @Test
    void debeListarUsuariosOrdenadosPorId() {
        Usuario segundo = crearUsuario(2L, "segundo", "segundo@viajes.com", Rol.USER);
        Usuario primero = crearUsuario(1L, "primero", "primero@viajes.com", Rol.ADMIN);

        when(usuarioRepository.findAll()).thenReturn(List.of(segundo, primero));

        List<Map<String, Object>> response = adminController.listarUsuarios();

        assertEquals(2, response.size());
        assertEquals(1L, response.get(0).get("id"));
        assertEquals("primero", response.get(0).get("username"));
        assertEquals("ADMIN", response.get(0).get("role"));
        assertEquals(2L, response.get(1).get("id"));
    }

    @Test
    void debeListarReservasDesdeElServicio() {
        ReservaResponseDto reserva = new ReservaResponseDto(
                1L,
                1L,
                1L,
                1L,
                "Madrid, Espana",
                "Hotel Central",
                "https://example.com/madrid.jpg",
                null,
                null,
                2L,
                1,
                250.0,
                "CONFIRMADA",
                null,
                "AVION",
                "Vuelo",
                null,
                null,
                null
        );

        when(reservaService.obtenerTodasReservas()).thenReturn(List.of(reserva));

        List<ReservaResponseDto> response = adminController.listarReservas();

        assertEquals(1, response.size());
        assertEquals(1L, response.get(0).getId());
        verify(reservaService).obtenerTodasReservas();
    }

    @Test
    void debeEliminarDestinoSinAlojamientosAsociados() {
        Destino destino = new Destino();

        when(destinoRepository.findById(7L)).thenReturn(Optional.of(destino));
        when(alojamientoRepository.findByDestinoId(7L)).thenReturn(List.of());

        Map<String, Object> response = adminController.eliminarDestino(7L);

        assertEquals("Destino eliminado", response.get("message"));
        verify(destinoRepository).delete(destino);
    }

    @Test
    void noDebeEliminarDestinoConAlojamientosAsociados() {
        Destino destino = new Destino();
        Alojamiento alojamiento = new Alojamiento();

        when(destinoRepository.findById(7L)).thenReturn(Optional.of(destino));
        when(alojamientoRepository.findByDestinoId(7L)).thenReturn(List.of(alojamiento));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> adminController.eliminarDestino(7L));

        assertEquals(
                "400 BAD_REQUEST \"No se puede borrar un destino con alojamientos asociados\"",
                exception.getMessage()
        );
        verify(destinoRepository, never()).delete(destino);
    }

    @Test
    void debeEliminarUsuarioYDatosRelacionadosFisicamente() {
        Usuario usuario = crearUsuario(3L, "cliente", "cliente@viajes.com", Rol.USER);
        CuentaBancaria cuenta = new CuentaBancaria();
        Opinion opinion = new Opinion();
        Reserva reserva = new Reserva();

        when(usuarioRepository.findById(3L)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail("cliente@viajes.com")).thenReturn(Optional.of(cuenta));
        when(opinionRepository.findByUsuarioId(3L)).thenReturn(List.of(opinion));
        when(reservaRepository.findByUsuarioId(3L)).thenReturn(List.of(reserva));

        Map<String, Object> response = adminController.eliminarUsuario(3L);

        assertEquals("Usuario eliminado", response.get("message"));
        verify(cuentaBancariaRepository).delete(cuenta);
        verify(opinionRepository).deleteAll(List.of(opinion));
        verify(reservaRepository).deleteAll(List.of(reserva));
        verify(usuarioRepository).delete(usuario);
    }

    @Test
    void noDebeEliminarAdministradores() {
        Usuario admin = crearUsuario(1L, "admin", "admin@viajes.com", Rol.ADMIN);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(admin));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> adminController.eliminarUsuario(1L));

        assertEquals("400 BAD_REQUEST \"No se puede borrar un administrador\"", exception.getMessage());
        verify(usuarioRepository, never()).delete(admin);
        verify(cuentaBancariaRepository, never()).delete(org.mockito.ArgumentMatchers.any());
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
}
