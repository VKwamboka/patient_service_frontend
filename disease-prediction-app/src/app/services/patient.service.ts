import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PatientProfile {
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    profilePicture: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {}

//   getPatientById(userId: string) {
//   return this.http.get<PatientProfile>(`http://localhost:3005/api/users/${userId}`);
// }
getPatientById() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<any>(`http://localhost:3005/api/profile/me`, { headers });
}


  updatePatientProfile( profileData: any) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`http://localhost:3005/api/profile/me`, profileData, { headers });
  }
}
