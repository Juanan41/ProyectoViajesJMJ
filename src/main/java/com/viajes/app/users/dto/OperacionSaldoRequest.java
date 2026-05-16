// ProyectoViajesJMJ - com/viajes/app/users/dto/OperacionSaldoRequest.java
// Responsabilidad: gestion de saldo y datos bancarios del usuario.
// Nota profesional: Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.

package com.viajes.app.users.dto;

import java.math.BigDecimal;

/**
 * Documento profesional: clase principal del archivo.
 * Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.
 */
public class OperacionSaldoRequest {

    private BigDecimal cantidad;

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}