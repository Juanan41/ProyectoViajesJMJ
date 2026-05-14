package com.viajes.app.reservas.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReservaResponseDto {

    private Long id;
    private Long destinoId;
    private Long alojamientoId;
    private Long habitacionId;
    private Long usuarioId;
    private String usuarioUsername;
    private String usuarioEmail;
    private String destinoNombre;
    private String alojamientoNombre;
    private String imagenUrl;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Long noches;
    private Integer huespedes;
    private Double precioTotal;
    private String estado;
    private LocalDateTime fechaReserva;
    private String transporteTipo;
    private String transporteNombre;
    private String transporteHora;
    private String transporteAsiento;
    private String transportePuerta;

    public ReservaResponseDto(Long id,
                              Long destinoId,
                              Long alojamientoId,
                              Long habitacionId,
                              Long usuarioId,
                              String usuarioUsername,
                              String usuarioEmail,
                              String destinoNombre,
                              String alojamientoNombre,
                              String imagenUrl,
                              LocalDate checkIn,
                              LocalDate checkOut,
                              Long noches,
                              Integer huespedes,
                              Double precioTotal,
                              String estado,
                              LocalDateTime fechaReserva,
                              String transporteTipo,
                              String transporteNombre,
                              String transporteHora,
                              String transporteAsiento,
                              String transportePuerta) {
        this.id = id;
        this.destinoId = destinoId;
        this.alojamientoId = alojamientoId;
        this.habitacionId = habitacionId;
        this.usuarioId = usuarioId;
        this.usuarioUsername = usuarioUsername;
        this.usuarioEmail = usuarioEmail;
        this.destinoNombre = destinoNombre;
        this.alojamientoNombre = alojamientoNombre;
        this.imagenUrl = imagenUrl;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.noches = noches;
        this.huespedes = huespedes;
        this.precioTotal = precioTotal;
        this.estado = estado;
        this.fechaReserva = fechaReserva;
        this.transporteTipo = transporteTipo;
        this.transporteNombre = transporteNombre;
        this.transporteHora = transporteHora;
        this.transporteAsiento = transporteAsiento;
        this.transportePuerta = transportePuerta;
    }

    public Long getId() {
        return id;
    }

    public Long getDestinoId() {
        return destinoId;
    }

    public Long getAlojamientoId() {
        return alojamientoId;
    }

    public Long getHabitacionId() {
        return habitacionId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public String getUsuarioUsername() {
        return usuarioUsername;
    }

    public String getUsuarioEmail() {
        return usuarioEmail;
    }

    public String getDestinoNombre() {
        return destinoNombre;
    }

    public String getAlojamientoNombre() {
        return alojamientoNombre;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public Long getNoches() {
        return noches;
    }

    public Integer getHuespedes() {
        return huespedes;
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

    public String getTransporteTipo() {
        return transporteTipo;
    }

    public String getTransporteNombre() {
        return transporteNombre;
    }

    public String getTransporteHora() {
        return transporteHora;
    }

    public String getTransporteAsiento() {
        return transporteAsiento;
    }

    public String getTransportePuerta() {
        return transportePuerta;
    }
}
