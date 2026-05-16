// ProyectoViajesJMJ - com/viajes/app/destinos/Continente.java
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

package com.viajes.app.destinos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */

@Entity
public class Continente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    public Long getId() { return id; }

    public String getNombre() { return nombre; }

    public void setId(Long id) { this.id = id; }

    public void setNombre(String nombre) { this.nombre = nombre; }
}
