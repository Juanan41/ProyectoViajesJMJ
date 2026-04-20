package com.viajes.app.cuentas;

import com.viajes.app.cuentas.dto.CuentaBancariaRequestDto;
import com.viajes.app.cuentas.dto.CuentaBancariaResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cuentas")
public class CuentaBancariaRestController {

    private final CuentaBancariaService cuentaBancariaService;

    public CuentaBancariaRestController(CuentaBancariaService cuentaBancariaService) {
        this.cuentaBancariaService = cuentaBancariaService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CuentaBancariaResponseDto crearCuenta(@RequestBody CuentaBancariaRequestDto dto,
                                                 Authentication authentication) {
        String emailUsuario = authentication.getName();
        return cuentaBancariaService.crearCuenta(dto, emailUsuario);
    }

    @GetMapping("/me")
    public CuentaBancariaResponseDto obtenerMiCuenta(Authentication authentication) {
        String emailUsuario = authentication.getName();
        return cuentaBancariaService.obtenerMiCuenta(emailUsuario);
    }

    @PutMapping("/me")
    public CuentaBancariaResponseDto actualizarCuenta(@RequestBody CuentaBancariaRequestDto dto,
                                                      Authentication authentication) {
        String emailUsuario = authentication.getName();
        return cuentaBancariaService.actualizarCuenta(dto, emailUsuario);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarCuenta(Authentication authentication) {
        String emailUsuario = authentication.getName();
        cuentaBancariaService.eliminarCuenta(emailUsuario);
    }
}