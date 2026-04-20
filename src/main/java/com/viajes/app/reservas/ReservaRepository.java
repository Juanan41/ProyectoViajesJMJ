package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioEmail(String email);

    List<Reserva> findByUsuarioEmailOrderByFechaReservaDesc(String email);

    Optional<Reserva> findByIdAndUsuarioEmail(Long id, String email);
}