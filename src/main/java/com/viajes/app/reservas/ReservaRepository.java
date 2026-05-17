package com.viajes.app.reservas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioEmail(String email);

    List<Reserva> findByUsuarioId(Long usuarioId);

    List<Reserva> findByUsuarioEmailOrderByFechaReservaDesc(String email);

    Optional<Reserva> findByIdAndUsuarioEmail(Long id, String email);

    long countByHabitacionAlojamientoId(Long alojamientoId);


    @Query("""
            select r.habitacion.alojamiento.id, count(r.id)
            from Reserva r
            where r.habitacion.alojamiento.id in :alojamientoIds
            group by r.habitacion.alojamiento.id
            """)
    List<Object[]> countByAlojamientoIds(@Param("alojamientoIds") Collection<Long> alojamientoIds);
}
