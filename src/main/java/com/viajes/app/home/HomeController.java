package com.viajes.app.home;

import com.viajes.app.api.UnsplashService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    private final UnsplashService unsplashService;

    public HomeController(UnsplashService unsplashService) {
        this.unsplashService = unsplashService;
        System.out.println(">>> HomeController CARGADO <<<");
    }

    // HOME
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // CONTINENTES (DINÁMICO)
    @GetMapping("/{continente}")
    public String continente(@PathVariable String continente, Model model) {

        switch (continente) {

            case "europa":
                cargarImagenes(model,
                        "Spain", "Paris", "Rome", "London", "Athens", "Vienna");
                break;

            case "asia":
                cargarImagenes(model,
                        "Tokyo", "Bangkok", "Beijing", "Dubai", "New Delhi", "Seoul");
                break;

            case "africa":
                cargarImagenes(model,
                        "El Cairo", "Marrakech", "Nairobi", "Zanzibar", "Sahara desert", "Cape Town");
                break;

            case "oceania":
                cargarImagenes(model,
                        "Sydney", "Melbourne", "Auckland", "Fiji", "Bora Bora", "Perth");
                break;

            case "america-norte":
                cargarImagenes(model,
                        "New York", "Mexico City", "Toronto", "San Francisco", "Cancun", "Chicago");
                break;

            case "america-sur":
                cargarImagenes(model,
                        "Rio de Janeiro", "Buenos Aires", "Machu Picchu", "Cartagena Colombia", "Santiago Chile", "Montevideo");
                break;

            default:
                return "redirect:/";
        }

        return "destinos/" + continente;
    }

    // MÉTODO AUXILIAR (REUTILIZABLE)
    private void cargarImagenes(Model model, String... ciudades) {

        for (int i = 0; i < ciudades.length; i++) {
            model.addAttribute("img" + i, unsplashService.obtenerImagen(ciudades[i]));
        }
    }

    // ESTANCIA
    @GetMapping("/estancia")
    public String estancia(@RequestParam String destino, Model model) {

        model.addAttribute("destino", destino);
        return "destinos/estancia";
    }
}
