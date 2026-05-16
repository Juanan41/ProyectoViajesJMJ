// ProyectoViajesJMJ - com/viajes/app/auth/JwtService.java
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

package com.viajes.app.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */

@Service
public class JwtService {

    private final String SECRET = "mi_clave_secreta_super_segura_123456";

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
