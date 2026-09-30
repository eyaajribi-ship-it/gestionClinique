import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CliniqueInfoComponent } from '../clinique-info/clinique-info';
import { Specialite, SpecialiteService } from '../../services/specialite';

@Component({
  selector: 'app-specialite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    CliniqueInfoComponent,
  ],
  templateUrl: './specialite.html',
  styleUrl: './specialite.css',
})
export class SpecialiteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  specialites: Specialite[] = [];
  newSpecialite: Specialite = { id: null, nom: '' };
  editMode = false;
  isSaving = false;
  errorMessage = '';

  constructor(private specialiteService: SpecialiteService) {}

  ngOnInit() {
    this.loadSpecialites();
  }

  loadSpecialites() {
    this.specialiteService.getAll().subscribe({
      next: (data) => {
        this.specialites = data;
        this.errorMessage = '';
        console.log('TABLEAU ASSIGNE A ANGULAR MATERIAL :', this.specialites);
      },
      error: (err) => {
        this.errorMessage = this.getHttpErrorMessage(
          err,
          'Impossible de charger les specialites.'
        );
        console.error('Erreur lors du chargement :', err);
      },
    });
  }

  save() {
    const nom = this.newSpecialite.nom.trim();
    if (!nom || this.isSaving) return;

    this.isSaving = true;
    this.errorMessage = '';
    const request = { nom };

    if (this.editMode) {
      const id = Number(this.newSpecialite.id);
      this.specialiteService.update(id, { id, ...request }).subscribe({
        next: () => {
          this.reset();
          this.loadSpecialites();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, 'La modification a echoue.');
          console.error(err);
        },
      });
    } else {
      this.specialiteService.create(request).subscribe({
        next: () => {
          this.reset();
          this.loadSpecialites();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = this.getHttpErrorMessage(err, "L'ajout a echoue.");
          console.error(err);
        },
      });
    }
  }

  edit(s: Specialite) {
    this.newSpecialite = { ...s };
    this.editMode = true;
    this.errorMessage = '';
  }

  delete(id: number | null | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer cette specialite ?')) {
      this.specialiteService.delete(id).subscribe({
        next: () => {
          this.loadSpecialites();
        },
        error: (err) => {
          this.errorMessage = this.getHttpErrorMessage(err, 'La suppression a echoue.');
          console.error(err);
        },
      });
    }
  }

  reset() {
    this.newSpecialite = { id: null, nom: '' };
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
