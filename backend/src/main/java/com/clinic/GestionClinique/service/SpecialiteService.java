package com.clinic.GestionClinique.service;

import com.clinic.GestionClinique.model.Specialite;
import com.clinic.GestionClinique.repository.SpecialiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpecialiteService {

    @Autowired
    private SpecialiteRepository specialiteRepository;

    public List<Specialite> findAll() {
        return specialiteRepository.findAll();
    }

    public Specialite findById(Long id) {
        return specialiteRepository.findById(id).orElse(null);
    }

    public Specialite save(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    public void deleteById(Long id) {
        specialiteRepository.deleteById(id);
    }
}
