package com.viajes.app.users.dto;

public class UsuarioPerfilResponseDto {

    private Long id;
    private String username;
    private String email;
    private String role;
    private boolean tieneCuentaBancaria;

    public UsuarioPerfilResponseDto(Long id, String username, String email, String role, boolean tieneCuentaBancaria) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.tieneCuentaBancaria = tieneCuentaBancaria;
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

    public boolean isTieneCuentaBancaria() {
        return tieneCuentaBancaria;
    }
}