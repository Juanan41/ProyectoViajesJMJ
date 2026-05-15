package com.viajes.app.alojamientos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class AlojamientoService {

    private final AlojamientoRepository repository;

    public AlojamientoService(AlojamientoRepository repository) {
        this.repository = repository;
    }

    public List<Alojamiento> obtenerTodos() {
        return repository.findAll();
    }

    public Alojamiento obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Alojamiento no encontrado"));
    }

    public Page<Alojamiento> obtenerPaginado(int page, int size, String search, String sort) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);

        Sort orden = switch (sort == null ? "nombre" : sort) {
            case "precio" -> Sort.by("precioPorNoche").ascending();
            case "destino" -> Sort.by("destino.nombre").ascending();
            default -> Sort.by("nombre").ascending();
        };

        String safeSearch = search == null ? "" : search.trim();

        return repository.buscarPaginado(safeSearch, PageRequest.of(safePage, safeSize, orden));
    }

    public List<Alojamiento> buscarPorDestinoNombre(String destinoNombre) {
        return repository.findByDestinoNombre(destinoNombre);
    }

    public List<Alojamiento> getAlojamientosPorDestino(Long destinoId) {
        return repository.findByDestinoId(destinoId);
    }

    public Alojamiento guardar(Alojamiento alojamiento) {
        return repository.save(alojamiento);
    }
}