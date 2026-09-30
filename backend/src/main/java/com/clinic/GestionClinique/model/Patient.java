package com.clinic.GestionClinique.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String telephone;

    @ManyToOne
    @JoinColumn(name = "clinique_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Clinique clinique;

    @ManyToMany(mappedBy = "patients")
    @JsonIgnore
    private List<Medecin> medecins;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public Clinique getClinique() { return clinique; }
    public void setClinique(Clinique clinique) { this.clinique = clinique; }

    public List<Medecin> getMedecins() { return medecins; }
    public void setMedecins(List<Medecin> medecins) { this.medecins = medecins; }
}
