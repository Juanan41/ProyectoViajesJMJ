// ProyectoViajesJMJ - com/viajes/app/destinos/DestinoRepository.java
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

package com.viajes.app.destinos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */
public interface DestinoRepository extends JpaRepository<Destino,Long> {
	List<Destino> findByPaisIgnoreCase(String pais);
}
