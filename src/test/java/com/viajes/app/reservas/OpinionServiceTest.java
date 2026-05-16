// ProyectoViajesJMJ - com/viajes/app/reservas/OpinionServiceTest.java
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OpinionServiceTest {

    @Mock
    private OpinionRepository opinionRepository;

    @Mock
    private AlojamientoRepository alojamientoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private OpinionService opinionService;

    @Test
    void debeObtenerMisOpinionesConHotelYDestino() {
        String emailUsuario = "cliente1@viajes.com";
        Opinion opinion = crearOpinion(1L, "Hotel Central", "Paris", "cliente1", 5, "Muy buen viaje");

        when(opinionRepository.findByUsuarioEmailOrderByFechaOpinionDesc(emailUsuario))
                .thenReturn(List.of(opinion));

        List<OpinionDTO> response = opinionService.getMisOpiniones(emailUsuario);

        assertEquals(1, response.size());
        assertEquals(1L, response.get(0).getId());
        assertEquals("Hotel Central", response.get(0).getAlojamientoNombre());
        assertEquals("Paris", response.get(0).getDestinoNombre());
        assertEquals("cliente1", response.get(0).getNombreUsuario());
        assertEquals(5, response.get(0).getPuntuacion());
        assertEquals("Muy buen viaje", response.get(0).getComentario());
        verify(opinionRepository).findByUsuarioEmailOrderByFechaOpinionDesc(emailUsuario);
    }

    @Test
    void debeBorrarOpinionDelUsuarioFisicamente() {
        String emailUsuario = "cliente1@viajes.com";
        Opinion opinion = crearOpinion(1L, "Hotel Central", "Paris", "cliente1", 5, "Muy buen viaje");

        when(opinionRepository.findByIdAndUsuarioEmail(1L, emailUsuario)).thenReturn(Optional.of(opinion));

        opinionService.deleteOpinion(1L, emailUsuario);

        verify(opinionRepository).delete(opinion);
    }

    @Test
    void debeLanzarErrorSiOpinionNoExisteONoPerteneceAlUsuario() {
        String emailUsuario = "cliente1@viajes.com";

        when(opinionRepository.findByIdAndUsuarioEmail(99L, emailUsuario)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> opinionService.deleteOpinion(99L, emailUsuario));
    }

    @Test
    void debeCrearOpinionConUsuarioAutenticado() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(20L, "cliente1", emailUsuario);
        Alojamiento alojamiento = crearAlojamiento(10L, "Hotel Central", "Paris");

        CreateOpinionDTO dto = new CreateOpinionDTO(4, "Buen hotel");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(alojamientoRepository.findById(10L)).thenReturn(Optional.of(alojamiento));
        when(opinionRepository.save(any(Opinion.class))).thenAnswer(invocation -> {
            Opinion opinion = invocation.getArgument(0);
            opinion.setId(30L);
            return opinion;
        });

        OpinionDTO response = opinionService.addOpinion(10L, dto, emailUsuario);

        assertEquals(30L, response.getId());
        assertEquals("Hotel Central", response.getAlojamientoNombre());
        assertEquals("Paris", response.getDestinoNombre());
        assertEquals("cliente1", response.getNombreUsuario());
        assertEquals(4, response.getPuntuacion());
        assertEquals("Buen hotel", response.getComentario());
    }

    @Test
    void debeActualizarOpinionDelUsuario() {
        String emailUsuario = "cliente1@viajes.com";
        Opinion opinion = crearOpinion(1L, "Hotel Central", "Paris", "cliente1", 3, "Correcto");
        CreateOpinionDTO dto = new CreateOpinionDTO(5, "Mucho mejor");

        when(opinionRepository.findByIdAndUsuarioEmail(1L, emailUsuario)).thenReturn(Optional.of(opinion));
        when(opinionRepository.save(any(Opinion.class))).thenAnswer(invocation -> invocation.getArgument(0));

        OpinionDTO response = opinionService.updateOpinion(1L, dto, emailUsuario);

        assertEquals(5, response.getPuntuacion());
        assertEquals("Mucho mejor", response.getComentario());
        assertEquals(5, opinion.getPuntuacion());
        assertEquals("Mucho mejor", opinion.getComentario());
    }

    private Opinion crearOpinion(Long id,
                                 String alojamientoNombre,
                                 String destinoNombre,
                                 String username,
                                 Integer puntuacion,
                                 String comentario) {
        Alojamiento alojamiento = crearAlojamiento(10L, alojamientoNombre, destinoNombre);
        Usuario usuario = crearUsuario(20L, username, username + "@viajes.com");

        Opinion opinion = new Opinion();
        opinion.setId(id);
        opinion.setAlojamiento(alojamiento);
        opinion.setUsuario(usuario);
        opinion.setPuntuacion(puntuacion);
        opinion.setComentario(comentario);
        opinion.setFechaOpinion(LocalDateTime.now());
        return opinion;
    }

    private Alojamiento crearAlojamiento(Long id, String alojamientoNombre, String destinoNombre) {
        Destino destino = new Destino();
        ReflectionTestUtils.setField(destino, "id", 1L);
        destino.setNombre(destinoNombre);

        Alojamiento alojamiento = new Alojamiento();
        ReflectionTestUtils.setField(alojamiento, "id", id);
        alojamiento.setNombre(alojamientoNombre);
        alojamiento.setDestino(destino);
        return alojamiento;
    }

    private Usuario crearUsuario(Long id, String username, String email) {
        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", id);
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setPassword("hash");
        usuario.setRole(Rol.USER);
        return usuario;
    }
}
