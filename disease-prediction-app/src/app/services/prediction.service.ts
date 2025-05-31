// src/app/services/prediction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './doctors.service';
export interface Disease {
  name: string;
  probability: number;
  specialistsNeeded: string[];
  doctors: Doctor[];
}

export interface PredictionResponse {
  diseases: Disease[];
}


// export interface PredictionResponse {
//   predictions: string[];  
// }

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://localhost:3005/api/predict'; 

  constructor(private http: HttpClient) {}

  getPrediction(symptoms: string[]): Observable<PredictionResponse> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<PredictionResponse>(this.apiUrl, { symptoms }, { headers });
  }
}
