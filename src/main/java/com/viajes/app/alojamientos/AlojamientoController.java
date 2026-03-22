package com.viajes.app.alojamientos;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AlojamientoController {

    private final AlojamientoService service;

    // 🔥 IMPORTANTE: constructor
    public AlojamientoController(AlojamientoService service) {
        this.service = service;
    }

    @GetMapping("/alojamientos")
    public String verAlojamientos(Model model) {

        model.addAttribute("alojamientos", service.obtenerTodos());

        return "alojamientos/lista";
    }
}