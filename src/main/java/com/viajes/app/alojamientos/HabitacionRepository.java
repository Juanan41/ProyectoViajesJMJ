// ProyectoViajesJMJ - com/viajes/app/alojamientos/HabitacionRepository.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {

    List<Habitacion> findByAlojamientoId(Long alojamientoId);

    List<Habitacion> findByAlojamiento_Nombre(String nombre);

    @Query("""
    SELECT h FROM Habitacion h
    JOIN h.alojamiento a
    JOIN a.destino d
    WHERE LOWER(d.nombre) LIKE LOWER(CONCAT('%', :destino, '%'))
    """)
    List<Habitacion> findByDestinoReal(@Param("destino") String destino);
}