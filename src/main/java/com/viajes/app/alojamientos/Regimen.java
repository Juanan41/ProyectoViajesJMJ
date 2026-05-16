// ProyectoViajesJMJ - com/viajes/app/alojamientos/Regimen.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */
public enum Regimen {

    SOLO_ALOJAMIENTO,
    DESAYUNO,
    MEDIA_PENSION,
    PENSION_COMPLETA,
    TODO_INCLUIDO;

    public String getNombreBonito() {
        return switch (this) {
            case SOLO_ALOJAMIENTO -> "Solo alojamiento";
            case DESAYUNO -> "Desayuno incluido";
            case MEDIA_PENSION -> "Media pensión";
            case PENSION_COMPLETA -> "Pensión completa";
            case TODO_INCLUIDO -> "Todo incluido";
        };
    }
}