package com.url.shortener.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.HashMap;

@Service
public class GeoLocationService {
    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, String> getLocation(String ip) {
        Map<String, String> result = new HashMap<>();
        try {
            String url = "http://ip-api.com/json/" + ip + "?fields=country,city,status";
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null && "success".equals(response.get("status"))) {
                result.put("country", (String) response.get("country"));
                result.put("city", (String) response.get("city"));
            } else {
                result.put("country", "Unknown");
                result.put("city", "Unknown");
            }
        } catch (Exception e) {
            result.put("country", "Unknown");
            result.put("city", "Unknown");
        }
        return result;
    }
}
