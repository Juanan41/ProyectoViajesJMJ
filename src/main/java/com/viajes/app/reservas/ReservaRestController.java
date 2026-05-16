// ProyectoViajesJMJ - com/viajes/app/reservas/ReservaRestController.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import com.viajes.app.reservas.dto.ReservaRequestDto;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */

@RestController
@RequestMapping("/api/reservas")
public class ReservaRestController {

    @Autowired
    private ReservaService reservaService;

    // 1. CREAR RESERVA
    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequestDto request, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("{\"message\": \"Usuario no autenticado\"}");
        }
        try {
            ReservaResponseDto reserva = reservaService.crearReserva(request, authentication.getName());
            return ResponseEntity.ok(reserva);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body("{\"message\": \"" + e.getReason() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Error interno al crear la reserva\"}");
        }
    }

    // 2. MIS RESERVAS (Protegido por orden y ruta)
    @GetMapping("/mis-reservas")
    public ResponseEntity<?> obtenerMisReservas(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("{\"message\": \"Usuario no autenticado\"}");
        }

        // Llama exactamente al método de tu servicio
        List<ReservaResponseDto> reservas = reservaService.obtenerReservasDeUsuario(authentication.getName());
        return ResponseEntity.ok(reservas);
    }

    // 3. OBTENER RESERVA POR ID (Blindado con regex \\d+ para que solo acepte números)
    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getReservaById(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("{\"message\": \"Usuario no autenticado\"}");
        }
        try {
            // Tu servicio exige ID y Email por seguridad
            ReservaResponseDto reserva = reservaService.obtenerReservaPorId(id, authentication.getName());
            return ResponseEntity.ok(reserva);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body("{\"message\": \"" + e.getReason() + "\"}");
        }
    }

    // 4. CANCELAR RESERVA
    @PostMapping("/{id:\\d+}/cancelar")
    public ResponseEntity<?> cancelarReserva(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("{\"message\": \"Usuario no autenticado\"}");
        }
        try {
            // Tu servicio exige ID y Email
            ReservaResponseDto reservaCancelada = reservaService.cancelarReserva(id, authentication.getName());
            return ResponseEntity.ok(reservaCancelada);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body("{\"message\": \"" + e.getReason() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error al cancelar: " + e.getMessage() + "\"}");
        }
    }

    // NOTA: El endpoint para "todas las reservas" del Admin lo he quitado
    // porque tu ReservaService actual no tiene ese método. Lo haremos más adelante.
}
