package com.viajes.app.cuentas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CuentaBancariaRepository extends JpaRepository<CuentaBancaria, Long> {

    Optional<CuentaBancaria> findByUsuarioEmail(String email);

    Optional<CuentaBancaria> findByIban(String iban);
}