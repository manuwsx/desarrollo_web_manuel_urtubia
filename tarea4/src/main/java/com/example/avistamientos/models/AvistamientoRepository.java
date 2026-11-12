package com.example.avistamientos.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvistamientoRepository extends JpaRepository<Avistamiento, Integer> {

    // trae todos los avistamientos desde el mas reciente al mas antiguo
    List<Avistamiento> findAllByOrderByFechaHoraDesc();
}