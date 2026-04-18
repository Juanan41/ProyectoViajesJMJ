package com.viajes.app.alojamientos;

import com.viajes.app.destinos.Destino;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alojamientos")

public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nombre;

    @NotBlank
    @Column(nullable = false)
    private String ciudad;

    @NotBlank
    @Column(nullable = false)
    private String pais;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAlojamiento tipo;

    @NotNull
    @Positive
    @Column(nullable = false)
    private BigDecimal precioPorNoche;

    @ManyToOne
    @JoinColumn(name = "destino_id", nullable = false)
    private Destino destino;

    @OneToMany(mappedBy = "alojamiento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Habitacion> habitaciones = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // CONSTRUCTORES
    public Alojamiento() {
    }

    public Alojamiento(String nombre, String ciudad, String pais, TipoAlojamiento tipo, BigDecimal precioPorNoche) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.tipo = tipo;
        this.precioPorNoche = precioPorNoche;
    }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public TipoAlojamiento getTipo() {
        return tipo;
    }

    public void setTipo(TipoAlojamiento tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getPrecioPorNoche() {
        return precioPorNoche;
    }

    public void setPrecioPorNoche(BigDecimal precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }

    public Destino getDestino() { return destino; }

    public void setDestino(Destino destino) { this.destino = destino; }

    public List<Habitacion> getHabitaciones() {
        return habitaciones;
    }

    public void setHabitaciones(List<Habitacion> habitaciones) {
        this.habitaciones = habitaciones;
    }

    public void addHabitacion(Habitacion h) {
        habitaciones.add(h);
        h.setAlojamiento(this);
    }

    public void removeHabitacion(Habitacion h) {
        habitaciones.remove(h);
        h.setAlojamiento(null);
    }

    @Override
    public String toString() {
        return "Alojamiento{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", ciudad='" + ciudad + '\'' +
                ", pais='" + pais + '\'' +
                ", tipo='" + tipo + '\'' +
                ", precioPorNoche=" + precioPorNoche +
                '}';
    }
}
