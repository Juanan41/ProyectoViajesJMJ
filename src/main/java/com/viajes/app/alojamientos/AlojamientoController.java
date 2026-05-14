package com.viajes.app.alojamientos;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alojamientos")
public class AlojamientoController {

    private final AlojamientoService alojamientoService;
    private final HabitacionService habitacionService;

    public AlojamientoController(AlojamientoService alojamientoService, HabitacionService habitacionService) {
        this.alojamientoService = alojamientoService;
        this.habitacionService = habitacionService;
    }

    @GetMapping
    public List<Map<String, Object>> listarAlojamientos() {
        return alojamientoService.obtenerTodos()
                .stream()
                .map(this::convertirADto)
                .toList();
    }

    @GetMapping("/destino/{destinoId}")
    public List<Map<String, Object>> listarPorDestino(@PathVariable Long destinoId) {
        return alojamientoService.getAlojamientosPorDestino(destinoId)
                .stream()
                .map(this::convertirADto)
                .toList();
    }

    @GetMapping("/{id}")
    public Map<String, Object> obtenerPorId(@PathVariable Long id) {
        Alojamiento alojamiento = alojamientoService.obtenerTodos()
                .stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Alojamiento no encontrado"));

        return convertirADto(alojamiento);
    }

    @GetMapping("/{id}/habitaciones")
    public List<Habitacion> listarHabitaciones(@PathVariable Long id) {
        return habitacionService.buscarPorAlojamiento(id);
    }

    private Map<String, Object> convertirADto(Alojamiento alojamiento) {
        Map<String, Object> dto = new LinkedHashMap<>();

        dto.put("id", alojamiento.getId());
        dto.put("nombre", alojamiento.getNombre());
        dto.put("ciudad", alojamiento.getCiudad());
        dto.put("pais", alojamiento.getPais());
        dto.put("tipo", alojamiento.getTipo().name());
        dto.put("precioPorNoche", alojamiento.getPrecioPorNoche());
        dto.put("precio", alojamiento.getPrecioPorNoche());

        if (alojamiento.getDestino() != null) {
            dto.put("destinoId", alojamiento.getDestino().getId());
            dto.put("destinoNombre", alojamiento.getDestino().getNombre());
        }

        dto.put("imagen", "https://picsum.photos/seed/hotel-" + alojamiento.getId() + "/900/600");

        agregarComodidades(dto, alojamiento);

        return dto;
    }

    private void agregarComodidades(Map<String, Object> dto, Alojamiento alojamiento) {
        TipoAlojamiento tipo = alojamiento.getTipo();
        Long id = alojamiento.getId() == null ? 0L : alojamiento.getId();

        boolean esHotel = tipo == TipoAlojamiento.HOTEL;
        boolean esResort = tipo == TipoAlojamiento.RESORT;
        boolean esApartamento = tipo == TipoAlojamiento.APARTAMENTO;
        boolean esHostal = tipo == TipoAlojamiento.HOSTAL;

        boolean wifi = true;
        boolean desayuno = esHotel || esResort || esHostal;
        boolean aireAcondicionado = esHotel || esResort || esApartamento;
        boolean camasKing = esHotel || esResort;
        boolean parking = esResort || esApartamento || id % 2 == 0;

        dto.put("wifi", wifi);
        dto.put("desayuno", desayuno);
        dto.put("aireAcondicionado", aireAcondicionado);
        dto.put("camasKing", camasKing);
        dto.put("parking", parking);
    }
}