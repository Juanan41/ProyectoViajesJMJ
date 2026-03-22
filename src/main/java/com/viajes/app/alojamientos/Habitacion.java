package com.viajes.app.alojamientos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String tipo; // individual, doble, suite...

    @Positive
    private int capacidad;

    @Positive
    private double precioPorNoche;

    @Enumerated(EnumType.STRING)
    private Regimen regimen;

    @ManyToOne
    @JoinColumn(name = "alojamiento_id")
    private Alojamiento alojamiento;

    // CONSTRUCTOR VACÍO
    public Habitacion() {
    }

    // CONSTRUCTOR COMPLETO
    public Habitacion(String tipo, int capacidad, double precioPorNoche, Regimen regimen, Alojamiento alojamiento) {
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.precioPorNoche = precioPorNoche;
        this.regimen = regimen;
        this.alojamiento = alojamiento;
    }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public double getPrecioPorNoche() {
        return precioPorNoche;
    }

    public void setPrecioPorNoche(double precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }

    public Regimen getRegimen() {
        return regimen;
    }

    public void setRegimen(Regimen regimen) {
        this.regimen = regimen;
    }

    public Alojamiento getAlojamiento() {
        return alojamiento;
    }

    public void setAlojamiento(Alojamiento alojamiento) {
        this.alojamiento = alojamiento;
    }

    // toString (debug PRO)
    @Override
    public String toString() {
        return "Habitacion{" +
                "id=" + id +
                ", tipo='" + tipo + '\'' +
                ", capacidad=" + capacidad +
                ", precioPorNoche=" + precioPorNoche +
                ", regimen=" + regimen +
                '}';
    }
}