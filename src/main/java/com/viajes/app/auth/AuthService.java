package com.viajes.app.auth;

import com.viajes.app.auth.dto.LoginRequest;
import com.viajes.app.auth.dto.LoginResponse;
import com.viajes.app.auth.dto.RegisterRequest;
import com.viajes.app.auth.dto.RegisterResponse;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce tu correo electrónico."
            );
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce tu contraseña."
            );
        }

        String email = request.getEmail().trim().toLowerCase();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Correo electrónico o contraseña incorrectos."
                ));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), usuario.getPassword());

        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Correo electrónico o contraseña incorrectos."
            );
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
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce tu nombre completo."
            );
        }

        if (request.getUsername().trim().length() < 3) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre debe tener al menos 3 caracteres."
            );
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce tu correo electrónico."
            );
        }

        String email = request.getEmail().trim().toLowerCase();

        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce un correo electrónico válido."
            );
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Introduce una contraseña."
            );
        }

        if (request.getPassword().trim().length() < 6) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La contraseña debe tener al menos 6 caracteres."
            );
        }

        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ya existe una cuenta con ese correo electrónico."
            );
        }

        if (usuarioRepository.findByUsername(request.getUsername().trim()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ya existe una cuenta con ese nombre de usuario."
            );
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername().trim());
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(request.getPassword().trim()));
        usuario.setRole(Rol.USER);
        usuario.setSaldo(BigDecimal.ZERO);

        Usuario guardado = usuarioRepository.save(usuario);

        return new RegisterResponse(
                guardado.getId(),
                guardado.getUsername(),
                guardado.getEmail(),
                guardado.getRole().name(),
                "Usuario registrado correctamente."
        );
    }
}