package com.clinic.GestionClinique.service;

import com.clinic.GestionClinique.model.Medecin;
import com.clinic.GestionClinique.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    public List<Medecin> findAll() {
        return medecinRepository.findAll();
    }

    public Medecin findById(Long id) {
        return medecinRepository.findById(id).orElse(null);
    }

    public Medecin save(Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    public void deleteById(Long id) {
        medecinRepository.deleteById(id);
    }
}
