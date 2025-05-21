import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface SignupPayload {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    isPatient: boolean;
    isDoctor: boolean;
    profilePicture?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3005/api/users'; 

  constructor(private http: HttpClient) {}

  signup(payload: SignupPayload) {
    return this.http.post(`${this.BASE_URL}/signup`, payload).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string) {
    return this.http.post(`${this.BASE_URL}/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
  let message = 'An unexpected error occurred.';

  if (error.status === 0) {
    message = 'Network error. Please check your connection.';
  } else if (error.error?.message) {
    message = error.error.message; // like "Invalid credentials"
  }

  return throwError(() => new Error(message));
}

}
