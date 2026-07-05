package com.url.shortener.controller;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.service.UrlMappingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class RedirectController {

    @Value("${frontend.url}")
    private String frontendUrl;

    private final UrlMappingService urlMappingService;

    public RedirectController(UrlMappingService urlMappingService) {
        this.urlMappingService = urlMappingService;
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl, HttpServletRequest request){
        try {
            UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl, request);
            if (urlMapping != null) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Location", urlMapping.getOriginalUrl());
                return ResponseEntity.status(302).headers(httpHeaders).build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (RuntimeException e) {
            if ("LINK_EXPIRED".equals(e.getMessage())) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Location", frontendUrl + "error?reason=expired");
                return ResponseEntity.status(302).headers(httpHeaders).build();
            }
            throw e;
        }
    }
}
