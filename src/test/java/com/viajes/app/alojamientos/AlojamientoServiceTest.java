package com.viajes.app.alojamientos;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AlojamientoServiceTest {

    @Mock
    private AlojamientoRepository repository;

    @InjectMocks
    private AlojamientoService service;

    @Test
    void guardar_deberiaDarDeAltaAlojamiento() {
        Alojamiento nuevo = new Alojamiento("Hotel Centro", "Madrid", "España", "hotel", 120.0);

        when(repository.save(nuevo)).thenReturn(nuevo);

        Alojamiento guardado = service.guardar(nuevo);

        assertSame(nuevo, guardado);
        verify(repository).save(nuevo);
    }

    @Test
    void obtenerTodos_deberiaRetornarListaDeAlojamientos() {
        Alojamiento a1 = new Alojamiento("Hotel A", "Roma", "Italia", "hotel", 150.0);
        Alojamiento a2 = new Alojamiento("Resort B", "Cancun", "Mexico", "resort", 220.0);
        List<Alojamiento> esperados = List.of(a1, a2);

        when(repository.findAll()).thenReturn(esperados);

        List<Alojamiento> resultado = service.obtenerTodos();

        assertEquals(2, resultado.size());
        assertEquals("Hotel A", resultado.get(0).getNombre());
        verify(repository).findAll();
    }
}

