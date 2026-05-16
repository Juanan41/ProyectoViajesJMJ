// ProyectoViajesJMJ - com/viajes/app/reservas/ReservaService.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionRepository;
import com.viajes.app.api.UnsplashService;
import com.viajes.app.destinos.Destino;
import com.viajes.app.reservas.dto.ReservaRequestDto;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HabitacionRepository habitacionRepository;
    private final UnsplashService unsplashService;

    public ReservaService(
            ReservaRepository reservaRepository,
            UsuarioRepository usuarioRepository,
            HabitacionRepository habitacionRepository,
            UnsplashService unsplashService
    ) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.habitacionRepository = habitacionRepository;
        this.unsplashService = unsplashService;
    }

    @Transactional
    public ReservaResponseDto crearReserva(ReservaRequestDto dto, String emailUsuario) {

        // La reserva se valida de nuevo en servidor aunque el frontend ya filtre opciones.
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitación no encontrada"));

        if (dto.getFechaInicio() == null || dto.getFechaFin() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Las fechas son obligatorias");
        }

        if (dto.getFechaInicio().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de inicio no puede ser anterior a hoy");
        }

        long noches = ChronoUnit.DAYS.between(dto.getFechaInicio(), dto.getFechaFin());

        if (noches <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de fin debe ser posterior a la de inicio");
        }

        TransporteTipo transporte;

        try {
            transporte = TransporteTipo.valueOf(dto.getTransporte().toUpperCase());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transporte inválido");
        }

        int huespedes = dto.getHuespedes() != null && dto.getHuespedes() > 0 ? dto.getHuespedes() : 1;

        if (huespedes > 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El máximo permitido es de 8 huéspedes");
        }

        if (habitacion.getCapacidad() < huespedes) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La habitación no tiene capacidad suficiente");
        }

        if (!esHabitacionCompatible(habitacion, huespedes)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La habitación seleccionada no es compatible con el número de huéspedes"
            );
        }

        // Precio canónico: habitación por noche y huésped, más el coste fijo del transporte elegido.
        double transporteCoste = getTransporteCoste(transporte);
        double precioTotal = (habitacion.getPrecioPorNoche() * noches * huespedes) + transporteCoste;
        BigDecimal precioTotalSaldo = BigDecimal.valueOf(precioTotal);

        if (usuario.getSaldo().compareTo(precioTotalSaldo) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saldo insuficiente");
        }

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);
        reserva.setTransporte(transporte);
        reserva.setFechaInicio(dto.getFechaInicio());
        reserva.setFechaFin(dto.getFechaFin());
        reserva.setHuespedes(huespedes);
        reserva.setPrecioTotal(precioTotal);
        reserva.setEstado("CONFIRMADA");
        reserva.setFechaReserva(LocalDateTime.now());

        Reserva guardada = reservaRepository.save(reserva);

        // El saldo se descuenta dentro de la misma transacción que crea la reserva confirmada.
        usuario.setSaldo(usuario.getSaldo().subtract(precioTotalSaldo));
        usuarioRepository.save(usuario);

        return mapToDto(guardada);
    }

    public List<ReservaResponseDto> obtenerReservasDeUsuario(String emailUsuario) {
        return reservaRepository.findByUsuarioEmailOrderByFechaReservaDesc(emailUsuario)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<ReservaResponseDto> obtenerTodasReservas() {
        return reservaRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(
                        Reserva::getFechaReserva,
                        Comparator.nullsLast(Comparator.naturalOrder())
                ).reversed())
                .map(this::mapToDto)
                .toList();
    }

    public ReservaResponseDto obtenerReservaPorId(Long id, String emailUsuario) {
        Reserva reserva = reservaRepository.findByIdAndUsuarioEmail(id, emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));

        return mapToDto(reserva);
    }

    public ReservaResponseDto cancelarReserva(Long id, String emailUsuario) {
        Reserva reserva = reservaRepository.findByIdAndUsuarioEmail(id, emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));

        if ("CANCELADA".equalsIgnoreCase(reserva.getEstado())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La reserva ya está cancelada");
        }

        reserva.setEstado("CANCELADA");

        Reserva actualizada = reservaRepository.save(reserva);
        return mapToDto(actualizada);
    }

    private ReservaResponseDto mapToDto(Reserva reserva) {
        Alojamiento alojamiento = reserva.getHabitacion().getAlojamiento();
        Destino destino = alojamiento.getDestino();

        String destinoNombre = destino.getNombre();
        String destinoPais = destino.getPais();

        String destinoLabel = destinoPais != null && !destinoPais.isBlank()
                ? destinoNombre + ", " + destinoPais
                : destinoNombre;

        String imagenUrl = destino.getImagen();

        if (imagenUrl == null || imagenUrl.isBlank()) {
            imagenUrl = unsplashService.obtenerImagen(destinoLabel);
        }

        long noches = ChronoUnit.DAYS.between(reserva.getFechaInicio(), reserva.getFechaFin());

        int huespedes = reserva.getHuespedes() != null && reserva.getHuespedes() > 0
                ? reserva.getHuespedes()
                : 1;

        TransporteTipo transporte = reserva.getTransporte();
        String transporteTipo = transporte != null ? transporte.name() : null;

        return new ReservaResponseDto(
                reserva.getId(),
                destino.getId(),
                alojamiento.getId(),
                reserva.getHabitacion().getId(),
                reserva.getUsuario() != null ? reserva.getUsuario().getId() : null,
                reserva.getUsuario() != null ? reserva.getUsuario().getUsername() : "",
                reserva.getUsuario() != null ? reserva.getUsuario().getEmail() : "",
                destinoLabel,
                alojamiento.getNombre(),
                imagenUrl,
                reserva.getFechaInicio(),
                reserva.getFechaFin(),
                noches,
                huespedes,
                reserva.getPrecioTotal(),
                reserva.getEstado(),
                reserva.getFechaReserva(),
                transporteTipo,
                getTransporteNombre(transporte),
                getTransporteHora(reserva.getId()),
                getTransporteAsiento(reserva.getId()),
                getTransportePuerta(reserva.getId(), transporte)
        );
    }

    private double getTransporteCoste(TransporteTipo transporte) {
        if (transporte == null) return 0;

        return switch (transporte) {
            case AVION -> 150;
            case TREN -> 50;
            case BARCO -> 100;
        };
    }

    private String getTransporteNombre(TransporteTipo transporte) {
        if (transporte == null) return null;

        return switch (transporte) {
            case AVION -> "JMJ Airlines";
            case TREN -> "JMJ Rail";
            case BARCO -> "JMJ Cruises";
        };
    }

    private String getTransporteHora(Long id) {
        // Datos deterministas de ticket: evitan guardar campos derivados y mantienen recibos estables.
        String[] horas = {"08:30", "10:15", "12:00", "16:45", "20:30", "22:10"};
        return horas[Math.floorMod(id != null ? id.intValue() : 0, horas.length)];
    }

    private String getTransporteAsiento(Long id) {
        String[] letras = {"A", "B", "C", "D", "E", "F"};

        int safeId = id != null ? id.intValue() : 0;
        int fila = Math.floorMod(safeId, 28) + 1;

        return fila + letras[Math.floorMod(safeId, letras.length)];
    }

    private String getTransportePuerta(Long id, TransporteTipo transporte) {
        int safeId = id != null ? id.intValue() : 0;
        int numero = Math.floorMod(safeId, 18) + 1;

        if (transporte == TransporteTipo.TREN) {
            return "Vía " + numero;
        }

        if (transporte == TransporteTipo.BARCO) {
            return "Muelle " + numero;
        }

        String[] letras = {"A", "B", "C", "D", "E", "F", "G"};
        return letras[Math.floorMod(safeId, letras.length)] + numero;
    }

    private boolean esHabitacionCompatible(Habitacion habitacion, int huespedes) {
        // Regla de negocio: 1 cualquier capacidad suficiente; 2 doble/estándar-deluxe/suite/grupal;
        // 3-4 suite o grupal; 5-8 solo grupal. La capacidad real se comprueba antes y aquí.
        int capacidad = habitacion.getCapacidad();
        String categoria = getCategoriaHabitacion(habitacion);

        if (capacidad < huespedes) {
            return false;
        }

        if (huespedes <= 1) {
            return capacidad >= 1;
        }

        if (huespedes == 2) {
            return categoria.equals("double") || categoria.equals("suite") || categoria.equals("group");
        }

        if (huespedes >= 3 && huespedes <= 4) {
            return categoria.equals("suite") || categoria.equals("group");
        }

        return categoria.equals("group");
    }

    private String getCategoriaHabitacion(Habitacion habitacion) {
        String nombre = normalizarTexto(habitacion.getTipo());
        int capacidad = habitacion.getCapacidad();

        if (
                nombre.contains("grupal") ||
                nombre.contains("grupo") ||
                nombre.contains("familiar") ||
                nombre.contains("family")
        ) {
            return "group";
        }

        if (nombre.contains("suite")) {
            return "suite";
        }

        if (nombre.contains("individual") || nombre.contains("single")) {
            return "single";
        }

        if (
                nombre.contains("doble") ||
                nombre.contains("deluxe") ||
                nombre.contains("estandar") ||
                nombre.contains("standard")
        ) {
            return "double";
        }

        if (capacidad >= 8) return "group";
        if (capacidad >= 4) return "suite";
        if (capacidad >= 2) return "double";

        return "single";
    }

    private String normalizarTexto(String value) {
        if (value == null) {
            return "";
        }

        return Normalizer.normalize(value.toLowerCase(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .trim();
    }
}
