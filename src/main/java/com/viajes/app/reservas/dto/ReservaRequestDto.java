// ProyectoViajesJMJ - com/viajes/app/reservas/dto/ReservaRequestDto.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas.dto;

import java.time.LocalDate;

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
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