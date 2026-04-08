package com.viajes.app.alojamientos;

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