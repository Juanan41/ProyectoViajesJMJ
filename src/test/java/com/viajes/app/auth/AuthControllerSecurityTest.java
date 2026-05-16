package com.viajes.app.auth;

import com.viajes.app.auth.dto.LoginResponse;
import com.viajes.app.auth.dto.RegisterResponse;
import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import java.math.BigDecimal;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private UsuarioRepository usuarioRepository;

    @MockBean
    private CuentaBancariaRepository cuentaBancariaRepository;

    @Test
    @DisplayName("POST /api/auth/login debe responder 200 con credenciales válidas")
    void loginDebeResponder200ConCredencialesValidas() throws Exception {
        LoginResponse response = new LoginResponse(
                "token-falso",
                "Bearer",
                "cliente1@viajes.com",
                "USER"
        );

        when(authService.login(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "cliente1@viajes.com",
                                  "password": "1234"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token-falso"))
                .andExpect(jsonPath("$.type").value("Bearer"))
                .andExpect(jsonPath("$.email").value("cliente1@viajes.com"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @DisplayName("POST /api/auth/register debe responder 200 con datos válidos")
    void registerDebeResponder200ConDatosValidos() throws Exception {
        RegisterResponse response = new RegisterResponse(
                4L,
                "cliente1",
                "cliente1@viajes.com",
                "USER",
                "Usuario registrado correctamente"
        );

        when(authService.register(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "cliente1",
                                  "email": "cliente1@viajes.com",
                                  "password": "1234"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.username").value("cliente1"))
                .andExpect(jsonPath("$.email").value("cliente1@viajes.com"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.mensaje").value("Usuario registrado correctamente"));
    }

    @Test
    @DisplayName("GET /api/usuarios/me debe responder 403 sin token")
    void usuariosMeDebeResponder403SinToken() throws Exception {
        mockMvc.perform(get("/api/usuarios/me"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "cliente1@viajes.com", roles = {"USER"})
    @DisplayName("GET /api/usuarios/me debe responder 200 con usuario autenticado")
    void usuariosMeDebeResponder200ConTokenValido() throws Exception {
        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", 1L);
        usuario.setUsername("cliente1");
        usuario.setEmail("cliente1@viajes.com");
        usuario.setPassword("hash");
        usuario.setRole(Rol.USER);
        usuario.setSaldo(BigDecimal.ZERO);

        when(usuarioRepository.findByEmail("cliente1@viajes.com"))
                .thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail("cliente1@viajes.com"))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/usuarios/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("cliente1"))
                .andExpect(jsonPath("$.email").value("cliente1@viajes.com"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.tieneCuentaBancaria").value(false));
    }

    @Test
    @DisplayName("GET /api/admin/test debe responder 403 sin autenticación")
    void adminTestDebeResponder403SinToken() throws Exception {
        mockMvc.perform(get("/api/admin/test"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "cliente1@viajes.com", roles = {"USER"})
    @DisplayName("GET /api/admin/test debe responder 403 con rol USER")
    void adminTestDebeResponder403ConRolUser() throws Exception {
        mockMvc.perform(get("/api/admin/test"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "juan@viajes.com", roles = {"ADMIN"})
    @DisplayName("GET /api/admin/test debe responder 200 con rol ADMIN")
    void adminTestDebeResponder200ConRolAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Acceso permitido solo para ADMIN"));
    }
}