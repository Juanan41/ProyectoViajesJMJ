// ProyectoViajesJMJ - com/viajes/app/auth/dto/LoginRequest.java
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

package com.viajes.app.auth.dto;

/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */
public class LoginRequest {

    private String email;
    private String password;

    public LoginRequest() {
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