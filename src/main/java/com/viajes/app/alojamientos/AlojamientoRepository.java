// ProyectoViajesJMJ - com/viajes/app/alojamientos/AlojamientoRepository.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */
public interface AlojamientoRepository extends JpaRepository<Alojamiento, Long> {

    List<Alojamiento> findByCiudad(String ciudad);

    List<Alojamiento> findByPais(String pais);

    List<Alojamiento> findByTipo(String tipo);

    List<Alojamiento> findByDestinoNombre(String nombre);

    List<Alojamiento> findByDestinoId(Long destinoId);

    @Query("""
            SELECT a
            FROM Alojamiento a
            LEFT JOIN a.destino d
            WHERE :search IS NULL
               OR :search = ''
               OR LOWER(a.nombre) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(a.ciudad) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(a.pais) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(d.nombre) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(d.pais) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<Alojamiento> buscarPaginado(@Param("search") String search, Pageable pageable);
}