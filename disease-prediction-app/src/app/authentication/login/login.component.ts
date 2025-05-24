import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: string = 'patient'; // Default role
  user ={
    email: '',
    password: ''
  }
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role') || 'patient';
    });
  }

  onRoleChange(newRole: string) {
    this.role = newRole;
    this.router.navigate([`/login/${newRole}`]);
  }
  
  goToSignup() {
    this.router.navigate([`/registration/${this.role}`]);
  }

  onLogin() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.loading = true;
   
    this.authService.login(this.user.email, this.user.password).subscribe({
    next: (res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.profile.userId);
      this.router.navigate([`/dashboard/${this.role}`]);
      this.loading = false;
    },
    error: (err: Error) => {
      this.errorMessage = err.message || 'Login failed.'; 
      this.loading = false;
    }
  });
  }

  clearError(){
    this.errorMessage = '';
  }


  
}
