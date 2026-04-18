package com.viajes.app.auth.dto;

public class RegisterResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private String mensaje;

    public RegisterResponse(Long id, String username, String email, String role, String mensaje) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.mensaje = mensaje;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getMensaje() {
        return mensaje;
    }
}