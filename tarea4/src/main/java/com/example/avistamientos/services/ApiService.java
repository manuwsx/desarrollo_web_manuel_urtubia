package com.example.avistamientos.services;

import com.example.avistamientos.models.Avistamiento;
import com.example.avistamientos.models.AvistamientoRepository;
import com.example.avistamientos.models.Nota;
import com.example.avistamientos.models.NotaRepository;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApiService {
    private final AvistamientoRepository avistamientoRepository;
    private final NotaRepository notaRepository;

    public ApiService(AvistamientoRepository avistamientoRepository, NotaRepository notaRepository) {
        this.avistamientoRepository = avistamientoRepository;
        this.notaRepository = notaRepository;
    }

    // busca avistamientos en los que el texto coincida con el nombre completo, username del usuario, nombre del ave o comuna donde fue vista
    public List<Map<String, Object>> buscarAvistamientos(String texto) {
        List<Map<String, Object>> resultados = new ArrayList<>();
        String busqueda = limpiar(texto.trim());
        if (busqueda.isEmpty()) {
            return resultados;
        }

        List<Avistamiento> avistamientos = avistamientoRepository.findAllByOrderByFechaHoraDesc();
        for (Avistamiento av : avistamientos) {
            String ave = av.getAve().getNombre();
            String nombre = av.getVoluntario().getNombreCompleto();
            String usuario = av.getVoluntario().getNombreUsuario();
            String comuna = av.getComuna().getNombre();

            if (limpiar(ave).contains(busqueda) || limpiar(nombre).contains(busqueda)
                    || limpiar(usuario).contains(busqueda) || limpiar(comuna).contains(busqueda)) {
                Map<String, Object> resultado = new HashMap<>();
                resultado.put("id", av.getId());
                resultado.put("voluntario", nombre);
                resultado.put("usuario", usuario);
                resultado.put("dia", av.getFechaHora().toLocalDate().toString());
                resultado.put("ave", ave);
                resultado.put("comuna", comuna);
                resultado.put("promedio", calcularPromedio(av.getId()));
                resultados.add(resultado);
            }
        }
        return resultados;
    }

    // valida la nota, si esta bien la guarda y devuelve el nuevo promedio del avistamiento (sino exception).
    public Double agregarNota(Integer avistamientoId, String nota) {
        int valor;
        try {
            valor = Integer.parseInt(nota);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("La nota debe ser un número entero entre 1 y 7.");
        }
        if (valor < 1 || valor > 7) {
            throw new IllegalArgumentException("La nota debe ser un número entero entre 1 y 7.");
        }
        if (!avistamientoRepository.existsById(avistamientoId)) {
            throw new IllegalArgumentException("El avistamiento no existe.");
        }

        notaRepository.save(new Nota(avistamientoId, valor));
        return calcularPromedio(avistamientoId);
    }

    // calcula el promedio de las notas de un avistamiento
    private Double calcularPromedio(Integer avistamientoId) {
        List<Nota> notas = notaRepository.findByAvistamientoId(avistamientoId);
        if (notas.isEmpty()) { //si no tiene notas, null
            return null;
        }
        int suma = 0;
        for (Nota n : notas) {
            suma += n.getNota();
        }
        return (double) suma / notas.size();
    }

    // pasa un texto a minusculas y le quita las tildes
    private String limpiar(String texto) {
        return Normalizer.normalize(texto, Normalizer.Form.NFD).replaceAll("\\p{M}", "").toLowerCase();
    }
}