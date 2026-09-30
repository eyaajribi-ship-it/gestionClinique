import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CliniqueInfoComponent } from '../clinique-info/clinique-info';
import { Clinique, CliniqueService } from '../../services/clinique';

@Component({
  selector: 'app-medecin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    CliniqueInfoComponent,
  ],
  templateUrl: './medecin.html',
  styleUrl: './medecin.css',
})
export class MedecinComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'specialite', 'actions'];
  allMedecins: any[] = [];
  medecins: any[] = [];
  specialites: any[] = [];
  selectedClinique: Clinique | null = null;

  newMedecin: any = {
    id: null,
    nom: '',
    prenom: '',
    specialite: null,
    clinique: null,
  };

  editMode = false;

  private baseUrl = 'http://localhost:8082/medecins';
  private specUrl = 'http://localhost:8082/specialites';

  constructor(private http: HttpClient, private cliniqueService: CliniqueService) {}

  ngOnInit() {
    this.cliniqueService.selectedClinique$.subscribe((clinique) => {
      this.selectedClinique = clinique;
      this.newMedecin.clinique = clinique;
      this.applyCliniqueFilter();
    });

    this.loadMedecins();
    this.loadSpecialites();
  }

  loadMedecins() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.allMedecins = data ?? [];
        this.applyCliniqueFilter();
      },
      error: (err) => console.error(err),
    });
  }

  loadSpecialites() {
    this.http.get<any[]>(this.specUrl).subscribe({
      next: (data) => {
        this.specialites = data ?? [];
      },
      error: (err) => console.error('Erreur lors du chargement des specialites :', err),
    });
  }

  save() {
    if (
      !this.newMedecin.nom.trim() ||
      !this.newMedecin.prenom.trim() ||
      !this.newMedecin.specialite ||
      !this.selectedClinique
    ) {
      alert('Veuillez remplir tous les champs et choisir une clinique.');
      return;
    }

    const medecinToSave = {
      ...this.newMedecin,
      clinique: { id: this.selectedClinique.id },
    };

    if (this.editMode) {
      this.http.put(`${this.baseUrl}/${this.newMedecin.id}`, medecinToSave).subscribe({
        next: () => {
          this.reset();
          this.loadMedecins();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.http.post(this.baseUrl, medecinToSave).subscribe({
        next: () => {
          this.reset();
          this.loadMedecins();
        },
        error: (err) => console.error(err),
      });
    }
  }

  edit(medecin: any) {
    this.newMedecin = { ...medecin };
    this.editMode = true;
  }

  deleteMedecin(id: number) {
    if (confirm('Voulez-vous supprimer ce medecin ?')) {
      this.http.delete(`${this.baseUrl}/${id}`).subscribe({
        next: () => this.loadMedecins(),
        error: (err) => console.error(err),
      });
    }
  }

  reset() {
    this.newMedecin = {
      id: null,
      nom: '',
      prenom: '',
      specialite: null,
      clinique: this.selectedClinique,
    };
    this.editMode = false;
  }

  compareSpecialites(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  private applyCliniqueFilter() {
    if (!this.selectedClinique?.id) {
      this.medecins = this.allMedecins;
      return;
    }

    this.medecins = this.allMedecins.filter(
      (medecin) => medecin.clinique?.id === this.selectedClinique?.id
    );
  }
}
