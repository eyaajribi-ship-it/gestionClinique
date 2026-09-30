package com.clinic.GestionClinique.controller;

import com.clinic.GestionClinique.model.Clinique;
import com.clinic.GestionClinique.service.CliniqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cliniques")
public class CliniqueController {

    @Autowired
    private CliniqueService cliniqueService;

    @GetMapping
    public List<Clinique> findAll() {
        return cliniqueService.findAll();
    }

    @GetMapping("/{id}")
    public Clinique findById(@PathVariable Long id) {
        return cliniqueService.findById(id);
    }

    @PostMapping
    public Clinique save(@RequestBody Clinique clinique) {
        return cliniqueService.save(clinique);
    }

    @PutMapping("/{id}")
    public Clinique update(@PathVariable Long id, @RequestBody Clinique clinique) {
        clinique.setId(id);
        return cliniqueService.save(clinique);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        cliniqueService.deleteById(id);
    }
}
