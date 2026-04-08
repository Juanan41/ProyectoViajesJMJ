package com.viajes.app.alojamientos;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/alojamientos")
public class AlojamientoController {

    private final AlojamientoService service;

    public AlojamientoController(AlojamientoService service) {
        this.service = service;
    }

    @GetMapping
    public String verAlojamientos(Model model) {
        model.addAttribute("alojamientos", service.obtenerTodos());
        return "alojamientos/lista";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("alojamiento", new Alojamiento());
        return "alojamientos/formulario";
    }

    @PostMapping
    public String guardar(@Valid @ModelAttribute Alojamiento alojamiento, BindingResult result) {

        if (result.hasErrors()) {
            return "alojamientos/formulario";
        }

        service.guardar(alojamiento);
        return "redirect:/alojamientos";
    }
}