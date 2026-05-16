// ProyectoViajesJMJ - com/viajes/app/destinos/DestinoService.java
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

package com.viajes.app.destinos;

import com.viajes.app.api.UnsplashService;
import com.viajes.app.destinos.dto.DestinoDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */

@Service
public class DestinoService {

    private final DestinoRepository destinoRepository;
    private final ContinenteRepository continenteRepository;
    private final UnsplashService unsplashService;

    public DestinoService(DestinoRepository destinoRepository,
                          ContinenteRepository continenteRepository,
                          UnsplashService unsplashService) {
        this.destinoRepository = destinoRepository;
        this.continenteRepository = continenteRepository;
        this.unsplashService = unsplashService;
    }

    public List<DestinoDTO> listarDestinos() {
        System.out.println("TOTAL DESTINOS EN BD: " + destinoRepository.count());

        return destinoRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public DestinoDTO obtenerDestino(Long id) {
        return destinoRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destino no encontrado"));
    }

    public List<DestinoDTO> listarDestinosPorPais(String pais) {
        if (pais == null || pais.isBlank()) {
            return List.of();
        }

        return destinoRepository.findByPaisIgnoreCase(pais.trim())
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public DestinoDTO guardarDesdeDTO(DestinoDTO dto) {
        validarDestino(dto);

        Destino destino = new Destino();
        destino.setNombre(dto.getNombre().trim());
        destino.setDescripcion(dto.getDescripcion() != null ? dto.getDescripcion().trim() : "");
        destino.setPrecio(dto.getPrecio());
        destino.setPais(dto.getPais().trim());
        destino.setImagen(resolverImagen(dto.getImagen(), dto.getNombre()));

        Continente continente = buscarContinente(dto.getContinente());
        destino.setContinente(continente);

        Destino guardado = destinoRepository.save(destino);
        return mapToDto(guardado);
    }

    public DestinoDTO actualizarDesdeDTO(Long id, DestinoDTO dto) {
        validarDestino(dto);

        Destino destino = destinoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destino no encontrado"));

        destino.setNombre(dto.getNombre().trim());
        destino.setDescripcion(dto.getDescripcion() != null ? dto.getDescripcion().trim() : "");
        destino.setPrecio(dto.getPrecio());
        destino.setPais(dto.getPais().trim());

        if (dto.getImagen() != null && !dto.getImagen().isBlank()) {
            destino.setImagen(dto.getImagen().trim());
        } else if (destino.getImagen() == null || destino.getImagen().isBlank()) {
            destino.setImagen(unsplashService.obtenerImagen(dto.getNombre()));
        }

        Continente continente = buscarContinente(dto.getContinente());
        destino.setContinente(continente);

        Destino actualizado = destinoRepository.save(destino);
        return mapToDto(actualizado);
    }

    private void validarDestino(DestinoDTO dto) {
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos del destino inválidos");
        }

        if (dto.getNombre() == null || dto.getNombre().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
        }

        if (dto.getPais() == null || dto.getPais().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El país es obligatorio");
        }

        if (dto.getContinente() == null || dto.getContinente().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El continente es obligatorio");
        }

        if (dto.getPrecio() == null || dto.getPrecio() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser mayor que 0");
        }
    }

    private Continente buscarContinente(String nombreContinente) {
        return continenteRepository
                .findByNombre(nombreContinente.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Continente no encontrado"));
    }

    private String resolverImagen(String imagen, String nombreDestino) {
        if (imagen != null && !imagen.isBlank()) {
            return imagen.trim();
        }

        return unsplashService.obtenerImagen(nombreDestino);
    }

    private DestinoDTO mapToDto(Destino destino) {
        String imagen = destino.getImagen();

        if (imagen == null || imagen.isEmpty()) {
            imagen = unsplashService.obtenerImagen(destino.getNombre());
        }

        return new DestinoDTO(
                destino.getId(),
                destino.getNombre(),
                destino.getDescripcion(),
                destino.getPrecio(),
                destino.getPais(),
                destino.getContinente() != null ? destino.getContinente().getNombre() : "",
                imagen
        );
    }
}
