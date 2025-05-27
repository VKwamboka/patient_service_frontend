import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DoctorService } from '../../services/doctors.service';
import { Doctor } from '../../services/doctors.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';


// interface Appointment {
//   doctor: string;
//   time: string;
//   status: 'Active' | 'Past' | 'Cancelled';
// }

@Component({
  selector: 'app-appointments',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  doctors: Doctor[] = [];
  // appointments: Appointment[] = [];
  appointments: any[] = [];
  selectedDoctorId: string = '';
  selectedDoctor: any = null;
  selectedDate: Date | null = null;        
  selectedTime: string = '';  
  successMessage = '';

  doctorMap: { [id: string]: string } = {};
  doctorMapReady = false;

  editModeId: string | null = null;
  editDate: Date | null = null;
  editTime: string = '';

    // Start editing
  editAppointment(appt: any) {
    this.editModeId = appt.id;
    this.editDate = new Date(appt.appointmentStartDate);
    const dateObj = new Date(appt.appointmentStartDate);
    this.editTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  }

  // Cancel editing
  cancelEdit() {
    this.editModeId = null;
    this.editDate = null;
    this.editTime = '';
  }



  availableTimes: string[] = [
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
];

// Confirm edit and send to backend
confirmEdit(appointmentId: string) {
  if (!this.editDate || !this.editTime) return;

  const [h, m] = this.editTime.split(':').map(Number);
  const newStart = new Date(this.editDate);
  newStart.setHours(h, m, 0, 0);
  const newEnd = new Date(newStart.getTime() + 30 * 60 * 1000);

  this.appointmentService.updateAppointment(appointmentId, {
    appointmentStartDate: newStart.toISOString(),
    appointmentEndDate: newEnd.toISOString()
  }).subscribe({
    next: () => {
      this.cancelEdit();
      this.fetchAppointments();
    },
    error: err => {
      console.error(err);
      alert('Failed to update appointment.');
    }
  });
}


  // private readonly _currentYear = new Date().getFullYear();
  readonly minDate: Date = new Date(); 
  readonly maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 6));

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private authService: AuthService, private appointmentService:AppointmentService) {}

  ngOnInit(): void {
    this.fetchDoctors();
    this.fetchAppointments();
    // this.route.queryParams.subscribe(params => {
    //   if (params['doctor']) {
    //     this.selectedDoctor.id = params['doctor'];
    //   }
    // });
  }


  fetchDoctors() {
  this.doctorService.getDoctors().subscribe({
    next: (res) => {
      this.doctors = res.data;

      // lookup map for doctor names
      this.doctorMap = {};
      this.doctors.forEach(doc => {
        this.doctorMap[doc.id] = `${doc.profile.firstName} ${doc.profile.lastName}`;
      });
      this.doctorMapReady = true;

      console.log('Doctor map:', this.doctorMap);
    },
    error: (err) => {
      console.error(err.message);
    }
  });
}

  updateSelectedDoctor() {
    if (!this.doctors?.length || !this.selectedDoctorId) return;

    this.selectedDoctor = this.doctors.find(doc => doc.id == this.selectedDoctorId);

    if (!this.selectedDoctor) {
      console.warn('No doctor matched with ID:', this.selectedDoctorId);
    } else {
      console.log('Selected doctor:', this.selectedDoctorId);
    }
  }

 

  // fetch appointments
  fetchAppointments(){
    const patientId = localStorage.getItem('userId');
    if (!patientId) return;
    this.appointmentService.getAppointments(  ).subscribe({
     next: (res) => {
        this.appointments = res.data;
        console.log('Fetched appointments:', this.appointments);
      },
      error: (err) => {
        console.error(err.message);
      }
    });

  }

  // book appointment
  bookAppointment() {
  if (!this.selectedDoctorId || !this.selectedDate || !this.selectedTime) {
    alert('Please select a doctor, date, and time.');
    return;
  }

  // Combine date and time 
  const [hours, minutes] = this.selectedTime.split(':').map(Number);
  const start = new Date(this.selectedDate);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start.getTime() + 30 * 60 * 1000); // add 30 mins

  const appointmentData: Appointment = {
    patientId: localStorage.getItem('userId') || '',
    doctorId: this.selectedDoctorId,
    appointmentStartDate: start.toISOString(),
    appointmentEndDate: end.toISOString()
  };

  console.log('Appointment:', appointmentData);

  this.appointmentService.createAppointment(appointmentData).subscribe({
    next: (res) => {
      this.successMessage = 'Appointment booked successfully!';
      this.fetchAppointments();
      setTimeout(() => (this.successMessage = ''), 3000);
    },
    error: (err) => {
      console.error('Booking error:', err.message);
      alert('Failed to book appointment. Please try again.');
    }
  });
}


cancelAppointment(appointmentId: string) {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe({
      next: () => {
        this.fetchAppointments();
      },
      error: err => {
        console.error(err);
        alert('Failed to cancel appointment.');
      }
    });
  }
}



}
