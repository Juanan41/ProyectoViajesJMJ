package com.viajes.app.cuentas;

import com.viajes.app.cuentas.dto.CuentaBancariaRequestDto;
import com.viajes.app.cuentas.dto.CuentaBancariaResponseDto;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class CuentaBancariaService {

    private final CuentaBancariaRepository cuentaBancariaRepository;
    private final UsuarioRepository usuarioRepository;

    public CuentaBancariaService(CuentaBancariaRepository cuentaBancariaRepository,
                                 UsuarioRepository usuarioRepository) {
        this.cuentaBancariaRepository = cuentaBancariaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public CuentaBancariaResponseDto crearCuenta(CuentaBancariaRequestDto dto, String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        cuentaBancariaRepository.findByUsuarioEmail(emailUsuario).ifPresent(c -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario ya tiene una cuenta bancaria registrada");
        });

        String ibanNormalizado = normalizarIban(dto.getIban());

        if (ibanNormalizado.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El IBAN es obligatorio");
        }

        if (cuentaBancariaRepository.findByIban(ibanNormalizado).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese IBAN ya está registrado");
        }

        if (dto.getTitular() == null || dto.getTitular().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El titular es obligatorio");
        }

        if (dto.getEntidad() == null || dto.getEntidad().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La entidad es obligatoria");
        }

        CuentaBancaria cuenta = new CuentaBancaria();
        cuenta.setIban(ibanNormalizado);
        cuenta.setTitular(dto.getTitular().trim());
        cuenta.setEntidad(dto.getEntidad().trim());
        cuenta.setSwiftBic(dto.getSwiftBic() != null ? dto.getSwiftBic().trim() : null);
        cuenta.setActiva(true);
        cuenta.setFechaRegistro(LocalDateTime.now());
        cuenta.setUsuario(usuario);

        CuentaBancaria guardada = cuentaBancariaRepository.save(cuenta);
        return mapToDto(guardada);
    }

    public CuentaBancariaResponseDto obtenerMiCuenta(String emailUsuario) {
        CuentaBancaria cuenta = cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe cuenta bancaria para este usuario"));

        return mapToDto(cuenta);
    }

    public CuentaBancariaResponseDto actualizarCuenta(CuentaBancariaRequestDto dto, String emailUsuario) {
        CuentaBancaria cuenta = cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe cuenta bancaria para este usuario"));

        String ibanNormalizado = normalizarIban(dto.getIban());

        if (ibanNormalizado.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El IBAN es obligatorio");
        }

        cuentaBancariaRepository.findByIban(ibanNormalizado)
                .filter(c -> !c.getId().equals(cuenta.getId()))
                .ifPresent(c -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese IBAN ya está registrado");
                });

        if (dto.getTitular() == null || dto.getTitular().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El titular es obligatorio");
        }

        if (dto.getEntidad() == null || dto.getEntidad().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La entidad es obligatoria");
        }

        cuenta.setIban(ibanNormalizado);
        cuenta.setTitular(dto.getTitular().trim());
        cuenta.setEntidad(dto.getEntidad().trim());
        cuenta.setSwiftBic(dto.getSwiftBic() != null ? dto.getSwiftBic().trim() : null);

        CuentaBancaria actualizada = cuentaBancariaRepository.save(cuenta);
        return mapToDto(actualizada);
    }

    public void eliminarCuenta(String emailUsuario) {
        CuentaBancaria cuenta = cuentaBancariaRepository.findByUsuarioEmail(emailUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe cuenta bancaria para este usuario"));

        cuentaBancariaRepository.delete(cuenta);
    }

    private CuentaBancariaResponseDto mapToDto(CuentaBancaria cuenta) {
        return new CuentaBancariaResponseDto(
                cuenta.getId(),
                cuenta.getTitular(),
                cuenta.getEntidad(),
                cuenta.getSwiftBic(),
                enmascararIban(cuenta.getIban()),
                cuenta.getActiva(),
                cuenta.getFechaRegistro()
        );
    }

    private String normalizarIban(String iban) {
        if (iban == null) {
            return "";
        }
        return iban.replace(" ", "").trim().toUpperCase();
    }

    private String enmascararIban(String iban) {
        String limpio = normalizarIban(iban);

        if (limpio.length() <= 8) {
            return limpio;
        }

        String inicio = limpio.substring(0, 4);
        String fin = limpio.substring(limpio.length() - 4);

        return inicio + " **** **** **** " + fin;
    }
}
