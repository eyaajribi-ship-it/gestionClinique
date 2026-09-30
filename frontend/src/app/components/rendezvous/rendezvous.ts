import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CliniqueInfoComponent } from '../clinique-info/clinique-info';
import { Clinique, CliniqueService } from '../../services/clinique';

interface RendezvousElement {
  id: number;
  date: string;
  heure: string;
  patient: { nom: string; prenom: string };
  medecin: { nom: string; prenom: string };
  cliniqueId: number;
}

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    CliniqueInfoComponent
  ],
  templateUrl: './rendezvous.html',
  styleUrl: './rendezvous.css',
})
export class Rendezvous implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'heure', 'patient', 'medecin', 'actions'];
  rendezvousList: RendezvousElement[] = [];
  filteredRendezvousList: RendezvousElement[] = [];
  selectedClinique: Clinique | null = null;

  newRendezvous: RendezvousElement = {
    id: 0,
    date: '',
    heure: '',
    patient: { nom: '', prenom: '' },
    medecin: { nom: '', prenom: '' },
    cliniqueId: 0,
  };

  constructor(private cliniqueService: CliniqueService) {}

  ngOnInit(): void {
    this.mockData();

    this.cliniqueService.selectedClinique$.subscribe((clinique) => {
      this.selectedClinique = clinique;
      this.applyCliniqueFilter();
    });
  }

  mockData(): void {
    this.rendezvousList = [
      {
        id: 1,
        date: '2026-05-20',
        heure: '10:30',
        patient: { nom: 'Salah', prenom: 'Amor' },
        medecin: { nom: 'Ben Ali', prenom: 'Ahmed' },
        cliniqueId: 1,
      },
      {
        id: 2,
        date: '2026-05-21',
        heure: '14:00',
        patient: { nom: 'Trabelsi', prenom: 'Sonia' },
        medecin: { nom: 'Mansouri', prenom: 'Yassin' },
        cliniqueId: 1,
      },
      {
        id: 3,
        date: '2026-05-22',
        heure: '09:00',
        patient: { nom: 'Kacem', prenom: 'Leila' },
        medecin: { nom: 'Fares', prenom: 'Nour' },
        cliniqueId: 2,
      },
      {
        id: 4,
        date: '2026-05-23',
        heure: '11:15',
        patient: { nom: 'Bensaid', prenom: 'Sara' },
        medecin: { nom: 'Rami', prenom: 'Meriem' },
        cliniqueId: 2,
      }
    ];

    this.applyCliniqueFilter();
  }

  private applyCliniqueFilter(): void {
    if (!this.selectedClinique?.id) {
      this.filteredRendezvousList = [];
      return;
    }

    this.filteredRendezvousList = this.rendezvousList.filter(
      (r) => r.cliniqueId === this.selectedClinique?.id
    );
  }

  addRendezvous(): void {
    if (!this.selectedClinique) {
      return;
    }

    const trimmedDate = this.newRendezvous.date.trim();
    const trimmedHeure = this.newRendezvous.heure.trim();
    const patientNom = this.newRendezvous.patient?.nom.trim();
    const patientPrenom = this.newRendezvous.patient?.prenom.trim();
    const medecinNom = this.newRendezvous.medecin?.nom.trim();
    const medecinPrenom = this.newRendezvous.medecin?.prenom.trim();

    if (!trimmedDate || !trimmedHeure || !patientNom || !patientPrenom || !medecinNom || !medecinPrenom) {
      return;
    }

    const newId = this.rendezvousList.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const cliniqueId = this.selectedClinique.id ?? 0;
    const rendezvousToAdd: RendezvousElement = {
      id: newId,
      date: trimmedDate,
      heure: trimmedHeure,
      patient: { nom: patientNom, prenom: patientPrenom },
      medecin: { nom: medecinNom, prenom: medecinPrenom },
      cliniqueId,
    };

    this.rendezvousList.push(rendezvousToAdd);
    this.applyCliniqueFilter();
    this.resetForm();
  }

  private resetForm(): void {
    this.newRendezvous = {
      id: 0,
      date: '',
      heure: '',
      patient: { nom: '', prenom: '' },
      medecin: { nom: '', prenom: '' },
      cliniqueId: 0,
    };
  }

  edit(rendezvous: RendezvousElement): void {
    console.log('Modifier le rendez-vous:', rendezvous);
  }

  deleteRendezvous(id: number): void {
    console.log('Supprimer le rendez-vous avec ID:', id);
    this.rendezvousList = this.rendezvousList.filter(r => r.id !== id);
  }
}