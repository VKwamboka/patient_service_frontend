import { Routes } from '@angular/router';
import { LandingComponent } from './authentication/landing/landing.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: 'registration/:role', component: RegisterComponent },
    {
        path: 'dashboard/patient',
        component: PatientDashboardComponent,
        children: [
          { path: 'overview', loadComponent: () => import('./patient/overview/overview.component').then(m => m.OverviewComponent), canActivate: [authGuard] },
          {path: 'notifications', loadComponent: () => import('./patient/notifications/notifications.component').then(m => m.NotificationsComponent), canActivate: [authGuard] },
          { path: 'symptoms', loadComponent: () => import('./patient/symptoms/symptoms.component').then(m => m.SymptomsComponent), canActivate: [authGuard] },
          { path: 'appointments', loadComponent: () => import('./patient/appointments/appointments.component').then(m => m.AppointmentsComponent), canActivate: [authGuard] },
          {path: 'doctors', loadComponent: () => import('./patient/doctors/doctors.component').then(m => m.DoctorsComponent), canActivate: [authGuard] },
          { path: 'history', loadComponent: () => import('./patient/history/history.component').then(m => m.HistoryComponent), canActivate: [authGuard] },
          { path: 'reports', loadComponent: () => import('./patient/reports/reports.component').then(m => m.ReportsComponent), canActivate: [authGuard] },
          {path: "profile", loadComponent: () => import('./patient/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ]
      },
    {path: '**', component: PageNotFoundComponent}

];
