// ProyectoViajesJMJ - com/viajes/app/auth/dto/RegisterResponse.java
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

package com.viajes.app.auth.dto;

/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */
public class RegisterResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private String message;

    public RegisterResponse() {
    }

    public RegisterResponse(Long id, String username, String email, String role, String message) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}