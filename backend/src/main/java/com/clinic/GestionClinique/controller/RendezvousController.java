package com.clinic.GestionClinique.controller;

import com.clinic.GestionClinique.model.Rendezvous;
import com.clinic.GestionClinique.service.RendezvousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rendezvous")
public class RendezvousController {

    @Autowired
    private RendezvousService rendezvousService;

    @GetMapping
    public List<Rendezvous> findAll() {
        return rendezvousService.findAll();
    }

    @GetMapping("/{id}")
    public Rendezvous findById(@PathVariable Long id) {
        return rendezvousService.findById(id);
    }

    @PostMapping
    public Rendezvous save(@RequestBody Rendezvous rendezVous) {
        return rendezvousService.save(rendezVous);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        rendezvousService.deleteById(id);
    }
}
