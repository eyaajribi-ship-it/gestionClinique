import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Clinique, CliniqueService } from '../../services/clinique';

@Component({
  selector: 'app-clinique-info',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './clinique-info.html',
  styleUrl: './clinique-info.css',
})
export class CliniqueInfoComponent implements OnInit {
  cliniques: Clinique[] = [];
  clinique: Clinique | null = null;

  constructor(private cliniqueService: CliniqueService) {}

  ngOnInit() {
    this.cliniqueService.getAll().subscribe({
      next: (cliniques) => {
        this.cliniques = cliniques;
        this.clinique = this.cliniqueService.getSelectedClinique();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la clinique:', err);
      },
    });

    this.cliniqueService.selectedClinique$.subscribe((clinique) => {
      this.clinique = clinique;
    });
  }

  changeClinique(clinique: Clinique | null) {
    this.cliniqueService.setSelectedClinique(clinique);
  }

  compareCliniques(c1: Clinique | null, c2: Clinique | null): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
