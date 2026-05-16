package com.viajes.app.users;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> obtenerUsuarioActual(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no autenticado");
        }

        String email = authentication.getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("id", usuario.getId());
        respuesta.put("username", usuario.getUsername());
        respuesta.put("email", usuario.getEmail());
        respuesta.put("role", usuario.getRole().name());
        respuesta.put("saldo", usuario.getSaldo());

        return respuesta;
    }
}