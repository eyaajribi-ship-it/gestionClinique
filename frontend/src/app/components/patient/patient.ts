import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CliniqueInfoComponent } from '../clinique-info/clinique-info';
import { Patient, PatientService } from '../../services/patient';
import { Clinique, CliniqueService } from '../../services/clinique';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    RouterLink,
    CliniqueInfoComponent,
  ],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class PatientComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'telephone', 'actions'];
  allPatients: Patient[] = [];
  patients: Patient[] = [];
  selectedClinique: Clinique | null = null;
  newPatient: Patient = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    clinique: null,
  };
  editMode = false;
  isSaving = false;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private cliniqueService: CliniqueService
  ) {}

  ngOnInit() {
    this.cliniqueService.selectedClinique$.subscribe((clinique) => {
      this.selectedClinique = clinique;
      this.newPatient.clinique = clinique;
      this.applyCliniqueFilter();
    });

    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
      next: (data) => {
        this.allPatients = data;
        this.applyCliniqueFilter();
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = this.getHttpErrorMessage(err, 'Impossible de charger les patients.');
        console.error('Erreur lors du chargement des patients:', err);
      },
    });
  }

  save() {
    const nom = this.newPatient.nom.trim();
    const prenom = this.newPatient.prenom.trim();
    const email = this.newPatient.email.trim();
    const telephone = this.newPatient.telephone.trim();
    const clinique = this.selectedClinique;

    if (!nom || !prenom || !email || !telephone || !clinique || this.isSaving) return;

    this.isSaving = true;
    this.errorMessage = '';
    const request = { nom, prenom, email, telephone, clinique: { id: clinique.id } };

    if (this.editMode) {
      const id = Number(this.newPatient.id);
      this.patientService.update(id, { id, ...request }).subscribe({
        next: () => {
          this.reset();
          this.loadPatients();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, 'La modification a echoue.');
          console.error(err);
        },
      });
    } else {
      this.patientService.create(request).subscribe({
        next: () => {
          this.reset();
          this.loadPatients();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, "L'ajout a echoue.");
          console.error(err);
        },
      });
    }
  }

  edit(patient: Patient) {
    this.newPatient = { ...patient };
    this.editMode = true;
    this.errorMessage = '';
  }

  delete(id: number | null | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer ce patient ?')) {
      this.patientService.delete(id).subscribe({
        next: () => this.loadPatients(),
        error: (err) => {
          this.errorMessage = this.getHttpErrorMessage(err, 'La suppression a echoue.');
          console.error(err);
        },
      });
    }
  }

  reset() {
    this.newPatient = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      clinique: this.selectedClinique,
    };
    this.editMode = false;
    this.isSaving = false;
  }

  private applyCliniqueFilter() {
    if (!this.selectedClinique?.id) {
      this.patients = this.allPatients;
      return;
    }

    this.patients = this.allPatients.filter(
      (patient) => patient.clinique?.id === this.selectedClinique?.id
    );
  }

  private getHttpErrorMessage(err: any, fallback: string): string {
    if (err?.status === 0) {
      return 'Backend inaccessible. Verifie que Spring Boot tourne sur http://localhost:8082.';
    }

    if (err?.status === 401 || err?.status === 403) {
      return 'Session expiree ou non autorisee. Reconnecte-toi puis reessaie.';
    }

    return fallback;
  }
}
