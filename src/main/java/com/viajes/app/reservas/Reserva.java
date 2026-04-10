package com.viajes.app.reservas;

import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.users.Usuario;
import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransporteTipo transporte;

    @ManyToOne
    @JoinColumn(name = "habitacion_id")
    private Habitacion habitacion;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Reserva() {}

    public Long getId() { return id; }

    public TransporteTipo getTransporte() { return transporte; }

    public void setTransporte(TransporteTipo transporte) { this.transporte = transporte; }

    public Habitacion getHabitacion() { return habitacion; }
    public void setHabitacion(Habitacion habitacion) { this.habitacion = habitacion; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}