import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


interface Appointment {
  doctor: string;
  time: string;
  status: 'Active' | 'Past' | 'Cancelled';
}

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  selectedDoctor = '';
  selectedTime = '';
  successMessage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['doctor']) {
        this.selectedDoctor = params['doctor'];
      }
    });
  }

  doctors = ['Dr. Jane Doe', 'Dr. John Smith', 'Dr. Alice Brown'];
  availableTimes = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  appointments: Appointment[] = [];

  bookAppointment() {
    if (this.selectedDoctor && this.selectedTime) {
      this.appointments.push({
        doctor: this.selectedDoctor,
        time: this.selectedTime,
        status: 'Active',
      });

      this.successMessage = 'Appointment booked successfully!';
      this.selectedDoctor = '';
      this.selectedTime = '';

      // Optional: clear success after delay
      setTimeout(() => (this.successMessage = ''), 3000);
    } else {
      alert('Please select both doctor and time.');
    }
  }

  cancelAppointment(index: number) {
    this.appointments[index].status = 'Cancelled';
  }


}
