package com.viajes.app.auth;

import com.viajes.app.auth.dto.LoginRequest;
import com.viajes.app.auth.dto.LoginResponse;
import com.viajes.app.auth.dto.RegisterRequest;
import com.viajes.app.auth.dto.RegisterResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatusException(ResponseStatusException exception) {
        String message = exception.getReason() != null
                ? exception.getReason()
                : "Ha ocurrido un error al procesar la solicitud.";

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(Map.of("message", message));
    }
}