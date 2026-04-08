package com.viajes.app.reservas;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    // 📋 VER TODAS LAS RESERVAS
    @GetMapping
    public String listarReservas(Model model) {
        model.addAttribute("reservas", reservaService.obtenerTodas());
        return "reservas/lista";
    }
}