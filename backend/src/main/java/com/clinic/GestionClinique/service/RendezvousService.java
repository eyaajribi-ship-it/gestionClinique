package com.clinic.GestionClinique.service;

import com.clinic.GestionClinique.model.Rendezvous;
import com.clinic.GestionClinique.repository.RendezvousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RendezvousService {

    @Autowired
    private RendezvousRepository rendezVousRepository;

    public List<Rendezvous> findAll() {
        return rendezVousRepository.findAll();
    }

    public Rendezvous findById(Long id) {
        return rendezVousRepository.findById(id).orElse(null);
    }

    public Rendezvous save(Rendezvous rendezVous) {
        return rendezVousRepository.save(rendezVous);
    }

    public void deleteById(Long id) {
        rendezVousRepository.deleteById(id);
    }
}
