package com.viajes.app.viajes;

public class FormularioViaje {

    private String continente;
    private String nombre;
    private String apellidos;
    private String email;
    private String direccion;

    private String clima;
    private String tipo;
    private String presupuesto;
    private String sugerencia;

    // GETTERS Y SETTERS

    public String getContinente() {
        return continente;
    }

    public void setContinente(String continente) {
        this.continente = continente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getClima() {
        return clima;
    }

    public void setClima(String clima) {
        this.clima = clima;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(String presupuesto) {
        this.presupuesto = presupuesto;
    }

    public String getSugerencia() {
        return sugerencia;
    }

    public void setSugerencia(String sugerencia) {
        this.sugerencia = sugerencia;
    }
}