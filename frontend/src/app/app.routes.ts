import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Register} from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CliniqueComponent } from './components/clinique/clinique';
import { MedecinComponent } from './components/medecin/medecin';
import { PatientComponent } from './components/patient/patient';
import { Rendezvous} from './components/rendezvous/rendezvous';
import { SpecialiteComponent } from './components/specialite/specialite';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cliniques', component: CliniqueComponent },
  { path: 'medecins', component: MedecinComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'rendezvous', component: Rendezvous},
  { path: 'specialites', component: SpecialiteComponent },
];
