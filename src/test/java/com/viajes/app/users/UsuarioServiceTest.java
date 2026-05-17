package com.viajes.app.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void debeListarUsuariosCorrectamente() {
        Usuario u1 = crearUsuario(1L, "juan", "juan@viajes.com", Rol.ADMIN);
        Usuario u2 = crearUsuario(2L, "cliente1", "cliente1@viajes.com", Rol.USER);

        when(usuarioRepository.findAll()).thenReturn(List.of(u1, u2));

        List<Usuario> usuarios = usuarioService.listarUsuarios();

        assertNotNull(usuarios);
        assertEquals(2, usuarios.size());
        assertEquals("juan", usuarios.get(0).getUsername());
        assertEquals("cliente1", usuarios.get(1).getUsername());

        verify(usuarioRepository).findAll();
    }

    @Test
    void debeDevolverListaVaciaSiNoHayUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(List.of());

        List<Usuario> usuarios = usuarioService.listarUsuarios();

        assertNotNull(usuarios);
        assertTrue(usuarios.isEmpty());

        verify(usuarioRepository).findAll();
    }

    @Test
    void debeGuardarUsuarioCorrectamente() {
        Usuario usuario = new Usuario();
        usuario.setUsername("clienteNuevo");
        usuario.setEmail("nuevo@viajes.com");
        usuario.setPassword("hash123");
        usuario.setRole(Rol.USER);
        usuario.setSaldo(BigDecimal.ZERO);

        when(usuarioRepository.save(usuario)).thenAnswer(invocation -> {
            Usuario guardado = invocation.getArgument(0);
            ReflectionTestUtils.setField(guardado, "id", 10L);
            return guardado;
        });

        Usuario resultado = usuarioService.guardar(usuario);

        assertNotNull(resultado);
        assertEquals("clienteNuevo", resultado.getUsername());
        assertEquals("nuevo@viajes.com", resultado.getEmail());
        assertEquals(Rol.USER, resultado.getRole());
        assertEquals(10L, ReflectionTestUtils.getField(resultado, "id"));

        verify(usuarioRepository).save(usuario);
    }

    @Test
    void debeGuardarUsuarioAdminCorrectamente() {
        Usuario usuario = new Usuario();
        usuario.setUsername("admin1");
        usuario.setEmail("admin@viajes.com");
        usuario.setPassword("hashAdmin");
        usuario.setRole(Rol.ADMIN);
        usuario.setSaldo(BigDecimal.ZERO);

        when(usuarioRepository.save(usuario)).thenAnswer(invocation -> {
            Usuario guardado = invocation.getArgument(0);
            ReflectionTestUtils.setField(guardado, "id", 20L);
            return guardado;
        });

        Usuario resultado = usuarioService.guardar(usuario);

        assertNotNull(resultado);
        assertEquals("admin1", resultado.getUsername());
        assertEquals("admin@viajes.com", resultado.getEmail());
        assertEquals(Rol.ADMIN, resultado.getRole());
        assertEquals(20L, ReflectionTestUtils.getField(resultado, "id"));

        verify(usuarioRepository).save(usuario);
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