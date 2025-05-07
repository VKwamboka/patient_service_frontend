import { Routes } from '@angular/router';
import { LandingComponent } from './authentication/landing/landing.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: 'registration/:role', component: RegisterComponent },
    {
        path: 'dashboard',
        component: PatientDashboardComponent,
        children: [
          { path: 'overview', loadComponent: () => import('./patient/overview/overview.component').then(m => m.OverviewComponent) },
          { path: 'symptoms', loadComponent: () => import('./patient/symptoms/symptoms.component').then(m => m.SymptomsComponent) },
          { path: 'appointments', loadComponent: () => import('./patient/appointments/appointments.component').then(m => m.AppointmentsComponent) },
          {path: 'doctors', loadComponent: () => import('./patient/doctors/doctors.component').then(m => m.DoctorsComponent) },
          { path: 'history', loadComponent: () => import('./patient/history/history.component').then(m => m.HistoryComponent) },
          { path: 'reports', loadComponent: () => import('./patient/reports/reports.component').then(m => m.ReportsComponent) },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ]
      },

];
