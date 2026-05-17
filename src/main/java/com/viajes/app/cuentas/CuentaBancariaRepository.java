package com.viajes.app.cuentas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CuentaBancariaRepository extends JpaRepository<CuentaBancaria, Long> {

    List<CuentaBancaria> findAllByUsuarioId(Long usuarioId);

    List<CuentaBancaria> findAllByUsuarioEmail(String email);

    long countByUsuarioEmail(String email);

    Optional<CuentaBancaria> findByIban(String iban);

    default Optional<CuentaBancaria> findByUsuarioId(Long usuarioId) {
        return findAllByUsuarioId(usuarioId).stream().findFirst();
    }

    default Optional<CuentaBancaria> findByUsuarioEmail(String email) {
        return findAllByUsuarioEmail(email).stream().findFirst();
    }
}