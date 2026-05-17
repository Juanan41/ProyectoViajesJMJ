
package com.viajes.app.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class UnsplashService {

    @Value("${unsplash.access.key}")
    private String accessKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public UnsplashService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String obtenerImagen(String query) {
        if (accessKey == null || accessKey.equals("TU_CLAVE_LOCAL") || accessKey.isEmpty()) {
            return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05q=80&w=800";
        }

        String url = "https://api.unsplash.com/search/photospage=1&query=" + query + "&client_id=" + accessKey;

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode results = root.path("results");

            if (results.isArray() && results.size() > 0) {
                return results.get(0).path("urls").path("regular").asText();
            }
        } catch (Exception e) {
            System.out.println("Aviso: No se pudo obtener foto de Unsplash para '" + query + "'. Se usará foto por defecto.");
        }

        return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05q=80&w=800";
    }
}
