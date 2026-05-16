package com.viajes.app.alojamientos;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    private final HabitacionService habitacionService;

    public HabitacionController(HabitacionService habitacionService) {
        this.habitacionService = habitacionService;
    }

    @GetMapping
    public List<Habitacion> listarTodas() {
        return habitacionService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Habitacion obtenerPorId(@PathVariable Long id) {
        return habitacionService.buscarPorId(id);
    }

    @GetMapping("/alojamiento/{hotelId}")
    public List<Habitacion> listarPorAlojamiento(@PathVariable Long hotelId) {
        return habitacionService.buscarPorAlojamiento(hotelId);
    }

    @GetMapping("/destino/{destino}")
    public List<Habitacion> listarPorDestino(@PathVariable String destino) {
        return habitacionService.buscarPorDestino(destino);
    }

    @GetMapping("/hotel/{hotelNombre}")
    public List<Habitacion> listarPorNombreHotel(@PathVariable String hotelNombre) {
        return habitacionService.buscarPorHotelNombre(hotelNombre);
    }
}