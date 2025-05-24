import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface Doctor {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    isDoctor: boolean;
    profilePicture: string;
    specialization: string;
    phoneNumber: string;
  }
  ,
  
}
export interface PaginatedDoctorResponse {
    pagination: {
    total: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
  data: Doctor[];
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly baseUrl = 'http://localhost:3005/api/users';

  constructor(private http: HttpClient) {}

  getDoctors(page: number = 1, pageSize: number = 15): Observable<PaginatedDoctorResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<PaginatedDoctorResponse>(`${this.baseUrl}/doctors`, { params }).pipe(
      catchError(error => {
        console.error('Failed to fetch doctors:', error);
        return throwError(() => new Error('Failed to load doctor list.'));
      })
    );
  }
}
