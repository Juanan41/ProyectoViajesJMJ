// ProyectoViajesJMJ - com/viajes/app/ViajesApplication.java
// Responsabilidad: pieza de soporte usada por la aplicacion ProyectoViajesJMJ.
// Nota profesional: Modulo de soporte del proyecto; revisar dependencias antes de cambiar su contrato publico.

package com.viajes.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
/**
 * Documento profesional: clase principal del archivo.
 * Modulo de soporte del proyecto; revisar dependencias antes de cambiar su contrato publico.
 */

@SpringBootApplication(scanBasePackages = "com.viajes.app")
public class ViajesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ViajesApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

  
