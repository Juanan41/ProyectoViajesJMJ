package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionRepository;
import com.viajes.app.reservas.dto.ReservaRequestDto;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HabitacionRepository habitacionRepository;

    public ReservaService(ReservaRepository reservaRepository,
                          UsuarioRepository usuarioRepository,
                          HabitacionRepository habitacionRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.habitacionRepository = habitacionRepository;
    }

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

        if (dto.getTransporte() == null || dto.getTransporte().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El transporte es obligatorio");
        }

        TransporteTipo transporte;
        try {
            transporte = TransporteTipo.valueOf(dto.getTransporte().toUpperCase());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transporte inválido");
        }

        double precioTotal = habitacion.getPrecioPorNoche() * noches;

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);
        reserva.setTransporte(transporte);
        reserva.setFechaInicio(dto.getFechaInicio());
        reserva.setFechaFin(dto.getFechaFin());
        reserva.setPrecioTotal(precioTotal);
        reserva.setEstado("CONFIRMADA");
        reserva.setFechaReserva(LocalDateTime.now());

        Reserva guardada = reservaRepository.save(reserva);

        return mapToDto(guardada);
    }

    public List<ReservaResponseDto> obtenerReservasDeUsuario(String emailUsuario) {
        return reservaRepository.findByUsuarioEmailOrderByFechaReservaDesc(emailUsuario)
                .stream()
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
        String destino = reserva.getHabitacion()
                .getAlojamiento()
                .getDestino()
                .getNombre();

        String hotel = reserva.getHabitacion()
                .getAlojamiento()
                .getNombre();

        String tipoHabitacion = reserva.getHabitacion().getTipo();

        return new ReservaResponseDto(
                reserva.getId(),
                destino,
                hotel,
                reserva.getTransporte().name(),
                tipoHabitacion,
                reserva.getFechaInicio(),
                reserva.getFechaFin(),
                reserva.getPrecioTotal(),
                reserva.getEstado(),
                reserva.getFechaReserva()
        );
    }
}