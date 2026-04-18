package com.viajes.app.users;

import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.users.dto.UsuarioPerfilResponseDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UsuarioRestController {

    private final UsuarioRepository usuarioRepository;
    private final CuentaBancariaRepository cuentaBancariaRepository;

    public UsuarioRestController(UsuarioRepository usuarioRepository,
                                 CuentaBancariaRepository cuentaBancariaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.cuentaBancariaRepository = cuentaBancariaRepository;
    }

    @GetMapping("/usuarios/me")
    public UsuarioPerfilResponseDto obtenerMiPerfil() {

        String email = getEmailAutenticado();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean tieneCuentaBancaria = cuentaBancariaRepository.findByUsuarioEmail(email).isPresent();

        return new UsuarioPerfilResponseDto(
                usuario.getId(),
                usuario.getUsername(),
                usuario.getEmail(),
                usuario.getRole().name(),
                tieneCuentaBancaria
        );
    }

    @GetMapping("/admin/test")
    public String pruebaAdmin() {
        return "Acceso permitido solo para ADMIN";
    }

    private String getEmailAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}