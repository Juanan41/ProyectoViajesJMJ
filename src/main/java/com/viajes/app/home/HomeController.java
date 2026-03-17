package com.viajes.app.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class HomeController {

    public HomeController() {
        System.out.println(">>> HomeController CARGADO <<<");
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/europa")
    public String europa() {
        return "destinos/europa";
    }

    @GetMapping("/asia")
    public String asia() {
        return "destinos/asia";
    }

    @GetMapping("/africa")
    public String africa() {
        return "destinos/africa";
    }

    @GetMapping("/oceania")
    public String oceania() {
        return "destinos/oceania";
    }

    @GetMapping("/america-norte")
    public String americaNorte() {
        return "destinos/americaNorte";
    }

    @GetMapping("/america-sur")
    public String americaSur() {
        return "destinos/americaSur";
    }

    @GetMapping("/estancia")
    public String estancia(@RequestParam String destino,Model model) {

        model.addAttribute("destino" ,destino);
        return "destinos/estancia";
    }

}


