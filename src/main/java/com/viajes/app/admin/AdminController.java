// ProyectoViajesJMJ - com/viajes/app/admin/AdminController.java
// Responsabilidad: funciones del panel de administracion y gestion operativa.
// Nota profesional: Centraliza operaciones sensibles del panel admin; revisar permisos y borrados antes de modificar.

package com.viajes.app.admin;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.alojamientos.Habitacion;
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
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
/**
 * Documento profesional: clase principal del archivo.
 * Centraliza operaciones sensibles del panel admin; revisar permisos y borrados antes de modificar.
 */

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
        // La ficha admin agrupa datos dispersos para evitar varias llamadas desde el modal.
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

        long destinosUnicos = reservasRealizadas.stream()
                .map(this::getDestinoIdFromReserva)
                .filter(destinoId -> destinoId != null)
                .distinct()
                .count();

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

    @GetMapping("/alojamientos")
    public List<Map<String, Object>> listarAlojamientos() {
        return alojamientoRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Alojamiento::getId))
                .map(this::toAlojamientoResponse)
                .toList();
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
        // Borrado físico controlado: primero dependencias directas, después el usuario.
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

        Alojamiento guardado = alojamientoRepository.save(alojamiento);
        return toAlojamientoResponse(guardado);
    }

    @PutMapping("/alojamientos/{id}")
    @Transactional
    public Map<String, Object> actualizarAlojamiento(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Alojamiento alojamiento = alojamientoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Alojamiento no encontrado"));

        rellenarAlojamiento(alojamiento, request);

        Alojamiento guardado = alojamientoRepository.save(alojamiento);
        return toAlojamientoResponse(guardado);
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

    private void rellenarDestino(Destino destino, Map<String, Object> request, boolean creando) {
        // Centraliza la validación para que crear y editar destino mantengan el mismo contrato.
        String nombre = getString(request, "nombre");
        String descripcion = getString(request, "descripcion");
        String pais = getString(request, "pais");
        String imagen = getString(request, "imagen");
        Double precio = getDouble(request, "precio");
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

        if (continenteNombre != null && !continenteNombre.isBlank()) {
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

        if (ciudad == null || ciudad.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La ciudad es obligatoria");
        }

        if (pais == null || pais.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El país es obligatorio");
        }

        if (precioPorNoche == null || precioPorNoche.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio por noche no es válido");
        }

        if (destinoId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El destino es obligatorio");
        }

        Destino destino = destinoRepository.findById(destinoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Destino no encontrado"));

        alojamiento.setNombre(nombre.trim());
        alojamiento.setCiudad(ciudad.trim());
        alojamiento.setPais(pais.trim());
        alojamiento.setPrecioPorNoche(precioPorNoche);
        alojamiento.setDestino(destino);
        alojamiento.setTipo(TipoAlojamiento.HOTEL);
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

        return new DestinoDTO(
                destino.getId(),
                destino.getNombre(),
                destino.getDescripcion(),
                destino.getPrecio(),
                destino.getPais(),
                continente,
                destino.getImagen()
        );
    }

    private Map<String, Object> toAlojamientoResponse(Alojamiento alojamiento) {
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
        response.put("reservas", reservaRepository.countByHabitacionAlojamientoId(alojamiento.getId()));

        return response;
    }

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
