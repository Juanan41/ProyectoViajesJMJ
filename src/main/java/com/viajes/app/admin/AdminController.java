package com.viajes.app.admin;

import com.viajes.app.alojamientos.Alojamiento;
import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.alojamientos.TipoAlojamiento;
import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.destinos.Continente;
import com.viajes.app.destinos.ContinenteRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.destinos.DestinoRepository;
import com.viajes.app.destinos.dto.DestinoDTO;
import com.viajes.app.reservas.OpinionRepository;
import com.viajes.app.reservas.ReservaRepository;
import com.viajes.app.reservas.ReservaService;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    public AdminController(UsuarioRepository usuarioRepository,
                           DestinoRepository destinoRepository,
                           ContinenteRepository continenteRepository,
                           AlojamientoRepository alojamientoRepository,
                           ReservaRepository reservaRepository,
                           OpinionRepository opinionRepository,
                           CuentaBancariaRepository cuentaBancariaRepository,
                           ReservaService reservaService) {
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
    public Map<String, Object> actualizarUsuario(@PathVariable Long id,
                                                 @RequestBody Map<String, Object> request) {
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

        cuentaBancariaRepository.findByUsuarioEmail(usuario.getEmail())
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
    public DestinoDTO actualizarDestino(@PathVariable Long id,
                                        @RequestBody Map<String, Object> request) {
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
    public Map<String, Object> actualizarAlojamiento(@PathVariable Long id,
                                                     @RequestBody Map<String, Object> request) {
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
        response.put("role", usuario.getRole().name());
        response.put("saldo", usuario.getSaldo());
        return response;
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
        response.put("tipo", alojamiento.getTipo().name());
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
