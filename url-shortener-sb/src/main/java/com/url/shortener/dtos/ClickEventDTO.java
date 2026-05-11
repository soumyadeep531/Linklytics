package com.url.shortener.dtos;

import java.time.LocalDateTime;

public class ClickEventDTO {
    private LocalDateTime clickDate;
    private Long count;
    private String country;
    private String city;
    private String deviceType;
    private String browser;
    private String referer;

    public LocalDateTime getClickDate() {
        return clickDate;
    }

    public void setClickDate(LocalDateTime clickDate) {
        this.clickDate = clickDate;
    }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }

    public String getBrowser() { return browser; }
    public void setBrowser(String browser) { this.browser = browser; }

    public String getReferer() { return referer; }
    public void setReferer(String referer) { this.referer = referer; }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
