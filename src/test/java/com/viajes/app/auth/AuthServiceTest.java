package com.viajes.app.auth;

import com.viajes.app.auth.dto.LoginRequest;
import com.viajes.app.auth.dto.LoginResponse;
import com.viajes.app.auth.dto.RegisterRequest;
import com.viajes.app.auth.dto.RegisterResponse;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void debeHacerLoginCorrectamente() {
        LoginRequest request = new LoginRequest();
        request.setEmail("cliente1@viajes.com");
        request.setPassword("1234");

        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", 1L);
        usuario.setUsername("cliente1");
        usuario.setEmail("cliente1@viajes.com");
        usuario.setPassword("hash123");
        usuario.setRole(Rol.USER);

        when(usuarioRepository.findByEmail("cliente1@viajes.com"))
                .thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("1234", "hash123"))
                .thenReturn(true);
        when(jwtService.generateToken(usuario))
                .thenReturn("token-falso");

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("token-falso", response.getToken());
        assertEquals("Bearer", response.getType());
        assertEquals("cliente1@viajes.com", response.getEmail());
        assertEquals("USER", response.getRole());

        verify(usuarioRepository).findByEmail("cliente1@viajes.com");
        verify(passwordEncoder).matches("1234", "hash123");
        verify(jwtService).generateToken(usuario);
    }

    @Test
    void debeLanzarErrorSiUsuarioNoExisteEnLogin() {
        LoginRequest request = new LoginRequest();
        request.setEmail("noexiste@viajes.com");
        request.setPassword("1234");

        when(usuarioRepository.findByEmail("noexiste@viajes.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.login(request));

        assertEquals("Usuario no encontrado", exception.getMessage());

        verify(usuarioRepository).findByEmail("noexiste@viajes.com");
        verify(passwordEncoder, never()).matches(any(), any());
        verify(jwtService, never()).generateToken(any(Usuario.class));
    }

    @Test
    void debeLanzarErrorSiPasswordEsIncorrecta() {
        LoginRequest request = new LoginRequest();
        request.setEmail("cliente1@viajes.com");
        request.setPassword("mal123");

        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", 1L);
        usuario.setUsername("cliente1");
        usuario.setEmail("cliente1@viajes.com");
        usuario.setPassword("hash123");
        usuario.setRole(Rol.USER);

        when(usuarioRepository.findByEmail("cliente1@viajes.com"))
                .thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("mal123", "hash123"))
                .thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.login(request));

        assertEquals("Contraseña incorrecta", exception.getMessage());

        verify(usuarioRepository).findByEmail("cliente1@viajes.com");
        verify(passwordEncoder).matches("mal123", "hash123");
        verify(jwtService, never()).generateToken(any(Usuario.class));
    }

    @Test
    void debeRegistrarUsuarioCorrectamente() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("clienteNuevo");
        request.setEmail("nuevo@viajes.com");
        request.setPassword("1234");

        when(usuarioRepository.findByEmail("nuevo@viajes.com"))
                .thenReturn(Optional.empty());
        when(usuarioRepository.findByUsername("clienteNuevo"))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode("1234"))
                .thenReturn("hashRegistrado");

        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario u = invocation.getArgument(0);
            ReflectionTestUtils.setField(u, "id", 10L);
            return u;
        });

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("clienteNuevo", response.getUsername());
        assertEquals("nuevo@viajes.com", response.getEmail());
        assertEquals("USER", response.getRole());
        assertEquals("Usuario registrado correctamente", response.getMensaje());

        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        verify(usuarioRepository).save(captor.capture());

        Usuario guardado = captor.getValue();
        assertEquals("clienteNuevo", guardado.getUsername());
        assertEquals("nuevo@viajes.com", guardado.getEmail());
        assertEquals("hashRegistrado", guardado.getPassword());
        assertEquals(Rol.USER, guardado.getRole());
    }

    @Test
    void debeLanzarErrorSiEmailYaExisteEnRegistro() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("clienteNuevo");
        request.setEmail("repetido@viajes.com");
        request.setPassword("1234");

        Usuario existente = new Usuario();
        ReflectionTestUtils.setField(existente, "id", 2L);
        existente.setUsername("otro");
        existente.setEmail("repetido@viajes.com");
        existente.setPassword("hash");
        existente.setRole(Rol.USER);

        when(usuarioRepository.findByEmail("repetido@viajes.com"))
                .thenReturn(Optional.of(existente));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));

        assertEquals("Ya existe un usuario con ese email", exception.getMessage());

        verify(usuarioRepository).findByEmail("repetido@viajes.com");
        verify(usuarioRepository, never()).findByUsername(any());
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiUsernameYaExisteEnRegistro() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("clienteExistente");
        request.setEmail("nuevo@viajes.com");
        request.setPassword("1234");

        Usuario existente = new Usuario();
        ReflectionTestUtils.setField(existente, "id", 3L);
        existente.setUsername("clienteExistente");
        existente.setEmail("otro@viajes.com");
        existente.setPassword("hash");
        existente.setRole(Rol.USER);

        when(usuarioRepository.findByEmail("nuevo@viajes.com"))
                .thenReturn(Optional.empty());
        when(usuarioRepository.findByUsername("clienteExistente"))
                .thenReturn(Optional.of(existente));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));

        assertEquals("Ya existe un usuario con ese nombre", exception.getMessage());

        verify(usuarioRepository).findByEmail("nuevo@viajes.com");
        verify(usuarioRepository).findByUsername("clienteExistente");
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiUsernameEsObligatorio() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("   ");
        request.setEmail("nuevo@viajes.com");
        request.setPassword("1234");

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));

        assertEquals("El nombre de usuario es obligatorio", exception.getMessage());

        verify(usuarioRepository, never()).findByEmail(any());
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiPasswordEsObligatoria() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("clienteNuevo");
        request.setEmail("nuevo@viajes.com");
        request.setPassword("   ");

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));

        assertEquals("La contraseña es obligatoria", exception.getMessage());

        verify(usuarioRepository, never()).findByEmail(any());
        verify(usuarioRepository, never()).save(any());
    }
}