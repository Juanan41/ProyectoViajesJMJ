package com.viajes.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.viajes.app")
public class ViajesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ViajesApplication.class, args);
    }
}


