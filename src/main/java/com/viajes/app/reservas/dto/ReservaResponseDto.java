package com.viajes.app.reservas.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReservaResponseDto {

    private Long id;
    private String destino;
    private String hotel;
    private String transporte;
    private String tipoHabitacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Double precioTotal;
    private String estado;
    private LocalDateTime fechaReserva;

    public ReservaResponseDto(Long id,
                              String destino,
                              String hotel,
                              String transporte,
                              String tipoHabitacion,
                              LocalDate fechaInicio,
                              LocalDate fechaFin,
                              Double precioTotal,
                              String estado,
                              LocalDateTime fechaReserva) {
        this.id = id;
        this.destino = destino;
        this.hotel = hotel;
        this.transporte = transporte;
        this.tipoHabitacion = tipoHabitacion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.precioTotal = precioTotal;
        this.estado = estado;
        this.fechaReserva = fechaReserva;
    }

    public Long getId() {
        return id;
    }

    public String getDestino() {
        return destino;
    }

    public String getHotel() {
        return hotel;
    }

    public String getTransporte() {
        return transporte;
    }

    public String getTipoHabitacion() {
        return tipoHabitacion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public Double getPrecioTotal() {
        return precioTotal;
    }

    public String getEstado() {
        return estado;
    }

    public LocalDateTime getFechaReserva() {
        return fechaReserva;
    }
}