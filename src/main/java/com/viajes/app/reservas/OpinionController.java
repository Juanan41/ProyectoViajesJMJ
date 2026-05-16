// ProyectoViajesJMJ - com/viajes/app/reservas/OpinionController.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */

@RestController
@RequestMapping("/api/opiniones")
public class OpinionController {

    @Autowired
    private OpinionService opinionService;

    @GetMapping("/alojamiento/{id}")
    public ResponseEntity<List<OpinionDTO>> getOpinionesByAlojamiento(@PathVariable Long id) {
        return ResponseEntity.ok(opinionService.getOpinionesByAlojamiento(id));
    }

    @GetMapping("/mis")
    public ResponseEntity<List<OpinionDTO>> getMisOpiniones(Authentication authentication) {
        return ResponseEntity.ok(opinionService.getMisOpiniones(authentication.getName()));
    }

    @PostMapping("/alojamiento/{id}")
    public ResponseEntity<OpinionDTO> addOpinion(
            @PathVariable Long id,
            @RequestBody CreateOpinionDTO createOpinionDTO,
            Authentication authentication) {
        OpinionDTO newOpinion = opinionService.addOpinion(id, createOpinionDTO, authentication.getName());
        return ResponseEntity.ok(newOpinion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpinion(@PathVariable Long id, Authentication authentication) {
        opinionService.deleteOpinion(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<OpinionDTO> updateOpinion(
            @PathVariable Long id,
            @RequestBody CreateOpinionDTO createOpinionDTO,
            Authentication authentication) {
        return ResponseEntity.ok(opinionService.updateOpinion(id, createOpinionDTO, authentication.getName()));
    }
}
