// ProyectoViajesJMJ - com/viajes/app/viajes/dto/RecomendacionResponse.java
// Responsabilidad: pieza de soporte usada por la aplicacion ProyectoViajesJMJ.
// Nota profesional: Objeto de transporte entre capas/API; mantener nombres estables para no romper el contrato JSON.

package com.viajes.app.viajes.dto;

import com.viajes.app.alojamientos.Habitacion;

import java.util.List;
import java.util.Map;

/**
 * Documento profesional: clase principal del archivo.
 * Objeto de transporte entre capas/API; mantener nombres estables para no romper el contrato JSON.
 */
public class RecomendacionResponse {

    private String destino;
    private String descripcion;
    private String precio;
    private String imagen;
    private List<String> hoteles;
    private Map<String, List<Habitacion>> habitacionesPorHotel;

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<String> getHoteles() {
        return hoteles;
    }

    public void setHoteles(List<String> hoteles) {
        this.hoteles = hoteles;
    }

    public Map<String, List<Habitacion>> getHabitacionesPorHotel() {
        return habitacionesPorHotel;
    }

    public void setHabitacionesPorHotel(Map<String, List<Habitacion>> habitacionesPorHotel) {
        this.habitacionesPorHotel = habitacionesPorHotel;
    }
}