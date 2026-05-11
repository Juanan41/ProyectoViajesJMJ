package com.viajes.app.viajes;

import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionService;
import com.viajes.app.api.UnsplashService;
import com.viajes.app.viajes.dto.RecomendacionRequest;
import com.viajes.app.viajes.dto.RecomendacionResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class RecomendacionRestController {

    private final UnsplashService unsplashService;
    private final HabitacionService habitacionService;

    public RecomendacionRestController(UnsplashService unsplashService,
                                       HabitacionService habitacionService) {
        this.unsplashService = unsplashService;
        this.habitacionService = habitacionService;
    }

    @PostMapping("/recomendar")
    public RecomendacionResponse recomendar(@RequestBody RecomendacionRequest form) {

        String destino = "";
        String precio = "";
        String descripcion = "";
        List<String> hoteles = new ArrayList<>();

        String continente = form.getContinente() != null ? form.getContinente().trim() : "";
        String clima = form.getClima() != null ? form.getClima().trim().toLowerCase() : "";
        String tipo = form.getTipo() != null ? form.getTipo().trim().toLowerCase() : "";
        String presupuesto = form.getPresupuesto() != null ? form.getPresupuesto().trim().toLowerCase() : "";
        String sugerencia = form.getSugerencia() != null ? form.getSugerencia().trim().toLowerCase() : "";

        if (continente.equalsIgnoreCase("Europa")) {
            if (sugerencia.contains("romantico") || sugerencia.contains("pareja")) {
                destino = "París";
            } else if (sugerencia.contains("historia")) {
                destino = "Roma";
            } else if (tipo.equals("urbano")) {
                destino = "Londres";
            } else {
                destino = "España";
            }
        } else if (continente.equalsIgnoreCase("Asia")) {
            if (sugerencia.contains("tecnologia") || sugerencia.contains("moderno")) {
                destino = "Tokio";
            } else if (tipo.equals("cultural")) {
                destino = "Pekín";
            } else if (tipo.equals("playa")) {
                destino = "Bangkok";
            } else {
                destino = "Dubái";
            }
        } else if (continente.equalsIgnoreCase("África") || continente.equalsIgnoreCase("Africa")) {
            if (sugerencia.contains("historia")) {
                destino = "El Cairo";
            } else if (tipo.equals("playa")) {
                destino = "Zanzibar";
            } else if (tipo.equals("aventura")) {
                destino = "Nairobi";
            } else {
                destino = "Marrakech";
            }
        } else if (continente.equalsIgnoreCase("Oceanía") || continente.equalsIgnoreCase("Oceania")) {
            if (tipo.equals("playa")) {
                destino = "Fiyi";
            } else if (tipo.equals("urbano")) {
                destino = "Sidney";
            } else {
                destino = "Melbourne";
            }
        } else if (continente.equalsIgnoreCase("América del Norte") || continente.equalsIgnoreCase("America del Norte")) {
            if (tipo.equals("urbano") && presupuesto.equals("alto")) {
                destino = "Nueva York";
            } else if (tipo.equals("playa")) {
                destino = "Cancún";
            } else {
                destino = "Chicago";
            }
        } else if (continente.equalsIgnoreCase("América del Sur") || continente.equalsIgnoreCase("America del Sur")) {
            if (tipo.equals("playa")) {
                destino = "Rio de Janeiro";
            } else if (tipo.equals("cultural")) {
                destino = "Buenos Aires";
            } else {
                destino = "Santiago de Chile";
            }
        }

        if (destino.equalsIgnoreCase("París")) {
            descripcion = "La ciudad del amor, arte, cultura y gastronomía.";
            precio = "2300€";
            hoteles.add("Paris Luxury Hotel");
        } else if (destino.equalsIgnoreCase("Roma")) {
            descripcion = "Historia romana, cultura y gastronomía italiana.";
            precio = "1800€";
            hoteles.add("Roma Centro Hotel");
        } else if (destino.equalsIgnoreCase("Londres")) {
            descripcion = "Ciudad moderna con historia, cultura y ocio.";
            precio = "2200€";
            hoteles.add("London Central Hotel");
        } else if (destino.equalsIgnoreCase("España")) {
            descripcion = "Cultura, gastronomía y diversidad.";
            precio = "1700€";
            hoteles.add("Madrid Central Hotel");
            hoteles.add("Barcelona Beach Resort");
        } else if (destino.equalsIgnoreCase("Tokio")) {
            descripcion = "Ciudad futurista con tecnología, cultura y tradición.";
            precio = "2200€";
            hoteles.add("Tokyo Central Hotel");
        } else if (destino.equalsIgnoreCase("Pekín")) {
            descripcion = "Historia imperial, cultura china y monumentos icónicos.";
            precio = "1700€";
            hoteles.add("Beijing Imperial Hotel");
        } else if (destino.equalsIgnoreCase("Bangkok")) {
            descripcion = "Templos, mercados y vida nocturna exótica.";
            precio = "1400€";
            hoteles.add("Bangkok Palace Hotel");
        } else if (destino.equalsIgnoreCase("Dubái")) {
            descripcion = "Lujo, rascacielos y experiencias en el desierto.";
            precio = "2500€";
            hoteles.add("Dubai Luxury Tower Hotel");
        } else if (destino.equalsIgnoreCase("El Cairo")) {
            descripcion = "Historia antigua, pirámides y cultura egipcia.";
            precio = "1500€";
            hoteles.add("Cairo Pyramids Hotel");
        } else if (destino.equalsIgnoreCase("Zanzibar")) {
            descripcion = "Playas paradisíacas y aguas cristalinas.";
            precio = "1800€";
            hoteles.add("Zanzibar Beach Hotel");
        } else if (destino.equalsIgnoreCase("Nairobi")) {
            descripcion = "Safari africano y naturaleza salvaje.";
            precio = "2000€";
            hoteles.add("Safari Lodge Nairobi");
        } else if (destino.equalsIgnoreCase("Marrakech")) {
            descripcion = "Mercados tradicionales, cultura marroquí y arquitectura exótica.";
            precio = "1200€";
            hoteles.add("Marrakech Riad Hotel");
        } else if (destino.equalsIgnoreCase("Fiyi")) {
            descripcion = "Playas paradisíacas y relax total.";
            precio = "3000€";
            hoteles.add("Fiji Island Hotel");
        } else if (destino.equalsIgnoreCase("Sidney")) {
            descripcion = "Ópera icónica, playas y cultura urbana australiana.";
            precio = "2600€";
            hoteles.add("Sydney Harbour Hotel");
        } else if (destino.equalsIgnoreCase("Melbourne")) {
            descripcion = "Arte, cultura y vida cosmopolita.";
            precio = "2400€";
            hoteles.add("Melbourne City Hotel");
        } else if (destino.equalsIgnoreCase("Nueva York")) {
            descripcion = "Rascacielos, cultura urbana y la ciudad que nunca duerme.";
            precio = "2800€";
            hoteles.add("Manhattan Central Hotel");
        } else if (destino.equalsIgnoreCase("Cancún")) {
            descripcion = "Playas paradisíacas y relax en el Caribe.";
            precio = "2200€";
            hoteles.add("Cancun Beach Hotel");
        } else if (destino.equalsIgnoreCase("Chicago")) {
            descripcion = "Arquitectura, música y ambiente urbano.";
            precio = "2300€";
            hoteles.add("Chicago Downtown Hotel");
        } else if (destino.equalsIgnoreCase("Rio de Janeiro")) {
            descripcion = "Playas, carnaval y paisajes icónicos como el Cristo Redentor.";
            precio = "1900€";
            hoteles.add("Rio Beach Hotel");
        } else if (destino.equalsIgnoreCase("Buenos Aires")) {
            descripcion = "Cultura, tango y gastronomía argentina.";
            precio = "1600€";
            hoteles.add("Buenos Aires Central Hotel");
        } else if (destino.equalsIgnoreCase("Santiago de Chile")) {
            descripcion = "Ciudad moderna rodeada de montañas y naturaleza.";
            precio = "2000€";
            hoteles.add("Santiago City Hotel");
        }

        List<Habitacion> habitaciones = habitacionService.buscarPorDestino(destino);
        Map<String, List<Habitacion>> habitacionesPorHotel = new HashMap<>();

        for (Habitacion h : habitaciones) {
            if (h.getAlojamiento() == null) continue;

            if (h.getTipo().equalsIgnoreCase("Suite")) {
                h.setImagenUrl("https://images.unsplash.com/photo-1566665797739-1674de7a421a");
            } else if (h.getTipo().equalsIgnoreCase("Individual")) {
                h.setImagenUrl("https://images.unsplash.com/photo-1618773928121-c32242e63f39");
            } else {
                h.setImagenUrl("https://images.unsplash.com/photo-1590490360182-c33d57733427");
            }

            String nombreHotel = h.getAlojamiento().getNombre();
            habitacionesPorHotel.computeIfAbsent(nombreHotel, k -> new ArrayList<>()).add(h);
        }

        hoteles = new ArrayList<>(habitacionesPorHotel.keySet());

        RecomendacionResponse response = new RecomendacionResponse();
        response.setDestino(destino);
        response.setDescripcion(descripcion);
        response.setPrecio(precio);
        response.setImagen(unsplashService.obtenerImagen(destino + " city skyline"));
        response.setHoteles(hoteles);
        response.setHabitacionesPorHotel(habitacionesPorHotel);

        return response;
    }
}