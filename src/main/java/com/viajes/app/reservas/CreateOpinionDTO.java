// ProyectoViajesJMJ - com/viajes/app/reservas/CreateOpinionDTO.java
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

package com.viajes.app.reservas;

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
public class CreateOpinionDTO {
    private Integer puntuacion;
    private String comentario;

    public CreateOpinionDTO() {}

    public CreateOpinionDTO(Integer puntuacion, String comentario) {
        this.puntuacion = puntuacion;
        this.comentario = comentario;
    }

    public Integer getPuntuacion() { return puntuacion; }
    public void setPuntuacion(Integer puntuacion) { this.puntuacion = puntuacion; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
}
