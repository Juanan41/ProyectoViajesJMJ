package com.viajes.app.destinos.dto;


public class DestinoDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;

    private String pais;
    private String continente;
    private Long continenteId;
    private String imagen;

    public DestinoDTO() {}

    public DestinoDTO(Long id, String nombre, String descripcion, Double precio,
                      String pais, String continente, Long continenteId, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.pais = pais;
        this.continente = continente;
        this.continenteId = continenteId;
        this.imagen = imagen;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }

    public String getContinente() { return continente; }
    public void setContinente(String continente) { this.continente = continente; }

    public Long getContinenteId() { return continenteId; }
    public void setContinenteId(Long continenteId) { this.continenteId = continenteId; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
}
