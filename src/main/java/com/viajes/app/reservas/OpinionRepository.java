
package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findByAlojamientoId(Long alojamientoId);
    List<Opinion> findByUsuarioId(Long usuarioId);
    List<Opinion> findByUsuarioEmailOrderByFechaOpinionDesc(String email);
    Optional<Opinion> findByIdAndUsuarioEmail(Long id, String email);

    @Query("""
            select o.alojamiento.id, avg(o.puntuacion), count(o.id)
            from Opinion o
            where o.alojamiento.id in :alojamientoIds
            group by o.alojamiento.id
            """)
    List<Object[]> findRatingStatsByAlojamientoIds(@Param("alojamientoIds") Collection<Long> alojamientoIds);
}
