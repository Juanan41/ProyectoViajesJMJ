
package com.viajes.app.alojamientos;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;

    public HabitacionService(HabitacionRepository habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    public Habitacion buscarPorId(Long id) {
        return habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitaci\u00f3n no encontrada"));
    }

    public List<Habitacion> obtenerTodas() {
        return habitacionRepository.findAll();
    }

    public List<Habitacion> buscarPorAlojamiento(Long alojamientoId) {
        return habitacionRepository.findByAlojamientoId(alojamientoId);
    }

    public List<Habitacion> buscarPorDestino(String destino) {
        return habitacionRepository.findByDestinoReal(destino);
    }

    public List<Habitacion> buscarPorHotelNombre(String hotelNombre) {
        return habitacionRepository.findByAlojamiento_Nombre(hotelNombre);
    }

    public Habitacion guardar(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }
}
