package com.viajes.app.auth;

import com.viajes.app.auth.dto.LoginRequest;
import com.viajes.app.auth.dto.LoginResponse;
import com.viajes.app.auth.dto.RegisterRequest;
import com.viajes.app.auth.dto.RegisterResponse;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository,
                       JwtService jwtService,
                       PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean matches = passwordEncoder.matches(request.getPassword(), usuario.getPassword());

        if (!matches) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(usuario.getEmail());

        return new LoginResponse(
                token,
                "Bearer",
                usuario.getEmail(),
                usuario.getRole().name()
        );
    }

    public RegisterResponse register(RegisterRequest request) {

        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("El nombre de usuario es obligatorio");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }

        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con ese email");
        }

        if (usuarioRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con ese nombre");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRole(Rol.USER);
        usuario.setSaldo(BigDecimal.ZERO);

        Usuario guardado = usuarioRepository.save(usuario);

        return new RegisterResponse(
                guardado.getId(),
                guardado.getUsername(),
                guardado.getEmail(),
                guardado.getRole().name(),
                "Usuario registrado correctamente"
        );
    }
}