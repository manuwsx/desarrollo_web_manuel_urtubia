package com.example.avistamientos.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {

    // todas las notas de un avistamiento
    List<Nota> findByAvistamientoId(Integer avistamientoId);
}