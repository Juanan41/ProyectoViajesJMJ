package com.viajes.app.alojamientos;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitacionService {

    private final HabitacionRepository repository;

    public HabitacionService(HabitacionRepository repository) {
        this.repository = repository;
    }

    // 🔍 Buscar por ID (CLAVE)
    public Habitacion buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
    }

    // 📋 Listar todas
    public List<Habitacion> obtenerTodas() {
        return repository.findAll();
    }

    // 🏨 Buscar por alojamiento
    public List<Habitacion> buscarPorAlojamiento(Long alojamientoId) {
        return repository.findByAlojamientoId(alojamientoId);
    }

    // 🏨 Buscar por destino
    public List<Habitacion> buscarPorDestino(String destino) {
        return repository.findByDestino(destino);
    }

    // 🏨 Buscar por nombre de hotel
    public List<Habitacion> buscarPorHotelNombre(String hotelNombre) {
        return repository.findByAlojamiento_Nombre(hotelNombre);
    }

    // 💾 Guardar
    public Habitacion guardar(Habitacion habitacion) {
        return repository.save(habitacion);
    }
}