// ProyectoViajesJMJ - com/viajes/app/users/UsuarioRepository.java
// Responsabilidad: perfil de usuario, datos personales y metricas visibles.
// Nota profesional: Expone informacion personal y metricas del usuario; preservar privacidad y consistencia.

package com.viajes.app.users;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Documento profesional: clase principal del archivo.
 * Expone informacion personal y metricas del usuario; preservar privacidad y consistencia.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByUsername(String username);

}