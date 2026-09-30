import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Clinique } from './clinique';

export interface Patient {
  id?: number | null;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  clinique?: Partial<Clinique> | null;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:8082/patients';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private getJsonHeaders() {
    return this.getAuthHeaders().set('Content-Type', 'application/json');
  }

  getAll(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(this.apiUrl, { headers: this.getAuthHeaders(), observe: 'response' })
      .pipe(
        tap((response: HttpResponse<Patient[]>) => {
          console.log('GET /patients status:', response.status, 'body:', response.body);
        }),
        map((response: HttpResponse<Patient[]>) => response.body ?? [])
      );
  }

  create(patient: Patient): Observable<void> {
    return this.http
      .post(this.apiUrl, patient, {
        headers: this.getJsonHeaders(),
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map(() => void 0));
  }

  update(id: number, patient: Patient): Observable<void> {
    return this.http
      .put(`${this.apiUrl}/${id}`, patient, {
        headers: this.getJsonHeaders(),
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map(() => void 0));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders(),
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map(() => void 0));
  }
}
