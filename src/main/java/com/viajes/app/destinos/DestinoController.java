package com.viajes.app.destinos;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/destinos")
public class DestinoController {

    private final DestinoService destinoService;

    public DestinoController(DestinoService destinoService){
        this.destinoService = destinoService;
    }

    @GetMapping
    public List<Destino> listarDestinos(){
        return destinoService.listarDestinos();
    }
}
