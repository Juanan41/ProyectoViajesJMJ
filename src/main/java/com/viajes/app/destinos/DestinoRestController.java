// ProyectoViajesJMJ - com/viajes/app/destinos/DestinoRestController.java
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

package com.viajes.app.destinos;

import com.viajes.app.destinos.dto.DestinoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */


@RestController
@RequestMapping("/api/destinos")
public class DestinoRestController {

    @Autowired
    private DestinoService destinoService;

    @GetMapping
    public List<DestinoDTO> getDestinos() {
        return destinoService.listarDestinos();
    }

    @GetMapping("/{id}")
    public DestinoDTO getDestino(@PathVariable Long id) {
        return destinoService.obtenerDestino(id);
    }

    @GetMapping("/pais/{pais}")
    public List<DestinoDTO> getDestinosPorPais(@PathVariable String pais) {
        return destinoService.listarDestinosPorPais(pais);
    }

    @PostMapping
    public DestinoDTO crear(@RequestBody DestinoDTO dto) {
        return destinoService.guardarDesdeDTO(dto);
    }
}
