package com.viajes.app.reservas.dto;

public class ReservaResponseDto {

    private Long id;
    private String destino;
    private String hotel;
    private String vuelo;
    private String tipoHabitacion;

    // CONSTRUCTOR
    public ReservaResponseDto(Long id, String destino, String hotel, String vuelo, String tipoHabitacion) {
        this.id = id;
        this.destino = destino;
        this.hotel = hotel;
        this.vuelo = vuelo;
        this.tipoHabitacion = tipoHabitacion;
    }

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getDestino() {
        return destino;
    }

    public String getHotel() {
        return hotel;
    }

    public String getVuelo() {
        return vuelo;
    }

    public String getTipoHabitacion() {
        return tipoHabitacion;
    }
}