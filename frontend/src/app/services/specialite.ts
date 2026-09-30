import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Specialite {
  id?: number | null;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private apiUrl = 'http://localhost:8082/specialites';

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

  getAll(): Observable<Specialite[]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.getAuthHeaders(), observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          console.log('GET /specialites status:', response.status, 'body:', response.body);
        }),
        map((response: HttpResponse<any>) => this.extractList(response.body))
      );
  }

  create(specialite: Specialite): Observable<void> {
    return this.http
      .post(this.apiUrl, specialite, {
        headers: this.getJsonHeaders(),
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        tap((response: HttpResponse<string>) => {
          console.log('POST /specialites status:', response.status, 'body:', response.body);
        }),
        map(() => void 0)
      );
  }

  update(id: number, specialite: Specialite): Observable<void> {
    return this.http
      .put(`${this.apiUrl}/${id}`, specialite, {
        headers: this.getJsonHeaders(),
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        tap((response: HttpResponse<string>) => {
          console.log('PUT /specialites/' + id + ' status:', response.status, 'body:', response.body);
        }),
        map(() => void 0)
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response',
      responseType: 'text'
    }).pipe(map(() => void 0));
  }

  private extractList(body: any): Specialite[] {
    if (Array.isArray(body)) {
      return body;
    }

    if (Array.isArray(body?.content)) {
      return body.content;
    }

    if (Array.isArray(body?.body)) {
      return body.body;
    }

    return [];
  }
}
