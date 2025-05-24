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
getPatientById(userId: string) {
  return this.http.get<any>(`http://localhost:3005/api/users/${userId}`);
}


  updatePatientProfile(userId: string, profileData: any) {
    return this.http.patch(`http://localhost:3005/api/profile/${userId}`, profileData);
  }
}
