package com.viajes.app.cuentas;

import com.viajes.app.cuentas.dto.CuentaBancariaRequestDto;
import com.viajes.app.cuentas.dto.CuentaBancariaResponseDto;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CuentaBancariaServiceTest {

    @Mock
    private CuentaBancariaRepository cuentaBancariaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private CuentaBancariaService cuentaBancariaService;

    @Test
    void debeCrearCuentaBancariaCorrectamente() {
        String emailUsuario = "cliente1@viajes.com";

        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("es91 2100 0418 4502 0005 1332");
        dto.setTitular("Cliente Uno");
        dto.setEntidad("CaixaBank");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.empty());

        when(cuentaBancariaRepository.save(any(CuentaBancaria.class))).thenAnswer(invocation -> {
            CuentaBancaria cuenta = invocation.getArgument(0);
            ReflectionTestUtils.setField(cuenta, "id", 10L);
            return cuenta;
        });

        CuentaBancariaResponseDto response = cuentaBancariaService.crearCuenta(dto, emailUsuario);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Cliente Uno", response.getTitular());
        assertEquals("CaixaBank", response.getEntidad());
        assertEquals("CAIXESBBXXX", response.getSwiftBic());
        assertEquals("ES91 **** **** **** 1332", response.getIbanMascarado());
        assertTrue(response.getActiva());
        assertNotNull(response.getFechaRegistro());

        ArgumentCaptor<CuentaBancaria> captor = ArgumentCaptor.forClass(CuentaBancaria.class);
        verify(cuentaBancariaRepository).save(captor.capture());

        CuentaBancaria guardada = captor.getValue();
        assertEquals("ES9121000418450200051332", guardada.getIban());
        assertEquals("Cliente Uno", guardada.getTitular());
        assertEquals("CaixaBank", guardada.getEntidad());
        assertEquals("CAIXESBBXXX", guardada.getSwiftBic());
        assertTrue(guardada.getActiva());
        assertEquals(usuario, guardada.getUsuario());
        assertNotNull(guardada.getFechaRegistro());
    }

    @Test
    void debeLanzarErrorSiUsuarioNoExisteAlCrearCuenta() {
        String emailUsuario = "noexiste@viajes.com";

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("ES9121000418450200051332");
        dto.setTitular("Cliente Uno");
        dto.setEntidad("CaixaBank");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.crearCuenta(dto, emailUsuario));

        assertEquals("404 NOT_FOUND \"Usuario no encontrado\"", exception.getMessage());

        verify(usuarioRepository).findByEmail(emailUsuario);
        verify(cuentaBancariaRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiUsuarioYaTieneCuentaBancaria() {
        String emailUsuario = "cliente1@viajes.com";

        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);
        CuentaBancaria existente = crearCuenta(99L, "ES1111111111111111111111", "Cliente Uno", "Banco", "BIC", usuario);

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("ES9121000418450200051332");
        dto.setTitular("Cliente Uno");
        dto.setEntidad("CaixaBank");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.of(existente));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.crearCuenta(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"El usuario ya tiene una cuenta bancaria registrada\"", exception.getMessage());

        verify(cuentaBancariaRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiIbanEsObligatorio() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("   ");
        dto.setTitular("Cliente Uno");
        dto.setEntidad("CaixaBank");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.crearCuenta(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"El IBAN es obligatorio\"", exception.getMessage());

        verify(cuentaBancariaRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiTitularEsObligatorio() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("ES9121000418450200051332");
        dto.setTitular("   ");
        dto.setEntidad("CaixaBank");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.crearCuenta(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"El titular es obligatorio\"", exception.getMessage());

        verify(cuentaBancariaRepository, never()).save(any());
    }

    @Test
    void debeLanzarErrorSiEntidadEsObligatoria() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("ES9121000418450200051332");
        dto.setTitular("Cliente Uno");
        dto.setEntidad("   ");
        dto.setSwiftBic("CAIXESBBXXX");

        when(usuarioRepository.findByEmail(emailUsuario)).thenReturn(Optional.of(usuario));
        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.crearCuenta(dto, emailUsuario));

        assertEquals("400 BAD_REQUEST \"La entidad es obligatoria\"", exception.getMessage());

        verify(cuentaBancariaRepository, never()).save(any());
    }

    @Test
    void debeObtenerCuentaDelUsuario() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancaria cuenta = crearCuenta(
                10L,
                "ES9121000418450200051332",
                "Cliente Uno",
                "CaixaBank",
                "CAIXESBBXXX",
                usuario
        );
        cuenta.setActiva(true);
        cuenta.setFechaRegistro(LocalDateTime.now());

        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.of(cuenta));

        CuentaBancariaResponseDto response = cuentaBancariaService.obtenerMiCuenta(emailUsuario);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Cliente Uno", response.getTitular());
        assertEquals("CaixaBank", response.getEntidad());
        assertEquals("CAIXESBBXXX", response.getSwiftBic());
        assertEquals("ES91 **** **** **** 1332", response.getIbanMascarado());
        assertTrue(response.getActiva());
    }

    @Test
    void debeLanzarErrorSiNoExisteCuentaParaElUsuario() {
        String emailUsuario = "cliente1@viajes.com";

        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> cuentaBancariaService.obtenerMiCuenta(emailUsuario));

        assertEquals("404 NOT_FOUND \"No existe cuenta bancaria para este usuario\"", exception.getMessage());
    }

    @Test
    void debeActualizarCuentaCorrectamente() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancaria cuenta = crearCuenta(
                10L,
                "ES1111111111111111111111",
                "Titular Antiguo",
                "Banco Antiguo",
                "ANTIGUOXXX",
                usuario
        );
        cuenta.setActiva(true);
        cuenta.setFechaRegistro(LocalDateTime.now());

        CuentaBancariaRequestDto dto = new CuentaBancariaRequestDto();
        dto.setIban("ES7620770024003102575766");
        dto.setTitular("Cliente Actualizado");
        dto.setEntidad("Banco Santander");
        dto.setSwiftBic("BSCHESMMXXX");

        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.of(cuenta));
        when(cuentaBancariaRepository.save(any(CuentaBancaria.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CuentaBancariaResponseDto response = cuentaBancariaService.actualizarCuenta(dto, emailUsuario);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Cliente Actualizado", response.getTitular());
        assertEquals("Banco Santander", response.getEntidad());
        assertEquals("BSCHESMMXXX", response.getSwiftBic());
        assertEquals("ES76 **** **** **** 5766", response.getIbanMascarado());

        assertEquals("ES7620770024003102575766", cuenta.getIban());
        assertEquals("Cliente Actualizado", cuenta.getTitular());
        assertEquals("Banco Santander", cuenta.getEntidad());
        assertEquals("BSCHESMMXXX", cuenta.getSwiftBic());
    }

    @Test
    void debeEliminarCuentaCorrectamente() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancaria cuenta = crearCuenta(
                10L,
                "ES9121000418450200051332",
                "Cliente Uno",
                "CaixaBank",
                "CAIXESBBXXX",
                usuario
        );

        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.of(cuenta));

        assertDoesNotThrow(() -> cuentaBancariaService.eliminarCuenta(emailUsuario));

        verify(cuentaBancariaRepository).delete(cuenta);
    }

    @Test
    void debeEnmascararIbanEnLaRespuesta() {
        String emailUsuario = "cliente1@viajes.com";
        Usuario usuario = crearUsuario(1L, "cliente1", emailUsuario, Rol.USER);

        CuentaBancaria cuenta = crearCuenta(
                10L,
                "ES9121000418450200051332",
                "Cliente Uno",
                "CaixaBank",
                "CAIXESBBXXX",
                usuario
        );
        cuenta.setActiva(true);
        cuenta.setFechaRegistro(LocalDateTime.now());

        when(cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)).thenReturn(Optional.of(cuenta));

        CuentaBancariaResponseDto response = cuentaBancariaService.obtenerMiCuenta(emailUsuario);

        assertEquals("ES91 **** **** **** 1332", response.getIbanMascarado());
        assertNotEquals("ES9121000418450200051332", response.getIbanMascarado());
    }

    private Usuario crearUsuario(Long id, String username, String email, Rol rol) {
        Usuario usuario = new Usuario();
        ReflectionTestUtils.setField(usuario, "id", id);
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setPassword("hash");
        usuario.setRole(rol);
        usuario.setSaldo(java.math.BigDecimal.ZERO);
        return usuario;
    }

    private CuentaBancaria crearCuenta(Long id, String iban, String titular, String entidad, String swiftBic, Usuario usuario) {
        CuentaBancaria cuenta = new CuentaBancaria();
        ReflectionTestUtils.setField(cuenta, "id", id);
        cuenta.setIban(iban);
        cuenta.setTitular(titular);
        cuenta.setEntidad(entidad);
        cuenta.setSwiftBic(swiftBic);
        cuenta.setActiva(true);
        cuenta.setFechaRegistro(LocalDateTime.now());
        cuenta.setUsuario(usuario);
        return cuenta;
    }
}