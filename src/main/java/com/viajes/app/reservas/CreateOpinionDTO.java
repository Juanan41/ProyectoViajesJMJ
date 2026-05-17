package com.viajes.app.reservas;


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
