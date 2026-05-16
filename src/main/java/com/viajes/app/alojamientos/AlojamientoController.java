// ProyectoViajesJMJ - com/viajes/app/alojamientos/AlojamientoController.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

import com.viajes.app.reservas.OpinionRepository;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */

@RestController
@RequestMapping("/api/alojamientos")
public class AlojamientoController {

    private final AlojamientoService alojamientoService;
    private final HabitacionService habitacionService;
    private final OpinionRepository opinionRepository;

    public AlojamientoController(
            AlojamientoService alojamientoService,
            HabitacionService habitacionService,
            OpinionRepository opinionRepository
    ) {
        this.alojamientoService = alojamientoService;
        this.habitacionService = habitacionService;
        this.opinionRepository = opinionRepository;
    }

    @GetMapping
    public List<Map<String, Object>> listarAlojamientos() {
        List<Alojamiento> alojamientos = alojamientoService.obtenerTodos();
        Map<Long, RatingStats> ratingStats = getRatingStats(alojamientos);

        return alojamientos.stream()
                .map(alojamiento -> convertirADto(alojamiento, ratingStats.get(alojamiento.getId())))
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
        Map<Long, RatingStats> ratingStats = getRatingStats(resultado.getContent());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("content", resultado.getContent().stream()
                .map(alojamiento -> convertirADto(alojamiento, ratingStats.get(alojamiento.getId())))
                .toList());
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
        List<Alojamiento> alojamientos = alojamientoService.getAlojamientosPorDestino(destinoId);
        Map<Long, RatingStats> ratingStats = getRatingStats(alojamientos);

        return alojamientos.stream()
                .map(alojamiento -> convertirADto(alojamiento, ratingStats.get(alojamiento.getId())))
                .toList();
    }

    @GetMapping("/{id}")
    public Map<String, Object> obtenerPorId(@PathVariable Long id) {
        Alojamiento alojamiento = alojamientoService.obtenerPorId(id);
        Map<Long, RatingStats> ratingStats = getRatingStats(List.of(alojamiento));
        return convertirADto(alojamiento, ratingStats.get(alojamiento.getId()));
    }

    @GetMapping("/{id}/habitaciones")
    public List<Habitacion> listarHabitaciones(@PathVariable Long id) {
        return habitacionService.buscarPorAlojamiento(id);
    }

    private Map<String, Object> convertirADto(Alojamiento alojamiento, RatingStats ratingStats) {
        Map<String, Object> dto = new LinkedHashMap<>();

        dto.put("id", alojamiento.getId());
        dto.put("nombre", alojamiento.getNombre());
        dto.put("ciudad", alojamiento.getCiudad());
        dto.put("pais", alojamiento.getPais());
        dto.put("tipo", alojamiento.getTipo().name());
        dto.put("precioPorNoche", alojamiento.getPrecioPorNoche());
        dto.put("precio", alojamiento.getPrecioPorNoche());
        dto.put("reservas", 0);
        dto.put("rating", ratingStats != null ? ratingStats.rating() : null);
        dto.put("estrellas", ratingStats != null ? ratingStats.rating() : null);
        dto.put("totalOpiniones", ratingStats != null ? ratingStats.total() : 0);
        dto.put("reviewCount", ratingStats != null ? ratingStats.total() : 0);
        dto.put("sinResenas", ratingStats == null || ratingStats.total() == 0);

        if (alojamiento.getDestino() != null) {
            dto.put("destinoId", alojamiento.getDestino().getId());
            dto.put("destinoNombre", alojamiento.getDestino().getNombre());
        }

        dto.put("imagen", obtenerImagenHotel(alojamiento));
        dto.put("imagenUrl", obtenerImagenHotel(alojamiento));

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

    private Map<Long, RatingStats> getRatingStats(List<Alojamiento> alojamientos) {
        List<Long> ids = alojamientos.stream()
                .map(Alojamiento::getId)
                .filter(id -> id != null)
                .toList();

        if (ids.isEmpty()) {
            return Map.of();
        }

        return opinionRepository.findRatingStatsByAlojamientoIds(ids)
                .stream()
                .collect(Collectors.toMap(
                        row -> (Long) row[0],
                        row -> new RatingStats(roundRating((Number) row[1]), ((Number) row[2]).longValue())
                ));
    }

    private double roundRating(Number rating) {
        if (rating == null) {
            return 0;
        }

        return BigDecimal.valueOf(rating.doubleValue())
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private record RatingStats(double rating, long total) {}

    private String obtenerImagenHotel(Alojamiento alojamiento) {
        String[] imagenes = {
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80"
        };

        Long id = alojamiento.getId() == null ? 0L : alojamiento.getId();
        return imagenes[Math.floorMod(id.intValue(), imagenes.length)];
    }
}
