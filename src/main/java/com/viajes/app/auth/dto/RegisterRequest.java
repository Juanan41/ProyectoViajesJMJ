// ProyectoViajesJMJ - com/viajes/app/auth/dto/RegisterRequest.java
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

package com.viajes.app.auth.dto;

/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */
public class RegisterRequest {

    private String username;
    private String email;
    private String password;

    public RegisterRequest() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}