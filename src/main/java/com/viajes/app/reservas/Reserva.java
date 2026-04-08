package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Habitacion;
import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destino;

    private String hotel;

    private String vuelo;

    // 🔥 RELACIÓN CON HABITACIÓN
    @ManyToOne
    @JoinColumn(name = "habitacion_id")
    private Habitacion habitacion;

    // CONSTRUCTOR VACÍO
    public Reserva() {
    }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getHotel() {
        return hotel;
    }

    public void setHotel(String hotel) {
        this.hotel = hotel;
    }

    public String getVuelo() {
        return vuelo;
    }

    public void setVuelo(String vuelo) {
        this.vuelo = vuelo;
    }

    public Habitacion getHabitacion() {
        return habitacion;
    }

    public void setHabitacion(Habitacion habitacion) {
        this.habitacion = habitacion;
    }
}