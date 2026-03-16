package com.viajes.app.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
        return "europa";
    }

    @GetMapping("/asia")
    public String asia() {
        return "asia";
    }

    @GetMapping("/africa")
    public String africa() {
        return "africa";
    }

    @GetMapping("/oceania")
    public String oceania() {
        return "oceania";
    }

    @GetMapping("/americaNorte")
    public String americaNorte() {
        return "americaNorte";
    }

    @GetMapping("/americaSur")
    public String americaSur() {
        return "americaSur";
    }

}


