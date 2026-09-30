package com.clinic.GestionClinique.repository;

import com.clinic.GestionClinique.model.Clinique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CliniqueRepository extends JpaRepository<Clinique, Long> {
}