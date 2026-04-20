package com.viajes.app.users;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class SaldoService {

    private final UsuarioRepository usuarioRepository;

    public SaldoService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public BigDecimal obtenerSaldoUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return usuario.getSaldo();
    }

    public BigDecimal sumarSaldo(String email, BigDecimal cantidad) {
        validarCantidad(cantidad);

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setSaldo(usuario.getSaldo().add(cantidad));
        usuarioRepository.save(usuario);

        return usuario.getSaldo();
    }

    public BigDecimal restarSaldo(String email, BigDecimal cantidad) {
        validarCantidad(cantidad);

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getSaldo().compareTo(cantidad) < 0) {
            throw new RuntimeException("Saldo insuficiente");
        }

        usuario.setSaldo(usuario.getSaldo().subtract(cantidad));
        usuarioRepository.save(usuario);

        return usuario.getSaldo();
    }

    public BigDecimal multiplicar(BigDecimal a, BigDecimal b) {
        validarCantidad(a);
        validarCantidad(b);
        return a.multiply(b);
    }

    public BigDecimal dividir(BigDecimal a, BigDecimal b) {
        validarCantidad(a);

        if (b == null || b.compareTo(BigDecimal.ZERO) == 0) {
            throw new RuntimeException("No se puede dividir entre cero");
        }

        return a.divide(b, 2, RoundingMode.HALF_UP);
    }

    private void validarCantidad(BigDecimal cantidad) {
        if (cantidad == null || cantidad.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que cero");
        }
    }
}