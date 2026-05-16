// ProyectoViajesJMJ - com/viajes/app/reservas/ReservaRepository.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioEmail(String email);

    List<Reserva> findByUsuarioId(Long usuarioId);

    List<Reserva> findByUsuarioEmailOrderByFechaReservaDesc(String email);

    Optional<Reserva> findByIdAndUsuarioEmail(Long id, String email);

    long countByHabitacionAlojamientoId(Long alojamientoId);
}
