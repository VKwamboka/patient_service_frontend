import { Routes } from '@angular/router';
import { LandingComponent } from './authentication/landing/landing.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    {path: 'login/doctor', component: LoginComponent},
    {path: 'login/patient', component: LoginComponent},

    {path: 'register', component: RegisterComponent}
];
