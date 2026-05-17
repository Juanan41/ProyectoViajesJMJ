package com.viajes.app.cuentas;

import com.viajes.app.cuentas.dto.CuentaBancariaRequestDto;
import com.viajes.app.cuentas.dto.CuentaBancariaResponseDto;
import com.viajes.app.users.Usuario;
import com.viajes.app.users.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

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

        long totalTarjetas = cuentaBancariaRepository.countByUsuarioEmail(emailUsuario);

        if (totalTarjetas >= 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Solo puedes tener un maximo de 2 tarjetas."
            );
        }

        String ibanNormalizado = normalizarIban(dto.getIban());

        if (ibanNormalizado.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El IBAN es obligatorio");
        }

        if (dto.getTitular() == null || dto.getTitular().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El titular es obligatorio");
        }

        if (dto.getEntidad() == null || dto.getEntidad().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La entidad es obligatoria");
        }

        if (cuentaBancariaRepository.findByIban(ibanNormalizado).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese IBAN ya esta registrado");
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

    public List<CuentaBancariaResponseDto> obtenerMisCuentas(String emailUsuario) {
        return cuentaBancariaRepository.findAllByUsuarioEmail(emailUsuario)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public CuentaBancariaResponseDto actualizarCuenta(CuentaBancariaRequestDto dto, String emailUsuario) {
        CuentaBancaria cuenta = cuentaBancariaRepository.findAllByUsuarioEmail(emailUsuario)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe cuenta bancaria para este usuario"));

        String ibanNormalizado = normalizarIban(dto.getIban());

        if (ibanNormalizado.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El IBAN es obligatorio");
        }

        if (dto.getTitular() == null || dto.getTitular().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El titular es obligatorio");
        }

        if (dto.getEntidad() == null || dto.getEntidad().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La entidad es obligatoria");
        }

        CuentaBancaria existenteConEseIban = cuentaBancariaRepository.findByIban(ibanNormalizado).orElse(null);

        if (existenteConEseIban != null && !existenteConEseIban.getId().equals(cuenta.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ese IBAN ya esta registrado");
        }

        cuenta.setIban(ibanNormalizado);
        cuenta.setTitular(dto.getTitular().trim());
        cuenta.setEntidad(dto.getEntidad().trim());
        cuenta.setSwiftBic(dto.getSwiftBic() != null ? dto.getSwiftBic().trim() : null);

        CuentaBancaria actualizada = cuentaBancariaRepository.save(cuenta);
        return mapToDto(actualizada);
    }

    public void eliminarCuenta(String emailUsuario) {
        List<CuentaBancaria> cuentas = cuentaBancariaRepository.findAllByUsuarioEmail(emailUsuario);

        if (cuentas.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe cuenta bancaria para este usuario");
        }

        cuentaBancariaRepository.delete(cuentas.get(0));
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
