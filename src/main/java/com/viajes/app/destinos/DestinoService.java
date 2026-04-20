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
                .map(destino -> {

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
                            destino.getContinente().getNombre(),
                            imagen
                    );
                })
                .collect(java.util.stream.Collectors.toList());
    }

    // ✅ GUARDAR (DTO → ENTITY → DTO)
    public DestinoDTO guardarDesdeDTO(DestinoDTO dto){

        Destino d = new Destino();
        d.setNombre(dto.getNombre());
        d.setDescripcion(dto.getDescripcion());
        d.setPrecio(dto.getPrecio());
        d.setPais(dto.getPais());

        // 🔥 IMAGEN DESDE UNSPLASH
        String imagen = unsplashService.obtenerImagen(dto.getNombre());
        d.setImagen(imagen);

        // 🔥 CONTINENTE REAL
        Continente continente = continenteRepository
                .findByNombre(dto.getContinente())
                .orElseThrow(() -> new RuntimeException("Continente no encontrado"));

        d.setContinente(continente);

        Destino guardado = destinoRepository.save(d);

        return new DestinoDTO(
                guardado.getId(),
                guardado.getNombre(),
                guardado.getDescripcion(),
                guardado.getPrecio(),
                guardado.getPais(),
                guardado.getContinente().getNombre(),
                guardado.getImagen()
        );
    }
}
