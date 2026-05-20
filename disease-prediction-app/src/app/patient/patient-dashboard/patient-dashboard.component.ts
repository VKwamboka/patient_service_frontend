import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NotificationsComponent } from "../notifications/notifications.component";
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-patient-dashboard',
  imports: [FormsModule, RouterModule, CommonModule, NotificationsComponent, MatIconModule],
  standalone: true,
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  isSidebarCollapsed = true;
  isMobile = false;
  theme = 'light-mode';
  
  // theme = localStorage.getItem('theme') || 'light-mode';

  menu = [
    { label: 'Overview', route: '/dashboard/patient/overview', icon: 'bi bi-house-door' },
    { label: 'Symptom Input', route: '/dashboard/patient/symptoms', icon: 'bi bi-clipboard-pulse' },
    // { label: 'Notifications', route: '/dashboard/notifications', icon: 'bi bi-bell' },
    {label: 'Doctors', route: '/dashboard/patient/doctors', icon: 'bi bi-person-circle' },
    { label: 'Appointments', route: '/dashboard/patient/appointments', icon: 'bi bi-calendar-check' },
   
    // { label: 'History', route: '/dashboard/patient/history', icon: 'bi bi-clock-history' },
    { label: 'Reports', route: '/dashboard/patient/reports', icon: 'bi bi-file-earmark-text' },
    { label: 'My profile', route: '/dashboard/patient/profile', icon: 'bi bi-person' },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private route: ActivatedRoute, private auth: AuthService) {}

  // constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.checkScreenSize();
    if (isPlatformBrowser(this.platformId)) {
      this.theme = localStorage.getItem('theme') || 'light-mode';
    }
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

onLogout() {
  this.auth.logout()
}

}
