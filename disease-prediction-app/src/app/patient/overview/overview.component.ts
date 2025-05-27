import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  patientName = localStorage.getItem('user') || '';
;
  currentDate = new Date();

  appointmentCount = 3;
  lastSymptomCheck = '3 days ago';
  reportCount = 2;
  criticalAlert = '';

  upcomingAppointment = {
    doctor: 'Dr. Smith (Cardiologist)',
    date: new Date(Date.now() + 86400000) // tomorrow
  };

  ngOnInit(): void {
    // Fetch data from API here if needed
  }

}
