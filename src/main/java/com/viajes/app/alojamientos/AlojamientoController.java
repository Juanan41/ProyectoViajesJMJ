// ProyectoViajesJMJ - com/viajes/app/alojamientos/AlojamientoController.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */

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

    @GetMapping("/paginado")
    public Map<String, Object> listarAlojamientosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "nombre") String sort
    ) {
        Page<Alojamiento> resultado = alojamientoService.obtenerPaginado(page, size, search, sort);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("content", resultado.getContent().stream().map(this::convertirADto).toList());
        response.put("page", resultado.getNumber());
        response.put("size", resultado.getSize());
        response.put("totalElements", resultado.getTotalElements());
        response.put("totalPages", resultado.getTotalPages());
        response.put("first", resultado.isFirst());
        response.put("last", resultado.isLast());

        return response;
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
        return convertirADto(alojamientoService.obtenerPorId(id));
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
        dto.put("reservas", 0);

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

        dto.put("wifi", true);
        dto.put("desayuno", esHotel || esResort || esHostal);
        dto.put("aireAcondicionado", esHotel || esResort || esApartamento);
        dto.put("camasKing", esHotel || esResort);
        dto.put("parking", esResort || esApartamento || id % 2 == 0);
    }
}
