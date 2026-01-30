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
}


