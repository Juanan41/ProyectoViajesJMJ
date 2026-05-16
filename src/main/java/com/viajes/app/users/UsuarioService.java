// ProyectoViajesJMJ - com/viajes/app/users/UsuarioService.java
// Responsabilidad: perfil de usuario, datos personales y metricas visibles.
// Nota profesional: Expone informacion personal y metricas del usuario; preservar privacidad y consistencia.

package com.viajes.app.users;

import org.springframework.stereotype.Service;
import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Expone informacion personal y metricas del usuario; preservar privacidad y consistencia.
 */

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
