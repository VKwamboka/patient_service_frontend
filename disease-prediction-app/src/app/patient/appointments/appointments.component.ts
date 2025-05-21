import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


interface Appointment {
  doctor: string;
  time: string;
  status: 'Active' | 'Past' | 'Cancelled';
}

@Component({
  selector: 'app-appointments',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  selectedDoctor = '';
  selectedTime = '';
  successMessage = '';

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 0, 1, 0);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

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

  hasActiveAppointment(doctor: string): boolean {
  return this.appointments.some(
    appt => appt.doctor === doctor && appt.status === 'Active'
  );
}


  // bookAppointment() {
  //   if (this.selectedDoctor && this.selectedTime) {
  //     this.appointments.push({
  //       doctor: this.selectedDoctor,
  //       time: this.selectedTime,
  //       status: 'Active',
  //     });

  //     this.successMessage = 'Appointment booked successfully!';
  //     this.selectedDoctor = '';
  //     this.selectedTime = '';

  //     // Optional: clear success after delay
  //     setTimeout(() => (this.successMessage = ''), 3000);
  //   } else {
  //     alert('Please select both doctor and time.');
  //   }
  // }
bookAppointment() {
  if (!this.selectedDoctor || !this.selectedTime) {
    alert('Please select a doctor and a time.');
    return;
  }

  const existingIndex = this.appointments.findIndex(
    appt => appt.doctor === this.selectedDoctor && appt.status === 'Active'
  );

  if (existingIndex >= 0) {
    // Modify time for existing appointment
    this.appointments[existingIndex].time = this.selectedTime;
    this.successMessage = `Appointment with ${this.selectedDoctor} updated to ${this.selectedTime}.`;
  } else {
    // Book new appointment
    this.appointments.push({
      doctor: this.selectedDoctor,
      time: this.selectedTime,
      status: 'Active'
    });
    this.successMessage = 'Appointment booked successfully!';
  }

  // Reset form
  this.selectedDoctor = '';
  this.selectedTime = '';
  setTimeout(() => (this.successMessage = ''), 3000);
}

  cancelAppointment(index: number) {
    this.appointments[index].status = 'Cancelled';
  }

  // reschedulingIndex appointment
reschedulingIndex: number | null = null;
newTime: string = '';

reschedule(index: number) {
  this.reschedulingIndex = index;
  this.newTime = this.appointments[index].time;
}

confirmReschedule(index: number) {
  if (this.newTime) {
    this.appointments[index].time = this.newTime;
    this.successMessage = `Appointment with ${this.appointments[index].doctor} updated to ${this.newTime}`;
    this.reschedulingIndex = null;
    setTimeout(() => (this.successMessage = ''), 3000);
  }
}

cancelReschedule() {
  this.reschedulingIndex = null;
}



}
