import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,FormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  constructor(private router: Router) {}

  
  selectedDoctorId: number | null = null;
  selectedTime: string = '';
  successMessage = '';

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Jane Doe',
      specialty: 'Cardiologist',
      email: 'jane@example.com',
      phone: '+1234567890',
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      specialty: 'Dermatologist',
      email: 'john@example.com',
      phone: '+1987654321',
    },
    {
      id: 3,
      name: 'Dr. Alice Brown',
      specialty: 'Neurologist',
      email: 'alice@example.com',
      phone: '+1122334455',
    },
  ];

  availableTimes: string[] = [
    '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM'
  ];

  bookAppointment(doctor: Doctor) {
    this.router.navigate(['/dashboard/appointments'], {
      queryParams: { doctor: doctor.name },
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

get filteredDoctors(): Doctor[] {
  const term = this.searchTerm.trim().toLowerCase();
  return this.doctors.filter(doc =>
    doc.name.toLowerCase().includes(term) ||
    doc.specialty.toLowerCase().includes(term)
  );
}


}
