package com.viajes.app.users.dto;

import java.math.BigDecimal;

public class OperacionSaldoRequest {

    private BigDecimal cantidad;

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}