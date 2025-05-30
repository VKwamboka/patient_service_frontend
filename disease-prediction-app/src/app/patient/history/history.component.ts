import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SymptomHistoryEntry {
  date: string;
  symptoms: string[];
  predictions: string[];
}
interface AppointmentHistoryEntry {
  doctor: string;
  time: string;
  status: 'Past' | 'Cancelled';
}



@Component({
  selector: 'app-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  symptomHistory: SymptomHistoryEntry[] = [
    // {
    //   date: 'May 5, 2025',
    //   symptoms: ['Fever', 'Cough'],
    //   predictions: ['Flu (80%)', 'Common Cold (60%)']
    // },
    // {
    //   date: 'May 1, 2025',
    //   symptoms: ['Headache', 'Fatigue'],
    //   predictions: ['Migraine (75%)', 'Dehydration (55%)']
    // }
  ];
  appointmentHistory: AppointmentHistoryEntry[] = [
    {
      doctor: 'Dr. Jane Doe',
      time: 'May 1, 2025 - 10:00 AM',
      status: 'Past'
    },
    {
      doctor: 'Dr. John Smith',
      time: 'April 20, 2025 - 2:30 PM',
      status: 'Cancelled'
    }
  ];

}
