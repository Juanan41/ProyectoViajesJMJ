package com.viajes.app.cuentas;

import com.viajes.app.cuentas.dto.CuentaBancariaRequestDto;
import com.viajes.app.cuentas.dto.CuentaBancariaResponseDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cuenta-bancaria")
public class CuentaBancariaRestController {

    private final CuentaBancariaService cuentaBancariaService;

    public CuentaBancariaRestController(CuentaBancariaService cuentaBancariaService) {
        this.cuentaBancariaService = cuentaBancariaService;
    }

    @PostMapping
    public CuentaBancariaResponseDto crearCuenta(@RequestBody CuentaBancariaRequestDto dto) {
        return cuentaBancariaService.crearCuenta(dto, getEmailAutenticado());
    }

    @GetMapping("/mia")
    public CuentaBancariaResponseDto obtenerMiCuenta() {
        return cuentaBancariaService.obtenerMiCuenta(getEmailAutenticado());
    }

    @PutMapping
    public CuentaBancariaResponseDto actualizarCuenta(@RequestBody CuentaBancariaRequestDto dto) {
        return cuentaBancariaService.actualizarCuenta(dto, getEmailAutenticado());
    }

    @DeleteMapping
    public void eliminarCuenta() {
        cuentaBancariaService.eliminarCuenta(getEmailAutenticado());
    }

    private String getEmailAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}