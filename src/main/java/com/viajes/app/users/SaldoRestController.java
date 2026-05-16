// ProyectoViajesJMJ - com/viajes/app/users/SaldoRestController.java
// Responsabilidad: gestion de saldo y datos bancarios del usuario.
// Nota profesional: Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.

package com.viajes.app.users;

import com.viajes.app.users.dto.CalculoRequest;
import com.viajes.app.users.dto.OperacionSaldoRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
/**
 * Documento profesional: clase principal del archivo.
 * Agrupa datos bancarios y saldo visible; mantener validaciones alineadas con backend.
 */

@RestController
@RequestMapping("/api/saldo")
public class SaldoRestController {

    private final SaldoService saldoService;

    public SaldoRestController(SaldoService saldoService) {
        this.saldoService = saldoService;
    }

    @GetMapping
    public Map<String, BigDecimal> verSaldo(Authentication authentication) {
        String email = authentication.getName();
        BigDecimal saldo = saldoService.obtenerSaldoUsuario(email);
        return Map.of("saldo", saldo);
    }

    @PostMapping("/recargar")
    public Map<String, BigDecimal> recargar(Authentication authentication,
                                            @RequestBody OperacionSaldoRequest request) {
        String email = authentication.getName();
        BigDecimal saldo = saldoService.sumarSaldo(email, request.getCantidad());
        return Map.of("saldo", saldo);
    }

    @PostMapping("/gastar")
    public Map<String, BigDecimal> gastar(Authentication authentication,
                                          @RequestBody OperacionSaldoRequest request) {
        String email = authentication.getName();
        BigDecimal saldo = saldoService.restarSaldo(email, request.getCantidad());
        return Map.of("saldo", saldo);
    }

    @PostMapping("/calcular")
    public Map<String, BigDecimal> calcular(@RequestBody CalculoRequest request) {
        BigDecimal resultado;

        switch (request.getOperacion().toUpperCase()) {
            case "SUMAR":
                resultado = request.getValor1().add(request.getValor2());
                break;
            case "RESTAR":
                resultado = request.getValor1().subtract(request.getValor2());
                break;
            case "MULTIPLICAR":
                resultado = saldoService.multiplicar(request.getValor1(), request.getValor2());
                break;
            case "DIVIDIR":
                resultado = saldoService.dividir(request.getValor1(), request.getValor2());
                break;
            default:
                throw new RuntimeException("Operación no válida");
        }

        return Map.of("resultado", resultado);
    }
}
