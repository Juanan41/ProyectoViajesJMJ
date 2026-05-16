// ProyectoViajesJMJ - com/viajes/app/cuentas/CuentaBancaria.java
// Responsabilidad: gestion de saldo y datos bancarios del usuario.
// Nota profesional: Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.

package com.viajes.app.cuentas;

import com.viajes.app.users.Usuario;
import jakarta.persistence.*;

import java.time.LocalDateTime;
/**
 * Documento profesional: clase principal del archivo.
 * Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.
 */

@Entity
@Table(name = "cuentas_bancarias")
public class CuentaBancaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String iban;
    private String titular;
    private String entidad;
    private String swiftBic;
    private Boolean activa;
    private LocalDateTime fechaRegistro;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;

    public CuentaBancaria() {
    }

    public Long getId() {
        return id;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public String getSwiftBic() {
        return swiftBic;
    }

    public void setSwiftBic(String swiftBic) {
        this.swiftBic = swiftBic;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
