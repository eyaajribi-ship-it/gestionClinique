import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const userData = { username: this.username, password: this.password };
    this.authService.login(userData).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed! Check your credentials.';
      }
    });
  }
}