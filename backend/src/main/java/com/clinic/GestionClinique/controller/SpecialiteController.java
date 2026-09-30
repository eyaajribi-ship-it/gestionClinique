package com.clinic.GestionClinique.controller;

import com.clinic.GestionClinique.model.Specialite;
import com.clinic.GestionClinique.service.SpecialiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/specialites")
@CrossOrigin(origins = "http://localhost:4200")
public class SpecialiteController {

    @Autowired
    private SpecialiteService specialiteService;

    @GetMapping
    public List<Specialite> findAll() {
        List<Specialite> liste = specialiteService.findAll();
        System.out.println("Nombre de spécialités récupérées : " + (liste != null ? liste.size() : "NULL"));
        if (liste != null && !liste.isEmpty()) {
            System.out.println("Première spécialité : " + liste.get(0).getNom());
        }
        return liste;
    }

    @GetMapping("/{id}")
    public Specialite findById(@PathVariable Long id) {
        return specialiteService.findById(id);
    }

    @PostMapping
    public Specialite save(@RequestBody Specialite specialite) {
        return specialiteService.save(specialite);
    }

    @PutMapping("/{id}")
    public Specialite update(@PathVariable Long id, @RequestBody Specialite specialite) {
        specialite.setId(id);
        return specialiteService.save(specialite);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        specialiteService.deleteById(id);
    }
}