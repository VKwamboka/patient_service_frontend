import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, MatSnackBarModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
profile = {
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    profilePicture: ''
  };

  editMode = false;

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.patientService.getPatientById().subscribe({
      next: (res) => {
        console.log(res)
        this.profile = {
          firstName: res.firstName,
          lastName: res.lastName,
          username: res.username,
          phoneNumber: res.phoneNumber,
          email: localStorage.getItem('userEmail') || '',
          profilePicture: res.profilePicture
        };
      },
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  toggleEdit() {
    if (this.editMode) {
      this.saveProfile();
    }
    this.editMode = !this.editMode;
  }

  saveProfile() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const updatedData: any = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      username: this.profile.username,
      phoneNumber: this.profile.phoneNumber
    };

    if (this.profile.profilePicture?.startsWith('http')) {
      updatedData.profilePicture = this.profile.profilePicture;
    }

    this.patientService.updatePatientProfile(updatedData).subscribe({
      next: () => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
      },
      error: () => {
        this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }


}
