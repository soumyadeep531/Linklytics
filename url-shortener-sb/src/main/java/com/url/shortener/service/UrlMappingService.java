package com.url.shortener.service;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UrlMappingService {

    private final UrlMappingRepository urlMappingRepository;
    private final ClickEventRepository clickEventRepository;
    private final GeoLocationService geoLocationService;

    public UrlMappingService(UrlMappingRepository urlMappingRepository, ClickEventRepository clickEventRepository, GeoLocationService geoLocationService) {
        this.urlMappingRepository = urlMappingRepository;
        this.clickEventRepository = clickEventRepository;
        this.geoLocationService = geoLocationService;
    }

    public UrlMappingDTO createShortUrl(UrlMappingDTO dto, User user) {
        String shortUrl;
        if (dto.getCustomAlias() != null && !dto.getCustomAlias().trim().isEmpty()) {
            if (urlMappingRepository.existsByShortUrl(dto.getCustomAlias())) {
                throw new RuntimeException("Alias is already taken");
            }
            shortUrl = dto.getCustomAlias();
        } else {
            shortUrl = generateShortUrl();
        }
        
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(dto.getOriginalUrl());
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setExpiresAt(dto.getExpiresAt());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        urlMappingDTO.setExpiresAt(urlMapping.getExpiresAt());
        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .map(click -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(click.getClickDate());
                        clickEventDTO.setCountry(click.getCountry());
                        clickEventDTO.setCity(click.getCity());
                        clickEventDTO.setDeviceType(click.getDeviceType());
                        clickEventDTO.setBrowser(click.getBrowser());
                        clickEventDTO.setReferer(click.getReferer());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));

    }

    public UrlMapping getOriginalUrl(String shortUrl, HttpServletRequest request) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            if (urlMapping.getExpiresAt() != null && LocalDateTime.now().isAfter(urlMapping.getExpiresAt())) {
                throw new RuntimeException("LINK_EXPIRED");
            }
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            
            String ip = request.getHeader("X-Forwarded-For");
            if (ip == null || ip.isEmpty()) ip = request.getRemoteAddr();
            
            Map<String, String> location = geoLocationService.getLocation(ip);
            clickEvent.setCountry(location.getOrDefault("country", "Unknown"));
            clickEvent.setCity(location.getOrDefault("city", "Unknown"));
            
            String userAgent = request.getHeader("User-Agent");
            if (userAgent != null) {
                userAgent = userAgent.toLowerCase();
                if (userAgent.contains("mobile") || userAgent.contains("android") || userAgent.contains("iphone")) {
                    clickEvent.setDeviceType("Mobile");
                } else {
                    clickEvent.setDeviceType("Desktop");
                }
                
                if (userAgent.contains("chrome")) clickEvent.setBrowser("Chrome");
                else if (userAgent.contains("firefox")) clickEvent.setBrowser("Firefox");
                else if (userAgent.contains("safari")) clickEvent.setBrowser("Safari");
                else if (userAgent.contains("edge")) clickEvent.setBrowser("Edge");
                else clickEvent.setBrowser("Unknown");
            } else {
                clickEvent.setDeviceType("Unknown");
                clickEvent.setBrowser("Unknown");
            }
            
            String referer = request.getHeader("Referer");
            if (referer == null || referer.isEmpty()) clickEvent.setReferer("Direct");
            else clickEvent.setReferer(referer);

            clickEventRepository.save(clickEvent);
        }

        return urlMapping;
    }

    public void deleteUrlMapping(Long id, User user) {
        UrlMapping mapping = urlMappingRepository.findById(id).orElse(null);
        if (mapping != null && mapping.getUser().getId().equals(user.getId())) {
            urlMappingRepository.delete(mapping);
        } else {
            throw new RuntimeException("Not found or not authorized");
        }
    }
}
