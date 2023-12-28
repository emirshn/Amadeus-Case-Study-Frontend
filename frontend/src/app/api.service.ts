// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFlights(): Observable<any> {
    const apiUrl = 'http://127.0.0.1:8000/flights';
    return this.http.get<any>(apiUrl);
  }
}
