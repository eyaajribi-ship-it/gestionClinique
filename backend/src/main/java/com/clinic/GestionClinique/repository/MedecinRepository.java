package com.clinic.GestionClinique.repository;

import com.clinic.GestionClinique.model.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedecinRepository extends JpaRepository<Medecin, Long> {
}