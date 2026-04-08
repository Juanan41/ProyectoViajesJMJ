package com.viajes.app.alojamientos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alojamientos")

public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nombre;

    @NotBlank
    @Column(nullable = false)
    private String ciudad;

    @NotBlank
    @Column(nullable = false)
    private String pais;

    @NotBlank
    @Column(nullable = false)
    private String tipo; // hotel, apartamento, resort...

    @NotNull
    @Positive
    @Column(nullable = false)
    private Double precioPorNoche;

    @OneToMany(mappedBy = "alojamiento", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Habitacion> habitaciones = new ArrayList<>();

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

    public List<Habitacion> getHabitaciones() {
        return habitaciones;
    }

    public void setHabitaciones(List<Habitacion> habitaciones) {
        this.habitaciones = habitaciones;
    }

    @Override
    public String toString() {
        return "Alojamiento{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", ciudad='" + ciudad + '\'' +
                ", pais='" + pais + '\'' +
                ", tipo='" + tipo + '\'' +
                ", precioPorNoche=" + precioPorNoche +
                '}';
    }
}
