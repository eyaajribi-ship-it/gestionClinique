package com.clinic.GestionClinique.controller;

import com.clinic.GestionClinique.model.Medecin;
import com.clinic.GestionClinique.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/medecins")
@CrossOrigin(origins = "http://localhost:4200")
public class MedecinController {

    @Autowired
    private MedecinService medecinService;

    @GetMapping
    public List<Medecin> findAll() {
        return medecinService.findAll();
    }

    @GetMapping("/{id}")
    public Medecin findById(@PathVariable Long id) {
        return medecinService.findById(id);
    }

    @PostMapping
    public Medecin save(@RequestBody Medecin medecin) {
        return medecinService.save(medecin);
    }

    @PutMapping("/{id}")
    public Medecin update(@PathVariable Long id, @RequestBody Medecin medecin) {
        medecin.setId(id); 
        return medecinService.save(medecin); 
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        medecinService.deleteById(id);
    }
}