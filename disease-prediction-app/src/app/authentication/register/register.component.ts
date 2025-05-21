import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SignupPayload } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // user = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };
  userData: SignupPayload = {
    email: '',
    password: '',
    // confirmPassword: ''
    profile: {
      firstName: '',
      lastName: '',
      username: '',
      isPatient: true,  // default role
      isDoctor: false,
      profilePicture: ''
    }
  };


  role: string = 'patient'; // Default role
  
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService ) {}
  loading = false;
  errorMessage = '';
  successMessage = '';
  
 
  onRoleChange(newRole: string) {
    this.role = newRole;
    this.router.navigate([`/registration/${newRole}`]);
  }

  goToLogin() {
    console.log('goToLogin() triggered');
    this.router.navigate([`/login/${this.role}`]);
  }

   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const roleParam = params.get('role');
      if(roleParam === 'doctor'  || roleParam === 'patient'){
        this.role = roleParam;
        this.setRoleInForm();
      }
    });
  }
  
  setRoleInForm(){
     this.userData.profile.isPatient = this.role === 'patient';
    this.userData.profile.isDoctor = this.role === 'doctor';
  }

  // onSubmit() {
  //   this.authService.signup(this.userData).subscribe({
  //     next: () => console.log('Signup success'),
  //     error: (err) => console.error('Signup failed', err),
  //   });
  // }

 
  // submitting the form
  onSubmit(form: NgForm) {
    this.loading = true;
    this.authService.signup(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Signup successful!';
        this.errorMessage = '';
        this.loading = false;
        this.router.navigate([`/login/${this.role}`]);
      },
      error: (err: Error) => {
      this.errorMessage = err.message || 'Signup failed.'; 
      this.loading = false;
    }
    });
    console.log('Form submitted:', form.value);
    // this.router.navigate([`/login/${this.role}`]);
  }

  clearError(){
    this.errorMessage = '';
  }

  //  onSignup(form: NgForm): void {
  //   if (form.invalid) return;

  //   console.log('User Signed Up:', this.user);

  //   this.router.navigate(['/login']);
  // }

}

