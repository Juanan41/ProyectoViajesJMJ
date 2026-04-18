package com.viajes.app.destinos;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContinenteRepository extends JpaRepository<Continente, Long> {
    Optional<Continente> findByNombre(String nombre);
}
