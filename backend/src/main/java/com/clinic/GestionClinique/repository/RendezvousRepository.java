package com.clinic.GestionClinique.repository;

import com.clinic.GestionClinique.model.Rendezvous;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RendezvousRepository extends JpaRepository<Rendezvous, Long> {
}
