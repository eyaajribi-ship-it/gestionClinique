import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  user = {
    username: '',
    password: ''
  };

  message = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.message = "Succès : " + res;
        console.log("Réponse du serveur :", res);
      },

      error: (err: any) => {
        this.message = "Erreur de connexion au backend";
        console.error("Détail de l'erreur :", err);
      }
    });
  }

  onLogin() {
    console.log("Go to login page");
  }
}