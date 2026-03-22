package com.viajes.app.alojamientos;

import jakarta.persistence.*;

@Entity
public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String ciudad;

    private String pais;

    private String tipo; // hotel, apartamento, resort...

    private Double precioPorNoche;

    // CONSTRUCTORES
    public Alojamiento() {
    }

    public Alojamiento(String nombre, String ciudad, String pais, String tipo, Double precioPorNoche) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.tipo = tipo;
        this.precioPorNoche = precioPorNoche;
    }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getPrecioPorNoche() {
        return precioPorNoche;
    }

    public void setPrecioPorNoche(Double precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }
}
