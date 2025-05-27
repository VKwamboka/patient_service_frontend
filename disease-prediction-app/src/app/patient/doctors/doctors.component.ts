import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../../services/doctors.service';
import { DoctorService } from '../../services/doctors.service';


// interface Doctor {
//   id: number;
//   name: string;
//   specialty: string;
//   email: string;
//   phone: string;
// }

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,FormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  currentPage = 1;
  totalPages = 1; 

  constructor(private router: Router, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }
  fetchDoctors(page: number = 1) {
    this.doctorService.getDoctors(page).subscribe({
      next: (res) => {
        this.doctors = res.data;
        this.filteredDoctors = this.doctors;
        this.currentPage = res.pagination.currentPage;
        this.totalPages = res.pagination.totalPages;
        console.log(this.doctors);
      },
      error: (err) => {
        console.error(err.message);
      }
    });
    
  }
  
  selectedDoctorId: number | null = null;
  selectedTime: string = '';
  successMessage = '';

  // doctors: Doctor[] = [
  //   {
  //     id: 1,
  //     name: 'Dr. Jane Doe',
  //     specialty: 'Cardiologist',
  //     email: 'jane@example.com',
  //     phone: '+1234567890',
  //   },
  //   {
  //     id: 2,
  //     name: 'Dr. John Smith',
  //     specialty: 'Dermatologist',
  //     email: 'john@example.com',
  //     phone: '+1987654321',
  //   },
  //   {
  //     id: 3,
  //     name: 'Dr. Alice Brown',
  //     specialty: 'Neurologist',
  //     email: 'alice@example.com',
  //     phone: '+1122334455',
  //   },
  // ];

  availableTimes: string[] = [
    '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM'
  ];

  bookAppointment(doctor: Doctor) {
    this.router.navigate(['/dashboard/appointments'], {
      queryParams: { doctor: doctor.profile.firstName + ' ' + doctor.profile.lastName },
    });
  }

  // bookAppointment() {
  //   if (this.selectedDoctorId && this.selectedTime) {
  //     this.successMessage = 'Appointment booked successfully!';
  //   } else {
  //     this.successMessage = '';
  //     alert('Please select a doctor and a time slot.');
  //   }
  // }

  searchTerm = '';



 filterDoctors() {
  const term = this.searchTerm.trim().toLowerCase();

  this.filteredDoctors = this.doctors.filter((doc) => {
    const fullName = `${doc.profile.firstName} ${doc.profile.lastName}`.toLowerCase();
    const specialty = doc.profile.specialization?.toLowerCase() || '';
    return fullName.includes(term) || specialty.includes(term);
  });
}



}
