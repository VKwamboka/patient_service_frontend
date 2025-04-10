import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  role: string = 'patient'; // Default role
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role') || 'patient';
    });
  }
  
  onRoleChange(newRole: string) {
    this.role = newRole;
    this.router.navigate([`/registration/${newRole}`]);
  }

  goToLogin() {
    console.log('goToLogin() triggered');
    this.router.navigate([`/login/${this.role}`]);
  }

  onSignup(form: NgForm): void {
    if (form.invalid) return;

    console.log('User Signed Up:', this.user);

    this.router.navigate(['/login']);
  }
}
