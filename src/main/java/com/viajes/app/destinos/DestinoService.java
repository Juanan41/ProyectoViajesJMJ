package com.viajes.app.destinos;

import com.viajes.app.api.UnsplashService;
import com.viajes.app.destinos.dto.DestinoDTO;
import org.springframework.stereotype.Service;

import java.util.List;

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
                .map(this::convertirADTO)
                .collect(java.util.stream.Collectors.toList());
    }

    public DestinoDTO obtenerPorId(Long id) {
        Destino destino = destinoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destino no encontrado con id: " + id));

        return convertirADTO(destino);
    }

    public List<DestinoDTO> listarPorContinente(Long continenteId) {
        return destinoRepository.findByContinenteId(continenteId)
                .stream()
                .map(this::convertirADTO)
                .collect(java.util.stream.Collectors.toList());
    }

    public List<DestinoDTO> listarPorPais(String pais) {
        return destinoRepository.findByPaisIgnoreCase(pais)
                .stream()
                .map(this::convertirADTO)
                .collect(java.util.stream.Collectors.toList());
    }

    public DestinoDTO guardarDesdeDTO(DestinoDTO dto) {

        Destino d = new Destino();
        d.setNombre(dto.getNombre());
        d.setDescripcion(dto.getDescripcion());
        d.setPrecio(dto.getPrecio());
        d.setPais(dto.getPais());

        String imagen = unsplashService.obtenerImagen(dto.getNombre());
        d.setImagen(imagen);

        Continente continente = continenteRepository
                .findByNombre(dto.getContinente())
                .orElseThrow(() -> new RuntimeException("Continente no encontrado"));

        d.setContinente(continente);

        Destino guardado = destinoRepository.save(d);

        return convertirADTO(guardado);
    }

    private DestinoDTO convertirADTO(Destino destino) {
        String imagen = destino.getImagen();

        if (imagen == null || imagen.isEmpty()) {
            imagen = unsplashService.obtenerImagen(destino.getNombre());
        }

        String continente = destino.getContinente() != null
                ? destino.getContinente().getNombre()
                : null;

        return new DestinoDTO(
                destino.getId(),
                destino.getNombre(),
                destino.getDescripcion(),
                destino.getPrecio(),
                destino.getPais(),
                continente,
                imagen
        );
    }
}