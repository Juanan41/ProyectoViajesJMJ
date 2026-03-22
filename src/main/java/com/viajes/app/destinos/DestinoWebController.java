package com.viajes.app.destinos;

import com.viajes.app.api.UnsplashService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DestinoWebController {

    private final UnsplashService unsplashService;

    public DestinoWebController(UnsplashService unsplashService) {
        this.unsplashService = unsplashService;
    }

    @GetMapping("/prueba-imagen")
    public String pruebaImagen(Model model) {

        String resultado = unsplashService.obtenerImagen("paris");

        model.addAttribute("imagen", resultado);

        return "destinos/imagen";
    }
}