import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Doctor {
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
  doctors: Doctor[] = [
    {
      name: 'Dr. Jane Doe',
      specialty: 'Cardiologist',
      email: 'jane@example.com',
      phone: '+1234567890',
    },
    {
      name: 'Dr. John Smith',
      specialty: 'Dermatologist',
      email: 'john@example.com',
      phone: '+1987654321',
    },
    {
      name: 'Dr. Alice Brown',
      specialty: 'Neurologist',
      email: 'alice@example.com',
      phone: '+1122334455',
    },
  ];

  bookAppointment(doctor: Doctor) {
    alert(`Booking appointment with ${doctor.name} (${doctor.specialty})`);
    // Future: route to booking form with doctor info
  }

  searchTerm = '';

get filteredDoctors(): Doctor[] {
  const term = this.searchTerm.trim().toLowerCase();
  return this.doctors.filter(doc =>
    doc.name.toLowerCase().includes(term) ||
    doc.specialty.toLowerCase().includes(term)
  );
}


}
