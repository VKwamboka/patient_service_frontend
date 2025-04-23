import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  imports: [ FormsModule, RouterModule, CommonModule ],
  standalone: true,
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  isMobile = false;
  theme = localStorage.getItem('theme') || 'light-mode';

  menu = [
    { label: 'Overview', route: '/dashboard/overview', icon: 'bi bi-house-door' },
    { label: 'Symptom Input', route: '/dashboard/symptoms', icon: 'bi bi-clipboard-pulse' },
    { label: 'Appointments', route: '/dashboard/appointments', icon: 'bi bi-calendar-check' },
    { label: 'History', route: '/dashboard/history', icon: 'bi bi-clock-history' },
    { label: 'Reports', route: '/dashboard/reports', icon: 'bi bi-file-earmark-text' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

 @HostListener('window:resize')
 checkScreenSize() {
  this.isMobile = window.innerWidth < 768;
  if (!this.isMobile) this.isSidebarCollapsed = false;
}

toggleSidebar() {
  this.isSidebarCollapsed = !this.isSidebarCollapsed;
}

toggleTheme() {
  this.theme = this.theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
  localStorage.setItem('theme', this.theme);
}

}
