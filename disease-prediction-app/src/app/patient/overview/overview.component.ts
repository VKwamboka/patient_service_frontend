import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment, AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  patientName = localStorage.getItem('user') || '';
;
  currentDate = new Date();

  appointmentCount = 3;
  lastSymptomCheck = '3 days ago';
  reportCount = 0;
  criticalAlert = '';
  nextAppointment: any = null;
  lastAppointment: any = null;
  daysSinceLast: string = '';
  upcomingAppointments: any[] = [];


  constructor(private router: Router, private route: ActivatedRoute, private appointmentService: AppointmentService) {}

  upcomingAppointment = {
    doctor: 'Dr. Smith (Cardiologist)',
    date: new Date(Date.now() + 86400000) // tomorrow
  };

  ngOnInit(): void {
    // this.loadNextAppointment();
    this.fetchAppointments()
  }



  fetchAppointments() {
  this.appointmentService.getAppointments().subscribe({
    next: (res) => {
      const all = res.data || [];

      const now = new Date();

      this.upcomingAppointments = all
        .filter((a: Appointment) => new Date(a.appointmentStartDate) >= now)
        .sort((a: Appointment, b: Appointment) => new Date(a.appointmentStartDate).getTime() - new Date(b.appointmentStartDate).getTime());

      const pastAppointments = all
        .filter((a: Appointment) => a.isConfirmed === true && new Date(a.appointmentStartDate) < now  )
        .sort((a: Appointment, b: Appointment) => new Date(b.appointmentStartDate).getTime() - new Date(a.appointmentStartDate).getTime());

      this.lastAppointment = pastAppointments[0] || null;
      console.log('Last Appointment:', this.lastAppointment);
      this.nextAppointment = this.upcomingAppointments[0] || null;

      if (this.lastAppointment) {
        const diffMs = now.getTime() - new Date(this.lastAppointment.appointmentStartDate).getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        this.daysSinceLast = diffDays === 0 ? 'Today' : `${diffDays} day(s) ago`;
      } else {
        this.daysSinceLast = 'No previous appointment';
      }
    },
    error: (err) => console.error(err)
  });
}

//   loadNextAppointment() {
//   this.appointmentService.getAppointments().subscribe({
//     next: (res) => {
//       const all = res.data || [];
//       const now = new Date();

//       // Filter upcoming only
//       const upcoming = all
//         .filter((a: Appointment) => new Date(a.appointmentStartDate) > now)
//         .sort((a: Appointment, b:Appointment) =>
//           new Date(a.appointmentStartDate).getTime() - new Date(b.appointmentStartDate).getTime()
//         );

//       this.nextAppointment = upcoming.length > 0 ? upcoming[0] : null;
//     },
//     error: (err) => console.error('Error loading appointments', err)
//   });
// }

}
