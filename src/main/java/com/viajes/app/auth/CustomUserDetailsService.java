// ProyectoViajesJMJ - com/viajes/app/auth/CustomUserDetailsService.java
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

package com.viajes.app.auth;

import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getPassword(),
                List.of(() -> "ROLE_" + usuario.getRole())
        );
    }
}
