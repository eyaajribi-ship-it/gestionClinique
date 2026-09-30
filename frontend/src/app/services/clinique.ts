import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Clinique {
  id?: number | null;
  nom: string;
  adresse: string;
}

@Injectable({
  providedIn: 'root',
})
export class CliniqueService {
  private apiUrl = 'http://localhost:8082/cliniques';
  private selectedCliniqueSubject = new BehaviorSubject<Clinique | null>(null);
  selectedClinique$ = this.selectedCliniqueSubject.asObservable();

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

  getAll(): Observable<Clinique[]> {
    return this.http
      .get<Clinique[]>(this.apiUrl, { headers: this.getAuthHeaders(), observe: 'response' })
      .pipe(
        tap((response: HttpResponse<Clinique[]>) => {
          console.log('GET /cliniques status:', response.status, 'body:', response.body);
          this.ensureSelectedClinique(response.body ?? []);
        }),
        map((response: HttpResponse<Clinique[]>) => response.body ?? [])
      );
  }

  setSelectedClinique(clinique: Clinique | null) {
    if (clinique?.id) {
      localStorage.setItem('selectedCliniqueId', String(clinique.id));
    } else {
      localStorage.removeItem('selectedCliniqueId');
    }

    this.selectedCliniqueSubject.next(clinique);
  }

  getSelectedClinique(): Clinique | null {
    return this.selectedCliniqueSubject.value;
  }

  create(clinique: Clinique): Observable<void> {
    return this.http
      .post(this.apiUrl, clinique, {
        headers: this.getJsonHeaders(),
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map(() => void 0));
  }

  update(id: number, clinique: Clinique): Observable<void> {
    return this.http
      .put(`${this.apiUrl}/${id}`, clinique, {
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

  private ensureSelectedClinique(cliniques: Clinique[]) {
    if (!cliniques.length || this.selectedCliniqueSubject.value) return;

    const savedId = Number(localStorage.getItem('selectedCliniqueId'));
    const savedClinique = cliniques.find((clinique) => clinique.id === savedId);
    this.selectedCliniqueSubject.next(savedClinique ?? cliniques[0]);
  }
}
