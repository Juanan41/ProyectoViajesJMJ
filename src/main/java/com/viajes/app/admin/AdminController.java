package com.viajes.app.admin;

import com.viajes.app.alojamientos.AlojamientoRepository;
import com.viajes.app.cuentas.CuentaBancariaRepository;
import com.viajes.app.destinos.Destino;
import com.viajes.app.destinos.DestinoRepository;
import com.viajes.app.reservas.OpinionRepository;
import com.viajes.app.reservas.ReservaRepository;
import com.viajes.app.reservas.ReservaService;
import com.viajes.app.reservas.dto.ReservaResponseDto;
import com.viajes.app.users.Rol;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UsuarioRepository usuarioRepository;
    private final DestinoRepository destinoRepository;
    private final AlojamientoRepository alojamientoRepository;
    private final ReservaRepository reservaRepository;
    private final OpinionRepository opinionRepository;
    private final CuentaBancariaRepository cuentaBancariaRepository;
    private final ReservaService reservaService;

    public AdminController(UsuarioRepository usuarioRepository,
                           DestinoRepository destinoRepository,
                           AlojamientoRepository alojamientoRepository,
                           ReservaRepository reservaRepository,
                           OpinionRepository opinionRepository,
                           CuentaBancariaRepository cuentaBancariaRepository,
                           ReservaService reservaService) {
        this.usuarioRepository = usuarioRepository;
        this.destinoRepository = destinoRepository;
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

    private Map<String, Object> toUsuarioResponse(Usuario usuario) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", usuario.getId());
        response.put("username", usuario.getUsername());
        response.put("email", usuario.getEmail());
        response.put("role", usuario.getRole().name());
        response.put("saldo", usuario.getSaldo());
        return response;
    }
}
