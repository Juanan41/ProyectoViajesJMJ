package com.viajes.app.reservas.dto;

import java.time.LocalDate;


public class ReservaRequestDto {

    private Long habitacionId;
    private String transporte;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer huespedes;

    public Long getHabitacionId() {
        return habitacionId;
    }

    public void setHabitacionId(Long habitacionId) {
        this.habitacionId = habitacionId;
    }

    public String getTransporte() {
        return transporte;
    }

    public void setTransporte(String transporte) {
        this.transporte = transporte;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getHuespedes() {
        return huespedes;
    }

    public void setHuespedes(Integer huespedes) {
        this.huespedes = huespedes;
    }
}
