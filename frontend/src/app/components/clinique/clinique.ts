import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Clinique, CliniqueService } from '../../services/clinique';

@Component({
  selector: 'app-clinique',
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
  ],
  templateUrl: './clinique.html',
  styleUrl: './clinique.css',
})
export class CliniqueComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'actions'];
  cliniques: Clinique[] = [];
  newClinique: Clinique = { id: null, nom: '', adresse: '' };
  editMode = false;
  isSaving = false;
  errorMessage = '';

  constructor(private cliniqueService: CliniqueService) {}

  ngOnInit() {
    this.loadCliniques();
  }

  loadCliniques() {
    this.cliniqueService.getAll().subscribe({
      next: (data) => {
        this.cliniques = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = this.getHttpErrorMessage(err, 'Impossible de charger les cliniques.');
        console.error('Erreur lors du chargement des cliniques:', err);
      },
    });
  }

  save() {
    const nom = this.newClinique.nom.trim();
    const adresse = this.newClinique.adresse.trim();

    if (!nom || !adresse || this.isSaving) return;

    this.isSaving = true;
    this.errorMessage = '';
    const request = { nom, adresse };

    if (this.editMode) {
      const id = Number(this.newClinique.id);
      this.cliniqueService.update(id, { id, ...request }).subscribe({
        next: () => {
          this.reset();
          this.loadCliniques();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, 'La modification a echoue.');
          console.error(err);
        },
      });
    } else {
      this.cliniqueService.create(request).subscribe({
        next: () => {
          this.reset();
          this.loadCliniques();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, "L'ajout a echoue.");
          console.error(err);
        },
      });
    }
  }

  edit(clinique: Clinique) {
    this.newClinique = { ...clinique };
    this.editMode = true;
    this.errorMessage = '';
  }

  delete(id: number | null | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer cette clinique ?')) {
      this.cliniqueService.delete(id).subscribe({
        next: () => this.loadCliniques(),
        error: (err) => {
          this.errorMessage = this.getHttpErrorMessage(err, 'La suppression a echoue.');
          console.error(err);
        },
      });
    }
  }

  reset() {
    this.newClinique = { id: null, nom: '', adresse: '' };
    this.editMode = false;
    this.isSaving = false;
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
