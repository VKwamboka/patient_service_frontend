import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:3005/api/appointments'; 

export interface Appointment {
  // id: string;
  patientId: string;
  doctorId: string;
  appointmentStartDate: string;
  appointmentEndDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {
    
  }

  createAppointment(data: Appointment): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${API_BASE}/create`, data, { headers });
  }

  getAppointments(params?: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${API_BASE}`, { params, headers });
  }

  getAppointmentById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${API_BASE}/${id}`, { headers });
  }

  updateAppointment(id: string, data: Partial<Appointment>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`${API_BASE}/${id}`, data, { headers });
  }

  deleteAppointment(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${API_BASE}/${id}`, { headers });
  }
}
