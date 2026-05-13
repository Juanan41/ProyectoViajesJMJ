package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findByAlojamientoId(Long alojamientoId);
    List<Opinion> findByUsuarioId(Long usuarioId);
    List<Opinion> findByUsuarioEmailOrderByFechaOpinionDesc(String email);
    Optional<Opinion> findByIdAndUsuarioEmail(Long id, String email);
}
