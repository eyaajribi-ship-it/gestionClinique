package com.clinic.GestionClinique.repository;

import com.clinic.GestionClinique.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
