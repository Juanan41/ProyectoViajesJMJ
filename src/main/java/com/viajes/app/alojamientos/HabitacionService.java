// ProyectoViajesJMJ - com/viajes/app/alojamientos/HabitacionService.java
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

package com.viajes.app.alojamientos;

import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */

@Service
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;

    public HabitacionService(HabitacionRepository habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    // 🔍 Buscar por ID
    public Habitacion buscarPorId(Long id) {
        return habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
    }

    // 📋 Listar todas
    public List<Habitacion> obtenerTodas() {
        return habitacionRepository.findAll();
    }

    // 🏨 Buscar por alojamiento
    public List<Habitacion> buscarPorAlojamiento(Long alojamientoId) {
        return habitacionRepository.findByAlojamientoId(alojamientoId);
    }

    // 🏨 Buscar por destino (EL IMPORTANTE)
    public List<Habitacion> buscarPorDestino(String destino) {
        return habitacionRepository.findByDestinoReal(destino);
    }

    // 🏨 Buscar por nombre de hotel
    public List<Habitacion> buscarPorHotelNombre(String hotelNombre) {
        return habitacionRepository.findByAlojamiento_Nombre(hotelNombre);
    }

    // 💾 Guardar
    public Habitacion guardar(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }
}
