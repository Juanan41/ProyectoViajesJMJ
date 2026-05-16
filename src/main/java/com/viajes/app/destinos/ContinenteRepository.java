// ProyectoViajesJMJ - com/viajes/app/destinos/ContinenteRepository.java
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

package com.viajes.app.destinos;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */
public interface ContinenteRepository extends JpaRepository<Continente, Long> {
    Optional<Continente> findByNombre(String nombre);
}
