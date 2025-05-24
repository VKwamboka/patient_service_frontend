import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
 profile: any = {
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: ''
  };

  successMessage = '';

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadProfile();
  }


  loadProfile() {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  this.patientService.getPatientById(userId).subscribe({
    next: (res) => {
      console.log('Profile API response:', res);
      console.log("hi")
      if (res.profile) {
        this.profile = {
          firstName: res.profile.firstName || '',
          lastName: res.profile.lastName || '',
          username: res.profile.username || '',
          phoneNumber: res.profile.phoneNumber || '',
          email: res.email || ''
        };
      }
    },
    error: (err) => {
      console.error('Failed to load profile:', err);
    }
  });
}


  onSubmit() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const updatedData: any = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      username: this.profile.username
    };

  
    if (this.profile.profilePicture && this.profile.profilePicture.startsWith('http')) {
      updatedData.profilePicture = this.profile.profilePicture;
    }

    this.patientService.updatePatientProfile(userId, updatedData).subscribe({
      next: () => {
        this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 3000, 
        panelClass: ['snackbar-success']
    });
      },
      error: (err) => {
         this.snackBar.open(' Update failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }



}
