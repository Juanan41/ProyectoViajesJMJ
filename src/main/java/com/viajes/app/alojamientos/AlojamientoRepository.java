package com.viajes.app.alojamientos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlojamientoRepository extends JpaRepository<Alojamiento, Long> {

    List<Alojamiento> findByCiudad(String ciudad);
    List<Alojamiento> findByPais(String pais);
    List<Alojamiento> findByTipo(String tipo);
}