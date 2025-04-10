import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: string = 'patient'; // Default role
  constructor(private router: Router, private route: ActivatedRoute){}

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

  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.user);
  }
}
