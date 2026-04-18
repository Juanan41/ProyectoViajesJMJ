package com.viajes.app.reservas;

import com.viajes.app.reservas.dto.ReservaRequestDto;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaRestController {

    private final ReservaService reservaService;

    public ReservaRestController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ReservaResponseDto crearReserva(@RequestBody ReservaRequestDto dto) {
        String emailUsuario = getEmailAutenticado();
        return reservaService.crearReserva(dto, emailUsuario);
    }

    @GetMapping("/mias")
    public List<ReservaResponseDto> obtenerMisReservas() {
        String emailUsuario = getEmailAutenticado();
        return reservaService.obtenerReservasDeUsuario(emailUsuario);
    }

    @GetMapping("/{id}")
    public ReservaResponseDto obtenerReservaPorId(@PathVariable Long id) {
        String emailUsuario = getEmailAutenticado();
        return reservaService.obtenerReservaPorId(id, emailUsuario);
    }

    @PutMapping("/{id}/cancelar")
    public ReservaResponseDto cancelarReserva(@PathVariable Long id) {
        String emailUsuario = getEmailAutenticado();
        return reservaService.cancelarReserva(id, emailUsuario);
    }

    private String getEmailAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}