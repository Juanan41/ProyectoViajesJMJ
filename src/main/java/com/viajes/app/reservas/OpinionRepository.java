// ProyectoViajesJMJ - com/viajes/app/reservas/OpinionRepository.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findByAlojamientoId(Long alojamientoId);
    List<Opinion> findByUsuarioId(Long usuarioId);
    List<Opinion> findByUsuarioEmailOrderByFechaOpinionDesc(String email);
    Optional<Opinion> findByIdAndUsuarioEmail(Long id, String email);
}
