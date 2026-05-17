package com.viajes.app.users;

import com.viajes.app.auth.JwtService;
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
    private final JwtService jwtService;

    public UsuarioController(UsuarioRepository usuarioRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    public Map<String, Object> obtenerUsuarioActual(Authentication authentication) {
        Usuario usuario = obtenerUsuarioAutenticado(authentication);
        return convertirADto(usuario, false);
    }

    @PutMapping("/me")
    public Map<String, Object> actualizarUsuarioActual(
            Authentication authentication,
            @RequestBody Map<String, Object> request
    ) {
        Usuario usuario = obtenerUsuarioAutenticado(authentication);

        String username = obtenerTexto(request, "username");
        String email = obtenerTexto(request, "email");
        String avatarUrl = obtenerTexto(request, "avatarUrl");

        if (username.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
        }

        if (email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio");
        }

        usuarioRepository.findByUsername(username).ifPresent(usuarioExistente -> {
            if (!usuarioExistente.getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un usuario con ese nombre");
            }
        });

        usuarioRepository.findByEmail(email).ifPresent(usuarioExistente -> {
            if (!usuarioExistente.getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un usuario con ese email");
            }
        });

        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setAvatarUrl(avatarUrl.isBlank() ? null : avatarUrl);

        Usuario actualizado = usuarioRepository.save(usuario);

        return convertirADto(actualizado, true);
    }

    private Usuario obtenerUsuarioAutenticado(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no autenticado");
        }

        String email = authentication.getName();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    private Map<String, Object> convertirADto(Usuario usuario, boolean incluirTokenNuevo) {
        Map<String, Object> respuesta = new LinkedHashMap<>();

        respuesta.put("id", usuario.getId());
        respuesta.put("username", usuario.getUsername());
        respuesta.put("email", usuario.getEmail());
        respuesta.put("avatarUrl", usuario.getAvatarUrl());
        respuesta.put("role", usuario.getRole().name());
        respuesta.put("saldo", usuario.getSaldo());

        if (incluirTokenNuevo) {
            respuesta.put("token", jwtService.generateToken(usuario.getEmail()));
        }

        return respuesta;
    }

    private String obtenerTexto(Map<String, Object> request, String key) {
        Object value = request.get(key);

        if (value == null) {
            return "";
        }

        return String.valueOf(value).trim();
    }
}
