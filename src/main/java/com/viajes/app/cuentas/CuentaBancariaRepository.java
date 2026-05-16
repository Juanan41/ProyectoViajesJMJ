// ProyectoViajesJMJ - com/viajes/app/cuentas/CuentaBancariaRepository.java
// Responsabilidad: gestion de saldo y datos bancarios del usuario.
// Nota profesional: Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.

package com.viajes.app.cuentas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Documento profesional: clase principal del archivo.
 * Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.
 */
public interface CuentaBancariaRepository extends JpaRepository<CuentaBancaria, Long> {

    Optional<CuentaBancaria> findByUsuarioId(Long usuarioId);

    Optional<CuentaBancaria> findByUsuarioEmail(String email);

    Optional<CuentaBancaria> findByIban(String iban);
}