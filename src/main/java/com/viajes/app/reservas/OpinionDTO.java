// ProyectoViajesJMJ - com/viajes/app/reservas/OpinionDTO.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

import java.time.LocalDateTime;

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
public class OpinionDTO {
    private Long id;
    private Long alojamientoId;
    private String alojamientoNombre;
    private Long usuarioId;
    private String nombreUsuario;
    private String destinoNombre;
    private Integer puntuacion;
    private String comentario;
    private LocalDateTime fechaOpinion;

    public OpinionDTO() {}

    public OpinionDTO(Long id, Long alojamientoId, Long usuarioId, String nombreUsuario, Integer puntuacion, String comentario, LocalDateTime fechaOpinion) {
        this.id = id;
        this.alojamientoId = alojamientoId;
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fechaOpinion = fechaOpinion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAlojamientoId() { return alojamientoId; }
    public void setAlojamientoId(Long alojamientoId) { this.alojamientoId = alojamientoId; }

    public String getAlojamientoNombre() { return alojamientoNombre; }
    public void setAlojamientoNombre(String alojamientoNombre) { this.alojamientoNombre = alojamientoNombre; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    public String getDestinoNombre() { return destinoNombre; }
    public void setDestinoNombre(String destinoNombre) { this.destinoNombre = destinoNombre; }

    public Integer getPuntuacion() { return puntuacion; }
    public void setPuntuacion(Integer puntuacion) { this.puntuacion = puntuacion; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }

    public LocalDateTime getFechaOpinion() { return fechaOpinion; }
    public void setFechaOpinion(LocalDateTime fechaOpinion) { this.fechaOpinion = fechaOpinion; }
}
