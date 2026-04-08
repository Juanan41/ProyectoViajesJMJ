package com.viajes.app.reservas;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository repository;

    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }

    // 💾 Guardar reserva
    public Reserva guardar(Reserva reserva) {
        return repository.save(reserva);
    }

    // 📋 Obtener todas las reservas
    public List<Reserva> obtenerTodas() {
        return repository.findAll();
    }
}