
package com.viajes.app.admin;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.Regimen;
import com.viajes.app.alojamientos.TipoAlojamiento;
import com.viajes.app.cuentas.CuentaBancaria;
import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.destinos.Continente;
import com.viajes.app.destinos.ContinenteRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.destinos.DestinoRepository;
import com.viajes.app.destinos.dto.DestinoDTO;
import com.viajes.app.reservas.Opinion;
import com.viajes.app.reservas.OpinionRepository;
import com.viajes.app.reservas.Reserva;
import com.viajes.app.reservas.ReservaRepository;
import com.viajes.app.reservas.ReservaService;
import com.viajes.app.reservas.TransporteTipo;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UsuarioRepository usuarioRepository;
    private final DestinoRepository destinoRepository;
    private final ContinenteRepository continenteRepository;
    private final AlojamientoRepository alojamientoRepository;
    private final ReservaRepository reservaRepository;
    private final OpinionRepository opinionRepository;
    private final CuentaBancariaRepository cuentaBancariaRepository;
    private final ReservaService reservaService;

    public AdminController(
            UsuarioRepository usuarioRepository,
            DestinoRepository destinoRepository,
            ContinenteRepository continenteRepository,
            AlojamientoRepository alojamientoRepository,
            ReservaRepository reservaRepository,
            OpinionRepository opinionRepository,
            CuentaBancariaRepository cuentaBancariaRepository,
            ReservaService reservaService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.destinoRepository = destinoRepository;
        this.continenteRepository = continenteRepository;
        this.alojamientoRepository = alojamientoRepository;
        this.reservaRepository = reservaRepository;
        this.opinionRepository = opinionRepository;
        this.cuentaBancariaRepository = cuentaBancariaRepository;
        this.reservaService = reservaService;
    }

    @GetMapping("/usuarios")
    public List<Map<String, Object>> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Usuario::getId))
                .map(this::toUsuarioResponse)
                .toList();
    }

    @GetMapping("/usuarios/{id}/detalle")
    @Transactional(readOnly = true)
    public Map<String, Object> obtenerDetalleUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        List<Reserva> reservasUsuario = reservaRepository.findByUsuarioId(id)
                .stream()
                .sorted((a, b) -> {
                    if (a.getFechaReserva() == null && b.getFechaReserva() == null) return 0;
                    if (a.getFechaReserva() == null) return 1;
                    if (b.getFechaReserva() == null) return -1;
                    return b.getFechaReserva().compareTo(a.getFechaReserva());
                })
                .toList();

        List<Reserva> reservasPendientes = reservasUsuario.stream()
                .filter(reserva -> getReservaStatus(reserva).equals("CONFIRMADA"))
                .toList();

        List<Reserva> reservasRealizadas = reservasUsuario.stream()
                .filter(reserva -> getReservaStatus(reserva).equals("COMPLETADA"))
                .toList();

        List<Reserva> reservasCanceladas = reservasUsuario.stream()
                .filter(reserva -> getReservaStatus(reserva).equals("CANCELADA"))
                .toList();

        List<Opinion> opinionesUsuario = opinionRepository.findByUsuarioId(id)
                .stream()
                .sorted((a, b) -> {
                    if (a.getFechaOpinion() == null && b.getFechaOpinion() == null) return 0;
                    if (a.getFechaOpinion() == null) return 1;
                    if (b.getFechaOpinion() == null) return -1;
                    return b.getFechaOpinion().compareTo(a.getFechaOpinion());
                })
                .toList();

        long destinosUnicos = reservasUsuario.stream()
                .filter(reserva -> !getReservaStatus(reserva).equals("CANCELADA"))
                .map(this::getDestinoIdFromReserva)
                .filter(destinoId -> destinoId != null)
                .distinct()
                .count();

        long kmRecorridos = reservasRealizadas.stream()
                .mapToLong(this::getKmDesdeMadrid)
                .sum();

        double totalGastado = reservasRealizadas.stream()
                .mapToDouble(reserva -> reserva.getPrecioTotal() != null ? reserva.getPrecioTotal() : 0)
                .sum();

        Map<String, Object> tarjetaResponse = cuentaBancariaRepository.findByUsuarioId(usuario.getId())
                .map(this::toCuentaResponse)
                .orElseGet(() -> cuentaBancariaRepository.findByUsuarioEmail(usuario.getEmail())
                        .map(this::toCuentaResponse)
                        .orElse(null));

        Map<String, Object> resumen = new LinkedHashMap<>();
        resumen.put("viajesPendientes", reservasPendientes.size());
        resumen.put("viajesRealizados", reservasRealizadas.size());
        resumen.put("viajesCancelados", reservasCanceladas.size());
        resumen.put("destinosUnicos", destinosUnicos);
        resumen.put("kmRecorridos", kmRecorridos);
        resumen.put("totalGastado", totalGastado);
        resumen.put("totalReservas", reservasUsuario.size());
        resumen.put("totalOpiniones", opinionesUsuario.size());
        resumen.put("totalResenias", opinionesUsuario.size());
        resumen.put("resenias", opinionesUsuario.size());
        resumen.put("resenas", opinionesUsuario.size());
        resumen.put("saldo", usuario.getSaldo());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("usuario", toUsuarioResponse(usuario));
        response.put("tarjeta", tarjetaResponse);
        response.put("cuenta", tarjetaResponse);
        response.put("resumen", resumen);

        response.put("reservas", reservasUsuario.stream()
                .map(this::toReservaDetalleResponse)
                .toList());

        response.put("reservasPendientes", reservasPendientes.stream()
                .map(this::toReservaDetalleResponse)
                .toList());

        response.put("reservasRealizadas", reservasRealizadas.stream()
                .map(this::toReservaDetalleResponse)
                .toList());

        response.put("reservasCanceladas", reservasCanceladas.stream()
                .map(this::toReservaDetalleResponse)
                .toList());

        List<Map<String, Object>> opinionesResponse = opinionesUsuario.stream()
                .map(this::toOpinionDetalleResponse)
                .toList();

        response.put("resenias", opinionesResponse);
        response.put("opiniones", opinionesResponse);

        return response;
    }

    @GetMapping("/reservas")
    public List<ReservaResponseDto> listarReservas() {
        return reservaService.obtenerTodasReservas();
    }

    @PutMapping("/reservas/{id}/cancelar")
    public ReservaResponseDto cancelarReservaAdmin(@PathVariable Long id) {
        return reservaService.cancelarReservaAdmin(id);
    }

    @GetMapping("/destinos")
    public List<DestinoDTO> listarDestinos() {
        return destinoRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Destino::getId))
                .map(this::toDestinoResponse)
                .toList();
    }

    @GetMapping("/alojamientos")
    public List<Map<String, Object>> listarAlojamientos() {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Alojamiento::getId))
                .toList();
        Map<Long, RatingStats> ratingStats = getRatingStats(alojamientos);
        Map<Long, Long> reservationCounts = getReservationCounts(alojamientos);

        return alojamientos.stream()
                .map(alojamiento -> toAlojamientoResponse(
                        alojamiento,
                        ratingStats.get(alojamiento.getId()),
                        reservationCounts.getOrDefault(alojamiento.getId(), 0L)
                ))
                .toList();
    }

    @GetMapping("/hoteles")
    public List<Map<String, Object>> listarHoteles() {
        return listarAlojamientos();
    }

    @PutMapping("/usuarios/{id}")
    @Transactional
    public Map<String, Object> actualizarUsuario(@PathVariable Long id, @RequestBody Map<String, Object> request) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        String username = getString(request, "username");
        String email = getString(request, "email");
        String role = getString(request, "role");
        BigDecimal saldo = getBigDecimal(request, "saldo");

        if (username == null || username.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
        }

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio");
        }

        usuarioRepository.findByUsername(username).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese nombre de usuario ya existe");
            }
        });

        usuarioRepository.findByEmail(email).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese email ya existe");
            }
        });

        usuario.setUsername(username.trim());
        usuario.setEmail(email.trim());

        if (role != null && !role.isBlank()) {
            try {
                usuario.setRole(Rol.valueOf(role.trim().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rol no válido");
            }
        }

        if (saldo != null) {
            usuario.setSaldo(saldo);
        }

        Usuario guardado = usuarioRepository.save(usuario);
        return toUsuarioResponse(guardado);
    }

    @DeleteMapping("/usuarios/{id}")
    @Transactional
    public Map<String, Object> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        if (usuario.getRole() == Rol.ADMIN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede borrar un administrador");
        }

        cuentaBancariaRepository.findByUsuarioId(usuario.getId())
                .ifPresent(cuentaBancariaRepository::delete);

        opinionRepository.deleteAll(opinionRepository.findByUsuarioId(id));
        reservaRepository.deleteAll(reservaRepository.findByUsuarioId(id));

        usuarioRepository.delete(usuario);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Usuario eliminado");
        return response;
    }

    @PostMapping("/destinos")
    @Transactional
    public DestinoDTO crearDestino(@RequestBody Map<String, Object> request) {
        Destino destino = new Destino();
        rellenarDestino(destino, request, true);

        Destino guardado = destinoRepository.save(destino);
        return toDestinoResponse(guardado);
    }

    @PutMapping("/destinos/{id}")
    @Transactional
    public DestinoDTO actualizarDestino(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Destino destino = destinoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destino no encontrado"));

        rellenarDestino(destino, request, false);

        Destino guardado = destinoRepository.save(destino);
        return toDestinoResponse(guardado);
    }

    @DeleteMapping("/destinos/{id}")
    @Transactional
    public Map<String, Object> eliminarDestino(@PathVariable Long id) {
        Destino destino = destinoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destino no encontrado"));

        if (!alojamientoRepository.findByDestinoId(id).isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "No se puede borrar un destino con alojamientos asociados"
            );
        }

        destinoRepository.delete(destino);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Destino eliminado");
        return response;
    }

    @PostMapping("/alojamientos")
    @Transactional
    public Map<String, Object> crearAlojamiento(@RequestBody Map<String, Object> request) {
        Alojamiento alojamiento = new Alojamiento();
        rellenarAlojamiento(alojamiento, request);
        asegurarHabitacionesPorDefecto(alojamiento);

        Alojamiento guardado = alojamientoRepository.save(alojamiento);
        return toAlojamientoResponse(guardado);
    }

    @PostMapping("/hoteles")
    @Transactional
    public Map<String, Object> crearHotel(@RequestBody Map<String, Object> request) {
        return crearAlojamiento(request);
    }

    @PutMapping("/alojamientos/{id}")
    @Transactional
    public Map<String, Object> actualizarAlojamiento(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Alojamiento alojamiento = alojamientoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Alojamiento no encontrado"));

        rellenarAlojamiento(alojamiento, request);
        asegurarHabitacionesPorDefecto(alojamiento);

        Alojamiento guardado = alojamientoRepository.save(alojamiento);
        return toAlojamientoResponse(guardado);
    }

    @PutMapping("/hoteles/{id}")
    @Transactional
    public Map<String, Object> actualizarHotel(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        return actualizarAlojamiento(id, request);
    }

    @DeleteMapping("/alojamientos/{id}")
    @Transactional
    public Map<String, Object> eliminarAlojamiento(@PathVariable Long id) {
        Alojamiento alojamiento = alojamientoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Alojamiento no encontrado"));

        if (reservaRepository.countByHabitacionAlojamientoId(id) > 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "No se puede borrar un alojamiento con reservas asociadas"
            );
        }

        alojamientoRepository.delete(alojamiento);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Alojamiento eliminado");
        return response;
    }

    @DeleteMapping("/hoteles/{id}")
    @Transactional
    public Map<String, Object> eliminarHotel(@PathVariable Long id) {
        return eliminarAlojamiento(id);
    }

    private void rellenarDestino(Destino destino, Map<String, Object> request, boolean creando) {
        String nombre = getString(request, "nombre");
        String descripcion = getString(request, "descripcion");
        String pais = getString(request, "pais");
        String imagen = getString(request, "imagen");
        Double precio = getDouble(request, "precio");
        Long continenteId = getLong(request, "continenteId");
        String continenteNombre = getString(request, "continente");

        if (nombre == null || nombre.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre del destino es obligatorio");
        }

        if (pais == null || pais.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El país es obligatorio");
        }

        if (precio == null || precio < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio no es válido");
        }

        destino.setNombre(nombre.trim());
        destino.setDescripcion(descripcion != null ? descripcion.trim() : "");
        destino.setPais(pais.trim());
        destino.setPrecio(precio);

        if (imagen != null) {
            destino.setImagen(imagen.trim());
        }

        if (continenteId != null) {
            Continente continente = continenteRepository.findById(continenteId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Continente no encontrado"));

            destino.setContinente(continente);
        } else if (continenteNombre != null && !continenteNombre.isBlank()) {
            Continente continente = continenteRepository.findByNombre(continenteNombre.trim())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Continente no encontrado"));

            destino.setContinente(continente);
        } else if (creando) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El continente es obligatorio");
        }
    }

    private void rellenarAlojamiento(Alojamiento alojamiento, Map<String, Object> request) {
        String nombre = getString(request, "nombre");
        String ciudad = getString(request, "ciudad");
        String pais = getString(request, "pais");
        BigDecimal precioPorNoche = getBigDecimal(request, "precioPorNoche");
        Long destinoId = getLong(request, "destinoId");

        if (nombre == null || nombre.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre del alojamiento es obligatorio");
        }

        if (precioPorNoche == null || precioPorNoche.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio por noche no es válido");
        }

        if (destinoId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El destino es obligatorio");
        }

        Destino destino = destinoRepository.findById(destinoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Destino no encontrado"));

        String ciudadFinal = destino.getNombre();
        String paisFinal = destino.getPais();

        if ((ciudadFinal == null || ciudadFinal.isBlank()) && ciudad != null) {
            ciudadFinal = ciudad.trim();
        }

        if ((paisFinal == null || paisFinal.isBlank()) && pais != null) {
            paisFinal = pais.trim();
        }

        if (ciudadFinal == null || ciudadFinal.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La ciudad del destino no es válida");
        }

        if (paisFinal == null || paisFinal.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El país del destino no es válido");
        }

        alojamiento.setNombre(nombre.trim());
        alojamiento.setCiudad(ciudadFinal.trim());
        alojamiento.setPais(paisFinal.trim());
        alojamiento.setPrecioPorNoche(precioPorNoche);
        alojamiento.setDestino(destino);
        alojamiento.setTipo(TipoAlojamiento.HOTEL);
    }

    private void asegurarHabitacionesPorDefecto(Alojamiento alojamiento) {
        if (alojamiento.getHabitaciones() != null && !alojamiento.getHabitaciones().isEmpty()) {
            return;
        }

        double precioBase = alojamiento.getPrecioPorNoche().doubleValue();

        alojamiento.addHabitacion(new Habitacion(
                "Individual",
                1,
                precioBase,
                Regimen.SOLO_ALOJAMIENTO,
                alojamiento
        ));
        alojamiento.addHabitacion(new Habitacion(
                "Doble",
                2,
                redondearPrecio(precioBase + 60),
                Regimen.DESAYUNO,
                alojamiento
        ));
        alojamiento.addHabitacion(new Habitacion(
                "Suite",
                4,
                redondearPrecio(precioBase + 130),
                Regimen.TODO_INCLUIDO,
                alojamiento
        ));
        alojamiento.addHabitacion(new Habitacion(
                "Grupal",
                8,
                redondearPrecio(precioBase * 1.45),
                Regimen.MEDIA_PENSION,
                alojamiento
        ));
    }

    private double redondearPrecio(double precio) {
        return BigDecimal.valueOf(precio)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private Map<String, Object> toUsuarioResponse(Usuario usuario) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("id", usuario.getId());
        response.put("username", usuario.getUsername());
        response.put("email", usuario.getEmail());
        response.put("avatarUrl", usuario.getAvatarUrl());
        response.put("role", usuario.getRole() != null ? usuario.getRole().name() : "USER");
        response.put("saldo", usuario.getSaldo());

        return response;
    }

    private Map<String, Object> toCuentaResponse(CuentaBancaria cuenta) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("id", cuenta.getId());
        response.put("iban", cuenta.getIban());
        response.put("titular", cuenta.getTitular());
        response.put("entidad", cuenta.getEntidad());
        response.put("swiftBic", cuenta.getSwiftBic());
        response.put("activa", cuenta.getActiva());
        response.put("fechaRegistro", cuenta.getFechaRegistro());

        if (cuenta.getUsuario() != null) {
            response.put("usuarioId", cuenta.getUsuario().getId());
            response.put("usuarioEmail", cuenta.getUsuario().getEmail());
        }

        String iban = cuenta.getIban();
        String last4 = iban != null && iban.length() >= 4 ? iban.substring(iban.length() - 4) : "";

        response.put("last4", last4);
        response.put("numeroEnmascarado", "**** " + last4);

        return response;
    }

    private Map<String, Object> toReservaDetalleResponse(Reserva reserva) {
        Map<String, Object> response = new LinkedHashMap<>();

        Habitacion habitacion = reserva.getHabitacion();
        Alojamiento alojamiento = habitacion != null ? habitacion.getAlojamiento() : null;
        Destino destino = alojamiento != null ? alojamiento.getDestino() : null;
        Usuario usuario = reserva.getUsuario();

        Long noches = 0L;
        if (reserva.getFechaInicio() != null && reserva.getFechaFin() != null) {
            noches = ChronoUnit.DAYS.between(reserva.getFechaInicio(), reserva.getFechaFin());
        }

        TransporteTipo transporte = reserva.getTransporte();

        response.put("id", reserva.getId());
        response.put("destinoId", destino != null ? destino.getId() : null);
        response.put("alojamientoId", alojamiento != null ? alojamiento.getId() : null);
        response.put("habitacionId", habitacion != null ? habitacion.getId() : null);
        response.put("usuarioId", usuario != null ? usuario.getId() : null);
        response.put("usuarioUsername", usuario != null ? usuario.getUsername() : "");
        response.put("usuarioEmail", usuario != null ? usuario.getEmail() : "");
        response.put("destinoNombre", destino != null ? destino.getNombre() : "");
        response.put("destinoPais", destino != null ? destino.getPais() : "");
        response.put("alojamientoNombre", alojamiento != null ? alojamiento.getNombre() : "");
        response.put("imagenUrl", destino != null ? destino.getImagen() : "");
        response.put("checkIn", reserva.getFechaInicio());
        response.put("checkOut", reserva.getFechaFin());
        response.put("fechaInicio", reserva.getFechaInicio());
        response.put("fechaFin", reserva.getFechaFin());
        response.put("noches", noches);
        response.put("huespedes", reserva.getHuespedes());
        response.put("precioTotal", reserva.getPrecioTotal());
        response.put("estado", getReservaStatus(reserva));
        response.put("estadoOriginal", reserva.getEstado());
        response.put("fechaReserva", reserva.getFechaReserva());
        response.put("transporteTipo", transporte != null ? transporte.name() : null);
        response.put("transporteNombre", getTransporteNombre(transporte));
        response.put("transporteHora", getTransporteHora(reserva.getId()));
        response.put("transporteAsiento", getTransporteAsiento(reserva.getId()));
        response.put("transportePuerta", getTransportePuerta(reserva.getId(), transporte));

        return response;
    }

    private Map<String, Object> toOpinionDetalleResponse(Opinion opinion) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("id", opinion.getId());
        response.put("puntuacion", opinion.getPuntuacion());
        response.put("comentario", opinion.getComentario());
        response.put("fechaOpinion", opinion.getFechaOpinion());

        if (opinion.getUsuario() != null) {
            response.put("usuarioId", opinion.getUsuario().getId());
            response.put("usuarioUsername", opinion.getUsuario().getUsername());
            response.put("usuarioEmail", opinion.getUsuario().getEmail());
        }

        if (opinion.getAlojamiento() != null) {
            Alojamiento alojamiento = opinion.getAlojamiento();

            response.put("alojamientoId", alojamiento.getId());
            response.put("alojamientoNombre", alojamiento.getNombre());

            if (alojamiento.getDestino() != null) {
                response.put("destinoId", alojamiento.getDestino().getId());
                response.put("destinoNombre", alojamiento.getDestino().getNombre());
            } else {
                response.put("destinoId", null);
                response.put("destinoNombre", "");
            }
        } else {
            response.put("alojamientoId", null);
            response.put("alojamientoNombre", "");
            response.put("destinoId", null);
            response.put("destinoNombre", "");
        }

        return response;
    }

    private String getReservaStatus(Reserva reserva) {
        String estado = reserva.getEstado() != null ? reserva.getEstado().toUpperCase() : "";

        if (estado.equals("CANCELADA")) {
            return "CANCELADA";
        }

        if (estado.equals("COMPLETADA")) {
            return "COMPLETADA";
        }

        LocalDate fechaFin = reserva.getFechaFin();

        if (fechaFin != null && fechaFin.isBefore(LocalDate.now())) {
            return "COMPLETADA";
        }

        return "CONFIRMADA";
    }

    private Long getDestinoIdFromReserva(Reserva reserva) {
        if (reserva.getHabitacion() == null) return null;
        if (reserva.getHabitacion().getAlojamiento() == null) return null;
        if (reserva.getHabitacion().getAlojamiento().getDestino() == null) return null;

        return reserva.getHabitacion().getAlojamiento().getDestino().getId();
    }

    private long getKmDesdeMadrid(Reserva reserva) {
        if (reserva.getHabitacion() == null) return 0;
        if (reserva.getHabitacion().getAlojamiento() == null) return 0;
        if (reserva.getHabitacion().getAlojamiento().getDestino() == null) return 0;

        Destino destino = reserva.getHabitacion().getAlojamiento().getDestino();
        String nombre = normalizeText(destino.getNombre());
        String pais = normalizeText(destino.getPais());

        Map<String, Long> ciudadKm = Map.ofEntries(
                Map.entry("madrid", 0L),
                Map.entry("barcelona", 505L),
                Map.entry("sevilla", 390L),
                Map.entry("valencia", 303L),
                Map.entry("paris", 1053L),
                Map.entry("londres", 1263L),
                Map.entry("roma", 1365L),
                Map.entry("nueva york", 5768L),
                Map.entry("los angeles", 9395L),
                Map.entry("miami", 7105L),
                Map.entry("san francisco", 9330L),
                Map.entry("tokio", 10759L),
                Map.entry("dubai", 5652L),
                Map.entry("sidney", 17692L),
                Map.entry("buenos aires", 10050L),
                Map.entry("rio de janeiro", 8125L),
                Map.entry("el cairo", 3350L),
                Map.entry("ciudad del cabo", 8560L)
        );

        if (ciudadKm.containsKey(nombre)) {
            return ciudadKm.get(nombre);
        }

        Map<String, Long> paisKm = Map.ofEntries(
                Map.entry("espana", 350L),
                Map.entry("francia", 1050L),
                Map.entry("italia", 1400L),
                Map.entry("alemania", 1650L),
                Map.entry("reino unido", 1450L),
                Map.entry("paises bajos", 1480L),
                Map.entry("belgica", 1320L),
                Map.entry("austria", 1800L),
                Map.entry("suiza", 1250L),
                Map.entry("grecia", 2350L),
                Map.entry("portugal", 500L),
                Map.entry("republica checa", 1780L),
                Map.entry("hungria", 1980L),
                Map.entry("polonia", 2300L),
                Map.entry("suecia", 2600L),
                Map.entry("estados unidos", 7300L),
                Map.entry("canada", 6200L),
                Map.entry("mexico", 9000L),
                Map.entry("brasil", 7900L),
                Map.entry("argentina", 10100L),
                Map.entry("chile", 10700L),
                Map.entry("colombia", 8000L),
                Map.entry("peru", 9500L),
                Map.entry("australia", 17400L),
                Map.entry("nueva zelanda", 19800L),
                Map.entry("japon", 10800L),
                Map.entry("china", 9200L),
                Map.entry("india", 7300L),
                Map.entry("egipto", 3350L),
                Map.entry("marruecos", 1050L),
                Map.entry("sudafrica", 8500L)
        );

        return paisKm.getOrDefault(pais, 2500L);
    }

    private String normalizeText(String value) {
        if (value == null) {
            return "";
        }

        return java.text.Normalizer.normalize(value.toLowerCase(), java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .trim();
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

    private DestinoDTO toDestinoResponse(Destino destino) {
        String continente = destino.getContinente() != null ? destino.getContinente().getNombre() : "";
        Long continenteId = destino.getContinente() != null ? destino.getContinente().getId() : null;

        return new DestinoDTO(
                destino.getId(),
                destino.getNombre(),
                destino.getDescripcion(),
                destino.getPrecio(),
                destino.getPais(),
                continente,
                continenteId,
                destino.getImagen()
        );
    }

    private Map<String, Object> toAlojamientoResponse(Alojamiento alojamiento) {
        Map<Long, RatingStats> ratingStats = getRatingStats(List.of(alojamiento));
        long reservas = reservaRepository.countByHabitacionAlojamientoId(alojamiento.getId());
        return toAlojamientoResponse(alojamiento, ratingStats.get(alojamiento.getId()), reservas);
    }

    private Map<String, Object> toAlojamientoResponse(Alojamiento alojamiento, RatingStats ratingStats, long reservas) {
        Map<String, Object> response = new LinkedHashMap<>();
        Destino destino = alojamiento.getDestino();

        response.put("id", alojamiento.getId());
        response.put("nombre", alojamiento.getNombre());
        response.put("ciudad", alojamiento.getCiudad());
        response.put("pais", alojamiento.getPais());
        response.put("tipo", alojamiento.getTipo() != null ? alojamiento.getTipo().name() : "HOTEL");
        response.put("precioPorNoche", alojamiento.getPrecioPorNoche());
        response.put("destinoId", destino != null ? destino.getId() : null);
        response.put("destinoNombre", destino != null ? destino.getNombre() : "");
        response.put("reservas", reservas);
        response.put("rating", ratingStats != null ? ratingStats.rating() : null);
        response.put("estrellas", ratingStats != null ? ratingStats.rating() : null);
        response.put("totalOpiniones", ratingStats != null ? ratingStats.total() : 0);
        response.put("reviewCount", ratingStats != null ? ratingStats.total() : 0);
        response.put("sinResenas", ratingStats == null || ratingStats.total() == 0);

        return response;
    }

    private Map<Long, Long> getReservationCounts(List<Alojamiento> alojamientos) {
        List<Long> ids = alojamientos.stream()
                .map(Alojamiento::getId)
                .filter(id -> id != null)
                .toList();

        if (ids.isEmpty()) {
            return Map.of();
        }

        return reservaRepository.countByAlojamientoIds(ids)
                .stream()
                .collect(Collectors.toMap(
                        row -> (Long) row[0],
                        row -> ((Number) row[1]).longValue()
                ));
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

    private String getString(Map<String, Object> request, String key) {
        Object value = request.get(key);

        if (value == null) {
            return null;
        }

        return value.toString().trim();
    }

    private Double getDouble(Map<String, Object> request, String key) {
        Object value = request.get(key);

        if (value == null || value.toString().isBlank()) {
            return null;
        }

        try {
            return Double.parseDouble(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private BigDecimal getBigDecimal(Map<String, Object> request, String key) {
        Object value = request.get(key);

        if (value == null || value.toString().isBlank()) {
            return null;
        }

        try {
            return new BigDecimal(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Long getLong(Map<String, Object> request, String key) {
        Object value = request.get(key);

        if (value == null || value.toString().isBlank()) {
            return null;
        }

        try {
            return Long.parseLong(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
