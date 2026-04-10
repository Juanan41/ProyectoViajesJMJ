package com.viajes.app.alojamientos;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlojamientoService {

    private final AlojamientoRepository repository;

    public AlojamientoService(AlojamientoRepository repository) {
        this.repository = repository;
    }

    // Obtener todos los alojamientos
    public List<Alojamiento> obtenerTodos() {
        return repository.findAll();
    }
    // Obtener por nombre de destino
    public List<Alojamiento> buscarPorDestinoNombre(String destinoNombre) {
        return repository.findByDestinoNombre(destinoNombre);
    }

    // Guardar alojamiento
    public Alojamiento guardar(Alojamiento alojamiento) {
        return repository.save(alojamiento);
    }
}