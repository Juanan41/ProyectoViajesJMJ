// ProyectoViajesJMJ - com/viajes/app/viajes/dto/RecomendacionRequest.java
// Responsabilidad: pieza de soporte usada por la aplicacion ProyectoViajesJMJ.
// Nota profesional: Objeto de transporte entre capas/API; mantener nombres estables para no romper el contrato JSON.

package com.viajes.app.viajes.dto;

/**
 * Documento profesional: clase principal del archivo.
 * Objeto de transporte entre capas/API; mantener nombres estables para no romper el contrato JSON.
 */
public class RecomendacionRequest {

    private String continente;
    private String clima;
    private String tipo;
    private String presupuesto;
    private String sugerencia;

    public String getContinente() {
        return continente;
    }

    public void setContinente(String continente) {
        this.continente = continente;
    }

    public String getClima() {
        return clima;
    }

    public void setClima(String clima) {
        this.clima = clima;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(String presupuesto) {
        this.presupuesto = presupuesto;
    }

    public String getSugerencia() {
        return sugerencia;
    }

    public void setSugerencia(String sugerencia) {
        this.sugerencia = sugerencia;
    }
}
