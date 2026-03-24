package com.viajes.app.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void guardar_deberiaDarDeAltaUsuario() {
        Usuario usuario = new Usuario();
        usuario.setUsername("maria");
        usuario.setEmail("maria@mail.com");
        usuario.setPassword("123456");
        usuario.setRole("USER");

        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        Usuario resultado = usuarioService.guardar(usuario);

        assertSame(usuario, resultado);
        verify(usuarioRepository).save(usuario);
    }

    @Test
    void listarUsuarios_deberiaRetornarUsuariosExistentes() {
        Usuario u1 = new Usuario();
        u1.setUsername("ana");

        Usuario u2 = new Usuario();
        u2.setUsername("juan");

        List<Usuario> esperados = List.of(u1, u2);
        when(usuarioRepository.findAll()).thenReturn(esperados);

        List<Usuario> resultado = usuarioService.listarUsuarios();

        assertEquals(2, resultado.size());
        assertEquals("ana", resultado.get(0).getUsername());
        verify(usuarioRepository).findAll();
    }
}

