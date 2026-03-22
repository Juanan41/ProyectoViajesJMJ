package com.viajes.app.api;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UnsplashService {

    @Value("${unsplash.access.key}")
    private String accessKey;

    private final String URL = "https://api.unsplash.com/search/photos?query=";

    public String obtenerImagen(String destino) {

        RestTemplate restTemplate = new RestTemplate();

        String urlCompleta = URL + destino + "&client_id=" + accessKey;

        String response = restTemplate.getForObject(urlCompleta, String.class);

        JSONObject json = new JSONObject(response);
        JSONArray results = json.getJSONArray("results");

        if (results.length() > 0) {
            JSONObject primera = results.getJSONObject(0);
            JSONObject urls = primera.getJSONObject("urls");
            return urls.getString("regular");
        }

        return "";
    }
}