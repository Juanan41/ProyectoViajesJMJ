package com.viajes.app.alojamientos;

import org.springframework.stereotype.Service;

import java.util.List;

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