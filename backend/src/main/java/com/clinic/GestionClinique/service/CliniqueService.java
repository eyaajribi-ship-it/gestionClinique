package com.clinic.GestionClinique.service;

import com.clinic.GestionClinique.model.Clinique;
import com.clinic.GestionClinique.repository.CliniqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CliniqueService {

    @Autowired
    private CliniqueRepository cliniqueRepository;

    public List<Clinique> findAll() {
        return cliniqueRepository.findAll();
    }

    public Clinique findById(Long id) {
        return cliniqueRepository.findById(id).orElse(null);
    }

    public Clinique save(Clinique clinique) {
        return cliniqueRepository.save(clinique);
    }

    public void deleteById(Long id) {
        cliniqueRepository.deleteById(id);
    }
}
