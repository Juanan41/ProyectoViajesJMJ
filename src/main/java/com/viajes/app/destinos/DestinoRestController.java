package com.viajes.app.destinos;

import com.viajes.app.destinos.dto.DestinoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/destinos")
public class DestinoRestController {

    @Autowired
    private DestinoService destinoService;

    @GetMapping
    public List<DestinoDTO> getDestinos() {
        return destinoService.listarDestinos();
    }

    @PostMapping
    public DestinoDTO crear(@RequestBody DestinoDTO dto) {
        return destinoService.guardarDesdeDTO(dto);
    }
}