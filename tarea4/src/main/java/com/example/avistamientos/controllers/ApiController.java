package com.example.avistamientos.controllers;

import com.example.avistamientos.services.ApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/get-avistamientos")
    public Map<String, List<Map<String, Object>>> getAvistamientosEndpoint(@RequestParam(value = "texto", defaultValue = "") String texto) {
        List<Map<String, Object>> avistamientos = apiService.buscarAvistamientos(texto);
        return Map.of("data", avistamientos);
    }

    @PostMapping("/post-nota/{avistamiento_id}")
    public Map<String, Object> postNotaEndpoint(@PathVariable("avistamiento_id") Integer avistamientoId,
                                                @RequestParam(value = "nota", required = false) String nota) {
        try {
            Double promedio = apiService.agregarNota(avistamientoId, nota);
            return Map.of("success", true, "promedio", promedio);
        } catch (IllegalArgumentException e) {
            return Map.of("success", false, "error", e.getMessage());
        }
    }
}