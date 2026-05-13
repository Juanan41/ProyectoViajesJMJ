package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionRepository;
import com.viajes.app.api.UnsplashService;
import com.viajes.app.alojamientos.Alojamiento;
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
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HabitacionRepository habitacionRepository;
    private final UnsplashService unsplashService;

    public ReservaService(ReservaRepository reservaRepository,
                          UsuarioRepository usuarioRepository,
                          HabitacionRepository habitacionRepository,
                          UnsplashService unsplashService) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.habitacionRepository = habitacionRepository;
        this.unsplashService = unsplashService;
    }

    @Transactional
    public ReservaResponseDto crearReserva(ReservaRequestDto dto, String emailUsuario) {

        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitación no encontrada"));

        if (dto.getFechaInicio() == null || dto.getFechaFin() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Las fechas son obligatorias");
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La reserva ya esta cancelada");
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
                null,
                null,
                null
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
            case AVION -> "Vuelo";
            case TREN -> "Tren";
            case BARCO -> "Barco";
        };
    }
}
