package com.viajes.app.viajes;

import com.viajes.app.alojamientos.AlojamientoService;
import com.viajes.app.alojamientos.Habitacion;
import com.viajes.app.alojamientos.HabitacionService;
import com.viajes.app.api.UnsplashService;
import com.viajes.app.reservas.Reserva;
import com.viajes.app.reservas.ReservaService;
import com.viajes.app.reservas.TransporteTipo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ViajeController {

    private final UnsplashService unsplashService;
    private final HabitacionService habitacionService;
    private final ReservaService reservaService;
    private final AlojamientoService alojamientoService;

    public ViajeController(UnsplashService unsplashService,
                           HabitacionService habitacionService,
                           ReservaService reservaService,
                           AlojamientoService alojamientoService) {

        this.unsplashService = unsplashService;
        this.habitacionService = habitacionService;
        this.reservaService = reservaService;
        this.alojamientoService = alojamientoService;
    }


    @PostMapping("/recomendar")
    public String recomendar(@ModelAttribute FormularioViaje form, Model model) {

        String destino = "";
        String precio = "";
        String descripcion = "";
        List<String> hoteles = new ArrayList<>();
        String sugerencia = (form.getSugerencia() != null)
                ? form.getSugerencia().toLowerCase()
                : "";

        // ================= ASIA =================
        if (form.getContinente().equalsIgnoreCase("Asia")) {

            // 🔥 SUGERENCIA (PRIORIDAD ALTA)
            if (sugerencia.contains("lujo") && form.getPresupuesto().equals("alto")) {
                destino = "Maldivas";
            }
            else if (sugerencia.contains("playa")) {
                destino = "Bali";
            }
            else if (sugerencia.contains("tecnologia") || sugerencia.contains("moderno")) {
                destino = "Tokio";
            }
            else if (sugerencia.contains("aventura")) {
                destino = "Nepal";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("playa") && form.getClima().equals("calido")) {
                destino = "Bali";
            }
            else if (form.getTipo().equals("urbano") && form.getClima().equals("templado")) {
                destino = "Tokio";
            }

            // 🔽 CÓDIGO ORIGINAL
            else if (form.getClima().equals("calido") && form.getTipo().equals("cultural")) {
                destino = "Bangkok";
            }
            else if (form.getClima().equals("templado") && form.getTipo().equals("urbano")) {
                destino = "Tokio";
            }
            else if (form.getTipo().equals("playa") && form.getPresupuesto().equals("alto")) {
                destino = "Maldivas";
            }
            else if (form.getTipo().equals("playa") && form.getPresupuesto().equals("medio")) {
                destino = "Bali";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Nepal";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "Pekin";
            }
            else {
                destino = "Dubai";
            }
        }

        // ================= EUROPA =================
        else if (form.getContinente().equalsIgnoreCase("Europa")) {

            // 🔥 SUGERENCIA (PRIORIDAD)
            if (sugerencia.contains("romantico") || sugerencia.contains("pareja")) {
                destino = "París";
            }
            else if (sugerencia.contains("historia")) {
                destino = "Roma";
            }
            else if (sugerencia.contains("fiesta")) {
                destino = "Ibiza";
            }
            else if (sugerencia.contains("naturaleza") || sugerencia.contains("montana")) {
                destino = "Suiza";
            }
            else if (sugerencia.contains("ciudad") || sugerencia.contains("urbano")) {
                destino = "Londres";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("playa") && form.getPresupuesto().equals("alto")) {
                destino = "Ibiza";
            }
            else if (form.getTipo().equals("cultural") && form.getPresupuesto().equals("alto")) {
                destino = "París";
            }

            // 🔽  CÓDIGO ORIGINAL
            else if (form.getTipo().equals("cultural") && form.getPresupuesto().equals("alto")) {
                destino = "París";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "Roma";
            }
            else if (form.getTipo().equals("playa")) {
                destino = "Ibiza";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Suiza";
            }
            else if (form.getTipo().equals("urbano")) {
                destino = "Londres";
            }
            else {
                destino = "Barcelona";
            }
        }

        // ================= AMERICA NORTE =================
        else if (form.getContinente().equalsIgnoreCase("America Norte")) {

            // 🔥 SUGERENCIA (PRIORIDAD)
            if (sugerencia.contains("lujo") || sugerencia.contains("rascacielos")) {
                destino = "Nueva York";
            }
            else if (sugerencia.contains("playa") || sugerencia.contains("fiesta")) {
                destino = "Miami";
            }
            else if (sugerencia.contains("naturaleza") || sugerencia.contains("montana")) {
                destino = "Colorado";
            }
            else if (sugerencia.contains("cine") || sugerencia.contains("hollywood")) {
                destino = "Los Angeles";
            }
            else if (sugerencia.contains("ciudad") || sugerencia.contains("urbano")) {
                destino = "Chicago";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("urbano") && form.getPresupuesto().equals("alto")) {
                destino = "Nueva York";
            }
            else if (form.getTipo().equals("playa") && form.getClima().equals("calido")) {
                destino = "Miami";
            }

            // 🔽 CÓDIGO ORIGINAL
            else if (form.getTipo().equals("urbano") && form.getPresupuesto().equals("alto")) {
                destino = "Nueva York";
            }
            else if (form.getTipo().equals("urbano")) {
                destino = "Chicago";
            }
            else if (form.getTipo().equals("playa")) {
                destino = "Miami";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Colorado";
            }
            else {
                destino = "Los Angeles";
            }
        }

        // ================= AMERICA SUR =================
        else if (form.getContinente().equalsIgnoreCase("America Sur")) {

            // 🔥 SUGERENCIA (PRIORIDAD)
            if (sugerencia.contains("playa") || sugerencia.contains("fiesta")) {
                destino = "Rio De Janeiro";
            }
            else if (sugerencia.contains("historia") || sugerencia.contains("inca")) {
                destino = "Machu Picchu";
            }
            else if (sugerencia.contains("cultura") || sugerencia.contains("tango")) {
                destino = "Buenos Aires";
            }
            else if (sugerencia.contains("caribe") || sugerencia.contains("relax")) {
                destino = "Cartagena";
            }
            else if (sugerencia.contains("moderno") || sugerencia.contains("ciudad")) {
                destino = "Chile";
            }
            else if (sugerencia.contains("tranquilo") || sugerencia.contains("relajado")) {
                destino = "Montevideo";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("playa") && form.getClima().equals("calido")) {
                destino = "Rio De Janeiro";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Machu Picchu";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "Buenos Aires";
            }

            // 🔽 CÓDIGO ORIGINAL
            else if (form.getTipo().equals("playa")) {
                destino = "Rio De Janeiro";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Machu Picchu";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "Buenos Aires";
            }
            else {
                destino = "Chile";
            }
        }

        // ================= AFRICA =================
        else if (form.getContinente().equalsIgnoreCase("Africa")) {

            // 🔥 SUGERENCIA (PRIORIDAD)
            if (sugerencia.contains("piramides") || sugerencia.contains("historia")) {
                destino = "El Cairo";
            }
            else if (sugerencia.contains("mercados") || sugerencia.contains("cultura")) {
                destino = "Marrakech";
            }
            else if (sugerencia.contains("safari") || sugerencia.contains("animales") || sugerencia.contains("aventura")) {
                destino = "Nairobi";
            }
            else if (sugerencia.contains("playa") || sugerencia.contains("isla")) {
                destino = "Zanzibar";
            }
            else if (sugerencia.contains("desierto") || sugerencia.contains("arena")) {
                destino = "Sahara";
            }
            else if (sugerencia.contains("ciudad") || sugerencia.contains("moderno")) {
                destino = "Ciudad Del Cabo";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("playa") && form.getClima().equals("calido")) {
                destino = "Zanzibar";
            }
            else if (form.getTipo().equals("montana")) {
                destino = "Ciudad Del Cabo";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "El Cairo";
            }

            // 🔽 CÓDIGO ORIGINAL
            else if (form.getTipo().equals("aventura")) {
                destino = "Nairobi";
            }
            else if (form.getTipo().equals("playa")) {
                destino = "Zanzibar";
            }
            else if (form.getTipo().equals("cultural")) {
                destino = "El Cairo";
            }
            else {
                destino = "Marrakech";
            }
        }

        // ================= OCEANIA =================
        else if (form.getContinente().equalsIgnoreCase("Oceania")) {

            // 🔥 SUGERENCIA (PRIORIDAD)
            if (sugerencia.contains("romantico") || sugerencia.contains("pareja")) {
                destino = "Bora Bora";
            }
            else if (sugerencia.contains("playa") || sugerencia.contains("relax")) {
                destino = "Fiji";
            }
            else if (sugerencia.contains("ciudad") || sugerencia.contains("urbano")) {
                destino = "Sydney";
            }
            else if (sugerencia.contains("arte") || sugerencia.contains("cultura")) {
                destino = "Melbourne";
            }
            else if (sugerencia.contains("naturaleza") || sugerencia.contains("aventura")) {
                destino = "Auckland";
            }
            else if (sugerencia.contains("tranquilo") || sugerencia.contains("moderno")) {
                destino = "Perth";
            }

            // 🔥 COMBINACIONES INTELIGENTES
            else if (form.getTipo().equals("playa") && form.getPresupuesto().equals("alto")) {
                destino = "Bora Bora";
            }
            else if (form.getTipo().equals("playa")) {
                destino = "Fiji";
            }
            else if (form.getTipo().equals("urbano")) {
                destino = "Sydney";
            }

            // 🔽 CÓDIGO ORIGINAL
            else if (form.getTipo().equals("playa")) {
                destino = "Fiji";
            }
            else if (form.getTipo().equals("urbano")) {
                destino = "Sydney";
            }
            else {
                destino = "Melbourne";
            }
        }


        // ================= INFO DESTINOS ASIA =================

        if (destino.equalsIgnoreCase("Bangkok")) {
            descripcion = "Cultura asiática, templos y vida nocturna vibrante.";
            precio = "1400€";

            hoteles.add("Bangkok Palace Hotel");
            hoteles.add("Skyline Resort Bangkok");
            hoteles.add("Chao Phraya River Hotel");
        }
        else if (destino.equalsIgnoreCase("Tokio")) {
            descripcion = "Ciudad futurista con tecnología, cultura y tradición.";
            precio = "2200€";

            hoteles.add("Tokyo Central Hotel");
            hoteles.add("Shinjuku Grand Resort");
            hoteles.add("Akihabara Stay");
        }
        else if (destino.equalsIgnoreCase("Maldivas")) {
            descripcion = "Islas paradisíacas con aguas cristalinas y lujo.";
            precio = "3500€";

            hoteles.add("Maldives Luxury Resort");
            hoteles.add("Ocean Paradise Villas");
            hoteles.add("Coral Reef Hotel");
        }
        else if (destino.equalsIgnoreCase("Bali")) {
            descripcion = "Playas, templos y naturaleza tropical.";
            precio = "1800€";

            hoteles.add("Bali Beach Resort");
            hoteles.add("Ubud Nature Hotel");
            hoteles.add("Sunset Paradise Bali");
        }
        else if (destino.equalsIgnoreCase("Nepal")) {
            descripcion = "Montañas, aventura y el Himalaya.";
            precio = "1600€";

            hoteles.add("Kathmandu Mountain Hotel");
            hoteles.add("Himalaya View Resort");
            hoteles.add("Everest Base Camp Lodge");
        }
        else if (destino.equalsIgnoreCase("Pekin")) {
            descripcion = "Historia imperial, cultura china y la Gran Muralla.";
            precio = "1700€";

            hoteles.add("Beijing Imperial Hotel");
            hoteles.add("Forbidden City Stay");
            hoteles.add("Dragon Palace Hotel");
        }
        else if (destino.equalsIgnoreCase("Dubai")) {
            descripcion = "Lujo, rascacielos y experiencias únicas en el desierto.";
            precio = "2500€";

            hoteles.add("Burj View Hotel");
            hoteles.add("Dubai Luxury Resort");
            hoteles.add("Desert Oasis Hotel");
        }

        // ================= INFO DESTINOS EUROPA =================

        if (destino.equalsIgnoreCase("París")) {
            descripcion = "La ciudad del amor, arte, cultura y gastronomía.";
            precio = "2300€";

            hoteles.add("Paris Luxury Hotel");
            hoteles.add("Eiffel Tower View Resort");
            hoteles.add("Champs Elysees Stay");
        }
        else if (destino.equalsIgnoreCase("Roma")) {
            descripcion = "Historia romana, cultura y gastronomía italiana.";
            precio = "1800€";

            hoteles.add("Roma Centro Hotel");
            hoteles.add("Colosseum View Stay");
            hoteles.add("Vatican Luxury Inn");
        }
        else if (destino.equalsIgnoreCase("Ibiza")) {
            descripcion = "Playas, fiesta y ambiente mediterráneo.";
            precio = "2000€";

            hoteles.add("Ibiza Beach Resort");
            hoteles.add("Sunset Party Hotel");
            hoteles.add("Mediterranean Paradise");
        }
        else if (destino.equalsIgnoreCase("Suiza")) {
            descripcion = "Montañas, naturaleza y paisajes alpinos.";
            precio = "2500€";

            hoteles.add("Swiss Alps Hotel");
            hoteles.add("Mountain View Resort");
            hoteles.add("Zurich Luxury Stay");
        }
        else if (destino.equalsIgnoreCase("Londres")) {
            descripcion = "Ciudad moderna con historia, cultura y ocio.";
            precio = "2200€";

            hoteles.add("London Central Hotel");
            hoteles.add("Big Ben View Stay");
            hoteles.add("Thames Riverside Resort");
        }
        else if (destino.equalsIgnoreCase("Barcelona")) {
            descripcion = "Ciudad costera con cultura, arquitectura y playa.";
            precio = "1700€";

            hoteles.add("Barcelona Beach Hotel");
            hoteles.add("Sagrada Familia Stay");
            hoteles.add("Ramblas City Hotel");
        }

        // ================= INFO DESTINOS AMERICA NORTE =================

        if (destino.equalsIgnoreCase("Nueva York")) {
            descripcion = "La ciudad que nunca duerme, rascacielos y cultura urbana.";
            precio = "2800€";

            hoteles.add("Manhattan Luxury Hotel");
            hoteles.add("Times Square Resort");
            hoteles.add("Central Park View Stay");
        }
        else if (destino.equalsIgnoreCase("Chicago")) {
            descripcion = "Arquitectura moderna, lago Michigan y ambiente urbano.";
            precio = "2000€";

            hoteles.add("Chicago Downtown Hotel");
            hoteles.add("Lake Michigan Resort");
            hoteles.add("Windy City Stay");
        }
        else if (destino.equalsIgnoreCase("Miami")) {
            descripcion = "Playas, sol y ambiente tropical con vida nocturna.";
            precio = "2200€";

            hoteles.add("Miami Beach Resort");
            hoteles.add("Ocean Drive Hotel");
            hoteles.add("South Beach Paradise");
        }
        else if (destino.equalsIgnoreCase("Colorado")) {
            descripcion = "Montañas, nieve y deportes de aventura.";
            precio = "2100€";

            hoteles.add("Rocky Mountain Lodge");
            hoteles.add("Colorado Ski Resort");
            hoteles.add("Aspen Luxury Stay");
        }
        else if (destino.equalsIgnoreCase("Los Angeles")) {
            descripcion = "Cine, playas y estilo de vida californiano.";
            precio = "2500€";

            hoteles.add("Hollywood Stars Hotel");
            hoteles.add("Beverly Hills Resort");
            hoteles.add("Santa Monica Beach Hotel");
        }

        // ================= INFO DESTINOS AMERICA SUR =================

        if (destino.equalsIgnoreCase("Rio De Janeiro")) {
            descripcion = "Playas, carnaval y paisajes icónicos como el Cristo Redentor.";
            precio = "1900€";

            hoteles.add("Copacabana Beach Hotel");
            hoteles.add("Rio Luxury Resort");
            hoteles.add("Ipanema Paradise Stay");
        }
        else if (destino.equalsIgnoreCase("Peru")) {
            descripcion = "Historia inca, Machu Picchu y paisajes andinos.";
            precio = "1700€";

            hoteles.add("Cusco Mountain Hotel");
            hoteles.add("Machu Picchu Lodge");
            hoteles.add("Sacred Valley Resort");
        }
        else if (destino.equalsIgnoreCase("Buenos Aires")) {
            descripcion = "Cultura, tango y gastronomía argentina.";
            precio = "1600€";

            hoteles.add("Buenos Aires Central Hotel");
            hoteles.add("Tango City Resort");
            hoteles.add("Recoleta Luxury Stay");
        }
        else if (destino.equalsIgnoreCase("Chile")) {
            descripcion = "Naturaleza extrema: desierto, montañas y glaciares.";
            precio = "1800€";

            hoteles.add("Santiago City Hotel");
            hoteles.add("Patagonia Adventure Lodge");
            hoteles.add("Atacama Desert Resort");
        }


        // ================= INFO DESTINOS AFRICA =================
        if (destino.equalsIgnoreCase("Kenia")) {
            descripcion = "Safari en la sabana africana con fauna salvaje.";
            precio = "2000€";

            hoteles.add("Safari Lodge Kenia");
            hoteles.add("Masai Mara Resort");
            hoteles.add("Savannah Camp");
        }
        else if (destino.equalsIgnoreCase("Zanzibar")) {
            descripcion = "Playas paradisíacas y aguas cristalinas.";
            precio = "1800€";

            hoteles.add("Zanzibar Beach Resort");
            hoteles.add("Blue Ocean Hotel");
            hoteles.add("Paradise Island Resort");
        }
        else if (destino.equalsIgnoreCase("El Cairo")) {
            descripcion = "Historia antigua: pirámides y templos.";
            precio = "1500€";

            hoteles.add("Cairo Palace Hotel");
            hoteles.add("Nile View Resort");
            hoteles.add("Pyramids Luxury Stay");
        }
        else if (destino.equalsIgnoreCase("Marrakech")) {
            descripcion = "Mercados, desierto y cultura árabe.";
            precio = "1200€";

            hoteles.add("Riad Marrakech");
            hoteles.add("Desert Camp Sahara");
            hoteles.add("Atlas Mountain Hotel");
        }

        // ================= INFO DESTINOS OCEANIA =================

        if (destino.equalsIgnoreCase("Fiji")) {
            descripcion = "Islas paradisíacas con playas cristalinas y tranquilidad total.";
            precio = "3000€";

            hoteles.add("Fiji Island Resort");
            hoteles.add("Ocean Paradise Villas");
            hoteles.add("Coral Beach Hotel");
        }
        else if (destino.equalsIgnoreCase("Sydney")) {
            descripcion = "Ciudad moderna con playas, ópera y estilo de vida relajado.";
            precio = "2600€";

            hoteles.add("Sydney Harbour Hotel");
            hoteles.add("Opera House View Stay");
            hoteles.add("Bondi Beach Resort");
        }
        else if (destino.equalsIgnoreCase("Australia")) {
            descripcion = "Naturaleza salvaje, desiertos y fauna única.";
            precio = "2800€";

            hoteles.add("Outback Adventure Lodge");
            hoteles.add("Melbourne City Hotel");
            hoteles.add("Great Barrier Reef Resort");
        }


        model.addAttribute("destino", destino);
        model.addAttribute("descripcion", descripcion);
        model.addAttribute("precio", precio);
        model.addAttribute("hoteles", hoteles);

        // 🔥 IMÁGENES DINÁMICAS
        model.addAttribute("imgVuelo", unsplashService.obtenerImagen("airplane window"));
        model.addAttribute("imgHotel", unsplashService.obtenerImagen(destino + " hotel"));
        model.addAttribute("imgHabitacion", unsplashService.obtenerImagen("hotel room"));
        model.addAttribute("imagen", unsplashService.obtenerImagen(destino + " city skyline"));

        List<Habitacion> habitaciones = habitacionService.buscarPorDestino(destino);

        // 🔥 DEBUG REAL
        System.out.println("========== DEBUG ==========");
        System.out.println("DESTINO BUSCADO: " + destino);
        System.out.println("TOTAL HABITACIONES: " + habitaciones.size());

        for (Habitacion h : habitaciones) {

            if (h.getAlojamiento() == null) {
                System.out.println("❌ Habitacion SIN alojamiento");
            } else {
                System.out.println("🏨 Hotel: " + h.getAlojamiento().getNombre());

                if (h.getAlojamiento().getDestino() == null) {
                    System.out.println("❌ SIN destino");
                } else {
                    System.out.println("📍 Destino BD: " + h.getAlojamiento().getDestino().getNombre());
                }
            }
        }

        System.out.println("========== FIN DEBUG ==========");

        System.out.println("DESTINO: " + destino);
        System.out.println("HABITACIONES ENCONTRADAS: " + habitaciones.size());

        for (Habitacion h : habitaciones) {
            if (h.getAlojamiento() != null) {
                System.out.println("HOTEL: " + h.getAlojamiento().getNombre());
            }
        }

// 🔥 AGRUPACIÓN AUTOMÁTICA (PRO)
        Map<String, List<Habitacion>> habitacionesPorHotel = new HashMap<>();

        for (Habitacion h : habitaciones) {

            if (h.getAlojamiento() == null) continue;

            // 🎯 IMAGEN PRO SEGÚN TIPO
            String imagen;

            if (h.getTipo().equalsIgnoreCase("Suite")) {
                imagen = "https://images.unsplash.com/photo-1566665797739-1674de7a421a";
            } else if (h.getTipo().equalsIgnoreCase("Individual")) {
                imagen = "https://images.unsplash.com/photo-1618773928121-c32242e63f39";
            } else {
                imagen = "https://images.unsplash.com/photo-1590490360182-c33d57733427";
            }

            // 🔥 ASIGNAMOS IMAGEN
            h.setImagenUrl(imagen);

            String nombreHotel = h.getAlojamiento().getNombre();

            habitacionesPorHotel
                    .computeIfAbsent(nombreHotel, k -> new ArrayList<>())
                    .add(h);
        }

        System.out.println("---- HOTELES HTML ----");
        for (String htl : hoteles) {
            System.out.println(htl);
        }

        System.out.println("---- HABITACIONES BD ----");
        for (Habitacion h : habitaciones) {
            if (h.getAlojamiento() != null) {
                System.out.println(h.getAlojamiento().getNombre());
            }
        }


        model.addAttribute("habitacionesPorHotel", habitacionesPorHotel);

        // 🔍 DEBUG
        System.out.println("DESTINO: " + destino);
        System.out.println("TOTAL HABITACIONES: " + habitaciones.size());

        for (Habitacion h : habitaciones) {
            if (h.getAlojamiento() != null) {
                System.out.println("HOTEL BD: " + h.getAlojamiento().getNombre());
            }
        }

        for (String h : hoteles) {
            System.out.println("HOTEL HTML: " + h);
        }


        return "viajes/resultado";


    }
    @PostMapping("/reservar")
    public String reservar(@RequestParam String destino,
                           @RequestParam String hotel,
                           @RequestParam Long habitacionId,
                           @RequestParam String transporte,
                           @RequestParam int presupuestoTransporte,
                           @RequestParam(required = false) int noches,
                           Model model) {

        model.addAttribute("mensaje", "Reserva confirmada para " + destino);

        model.addAttribute("destino", destino);
        model.addAttribute("hotel", hotel);
        model.addAttribute("transporte", transporte);

        // 🔥 IMÁGENES
        String imagenTransporte;

        if (transporte.equalsIgnoreCase("AVION")) {
            imagenTransporte = "airplane window";
        } else if (transporte.equalsIgnoreCase("TREN")) {
            imagenTransporte = "train travel";
        } else {
            imagenTransporte = "cruise ship";
        }

        model.addAttribute("imgTransporte", unsplashService.obtenerImagen(imagenTransporte));
        model.addAttribute("imgHotel", unsplashService.obtenerImagen(destino + " luxury hotel"));
        model.addAttribute("imgHabitacion", unsplashService.obtenerImagen("hotel room luxury"));

        // 🔥 HABITACIÓN
        Habitacion habitacionSeleccionada = habitacionService.buscarPorId(habitacionId);
        model.addAttribute("habitacion", habitacionSeleccionada);

        // 🔥 PRECIO
        double precioHabitacion = habitacionSeleccionada.getPrecioPorNoche();
        double total = (precioHabitacion * noches) + presupuestoTransporte;

        model.addAttribute("noches", noches);
        model.addAttribute("precioTransporte", presupuestoTransporte);
        model.addAttribute("precioTotal", total);

        // 💾 GUARDAR
        Reserva reserva = new Reserva();
        reserva.setTransporte(TransporteTipo.valueOf(transporte));
        reserva.setHabitacion(habitacionSeleccionada);

        reservaService.guardar(reserva);

        return "viajes/confirmacion";
    }
    @GetMapping("/api/habitaciones/{hotelNombre}")
    @ResponseBody
    public List<Habitacion> obtenerHabitacionesPorHotel(@PathVariable String hotelNombre) {

        return habitacionService.buscarPorHotelNombre(hotelNombre);
    }
    @GetMapping("/reservar/{destino}")
    public String reservarDirecto(@PathVariable String destino, Model model) {

        // 🔥 INFO BÁSICA (puedes mejorar luego)
        model.addAttribute("destino", destino);
        model.addAttribute("descripcion", "Destino seleccionado manualmente");
        model.addAttribute("precio", "--");

        // 🔥 IMÁGENES
        model.addAttribute("imagen", unsplashService.obtenerImagen(destino + " city skyline"));
        model.addAttribute("imgHotel", unsplashService.obtenerImagen(destino + " hotel"));
        model.addAttribute("imgHabitacion", unsplashService.obtenerImagen("hotel room"));

        // 🔥 HABITACIONES REALES
        List<Habitacion> habitaciones = habitacionService.buscarPorDestino(destino);

        Map<String, List<Habitacion>> habitacionesPorHotel = new HashMap<>();

        for (Habitacion h : habitaciones) {

            if (h.getAlojamiento() == null) continue;

            // 🔥 MISMO BLOQUE QUE EN /recomendar
            String imagen;

            if (h.getTipo().equalsIgnoreCase("Suite")) {
                imagen = "https://images.unsplash.com/photo-1566665797739-1674de7a421a";
            } else if (h.getTipo().equalsIgnoreCase("Individual")) {
                imagen = "https://images.unsplash.com/photo-1618773928121-c32242e63f39";
            } else {
                imagen = "https://images.unsplash.com/photo-1590490360182-c33d57733427";
            }

            h.setImagenUrl(imagen); // 💥 ESTO ES LO QUE TE FALTA

            String nombreHotel = h.getAlojamiento().getNombre();

            habitacionesPorHotel
                    .computeIfAbsent(nombreHotel, k -> new ArrayList<>())
                    .add(h);
        }

        model.addAttribute("habitacionesPorHotel", habitacionesPorHotel);

        return "viajes/resultado"; // 🔥 reutilizas tu vista buena
    }
}
