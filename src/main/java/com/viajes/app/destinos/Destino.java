package com.viajes.app.destinos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.viajes.app.alojamientos.Alojamiento;
import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "destinos")
public class Destino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "continente_id")
    private Continente continente;

    @OneToMany(mappedBy = "destino")
    @JsonIgnore
    private List<Alojamiento> alojamientos;

    private String descripcion;
    private Double precio;

    public Destino() {}

    public Long getId() { return id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Continente getContinente() { return continente; }
    public void setContinente(Continente continente) { this.continente = continente; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
}