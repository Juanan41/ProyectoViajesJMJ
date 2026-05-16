// ProyectoViajesJMJ - com/viajes/app/cuentas/dto/CuentaBancariaResponseDto.java
// Responsabilidad: gestion de saldo y datos bancarios del usuario.
// Nota profesional: Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.

package com.viajes.app.cuentas.dto;

import java.time.LocalDateTime;

/**
 * Documento profesional: clase principal del archivo.
 * Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.
 */
public class CuentaBancariaResponseDto {

    private Long id;
    private String titular;
    private String entidad;
    private String swiftBic;
    private String ibanMascarado;
    private Boolean activa;
    private LocalDateTime fechaRegistro;

    public CuentaBancariaResponseDto(Long id,
                                     String titular,
                                     String entidad,
                                     String swiftBic,
                                     String ibanMascarado,
                                     Boolean activa,
                                     LocalDateTime fechaRegistro) {
        this.id = id;
        this.titular = titular;
        this.entidad = entidad;
        this.swiftBic = swiftBic;
        this.ibanMascarado = ibanMascarado;
        this.activa = activa;
        this.fechaRegistro = fechaRegistro;
    }

    public Long getId() {
        return id;
    }

    public String getTitular() {
        return titular;
    }

    public String getEntidad() {
        return entidad;
    }

    public String getSwiftBic() {
        return swiftBic;
    }

    public String getIbanMascarado() {
        return ibanMascarado;
    }

    public Boolean getActiva() {
        return activa;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }
}